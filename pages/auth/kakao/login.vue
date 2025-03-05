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
  </div>
</template>

<script setup lang="ts">
import {api} from "~/store/api";

const loginWithKakao = async () => {
  const response = await api().get(`/auth/kakao/login`);
  window.location.href = response;
};
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