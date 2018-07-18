<template>
  <div class="container column">
    <section class="blog-container" v-if="post">
      <a :href="'/post/'+$route.params.id+'/edit'">編集</a>
      <span>{{ formatDate }}</span>
      <h1 class="title">
        {{ post.title }}<span v-if="post.draft">（下書き）</span>
      </h1>
      <div class="content">{{ post.content }}</div>
    </section>
    <section class="blog-container">
      <h2>コメント</h2>
      <div>
        <ul v-if="errors.length > 0" class="alert">
          <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
        </ul>
        <textarea class="comment-field" v-model="newComment" placeholder="コメントを書く"></textarea>
        <button @click="submitComment">コメントする</button>
      </div>
      <ul>
        <li v-for="comment in comments" :key="comment.id" @click="editComment(comment)" class="content">
          <div v-if="editingComment.id !== comment.id">
            {{ comment.content }}
            {{ comment.createdAt }}
          </div>
          <div v-else>
            <input type="text" v-model="editingComment.content">
            <button @click="updateComment">更新</button>
            <span @click="cancelComment">x</span>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { DB } from '@/plugins/firebase'
import moment from 'moment'
export default {
  data () {
    return {
      errors: [],
      newComment: '',
      editingComment: {
        id: '',
        content: ''
      },
      post: {
        title: '',
        content: '',
        date: 0,
        draft: false
      },
      comments: []
    }
  },
  computed: {
    formatDate () {
      return moment(this.post.date).format('YYYY-MM-DD HH:mm')
    }
  },
  created () {
    this.fetchPost()
    this.fetchComments()
  },
  methods: {
    validateNew () {
      this.errors = []
      if (this.newComment.length <= 0) {
        this.errors.push('コメントを入力してください。')
      }
      if (this.errors.length > 0) {
        return false
      }
      return true
    },
    // FIXME: 共通化
    validateEdit () {
      this.errors = []
      if (this.editingComment.content.length <= 0) {
        this.errors.push('コメントを入力してください。')
      }
      if (this.errors.length > 0) {
        return false
      }
      return true
    },
    submitComment () {
      if (!this.validateNew()) {
        return false
      }
      DB.collection('posts')
        .doc(this.$route.params.id)
        .collection('comments')
        .add({
          content: this.newComment,
        })
        .then(docRef => {
          this.fetchComments()
          this.newComment = ''
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        })
    },
    editComment (comment) {
      this.editingComment = comment
    },
    cancelComment () {
      // FIXME:
      this.editingComment = {}
    },
    updateComment () {
      if (!this.validateEdit()) {
        return false
      }
      DB.collection('posts')
        .doc(this.$route.params.id)
        .collection('comments')
        .doc(this.editingComment.id)
        .update({
          content: this.editingComment.content,
          // updatedAt: new Date().now()
        })
        .then(() => {
          console.log('updated!')
          this.editingComment = {}
          this.fetchComments()
        })
    },
    fetchPost () {
      DB.collection('posts')
        .doc(this.$route.params.id)
        .get()
        .then(doc => {
          this.post = doc.data()
        })
    },
    fetchComments () {
      DB.collection('posts')
        .doc(this.$route.params.id)
        .collection('comments')
        .get()
        .then(querySnapshot => {
          this.comments = []
          querySnapshot.forEach(doc => {
            const data = doc.data()
            data.id = doc.id
            this.comments.push(data)
          })
        })
        .catch(error => {
          console.error("Error get document: ", error);
        })
    }
  }
}
</script>

<style scoped>
.blog-container {
  margin: 1rem auto;
  padding: 0 1rem;
}
.title {
  font-size: 42px;
  color: rgba(0, 0, 0, 0.84);
  font-weight: 700;
}
.content {
  margin-top: 1rem;
  max-width: 600px;
  text-align: justify;
  line-height: 1.58;
}
.column {
  flex-direction: column;
}
.comment-field {
  width: 100%;
  height: 3rem;
}
</style>
