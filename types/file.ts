
export interface UploadFile {
    originalName : string;
    fileName: string;
    fullPath: string;
    extension: string;
    relativePath: string;
    ord: number;
}

export enum FileType {
    EXERCISE_RECORD = 'EXERCISE_RECORD'
}