<template>
  <Transition name="fade">
    <div v-if="userStore.selectedStep === 1"  class="step1">
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
             @click="userStore.setSelectedType(item)"
             :class="{active : selectedType== item}"
             data-type="member">{{ item }}</div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {useUserStore} from "~/store/user";
const userStore = useUserStore();

const types = ['회원','트레이너'];

const selectedType = computed(() => {
  return userStore.selectedType;
});

</script>

<style scoped>

</style>