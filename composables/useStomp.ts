// composables/useStomp.ts
import { Client, type Message } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { ref, onUnmounted } from 'vue'

export function useStomp(url: string) {
  const client = ref<Client | null>(null)
  const connected = ref(false)

  const connect = (onMessage: (msg: Message) => void, headers?: { [key: string]: string }) => {
    client.value = new Client({
      webSocketFactory: () => new SockJS(url),
      reconnectDelay: 5000,
      debug: (str) => console.log('[STOMP]', str),
    })
  
    if (headers) {
      client.value.connectHeaders = headers
    }
  
    client.value.onConnect = () => {
      connected.value = true
      console.log('[STOMP] Connected')
    }
  
    client.value.onStompError = (frame) => {
      console.error('[STOMP] Error:', frame.headers['message'])
    }
  
    client.value.activate()
  }
  

  const disconnect = () => {
    client.value?.deactivate()
    connected.value = false
  }

  onUnmounted(() => disconnect())

  return { client, connected, connect, disconnect }
}
