<template>
  <section class="blog-container">
    <h2>コメント</h2>
    <div v-if="user">
      <Alert :errors="errors" />
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
          <button @click="deleteComment">削除</button>
          <span @click="cancelComment">x</span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { Auth, DB } from '@/plugins/firebase'
import Alert from '@/components/Alert'
export default {
  components: {
    Alert
  },
  data () {
    return {
      loading: false,
      errors: [],
      user: Auth.currentUser,
      newComment: '',
      editingComment: {
        id: '',
        content: ''
      },
      comments: []
    }
  },
  created () {
    this.loading = true
    this.fetchComments().then(() => {
      this.loading = false
    })
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
    fetchComments () {
      return new Promise((resolve, reject) => {
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
              resolve()
            })
          })
          .catch(error => {
            console.error("Error get document: ", error);
            reject()
          })
      })
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
      if (!this.user) {
        return false
      }
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
    deleteComment () {
      if (!window.confirm('本当に削除してよろしいですか？')) {
        return false
      }
      DB.collection('posts')
        .doc(this.$route.params.id)
        .collection('comments')
        .doc(this.editingComment.id)
        .delete()
        .then(() => {
          console.log('deleted!')
          this.editingComment = {}
          this.fetchComments()
        })
    },
  }
}
</script>

<style scoped>
.blog-container {
  margin: 1rem auto;
  padding: 0 1rem;
}
.content {
  margin-top: 1rem;
  max-width: 600px;
  text-align: justify;
  line-height: 1.58;
}
.comment-field {
  width: 100%;
  height: 3rem;
}
</style>

