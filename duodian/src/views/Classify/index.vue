<template>
  <div class="tab">
    <div class="top">
      <TabBar :items='topList' :maxLength='5' v-model="current" immediate @change="tabChange"/>
    </div>
    <div class="content">
      <ul class="left">
        <li class='li' v-for="(val, i) in middleList" :key='i' @click="list(val)">{{val.categoryName}}</li>
      </ul>
      <div class="right">
        <ol class="right-top">
          <li>全部</li>
          <li class='li' v-for="(val, i) in thrList" :key='i' @click="thirdList(val)">{{val.categoryName}}</li>
        </ol>
        <div class="food-list">
          <List v-for="(val, i) in foodList" :key='i' :title="val.name" :brief='val.price.toString()' class="my-lisy">
            <img :src="val.img" class='imgFood' slot="left"/>
            <Add :obj='val' @add='addCount' @reduce='reduce'/>
          </List>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Add from '@/components/Add'
export default {
  data () {
    return {
      topList: [],
      middleList: [],
      activeIndex: 0,
      arrList: [],
      current: 0,
      thrList: [],
      foodList: []
    }
  },
  components: {
    Add
  },
  watch: {
    activeIndex (val) {
      console.log(val)
    }
  },
  mounted () {
    this.$api.user.getFood().then((res) => {
      console.log(res)
      this.arrList = res
      this.middleList = this.arrList[0].children
      this.thrList = this.middleList[0].children
      console.log(this.thrList)
      res.forEach((item, i) => {
        this.topList.push({
          name: i,
          label: item.categoryName
        })
      })
      this.getFood(16)
      console.log(this.foodList)
    })
  },
  methods: {
    select (val) {
      this.middleList = this.arrList.length ? this.arrList[val].children : []
      this.thrList = this.middleList.length ? this.middleList[0].children : []
      if (this.thrList.length) {
        this.getFood(this.thrList[0].categoryId)
      }
    },
    tabSwitch (index, event) {
      console.log(index)
    },
    tabChange (item, index, pre) {
      this.select(index)
    },
    list (val) {
      console.log(val.children)
      this.thrList = val.children
      this.getFood(this.thrList[0].categoryId)
    },
    thirdList (val) {
      console.log(val)
      this.getFood(val.categoryId)
    },
    getFood (id) {
      this.$api.classify.get_list_food({
        page: 1,
        pageSize: 10,
        categoryId: id
      }).then((res) => {
        this.foodList = res.data
        console.log(this.foodList)
      })
    },
    addCount () {
      console.log('fenk')
    },
    reduce () {
      console.log(1231)
    }
  }
}
</script>

<style lang='scss' scoped>
  .tab{
    @include wh(100%, 100%);
    display: flex;
    flex-direction: column;
    .top{
      @include wh(100%, 100px);
    }
    .content{
      flex: 1;
      display: flex;
      .left{
        width: 25%;
        .li{
          text-align: center;
          line-height: 100px;
        }
      }
      .right{
        width: 75%;
        overflow-y: auto;
        .right-top{
          display: flex;
          width: 100%;
          overflow-x: auto;
          li{
            flex-shrink: 0;
            @include wh(200px, 100px);
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .food-list{
          .my-lisy{
            position: relative;
          }
          .list-item-left{
            width: 30%;
            .imgFood{
              width: 200px;
            }
          }
        }
      }
    }
  }
</style>
