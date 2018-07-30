<template>
  <app-box class="blog-item">
    <p class="date"> {{ formatDate }} </p>
    <p class="title overflow ellipsis">{{ title }}</p>
    <p class="content overflow">{{ content }} </p>
  </app-box>
</template>

<script>
import AppBox from '@/components/AppBox'
import moment from 'moment'

export default {
  components: {
    AppBox
  },
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    date: {
      type: Number,
      // required: true
    },
    draft: {
      type: Boolean,
      // required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    formatDate () {
      return moment(this.date*1000).format('YYYY-MM-DD HH:mm')
    }
  }
}
</script>

<style scoped>
.blog-item {
  padding: 1rem;
  max-width: 320px;
}
.title {
  font-size: 1.1rem;
  color: #607d8b;
  font-weight: 700;
}
.date {
  font-size: 0.85rem;
  color: #9e9e9e;
  text-align: right;
}
.content {
  color: #9e9e9e;
  text-align: justify;
  max-height: 150px;
}

.overflow {
  overflow: hidden;
}

.ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
