<template>
  <div class="home">
    <header class="header">
      <svg-icon iconClass='location' size='lg'></svg-icon>
      <div class="ress">
        <span class='address' @click="chooseAdd">
          送至：{{address}}
        </span>
        <svg-icon iconClass='arrow'></svg-icon>
      </div>
      <svg-icon iconClass='search' size='lg'></svg-icon>
    </header>
    <nav class="nav">
      <TabBar :items='nav' @change="navChange" hasInk v-model="current"></TabBar>
    </nav>
    <div class="content">
      <div class="children-content">
        <swiper :option='swiperOption' ref="child" @someSwiperEvent='callback'>
          <swiper-slide>
            <ScrollView>
              <Page1 :swiperList='swiperList'/>
            </ScrollView>
          </swiper-slide>
          <swiper-slide>
            <ScrollView>
              <Page2/>
            </ScrollView>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import Page1 from '@/components/Children/page1'
import Page2 from '@/components/Children/page2'

export default {
  data () {
    return {
      address: window.localStorage.getItem('location'),
      current: 1,
      nav: [
        {
          name: 1,
          label: '多点超市'
        },
        {
          name: 2,
          label: '全球精选'
        }
      ],
      activeIndex: 0,
      swiperOption: {
        on: {
          slideChange: () => {
            console.log(this.swiper.activeIndex)
            this.activeIndex = this.swiper.activeIndex
          }
        }
      },
      swiperList: []
    }
  },
  components: {
    Page1,
    Page2
  },
  mounted () {
    console.log(this.current)
    this.getSwiper(2)
  },
  computed: {
    swiper () {
      return this.$refs.child.swiper
    }
  },
  methods: {
    chooseAdd () {
      this.$router.push('/handleAdd')
    },
    navChange (item, index, prevIndex) {
      // console.log(index)
      console.log(item)
      console.log(this.current)
      console.log(this.swiper)
      this.swiper.slideTo(index, 200, false)
      this.dataType = this.current === 1 ? 2 : 5
      this.getSwiper(this.dataType)
    },
    callback () {
      console.log('执行')
    },
    async getSwiper (type) {
      this.swiperList = await this.$api.user.getBanner({dataType: type})
      console.log(this.swiperList)
    }
  }
}
</script>

<style lang='scss' scoped>
  .home{
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .header{
      @include wh(90%, 100px);
      margin-left: 5%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .ress{
        display: flex;
        align-items: center;
        justify-content: center;
        .address{
          display: inline-block;
          width: 500px;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
    .nav{
      width: 100%;
    }
    .content{
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .children-content{
        flex: 1;
        margin-top: 10px;
        overflow: hidden;
        .swiper-container{
          width: 100%;
        }
      }
    }
  }
</style>
