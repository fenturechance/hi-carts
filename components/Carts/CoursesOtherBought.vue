<template>
  <div class="bg-gray-200 pt-8 pb-8">
    <div class="maxWidth">
      <h2 class="titleStyle mb-4">
        {{ $t('carts.coursesThatOtherPeopleAlsoBought') }}
      </h2>
      <ul class="flex lg:gap-4 lg:flex-nowrap flex-wrap">
        <li v-for="(course, index) in courseArr" :key="course.id" class="lg:w-1/4 md:w-1/2 w-full rounded-lg overflow-hidden lg:bg-white lg:shadow-xl cursor-pointer">
          <div class="lg:block hidden">
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
                {{ `$${setPrice(course.price)}` }}
              </p>
            </div>
          </div>
          <div class="lg:hidden block border-gray-300 py-4" :class="borderBottom(index, courseArr)">
            <div class="flex">
              <div>
                <div :style="{ backgroundImage: `url('${course.image}')` }" class="w-[114px] h-[64px] bg-cover bg-center rounded-lg" />
                <div class="flex justify-center mt-3">
                  <UserSvg class="w-[14px] h-[16px] text-gray-450 mr-1" />
                  <p class="text-gray-450 text-sm font-light">
                    {{ course.students }}
                  </p>
                </div>
              </div>
              <div class="px-3" style="width: calc(100% - 114px)">
                <div class="flex h-[64px] flex-col justify-between">
                  <p class="text-gray-500 text-sm h-[40px] line-clamp-2">
                    {{ course.title }}
                  </p>
                  <div class="flex justify-between items-center">
                    <p class="font-light text-gray-450 text-xs">
                      {{ course.lecturers[0].username }}
                    </p>
                    <p class="text-cyan-600">
                      {{ `$${setPrice(course.price)}` }}
                    </p>
                  </div>
                </div>
                <div class="flex justify-center mt-3">
                  <ul class="flex items-center h-[16px] gap-1">
                    <li v-for="i in 5" :key="i" :style="{ backgroundImage: `url('${iconStarGray}')` }" class="w-[16px] h-[16px] bg-cover bg-center flex items-center">
                      <span :style="{ backgroundImage: `url('${iconStar}')`, width: startWidth(i, course.feedback_score) }" class="bg-cover bg-center" />
                    </li>
                  </ul>
                  <p class="text-gray-450 text-sm ml-2">
                    <span class="text-gray-500">{{ course.feedback_score }}</span>
                    <span>{{ ` (5)` }}</span>
                  </p>
                </div>
              </div>
            </div>
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
import UserSvg from '~/assets/svg/UserSvg.vue'
import BellSvg from '~/assets/svg/BellSvg.vue'
import CartSvg from '~/assets/svg/CartSvg.vue'
import { setPrice } from '~/assets/js/utils.js'
import iconStar from '~/assets/img/icon-star.png'
import iconStarGray from '~/assets/img/icon-star-gray.png'
export default {
  components: {
    StartSvg,
    UsersSvg,
    BellSvg,
    CartSvg,
    UserSvg
  },
  data() {
    return {
      courseArr: [],
      iconStar,
      iconStarGray
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
    },
    startWidth(i, score) {
      const int = parseInt(score)
      const float = score % 1
      if (int > i + 1) {
        return '100%'
      } else if (int === i + 1) {
        if (float === 0) { return '100%' }
        return `${100 * float}%`
      }
      return '0%'
    },
    borderBottom(index, arr) {
      if (arr.length < 3) { return '' }
      if (index + 1 < arr.length - 1) { return 'md:border-b border-b' }
      if (index + 1 === arr.length) { return 'border-none' }
      return 'border-b md:border-none'
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
