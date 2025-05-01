<template>
  <!-- 전체 컨테이너 -->
  <div class="container">
    <!-- 상단 타이틀 (검색창 포함) -->
    <ManageHeader @moveMemberAdd="moveMemberAdd"></ManageHeader>
    <!-- 카테고리 메뉴 -->
    <MemberList v-if="selectedCategory == 'list'"></MemberList>
    <MyPage v-if="selectedCategory == 'page'" ></MyPage>
    <!-- 하단 고정 푸터 -->
    <FooterType1 :category="category"
                 :selectedCategory="selectedCategory"
                 @selectCategory="selectCategory"></FooterType1>
    </div>
</template>

<script setup lang="ts">
import ManageHeader from "~/components/user/manage/ManageHeader.vue";
import {useMemberStore} from "~/store/member";
import MemberList from "~/components/user/trainer/MemberList.vue";
import {useRouter} from "vue-router";
import FooterType1 from "~/components/common/footer/FooterType1.vue";
import MyPage from "~/components/user/MyPage.vue";
const router = useRouter();
const memberStore = useMemberStore();
const category = ref([{ name : '회원관리', key : 'list'},{name : '마이페이지', key : 'page'}]);
const selectedCategory = ref('list');

//lifeCycle
onMounted(async () => {
  const data = {sortBy : ''}
  const response = await useMember().trainerMember(data);
  memberStore.setMembers(response.result.list);
  memberStore.setMembersCount(response.result.list.length);
});

//method
const selectSort = async (sort) => {
  const data = {sortBy : sort}
  const response = await useMember().trainerMember(data);
  memberStore.setMembers(response.result.list);
  memberStore.setMembersCount(response.result.list.length);
  clickSort();
}
const selectCategory = (key: string) => {
  selectedCategory.value = key;
}
const moveMemberAdd = () => {
  router.push('/trainer/invite');
}

</script>

<style scoped>

</style>