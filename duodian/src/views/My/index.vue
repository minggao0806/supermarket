<template>
  <div>
    <h1 class="name">{{name}}</h1>
    <h4>{{phone}}</h4>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      phone: ''
    }
  },
  mounted () {
    this.$api.user.info().then((data) => {
      this.name = data.name
      this.phone = data.phone
    })
  }
}
</script>

<style lang='scss' scoped>
  .name{
    font-size: 30px;
  }
</style>
