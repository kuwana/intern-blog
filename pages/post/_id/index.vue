<template>
  <div class="container column">
    <section class="blog-container" v-if="post">
      <a :href="'/post/'+$route.params.id+'/edit'">編集</a>
      <span>{{formatDate}}</span>
      <h1 class="title">
        {{post.title}}<span v-if="post.draft">（下書き）</span>
      </h1>
      <div class="content">{{post.content}}</div>
    </section>
    <section class="blog-container">
      <h2>コメント</h2>
      <ul>
        <li v-for="(item, i) in comments" :key="i" class="content">
          {{ item.comment }}
          {{ item.createdAt }}
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
      post: {
        title: '',
        content: '',
        date: 0,
        draft: false
      },
      comments: [
        {
          id: 1,
          user: {
            name: 'kuwana'
          },
          comment: 'いつも拝見しています！',
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
        }
      ]
    }
  },
  computed: {
    formatDate () {
      return moment(this.post.date).format('YYYY-MM-DD HH:mm')
    }
  },
  created () {
    // FIXME: 取得がめちゃめちゃ遅い...
    DB.collection('posts').doc(this.$route.params.id).get().then(doc => {
      this.post = doc.data()
    })
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
</style>
