import {api} from "~/store/api";

export const useMember = () => {
    const trainerMember = async (data) => {
        try {
            const response = await api().get(`/trainer/member`,data);
            return response;
        } catch (e) {
            console.error("[trainerMember] 요청실패 : ", e);
        }
    }

    return {trainerMember}
}