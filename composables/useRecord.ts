import {api} from "~/store/api";

export const useRecord  = () => {
    const recordList = async(data) => {
        try {
            const response = await api().get(`/record/list`,data);
            return response;
        } catch (e) {
            console.error("[recordList] 요청실패 : ", e);
        }
    }

    const recordSave = async (data) => {
        try {
            const response = await api().post(`/record/save`,data);
            return response
        } catch (e) {
            console.error("[recordSave] 요청실패 : ", e);
        }
    }

    const recordDetailSave = async (data) => {
        try {
            const response = await api().post(`/record/detail/save`,data);
            return response
        } catch (e) {
            console.error("[recordDetailSave] 요청실패 : ", e);
        }
    }


    return {recordList, recordSave, recordDetailSave}
}