<template>
  <div>
    <div v-for="(item, index) in data.songs" @click="playMusic(item.id, index, item.name, item.artists, item.album.blurPicUrl)">
      <div>{{item.name}}</div>
      <div>
        <span v-for="it in item.artists">{{it.name}}/</span>-
        <span>{{item.album.name}}</span>
      </div>
    </div>
  </div>  
</template>

<script>
  export default {
    data () {
      return {
        data: ''
      }
    },
    mounted () {
      // console.log(this.$route.query.val)
      this.$http.get(`http://localhost:3000/search?keywords=${this.$route.query.val}&type=1`)
        .then((res) => {
          this.data = res.data.result
        })
    },
    // 计算当前搜索的值
    computed: {
      query () {
        return this.$route.query.val
      }
    },
    // query变化重新搜索
    watch: {
      query () {
        this.$http.get(`http://localhost:3000/search?keywords=${this.$route.query.val}&type=1`)
        .then((res) => {
          this.data = res.data.result
        })
      }
    },
    methods: {
      playMusic (id, ind, name, ar, pic) {
        console.log(id)
        const that = this
        this.$http.get(`http://localhost:3000/music/url?id=${id}`)
        .then(function (res) {
          that.url = res.data.url
          const obj1 = {
            id: id,
            ind: that.$store.state.musicUrlList.length,
            nowMusicUrl: res.data.data[0].url,
            nowName: name,
            nowArtists: ar,
            nowImgurl: pic
          }
          const obj2 = {
            imgUrl: pic,
            id: id,
            url: res.data.data[0].url,
            name: name,
            artists: ar
          }
          that.$store.dispatch('changeMusic', obj1)
          that.$store.dispatch('pushMusic', obj2)
        })
      }
    }
  }
</script>

<style>
  
</style>
