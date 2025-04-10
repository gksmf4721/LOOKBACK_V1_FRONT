<template>
  <div>
    <!-- 상단 타이틀 (검색창 포함) -->
    <header class="header">
      <div class="search-header">
        <div class="back-btn-box">
          <button @click="emits('moveBack')" class="back-btn"><img src="@/assets/icons/chevron-left.svg" alt=""></button>
        </div>
        <div class="search-container">
          <input
              :value="searchValue"
              @input="(e) => emits('updateSearchValue',e.target.value)"
              type="text"
              class="search-input"
              placeholder="운동명 검색 / 직접 입력"
          />

          <button class="search-btn">
            <img src="@/assets/icons/search.svg" alt="">
          </button>
        </div>
      </div>
    </header>
    <!-- 카테고리 메뉴 -->
    <nav class="category-nav">
      <button v-for="item in exerciseTypes"
              @click="() => emits('selectExerciseType', item.key)"
              :class="{active:item.key == selected.exerciseType}"
              class="category-btn">{{item.value}}</button>
    </nav>

    <div v-if="selected.exerciseType === 'STRENGTH'" class="search-filters">
      <!-- 장비 -->
      <div class="filter-group">
        <h3 class="filter-title">장비</h3>
        <div class="filter-buttons scrollable">
          <button v-for="item in equipments"
                  @click="() => emits('selectEquipment',item.equipmentId)"
                  :class="{active : item.equipmentId == selected.equipment}"
                  class="filter-btn">{{item.name}}</button>
        </div>
      </div>

      <!-- 부위 -->
      <div class="filter-group">
        <h3 class="filter-title">부위</h3>
        <div class="filter-buttons scrollable">
          <button v-for="item in muscleCategories"
                  @click="() => emits('selectMuscleCategory', item.muscleCategoryId)"
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
        <button @click="()=> emits('selectExerciseRecord', item)"
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
                <button @click="() => emits('removeSelectExerciseRecord',item)" class="close-btn" data-id="exercise-1">×</button>
              </div>
              <div class="item-text">{{ item.exerciseName }}</div>
            </div>
          </div>
          <!-- 저장하기 버튼 -->
          <button class="save-btn" @click="() => emits('onMove', 2)">저장하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
   const props = defineProps({
     exerciseTypes: {
       type: Array,
       default: () => []
     },
     selected: {
       type: Object,
       required: true,
     },
     equipments: {
       type: Array,
       default: () => []
     },
     muscleCategoryChildren: {
       type: Array,
       default: () => []
     },
     exerciseList: {
       type: Array,
       default: () => []
     },
     searchValue: {
       type: String,
       default: ""
     },
     selectedExerciseRecords: {
       type: Array,
       default: () => []
     },
     muscleCategories: {
       type: Array,
       default: () => []
     },

   })
   const emits = defineEmits([
     'updateSearchValue',          // 사용자가 검색창 입력 변경
     'selectExerciseType',         // 운동 타입 탭 변경
     'selectEquipment',            // 장비 선택
     'selectMuscleCategory',       // 근육 부위 선택
     'selectExerciseRecord',       // 운동 항목 선택/해제
     'removeSelectExerciseRecord', // 운동 항목 제거
     'save',                       // '저장하기' 버튼 클릭
     'onMove',
     'moveBack'
   ])

</script>

<style scoped>

</style>