<template>
  <div>
    <div class="default-nav">
      <div v-if="memberStore.useFilter">총 {{memberStore.filteredMembersCount}}명</div>
      <div v-if="!memberStore.useFilter">총 {{memberStore.membersCount}}명</div>
      <div class="default-nav-item">
        <button @click.stop="clickSort" class="sort-btn">
          <img src="@/assets/icons//swap-vertical.svg" alt="">
          <span>
                정렬
          </span>
        </button>
      </div>
    </div>

    <div class="user-container">
      <!-- 회원이 없을 경우 표시될 문구 -->
      <div style="display: none;" class="no-users-message">등록하신 회원이 없습니다.</div>

      <div class="user-item-container">
        <!-- 회원 정보 -->
        <div class="user-item" v-for="item in membersList" :key="item.id">
          <NuxtLink :to="`/record/${item.userId}`" class="user-info">
            <div class="user-image">
              <img src="@/assets/images/1.png" alt="운동 아이콘">
            </div>
            <div class="user-text">
              <div class="user-title">{{item.userName}}</div>
              <div v-if="!item.isNew" class="user-descript gray-text">{{item.age}}세 | 마지막수업: {{item.latestCreatedAt}}</div>
              <div v-if="item.isNew" class="user-descript gray-text">{{item.age}}세 | 새로운 회원</div>
            </div>
          </NuxtLink>
        </div>
        <!--회원정보-->
      </div>
    </div>
    <!-- 정렬 모달 -->
    <div v-if="isShowSortModal" id="sortModal" class="user-sort-modal">
      <ul class="sort-options">
        <li @click="selectSort(item.sort)" v-for="item in sortTypes" class="sort-option" >{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {useMemberStore} from "~/store/member";
  import {computed} from "vue";
  const props = defineProps({
    isShowSortModal: {
      type: Boolean,
      default: false
    }
  })

  const emits = defineEmits(['selectSort','clickSort']);
  const selectSort = (sort: string) => {
    emits('selectSort',sort);
  }
  const sortTypes = ref([
      {name: '가나다순', sort: 'userName'},
      {name: '최근 수업순', sort: 'recent'}
  ])

  const memberStore = useMemberStore();

  const clickSort = () => {
    emits('clickSort');
  }
  //getters
  const membersList = computed(() => {
    if(memberStore.useFilter){
      return memberStore.filteredMembers.map(m => ({
        ...m,
        isNew : m.latestCreatedAt == null ? true : false
      }))
    } else {
      return memberStore.members.map(m => ({
        ...m,
        isNew : m.latestCreatedAt == null ? true : false
      }))
    }

  })


</script>

<style scoped>

</style>