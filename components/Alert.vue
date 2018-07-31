<template>
  <ul v-if="errors.length > 0" class="alert" :class="type">
    <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
  </ul>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array
    },
    type: {
      type: String
    }
  }
}
</script>

<style scoped>
.alert {
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid #0000;
  border-radius: 0.25rem;
}
.danger {
  background-color: #f2dede;
  border-color: #ebcccc;
  color: #a94442;
}
</style>
