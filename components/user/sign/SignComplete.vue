<template>
  <Transition name="fade">
    <div v-show="userStore.selectedStep === 3" class="step3">
      <div class="">
        <p class="join-title" >
          가입이 완료 되었어요!
        </p>
        <br/>
        <p class="join-title">
          {{ finalMessage }}
        </p>
        <p class="join-title" v-if="userStore.user.userType == 'TRAINER'">
          이제 회원님들의 수업기록을 더 편하게 관리해보세요!
        </p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {useUserStore} from "~/store/user";

const userStore = useUserStore();

const finalMessage = computed(() => {
  if(userStore.user && Object.keys(userStore.user).length != 0) {
    return userStore.user.userType == 'TRAINER'
        ? '마이페이지에서 트레이너님의 프로필을 완성해주세요.'
        : '이제 트레이너님과 함께 회원님의 운동을 기록해보세요!'
  }
  return '';
})
</script>

<style scoped>

</style>