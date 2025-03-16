import {api} from "~/store/api";

export const useUser = () => {
    const updateBasicInfo = async (data) => {
        try {
            const response = await api().post(`/user/updateBasicInfo`,data);
            return response;
        } catch (e) {
            console.error("[updateBasicUser] 요청실패 : ", e);
        }
    }

    return {updateBasicInfo}
}