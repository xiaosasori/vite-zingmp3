<template>
  <div v-if="statusPending && page === 1">
    <div class="flex">
      <div class="absolute inset-x-0 w-[46.5%] m-auto transform z-10 scale-85 -translate-x-2/3">
        <skeleton
          class="pb-[56.25%]"
          style="animation: 2s ease-in-out 0s infinite normal none running loading"
        />
      </div>
      <div class="bg-[color:var(--layout-bg)] w-[46.5%] m-auto transform translate-x-0 z-20">
        <skeleton
          class="pb-[56.25%]"
          style="animation: 2s ease-in-out 0s infinite normal none running loading"
        />
        <!-- style="animation: 2s ease-in-out 0s infinite normal none running loading" -->
      </div>
      <div class="absolute inset-x-0 w-[46.5%] m-auto transform z-10 scale-85 translate-x-2/3">
        <skeleton class="pb-[56.25%]" />
      </div>
    </div>
    <!-- carousel -->
    <skeleton-carousel class="mt-7" />
  </div>
  <template v-if="statusSuccess || page > 1">
    <template v-for="(section, index) in home.sections">
      <section
        v-if="section.sectionType === 'banner'"
        :key="index"
      >
        <Slider :items="section.items" />
      </section>
      <PlaylistCarousel
        v-if="section.sectionType === 'playlist'"
        :key="index"
        :items="section.items"
        :title="section.title"
        class="mt-7"
      />
    </template>
    <InfiniteLoad
      class="fixed bottom-20"
      @infinite-load="fetchMore"
    />
    <skeleton-carousel
      v-if="statusPending && page > 1"
      class="mt-7"
    />
  </template>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useApi, fetchHome } from '@/api'
import Slider from './Slider.vue'
import SkeletonCarousel from '@/components/common/carousels/SkeletonCarousel.vue'
import PlaylistCarousel from '@/components/common/carousels/PlaylistCarousel.vue'
import InfiniteLoad from './InfiniteLoad.vue'

export default defineComponent({
  name: 'App',
  components: {
    Slider,
    PlaylistCarousel,
    InfiniteLoad,
    SkeletonCarousel,
  },
  setup() {
    const page = ref<number>(1)
    const home = reactive({ sections: [], hasMore: false })
    const {
      exec: fetchHomeData,
      onSuccess,
      statusPending,
      statusSuccess,
    } = useApi(fetchHome)
    fetchHomeData(page.value)

    onSuccess((result) => {
      home.sections.push(...result.items)
      home.hasMore = result.hasMore
      page.value++
    })

    function fetchMore() {
      if (!statusPending.value && page.value < 4) {
        fetchHomeData(page.value)
      }
    }

    return {
      home,
      statusPending,
      statusSuccess,
      page,
      fetchMore,
    }
  },
})
</script>
