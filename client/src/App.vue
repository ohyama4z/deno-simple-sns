<template>
<div class="main">
  <Header />
  <div class="messages">
    <Message 
    v-for="{id, username, message, likes, created_at} in messages"
    :key="id"
    :id="id"
    :username="username"
    :message="message"
    :likes="likes"
    :createdAt="created_at"
    @like="fetchMessages"
    />
  </div>
  <Form @submit="fetchMessages" />
</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Message_t from './@types/Message'
import { apiUrl } from './const.production'
import Form from './components/Form.vue'
import Message from './components/Message.vue'
import Header from './components/Header.vue'

const messages = ref<Message_t[]>([])

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

<style scoped>
.main {
  width: 100vw;
  margin-left: 10vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.messages {
  margin-bottom: 1em;
}

</style>