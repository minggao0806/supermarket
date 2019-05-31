<template>
  <div class="car">
    <div class="address" @click="turn">
      <div>
        <span>{{address.name}}</span>
        <span>{{address.phone}}</span>
      </div>
      <div>
        <span>送至：</span>
        <span>{{address.location}} {{address.address}}</span>
      </div>
    </div>
    <div class="list">
      <List v-for="(val, i) in foodList" :key="i" :title="val.name" :brief='val.price.toString()' class="my-list">
        <div slot="left" class="choose-left">
          <input type="checkbox" class="chechbox" :checked="val.active === '1' ? 'checked' : '' " @click="choose(val)">
          <img :src="val.img" class="imgFood"/>
        </div>
        <Add :obj='val' @getPri='getPri'/>
      </List>
    </div>
    <div class="will-pay">
      <div class="left">
        <div class="top">
          合计：<span class="money">{{totalPrice}}</span>(不含运费)
        </div>
        <p>促销已抵扣金额：￥0.00</p>
      </div>
      <button @click="done" class="done-btn">选好了</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      address: {},
      foodList: [],
      totalPrice: 0
    }
  },
  mounted () {
    this.$api.address.view_address().then((res) => {
      console.log(res[0])
      this.address = res[0]
    })
    this.$api.car.get_carList().then((res) => {
      this.foodList = res
      console.log(res)
    })
    this.$api.car.get_price().then((res) => {
      console.log(res)
      this.totalPrice = res.totalPrice
    })
  },
  methods: {
    turn () {
      this.$router.push('/handleAdd')
    },
    done () {
      this.$router.push('/order')
    },
    choose (val) {
      this.$api.car.change_active({id: val.product_id, act: val.active}).then((res) => {
        console.log(res)
        this.$api.car.get_price().then((res) => {
          console.log(res)
          this.totalPrice = res.totalPrice
        })
      })
    },
    getPri () {
      this.$api.car.get_price().then((res) => {
        console.log(res)
        this.totalPrice = res.totalPrice
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  .car{
    @include wh(100%, 100%);
    // display: flex;
    // flex-direction: column;
    background: #F6F6F6;
    .address{
      @include wh(100%, 100px);
      padding: 20px;
      background: #fff;
    }
    .list{
      // flex: 1;
      overflow-y: auto;
      .my-list{
        position: relative;
      }
      .list-body{
        .list-item-left{
          .choose-left{
            display: flex;
            justify-content: center;
            align-items: center;
            .chechbox{
              margin: 0 20px;
            }
          }
          width: 30%;
          .imgFood{
            width: 200px;
            margin-right: 20px;
          }
        }
      }
    }
    .will-pay{
      @include wh(100%, 100px);
      background: #fff;
      position: fixed;
      left: 0;
      bottom: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      .left{
        width: 500px;
        .top{
          color: $color-main;
          .money{
            font-size: 50px;
            font-weight: bold;
          }
        }
      }
      .done-btn{
        width: 170px;
        height: 80px;
        color: #fff;
        border: none;
        background: $color-main;
        border-radius: 10px;
      }
    }
  }
</style>
