import AMap from 'AMap'
console.log(AMap)
class Map {
  constructor () {
    this.AMap = {}
    this.placeSearch = ''
    AMap.plugin('AMap.PlaceSearch', () => {
      this.placeSearch = new AMap.PlaceSearch({
        city: '010'
      })
    })
  }
  geolocation () {
    return new Promise((resolve, reject) => {
      AMap.plugin('AMap.Geolocation', () => {
        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 10000,
          entensions: 'all'
        })
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', (data) => {
          resolve(data)
        })
        AMap.event.addListener(geolocation, 'error', (error) => {
          reject(error)
        })
      })
    })
  }
  search (val) {
    return new Promise((resolve) => {
      this.placeSearch.search(val, function (status, result) {
        resolve(result)
      })
    })
  }
  getPro () {
    return new Promise((resolve, reject) => {
      AMap.plugin('AMap.DistrictSearch', () => {
        var districtSearch = new AMap.DistrictSearch({
          // 关键字对应的行政区级别，country表示国家
          level: 'country',
          //  显示下级行政区级数，1表示返回下一级行政区
          subdistrict: 1
        })
        // 搜索所有省/直辖市信息
        districtSearch.search('中国', (status, result) => {
          // 查询成功时，result即为对应的行政区信息
          resolve(result)
        })
      })
    })
  }
}
export default new Map()
