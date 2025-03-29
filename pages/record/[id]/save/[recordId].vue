<template>
  <div class="container">
    <!-- 상단 타이틀 (검색창 포함) -->
    <header class="header">
      <div class="search-header">
        <div class="back-btn-box">
          <button class="back-btn"><img src="@/assets/icons/chevron-left.svg" alt=""></button>
        </div>
        <div class="search-container">
          <input
              type="text"
              class="search-input"
              placeholder="운동명 검색 / 직접 입력"
          />

          <button class="search-btn">
            <img src="./icons/search.svg" alt="">
          </button>
        </div>
      </div>
    </header>
    <!-- 카테고리 메뉴 -->
    <nav class="category-nav">
      <button v-for="item in exerciseTypes"
              @click="selectExerciseType(item.key)"
              :class="{active:item.key == selectedExerciseType}"
              class="category-btn">{{item.value}}</button>
    </nav>

    <div class="search-filters">
      <!-- 장비 -->
      <div class="filter-group">
        <h3 class="filter-title">장비</h3>
        <div class="filter-buttons scrollable">
          <button v-for="item in equipments"
                  @click="selectEquipment(item.equipmentId)"
                  :class="{active : item.equipmentId == selectedEquipment}"
                  class="filter-btn">{{item.name}}</button>
        </div>
      </div>

      <!-- 부위 -->
      <div class="filter-group">
        <h3 class="filter-title">부위</h3>
        <div class="filter-buttons scrollable">
          <button v-for="item in muscleCategories"
                  @click="selectMuscleCategory(item.muscleCategoryId)"
                  :class="{active: item.muscleCategoryId == selectedMuscleCategory}"
                  class="filter-btn">{{item.muscleName}}</button>
        </div>
      </div>

      <!-- 근육 -->
      <div class="filter-group">
        <h3 class="filter-title">근육</h3>
        <div class="filter-buttons scrollable">
          <button class="filter-btn active">전체</button>
          <button class="filter-btn">삼두근</button>
          <button class="filter-btn">이두근</button>
          <button class="filter-btn">전완근</button>
        </div>
      </div>
    </div>

    <!-- 정렬 모달 -->
    <div id="sortModal" class="sort-modal hidden">
      <ul class="sort-options">
        <li class="sort-option" data-value="recommend">추천순</li>
        <li class="sort-option" data-value="newest">최신순</li>
        <li class="sort-option" data-value="frequent">자주한순</li>
        <li class="sort-option" data-value="alphabetical">가나다순</li>
      </ul>
    </div>
    <div class="exercise-container">
      <div v-for="item in exerciseList"  class="exercise-item-container" data-id="exercise-1">
        <!-- 운동 정보 -->
        <div class="exercise-details-container">
          <div class="exercise-info">
            <div class="exercise-image">
              <img :src="item.imageUrl" alt="운동 아이콘">
            </div>
            <div class="exercise-text">
              <div class="exercise-title">
                <div>{{item.exerciseName}}</div>
                <img src="@/assets/icons/chevron-right.svg" alt="">
              </div>
              <div class="exercise-muscles">
                {{item.muscleGroup[0]?.muscleCategory?.muscleName ?
                  item.muscleGroup[0]?.muscleCategory?.muscleName + ' |' :
                ''}}
                {{item.muscleGroup[1]?.muscleCategory?.muscleName}}</div>
            </div>
          </div>
        </div>

        <!-- 선택 버튼 -->
        <button class="exercise-select-btn">선택</button>
      </div>
      <!-- 운동 콘텐츠 모달 -->
      <div id="exerciseModal" class="exercise-modal">
        <div class="modal-content">
          <!-- 여기에 동적으로 추가될 선택된 운동 항목들 -->
          <div class="modal-items-container"></div>
          <!-- 저장하기 버튼 -->
          <button class="save-btn">저장하기</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

import {useExercise} from "~/composables/useExercise";

const exerciseTypes  = ref([]);
const strengthExercises = ref([]);
const cardioExercises = ref([]);
const stretchingExercises = ref([]);
const muscleCategories = ref([{muscleCategoryId: 0, muscleName: '전체'}]);
const equipments = ref([{equipmentId : 0, name: '전체'}]);

const selectedExerciseType = ref('');
const selectedEquipment = ref(0);
const selectedMuscleCategory = ref(0);
const hasChildren = ref(false);
const selectedMuscleChildren = ref('');

onMounted(async() => {
  const result = await useExercise().getResponseExercise();
  exerciseTypes.value = result?.exerciseTypes;
  strengthExercises.value = result?.strengthExercises;
  cardioExercises.value = result?.cardioExercises;
  stretchingExercises.value = result?.stretchingExercises;
  muscleCategories.value = [muscleCategories.value[0], ...result?.muscleCategories];
  equipments.value = [equipments.value[0], ...result?.equipments];

  selectedExerciseType.value = result?.exerciseTypes[0].key;
})

const exerciseList = computed(() => {
  return cardioExercises.value;
})

/*selected*/
const selectExerciseType = (data) => {
  selectedExerciseType.value = data;
}
const selectEquipment = (data) => {
  selectedEquipment.value = data;
}
const selectMuscleCategory = (data) => {
  selectedMuscleCategory.value = data;
}
const haveChildren = () => {
  hasChildren.value = true;
}
const noChildren = () => {
  hasChildren.value = false;
}
const selectMuscleChildren = (data) => {
  selectedMuscleChildren.value = data;
}

</script>

<style scoped>
</style>