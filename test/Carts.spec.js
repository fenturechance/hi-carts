import { mount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import carts from '@/pages/carts.vue'
import CoursesOtherBought from '@/components/Carts/CoursesOtherBought.vue'
import CartSvgCom from '@/assets/svg/CartSvg.vue'
const localVue = createLocalVue()
localVue.use(Vuex)

describe('cart', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      mutations: {
        setLoading: () => {}
      }
    })
  })

  test('click course and add to cart', async() => {
    const obj = {
      image: 'https://via.placeholder.com/150',
      feedback_score: 0,
      students: 1,
      title: '測試課程',
      lecturers: [
        {
          avatar: 'https://via.placeholder.com/150',
          username: '測試講師'
        }
      ],
      price: 200
    }
    const wrapper = mount(carts, {
      mocks: {
        $t: () => {},
        $axios: axios
      },
      store,
      localVue
    })
    wrapper.getComponent(CoursesOtherBought).setData({
      courseArr: [obj]
    })
    await Vue.nextTick()
    const CartSvg = wrapper.getComponent(CoursesOtherBought).getComponent(CartSvgCom)
    CartSvg.trigger('click')
    expect(JSON.stringify(wrapper.vm.selectCartItems)).toBe(JSON.stringify([obj]))
  })
})
