import { defineStore } from "pinia";
import axios, { AxiosInstance } from "axios";
import { useRuntimeConfig } from "#app";

export const api = defineStore("api", () => {
    const config = useRuntimeConfig();
    const router = useRouter();
    // ✅ Axios 인스턴스 생성
    const api: AxiosInstance = axios.create({
        baseURL: config.public.apiBase, // 환경변수에서 API Base URL 가져옴
        timeout: 20000,
        headers: {
            "Content-Type": "application/json",
        },
    });

    // ✅ 요청 인터셉터 (JWT 토큰 자동 추가)
    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("jwtToken");
            const refreshToken = localStorage.getItem("refreshToken");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                //로그인이 필요한 경우
                toast.error('로그인이 필요합니다. 2초 뒤 로그인 화면으로 이동합니다.');
                setTimeout(() => {
                    router.push('/auth/kakao/login');
                }, 2000); // 2000ms = 2초
            }
            if (refreshToken) {
                config.headers["Refresh-Token"] = refreshToken;
            }
            return config;
        },
        (error) => {
            console.error("🚨 요청 인터셉터 오류:", error);
            return Promise.reject(error);
        }
    );

    // ✅ GET 요청 함수
    const get = async (url: string, params?: object) => {
        try {
            const response = await api.get(url, { params });
            return response.data;
        } catch (error) {
            console.error("❌ GET 요청 실패:", error);
            return error.response.data
            throw error;
        }
    };

    // ✅ POST 요청 함수
    const post = async (url: string, data?: object, config = {}) => {
        try {
            const response = await api.post(url, data, config);
            return response.data;
        } catch (error) {
            return error.response.data
            throw error;
        }
    };

    return { get, post };
});
