<template>
  <div class="artists" :style="{color: fontcolor}">
    <span v-for="(artist, index) in artists">
      {{artist.name}}
      <span v-if="index < (artists.length - 1)">/</span>
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      artists: {
        type: Array,
        required: true
      },
      fontcolor: {
        default: '#666'
      }
    }
  }
</script>

<style lang="scss">
</style>
