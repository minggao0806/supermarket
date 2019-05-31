<template>
  <div id="location">
    <div class="content">
      <div class="logo_img">
        <img src="https://static.dmall.com/kayak-project/address/dist/address/common/image/logo-slogan-new.png" alt="">
      </div>
      <div class="map_location">
        <div src="https://static.dmall.com/kayak-project/address/dist/address/common/image/map.png" alt="">
            <img src="https://static.dmall.com/kayak-project/address/dist/address/common/image/geo-tag-large.png" alt="">
        </div>
        <p>正在定位</p>
      </div>
      <div class="direction">
        <img src="https://static.dmall.com/kayak-project/address/dist/address/common/image/slogan.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import AMap from 'AMap'
import map from '@/utils/map'
export default {
  data () {
    return {
    }
  },
  mounted () {
    console.log(map.geolocation())
    // map.geolocation().then((data) => {
    //   console.log(data)
    // }).catch((error) => {
    //   console.log(error)
    // })
    AMap.plugin('AMap.Geolocation', () => {
      let geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,
        timeout: 10000
      })
      geolocation.getCurrentPosition()
      AMap.event.addListener(geolocation, 'complete', (data) => {
        console.log(data, 123131)
        console.log(this.$router)
        window.localStorage.setItem('location', data.addressComponent.street)
        this.$router.push(this.$route.query.callback)
      })
      AMap.event.addListener(geolocation, 'error', (error) => {
        console.log(error, 111)
        this.$notice({
          str: '定位失败，请手动选择',
          time: 3000
        })
        this.$router.push('/handleAdd')
      })
    })
  }
}
</script>
<style lang="scss" scoped>
  #location {
    padding: 200px;
    .content {
      @include wh(100%, 100%);
      // @include flex(column, center, center);
      .logo_img {
        @include wh(100%, 170px);
        img {
            @include wh(100%, 170px);
        }
      }
      .map_location {
        flex: 1;
        // @include flex(column, flex-start, center);
        div {
          position: relative;
          @include wh(300px, 300px);
          background-image: url('https://static.dmall.com/kayak-project/address/dist/address/common/image/map.png');
          background-position: 0 0;
          background-size: 100% 100%;
          border-radius: 50%;
          margin: 100px 0;
          animation: removeImg 3s linear infinite;
          @keyframes removeImg {
            0% {
                background-position: 0 0;
            }
            33% {
                background-position: 0 -50px;
            }
            66% {
                background-position: -50px 0;
            }
            100% {
                background-position: 0 0;
            }
          }
          img {
            position: absolute;
            @include wh(50px, 60px);
            left: 50%;
            top: 50%;
            margin-left: -25px;
            margin-top: -30px;
            animation: locations 1s linear infinite;
          }
          @keyframes locations{
            0% {
                transform: translate(0,0)
            }
            50% {
                transform: translate(0,-50px)
            }
            100% {
                transform: translate(0,0)
            }
          }
        }
        p {
          font-size: 34px;
          text-align: center;
          margin-bottom: 200px;
        }
      }
      .direction {
        @include wh(100%, 36px);
        img {
          @include wh(100%, 36px);
        }
      }
    }
  }
</style>
