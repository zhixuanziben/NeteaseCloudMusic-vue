<template>
  <div class="title-wrap">
    <span @click="back" class="title-backicon">
      <span class="icon-左箭头"></span>
    </span>
    <span class="title-msg">
      <span>{{title}}</span>
      <span>{{copywriter}}</span>
      <span v-if="count">({{count}})</span>
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      copywriter: {
        type: String
      },
      count: {
        type: Number
      }
    },
    methods: {
      back () {
        this.$router.back(-1)
      }
    }
  }
</script>

<style lang="scss">
  .title-wrap {
    display: flex;
    background-color: #df2d2d;
    color: #fff;
    .title-backicon {
      line-height: 0.8rem;
      text-align: center;
      width: 0.8rem;
      height: 0.8rem;
      font-size: 0.2rem;
    }
    .title-msg {
      flex: 1;
      font-size: 0.18rem;
      line-height: 0.8rem;
    }
  }
</style>
