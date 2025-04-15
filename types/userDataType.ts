export interface User {
    userId: number;
    kakaoId: string;
    email: string;
    password: string;
    phone: string;
    birthDt: number;
    weight: number;
    height: number;
    snsProvider: string;
    snsId: string;
    userName: string;
    nickName: string;
    profileImageUrl: string;
    verified: string;
    gender: string;
    signupDate: string; // ISO 문자열로 받는다고 가정
    lastLoginDate: string;
    status: string;
    userType: ExerciseDetailTypes; // Enum 값에 따라 조정 필요
    isProfileComplete: string;
}

export enum ExerciseDetailTypes {
    TRAINER = 'TRAINER',
    MEMBER = 'MEMBER',
}

