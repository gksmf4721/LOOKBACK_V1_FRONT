<template>
  <header v-if="!headerType" class="default-header">
    <div class="default-div">
      <div class="default-title">회원관리</div>
      <div class="default-header-item2">
        <div class="default-icon-1">
          <button class="back-btn"><img src="@/assets/icons/person-add.svg" alt=""></button>
        </div>
        <div>
          <button @click="handleSearch" class="back-btn"><img src="@/assets/icons/search.svg" alt=""></button>
        </div>
      </div>
    </div>
  </header>
  <!-- 돋보기 누르면 변경 -->
  <header v-if="headerType" class="header">
    <div class="search-header">
      <div class="back-btn-box">
        <button @click="handleSearch" class="back-btn"><img src="@/assets/icons/chevron-left.svg" alt=""></button>
      </div>
      <div class="search-container">
        <input
            v-model="userName"
            type="text"
            class="search-input"
            placeholder="회원 이름 검색"
        />
        <button class="search-btn">
          <img src="@/assets/icons//search.svg" alt="">
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">

import {useMemberStore} from "~/store/member";

const memberStore = useMemberStore();
const headerType = ref(false);
const userName = ref('');


const handleSearch = () => {
  headerType.value = !headerType.value;
  memberStore.setUseFilter(headerType.value);
};

watch(userName,(newValue) => {
  memberStore.setSearchUserName(newValue);
});



</script>

<style scoped>

</style>