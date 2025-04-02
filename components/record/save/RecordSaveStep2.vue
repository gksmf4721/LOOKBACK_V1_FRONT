<template>
  <div>
    <header class="default-header">
      <div class="default-div">
        <div>
          <div class="back-btn-box-text">
            <button
                @click="() => emits('onMove', 1)"
                class="back-btn"><img src="@/assets/icons/chevron-left.svg" alt=""></button>
            <div class="default-back-title">운동기록 추가</div>
          </div>
        </div>
      </div>
    </header>
    <!-- Date Section -->
    <div class="record-section-small-header">
      <p class="record-title-detail  font-14">2024년 10월 30일 오후 3시 ~ 3시 50분
      </p>
      <button class="record-title-detail-icon" type="button">
        <img src="@/assets/icons/edit.svg" alt="">
      </button>
    </div>
    <!-- Exercise Details Section -->
    <div class="record-section">
      <label>
        <div style="display: flex; justify-content: space-between;">
          <span>7개</span>
          <span class="exercise-pagination" id="exercise-pagination">
                  <button type="button" class="default-none-btn">순서편집</button> |
                  <button type="button" class="default-none-btn">운동추가</button>
                </span>
        </div>
      </label>
      <div class="scroll-section">
        <!-- 운동 하나-->
        <ExerciseRecordCard
            :title="item.exerciseName"
            v-for="item in selectedExerciseRecords">
          <div v-if="item.exerciseType == 'STRENGTH'">
            <div class="set-list" id="set-list-1">
              <div class="set-row">
                <span>set 1</span>
                <input type="number" placeholder="kg" /> x <input type="number" placeholder="횟수" />
              </div>
            </div>
            <button class="add-set-btn add-set-btn-2">+ 세트 추가</button>
          </div>
          <div v-if="item.exerciseType == 'STRETCHING'">
            <div class="set-list" id="set-list-2">
              <div class="set-row">
                <span>set 1</span>
                <input type="number" placeholder="횟수" />
              </div>
            </div>
            <button class="add-set-btn add-set-btn-2">+ 세트 추가</button>
          </div>
          <div v-if="item.exerciseType == 'CARDIO'">
            <div class="set-list" id="set-list-3">
              <div class="set-row">
                <span>시간</span>
                <input type="number" placeholder="분" />
              </div>
              <div class="set-row">
                <span>거리</span>
                <input type="number" placeholder="km" />
              </div>
            </div>
            <div class="add-set-btns">
              <button class="add-set-btn-small" data-running="speed">속도</button>
              <button class="add-set-btn-small"
                      data-running="slop">경사</button>
              <button class="add-set-btn-small"
                      data-running="heart">심박수</button>
              <button class="add-set-btn-small"
                      data-running="kcal">칼로리</button>
            </div>
          </div>
        </ExerciseRecordCard>
        <!-- 운동 하나-->
      </div>
    </div>

    <!-- 하단 고정 푸터 -->
    <footer class="fixed-footer-btn">
      <button class="create-record-btn" onclick="window.location.href='page2.html'">
        저장
      </button>
    </footer>
  </div>
</template>

<script setup lang="ts">

import {number} from "vscode-jsonrpc/lib/common/is";
import ExerciseRecordCard from "~/components/record/save/ExerciseRecordCard.vue";

const props = defineProps({
  selectedExerciseRecords: {
    type: Array,
    default: () => []
  },
  step: {
    type: Number,
    default: 0
  }
})

const emits = defineEmits([
    'onMove',
])
</script>

<style scoped>

</style>