<template>
  <section class="item-list">
    <div v-if="posts.length > 0" v-for="item in posts" :key="item.id" class="item">
      <nuxt-link :to="`post/${item.id}`">
        <blog-item :title="item.title" :content="item.content" :date="item.date" :id="item.id" :draft="item.draft"></blog-item>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import BlogItem from '@/components/BlogItem'
export default {
  components: {
    BlogItem
  },
  props: {
    posts: {
      type: Array
    },
  },
  data() {
    return {
      data: []
    }
  }
}
</script>

<style scoped>
.item {
  margin-bottom: 16px;
}
.item-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
