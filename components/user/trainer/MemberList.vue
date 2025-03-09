<template>
  <div>
    <div class="default-nav">
      <div>총 28명</div>
      <div class="default-nav-item">
        <button class="sort-btn">
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

      <div class="user-item-container" data-id="user-1">
        <!-- 회원 정보 -->
        <div class="user-item" v-for="item in memberStore.members" :key="item.id">
          <div class="user-info">
            <div class="user-image">
              <img src="@/assets/images/1.png" alt="운동 아이콘">
            </div>
            <div class="user-text">
              <div class="user-title">{{item.userName}}</div>
              <div class="user-descript gray-text">{{item.age}}세 | 마지막수업: {{item.latestCreatedAt}}</div>
            </div>
          </div>
        </div>
        <!--회원정보-->
      </div>
    </div>
    <!-- 정렬 모달 -->
    <div id="sortModal" class="user-sort-modal hidden">
      <ul class="sort-options">
        <li class="sort-option" data-value="recommend">가나다순</li>
        <li class="sort-option" data-value="newest">최근 수업순</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {useMemberStore} from "~/store/member";

  const memberStore = useMemberStore();


</script>

<style scoped>

</style>