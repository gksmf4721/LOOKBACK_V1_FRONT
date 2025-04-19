import type {MuscleCategory} from "~/types/muscleCategory";

export interface MuscleGroup {
    muscleGroupId: number;
    muscleCategory: MuscleCategory;
    muscleType: '주동근' | '보조근'
    categoryParentsName : string;
    muscleName: string;
}