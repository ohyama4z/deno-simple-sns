<template>
<div>
  <div>ユーザ名</div>
  <div>
    <input type="text" v-model="username" />
  </div>

  <div>メッセージ</div>
  <div>
    <textarea placeholder="投稿したいメッセージを入力" v-model="message" />
  </div>

  <div>
    <button @click="submitMessage">投稿</button>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { apiUrl } from '../const.dev'

const username = ref('')
const message = ref('')

interface Emits {
  (e: "submit"): void
}
const emit = defineEmits<Emits>()

const submitMessage = async ():Promise<void> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  }
  const body = JSON.stringify({username:username.value, message:message.value})

  await fetch(`${apiUrl}/messages`, {
    method: 'POST',
    mode: 'no-cors',
    headers,
    body
  })

  emit("submit")
}

</script>