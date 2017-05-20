<template>
  <div class="bar-wrap">
    <div class="each-icon">
      <span class="icon-collection"></span>
      <p>{{collectionCount}}</p>
    </div>
    <div class="each-icon" @click="goComment">
      <span class="icon-comment"></span>
      <p>{{commentCount}}</p>
    </div>
    <div class="each-icon">
      <span class="icon-share"></span>
      <p>{{shareCount}}</p>
    </div>
    <div class="each-icon">
      <span class="icon-download"></span>
      <p>下载</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      collectionCount: {
        type: Number,
        default: 0
      },
      commentCount: {
        type: Number,
        default: 0
      },
      shareCount: {
        type: Number,
        default: 0
      },
      fromType: {
        type: Number,
        default: 0
      }
    },
    methods: {
      goComment () {
        console.log('co')
      }
    }
  }
</script>

<style lang="scss">
  .bar-wrap {
    display: flex;
    .each-icon {
      flex: 1;
      text-align: center;
    }
  }
</style>
