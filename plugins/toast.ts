import { defineNuxtPlugin } from '#app'
import Toast, { PluginOptions, TYPE } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
    const options: PluginOptions = {
        position: 'top-center',
        timeout: 2000,
        transition: 'Vue-Toastification__bounce',
        toastClassName: 'custom-toast',
        bodyClassName: 'custom-toast-body',
        hideProgressBar: true,

        // ✅ 타입에 따라 아이콘 자동 적용
        icon: (type) => {
            switch (type) {
                case TYPE.SUCCESS:
                    return '✅'
                case TYPE.ERROR:
                    return '❌'
                case TYPE.INFO:
                    return 'ℹ️'
                case TYPE.WARNING:
                    return '⚠️'
                default:
                    return '🔔'
            }
        },
    }

    nuxtApp.vueApp.use(Toast, options)
})
