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
              :value="searchValue"
              @input="onInput"
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
              :class="{active:item.key == selected.exerciseType}"
              class="category-btn">{{item.value}}</button>
    </nav>

    <div v-if="selected.exerciseType === 'STRENGTH'" class="search-filters">
      <!-- 장비 -->
      <div class="filter-group">
        <h3 class="filter-title">장비</h3>
        <div class="filter-buttons scrollable">
          <button v-for="item in equipments"
                  @click="selectEquipment(item.equipmentId)"
                  :class="{active : item.equipmentId == selected.equipment}"
                  class="filter-btn">{{item.name}}</button>
        </div>
      </div>

      <!-- 부위 -->
      <div class="filter-group">
        <h3 class="filter-title">부위</h3>
        <div class="filter-buttons scrollable">
          <button v-for="item in muscleCategories"
                  @click="selectMuscleCategory(item.muscleCategoryId)"
                  :class="{active: item.muscleCategoryId == selected.muscleCategory}"
                  class="filter-btn">{{item.muscleName}}</button>
        </div>
      </div>

      <!-- 근육 mvp이후 추가-->
<!-- <div v-if="muscleCategoryChildren.length > 1" class="filter-group">
        <h3 class="filter-title">근육</h3>
        <div class="filter-buttons scrollable">
          <button v-for="item in muscleCategoryChildren"
                  @click="selected.muscleChildren = item.muscleCategoryId"
                  :class="{active : selected.muscleChildren == item.muscleCategoryId}"
                  class="filter-btn">{{item.muscleName}}</button>
        </div>
      </div>-->
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
              <img
                  :src="item.imageUrl"
                  @error="(e) => commonStore.handleImageError('@/assets/images/1.png', e)"
                  alt="운동 아이콘"
              />
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
        <button @click="selectExerciseRecord(item)"
                type="button"
                :class="{selected: item.isChecked}"
                class="exercise-select-btn">선택</button>
      </div>
      <!-- 운동 콘텐츠 모달 -->
      <div :class="{show : selectedExerciseRecords.length > 0}" class="exercise-modal">
        <div class="modal-content">
          <!-- 여기에 동적으로 추가될 선택된 운동 항목들 -->
          <div class="modal-items-container">
            <div v-for="item in selectedExerciseRecords" class="modal-item" data-id="exercise-1">
              <div class="modal-image-container">
                <img :src="item.imageUrl" alt="바벨 스쿼트">
                <button @click="removeSelectExerciseRecord(item)" class="close-btn" data-id="exercise-1">×</button>
              </div>
              <div class="item-text">{{ item.exerciseName }}</div>
            </div>
          </div>
          <!-- 저장하기 버튼 -->
          <button class="save-btn">저장하기</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

import {useExercise} from "~/composables/useExercise";
import {useCommonStore} from "~/store/common";
import type {ExerciseRecord} from "~/types/exerciseRecord";
import type {Exercise} from "~/types/exercise";
import {debounce} from "@antfu/utils";
const route = useRoute();
const recordId = route.params.recordId;
const commonStore = useCommonStore();

const exerciseTypes  = ref([]);
const strengthExercises = ref([]);
const cardioExercises = ref([]);
const stretchingExercises = ref([]);
const muscleCategories = ref([{muscleCategoryId: 0, muscleName: '전체'}]);
const equipments = ref([{equipmentId : 0, name: '전체'}]);
const exercises = ref([]);
const muscleCategoryChildren = ref([{muscleCategoryId : 0, muscleName: '전체'}]);
const searchValue = ref("");
const selected = ref({
  exerciseType: '',
  equipment: 0,
  muscleCategory: 0,
  muscleChildren: 0
});

//선택한 운동 목록
const selectedExerciseRecords = ref<ExerciseRecord>([]);

onMounted(async() => {
  const result = await useExercise().getResponseExercise();
  exerciseTypes.value = result?.exerciseTypes;
  strengthExercises.value = result?.strengthExercises;
  cardioExercises.value = result?.cardioExercises;
  stretchingExercises.value = result?.stretchingExercises;
  muscleCategories.value = [muscleCategories.value[0], ...result?.muscleCategories];
  equipments.value = [equipments.value[0], ...result?.equipments];

  selected.value.exerciseType = result?.exerciseTypes[0].key;

  //첫 운동 리스트는 근력이며 카테고리는 전체
  exercises.value = result?.strengthExercises;
})

const exerciseList = computed(() => {
  let searchText = searchValue.value;
  let filterList = [];
  let select = selected.value;
  let exerciseType     = select.exerciseType;
  let equipmentId      = select.equipment;
  let muscleCategoryId = select.muscleCategory;
  let selectedEr = selectedExerciseRecords.value;
  //let muscleChildren   = select.muscleChildren; 3뎁스 이후 추가
  // 유산소
  if (exerciseType == 'CARDIO') {
    filterList =  cardioExercises.value
  }
  // 스트레칭
  if (exerciseType == 'STRETCHING') {
    filterList = stretchingExercises.value
  }
  // 근력
  if (exerciseType == 'STRENGTH') {
    let isStrengthFilter = equipmentId == 0 && muscleCategoryId == 0

    if (isStrengthFilter) {
      filterList = strengthExercises.value;
    } else {
      strengthExercises.value.forEach((exercise) => {
        //장비
        let isEquipment = equipmentId == 0;
        if(!isEquipment) {
          isEquipment = exercise.equipmentCategory?.equipmentId == equipmentId
        }
        //부위
        let isMuscleCategory = muscleCategoryId == 0;
        if(!isMuscleCategory) {
          isMuscleCategory = exercise.muscleGroup?.some((group) => {
            const category = group.muscleCategory;

            return category.muscleCategoryId == muscleCategoryId
                || category.parentsId == muscleCategoryId
          })

        }
        if (isEquipment && isMuscleCategory) {
          filterList.push(exercise);
        }
      })
    }

  }
  if (searchText != "") {
    console.log(searchText);
    filterList = filterList.filter((item) => {
      return item.exerciseName.includes(searchText);
    })
  }

  filterList.forEach((item) => {
    item.isChecked = false;
    for (const er of selectedEr) {
      if (item.exerciseId === er.exerciseId) {
        item.isChecked = true;
        break; // 이미 찾았으면 더 볼 필요 없음!
      }
    }
  })

  return filterList;
})

//검색어 바로 반응을 위함
const onInput = (e: Event) => {
  searchValue.value = (e.target as HTMLInputElement).value;
}
/*selected*/
const selectExerciseType = (data) => {
  selected.value.exerciseType = data;
  if (data == 'STRENGTH') {exercises.value = strengthExercises.value}
  if (data == 'CARDIO') {exercises.value = cardioExercises.value}
  if (data == 'STRETCHING') {exercises.value = stretchingExercises.value}
}
const selectEquipment = (data) => {

  selected.value.equipment = data;
}
const selectMuscleCategory = (data) => {
  let childrenList = [];
  muscleCategories.value.forEach((muscle) => {
    let isParent = muscle.parentId === data
    if (isParent) {
      childrenList.push(muscle);
    }
  })
  muscleCategoryChildren.value = [muscleCategoryChildren.value[0], ...childrenList];

  selected.value.muscleCategory = data;
}

const selectExerciseRecord = (exercise : Exercise) => {

  const findIndex = selectedExerciseRecords.value.findIndex(
      item => item.exerciseId === exercise.exerciseId
  );

  let updated = [...selectedExerciseRecords.value];
  if (findIndex > -1) {
    updated.splice(findIndex,1);
  } else {
    updated.push({
      exerciseId: exercise.exerciseId
      , recordId
      , imageUrl: exercise.imageUrl
      , exerciseName: exercise.exerciseName});
  }
    selectedExerciseRecords.value = updated;
}

const removeSelectExerciseRecord = (exercise : Exercise) => {
  const findIndex = selectedExerciseRecords.value.findIndex(
      item => item.exerciseId === exercise.exerciseId
  );
  let updated = [...selectedExerciseRecords.value];
  updated.splice(findIndex,1);
  selectedExerciseRecords.value = updated;
}

/*const selectMuscleChildren = (data) => {
  selected.value.muscleChildren = data;
}*/





</script>

<style scoped>
</style>