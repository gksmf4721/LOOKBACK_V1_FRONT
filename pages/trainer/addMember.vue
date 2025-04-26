<template>
<div>
  <SingleConfirmModal
    :show="showSingleConfirm"
    :title="'회원 연결'"
    :message="confirmModalMessage"
    @confirm="onSingleConfirm"
  />
</div>
</template>

<script setup lang="ts">

import {useTrainer, useUser} from "#imports";
import SingleConfirmModal from "~/components/popup/SingleConfirmModal.vue";

const showSingleConfirm = ref(false);

const route = useRoute();
const trainerId = route.query.code;
const router = useRouter();
const confirmModalMessage = ref('로그인 후에 이용해 주세요.');

onMounted( async ()=>{
  const id = useUser().getId();

  if(id == null || id == 0) {
    showSingleConfirm.value = true;
    return ;
  }

  const response = await useTrainer().addMember({trainerId : trainerId});
  debugger;
  if (response.status === 200){
    showSingleConfirm.value = true;
  } else {

  }


})

const onSingleConfirm = () => {
  router.push(`/auth/kakao/login`);
}

</script>

<style scoped>
</style>