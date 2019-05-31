<template>
  <div class="edit">
    <span class="reduce btn" v-show="flag" @click="reduce">-</span>
    <span v-show="flag">{{count}}</span>
    <span class="add btn" @click="add">+</span>
  </div>
</template>

<script>
import { Dialog } from 'mand-mobile'
export default {
  data () {
    return {
      count: 0,
      flag: false
    }
  },
  props: {
    obj: {
      type: Object,
      default: () => {}
    }
  },
  mounted () {
    if (this.obj.num) {
      this.count = this.obj.num
    } else {
      this.$api.car.get_carList().then((res) => {
        res.forEach((el) => {
          if (el.product_id === this.obj.id) {
            this.count = el.num
          }
        })
      })
    }
  },
  watch: {
    count (val) {
      if (val < 1) {
        this.flag = false
      } else {
        this.flag = true
      }
    }
  },
  methods: {
    add () {
      this.obj.volume = this.count + 1
      this.count += 1
      this.$api.car.add_food(this.obj).then((res) => {
        console.log(res)
        this.$emit('getPri')
      })
    },
    reduce () {
      this.obj.volume = this.count - 1
      this.count -= 1
      this.$api.car.add_food(this.obj).then((res) => {
        console.log(res)
        this.$emit('getPri')
      })
      if (this.count < 1) {
        this.$api.car.delete_food({id: this.obj.id}).then((res) => {
          console.log(res)
        })
      }
      if (this.obj.num) {
        if (this.count < 1) {
          Dialog.confirm({
            title: '是否删除该商品',
            confirmText: '确定',
            onConfirm: () => console.log('[Dialog.confirm] confirm clicked')
          })
        }
        console.log('gouwuche')
      } else {
        console.log('fenlei')
      }
    }
  }
}
</script>

<style lang='scss'>
  .edit{
    position: absolute;
    top: 100px;
    right: 35px;
    .btn{
      display: inline-block;
      @include wh(50px, 40px);
      background: $color-main;
      color: #fff;
      text-align: center;
    }
  }
</style>
