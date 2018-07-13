<template>
  <section class="container item-list-container">
    <div class="content">
      <blog-item-list :posts="posts" />
    </div>
  </section>
</template>

<script>
import BlogItemList from '@/components/BlogItemList'
import { DB } from '@/plugins/firebase'

export default {
  components: {
    BlogItemList
  },
  data () {
    return {
      posts: []
    }
  },
  created () {
    DB.collection('posts').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = doc.data()
        data.id = doc.id
        this.posts.push(data)
      })
    })
  }
}
</script>

<style scoped>
.item-list-container {
  flex-direction: column;
  flex-wrap: wrap;
}
.content {
  margin: 1rem 0;
  padding: 0 1rem;
  flex-wrap: wrap;
}
</style>
