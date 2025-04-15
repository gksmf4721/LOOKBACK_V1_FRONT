<template>

  <div class="container">
    <!-- 다른사람이 작성한 기록일 때 -->
    <header class="default-header" style="display: none;">
      <div class="default-div">
        <div>
          <div class="back-btn-box-text">
            <button class="back-btn"><img src="@/assets/icons/chevron-left.svg" alt=""></button>
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
            <button class="back-btn"><img src="@/assets/icons/chevron-left.svg" alt=""></button>
            <div class="default-back-title">1월 10일 (금)</div>
          </div>
        </div>
        <div class="default-header-item">
          <div><img src="@/assets/icons/ellypsis.svg" alt=""></div>
        </div>
      </div>
    </header>
    <!-- 첫 번째 네모박스 -->
    <div class="record-detail-title">
      <div class="title-image">
        <img :src="recordWithDetail.trainer?.profileImageUrl" alt="사용자 이미지">
      </div>
      <div class="title-descript">
        <p class="detail-title gray-text"> &nbsp; | </p>
        <p class="detail-title">&nbsp; {{recordWithDetail.trainer?.userName}} 트레이너 PT <span class="gray-text"> 수업 기록 | 오후 3:00 ~ 3:50 </span></p>
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
</template>

<script setup lang="ts">
import {api} from "~/store/api";
import type {RecordWithDetails} from "~/types/recordDataType";

const route = useRoute();
const recordIdParam = route.query.recordId;
const recordId: number = recordIdParam && !isNaN(recordIdParam)?
    Number(recordIdParam): null;

const recordWithDetail: RecordWithDetails = ref([]);

onMounted(async ()=>{
  if(recordId) {
    const response = await useRecord().recordWithDetail({recordId: recordId});
    recordWithDetail.value = response.result;
  }
})


</script>

<style scoped>

</style>