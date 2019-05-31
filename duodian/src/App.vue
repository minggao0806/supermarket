<template>
  <div id="app">
    <keep-alive include="['AddAddress', 'Classify']">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import '@/assets/css/reset.css'
export default {
  name: 'App',
  mounted () {
    // var map = new AMap.Map('container', {
    //   zoom: 11, // 级别
    //   center: [116.397428, 39.90923], // 中心点坐标
    //   viewMode: '3D' // 使用3D视图
    // })
    // AMap.plugin('AMap.Geolocation', function () {
    //   var geolocation = new AMap.Geolocation({
    //     // 是否使用高精度定位，默认：true
    //     enableHighAccuracy: true,
    //     // 设置定位超时时间，默认：无穷大
    //     timeout: 10000,
    //     // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
    //     buttonOffset: new AMap.Pixel(10, 20),
    //     //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    //     zoomToAccuracy: true,
    //     //  定位按钮的排放位置,  RB表示右下
    //     buttonPosition: 'RB'
    //   })

    //   geolocation.getCurrentPosition()
    //   AMap.event.addListener(geolocation, 'complete', onComplete)
    //   AMap.event.addListener(geolocation, 'error', onError)

    //   function onComplete (data) {
    //     // data是具体的定位信息
    //     console.log(data)
    //   }

    //   function onError (data) {
    //     // 定位出错
    //   }
    // })
  }
}
</script>

<style lang='scss'>
#app {
  @include wh(100%,100%);
  background: #F6F6F6;
  #container {
    width:100%;
    height: 100%;
  }
  .md-notice-bar{
    position: fixed;
    left: 0;
    top: 90px;
    background: $color-main;
    @include wh(100%, 90px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
}

</style>
