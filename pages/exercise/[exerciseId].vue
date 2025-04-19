<template>

  <div class="exercise-detail-container">
    <header class="default-header">
      <div class="default-div">
        <div>
          <div class="back-btn-box-text">
            <button class="back-btn"
            @click="goBack"><img src="@/assets/icons/chevron-left.svg" alt=""></button>
            <div class="default-back-title">{{exerciseDetail.exercise?.exerciseName}}</div>
          </div>
        </div>
      </div>
    </header>

    <!-- 첫 번째 네모박스 -->
<!--    <div>
      <section>
        <div class="summary-box-media">

        </div>
      </section>
    </div>-->
    <!-- 두 번째 네모박스 -->
    <section class="summary-box" style="display: block;">
      <div class="summary-item">
        <span class="summary-title">주 사용 부위</span>
        <span class="summary-value">
          <span v-for="(item, index) in exerciseDetail.agonistList">
            {{index == 0 ? item.muscleName
              : ', ' + item.muscleName}}
          </span>
        </span>
      </div>
      <div class="summary-item" style="padding-top:20px">
        <span class="summary-title">보조 사용 부위</span>
        <span v-for="(item, index) in exerciseDetail.synergistList">
            {{index == 0 ? item.muscleName
            : ', ' + item.muscleName}}
          </span>
      </div>
    </section>

    <div class="line"></div>
    <!-- 운동 설명 -->
    <section class="exercise-description">
      <div class="bold">운동 설명</div>
      <p class="exercise-description-detail">
        {{exerciseDetail.exercise?.description}}
      </p>
    </section>
<!--
<div class="line"></div>
    &lt;!&ndash; 운동 방법 &ndash;&gt;
    <section class="exercise-description">
      <div class="bold">운동 방법</div>

      &lt;!&ndash; 준비자세 &ndash;&gt;
      <div class="exercise-description-mid-title">준비자세</div>
      <ul class="exercise-description-detail">
        <li>첫 번째 준비자세</li>
        <li>두 번째 준비자세</li>
      </ul>

      &lt;!&ndash; 동작 &ndash;&gt;
      <div class="exercise-description-mid-title">동작</div>
      <ul class="exercise-description-detail">
        <li>첫 번째 동작 설명</li>
        <li>두 번째 동작 설명</li>
      </ul>

      &lt;!&ndash; 주의사항 &ndash;&gt;
      <div class="exercise-description-mid-title">주의사항</div>
      <ul class="exercise-description-detail">
        <li>허리가 너무 구부러지지 않도록 주의</li>
        <li>무릎이 발끝보다 과도하게 나가지 않도록 주의</li>
      </ul>
    </section>-->
<!--

    <div class="line"></div>
    &lt;!&ndash; 운동 방법 &ndash;&gt;
    <section class="exercise-description">
      <div class="bold">꿀팁</div>

      &lt;!&ndash; 준비자세 &ndash;&gt;
      <div class="exercise-description-mid-title">준비자세</div>
      <ul class="exercise-description-detail">
        <li>첫 번째 준비자세</li>
        <li>두 번째 준비자세</li>
      </ul>

      &lt;!&ndash; 동작 &ndash;&gt;
      <div class="exercise-description-mid-title">동작</div>
      <ul class="exercise-description-detail">
        <li>첫 번째 동작 설명</li>
        <li>두 번째 동작 설명</li>
      </ul>

      &lt;!&ndash; 주의사항 &ndash;&gt;
      <div class="exercise-description-mid-title">주의사항</div>
      <ul class="exercise-description-detail">
        <li>허리가 너무 구부러지지 않도록 주의</li>
        <li>무릎이 발끝보다 과도하게 나가지 않도록 주의</li>
      </ul>
    </section>
-->

  </div>
</template>

<script setup lang="ts">

import type {Exercise, ExerciseDetail} from "~/types/exercise";
import {useExercise} from "~/composables/useExercise";
import {useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();
const exerciseId = route.params.exerciseId;
const exerciseDetail:ExerciseDetail = ref({});


onMounted(async () =>{
  const response = await useExercise().getExerciseDetail(
      {exerciseId: exerciseId}
  );
  exerciseDetail.value = response.result;
})

const goBack = () => {
  router.back(); // 기본 홈 또는 지정한 페이지로
};
</script>

<style scoped>

</style>