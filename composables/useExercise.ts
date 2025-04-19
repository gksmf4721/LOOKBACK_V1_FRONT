import {api} from "~/store/api";
import type {ResponseExercise} from "~/types/exercise";

export const useExercise = () => {
    const exercises = async() => {
        try {
            const response = await api().get(`/exercises`);
            return response;
        } catch (e) {
            console.error('운동 카테고리를 불러오는데 실패했습니다.', e);
        }
    }
    const getResponseExercise = async (): Promise<ResponseExercise | undefined> => {
        try {
            const response = await exercises();
            return response.result as ResponseExercise
        } catch (e) {
            console.log('운동 데이터 조회에 실패했습니다.')
        }
    }

    const getExerciseDetail = async(data) => {
        try {
            const response = await api().get(`/exercise`, data);
            return response;
        } catch (e) {
            console.error('운동 데이터를 불러오는데 실패했습니다.', e);
        }
    }

    return {getResponseExercise, getExerciseDetail}
}
