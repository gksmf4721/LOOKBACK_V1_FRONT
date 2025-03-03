<template>
  <!-- 전체 컨테이너 -->
  <div class="container">
    <header class="default-header">
      <div class="default-div">
        <div>
          <div class="back-btn-box-text">
            <button class="back-btn" v-if="selectedStep === 2" @click="prevStep"><img src="@/assets/icons/chevron-left.svg" alt=""></button>
          </div>
        </div>
      </div>
    </header>
    <!-- Date Section -->
    <Transition name="fade">
      <div v-if="selectedStep === 1"  class="step1">
        <div class="">
          <p class="join-title ">
            반가워요! <br/>
            당신은 누구인가요?
          </p>
        </div>
        <div class="user-type-container">
          <!-- 기본으로 선택되어 있는 회원 박스 -->
          <div class="user-type-box"
               v-for="item in types"
               @click="selectType(item)"
               :class="{active : selectedType == item}"
               data-type="member">{{ item }}</div>
        </div>
      </div>
    </Transition>
    <Transition name="slide">
      <div v-if="selectedStep ===2" class="step2">
        <div class="">
          <p class="join-title ">
            회원님의 키와 몸무게를 알려주세요.
          </p>
        </div>
        <div class="create-records">
          <!-- 키 입력 -->
          <div class="record-section bottom-30">
            <label for="record-date">키</label>
            <div class="record-section bottom-30">
              <div class="input-wrapper">
                <input type="text" v-model="height" id="record-display" />
                <span class="input-unit">cm</span>
              </div>
            </div>
          </div>
          <!-- 몸무게 입력 -->
          <div class="record-section bottom-30">
            <label for="record-date">몸무게</label>
            <div class="record-section bottom-30">
              <div class="input-wrapper">
                <input type="text" v-model="weight" id="record-display" />
                <span class="input-unit">kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <footer class="fixed-footer-btn">
      <button type="button" @click="selectedStep ===1 ? nextStep() : submit()" class="create-record-btn">
        {{selectedStep === 1 ? '다음' : '저장'}}
      </button>
    </footer>
  </div>
</template>

<script setup lang="ts">

//data
import {useRuntimeConfig} from "#app";

const selectedType = ref("회원");
const weight = ref("");
const height = ref("");

const types = ['회원','트레이너'];
const selectedStep = ref(1);
const selectType = (type) => {
  selectedType.value = type;
}

// ✅ setTimeout으로 step1을 먼저 숨기고 step2를 등장시킴
const nextStep = () => {
  const step1 = document.querySelector('.step1');
  if (step1) {
    step1.style.opacity = '0'; // 즉시 사라지게 만듦
    setTimeout(() => {
      selectedStep.value = 2;
    }, 200); // 200ms 후 step2 등장
  }
};

const prevStep = () => {
  const step1 = document.querySelector('.step2');
  if (step1) {
    step1.style.opacity = '0'; // 즉시 사라지게 만듦
    setTimeout(() => {
      selectedStep.value = 1;
    }, 200); // 200ms 후 step2 등장
  }
};

const token = localStorage.getItem("jwtToken");

console.log(token);
const config = useRuntimeConfig();
const submit = async() => {
  console.log("여기도 " + token);
  const response = await $fetch(`${config.public.apiBase}/user/updateBasicInfo`,{
    method:'POST',
    headers: new Headers({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }),
    params: {
      weight : weight.value,
      height : height.value,
      userType : selectedType.value === '트레이너' ? 'Y' : 'N'
    }
  });
}


</script>

<style scoped>
/* 🏆 step1을 바로 사라지게 만들고 step2가 자연스럽게 등장 */
.step-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
  /* 오른쪽 슬라이드 애니메이션 */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}

.step {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}
</style>