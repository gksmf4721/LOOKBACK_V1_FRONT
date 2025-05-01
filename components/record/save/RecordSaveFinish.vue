<template>
  <Transition name="fade">
    <div>
      <div class="">
        <p class="join-title" >
          수업기록 생성이 완료되었어요!
        </p>
        <br/>
        <div class="user-share-text">
          <img src="@/assets/icons/circle-ok.svg" alt="">
        </div>
        <div class="user-add-text " v-html="finalMessage">
        </div>
        <!-- 초대 링크 및 다른 앱 공유 버튼 -->
        <div class="invite-buttons margin-top-30" v-if="useUser().isTrainer()">
          <button class="invite-option" @click="copyLink">링크 복사</button>
          <button class="invite-option" @click="shareLink">공유</button>
        </div>
      </div>
      <footer class="fixed-footer-btn">
        <button @click="router.replace(`/record/${userId}`);"
                type="button"
                class="create-record-btn">
          확인
        </button>
      </footer>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {useToast} from "vue-toastification";

const toast = useToast();
const router = useRouter();
const prop = defineProps({
  userId: {
    type: Number,
    default: 0
  },
  member: {
    type: Object,
    default: {}
  }
})

const finalMessage = computed(() => {
  if (useUser().isTrainer()){
    return `<p>${props.member.userName} 회원님 계정에서도 이 기록이 추가되었어요.</p>
          <p>아래 링크를 복사해 회원님에게 알려주세요!</p>`;
  }
  // TODO 반대로 현재 트레이너에게 공유하기
  if (useUser().isMember()){
    return `<p>트레이너님께 공유는 준비중입니다!</p>
          <p>잠시 기다려 주세요!</p>`;
  }
})

const copyLink = async () => {
  const link = `${window.location.origin}/record`
  await navigator.clipboard.writeText(link)
  toast.success('링크가 복사되었습니다!')
}

const shareLink = () => {
  const url = `${window.location.origin}/record`
  if (navigator.share) {
    navigator.share({
      title: '운동 기록 공유',
      text: '~~회원님과의 수업 기록을 확인해보세요!',
      url: url,
    }).catch((err) => {
      console.error('공유 실패:', err)
    })
  } else {
    alert('공유 기능이 지원되지 않는 브라우저입니다.')
  }
}

</script>

<style scoped>

</style>