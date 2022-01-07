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
            <ul class="flex border-b border-gray-400">
              <li v-for="(col, key) in cols" :key="key" :class="col.width" class="py-4 px-2 text-gray-450 font-light">
                {{ col.text }}
              </li>
            </ul>
          </header>
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
          <button class="w-full py-2" :class="{ disabled: !checkoutBtnBool }" :disabled="!checkoutBtnBool">
            {{ $t('carts.goToCheckout') }}
          </button>
          <p class="text-xs text-gray-400 mt-4 mb-5">
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
import RightArrow from '~/assets/svg/RightArrow.vue'
import CoursesOtherBought from '~/components/Carts/CoursesOtherBought.vue'
import EmptyCarts from '~/components/Carts/EmptyCarts.vue'
import { API, baseURL } from '~/api.js'
export default {
  components: {
    RightArrow,
    CoursesOtherBought,
    EmptyCarts
  },
  data() {
    return {
      amount: 0,
      totalAmount: 0,
      cartItems: []
    }
  },
  computed: {
    checkoutBtnBool() {
      return false
    },
    cols() {
      return {
        item: {
          text: this.$t('carts.item'),
          width: 'w-[60%]'
        },
        price: {
          text: this.$t('carts.price'),
          width: 'w-[10%]'
        },
        coupon: {
          text: '',
          width: 'w-[15%]'
        },
        totalPrice: {
          text: this.$t('carts.totalPrice'),
          width: 'w-[15%]'
        }
      }
    }
  },
  methods: {
    getCartsData(course) {
      this.$store.commit('setLoading', { loading: true })
      this.cartItems.push(course)
      return this.$axios({
        method: API.carts.create.method,
        url: API.carts.create.url,
        baseURL,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          items: this.cartItems.map(item => ({ id: item.id, coupon: '' })),
          coupons: []
        }
      }).then((response) => {
        this.$store.commit('setLoading', { loading: false })
        console.log(response)
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
