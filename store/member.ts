import {defineStore} from 'pinia'

export const useMemberStore = defineStore('member',{
    state: () => ({
        members: [],
        membersCount: 0,
        filteredMembers: [], // 검색된 회원 목록
        filteredMembersCount: 0,
        useFilter: false,
        sortBy : '',
        searchUserName : ''
    }),
    actions: {
        setMembers(data) {
            this.members = data;
            this.setMembersCount(data.length);
        },
        setMembersCount(data) {
            this.membersCount = data;
        },
        setFilteredMemberCount(data) {
            this.filteredMembersCount = data;
        },
        setSearchUserName(data) {
            this.searchUserName = data;
            this.filteredMembers = this.members.filter(m =>
                m.userName.includes(data)
            )
            let count = this.filteredMembers.length;

            this.setFilteredMemberCount(count);
        },
        setUseFilter(data) {
            this.useFilter = data;
        }
    }
})