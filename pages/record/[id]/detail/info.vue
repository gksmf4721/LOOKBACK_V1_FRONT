<template>

  <div class="container">
    <!-- 다른사람이 작성한 기록일 때 -->
    <header class="default-header" style="display: none;">
      <div class="default-div">
        <div>
          <div class="back-btn-box-text">
            <button @click="goBack"
                    class="back-btn"
            ><img src="@/assets/icons/chevron-left.svg" alt=""></button>
            <div class="default-back-title">1월 10일 (금)</div>
          </div>
        </div>
      </div>
    </header>
    <!-- 자신이 작성한 기록일 떄 -->
    <header class="default-header">
      <div class="default-div">
        <div>
          <div class="back-btn-box-text">
            <button @click="goBack"
                    class="back-btn">
              <img src="@/assets/icons/chevron-left.svg" alt="">
            </button>
            <div class="default-back-title">{{recordWithDetail.recordDate}}</div>
          </div>
        </div>
        <div class="default-header-item">
          <div><img src="@/assets/icons/ellypsis.svg" @click="showBottomPopup = true" alt=""></div>
        </div>
      </div>
    </header>
    <!-- 첫 번째 네모박스 -->
    <div class="record-detail-title" v-if="recordWithDetail.trainer != null">
      <div class="title-image">
        <CommonImage :src="recordWithDetail.trainer?.profileImageUrl"
                     :alt="'사용자 이미지'"
                     :errorImage="'/images/userProfile.jpeg'"
        ></CommonImage>
      </div>
      <div class="title-descript">
        <p class="detail-title gray-text"> &nbsp; | </p>
        <p class="detail-title">&nbsp; {{recordWithDetail.trainer?.userName}} 트레이너 PT <span class="gray-text"> 수업 기록 | {{recordWithDetail?.recordTimeStart}} ~ {{recordWithDetail?.recordTimeEnd}}</span></p>
      </div>
    </div>
    <div class="record-detail-title" v-if="recordWithDetail.trainer == null">
      <div class="title-descript">
        <p class="detail-title">
          <span class="gray-text"> 개인 운동 기록 | {{recordWithDetail?.recordTimeStart}} ~ {{recordWithDetail?.recordTimeEnd}}
          </span>
        </p>
      </div>
    </div>

    <!-- 운동 상세 기록 -->
    <section class="exercise-records">
      <!-- 기록 하나 -->
      <template v-for="(item, index) in recordWithDetail?.exerciseRecords || []"
                :key="index"
      >
        <RecordDetailInfoCard :exerciseRecord="item"

        ></RecordDetailInfoCard>
      </template>
    </section>
    <div id="more-popup" class="detail-popup detail-hidden">
      <div class="detail-popup-content">
        <div class="detail-popup-title detail-bold">더보기</div>
        <div class="detail-popup-item">
          <span class="detail-popup-icon">✏️</span> 운동기록 편집
        </div>
        <div class="detail-popup-item">
          <span class="detail-popup-icon">🗑️</span> 운동기록 삭제
        </div>
        <div class="detail-popup-item">
          <span class="detail-popup-icon">📋</span> 운동기록 복사
        </div>
        <div class="detail-popup-item">
          <span class="detail-popup-icon">➕</span> 새로운 루틴으로 등록
        </div>
      </div>
    </div>
    <div id="delete-popup" class="delete-popup hidden">
      <div class="delete-popup-content">
        <p class="delete-popup-title">이 운동기록을 삭제할까요?</p>
        <div class="delete-popup-actions">
          <button id="cancel-btn" class="delete-popup-btn cancel-btn">취소</button>
          <button id="confirm-delete-btn" class="delete-popup-btn delete-btn">삭제</button>
        </div>
      </div>
    </div>
  </div>
  <div>
    <BottomPopup :show="showBottomPopup" @close="showBottomPopup = false">
      <div>
        <h3 class="bottom-popup-title">더보기</h3>
        <ul class="popup-menu">
          <li class="popup-item" @click="modifyRecord">
            <span class="detail-popup-icon">✏️</span> 운동기록 편집
          </li>
          <li class="popup-item">
            <span class="detail-popup-icon">🗑️</span> 운동기록 삭제
          </li>

        </ul>
      </div>
    </BottomPopup>
  </div>
</template>

<script setup lang="ts">
import {api} from "~/store/api";
import type {RecordWithDetails} from "~/types/recordDataType";
import BottomPopup from "~/components/popup/BottomPopup.vue";

const route = useRoute();
const userId = route.params.id;
const recordIdParam = route.query.recordId;
const router = useRouter();
const recordId: number = recordIdParam && !isNaN(recordIdParam)?
    Number(recordIdParam): null;

const recordWithDetail: RecordWithDetails = ref([]);
const showBottomPopup = ref(false);

onMounted(async ()=>{
  if(recordId) {
    const response = await useRecord().recordWithDetail({recordId: recordId});
    recordWithDetail.value = response.result;
  }
})

const fallbackImage = '/images/1.png' // public 폴더에 있어야 함
function onImageError(event: Event) {
  const target = event.target as HTMLImageElement
  target.src = fallbackImage
}

const goBack = () => {
  router.push(`/record/${userId}`); // 기본 홈 또는 지정한 페이지로
};

const modifyRecord = () =>{
  router.push(`/record/${userId}/save/${recordId}`);
}
</script>

<style scoped>

</style>