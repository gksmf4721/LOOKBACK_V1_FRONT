<template>
  <div>
    <div class="exercise-record">
      <div class="record-header">
        <span class="record-title">{{exerciseRecord.exerciseName}}</span>
        <button class="record-modal-btn">
          <img src="@/assets/icons/chevron-right.svg" alt="">
        </button>
      </div>
      <div class="record-header-descript">
        <div>{{exerciseRecord.agonistMuscleName}}</div>
        <div class="gray-text">&nbsp; {{exerciseRecord.synergistMuscleName ? `|&nbsp;${exerciseRecord.synergistMuscleName}`:''}}</div>
      </div>
      <div class="record-sets">
        <div class="set"
             v-for="(item, index) in exerciseRecord.exerciseRecordDetails"
            :key="index"
        >
          <template v-if="exerciseRecord.exerciseType == ExerciseType.STRENGTH ||
               exerciseRecord.exerciseType == ExerciseType.STRETCHING">
            <span class="gray-text-ae gap-text">SET{{item.ord}}</span>
            <div class="set-detail">
                {{item.weight}}kg
              <span v-if="exerciseRecord.exerciseType == ExerciseType.STRENGTH">
                x {{item.repsPerSet}}회
              </span>
            </div>
          </template>
          <template v-if="exerciseRecord.exerciseType == 'CARDIO'">
                <span class="gray-text-ae gap-text">
                  {{ ExerciseDetailTypeLabel[item.type] }}
                  거리</span>
                <div class="set-detail">
                  {{item.repsPerSet}}{{ExerciseDetailTypeLabel[item.type]}}
                </div>
          </template>
        </div>
        <div class="record-sets-feedback"
             v-for="(item, index) in exerciseRecord.uploadFiles"
             :key="index"
        >
          <span class="record-sets-feedback-title font-12">사진/영상</span>
          <div class="record-image">
            <div class="record-image-item"
                 v-if="isImageExtension(item.extention)"
            >
              <CommonImage :src="`${apiBase}${item.relativePath}`"
                           :alt="'사용자 이미지'"
                           :errorImage="'/images/userProfile.jpeg'"
              ></CommonImage>
            </div>
            <div class="record-image-item"
                 v-if="isVideoExtension(item.extention)"
            >
              <video :src="`${apiBase}${item.relativePath}`"
                           controls
                           playsinline
                           @click="openFullscreen($event)"
                           style="width: 100%; border-radius: 12px;"
              ></video>
            </div>
          </div>
        </div>
        <div v-if="exerciseRecord.memo" class="record-sets-feedback">
          <span class="record-sets-feedback-title font-12">트레이너 피드백</span>
          <div class="record-sets-feedback-command font-14">
            {{exerciseRecord.memo}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ExerciseRecord from "~/components/record/ExerciseRecord.vue";
import {ExerciseType} from "~/types/exercise";
import {isImageExtension, isVideoExtension} from "~/constants/media";
import {ExerciseDetailTypeLabel} from "../../../types/exerciseRecordDetail";

const config = useRuntimeConfig();
const apiBase = config.public.apiBase

const props = defineProps({
  exerciseRecord: {
    type: Object as PropType<ExerciseRecordDto>,
    default: () => []
  }
})

const openFullscreen = (event: Event) => {
  const video = event.target as HTMLVideoElement;

  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if((video as any).webkitEnterFullScreen) {
    //iOS safari용
  } else if ((video as any).msRequestFullscreen) {
    // IE용
    (video as any).msRequestFullscreen();
  }
}


</script>

<style scoped>

</style>