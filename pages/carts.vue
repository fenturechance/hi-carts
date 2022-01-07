<template>
  <div>
    <div class="pt-[80px] flex mt-[54px] maxWidth pb-16">
      <div class="flex-grow mr-3">
        <h2 class="titleStyle mb-4">
          {{ $t('carts.carts') }}
        </h2>
        <EmptyCarts v-if="cartItems.length === 0" />
        <div v-else class="bg-white rounded-lg shadow-xl">
          <header>
            <ul class="flex border-b border-gray-300">
              <li v-for="(col, key) in cols" :key="key" :class="col.width" class="py-4 px-2 text-gray-450 font-light">
                {{ col.text }}
              </li>
            </ul>
          </header>
          <ul>
            <li v-for="item in cartItems" :key="item.id">
              <ul class="flex items-center border-b border-gray-300">
                <li v-for="(col, key) in cols" :key="key" :class="col.width" class="py-4 px-2">
                  <div class="flex items-center">
                    <template v-if="key === 'name'">
                      <div class="w-[120px] h-[68px] rounded-md bg-cover bg-center mr-2" :style="{ backgroundImage: `url('${item.image}')` }" />
                      <p style="width: calc(100% - 120px)">
                        {{ item[key] }}
                      </p>
                    </template>
                    <div v-else-if="key === 'config'" class="flex justify-center">
                      <TrashSvg class="w-[15px] h-[18px] text-gray-400 cursor-pointer" @click="deleteCartItem(item)" />
                    </div>
                    <template v-else>
                      <p :class="col.style">
                        {{ item[key] }}
                      </p>
                    </template>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="w-[33%]">
        <h2 class="titleStyle mb-3">
          {{ $t('carts.summary') }}
        </h2>
        <div class="bg-white shadow-xl px-4 py-3 rounded-md">
          <p class="text-gray-450 mb-1">
            {{ $t('carts.enterDiscountCode') }}
          </p>
          <div class="flex">
            <input type="text" class="border border-gray-400 py-1 px-2 flex-grow rounded-md">
            <button class="py-2 px-5 rounded-md bg-red-50 text-red-500 ml-2">
              {{ $t('carts.confirm') }}
            </button>
          </div>
          <div class="flex items-center mt-4">
            <p class="text-lg underline text-gray-500 mr-1">
              {{ $t('carts.chooseVouchers') }}
            </p>
            <RightArrow class="w-[15px] h-[18px] text-gray-500" />
          </div>
          <div class="mt-5 border-t border-gray-300 pt-5 flex justify-between">
            <p class="text-gray-450">
              {{ $t('carts.amount') }}
            </p>
            <p class="text-gray-500">
              {{ `$${amount}` }}
            </p>
          </div>
          <p class="mt-3 text-right text-3xl mb-3">
            {{ `$${totalAmount}` }}
          </p>
          <button class="w-full py-2 bg-red-600 text-white rounded-md" :class="{ disabled: !checkoutBtnBool }" :disabled="!checkoutBtnBool">
            {{ $t('carts.goToCheckout') }}
          </button>
          <p class="text-[0.5rem] text-gray-400 mt-4 mb-5">
            <span>{{ $t('carts.clickTheButtonAboveToIndicateThatYouHaveReadAndAgreedTo') }}</span>
            <span class="underline">{{ $t('carts.hiSkioPurchaseAndRefundPolicy') }}</span>
          </p>
        </div>
      </div>
    </div>
    <CoursesOtherBought @getCartsData="getCartsData" />
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import RightArrow from '~/assets/svg/RightArrow.vue'
import TrashSvg from '~/assets/svg/TrashSvg.vue'
import CoursesOtherBought from '~/components/Carts/CoursesOtherBought.vue'
import EmptyCarts from '~/components/Carts/EmptyCarts.vue'
import { API, baseURL } from '~/api.js'
import { setPrice } from '~/assets/js/utils.js'
export default {
  components: {
    RightArrow,
    CoursesOtherBought,
    EmptyCarts,
    TrashSvg
  },
  data() {
    return {
      amount: 0,
      totalAmount: 0,
      selectCartItems: [],
      cartItems: []
    }
  },
  computed: {
    checkoutBtnBool() {
      return this.cartItems.length > 0
    },
    cols() {
      return {
        name: {
          text: this.$t('carts.item'),
          width: 'w-[50%]',
          style: 'text-gray-500'
        },
        subtotal: {
          text: this.$t('carts.price'),
          width: 'w-[15%]',
          style: 'text-gray-450 text-xl font-light'
        },
        coupon: {
          text: '',
          width: 'w-[15%]',
          style: 'text-gray-80 text-sm whitespace-nowrap'
        },
        total: {
          text: this.$t('carts.totalPrice'),
          width: 'w-[13%]',
          style: 'text-gray-500 text-2xl'
        },
        config: {
          text: '',
          width: 'w-[7%]',
          style: ''
        }
      }
    }
  },
  watch: {
    cartItems() {
      const string = this.cartItems.map(item => item.id).join(',')
      Cookie.set('cartItems', string)
    }
  },
  created() {
    const cartItems = Cookie.get('cartItems')
    if (cartItems) {
      this.selectCartItems = cartItems.split(',').map(string => ({
        id: parseInt(string)
      }))
      this.fetchCartsData()
    }
  },
  methods: {
    getCartsData(course) {
      this.selectCartItems.push(course)
      this.fetchCartsData()
    },
    fetchCartsData() {
      this.$store.commit('setLoading', { loading: true })
      return this.$axios({
        method: API.carts.create.method,
        url: API.carts.create.url,
        baseURL,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          items: this.selectCartItems.map(item => ({ id: item.id, coupon: '' })),
          coupons: []
        }
      }).then((response) => {
        this.$store.commit('setLoading', { loading: false })
        this.cartItems = response.data.data.map(item => ({
          ...item,
          originTotal: item.total,
          subtotal: setPrice(item.subtotal),
          total: setPrice(item.total),
          coupon: this.$t('carts.applicableVouchers')
        }))
        this.amount = setPrice(response.data.subtotal)
        this.totalAmount = setPrice(response.data.total)
      }).catch(() => {
        // if (!error.response) { return }
        // if (!error.response.data) { }
      })
    },
    deleteCartItem(course) {
      this.selectCartItems = this.selectCartItems.filter(item => parseInt(item.id) !== parseInt(course.id))
      this.cartItems = this.cartItems.filter(item => parseInt(item.id) !== parseInt(course.id))
      this.amount = this.cartItems.reduce((pre, now) => pre + now.originTotal, 0)
      this.totalAmount = this.amount
      // this.$store.commit('setLoading', { loading: true })
      return this.$axios({
        method: API.carts.delete.method,
        url: API.carts.delete.url,
        baseURL,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          items: [{ id: parseInt(course.id), coupon: '' }],
          coupons: []
        }
      }).then((response) => {
        // this.$store.commit('setLoading', { loading: false })
      }).catch(() => {
        // if (!error.response) { return }
        // if (!error.response.data) { }
      })
    }
  }
}
</script>

<style scoped>
@import '~/assets/css/carts.css';
.disabled {
  @apply bg-gray-50 text-gray-400
}
</style>
