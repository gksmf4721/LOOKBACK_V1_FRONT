<template>
  <!-- 전체 컨테이너 -->
  <div class="container">
    <!-- 상단 타이틀 (검색창 포함) -->
    <header class="default-header">
      <div>
        <div class="back-btn-box-text">
          <button @click="goBack"
                  class="back-btn"
          ><img src="@/assets/icons/chevron-left.svg" alt=""></button>
          <div class="default-back-title">회원 추가</div>
        </div>
      </div>
    </header>

    <div class="user-add-container">
      <div class="user-add-text">
        <p>새로운 회원을 초대해보세요.</p>
        <p>초대장을 받은 회원이 수락하면 트레이너님의 회원 목록에 추가됩니다.</p>
      </div>
      <div class="margin-top-30">
        <button @click="handleKakaoInvite" class="kakao-invite-btn">카카오톡 초대</button>
      </div>
      <!-- 카카오톡 초대 버튼 -->

      <!-- 초대 링크 및 다른 앱 공유 버튼 -->
      <div class="invite-buttons">
        <button @click="handleCopyLink" class="invite-option">초대링크 복사</button>
        <button @click="handleSystemShare" class="invite-option">다른 앱으로 초대</button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";
const toast = useToast();
const config = useRuntimeConfig();
const kakaoAppKey = config.public.kakaoAppKey
const baseurl = config.public.baseUrl

const router = useRouter();
const goBack = () => {
  router.push(`/`); // 기본 홈 또는 지정한 페이지로
};
const code = useUser().getId();

// runtime Config
const inviteLink = ref(`${baseurl}/trainer/addMember?code=${code}`);

const loadKakaoSdk = () =>
    new Promise<void>((resolve, reject) => {
      if (window.Kakao) return resolve()
      const s = document.createElement('script')
      s.src = 'https://developers.kakao.com/sdk/js/kakao.min.js'
      s.onload = () => resolve()
      s.onerror = () => reject(new Error('Kakao SDK 로드 실패'))
      document.head.appendChild(s)
    })

const handleKakaoInvite = async () => {
  if (!process.client) return
  await loadKakaoSdk()
  if (!window.Kakao.isInitialized()) window.Kakao.init(kakaoAppKey)

  window.Kakao.Link.sendDefault({
    objectType: 'text',
    text: '💪 트레이너가 당신을 초대했습니다!',
    link: { mobileWebUrl: inviteLink.value, webUrl: inviteLink.value },
    buttons: [
      {
        title: '초대 수락하기',
        link: { mobileWebUrl: inviteLink.value, webUrl: inviteLink.value },
      },
    ],
  })
}

const handleCopyLink = () => {
  navigator.clipboard.writeText(inviteLink.value);
  toast.success('초대 링크가 복사되었습니다 🎉');
}

const handleSystemShare = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: '트레이너 초대',
        text: '💪 트레이너가 당신을 초대했습니다!',
        url: inviteLink.value,
      })
    } catch (_) {
      /* 사용자가 취소했거나 실패 */
    }
  } else {
    handleCopyLink() // 미지원 브라우저 폴백
  }
}


</script>

<style scoped>

</style>