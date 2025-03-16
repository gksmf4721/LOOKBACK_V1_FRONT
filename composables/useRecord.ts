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

    return {recordList}
}