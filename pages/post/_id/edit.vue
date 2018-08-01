<template>
  <div v-if="user" class="new-container">
    <div class="form-body">
      <h1>編集ページ</h1>
      <Alert :errors="errors" type="danger" />
      <input type="text" class="title-field" v-model="post.title" placeholder="タイトル" />
      <textarea class="content-field" v-model="post.content" placeholder="投稿内容"></textarea>
      <TheButton type="submit" :onSubmit="submit" :loading="loading" class="margin-right">更新</TheButton>
      <TheButton type="delete" :onDelete="postDelete">削除</TheButton>
      <input type="checkbox" id="draft" class="draft-check" v-model="post.draft">
      <label for="draft">下書き（非公開）</label>
    </div>
  </div>
</template>

<script>
import { Auth, DB, TIMESTAMP } from '@/plugins/firebase'
import moment from 'moment'
import Alert from '@/components/Alert'
import TheButton from '@/components/TheButton'
export default {
  components: {
    Alert,
    TheButton
  },
  data () {
    return {
      user: null,
      post: {
        title: '',
        content: '',
        date: moment().unix(),
        draft: false
      },
      errors: [],
      loading: false,
    }
  },
  mounted () {
    Auth.onAuthStateChanged(user => {
      if (!user) {
        // TODO: とりあえず前ページに戻しちゃう。403Forbiddenのほうがいいかな。
        this.$router.go(-1)
      }
      this.user = user
    })
    DB.collection('posts').doc(this.$route.params.id).get().then(doc => {
      this.post = doc.data()
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
    },
    postDelete() {
      window.alert('投稿を削除しますか？')
      DB.collection('posts').doc(this.$route.params.id).delete().then(() => {
        this.$router.push('/')
      }).catch(err => {
        console.log(err)
      })
      return false
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
.margin-right {
  margin-right: 0.5rem;
}
</style>
