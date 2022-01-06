<template>
  <div class="pt-[80px] flex">
    <div class="flex-grow">
      <h2 class="titleStyle">
        {{ $t('carts.carts') }}
      </h2>
      <div class="text-center mt-4">
        <img :src="imgEmptyCart" class="w-[400px] m-auto">
        <p class="text-gray-450 mb-4 mt-3 font-light">
          {{ $t('carts.theShoppingCartIsEmptyGoShoppingForYourFavoriteCourses') }}
        </p>
        <button class="bg-cyan-600 text-white py-2 hover:bg-cyan-500 min-w-[200px] rounded-md">
          {{ $t('carts.goToDiscoveryDirectory') }}
        </button>
      </div>
    </div>
    <div class="w-[33%]">
      <h2 class="titleStyle mb-3">
        {{ $t('carts.summary') }}
      </h2>
      <div class="bg-white shadow px-4 py-3 rounded-md">
        <p class="text-gray-450 mb-1">
          {{ $t('carts.enterDiscountCode') }}
        </p>
        <div class="flex">
          <input type="text" class="border border-gray-400 py-1 px-2 flex-grow rounded-sm">
          <button class="py-2 px-5 rounded-sm bg-red-50 text-red-500 ml-2">
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
</template>

<script>
import imgEmptyCart from '~/assets/img/img-EmptyCart.png'
import RightArrow from '~/assets/svg/RightArrow.vue'
export default {
  components: {
    RightArrow
  },
  data() {
    return {
      imgEmptyCart,
      amount: 0,
      totalAmount: 0
    }
  },
  computed: {
    checkoutBtnBool() {
      return false
    }
  }
}
</script>

<style scoped>
.titleStyle {
  @apply text-2xl font-medium text-stone-800;
}
.disabled {
  @apply bg-gray-50 text-gray-400
}
</style>
