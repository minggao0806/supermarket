<template>
  <div>
    <ul>
      <li v-for="(val,i) in address" :key='i' @click="select(val.name)" class="list">
        <h6>{{val.name}}</h6>
        <span>{{val.address}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchKey: '',
      addressArr: []
    }
  },
  props: {
    address: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    select (address) {
      console.log(address)
      this.$emit('select', address)
    }
  }
}
</script>

<style lang='scss' scoped>
  .list{
    @include wh(100%, 100px);
    border: 1px solid #eee;
    background: #fff;
    padding-left: 20px;
    padding-top: 5px;
    span{
      width: 100%;
      @include ellipsis()
    }
  }
</style>
