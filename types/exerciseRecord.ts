import type {ExerciseRecordDetail} from "~/types/exerciseRecordDetail";
import type {UploadFile} from "~/types/file";

export interface ExerciseRecord {
    exerciseRecordId: number;
    recordId: number;
    exerciseId: number;
    duration: string;
    memo: string;
    ord: number;
    imageUrl: string;
    exerciseName: string;
    exerciseRecordDetails: ExerciseRecordDetail[];
    uploadFiles: UploadFile[];
}

