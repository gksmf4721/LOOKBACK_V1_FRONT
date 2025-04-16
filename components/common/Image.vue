<template>
  <img :src="safeSrc" @error="onError" :alt="alt">
</template>

<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    required: false
  },
  alt: {
    type: String,
    required: false
  },
  errorImage: {
    type: String,
    required: false
  }
});

const fallback = '/1.png'
function onError(event: Event) {
  const img = event.target as HTMLImageElement
  if(props.errorImage != null && props.errorImage != ''){
    img.src = props.errorImage;
  } else {
    img.src = fallback;
  }
}

const safeSrc = computed(()=>{
  return props.src && props.src !== '' ? props.src : (props.errorImage || fallback)
})

</script>

<style scoped>

</style>