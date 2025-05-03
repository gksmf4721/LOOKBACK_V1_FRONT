import {TrainingStatus} from "~/types/trainingDataType";

export interface Trainer {
    trainerId: number;
    trainerName: string;
    trainerNickName: string;
    trainingStatus: TrainingStatus;
    studentName: string;
    studentNickName: string;
    hasOtherTraining: boolean;
}