<template>
  <!-- 전체 컨테이너 -->
  <div class="container">
    <!-- 일반회원 -->
    <header class="default-header" style="display: none;">
      <div class="default-div">
        <div class="default-title">운동기록</div>
      </div>
    </header>
    <!-- 트레이너일 떄 -->
    <header class="default-header" >
      <div class="default-div">
        <div>
          <div class="back-btn-box-text">
            <NuxtLink :to="`/trainer`" >
              <button type="button" class="back-btn"><img src="@/assets/icons/chevron-left.svg" alt=""></button>
            </NuxtLink>
            <div class="default-back-title">{{member.userName}}</div>
          </div>
        </div>
        <div class="default-header-item">
          <div><img src="@/assets/icons/ellypsis.svg" alt=""></div>
        </div>
      </div>
    </header>
    <!-- 카테고리 메뉴 -->
    <nav class="category-nav">
      <button v-for="item in category"
              :class="{active : item.key == selectedCategory}"
              @click="selectCategory(item.key)"
              class="category-btn">{{ item.name }}</button>
    </nav>

    <ExerciseRecord
        :selectedCategory="selectedCategory"
        :userId="id"
        :userType="userType"
        v-model:records="records">
    </ExerciseRecord>
    <Profile :selectedCategory="selectedCategory" :member="member">
    </Profile>
    <!-- 정렬 모달 -->
    <div id="sortModal" class="record-sort-modal hidden">
      <ul class="sort-options">
        <li class="sort-option" data-value="recommend">가나다순</li>
        <li class="sort-option" data-value="newest">최근 수업순</li>
      </ul>
    </div>
    <!-- 하단 고정 푸터 -->
    <footer class="fixed-footer" style="display: none;">
      <div class="footer-item active" data-target="회원관리">운동기록</div>
      <div class="footer-item" data-target="마이페이지">마이페이지</div>
    </footer>
  </div>
  <button class="add-btn"><img src="@/assets/icons/add (floating button).svg" alt=""></button>
</template>

<script setup lang="ts">

import {useRecordStore} from "~/store/record";
import ExerciseRecord from "~/components/record/ExerciseRecord.vue";
import Profile from "~/components/record/Profile.vue";


const recordStore = useRecordStore();
const category = ref([{key: 'record', name: '운동기록'}, {key: 'profile', name: '프로필'}]);
const selectedCategory = ref('record');
const route = useRoute();
const id = route.params.id;
const userType = 'TRAINER';
const records = ref([]);
const member = ref({});

onMounted(async () => {
  const response = await useRecord().recordList({userId: id, userType: userType});
  member.value = response.result.user
  records.value = response.result.list;
})

const selectCategory = (category) => {
  selectedCategory.value = category;
}



</script>

<style scoped>

</style>