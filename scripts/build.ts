import { build, context } from 'esbuild'
import { createHash } from 'node:crypto'
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'
import { renderHtml } from '../src/template'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const watch = process.argv.includes('--watch')

function hash(buf: Buffer | string) {
  return createHash('sha256').update(buf).digest('hex').slice(0, 10)
}

async function buildTailwind() {
  return new Promise<void>((res, rej) => {
    const p = spawn(
      'npx',
      [
        'tailwindcss',
        '-i', 'src/styles/tailwind.css',
        '-o', join(dist, '_tw.css'),
        '--minify',
      ],
      { stdio: 'inherit', cwd: root },
    )
    p.on('exit', (c) => (c === 0 ? res() : rej(new Error(`tailwind exit ${c}`))))
  })
}

async function buildJs() {
  const result = await build({
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
  if (result.errors.length) throw new Error('esbuild failed')
}

async function emitAssets() {
  // Read tailwind output and the JS bundle, hash them, write to dist/assets/
  const cssBuf = await readFile(join(dist, '_tw.css'))
  const jsBuf = await readFile(join(dist, '_tmp/main.js'))
  const cssName = `style.${hash(cssBuf)}.css`
  const jsName = `main.${hash(jsBuf)}.js`
  await mkdir(join(dist, 'assets'), { recursive: true })
  await writeFile(join(dist, 'assets', cssName), cssBuf)
  await writeFile(join(dist, 'assets', jsName), jsBuf)
  await rm(join(dist, '_tw.css'))
  await rm(join(dist, '_tmp'), { recursive: true, force: true })
  return { cssHref: `/assets/${cssName}`, jsHref: `/assets/${jsName}` }
}

async function emitHtml({ cssHref, jsHref }: { cssHref: string; jsHref: string }) {
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
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://aher.vet</loc>
    <priority>1</priority>
  </url>
</urlset>
`
  await writeFile(join(dist, 'sitemap.xml'), sitemap)
  await writeFile(
    join(dist, 'robots.txt'),
    'User-agent: *\nAllow: /\nSitemap: https://aher.vet/sitemap.xml\n',
  )
}

async function runOnce() {
  await rm(dist, { recursive: true, force: true })
  await mkdir(dist, { recursive: true })
  await copyPublic()
  await Promise.all([buildTailwind(), buildJs()])
  const refs = await emitAssets()
  await emitHtml(refs)
  await emitSitemapAndRobots()
  console.log('Built ->', dist)
}

if (watch) {
  await runOnce()
  console.log('Watching src/ and public/ — re-run `npm run build` to rebuild.')
} else {
  await runOnce()
}
