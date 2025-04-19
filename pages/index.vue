<template>
</template>

<script setup lang="ts">
import {useUser} from "#imports";

const router = useRouter();
const user = useUser();
onMounted(async () => {
  if(user.isLogin()) {
    if(user.isTrainer()){
      await router.push(`/trainer`);
    } else {
      await router.push(`/record/`+ user.getId());
    }
  } else {
    await router.push(`/auth/kakao/login`);
  }
})


</script>

<style scoped>

</style>