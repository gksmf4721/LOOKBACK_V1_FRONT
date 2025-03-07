import { defineNuxtPlugin } from "#app";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Toast, {
        position: "top-center", // ✅ 화면 중앙 위쪽으로 위치
        timeout: 2000, // ✅ 2초 후 자동으로 사라짐
        closeOnClick: false, // ✅ 클릭해도 바로 닫히지 않도록
        pauseOnHover: false, // ✅ 마우스를 올려도 멈추지 않음
        transition: "Vue-Toastification__fade", // ✅ 부드러운 fade 애니메이션
        hideProgressBar: true, // ✅ 진행바 숨김 (깔끔한 느낌)
        maxToasts: 1, // ✅ 한 번에 하나만 표시 (요란하지 않게)
        newestOnTop: true, // ✅ 가장 최근 메시지를 맨 위에 표시
    });
});
