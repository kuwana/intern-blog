<template>
  <div class="container column">
    <section class="blog-container" v-if="post">
      <nuxt-link v-if="user" :to="'/post/'+$route.params.id+'/edit'">編集</nuxt-link>
      <span>{{ formatDate }}</span>
      <h1 class="title">
        {{ post.title }}<span v-if="post.draft">（下書き）</span>
      </h1>
      <address>{{ post.author }}</address>
      <article class="content">{{ post.content }}</article>
    </section>
    <BlogComment />
  </div>
</template>

<script>
import { Auth, DB } from '@/plugins/firebase'
import moment from 'moment'
import Alert from '@/components/Alert'
import BlogComment from '@/components/BlogComment'
export default {
  components: {
    Alert,
    BlogComment
  },
  data () {
    return {
      loading: false,
      user: Auth.currentUser,
      post: {
        author: null,
        title: '',
        content: '',
        date: 0,
        draft: false
      }
    }
  },
  computed: {
    formatDate () {
      return moment(this.post.date).format('YYYY-MM-DD HH:mm')
    }
  },
  created () {
    this.loading = true
    this.fetchPost().then(() => {
      this.loading = false
    })
  },
  methods: {
    fetchPost () {
      return new Promise((resolve, reject) => {
        DB.collection('posts')
          .doc(this.$route.params.id)
          .get()
          .then(doc => {
            this.post = doc.data()
            // this.post.author.get().then(docRef => {
            //   // this.post.author_name = docRef.data().name
            //   console.log(docRef.data())
            //   resolve()
            // })
            resolve()
          })
          .catch(err => {
            reject()
          })
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
