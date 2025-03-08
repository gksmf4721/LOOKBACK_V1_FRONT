<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

onMounted(async () => {
  const code = route.query.code;
  const redirect = route.query.state || '/'; // 원래 있던 페이지 or 홈

  if (!code) {
    console.error("❌ 인증 코드가 없습니다.");
    router.replace(redirect);
    debugger;
    return;
  }

  const config = useRuntimeConfig();
  try {
    debugger;
    const response = await $fetch(`${config.public.apiBase}/auth/kakao/callback`, {
      method : 'GET',
      params: { code }
    });
    debugger;
    localStorage.setItem('jwtToken', response.jwtToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    // ✅ 회원가입 미완료 상태라면 '/signup'으로 이동
    if (response.isProfileComplete == 'N') {
      await router.replace('/sign');
    } else {
      if(response.userType == 'MEMBER'){
        await router.replace('/');
      } else {
        await router.replace('/trainer');
      }
    }
  } catch (err) {
    console.error("❌ 로그인 에러:", err);
  }
});
</script>