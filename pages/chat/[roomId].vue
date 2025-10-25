<template>
  <div class="chat-room">
    <h2>채팅방 {{ roomId }}</h2>
    <p>STOMP 연결 상태: {{ connected ? '연결됨' : '미연결' }}</p>
    <button @click="subscribeRoomTemp">stomp-room 구독</button>

    <div class="messages" ref="messagesContainer">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        class="message"
        :class="{ 'my-message': msg.usersId === userId }"
      >
        <b>{{ msg.usersId === userId ? '나' : '유저 ' + msg.usersId }}</b>
        : {{ msg.content }}
        <small class="time">{{ msg.createdDt }} {{ msg.createdTm }}</small>
        <span v-if="msg.usersId === userId" class="read-state">
          {{ msg.read ? '✔ 읽음' : '⌛ 안읽음' }}
        </span>
      </div>
    </div>

    <input v-model="inputMsg" @keyup.enter="sendMessage" placeholder="메시지 입력" />
    <button @click="sendMessage" :disabled="!connected || !inputMsg || !userId">
      전송
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useStomp } from '~/composables/useStomp'
import axios from 'axios'
import { RoomType } from '~/types/roomType'

interface ChatMessage {
  id: number
  usersId: number
  content: string
  createdDt: string
  createdTm: string
  read: boolean
}

const route = useRoute()
const roomId = ref<number>(Number(route.params.roomId))
const userId = Number(route.query.userId)
const roomType = String(route.query.roomType)

const messages = ref<ChatMessage[]>([])
const inputMsg = ref('')
const connected = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)

let client = ref<any>(null)
let subscription: any = null
let subscriptionRead: any = null

// ✅ STOMP 초기화 및 연결 상태 반영
onMounted(() => {
  const stomp = useStomp('http://localhost:8080/ws-stomp')
  client = stomp.client

  watch(stomp.connected, (val) => (connected.value = val))

  stomp.connect(
    () => {
      console.log('[STOMP] 연결 성공')
      // subscribeRoomTemp
      // readMessage
    },
    { 'identity-id': String(roomId.value) + '/' + String(userId) }
  )

  //readMessage()
})


onUnmounted(() => subscription?.unsubscribe())


const readMessage = () => {
  console.log('ddddddddd')
  // 읽음 여부 구독
  const response = axios.post(`http://localhost:8080/chat/read`, {
    userId: userId,
    roomId: roomId.value
  })
  subscriptionRead = client.value?.subscribe(
    `/sub/chat/read/${roomId.value}`,
    () => {
      messages.value.forEach(msg => {
        msg.read = true;
      });
    }
  )
}

// ✅ 방 구독 함수 (isRead 정확히 받기 위해 그대로 처리)
const subscribeRoomTemp = async () => {
  console.log('type: ' + String(route.query.roomType))

  if (!roomId.value || !client.value?.connected || !userId) return
  if (subscription) subscription.unsubscribe()

  // 실시간 메시지 수신 구독
  subscription = client.value?.subscribe(
    `/sub/chat/room/${roomId.value}`,
    (msg: any) => {
      const body = JSON.parse(msg.body) as ChatMessage      

      const chatMsg: ChatMessage = {
      id: body.id,
      usersId: body.usersId,
      content: body.content,
      createdDt: body.createdDt,
      createdTm: body.createdTm,
      read: body.read,
    }

      messages.value.push(chatMsg)
      scrollToBottom()
    }
  )

  readMessage()
  
  console.log(`[STOMP] Subscribed to /sub/chat/room/${roomId.value} as userId ${userId}`)
}

// ✅ 메시지 전송 (내 메시지는 isRead = true로 처리)
const sendMessage = () => {
  if (!inputMsg.value || !client.value?.connected || !userId) return

  const payload = {
    usersId: userId,
    roomId: roomId.value,
    content: inputMsg.value,
    type: 'TEXT'
  }

  const now = new Date()
  const localMessage: ChatMessage = {
    id: Date.now(),
    usersId: userId,
    content: inputMsg.value,
    createdDt: now.toISOString().split('T')[0],
    createdTm: now.toTimeString().slice(0, 5),
    read: true // ✅ 내가 보낸 메시지는 읽음 상태로 표시
  }

  //messages.value.push(localMessage)
  scrollToBottom()

  client.value.publish({
    destination: '/pub/chat/send',
    body: JSON.stringify(payload)
  })

  inputMsg.value = ''
}

// ✅ 스크롤 자동 아래로
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}
</script>

<style scoped>
.chat-room {
  width: 400px;
  margin: 0 auto;
}
.messages {
  border: 1px solid #ccc;
  height: 300px;
  overflow-y: auto;
  padding: 10px;
  margin-bottom: 10px;
  background: #f9f9f9;
}
.message {
  margin-bottom: 5px;
  padding: 4px 6px;
  border-radius: 4px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.my-message {
  background-color: #e0ffe0;
}
.time {
  font-size: 0.8rem;
  color: #888;
  margin-left: 8px;
}
.read-state {
  margin-left: 6px;
  font-size: 0.75rem;
}
</style>
