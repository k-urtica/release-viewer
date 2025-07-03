const SITE_URL = 'https://release-viewer.web-toolbox.dev';
const SITE_TITLE = 'Release Viewer - GitHub Release Notes Tool';
const SITE_DESCRIPTION = 'A web tool to browse GitHub repository release notes with a clean, easy-to-use interface';

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
      title: SITE_TITLE,
      titleTemplate: '%s',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { name: 'description', content: SITE_DESCRIPTION },
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
    '/api/releases/**': {
      headers: { 'Cache-Control': 'public, max-age=600', },
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    typedPages: true,
  },
  compatibilityDate: '2025-05-15',

  nitro: {
    preset: 'cloudflare-module',
    prerender: {
      autoSubfolderIndex: false,
      crawlLinks: true,
      routes: ['/', '/sitemap.xml', '/robots.txt'],
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
