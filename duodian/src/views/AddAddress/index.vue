<template>
    <div class='wrap'>
        <Header :title="title" class="header" />
        <div class="forms">
            <div>
                <span>联系人</span>
                <input type="text" v-model="address.name">
            </div>
            <div>
                <span>手机号</span>
                <input type="text" v-model="address.phone">
            </div>
            <div>
                <span>地址</span>
                <input type="text" v-model="address.location">
            </div>
            <div>
                <span>详细信息</span>
                <input type="text" v-model="address.address">
            </div>
        </div>
        <div class="btn">
            <button plain type="default" class="but" @click="del(address.id)">删除</button>
            <button plain type="danger" class="but" @click="over">完成</button>
        </div>
        <Loading v-show="active" />
        </div>
</template>

<script>
import Header from '@/components/Header'
import Loading from '@/components/Loading'
// import storage  from '@/utils/localstorge'
export default {
  name: 'AddressAmend',
  data () {
    return {
      address: {},
      active: false,
      timer: null,
      title: '添加地址'
    }
  },
  components: {
    Header,
    Loading
  },
  mounted () {
    if (this.$route.query.id) {
      this.address = this.$store.state.location
    }
  },
  methods: {
    over () {
      if (!this.$route.query.id) {
        console.log(1231)
        console.log(this.address)
        this.$api.address.add_address(this.address).then(res => {
          console.log(res)
          this.$notice({
            str: res.msg,
            time: 3000
          })
          setTimeout(() => {
            this.$router.replace('/handleAdd')
          }, 3000)
        })
      } else {
        console.log(this.address)
        this.address.id = this.$route.query.id
        this.$api.address.change_address(this.address).then(res => {
          console.log(res)
        })
        this.$router.replace('/handleAdd')
      }
    },
    del (id) {
      this.$api.address.del_address({id: id}).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.wrap{
  @include wh(100%,100%);
  background:#f9faf7;
  .header{
    background: #fff;
    box-shadow: 0 0 20px rgba(0,0,0,.2);
  }
  .forms{
    margin-top: 40px;
    div{
      @include wh(100%,80px);
      display: flex;
      background: #fff;
      border-bottom: 1px solid #ccc;
      span{
        display: inline-block;
        @include wh(20%,100%);
        @include flex(row);
        font-size: 30px;
        color: #ccc;
      }
      input{
        border: none;
        margin-left: 30px;
        height: 70px;
      }
    }
  }
  .btn{
    @include wh(100%,80px);
    @include flex(row);
    margin-top: 40px;
    .but{
      @include wh(50%,100%);
      font-size:30px;
      border: 1px solid #eee;
      background: #fff;
      color: $color-main
    }
  }
}
</style>
