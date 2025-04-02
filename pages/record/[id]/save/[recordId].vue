<template>
  <div class="container">
    <RecordSaveStep1 v-if="step == 1"
      :exerciseTypes="exerciseTypes"
      :selected="selected"
      :equipments="equipments"
      :muscleCategoryChildren="muscleCategoryChildren"
      :searchValue="searchValue"
      :selectedExerciseRecords="selectedExerciseRecords"
      :muscleCategories="muscleCategories"
      :exerciseList="exerciseList"

      @updateSearchValue="onInput"
      @selectExerciseType="selectExerciseType"
      @selectEquipment="selectEquipment"
      @selectMuscleCategory="selectMuscleCategory"
      @selectExerciseRecord="selectExerciseRecord"
      @removeSelectExerciseRecord="removeSelectExerciseRecord"
      @save="onSave"
      @onMove="onMove"
    ></RecordSaveStep1>
    <RecordSaveStep2
        v-if="step == 2"
        :step="step"
        :selectedExerciseRecords="selectedExerciseRecords"

        @onMove="onMove">
    </RecordSaveStep2>
  </div>
</template>

<script setup lang="ts">
import {useExercise} from "~/composables/useExercise";
import type {ExerciseRecord} from "~/types/exerciseRecord";
import type {Exercise} from "~/types/exercise";
const route = useRoute();
const recordId = route.params.recordId;

const step : number = ref(1);
//props데이터
const exerciseTypes  = ref([]);
const equipments = ref([{equipmentId : 0, name: '전체'}]);
const selected = ref({
  exerciseType: '',
  equipment: 0,
  muscleCategory: 0,
  muscleChildren: 0
});
const muscleCategoryChildren = ref([{muscleCategoryId : 0, muscleName: '전체'}]);
const searchValue = ref("");
//선택한 운동 목록
const selectedExerciseRecords = ref<ExerciseRecord>([]);
const muscleCategories = ref([{muscleCategoryId: 0, muscleName: '전체'}]);

const exercises = ref([]);
const strengthExercises = ref([]);
const cardioExercises = ref([]);
const stretchingExercises = ref([]);


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
    updated.push(exercise);
  }
    selectedExerciseRecords.value = updated;
}

/*function*/
const removeSelectExerciseRecord = (exercise : Exercise) => {
  const findIndex = selectedExerciseRecords.value.findIndex(
      item => item.exerciseId === exercise.exerciseId
  );
  let updated = [...selectedExerciseRecords.value];
  updated.splice(findIndex,1);
  selectedExerciseRecords.value = updated;
}

const onMove = (data) => {
  step.value = data;
}

/*const selectMuscleChildren = (data) => {
  selected.value.muscleChildren = data;
}*/

</script>

<style scoped>
</style>