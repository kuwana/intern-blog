<template>
  <div class="box">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.box {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  border: 1px solid #ffffff;
}
</style>
