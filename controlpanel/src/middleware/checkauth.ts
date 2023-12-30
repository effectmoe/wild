import { RouteLocationNormalized } from 'vue-router'
import { fastfireauth } from '~/composables/application/fastfireauth'

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized) => {
    if (!process.server) {
        const { checkAuthState, token } = fastfireauth()
        await checkAuthState()
        if(to.path == '/login') {
            // loginページの場合、ステータスがあればTOPへリダイレクト
            if (token.value) {
                // replaceで遷移
                return await navigateTo('/', { replace: true })
            }
        }
        else {
            if (!token.value) {
                // replaceで遷移
                return await navigateTo('/login', { replace: true })
            }
        }
    }
})
