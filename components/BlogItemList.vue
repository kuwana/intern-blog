<template>
  <section class="item-list">
    <div v-for="item in data" :key="item.id" class="item">
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
  data() {
    return {
      data: []
    }
  },
  created() {
    const content = 'あのハートイヴォの透き通ったあのハートイヴォの透き通ったあのハートイヴォの透き通ったあのハートイヴォの透き通ったあのハートイヴォの透き通ったあのハートイヴォの透き通ったあのハートイヴォの透き通った'

    for (let i =0; i <=5; i++) {
      this.data.push({
        id: `${i}`,
        date: '2018/05/21 12:00',
        draft: false,
        title: `ブログ${i}`,
        content: content
      })
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
