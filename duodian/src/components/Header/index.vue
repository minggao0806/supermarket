<template>
  <div class="header">
    {{title}}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang='scss' scoped>
  .header{
    @include wh(100%, 100px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
