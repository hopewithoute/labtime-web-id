<template>
  <NuxtImg
    :src="refinedSrc"
    :alt="alt"
    :width="width"
    :height="height"
    format="webp"
    loading="lazy"
    decoding="async"
    class="border border-border grayscale hover:grayscale-0 transition-all duration-300 my-10 mx-auto w-full max-w-full"
    sizes="sm:100vw md:800px"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'ufo'
import { useAppConfig } from '#imports'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  }
})

const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    const _base = useAppConfig().app?.baseURL || '/'
    return withBase(props.src, _base)
  }
  return props.src
})
</script>
