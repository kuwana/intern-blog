<template>
  <section class="container item-list-container">
    <div class="content">
      <blog-item-list></blog-item-list>
    </div>
  </section>
</template>

<script>
import BlogItemList from '@/components/BlogItemList'

export default {
  components: {
    BlogItemList
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
