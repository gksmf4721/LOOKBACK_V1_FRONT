<template>
  <div v-if="selectedCategory == 'profile'" class="profile-container">
    <div class="profile-image">
      <img :src="member.profileImageUrl" alt="사용자 이미지">
    </div>
    <div class="profile-info">
      <div class="profile-row">
        <span class="profile-label gray-text">이름</span>
        <span class="profile-value">{{member.userName}}</span>
      </div>
      <div class="profile-row">
        <span class="profile-label gray-text">생년월일</span>
        <span class="profile-value">{{member.birthDt}}({{member.age}}세)</span>
      </div>
      <div class="profile-row">
        <span class="profile-label gray-text">성별</span>
        <span class="profile-value">{{member.gender}}</span>
      </div>
      <div class="profile-row">
        <span class="profile-label gray-text">전화번호</span>
        <span class="profile-value">{{member.phone}}</span>
      </div>
      <div class="profile-row">
        <span class="profile-label gray-text">이메일</span>
        <span class="profile-value">{{member.email}}</span>
      </div>
      <div class="profile-row">
        <span class="profile-label gray-text">키</span>
        <span class="profile-value">{{member.height}}cm</span>
      </div>
      <div class="profile-row">
        <span class="profile-label gray-text">몸무게</span>
        <span class="profile-value">{{member.weight}}kg</span>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  selectedCategory : String,
  member : {type: Object, default: {}}
})

</script>

<style scoped>

</style>