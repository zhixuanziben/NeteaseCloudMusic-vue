<template>
  <div>
    <div class="search-wrap">
      <span class="icon-左箭头" @click="notSubmit()"></span>
      <input id="inp" 
        v-model="query"
        @keyup.enter="submit()" 
        autofocus="autofocus" 
        placeholder="搜索音乐·歌手·歌词·用户">
    </div>
    <div class="hot-search">
      <h3>热门搜索</h3>
      <button v-for="item in hotSearch" @click="serch(item.id)">{{item.name}}</button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        query: '',
        hotSearch: [
          {name: '我想和你唱', id: '25765735'},
          {name: '人民的名义', id: '6873143'},
          {name: 'Good Life', id: '20471852'},
          {name: '我爱你', id: '26145033'},
          {name: '随便你', id: '25934014'},
          {name: '成都', id: '26354572'}
        ]
      }
    },
    methods: {
      submit: function () {
        this.$router.push({path: '/searchResult', query: { val: this.query }})
        this.query = ''
      },
      serch: function (str) {
        const path = '/movie/' + str
        this.$router.push({path: path})
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
    border-style: none;
    padding: 5px;
    margin-right: 5px;
    border-radius: 10px;
    margin-bottom: 5px;
    margin-top: 5px;
    color: #e54847;
  }
</style>
