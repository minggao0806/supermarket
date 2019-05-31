<template>
  <div class="page">
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="footer-tab">
      <router-link v-for='(val,i) in tab' :key='i' :to='val.link' active-class="active">
          <svg-icon size='lg' :iconClass="$route.path === val.link?val.icon+'_active':val.icon"></svg-icon>
          <span class="tit">{{val.tit}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tab: [
        {
          link: '/home',
          tit: '配送到家',
          icon: 'home'
        },
        {
          link: '/classify',
          tit: '分类',
          icon: 'classify'
        },
        {
          link: '/vip',
          tit: '会员',
          icon: 'vip'
        },
        {
          link: '/car',
          tit: '购物车',
          icon: 'car'
        },
        {
          link: '/my',
          tit: '我的',
          icon: 'mine'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .page{
    @include wh(100%,100%);
    display: flex;
    flex-direction: column;
    .main{
      @include wh(100%,100%);
    }
    .footer-tab{
      @include wh(100%,100px);
      // line-height: 50px;
      position: fixed;
      bottom: 0;
      left: 0;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      a{
        text-decoration: none;
        color: black;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        box-sizing: border-box;
        height: $tab-height;
        text-align: center;
        .tit{
          display: block;
          font-size: 26px;
        }
      }
      .active{
          color: $color-main;
          font-weight: bold;
      }
    }
  }
</style>
