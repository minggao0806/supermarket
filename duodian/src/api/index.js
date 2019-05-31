import { get, post } from '../utils/request'
import Vue from 'vue'

const api = {
  user: {
    msgCode: (data) => get('/user/getCode', data),
    login: (data) => post('/user/login', data),
    info: () => get('/user/info'),
    getFood: () => get('/product/food'),
    getBanner: (data) => get('/home/getBanner', data)
  },
  address: {
    add_address: (data) => post('/address/addAddress', data),
    view_address: () => get('/address/view'),
    change_address: (data) => post('/address/change', data)
  },
  classify: {
    get_list_food: (data) => get('/classify/list', data)
  },
  car: {
    get_carList: () => get('/car/getList'),
    add_food: (data) => post('/car/add', data),
    delete_food: (data) => get('/car/delete', data),
    get_price: () => get('/car/getPrice'),
    change_active: (data) => get('/car/changeActive', data)
  }
}
Vue.prototype.$api = api
export default api
