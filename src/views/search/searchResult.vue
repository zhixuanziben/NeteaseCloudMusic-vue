<template>
  <div>
    <div class="search-wrap">
      <span class="icon-左箭头" @click="back()"></span>
      <input id="inp" 
        v-model="val"
        @keyup.enter="submit()" 
        autofocus="autofocus" 
        placeholder="搜索音乐·歌手·歌词·用户">
    </div>
    <div class="result-type">
      <router-link :to="{path: '/searchResult/music', query: { val: val }}" replace>单曲</router-link>
      <router-link :to="{path: '/searchResult/albums', query: { val: val }}" replace>专辑</router-link>
      <router-link :to="{path: '/searchResult/artists', query: { val: val }}" replace>歌手</router-link>
      <router-link :to="{path: '/searchResult/songlist', query: { val: val }}" replace>歌单</router-link>
      <router-link :to="{path: '/searchResult/mvs', query: { val: val }}" replace>MV</router-link>
      <router-link :to="{path: '/searchResult/radio', query: { val: val }}" replace>电台</router-link>
      <router-link :to="{path: '/searchResult/users', query: { val: val }}" replace>用户</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        val: ''
      }
    },
    mounted () {
      this.val = this.$route.query.val
      this.$router.push({path: '/searchResult/music', query: { val: this.$route.query.val }})
    },
    methods: {
      submit () {
        console.log('submit')
        this.$router.replace({path: '/searchResult/music', query: { val: this.val }})
      },
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-wrap {
    display: flex;
    height: 0.8rem;
    background-color: #df2d2d;
    .icon-左箭头 {
      color: #fff;
      line-height: 0.8rem;
      padding-right: 0.2rem;
      margin-bottom: 0.1rem;
    }
    input {
      flex: 1;
      text-decoration: none;
      border-style: none;
      border-bottom: 1px solid white;
      background-color: #df2d2d;
      margin-bottom: 0.1rem;
      color: white;
      &:focus {
      }
    }
  }
  .result-type {
    display: flex;
    height: 0.6rem;
    > a {
      flex: 1;
      color: #666;
      line-height: 0.6rem;
      text-align: center;
    }
    .router-link-active {
      color: #df2d2d;
      text-decoration: none;
      border-bottom: 2px solid #df2d2d;
    }
  }
  .result-type > div {
    flex: 1;
    text-align: center;
  }
</style>
