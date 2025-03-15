import {defineStore} from 'pinia'

export const useRecordStore = defineStore('record', {
    state: () => ({
        records: []
    }),
    actions: {
        setRecords(data) {
            this.records = data;
        }
    }
})