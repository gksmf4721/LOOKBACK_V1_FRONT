<template>
  <div class="container">
      <div class="">
        <p class="join-title" >
          트레이너님 연결 신청을 수락해 주세요!
        </p>
        <br/>
          <div class="profile-container">
            <div class="profile-image">
              <CommonImage :src="trainer?.profileImageUrl"
                           :alt="'사용자 이미지'"
                           :errorImage="'@/assets/images/1.png'"
              ></CommonImage>
            </div>
          </div>
        <div class="user-add-text ">
          {{description}}
        </div>
        <!-- 초대 링크 및 다른 앱 공유 버튼 -->
        <div class="invite-buttons margin-top-30">
          <button v-if="!trainer.hasOtherTraining"
                  class="invite-option"
                  style="background: black; color: white"
                  @click="addMember">수락하기</button>
        </div>
      </div>
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
import type {Trainer} from "~/types/trainerDataType";
import {computed} from "vue";
import {TrainingStatus} from "~/types/trainingDataType";
const route = useRoute();
const router = useRouter();

const showSingleConfirm = ref(false);
const confirmModalMessage = ref('');
const trainerId = route.query.code;
const trainer: Ref<Trainer> = ref({});

onMounted( async ()=>{
  const id = useUser().getId();

  if(id == null || id == 0) {
    showSingleConfirm.value = true;
    confirmModalMessage.value = '로그인이 필요합니다.';
    return ;
  }

  const response = await useTrainer().addMemberInfo({trainerId : trainerId});
  if (response.status == 200) {
      trainer.value = response.result;
  }

  // 에러 처리
  if (response?.status === 404 || response?.status === 500) {
    confirmModalMessage.value = response.data.message;
    showSingleConfirm.value = true;
  }

});

const description = computed(() => {
  if ( !trainer.value?.hasOtherTraining ) {
    return `${trainer.value?.trainerName} 트레이너님이 연결을 요청했어요.
트레이너님과 계정을 연결하면 개인 운동 기록과 PT 수업 기록을 같이 볼 수 있어요.`
  } else {
    return `이미 ${trainer.value?.studentName}님과 연결된 다른 트레이너님이 있어 요청을 수락할 수 없어요.
새로운 트레이너님과 연결하려면, 기존 트레이너님에게 연락하여 연결 해제를 요청해보세요.`
  }
})


const addMember = async () => {
  showSingleConfirm.value = true;

  const response = await useTrainer().addMember({trainerId : trainerId});

  if (!response.result.alreadyTraining){
    confirmModalMessage.value = `${trainer.value?.trainerName} 트레이너님과 연결이 완료되었어요`;
    showSingleConfirm.value = true;

  } else {
    confirmModalMessage.value = `이미 ${trainer.value?.trainerName} 트레이너님과 연결되어 있어요`;
    showSingleConfirm.value = true;
  }
}

const onSingleConfirm = () => {
  router.push('/');
}

</script>

<style scoped>
</style>