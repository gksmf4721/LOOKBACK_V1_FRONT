import type {FileType} from "~/types/file";

export const useFileStore = defineStore('file', () =>{
    const uploadFile = async (e : Event, fileType: FileType ) => {
        const target = e.target as HTMLInputElement
        const file = target.files?.[0]
        if (!file) return

        // 백엔드에 파일 업로드
        const formData = new FormData()
        formData.append('file', file);
        formData.append('fileType', fileType);

        const response = await useFile().uploadFile(formData);

        return response.result;
    }

    return { uploadFile }
})