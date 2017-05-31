<template>
  <div>
    <list-title title="MV频道"></list-title>
    <div class="mv-router">
      <router-link :to="{path: '/mvLibrary/hotMv'}">排行榜</router-link>
      <router-link :to="{path: '/mvLibrary/newMv'}">最新MV</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import listTitle from '../../components/listTitle.vue'
  export default {
    components: {
      listTitle
    }
  }
</script>

<style lang="scss" scoped>
  .mv-router {
    display: flex;
    > a {
      color: #666;
      width: 50%;
      text-align: center;
      height: 0.8rem;
      line-height: 0.8rem;
      font-size: 0.25rem;
    }
    .router-link-active {
      color: #df2d2d;
      text-decoration: none;
      border-bottom: 2px solid #df2d2d;
    }
  }
</style>
