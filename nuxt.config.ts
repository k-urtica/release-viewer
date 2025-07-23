const SITE_URL = 'https://release-viewer.web-toolbox.dev';
const SITE_TITLE = 'Release Viewer - Browse GitHub Repository Releases';
const SITE_DESCRIPTION = 'Browse GitHub repository release notes with a clean, easy-to-use interface. Enter a repository name or URL to view release information.';

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxt/ui',
    '@nuxt/scripts',
    '@nuxt/eslint',
    '@vueuse/nuxt',
  ],

  components: [
    {
      path: '@/components',
      pathPrefix: false,
    },
  ],

  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { property: 'og:title', content: SITE_TITLE },
        { property: 'og:description', content: SITE_DESCRIPTION },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: SITE_URL },
        { property: 'og:image', content: `${SITE_URL}/ogp.webp` },
        { property: 'og:image:type', content: 'image/webp' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '600' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: SITE_TITLE },
        { name: 'twitter:description', content: SITE_DESCRIPTION },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg', },
      ],
    },
  },

  css: ['@/assets/main.css'],

  site: {
    name: SITE_TITLE,
    url: SITE_URL
  },

  ui: {
    colorMode: true,
    fonts: true,
  },

  runtimeConfig: {
    githubToken: process.env.GH_TOKEN,
  },

  routeRules: {
    '/repo/**': { swr: true },
    '/': { prerender: true },
  },

  experimental: {
    typedPages: true,
  },

  compatibilityDate: '2025-07-15',

  nitro: {
    preset: 'cloudflare-module',
    prerender: {
      autoSubfolderIndex: false,
      routes: ['/sitemap.xml', '/robots.txt'],
    },
  },

  vite: {
    optimizeDeps: {
      entries: ['pages/**/*.vue', 'components/**/*.vue'],
    },
  },

  eslint: {
    config: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },

  icon: {
    provider: 'iconify',
    clientBundle: {
      scan: true,
    },
    serverBundle: false,
  },

  sitemap: {
    autoLastmod: false,
    discoverImages: false,
    sitemaps: false,
  },
});
