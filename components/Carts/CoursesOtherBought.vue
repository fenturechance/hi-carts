<template>
  <div class="bg-gray-200 pt-8 pb-8">
    <div class="maxWidth">
      <h2 class="titleStyle mb-4">
        {{ $t('carts.coursesThatOtherPeopleAlsoBought') }}
      </h2>
      <ul class="flex gap-4">
        <li v-for="course in courseArr" :key="course.id" class="w-1/4 rounded-lg overflow-hidden bg-white shadow-xl cursor-pointer">
          <div :style="{ backgroundImage: `url('${course.image}')` }" class="pt-[60%] bg-cover bg-center relative hoverShowChild">
            <div class="w-full h-1/3 absolute bottom-0 right-0 bg-gradient-to-t from-black/75 to-transparent child">
              <div class="flex px-2 py-2 justify-end h-full items-end">
                <BellSvg class="w-[22px] h-[24px] text-yellow-200 mr-3" />
                <CartSvg class="w-[24px] h-[24px] text-white hover:text-yellow-300" @click="addToCart(course)" />
              </div>
            </div>
          </div>
          <div class="px-4 py-3">
            <div class="flex justify-between mb-4">
              <div class="flex items-center">
                <StartSvg class="w-[18px] h-[20px] text-yellow-300 mr-1" />
                <p class="text-gray-450">
                  {{ `${course.feedback_score} (5)` }}
                </p>
              </div>
              <div class="flex items-center">
                <UsersSvg class="w-[25px] h-[20px] text-gray-450 mr-1" />
                <p class="text-gray-450">
                  {{ course.students }}
                </p>
              </div>
            </div>
            <p class="text-stone-900 h-24 text-xl tracking-wide">
              {{ course.title }}
            </p>
            <div class="flex items-center">
              <div class="w-[32px] h-[32px] rounded-full overflow-hidden mr-3">
                <img :src="course.lecturers[0].avatar" class="w-full h-full">
              </div>
              <p class="text-gray-450 tracking-wide font-light">
                {{ course.lecturers[0].username }}
              </p>
            </div>
            <p class="text-cyan-600 text-xl mt-3">
              {{ `$${setPrice(course.fixed_price)}` }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { API, baseURL } from '~/api.js'
import StartSvg from '~/assets/svg/StartSvg.vue'
import UsersSvg from '~/assets/svg/UsersSvg.vue'
import BellSvg from '~/assets/svg/BellSvg.vue'
import CartSvg from '~/assets/svg/CartSvg.vue'
import { setPrice } from '~/assets/js/utils.js'
export default {
  components: {
    StartSvg,
    UsersSvg,
    BellSvg,
    CartSvg
  },
  data() {
    return {
      courseArr: []
    }
  },
  created() {
    this.fetchCourseOtherBought()
  },
  methods: {
    setPrice(number) {
      return setPrice(number)
    },
    fetchCourseOtherBought() {
      return this.$axios({
        method: API.courses.fundraising.method,
        url: API.courses.fundraising.url,
        baseURL,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        this.courseArr = response.data
      }).catch(() => {
        // if (!error.response) { return }
        // if (!error.response.data) { }
      })
    },
    addToCart(course) {
      this.$emit('getCartsData', course)
    }
  }
}
</script>

<style scoped>
@import '~/assets/css/carts.css';
.hoverShowChild .child {
  display: none;
}
.hoverShowChild:hover .child {
  display: inline-block;
}
</style>
