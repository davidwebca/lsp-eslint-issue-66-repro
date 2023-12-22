// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
    devtools: { enabled: true },
    experimental: {
        asyncContext: true,
    },
    components: [{ path: '~/components', global: 'dev' }],
    modules: [['@nuxtjs/tailwindcss'], ['@nuxtjs/eslint-module', { lintOnStart: false }], ['@nuxtjs/stylelint-module', { lintOnStart: false }]],
    tailwindcss: {
        exposeConfig: true,
    },
    vite: {
        plugins: [svgLoader({ svgo: false })],
    },
});
