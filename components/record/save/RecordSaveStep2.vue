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
          <!--근력-->
          <div v-if="item.exerciseType == 'STRENGTH'">
            <div v-for="detail in item.exerciseRecordDetail" class="set-list" id="set-list-1">
              <div class="set-row">
                <span>set {{detail.ord}}</span>
                <input type="number" placeholder="kg" /> x <input type="number" placeholder="횟수" />
                <button @click="removeSets(item,detail)"
                        v-if="detail.ord != 1"
                        class="delete-btn"
                >x 삭제</button>
              </div>
            </div>
            <button @click="addSets(item)"
                    class="add-set-btn add-set-btn-2">+ 세트 추가</button>
          </div>
          <!--스트레칭-->
          <div v-if="item.exerciseType == 'STRETCHING'">
            <div v-for="detail in item.exerciseRecordDetail" class="set-list" id="set-list-1">
              <div class="set-row">
                <span>set {{detail.ord}}</span>
                <input type="number" placeholder="횟수" />
                <button @click="removeSets(item,detail)"
                        v-if="detail.ord != 1"
                        class="delete-btn"
                >x 삭제</button>
              </div>
            </div>
            <button @click="addSets(item)"
                    class="add-set-btn add-set-btn-2"
            >+ 세트 추가</button>
          </div>
          <!--유산소-->
          <div v-if="item.exerciseType == 'CARDIO'">
            <div v-for="detail in item.exerciseRecordDetail" class="set-list" id="set-list-1">
            <div class="set-row">
                <span>{{ExerciseDetailTypeLabel[detail.type]}}</span>
                <input type="number" :placeholder="ExerciseDetailTypeUnit[detail.type]" />
                <button v-if="detail.ord != 1"
                        @click="addCardioSets(item, detail.type)"
                        class="delete-btn">x 삭제</button>
            </div>
            </div>
            <div class="add-set-btns"
                 :class="{ 'five-buttons': filteredCardioDetailBtn.length - (item.exerciseRecordDetail.length-1)  >= 5 }">
              <template v-for="type in filteredCardioDetailBtn">
                <button @click="addCardioSets(item, type)"
                        v-if="!item.exerciseRecordDetail.some(detail => detail.type === type)"
                        class="add-set-btn-small2"
                        data-running="speed"
                >{{ExerciseDetailTypeLabel[type]}}</button>
              </template>
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

import ExerciseRecordCard from "~/components/record/save/ExerciseRecordCard.vue";
import type {ExerciseRecord} from "~/types/exerciseRecord";
import {
  ExerciseDetailTypes,
  ExerciseDetailTypeLabel,
  ExerciseDetailTypeUnit,
  type ExerciseRecordDetail
} from "~/types/exerciseRecordDetail";

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

const excludeExerciseTypeBtn = ['STRENGTH', 'CARDIO', 'TIME'];

const filteredCardioDetailBtn = Object.values(ExerciseDetailTypes).filter(
    (type) => !excludeExerciseTypeBtn.includes(type)
)

const emits = defineEmits([
    'onMove',
    'addSets',
    'removeSets',
    'addCardioSets'
])

const addSets = (exerciseRecord : ExerciseRecord) => {
  emits('addSets', exerciseRecord);
}

const removeSets = (exerciseRecord : ExerciseRecord, exerciseRecordDetail : ExerciseRecordDetail) => {
  emits('removeSets', exerciseRecord, exerciseRecordDetail);
}

const addCardioSets = (exerciseRecord : ExerciseRecord, exerciseDetailType : ExerciseDetailTypes) => {
  emits('addCardioSets', exerciseRecord, exerciseDetailType);
}

</script>

<style scoped>

</style>