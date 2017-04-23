<template>
  <div>
    <div v-for="item in data.albums" @click="toAlbumMsg(item.id)">
      <div>
        <img :src="item.blurPicUrl" alt="" style="height: 50px; width: 50px">
      </div>
      <div>
        <div>
          {{item.name}}
        </div>
        <div>
          {{item.artist.name}}
        </div>
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
      this.$http.get(`http://localhost:3000/search?keywords=${this.$route.query.val}&type=10`)
        .then((res) => {
          console.log(res.data.result)
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
        this.$http.get(`http://localhost:3000/search?keywords=${this.$route.query.val}&type=10`)
        .then((res) => {
          this.data = res.data.result
        })
      }
    },
    methods: {
      toAlbumMsg (id) {
        this.$router.push({path: `/album/${id}`})
      }
    }
  }
</script>

<style>
  
</style>
