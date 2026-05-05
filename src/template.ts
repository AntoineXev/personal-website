import { cardConfigs, gallery } from './cards'

const SITE_URL = 'https://aher.vet'
const TITLE = 'Antoine Hervet - Dev fullstack, fondateur et designer amateur.'
const DESCRIPTION =
  "Developpeur web fullstack, créateur d'entreprise, je donne vie à des projets et des produits tech. depuis maintenant plus de 10 ans"

const personJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: 'Antoine Hervet',
      url: SITE_URL,
      '@id': `${SITE_URL}/#`,
      worksFor: { '@id': 'https://xev.agency' },
      honorificSuffix: 'M.',
      alumniOf: [
        {
          '@type': 'Organization',
          name: 'Telecom Bretagne',
          '@id': 'https://www.wikidata.org/wiki/Q2460307',
        },
        {
          '@type': 'Organization',
          name: 'EmLyon Business School',
          '@id': 'https://www.wikidata.org/wiki/Q1795504',
        },
      ],
      sameAs: [
        'https://fr.linkedin.com/in/ahervet',
        'https://www.pappers.fr/dirigeant/antoine_hervet_1996-02',
      ],
      jobTitle: {
        '@type': 'DefinedTerm',
        name: 'Entrepreneur',
        alternateName: 'entrepreneur',
        sameAs: 'https://resources.workable.com/entrepreneur-job-description',
      },
      knowsLanguage: ['french', 'english'],
      knowsAbout: [
        { '@type': 'Thing', name: 'Web developpement', alternateName: 'Fullstack developpment', '@id': 'https://www.wikidata.org/wiki/Q386275' },
        { '@type': 'Thing', name: 'Enterprise ressource planning', alternateName: 'ERP', '@id': 'https://www.wikidata.org/wiki/Q131508' },
        { '@type': 'Thing', name: 'Angular', alternateName: 'Angular material', '@id': 'https://www.wikidata.org/wiki/Q28925578' },
        { '@type': 'Thing', name: 'Strapi', alternateName: 'Strapi CMS', '@id': 'https://www.wikidata.org/wiki/Q105826887' },
        { '@type': 'Thing', name: 'addiction', alternateName: 'addictions', '@id': 'https://www.wikidata.org/wiki/Q12029' },
        { '@type': 'Thing', name: 'Cryptocurrency', alternateName: 'Crypto', '@id': 'https://www.wikidata.org/wiki/Q13479982' },
        { '@type': 'Thing', name: 'Blockchain', '@id': 'https://www.wikidata.org/wiki/Q20514253' },
      ],
    },
  ],
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  )
}

function renderCards() {
  return cardConfigs
    .map((_cfg, idx) => {
      const item = gallery[idx]
      return `
        <div data-card-pos data-card-idx="${idx}" class="pointer-events-none absolute inset-y-0 flex items-center w-44 md:w-72">
          <div data-card-inner class="flex w-full flex-col overflow-hidden rounded-2xl bg-white/10 p-1 shadow-xl shadow-black/20 will-change-transform dark:bg-white/5" style="opacity:0">
            <div class="relative aspect-[4/5] overflow-hidden rounded-xl">
              <img src="${item.image}" alt="${escapeHtml(item.title)}" class="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
            </div>
            <div class="px-2 pt-2 pb-1 text-left">
              <p class="text-[11px] text-zinc-600 dark:text-zinc-400">${escapeHtml(item.subtitle)}</p>
            </div>
          </div>
        </div>`
    })
    .join('\n')
}

export function renderHtml({ cssHref, jsHref }: { cssHref: string; jsHref: string }) {
  return `<!DOCTYPE html>
<html lang="fr" class="antialiased scroll-smooth">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(TITLE)}</title>
  <meta name="description" content="${escapeHtml(DESCRIPTION)}" />
  <link rel="canonical" href="${SITE_URL}/" />
  <meta property="og:title" content="${escapeHtml(TITLE)}" />
  <meta property="og:description" content="${escapeHtml(DESCRIPTION)}" />
  <meta property="og:url" content="${SITE_URL}/" />
  <meta property="og:type" content="website" />
  <link rel="icon" href="/favicon.ico" />
  <link rel="preload" href="/fonts/courier-prime-400-latin.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="${cssHref}" />
  <script type="application/ld+json">${JSON.stringify(personJsonLd)}</script>
</head>
<body class="bg-white dark:bg-black font-typewriter">
  <main class="flex-auto">
    <section id="aboutme-section" class="relative h-[500vh]">
      <div class="sticky top-0 h-screen w-full overflow-hidden">
        <div class="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4">
          <div class="pointer-events-auto mx-auto flex max-w-4xl flex-col items-center gap-16 text-center">
            <div class="inline-flex items-center gap-3 rounded-lg border border-zinc-200 bg-white/80 px-4 py-2 text-sm text-zinc-600 shadow-sm backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/70 dark:text-zinc-300">
              Bonjour, moi c&apos;est Antoine
            </div>
            <h2 class="font-handwritten text-3xl leading-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
              Intéressé par l'art de construire des trucs (des objets, des applications, des équipes, des entreprises...) et le processus créatif inhérent et sous-jacent.
            </h2>
          </div>
        </div>
        <div class="absolute inset-0 z-20">
${renderCards()}
        </div>
      </div>
    </section>
  </main>
  <script type="module" src="${jsHref}"></script>
</body>
</html>
`
}
