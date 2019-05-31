<template>
  <div class="box">
    <div class="head">
      <div class="title">
        <div class="back">
          <svg-icon iconClass='back' size='lg'></svg-icon>
        </div>
        <select>
          <option v-for="(val,i) in province" :key="i" :value="val.name">
            {{val.name}}
          </option>
        </select>
      </div>
      <div>
        <input type="text" placeholder="小区、街道、大厦" class="inp" v-model="address"/>
      </div>
    </div>
    <div class="location" @click="handleChoose">
      <svg-icon iconClass='search' size='lg'></svg-icon>
      <span class="gps">定位到当前地址</span>
    </div>
    <div class="select-address">
      <SearchAddress :address='choose' @select='getAddress' class="select"/>
    </div>
    <div class="address-list">
      <CellItem v-for="(val, i) in addressList" :key='i' :title="val.name" :brief='val.location' @click="edit(val.id, val)"></CellItem>
    </div>
    <div class="add-address" @click="add">+新增地址</div>
    <Loading v-if="loadingShow"></Loading>
  </div>
</template>

<script>
import map from '@/utils/map'
import SearchAddress from '@/components/SearchAddress'
import Loading from '@/components/Loading'
export default {
  data () {
    return {
      province: [],
      address: '',
      choose: [],
      loadingShow: false,
      addressList: []
    }
  },
  components: {
    SearchAddress,
    Loading
  },
  mounted () {
    map.getPro().then((data) => {
      console.log(data)
      this.province = data.districtList[0].districtList
    })
    if (document.cookie.indexOf('token') !== -1) {
      this.$api.address.view_address({id: 3}).then((res) => {
        this.addressList = res
        console.log(res)
      })
    }
  },
  watch: {
    address (val) {
      this.search(val)
    }
  },
  methods: {
    search (val) {
      if (val !== '') {
        map.search(val).then((data) => {
          console.log(data)
          this.choose = data.poiList ? data.poiList.pois : []
        })
      } else {
        this.choose = []
      }
    },
    handleChoose () {
      this.loadingShow = true
      map.geolocation().then((res) => {
        console.log(res)
        this.loadingShow = false
        if (res.pois.length) {
          this.choose = res.pois
        } else {
          this.$notice({
            str: '定位失败',
            time: 3000
          })
        }
      }).catch((error) => {
        console.log(error)
        this.$notice({
          str: '定位失败',
          time: 3000
        })
      })
    },
    add () {
      this.$router.push('/addAddress')
    },
    getAddress (addressName) {
      console.log(addressName)
      window.localStorage.setItem('location', addressName)
      this.$router.replace('/home')
    },
    edit (id, val) {
      console.log(id)
      this.$store.dispatch('edit', val)
      this.$router.push({
        path: '/addAddress',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.box{
  @include wh(100%, 100%);
  .head{
    background: #fff;
    .title{
      @include wh(100%, 90px);
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      .back{
        @include wh(70px, 70px);
        background: #000;
        border-radius: 50%;
        @include flex(row);
        position: fixed;
        left: 10px;
        top: 10px;
      }
      select{
        width: 350px;
        height: 80px;
        border: none;
      }
    }
  }
  .inp{
    @include wh(90%, 70px);
    margin-left: 5%;
    border: none;
    border: 1px solid #ccc;
  }
  .location{
    @include wh(100%, 90px);
    padding-left: 20px;
    background: #fff;
    display: flex;
    align-items: center;
    .gps{
      margin-left: 30px;
    }
  }
  .select-address{
    position: relative;
    .select{
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10
    }
  }
  .add-address{
    position: fixed;
    left: 0;
    bottom: 0;
    @include wh(100%, 90px);
    @include flex(row);
    background: #fff;
    color: $color-main
  }
  .address-list{
    @include wh(100%, 400px);
    overflow: scroll-y;
  }
}
</style>
