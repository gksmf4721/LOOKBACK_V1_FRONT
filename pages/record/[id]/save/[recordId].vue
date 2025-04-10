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

      @moveBack="()=>{  router.replace(`/record/${userId}`);
    }"
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

        @uploadFile="uploadFile"
        @addCardioSets="addCardioSets"
        @removeSets="removeSets"
        @removeFile="removeFile"
        @addSets="addSets"
        @onMove="onMove"
        @submit="submit"
    ></RecordSaveStep2>
    <RecordSaveStep3
        v-if="step == 3"
        v-model:selectedExerciseRecords="selectedExerciseRecords"

        @onMove="onMove"
    ></RecordSaveStep3>
  </div>
</template>

<script setup lang="ts">
import {useExercise} from "~/composables/useExercise";
import type {ExerciseRecord} from "~/types/exerciseRecord";
import type {Exercise} from "~/types/exercise";
import {ExerciseDetailTypes, type ExerciseRecordDetail} from "~/types/exerciseRecordDetail";
import {exercise} from "~/store/exercise";
import {FileType} from "~/types/file";
import {useFileStore} from "~/store/file";
import {api} from "~/store/api";
import {useRouter} from "vue-router";
const route = useRoute();
const router = useRouter();
const fileStore = useFileStore();
const recordId = route.params.recordId;
const userId = route.params.id;

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
const onInput = (data: string) => {
  searchValue.value = data;
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
  let reOrderDetails = [];
  if (findIndex > -1) {
    updated.splice(findIndex,1);
    reOrderDetails = reOrder(updated);
  } else {
    updated.push({...exercise, ord: selectedExerciseRecords.value.length + 1});
    reOrderDetails = [...updated];

  }
    selectedExerciseRecords.value = reOrderDetails;
}

/*function*/
const removeSelectExerciseRecord = (exercise : Exercise) => {
  const findIndex = selectedExerciseRecords.value.findIndex(
      item => item.exerciseId === exercise.exerciseId
  );
  let updated = [...selectedExerciseRecords.value];
  updated.splice(findIndex,1);
  const reOrderDetails = reOrder(updated);
  selectedExerciseRecords.value = reOrderDetails;
}

const onMove = (data) => {
  for (let i = 0; i < selectedExerciseRecords.value.length; i++) {
    let er = selectedExerciseRecords.value[i];
    let recordDetails = er.exerciseRecordDetails;
        if(recordDetails == null) {
          recordDetails = generateExerciseRecordDetail(er.exerciseType);
        }
    selectedExerciseRecords.value[i].exerciseRecordDetails = recordDetails;
  }
  step.value = data;
}

const generateExerciseRecordDetail = (type : Exercise.exerciseType) => {

  switch (type) {
    case 'STRENGTH' :   // 근력 기본 3세트
    case 'STRETCHING' : // 스트레칭 기본 3세트
      return addExerciseRecordDetail(3,type);
    case 'CARDIO' :     // 유산소는 기본 시간, 거리
      return [
          {ord: 1, type: 'TIME'},
          {ord: 2, type: 'DISTANCE'}
      ];
    default:
      return [];
  }
}

const addExerciseRecordDetail = (set: number, type : ExerciseRecordDetail.type) => {
  let recordDetails = [];
  for (let j = 1; j < set + 1; j++) {
    let exerciseRecordDetail = {
      ord: j, type: type
    }
    recordDetails.push(exerciseRecordDetail);
  }
  return recordDetails;
}

const addSets = (exerciseRecord : ExerciseRecord, type: ExerciseDetailTypese) => {
  const target = selectedExerciseRecords.value;
  const findIndex = target.findIndex(
      (er) => er.ord == exerciseRecord.ord
  );
  selectedExerciseRecords.value[findIndex].exerciseRecordDetails =
      [...selectedExerciseRecords.value[findIndex].exerciseRecordDetails
        ,{ord: selectedExerciseRecords.value[findIndex].exerciseRecordDetails.length + 1, type: type}];

}

const removeSets = (exerciseRecord : ExerciseRecord, exerciseRecordDetail : ExerciseRecordDetail) => {
  const findIndex = selectedExerciseRecords.value.findIndex(
      (er) => er.ord == exerciseRecord.ord
  );
  if(findIndex === -1) return;

  const findErDetailIndex = selectedExerciseRecords.value[findIndex].exerciseRecordDetails.findIndex(
      (erd) => erd.ord == exerciseRecordDetail.ord
  )
  if(findIndex === -1) return;

  const target = selectedExerciseRecords.value[findIndex];
  let updated = [...target.exerciseRecordDetails];
  updated.splice(findErDetailIndex,1);

  const reOrderDetails = updated.map((detail, idx) => ({
    ...detail,
    ord: idx + 1
  }))

  selectedExerciseRecords.value[findIndex].exerciseRecordDetails = reOrderDetails;

}

const addCardioSets = (exerciseRecord : ExerciseRecord, exerciseDetailType : ExerciseDetailTypes) => {
  const findIndex = selectedExerciseRecords.value.findIndex(
      (er) => er.ord == exerciseRecord.ord
  );
  if(findIndex === -1) return;

  const target = selectedExerciseRecords.value[findIndex]
  const findErDetailIndex = target.exerciseRecordDetails.findIndex(
      (erd) => erd.type == exerciseDetailType
  )

  let updated = target.exerciseRecordDetails;
  let reOrderDetails;
  if (findErDetailIndex > -1) {
    updated.splice(findErDetailIndex,1);
    reOrderDetails = updated.map((detail, idx) => ({
      ...detail,
      ord: idx + 1
    }))
  } else {
    updated.push({...updated, ord: updated.length + 1, type: exerciseDetailType});
    reOrderDetails = updated;
  }

  selectedExerciseRecords.value[findIndex].exerciseRecordDetails = reOrderDetails;
}

const uploadFile = async (e: Event, ord : number) => {
  const uploadedFile = await fileStore.uploadFile(e, FileType.EXERCISE_RECORD);
  const target = selectedExerciseRecords.value;
  const findIndex = target.findIndex(
      (er) => er.ord === ord
  );

  let _uploadFiles =target[findIndex].uploadFiles
  if(!_uploadFiles) {
    _uploadFiles = []
  }
  _uploadFiles.push({...uploadedFile, ord: _uploadFiles.length + 1});

  selectedExerciseRecords.value[findIndex].uploadFiles
    = _uploadFiles
}

//저장
const submit = async () => {
  console.log('ddd');
  const response = await useRecord().recordDetailSave({
        "recordId": recordId,
        "exerciseRecords": selectedExerciseRecords.value
  });

  router.replace(`/record/${userId}`);
}

const removeFile = (uuid : string, exerciseRecordOrd :number) => {
  const findIndex = selectedExerciseRecords.value.findIndex(
      (er) => er.ord == exerciseRecordOrd
  );

  const target = selectedExerciseRecords.value[findIndex];
  const fileIndex = target.uploadFiles.findIndex(
      (file) => file.uuid == uuid
  );

  //해당 uuid는 upload 파일에서 삭제
  target.uploadFiles.splice(fileIndex,1);

  //정렬 후 저장
  const reOrderUploadFiles = reOrder(target.uploadFiles);
  selectedExerciseRecords.value[findIndex].uploadFiles = reOrderUploadFiles


  //삭제 파일 넣기
  let _delFiles =target.delFiles
  if(!_delFiles) {
    _delFiles = []
  }
  _delFiles.push({uuid : uuid});

  selectedExerciseRecords.value[findIndex].delFiles = _delFiles;
}

const reOrder = (updated: Array) => {
  return updated.map((detail, idx) => ({
    ...detail,
    ord: idx + 1
  }))
}

</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
  position: absolute;
  width: 100%;
}

.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-fade-enter-to {
  transform: translateX(0%);
  opacity: 1;
}

.slide-fade-leave-from {
  transform: translateX(0%);
  opacity: 1;
}
.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>