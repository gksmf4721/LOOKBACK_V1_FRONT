import {defineStore} from 'pinia'

export const useMemberStore = defineStore('member',{
    state: () => {
        members: []
    },
    actions: {
        setMembers(data) {
            this.members = data;
        }
    }
})