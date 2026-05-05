import { build, context, type BuildResult } from 'esbuild'
import { createHash } from 'node:crypto'
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn, type ChildProcess } from 'node:child_process'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const isDev = process.argv.includes('--dev')

function hash(buf: Buffer | string) {
  return createHash('sha256').update(buf).digest('hex').slice(0, 10)
}

// In dev mode we use stable names (no hash) so wrangler picks up changes.
// In prod we hash for cache-busting.
function assetName(base: string, ext: string, buf?: Buffer | string) {
  if (isDev) return `${base}.${ext}`
  return `${base}.${hash(buf!)}.${ext}`
}

async function buildTailwind(watchMode = false) {
  const args = [
    'tailwindcss',
    '-i', 'src/styles/tailwind.css',
    '-o', join(dist, 'assets', isDev ? 'style.css' : '_tw_tmp.css'),
    ...(isDev ? [] : ['--minify']),
    ...(watchMode ? ['--watch'] : []),
  ]
  const p = spawn('npx', args, { stdio: 'inherit', cwd: root })
  if (watchMode) return p
  return new Promise<void>((res, rej) => {
    p.on('exit', (c) => (c === 0 ? res() : rej(new Error(`tailwind exit ${c}`))))
  })
}

async function buildJsProd() {
  await build({
    entryPoints: [join(root, 'src/main.ts')],
    bundle: true,
    minify: true,
    format: 'esm',
    target: 'es2022',
    platform: 'browser',
    outdir: join(dist, '_tmp'),
    write: true,
    treeShaking: true,
    legalComments: 'none',
  })
}

async function emitAssetsProd() {
  const cssBuf = await readFile(join(dist, 'assets/_tw_tmp.css'))
  const jsBuf = await readFile(join(dist, '_tmp/main.js'))
  const cssName = assetName('style', 'css', cssBuf)
  const jsName = assetName('main', 'js', jsBuf)
  await writeFile(join(dist, 'assets', cssName), cssBuf)
  await writeFile(join(dist, 'assets', jsName), jsBuf)
  await rm(join(dist, 'assets/_tw_tmp.css'))
  await rm(join(dist, '_tmp'), { recursive: true, force: true })
  return { cssHref: `/assets/${cssName}`, jsHref: `/assets/${jsName}` }
}

async function emitHtml({ cssHref, jsHref }: { cssHref: string; jsHref: string }) {
  // Dynamic import to pick up changes when re-rendering in dev.
  const { renderHtml } = await import(`../src/template.ts?t=${Date.now()}`)
  const html = renderHtml({ cssHref, jsHref })
  await writeFile(join(dist, 'index.html'), html)
  await writeFile(join(dist, '404.html'), html)
}

async function copyPublic() {
  await cp(join(root, 'public'), dist, { recursive: true })
  await writeFile(
    join(dist, '_redirects'),
    [
      '/about /  301',
      '/articles /  301',
      '/articles/* /  301',
      '/projects /  301',
      '/projects/* /  301',
      '/uses /  301',
      '/thank-you /  301',
    ].join('\n') + '\n',
  )
  await writeFile(
    join(dist, '_headers'),
    `/assets/*\n  Cache-Control: public,max-age=31536000,immutable\n/fonts/*\n  Cache-Control: public,max-age=31536000,immutable\n`,
  )
}

async function emitSitemapAndRobots() {
  await writeFile(
    join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>https://aher.vet</loc>\n    <priority>1</priority>\n  </url>\n</urlset>\n`,
  )
  await writeFile(
    join(dist, 'robots.txt'),
    'User-agent: *\nAllow: /\nSitemap: https://aher.vet/sitemap.xml\n',
  )
}

// ----- PROD -----
async function buildProd() {
  await rm(dist, { recursive: true, force: true })
  await mkdir(join(dist, 'assets'), { recursive: true })
  await copyPublic()
  await Promise.all([buildTailwind(), buildJsProd()])
  const refs = await emitAssetsProd()
  await emitHtml(refs)
  await emitSitemapAndRobots()
  console.log('Built ->', dist)
}

// ----- DEV -----
async function buildDev() {
  await rm(dist, { recursive: true, force: true })
  await mkdir(join(dist, 'assets'), { recursive: true })
  await copyPublic()
  await emitSitemapAndRobots()

  const devRefs = { cssHref: '/assets/style.css', jsHref: '/assets/main.js' }
  await emitHtml(devRefs)

  // Tailwind in watch mode — writes directly to dist/assets/style.css
  buildTailwind(true)

  // Esbuild watch — writes to dist/assets/main.js, rebuilds HTML on change
  const ctx = await context({
    entryPoints: [join(root, 'src/main.ts')],
    bundle: true,
    format: 'esm',
    target: 'es2022',
    platform: 'browser',
    outfile: join(dist, 'assets/main.js'),
    write: true,
    treeShaking: true,
    sourcemap: true,
    plugins: [
      {
        name: 'rebuild-html',
        setup(build) {
          build.onEnd(async () => {
            await emitHtml(devRefs)
            console.log(`[dev] rebuilt ${new Date().toLocaleTimeString()}`)
          })
        },
      },
    ],
  })
  await ctx.watch()

  // Wrangler dev
  spawn('npx', ['wrangler', 'dev'], { stdio: 'inherit', cwd: root })

  console.log('[dev] watching src/ for changes...')
}

if (isDev) {
  await buildDev()
} else {
  await buildProd()
}
