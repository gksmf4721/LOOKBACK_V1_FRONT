import {defineStore} from 'pinia'

export const useMemberStore = defineStore('member',{
    state: () => ({
        members: [],
        filteredMembers: [], // 검색된 회원 목록
        useFilter: false,
        sortBy : '',
        searchUserName : ''
    }),
    actions: {
        setMembers(data) {
            this.members = data;
        },
        setSearchUserName(data) {
            this.searchUserName = data;
            this.filteredMembers = this.members.filter(m =>
                m.userName.includes(data)
            )
        },
        setUseFilter(data) {
            this.useFilter = data;
        }
    }
})