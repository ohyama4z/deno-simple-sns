<template>
<div>
  <Form @submit="fetchMessages" />
  <div :key="key">
    <Message 
    v-for="{id, username, message, likes} in messages"
    :key="id"
    :id="id"
    :username="username"
    :message="message"
    :likes="likes"
    @like="fetchMessages"
    />
  </div>
</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Message_t from './@types/Message'
import { apiUrl } from './const.dev'
import Form from './components/Form.vue'
import Message from './components/Message.vue'

const messages = ref<Message_t[]>([])
const key = ref(0)

const fetchMessages = async () => {
  const unparsedData = await fetch(`${apiUrl}/messages`, {
    method: "GET",
    mode: "cors"
  })

  const res = await unparsedData.json()
  const sortedMessages = [...res].sort((a,b) => a.id < b.id ? -1 : 1)
  messages.value = sortedMessages
}

onMounted(async () => {
  await fetchMessages()
})
</script>