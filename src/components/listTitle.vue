<template>
  <div class="title-wrap">
    <span @click="back" class="title-backicon">
      <span class="icon-右键"></span>
    </span>
    <span class="title-msg">
      {{title}}
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      }
    },
    methods: {
      back () {
        this.$router.go(-1)
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
      line-height: 0.55rem;
      text-align: center;
      width: 0.55rem;
      height: 0.55rem;
      font-size: 0.2rem;
    }
    .title-msg {
      flex: 1;
      font-size: 0.18rem;
      line-height: 0.55rem;
    }
  }
</style>
