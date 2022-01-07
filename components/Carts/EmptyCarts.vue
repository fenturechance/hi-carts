<template>
  <div class="text-center">
    <img :src="imgEmptyCart" class="w-[400px] m-auto">
    <p class="text-gray-450 mb-4 mt-3 font-light">
      {{ $t('carts.theShoppingCartIsEmptyGoShoppingForYourFavoriteCourses') }}
    </p>
    <button class="bg-cyan-600 text-white py-2 hover:bg-cyan-500 min-w-[200px] rounded-md">
      {{ $t('carts.goToDiscoveryDirectory') }}
    </button>
  </div>
</template>

<script>
import imgEmptyCart from '~/assets/img/img-EmptyCart.png'
export default {
  data() {
    return {
      imgEmptyCart
    }
  }
}
</script>

<style>

</style>
