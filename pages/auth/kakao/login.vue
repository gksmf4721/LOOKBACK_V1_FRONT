<template>
  <div class="login-wrapper">
    <div class="login-content">
      <div class="login-title2">
        <p class="text1">회원님,</p>
        <p>운동하셔야죠!</p>
      </div>
      <button @click="loginWithKakao" class="kakao-btn2">
        <img src="@/assets/images/kakao_login_medium_wide.png" alt="카카오 로그인" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { api } from '~/store/api';

const loginWithKakao = async () => {
  const response = await api().get('/auth/kakao/login');
  window.location.href = response;
};
</script>

<style scoped>
.login-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 0 1rem;
}

.login-content {
  display: flex;
  flex-direction: column;
  align-items: center; /* 버튼 중앙 정렬 유지 */
}

.login-title2 {
  font-size: 2rem;
  font-weight: 900;
  color: #000;
  margin-bottom: 20rem;
  width: 100%;
  max-width: 300px; /* 버튼 이미지와 너비 맞추기 */
  text-align: left;
}

.login-title2 p {
  margin: 0.3rem 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px); /* 아래서 살짝 올라오듯 */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-title2 {
  font-size: 2rem;
  font-weight: 900;
  color: #000;
  margin-bottom: 20rem;
  width: 100%;
  max-width: 300px;
  text-align: left;

  opacity: 0;
  animation: fadeIn 1s ease-out forwards;
  animation-delay: 0.2s;
}

.kakao-btn2 {
  border: none;
  background: none;
  padding: 0;
  padding-bottom: 100px;

  opacity: 0;
  animation: fadeIn 1s ease-out forwards;
  animation-delay: 1.2s; /* 글자보다 1초 뒤에 나타남 */
}

.kakao-btn2 img {
  display: block;
  width: 300px;
  max-width: 100%;
  height: auto;
}

</style>
