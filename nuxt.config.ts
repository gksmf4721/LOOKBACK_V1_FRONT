// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8080',
    }
  },
  devServer: {
    port: 3000, // 포트 번호 고정
    host: '0.0.0.0' // 외부 접근 허용 (필요 시 설정)
  },
  css: ['@/assets/css/styles.css',
        '@/assets/css/toast.css'],
  app: {
    head: {
      title: '회원님, 운동하셔야죠.',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/main.min.css' }
      ],
      script: [{ src: 'https://cdn.jsdelivr.net/npm/chart.js' }]
    }
  },
  imports: {
    dirs: ["plugins"], // 플러그인이 있는 디렉토리를 자동으로 탐지
    autoImport: true, // 이게 있어야 useLocalStorage를 자동으로 쓸 수 있다

  },
  compatibilityDate: '2025-02-25',
  modules: ["@pinia/nuxt"],
})