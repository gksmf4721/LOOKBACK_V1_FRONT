<template>
  <div>
    <div v-if="selectedCategory == 'record'" class="search-filters default-nav border-none">
      <div class="filter-buttons scrollable">
        <button v-for="item in subCategory"
                :class="{active : item.key == selectedSubCategory}"
                @click="selectSubCategory(item.key)"
                class="filter-btn"
        >{{item.name}}{{item.key == selectedSubCategory ? `(${recordCount})` : ''}}</button>
      </div>
      <!-- 1번: 셀렉트 버튼 -->
      <!--
      <div class="custom-select">
        <button class="select-btn">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="control-icon" d="M14.1667 5L14.1667 15" stroke="black" stroke-linecap="round"/>
            <path class="control-icon" d="M10 5L10 15" stroke="black" stroke-linecap="round"/>
            <path class="control-icon" d="M5.83333 5L5.83333 15" stroke="black" stroke-linecap="round"/>
            <path class="control-icon" d="M4.16666 6.66667H7.5" stroke="black" stroke-linecap="round"/>
            <path class="control-icon" d="M8.33334 13.3333H11.6667" stroke="black" stroke-linecap="round"/>
            <path class="control-icon" d="M12.5 10H15.8333" stroke="black" stroke-linecap="round"/>
          </svg>
          <span>필터</span>
        </button>
      </div>
      -->
    </div>
    <div v-if="selectedCategory == 'record'" class="record-container">
      <!-- 기록이 없을 경우 표시될 문구 -->
      <div v-if="selectedCategory == 'record'
    && records.length == 0" class="no-records-message">
        <span>
        등록된 기록이 없습니다.
        </span>
      </div>
      <div class="record-item-container" data-id="record-1">
        <!-- 기록 정보 -->
        <template v-for="item in records">
        <a @click="moveDetail(item.recordId)">
          <div class="record-item">
            <div class="record-info">
              <div class="record-image">
                <div class="circle personal">{{item.pt ? 'PT' : '개인'}}</div>
              </div>
              <div class="record-text">
                <div class="record-title">{{item.recordDate}} ({{item.dayOfWeek}})</div>
                <div class="record-descript">
                  <div>{{item.recordOfExerciseTypes.join(', ')}}</div>
                  <div class="gray-text" v-if="item.usedMuscleNames.length != 0">|
                    {{item.usedMuscleNames.join(', ')}}</div>
                </div>
              </div>
            </div>
          </div>
        </a>
        </template>
        <!-- 기록 정보 -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
  selectedCategory : String,
  records: { type: Array, default: () => [] },
  selectedSubCategory: String,
  userId: String,
  userType: String
})

const selectedSubCategory = ref('all');
const subCategory = ref([{key: 'all', name: '전체'},
  {key: 'pt', name: 'PT'},
  {key: 'personal', name: '개인'}]);

const recordCount = computed(() => {
  return props.records.length;
})

const emits = defineEmits([
    'update:records',
    'update:selectedSubCategory',
    'moveDetail'
]);
const selectSubCategory = async (subCategory) => {
  selectedSubCategory.value = subCategory;
  const response = await useRecord().recordList({userId: props.userId, userType: props.userType, type: subCategory});
  emits('update:records', response.result.list);
}

const moveDetail = (recordId: number)=> {
  emits('moveDetail', recordId);
}

</script>

<style scoped>

</style>