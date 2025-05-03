<template>
  <div class="record-add-container">
    <header class="default-header">
      <div class="default-div">
        <div>
          <div class="back-btn-box-text">
            <button class="back-btn"><img @click="goBack" src="@/assets/icons/chevron-left.svg" alt=""></button>
            <div class="default-back-title">운동기록 추가</div>
          </div>
        </div>
      </div>
    </header>

    <div class="create-records">
      <!-- 날짜 입력 -->
      <div class="record-section bottom-30">
        <label for="record-date">운동 날짜</label>
        <input
            id="record-date"
            type="date"
            v-model="recordDate"
            class="styled-date-input"
        />
      </div>

      <!-- 수업 시간 -->
      <div class="record-section bottom-30">
        <label>운동 시간</label>
        <div class="input-group">
          <div class="time-input">
            <input
                id="start-time"
                type="time"
                v-model="recordTimeStart"
            />
          </div>

          ~
          <div class="time-input">
            <input
                id="end-time"
                type="time"
                v-model="recordTimeEnd"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 하단 고정 푸터 -->
    <footer class="fixed-footer-btn">
      <button class="create-record-btn" @click="saveRecord">
        운동 선택
      </button>
    </footer>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
  const router = useRouter();
  const userId = route.params.id;

  const now = new Date()
  const defaultTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  const defaultTimeAfter1Hour = `${String(now.getHours() + 1).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

  const recordTimeStart = ref(defaultTime)
  const recordTimeEnd = ref(defaultTimeAfter1Hour);

  const pad = (n: number) => String(n).padStart(2, '0')
  const toYYYYMMDD = (d: Date) =>
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
  const recordDate = ref(toYYYYMMDD(now));


  const saveRecord = async () => {
    const response = await useRecord().recordSave(
        { usersId: userId
              , recordDate: recordDate.value
              , recordTimeStart: recordTimeStart.value
              , recordTimeEnd: recordTimeEnd.value });
    if(response.status == '200'){
      router.replace(`/record/${userId}/save/${response.result.recordId}`);
    }
  }
  const goBack = () => {
    router.push(`/record/${userId}`); // 기본 홈 또는 지정한 페이지로
  };

</script>

<style scoped>

</style>