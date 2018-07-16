<template>
  <div class="container">
    <section class="blog-container" v-if="post">
      <h1 class="title">{{post.title}}</h1>
      <div class="content">{{post.content}}</div>
    </section>
  </div>
</template>

<script>
import { DB } from '@/plugins/firebase'
export default {
  data () {
    return {
      post: null
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
  margin: 1rem 0;
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
</style>
