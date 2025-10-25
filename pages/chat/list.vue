   <template>
    <div class="room-list-container">
      <header class="header">
        <h2>채팅방 목록</h2>
        <p class="status">
          STOMP 상태:
          <span :class="connected ? 'connected' : 'disconnected'">
            {{ connected ? '연결됨 ✅' : '미연결 ❌' }}
          </span>
        </p>
      </header>
  
      <div class="controls">
        <input v-model.number="userId" placeholder="User ID 입력" />
        <button @click="subscribeRoom" :disabled="!connected || !userId">룸 구독</button>
        <button @click="chatRooms">채팅방 목록 불러오기</button>
      </div>
  
      <ul class="message-list">
        <li
          v-for="(room, i) in messages"
          :key="room.id"
          class="message-item"
          @click="goToRoom(room.id, room.roomType)"
        >
          <div class="room-header">
            <strong>{{ room.name }}</strong>
            <span v-if="room.unreadCount > 0" class="unread">{{ room.unreadCount }}</span>
          </div>
          <div class="room-content">{{ room.content }}</div>
          <div class="time">{{ formatDate(room.lastMessageAt) }}</div>
          <div v-if="room.isAlarm" class="alarm">🔔 알림 있음</div>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted, watch, onUnmounted } from 'vue'
  import { useStomp } from '~/composables/useStomp'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  import { RoomType } from '~/types/roomType'
  
  interface RoomMessage {
    id: number
    roomType: string,
    name: string
    content: string
    image: string | null
    isAlarm: boolean
    lastMessageAt: string
    unreadCount: number
  }

  const messages = ref<RoomMessage[]>([])
  const userId = ref<number | null>(null)
  const connected = ref(false)
  
  let client = ref<any>(null)
  let subscription: any = null
  
  const router = useRouter()
  
  const formatDate = (datetime: string) => {
    const date = new Date(datetime)
    const yyyy = date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')
    const hh = String(date.getHours()).padStart(2, '0')
    const mi = String(date.getMinutes()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd} ${hh}:${mi}`
  }
  
  // STOMP 연결
  onMounted(() => {
    const stomp = useStomp('http://localhost:8080/ws-stomp')
    client = stomp.client
  
    watch(stomp.connected, (val) => (connected.value = val))
  
    stomp.connect(() => {
      //console.log('[STOMP] Connected')
    })
  })
  
  onUnmounted(() => subscription?.unsubscribe())
  
  // 룸 구독
  const subscribeRoom = () => {
    if (!userId.value || !connected.value) return
    if (subscription) subscription.unsubscribe()
  
    const destination = `/sub/chat/rooms/${userId.value}`
    subscription = client.value?.subscribe(destination, (msg: any) => {
      try {
        const body = JSON.parse(msg.body) as RoomMessage
        const index = messages.value.findIndex(m => m.id === body.id)
        if (index >= 0) {
          messages.value[index] = body
        } else {
          messages.value.push(body)
        }
      } catch (e) {
        console.error('메시지 파싱 실패:', msg.body)
      }
    })
  
    //console.log(`[STOMP] Subscribed to ${destination}`)
  }
  
  // 채팅방 목록 가져오기
  const chatRooms = async () => {
    if (!userId.value) {
      alert('User ID를 입력해주세요.')
      return
    }
  
    try {
      const response = await axios.get(`http://localhost:8080/chat/list?userId=${userId.value}`)
      console.log('response.data:', response.data.result)
      messages.value = response.data.result as RoomMessage[]
    } catch (e) {
      console.error('채팅 방 목록 불러오기 실패', e)
    }
  }
  
  // 룸 클릭 시 room.vue로 이동
  const goToRoom = (roomId: number, roomType: string) => {
  if (!userId.value) {
    alert('User ID를 입력해주세요.')
    return
  }
  console.log('typetypetype: ' + String(roomType.valueOf()))
  router.push({
    path: `/chat/${roomId}`,
    query: { userId: userId.value.toString(), roomType: roomType}
  })
}
  </script>
  
  <style scoped>
  .room-list-container {
    width: 450px;
    margin: 40px auto;
    font-family: 'Pretendard', sans-serif;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  
  .status {
    font-weight: 500;
  }
  
  .connected {
    color: green;
  }
  
  .disconnected {
    color: red;
  }
  
  .controls {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .controls input {
    flex: 1;
    padding: 6px 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
  
  .controls button {
    padding: 6px 12px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    background-color: #4f46e5;
    color: #fff;
    transition: 0.2s;
  }
  
  .controls button:disabled {
    background-color: #a5b4fc;
    cursor: not-allowed;
  }
  
  .message-list {
    list-style: none;
    padding: 0;
    margin: 0;
    border: 1px solid #eee;
    border-radius: 8px;
    max-height: 400px;
    overflow-y: auto;
    background-color: #fafafa;
  }
  
  .message-item {
    padding: 10px 12px;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition: 0.2s;
  }
  
  .message-item:hover {
    background-color: #f0f0ff;
  }
  
  .message-item:last-child {
    border-bottom: none;
  }
  
  .room-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    margin-bottom: 4px;
  }
  
  .unread {
    background: red;
    color: #fff;
    padding: 2px 6px;
    border-radius: 50%;
    font-size: 0.75rem;
  }
  
  .room-content {
    font-size: 0.9rem;
    color: #333;
  }
  
  .time {
    font-size: 0.75rem;
    color: #888;
    margin-top: 4px;
  }
  
  .alarm {
    color: #eab308;
    font-size: 0.8rem;
    margin-top: 2px;
  }
  </style>
  