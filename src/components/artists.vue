<template>
  <div class="artists">
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
      }
    }
  }
</script>

<style lang="scss">
  .artists {
    color: #666;
  }
</style>
