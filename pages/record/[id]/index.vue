<template>
  <!-- 전체 컨테이너 -->
  <div class="container">
    <!-- 일반회원 -->
    <header v-if="user.isMember()" class="default-header">
      <div class="default-div">
        <div class="default-title">운동기록</div>
      </div>
    </header>
    <!-- 트레이너일 떄 -->
    <header v-if="user.isTrainer()" class="default-header" >
      <div class="default-div">
        <div>
          <div class="back-btn-box-text">
            <NuxtLink :to="`/trainer`" >
              <button type="button" class="back-btn"><img src="../../../assets/icons/chevron-left.svg" alt=""></button>
            </NuxtLink>
            <div class="default-back-title">{{member.userName}}</div>
          </div>
        </div>
        <div @click="showBottomPopup = true" class="default-header-item">
          <div><img src="../../../assets/icons/ellypsis.svg" alt=""></div>
        </div>
      </div>
    </header>
    <!-- 카테고리 메뉴 -->
    <nav v-if="user.isTrainer()" class="category-nav">
      <button v-for="item in category"
              :class="{active : item.key == selectedCategory}"
              @click="selectCategory(item.key)"
              class="category-btn">{{ item.name }}</button>
    </nav>
    <template v-if="selectedBottomCategory == 'list'">
      <ExerciseRecord
          :selectedCategory="selectedCategory"
          :userId="id"
          :userType="userType"
          v-model:records="records"

          @moveDetail="moveDetail"
      >
      </ExerciseRecord>
      <Profile :selectedCategory="selectedCategory" :member="member">
      </Profile>
    </template>
    <!-- 정렬 모달 -->
    <MyPage v-if="selectedBottomCategory == 'page'" ></MyPage>
    <FooterType1 v-if="user.isMember()"
                 :category="bottomCategory"
                 :selectedCategory="selectedBottomCategory"
                 @selectCategory="selectBottomCategory"></FooterType1>
    <div id="sortModal" class="record-sort-modal hidden">
      <ul class="sort-options">
        <li class="sort-option" data-value="recommend">가나다순</li>
        <li class="sort-option" data-value="newest">최근 수업순</li>
      </ul>
    </div>
    <!--popup-->
    <div>
      <BottomPopup :show="showBottomPopup" @close="showBottomPopup = false">
        <div>
          <h3 class="bottom-popup-title">더보기</h3>
          <ul class="popup-menu">
            <li @click="onMore" class="popup-item">
              <img src="../../../assets/icons/not-allowed.svg">
              <span @click="showConfirm = true">회원 연결 해제</span>
            </li>
          </ul>
        </div>
      </BottomPopup>
    </div>
    <ConfirmModal
        :show="showConfirm"
        :title="'김지혜 회원님과의 연결을 정말 해제할까요?'"
        :message="`연결 해제 후 회원의 정보를 열람하거나 기록을 추가할 수 없어요.\n회원은 기존 기록을 계속 열람할 수 있고,\n언제든 다시 연결하면 기존 기록을 확인할 수 있어요.`"
        @close="showConfirm = false"
        @confirm="onConfirmDisconnect"
    />
    <SingleConfirmModal
        :show="showSingleConfirm"
        :title="'회원 연결 해제'"
        :message="`${member.userName} 회원님과 연결이 해제되었습니다. 수고하셨어요!`"
        @confirm="onSingleConfirm"
    />
  </div>
  <button class="add-btn" @click="createRecord"><img src="../../../assets/icons/add%20(floating%20button).svg" alt=""></button>
</template>

<script setup lang="ts">

import {useRecordStore} from "~/store/record";
import ExerciseRecord from "~/components/record/ExerciseRecord.vue";
import Profile from "~/components/record/Profile.vue";
import BottomPopup from "~/components/popup/BottomPopup.vue";
import ConfirmModal from "~/components/popup/ConfirmModal.vue";
import SingleConfirmModal from "~/components/popup/SingleConfirmModal.vue";
import {useRouter} from "vue-router";
import FooterType1 from "~/components/common/footer/FooterType1.vue";
import MyPage from "~/components/user/MyPage.vue";
const route = useRoute();
const router = useRouter();
const recordStore = useRecordStore();
const user = useUser();

const category = ref([{key: 'record', name: '운동기록'}, {key: 'profile', name: '프로필'}]);
const bottomCategory = ref([{ name : '회원관리', key : 'list'},{name : '마이페이지', key : 'page'}]);
const selectedBottomCategory = ref('list');
const selectedCategory = ref('record');
const id = route.params.id;
const userType = user.getUserType();
const showBottomPopup = ref(false);
const showConfirm = ref(false);
const showSingleConfirm = ref(false);
const singleConfirmMessage = ref('');
const records = ref([]);
const member = ref({});
const trainingId = ref('');

onMounted(async () => {
  const response = await useRecord().recordList({userId: id, userType: userType});
  member.value = response.result.user
  records.value = response.result.list;
  trainingId.value = response.result.trainingId;
})

const selectCategory = (category) => {
  selectedCategory.value = category;
}

const selectBottomCategory = (key) => {
  console.log(key);
  selectedBottomCategory.value = key
}

const onConfirmDisconnect = async () => {

   try {
    const response= await useTrainer().cancelTraining({trainingId : trainingId.value});
    if (response.status == '200') {
      singleConfirmMessage.value =
          `${member.value.userName} 회원님과 연결이 해제되었습니다. 수고하셨어요!`;
      showConfirm.value= false;
      showBottomPopup.value= false;
      showSingleConfirm.value = true;
    } else {
      singleConfirmMessage.value =
          `연결 해제에 실패했습니다.`;
    }

   } catch (e) {
     singleConfirmMessage.value =
         `연결 해제에 실패했습니다.`;
   }
}

const onSingleConfirm = () => {
  router.replace("/trainer");
}

const createRecord = () => {
  router.replace(`/record/${id}/create`);
}

const moveDetail = (recordId: number) => {
  router.replace({
    path: `/record/${id}/detail/info`,
    query: {recordId: recordId}
  })
}

</script>

<style scoped>

</style>