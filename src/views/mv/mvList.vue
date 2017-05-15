<template>
  <div>
    <list-title title="MV频道"></list-title>
    <div class="mv-router">
      <div @click="goHotMV">排行榜</div>
      <div @click="goNewMV">最新MV</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import listTitle from '../../components/listTitle.vue'
  export default {
    components: {
      listTitle
    },
    methods: {
      goHotMV () {
        this.$router.push({path: '/mvLibrary/hotMv'})
      },
      goNewMV () {
        this.$router.push({path: '/mvLibrary/newMv'})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mv-router {
    display: flex;
    > div {
      width: 50%;
      text-align: center;
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 0.25rem;
    }
  }
</style>
