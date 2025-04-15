import type {MuscleGroup} from "~/types/muscleGroup";
import type {Equipment} from "~/types/equipment";
import type {MuscleCategory} from "~/types/muscleCategory";

export interface Exercise {
    exerciseId: number;
    exerciseType: ExerciseType;
    exerciseName: string;
    exerciseLevel: number;
    caloriesBurned: number;
    description: string;
    imageUrl: string;
    muscleGroup?: MuscleGroup[];
    equipmentCategory: Equipment;
    isChecked: boolean;
}

export enum ExerciseType {
    STRENGTH = 'STRENGTH',
    CARDIO = 'CARDIO',
    STRETCHING = 'STRETCHING'
}

export interface ExerciseTypes {
    key: string;
    value: string;
}

export interface ResponseExercise {
    exerciseTypes:     ExerciseTypes[];
    strengthExercises: Exercise[];
    cardioExercises:   Exercise[];
    stretchingExercises: Exercise[];
    muscleCategories: MuscleCategory[];
    equipments: Equipment[];
}