<template>
  <span>
    <template v-if="type === 'submit'">
      <button v-if="!loading && type === 'submit'" class="button" @click="onSubmit">
        <slot></slot>
      </button>
      <button v-else-if="type === 'submit'" class="button bg-grey" disabled>
        {{ loadingText }}
      </button>
    </template>
    <template v-if="type === 'delete'">
        <button class="button button-danger" @click="onDelete">削除</button>
    </template>
  </span>
</template>

<script>
export default {
  props: {
    type: {
      validator: value => {
        return ['submit', 'delete', 'normal'].indexOf(value) !== -1
      },
      requrie: true
    },
    loading: {
      type: Boolean,
      requrie: true
    },
    loadingText: {
      type: String,
      default: '送信中'
    },
    onSubmit: {
      type: Function
    },
    onDelete: {
      type: Function
    }
  }
}
</script>

<style scoped>
.button {
  cursor: pointer;
  background: #14abce;
  color: #fff;
  border: none;
  border-radius: 3px;
  font-size: 1rem;
  padding: 0.6rem 1rem;
}
.button-danger {
  background: #a94442 !important;
}
.bg-grey {
  background: #ccc;
}
</style>
