<template>
  <!-- 전체 컨테이너 -->
  <div class="container">
    <header class="default-header">
      <div class="default-div">
        <div>
          <div class="back-btn-box-text">
            <Transition name="slide">
              <button class="back-btn" v-if="userStore.selectedStep === 2" @click="prevStep"><img src="@/assets/icons/chevron-left.svg" alt=""></button>
            </Transition>
          </div>
        </div>
      </div>
    </header>
    <!-- Date Section -->
    <Sign1 :userType="userType"
           @setUserType="setUserType"
    ></Sign1>
    <Sign2></Sign2>
    <SignComplete></SignComplete>
    <footer class="fixed-footer-btn">
      <button type="button"
              @click="userStore.selectedStep ===1 ? nextStep() :
               userStore.selectedStep ===2 ? submit() : movePage()"
              class="create-record-btn">
        {{userStore.selectedStep === 1 ? '다음' : '완료'}}
      </button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "#vue-router";
import {useUserStore} from "~/store/user";
import Sign1 from "~/components/user/sign/Sign1.vue";
import {useUser} from "~/composables/useUser";
import Sign2 from "~/components/user/sign/Sign2.vue";
import {useToast} from "vue-toastification";
import SignComplete from "~/components/user/sign/SignComplete.vue";

const router = useRouter();
const userStore = useUserStore();
const toast = useToast();
const userType = ref('MEMBER');

const setUserType = (selectUserType: string) => {
  userType.value = selectUserType;
}

// ✅ setTimeout으로 step1을 먼저 숨기고 step2를 등장시킴
const nextStep = () => {
  const step1 = document.querySelector('.step1');
  if (step1) {
    step1.style.opacity = '0'; // 즉시 사라지게 만듦
    setTimeout(() => {
      userStore.setSelectedStep(2);
    }, 200); // 200ms 후 step2 등장
  }
};

const prevStep = () => {
  const step1 = document.querySelector('.step2');
  if (step1) {
    step1.style.opacity = '0'; // 즉시 사라지게 만듦
    setTimeout(() => {
      userStore.setSelectedStep(1);
    }, 200); // 200ms 후 step2 등장
  }
};

const movePage = () => {
    router.replace("/");
}

const submit = async() => {
  if (!userStore.height || isNaN(Number(userStore.height)) || Number(userStore.height) <= 0) {
    toast.error("올바른 키를 입력해주세요.");
    return;
  }

  if (!userStore.weight || isNaN(Number(userStore.weight)) || Number(userStore.weight) <= 0) {
    toast.error("올바른 몸무게를 입력해주세요.");
    return;
  }
  const response = await useUser().updateBasicInfo({
    weight: userStore.weight,
    height: userStore.height,
    userType: userType.value,
  })
  userStore.setUser(response.result);
  useUser().setUserType(response.result.userType);


  const step2 = document.querySelector('.step2');
  const step3 = document.querySelector('.step3');

  if (step2 && step3) {
    step2.style.transition = "opacity 0.3s ease-out"; // ✅ 사라질 때 부드럽게
    step3.style.transition = "opacity 0.5s ease-in, transform 0.5s ease-in-out"; // ✅ 등장할 때 fade-in

    step2.style.opacity = "0"; // ✅ step2 페이드 아웃
    step3.style.opacity = "0"; // ✅ step3도 초기에 숨김

    userStore.setSelectedStep(3);
    setTimeout(() => {
      step3.style.opacity = "1"; // ✅ step3가 서서히 등장
      step3.style.transform = "translateY(0)"; // ✅ 아래에서 올라오는 효과 추가
    }, 300); // step2가 사라진 후 step3 등장
  }

};

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