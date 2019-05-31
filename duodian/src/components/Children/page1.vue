<template>
  <div>
    <swiper :option='swiperOption1' ref="chi" @someSwiperEvent='callback'>
      <swiper-slide v-for="(val,k) in swiperList" :key="k" class="slide">
        <img :src="val.imageUrl"/>
      </swiper-slide>
    </swiper>
    qpqppqpqpqp
  </div>
</template>

<script>
export default {
  data () {
    return {
      swiperOption1: {
        on: {
          slideChange: () => {
            // console.log(this.swiper.activeIndex)
            // this.activeIndex = this.swiper.activeIndex
          },
          autoplay: {
            delay: 3000,
            loop: true
          }
        }
      }
    }
  },
  props: {
    swiperList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    callback () {
      console.log('zh')
    }
  }
}
</script>

<style lang='scss' scoped>
  .slide{
    img{
      width: 100%;
    }
  }
</style>
