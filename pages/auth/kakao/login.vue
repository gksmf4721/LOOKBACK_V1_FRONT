<template>
  <div class="login-container">
    <div >
      <h1 class="main-h1">
        <p>
          회원님,
        </p>
        <p>
          운동하셔야죠!
        </p>

      </h1>
    </div>
    <button @click="loginWithKakao" class="kakao-btn">카카오로 시작하기</button>
    <button @click="testLogin(2)" class="kakao-btn">트레이너 테스트 </button>
    <button @click="testLogin(3)" class="kakao-btn">멤버 A 테스트</button>
    <button @click="testLogin(4)" class="kakao-btn">멤버 B 테스트</button>
  </div>
</template>

<script setup lang="ts">
import {api} from "~/store/api";

const loginWithKakao = async () => {
  const response = await api().get(`/auth/kakao/login`);
  window.location.href = response;
};

const testLogin: void = async (id: number) => {
  const response = await api().get(`/testLogin`, {userId : id});

  localStorage.setItem('jwtToken', response.jwtToken);
  localStorage.setItem('refreshToken', response.refreshToken);
  localStorage.setItem('userType', response.userType);
  localStorage.setItem('userId', response.userId);

  await useRouter().replace('/');

}
</script>

<style scoped>
/* 기본 스타일 초기화 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 바디 전체 영역을 가운데 정렬 */
body {
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff; /* 배경색은 흰색 */
}

</style>