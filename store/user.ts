import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        selectedStep: 1,
        weight: '',
        height: '',
        user: {}
    }),
    actions: {
        setSelectedStep(step:number) {
            this.selectedStep = step;
        },
        setUser(data) {
            this.user = data;
        }
    }
})