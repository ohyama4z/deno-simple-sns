<template>
<div class="message">
  <h2></h2>
  <div>{{username}} &lt <strong>{{message}}</strong></div>
  <div>
    <label>LIKEされた数 : {{likes}} </label>
    <button @click="likeMessage">+1 LIKE</button>
  </div>
</div>
</template>

<script setup lang="ts">
import {apiUrl} from "../const.dev"

interface Props {
  id:number
  username:string
  message:string
  likes: number
}
const props = defineProps<Props>()

interface Emits {
  (e: "like"): void
}
const emit = defineEmits<Emits>()


const likeMessage = async () => {

  await fetch(`${apiUrl}/messages/like?id=${props.id}`, {
    method: 'POST',
    mode: 'no-cors',
  })

  emit("like")
}
</script>