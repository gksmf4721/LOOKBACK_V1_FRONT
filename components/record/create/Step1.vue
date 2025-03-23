<template>
  <div class="record-add-container">
    <header class="default-header">
      <div class="default-div">
        <div>
          <div class="back-btn-box-text">
            <button class="back-btn"><img src="@/assets/icons/chevron-left.svg" alt=""></button>
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
                v-model="startTime"
            />
          </div>

          ~
          <div class="time-input">
            <input
                id="end-time"
                type="time"
                v-model="endTime"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 하단 고정 푸터 -->
    <footer class="fixed-footer-btn">
      <button class="create-record-btn" onclick="window.location.href='page2.html'">
        운동 선택
      </button>
    </footer>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
  const userId = route.params.id;

  const now = new Date()
  const defaultTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  const defaultTimeAfter1Hour = `${String(now.getHours() + 1).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

  const startTime = ref(defaultTime)
  const endTime = ref(defaultTimeAfter1Hour);

  const pad = (n: number) => String(n).padStart(2, '0')
  const toYYYYMMDD = (d: Date) =>
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

  const recordDate = ref(toYYYYMMDD(now))

</script>

<style scoped>

</style>