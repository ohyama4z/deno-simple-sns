<template>
<div class="message">
  <div><strong>{{username}}</strong> <small>{{createdAt}}</small></div>
  <div class="messageValue">
  <div>{{message}}</div>
  <div class="like">
    <span>LIKEされた数 : {{likes}} </span>
    <button @click="likeMessage" class="likeButton">+1 LIKE</button>
  </div>
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
  createdAt: string
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

<style scoped>
.message {
  display: table;
  background-color: white;
  border: 1px dashed;
  margin-top: 10px;
  padding-bottom: 1em;
  padding-right: 3em;
  padding-left: 0.5em;
}

.like {
  font-size: 0.5em;
}
.likeButton {
  margin-left: 1em;
}

.messageValue {
  margin-top: 1em;
  margin-left: 3em;
}
</style>