<template>
  <!-- 전체 컨테이너 -->
  <div class="container">
    <!-- 상단 타이틀 (검색창 포함) -->
    <ManageHeader @moveMemberAdd="moveMemberAdd"></ManageHeader>
    <!-- 카테고리 메뉴 -->
    <MemberList></MemberList>
    <!-- 하단 고정 푸터 -->
    <footer class="fixed-footer">
      <div v-for="item in category" @click="selectCategory(item)" class="footer-item" :class="{active : selectedCategory == item}" >{{ item }}</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import ManageHeader from "~/components/user/manage/ManageHeader.vue";
import {api} from "~/store/api";
import {useMemberStore} from "~/store/member";
import MemberList from "~/components/user/trainer/MemberList.vue";
import {useRouter} from "vue-router";
const router = useRouter();
const memberStore = useMemberStore();
const category = ref(['회원관리','마이페이지']);
const selectedCategory = ref('회원관리');

const selectCategory = (category) => {
  selectedCategory.value = category;
}

const moveMemberAdd = () => {
  router.push('/trainer/invite');
}

</script>

<style scoped>

</style>