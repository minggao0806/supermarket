<template>
  <div class="loginbox">
    <div class="title">验证手机</div>
    <div class="pic">
      <img src="https://img.dmallcdn.com/common/1b1dac60-5a99-450c-b18c-c5f576fedcb9_750H"/>
    </div>
    <div class="login">
      <div class="phones">
          <input type="text" placeholder=" 请输入手机号" v-model="phone" class="phone">
          <button @click="getCode" :disabled='disable'>
            {{count}}
          </button>
      </div>
      <div class="msgCodes">
          <input type="text" placeholder=" 请输入验证码" v-model="msgCode" class="msgCode">
      </div>
    </div>
    <div class="agree">
      <p>验证手机视为已阅读并同意<a href="javascript:;">用户协议</a></p>
    </div>
    <button class="btn" @click="login">确定</button>
  </div>
</template>

<script>
import { setInterval, clearTimeout } from 'timers'
export default {
  data () {
    return {
      count: '获取验证码',
      phone: '',
      disable: false,
      msgCode: ''
    }
  },
  methods: {
    getCode () {
      this.disable = true
      if (this.phone === '') {
        this.$notice({
          str: '请输入手机号~',
          time: 3000
        })
        return
      } else if (!(/^1[34578]\d{9}$/.test(this.phone))) {
        this.$notice({
          str: '手机号码输入有误',
          time: 3000
        })
        return
      }
      if (this.disable) {
        this.count = 10
        let timer = setInterval(() => {
          if (this.count < 1) {
            clearTimeout(timer)
            this.count = '重新获取'
            this.disable = false
          } else {
            this.count -= 1
          }
        }, 1000)
      }
      console.log(this.phone)
      this.$api.user.msgCode({phone: this.phone}).then((data) => {
        console.log(data)
      })
    },
    login () {
      const data = {
        phone: this.phone,
        code: this.msgCode
      }
      this.$api.user.login(data).then((data) => {
        console.log(data)
        if (data.msg === '登陆成功') {
          this.$router.replace(this.$route.query.callback)
        } else {
          this.$notice({
            str: data.msg,
            time: 3000
          })
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  .loginbox{
    overflow: hidden;
    .title{
      @include wh(100%, 90px);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .pic{
      @include wh(100%, auto);
      img{
        width: 100%;
      }
    }
    .login{
      margin-top: 20px;
      @include wh(100%,120px);
      div{
        @include wh(100%,120px);
        margin-top: 4px;
        background: #fff;

        .phone{
          @include wh(67%,120px);
        }
        button{
          border: 2px solid $color-main;
          @include wh(188px,68px);
          background: #fff;
          border-radius: 10px;
          font-size: 26px;
          color: $color-main;
        }
      }
      input{
        @include wh(100%,120px);
        display: inline-block;
        border: none;
        margin-left: 30px;
        outline: none;
      }
    }
    .agree{
      margin-top: 170px;
      text-align: right;
      p{
        color: #8A8A8A;
        font-size: 26px;
        a{
          text-decoration: underline;
          color: $color-main;
        }
      }
    }
    .btn{
      margin-top: 50px;
      @include wh(90%, 80px);
      margin-left: 5%;
      border-radius: 10px;
      font-size: 24px;
      background: $color-main;
      color: #fff;
      border: none;
    }
  }
</style>
