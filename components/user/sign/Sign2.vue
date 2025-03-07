<template>
  <Transition :name="transitionName">
    <div v-if="userStore.selectedStep === 2" class="step2">
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
              <input type="text" v-model="userStore.height" id="record-display" />
              <span class="input-unit">cm</span>
            </div>
          </div>
        </div>
        <!-- 몸무게 입력 -->
        <div class="record-section bottom-30">
          <label for="record-date">몸무게</label>
          <div class="record-section bottom-30">
            <div class="input-wrapper">
              <input type="text" v-model="userStore.weight" id="record-display" />
              <span class="input-unit">kg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import {computed} from "vue";
  import {useUserStore} from "~/store/user";

  const userStore = useUserStore();

  const transitionName = computed(() => {
    return useUserStore.selectedStep == 3 ? 'fade' : 'slide'
  })

</script>

<style scoped>

</style>