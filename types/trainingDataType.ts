export enum TrainingStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
}

// 한글 라벨
export const TrainingStatusTypeLabel: Record<TrainingStatus, string> = {
    [TrainingStatus.IN_PROGRESS]: '수업 중',
    [TrainingStatus.COMPLETED]:   '수업 종료',
    [TrainingStatus.CANCELED]:    '수업 해제',
};