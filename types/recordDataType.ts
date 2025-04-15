import type {User} from "~/types/userDataType";
import type {ExerciseRecord} from "~/types/exerciseRecord";
import type {ExerciseRecordDetail} from "~/types/exerciseRecordDetail";

export interface RecordWithDetails {
    recordId: number;
    trainingId: number;
    recordDate: string;
    recordTimeStart: string;
    recordTimeEnd: string;
    exerciseMinute: number;
    comment: string;
    shareStatus: string;
    trainer: User;
    member: User;
    exerciseRecords: ExerciseRecord[];
}
