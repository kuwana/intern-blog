<template>
  <div class="new-container">
    <div v-if="user" class="form-body">
      <h1>新規ページ</h1>
      <AppAlert :errors="errors" type="danger" />
      <input type="text" class="title-field" v-model="post.title" placeholder="タイトル" />
      <textarea class="content-field" v-model="post.content" placeholder="投稿内容"></textarea>
      <TheButton type="submit" :loading="loading" :onSubmit="submit">送信</TheButton>
      <input type="checkbox" id="draft" class="draft-check" v-model="post.draft">
      <label for="draft">下書き（非公開）</label>
    </div>
    <div v-else>
      ログインしてないと投稿できません。
    </div>
  </div>
</template>

<script>
import { DB, Auth, TIMESTAMP } from '@/plugins/firebase'
import moment from 'moment'
import AppAlert from '@/components/AppAlert'
import TheButton from '@/components/TheButton'
export default {
  components: {
    AppAlert,
    TheButton
  },
  data () {
    return {
      user: null,
      post: {
        title: '',
        content: '',
        date: moment().unix(),
        draft: false,
        author: null
      },
      errors: [],
      loading: false,
    }
  },
  created () {
    Auth.onAuthStateChanged(user => {
      if (user) {
        this.user = user
        const userRef = DB.collection('users').doc(user.uid)
        this.post.author = userRef
      }
    })
  },
  methods: {
    validate () {
      this.errors = []
      if (!this.post.title) {
        this.errors.push('タイトルは必須です')
      } else if (this.post.title.length >= 40) {
        this.errors.push('タイトルは40文字以内です')
      }
      if (!this.post.content) {
        this.errors.push('投稿内容は必須です')
      }
      if (this.errors.length > 0) {
        return false
      }
      return true
    },
    submit () {
      this.loading = true
      if (!this.validate()) {
        this.loading = false
        return false
      }
      DB.collection('posts').add(this.post)
        .then(docRef => {
          this.$router.push('/post/' + docRef.id)
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>
.draft-check {
  margin: 0 0.2rem 0 0.7rem;
}
.new-container {
  width: 700px;
  margin: 0 auto;
}
.title-field,
.content-field {
  width: 100%;
  font-size: 1.25rem;
  padding: 0.4rem;
  margin-bottom: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.content-field {
  height: 45vh;
}
.title-field:focus,
.content-field:focus {
  box-shadow: 0 0 1px 0 #ff00ff05;
}
.form-body {
  width: 100%;
  display: block;
}
</style>
