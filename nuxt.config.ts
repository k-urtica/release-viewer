const SITE_URL = 'https://release-viewer.web-toolbox.dev';
const SITE_NAME = 'Release Viewer';
const SITE_DESCRIPTION = 'Browse GitHub repository release notes with a clean, easy-to-use interface. Enter a repository name or URL to view release information.';

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/seo',
    '@nuxt/ui',
    '@nuxt/scripts',
    '@nuxt/eslint',
    '@vueuse/nuxt',
  ],

  ssr: true,

  components: [
    {
      path: '@/components',
      pathPrefix: false,
    },
  ],

  devtools: { enabled: true },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg', },
      ],
    },
  },

  css: ['@/assets/main.css'],

  site: {
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  },

  ui: {
    colorMode: true,
    fonts: true,
    experimental: {
      componentDetection: true,
    }
  },

  runtimeConfig: {
    ghToken: process.env.NUXT_GH_TOKEN,
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

  linkChecker: {
    enabled: false
  },

  ogImage: {
    enabled: true,
    zeroRuntime: true,
  },

  seo: {
    meta: {
      author: 'K',
      twitterCard: 'summary_large_image',
      ogType: 'website',
    },
    metaDataFiles: true
  },

  sitemap: {
    zeroRuntime: true,
    autoLastmod: false,
    discoverImages: false,
    sitemaps: false,
  },
});
