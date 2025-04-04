
export interface ExerciseRecordDetail {
    exerciseRecordDetailId: number;
    ord: number;
    repsPerSet: number;
    weight: number;
    duration: number;
    memo: string;
    type: ExerciseDetailTypes;
}

export enum ExerciseDetailTypes {
    STRENGTH = 'STRENGTH',
    CARDIO = 'CARDIO',
    TIME = 'TIME',
    SPEED = 'SPEED',
    DISTANCE = 'DISTANCE',
    INCLINE = 'INCLINE',
    HEART_RATE = 'HEART_RATE',
    CALORIES = 'CALORIES'
}

// 한글 라벨
export const ExerciseDetailTypeLabel: Record<ExerciseDetailTypes, string> = {
    [ExerciseDetailTypes.STRENGTH]: '근력',
    [ExerciseDetailTypes.CARDIO]:   '유산소',
    [ExerciseDetailTypes.TIME]:     '시간',
    [ExerciseDetailTypes.DISTANCE]: '거리',
    [ExerciseDetailTypes.SPEED]:    '속도',
    [ExerciseDetailTypes.INCLINE]:  '경사',
    [ExerciseDetailTypes.HEART_RATE]: '심박수',
    [ExerciseDetailTypes.CALORIES]:   '칼로리'
};

// 단위 라벨
export const ExerciseDetailTypeUnit: Record<ExerciseDetailTypes, string> = {
    [ExerciseDetailTypes.TIME]:     '분',
    [ExerciseDetailTypes.DISTANCE]: 'km',
    [ExerciseDetailTypes.SPEED]:    'km/h',
    [ExerciseDetailTypes.INCLINE]:  '',
    [ExerciseDetailTypes.HEART_RATE]: 'BPM',
    [ExerciseDetailTypes.CALORIES]:   'Kcal'
};
