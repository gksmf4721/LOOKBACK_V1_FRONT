import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        selectedStep: 1,
        selectedType: "회원",
        weight: '',
        height: '',
        user: {}
    }),
    actions: {
        setSelectedStep(step:number) {
            this.selectedStep = step;
        },
        setSelectedType(type:string) {
            this.selectedType = type;
        },
        setUser(data) {
            this.user = data;
        }
    }
})