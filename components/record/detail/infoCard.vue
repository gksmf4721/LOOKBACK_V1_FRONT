<template>
  <div>
    <div v-if="exerciseRecord.exerciseType == ExerciseType.STRENGTH ||
               exerciseRecord.exerciseType == ExerciseType.STRETCHING" class="exercise-record">
      <div class="record-header">
        <span class="record-title">{{exerciseRecord.exerciseName}}</span>
        <button class="record-modal-btn">
          <img src="@/assets/icons/chevron-right.svg" alt="">
        </button>
      </div>
      <div class="record-header-descript">
        <div>{{exerciseRecord.agonistMuscleName}}</div>
        <div class="gray-text">&nbsp; |&nbsp;{{exerciseRecord.synergistMuscleName}}</div>
      </div>
      <div class="record-sets">
        <div class="set"
             v-for="(item, index) in exerciseRecord.exerciseRecordDetails"
            :key="index"
        >
          <span class="gray-text-ae gap-text">SET{{item.ord}}</span>
          <div class="set-detail">
            {{item.weight}}kg x <span v-if="exerciseRecord.exerciseType == ExerciseType.STRENGTH"
          >
            {{item.repsPerSet}}회
          </span>
          </div>
        </div>
        <div class="record-sets-feedback"
             v-for="(item, index) in exerciseRecord.uploadFiles"
             :key="index"
        >
          <span class="record-sets-feedback-title font-12">사진/영상</span>
          <div class="record-image">
            <div class="record-image-item">
              <CommonImage :src="`${apiBase}${item.relativePath}`"
                           :alt="'사용자 이미지'"
                           :errorImage="'/images/userProfile.jpeg'"
              ></CommonImage>
            </div>
            <div class="record-image-item">
              <CommonImage :src="`${apiBase}${item.relativePath}`"
                           :alt="'사용자 이미지'"
                           :errorImage="'/images/userProfile.jpeg'"
              ></CommonImage>
            </div>
          </div>
        </div>
        <div class="record-sets-feedback">
          <span class="record-sets-feedback-title font-12">트레이너 피드백</span>
          <div class="record-sets-feedback-command font-14">
            {{exerciseRecord.memo}}
          </div>
        </div>
      </div>
    </div>

    <div v-if="exerciseRecord.exerciseType == 'CARDIO'" class="exercise-record">
      <div class="record-header">
        <span class="record-title">러닝머신</span>
        <button class="record-modal-btn">
          <img src="@/assets/icons/chevron-right.svg" alt="">
        </button>
      </div>
      <div class="record-header-descript">
        <div>허벅지</div>
        <div class="gray-text"> &nbsp; | 유산소</div>
      </div>
      <div class="record-sets">
        <div class="set">
          <span class="gray-text-ae gap-text">거리</span>
          <div class="set-detail">
            3.5km
          </div>
        </div>
        <div class="set">
          <span class="gray-text-ae gap-text">평균속도</span>
          <div class="set-detail">
            6
          </div>
        </div>
        <div class="set">
          <span class="gray-text-ae gap-text">칼로리</span>
          <div class="set-detail">
            210kcal
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ExerciseRecord from "~/components/record/ExerciseRecord.vue";
import {ExerciseType} from "~/types/exercise";

const config = useRuntimeConfig();
const apiBase = config.public.apiBase

const props = defineProps({
  exerciseRecord: {
    type: Object as PropType<ExerciseRecordDto>,
    default: () => []
  }
})


</script>

<style scoped>

</style>