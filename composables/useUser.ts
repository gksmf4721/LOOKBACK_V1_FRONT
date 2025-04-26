import {api} from "~/store/api";
import {ExerciseDetailTypes} from "~/types/userDataType";

export const useUser = () => {
    const updateBasicInfo = async (data) => {
        try {
            const response = await api().post(`/user/updateBasicInfo`,data);
            return response;
        } catch (e) {
            console.error("[updateBasicUser] 요청실패 : ", e);
        }
    }

    const findUser = async (data) => {
        try {
            const response = await api().get(`/user`,data);
            return response;
        } catch (e) {
            console.error("[findUser] 요청실패 : ", e);
        }
    }

    const setUserType = (userType: string) => {
        localStorage.setItem("userType", userType);
    }

    const getUserType = () => {
        const userType = localStorage.getItem("userType");
        return userType;
    }

    const getToken = () => {
        const token = localStorage.getItem("jwtToken");
        return token;
    }

    const isLogin = () => {
        const token = getToken();
        return token != null && token !== '';
    }

    const isTrainer = () => {
        const userType = getUserType();
        return userType === ExerciseDetailTypes.TRAINER;
    }

    const isMember = () => {
        const userType = getUserType();
        return userType === ExerciseDetailTypes.MEMBER;
    }

    const getId = () => {
        const userId = localStorage.getItem("userId");
        return userId;
    }

    return {updateBasicInfo,  findUser, isLogin, isMember, isTrainer, getId, setUserType, getUserType}
}