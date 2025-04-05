import {api} from "~/store/api";

export const useFile = () => {
    const uploadFile = async (formData) => {
        try {
            const response = await api().post(`/api/file/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data"}
            })
            return response
        } catch (e) {
            console.error("[uploadFile] 파일 업로드 실패 : ", e);
        }
    }

    return { uploadFile }
}