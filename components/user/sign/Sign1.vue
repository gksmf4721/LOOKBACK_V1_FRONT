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
             @click="setUserType(item.value)"
             :class="{active : userType == item.value}"
             data-type="member">{{ item.name }}</div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {useUserStore} from "~/store/user";
const userStore = useUserStore();
const props = defineProps({
  userType: {
    type: String,
    default: ''
  }
})
const types = [{name: '회원', value: 'MEMBER'},{name: '트레이너', value: 'TRAINER'}];

const emits = defineEmits(['setUserType']);
const setUserType = (userType : string) => {
  emits('setUserType', userType);
}


</script>

<style scoped>

</style>