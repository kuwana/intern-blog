<template>
  <div class="new-container">
    <div class="form-body">
      <h1>編集ページ</h1>
      <ul v-if="errors.length > 0" class="alert alert-danger">
        <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
      </ul>
      <input type="text" class="title-field" v-model="post.title" placeholder="タイトル" />
      <textarea class="content-field" v-model="post.content" placeholder="投稿内容"></textarea>
      <button v-if="!loading" class="button" @click="submit">更新</button>
      <button v-else class="button bg-grey" disabled>送信中</button>
      <button class="button button-danger" @click="postDelete">削除</button>
      <input type="checkbox" id="draft" class="draft-check" v-model="post.draft">
      <label for="draft">下書き（非公開）</label>
    </div>
  </div>
</template>

<script>
import { DB, TIMESTAMP } from '@/plugins/firebase'
import moment from 'moment'
export default {
  data () {
    return {
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
  created () {
    console.time('test')
    DB.collection('posts').doc(this.$route.params.id).get().then(doc => {
      console.timeEnd('test')
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
.button-danger {
  background: #a94442!important;
}
.alert {
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid #0000;
  border-radius: 0.25rem;
}
.alert-danger {
  background-color: #f2dede;
  border-color: #ebcccc;
  color: #a94442;
}
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
.button {
  cursor: pointer;
  background: #14abce;
  color: #fff;
  border: none;
  border-radius: 3px;
  font-size: 1rem;
  padding: 0.6rem 1rem;
}
.bg-grey {
  background: #ccc;
}
.form-body {
  width: 100%;
  display: block;
}
</style>
