<template>
  <article>
    <my-header
      :user="user"
      @onLogin="onLogin"
      @onLogout="onLogout"
      @onCreateAccount="onCreateAccount"
    />

    <div>
      <div class="pt-[80px] lg:flex mt-[54px] maxWidth pb-16">
        <div class="flex-grow lg:mr-3">
          <h2 class="titleStyle mb-4">
            購物車
          </h2>
          <div class="text-center">
            <img :src="imgEmptyCart" class="w-[400px] m-auto">
            <p class="text-gray-450 mb-4 mt-3 font-light">
              購物車裡是空的，去逛逛喜歡的課程吧！
            </p>
            <button class="bg-cyan-600 text-white py-2 hover:bg-cyan-500 min-w-[200px] rounded-md">
              前往探索目錄
            </button>
          </div>
        </div>
        <div class="lg:w-[33%] pt-6 lg:pt-0">
          <h2 class="titleStyle mb-3">
            小計
          </h2>
          <div class="bg-white shadow-xl px-4 py-3 rounded-md">
            <p class="text-gray-450 mb-1">
              輸入折扣代碼
            </p>
            <div class="flex">
              <input type="text" class="border border-gray-400 py-1 px-2 flex-grow rounded-md" style="width: calc(100% - 72px)">
              <button class="py-2 px-5 rounded-md bg-red-50 text-red-500 ml-2 whitespace-nowrap width-[72px] lg:block hidden">
                確定
              </button>
            </div>
            <div class="flex items-center mt-4">
              <p class="text-lg underline text-gray-500 mr-1">
                選擇抵用券
              </p>
              <RightArrow class="w-[15px] h-[18px] text-gray-500" />
            </div>
            <div class="mt-5 border-t border-gray-300 pt-5 flex justify-between">
              <p class="text-gray-450">
                金額
              </p>
              <p class="text-gray-500">
                {{ `$0` }}
              </p>
            </div>
            <p class="mt-3 text-right text-3xl mb-3">
              {{ `$0` }}
            </p>
            <button class="w-full py-2 bg-red-600 text-white rounded-md">
              前往結賬
            </button>
            <p class="text-[0.5rem] text-gray-400 mt-4 mb-5">
              <span>點擊上方按鈕即表示您已閱讀並同意</span>
              <span class="underline">「HiSKIO購買與退費政策」</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import RightArrow from '../assets/svg/RightArrow.vue'
import imgEmptyCart from '../assets/img/img-EmptyCart.png'
import MyHeader from './Header.vue'

export default {
  name: 'MyPage',

  components: { MyHeader, RightArrow },

  props: {
    user: {
      type: Object
    }
  },
  data() {
    return {
      imgEmptyCart
    }
  },
  methods: {
    onLogin() {
      this.$emit('onLogin')
    },
    onLogout() {
      this.$emit('onLogout')
    },
    onCreateAccount() {
      this.$emit('onCreateAccount')
    }
  }
}
</script>
