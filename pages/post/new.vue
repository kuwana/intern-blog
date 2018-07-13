<template>
  <div class="container">
    <h1>新規ページ</h1>
    <input type="text" v-model="title" placeholder="タイトル" />
    <textarea v-model="content" placeholder="投稿内容"></textarea>
    <button @click="submit">送信</button>
  </div>
</template>

<script>
import { DB } from '@/plugins/firebase'
import moment from 'moment'
export default {
  methods: {
    data () {
      return {
        // TODO: オブジェクトのバインドができないのか、調査
        title: '',
        content: ''
      }
    },
    submit () {
      // TODO: バリデーション
      DB.collection('posts').add({
        title: this.title,
        content: this.content,
        date: moment().unix(),
        draft: false
      })
        .then(docRef => {
          console.log("Document written with ID: ", docRef.id)
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        })
    }
  }
}
</script>

<style>
</style>
