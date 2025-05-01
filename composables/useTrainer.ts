import {api} from "~/store/api";

export const useTrainer = () => {
    const cancelTraining = async (data) => {
        try {
            const response = await api().post(`/trainer/cancel`,data);
            return response;
        } catch (e) {
            console.error("[cancelTraining] 요청실패 : ", e);
        }
    }

    const addMemberInfo = async (data) => {
        try {
            const response = await api().get(`/trainer/addMember/info`,data);
            return response;
        } catch (e) {
            console.error("[addMemberInfo] 요청실패 : ", e);
        }
    }

    const addMember = async (data) => {
        try {
            const response = await api().post(`/trainer/addMember`,data);
            return response;
        } catch (e) {
            console.error("[addMember] 요청실패 : ", e);
        }
    }

    return { cancelTraining, addMemberInfo, addMember }
}