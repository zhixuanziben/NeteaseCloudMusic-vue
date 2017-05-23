<template>
  <div>
    <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
      <mu-list @itemClick="closeBottomSheet">
        <mu-sub-header>
          歌曲: {{musicName}}
        </mu-sub-header>
        <mu-list-item title="收藏到歌单" @click="collection(id)"/>
        <mu-list-item :title="'歌手:' + artist[0].name" @click="toArtist(artist[0].id)">
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>
  </div>
</template>

<script>
  export default {
    props: {
      bottomSheet: {
        type: Boolean
      },
      musicName: {
        type: String
      },
      id: {
        type: Number
      },
      artist: {
        type: Array
      }
    },
    methods: {
      hideMore () {
        this.isShow = false
      },
      closeBottomSheet () {
        this.bottomSheet = false
      },
      collection (id) {
        this.$http.get(`http://localhost:3000/playlist/tracks?op=add&pid=495727117&tracks=${id}`)
          .then((res) => {
            console.log(res.data)
            this.$emit('hidden')
          })
      },
      toArtist (id) {
        console.log(id)
        this.$router.push({path: `/artist/${id}`})
      }
    }
  }
</script>

<style lang="scss" scoped>
  
</style>
