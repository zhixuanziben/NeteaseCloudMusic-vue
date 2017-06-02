<template>
  <div>
    <div class="search-wrap">
      <span class="icon-左箭头" @click="notSubmit()"></span>
      <input id="inp" 
        v-model="query"
        @keyup.enter="submit" 
        autofocus="autofocus" 
        placeholder="搜索音乐·歌手·歌词·用户">
    </div>
    <div class="hot-search">
      <h3>热门搜索</h3>
      <button v-for="item in hotSearch" @click="submit(item)">{{item}}</button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        query: '',
        hotSearch: ['冯提莫', '陈奕迅', '姐姐', 'samsara', '童话镇', '阿婆说', 'Taylor Swift', '周杰伦', '成都', '薛之谦', 'Coldplay']
      }
    },
    methods: {
      submit: function (str) {
        if (str) {
          this.query = str
        }
        this.$router.replace({path: '/searchResult', query: { val: this.query }})
        this.query = ''
      },
      notSubmit: function () {
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
      line-height: 0.6rem;
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
  .search-wrap span {
    margin-left: 10px;
    font-size: 15px;
    align-self: center;
    cursor: pointer;
  }
  .hot-search {
    padding: 10px;
  }
  .hot-search h3 {
    font-size: 16px;
  }
  .hot-search button {
    background-color: white;
    border: 1px solid #666;
    padding: 5px 10px;
    margin-right: 5px;
    border-radius: 20px;
    margin-bottom: 5px;
    margin-top: 5px;
  }
</style>
