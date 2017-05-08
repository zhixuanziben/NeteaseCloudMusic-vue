<template>
  <div>
    <section>
      <h2>官方榜</h2>
      <div v-for="item of keyValue" @click="goListContent(item.key)">{{item.val}}</div>
    </section>
    <section>
      
    </section>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        keyValue: [
          {
            'key': '3',
            'val': '飙升榜'
          },
          {
            'key': 0,
            'val': '新歌榜'
          },
          {
            'key': 2,
            'val': '原创榜'
          },
          {
            'key': 1,
            'val': '热歌榜'
          },
          {
            'key': 4,
            'val': '云音乐电音榜'
          },
          {
            'key': 5,
            'val': 'UK排行榜周榜'
          },
          {
            'key': 6,
            'val': '美国Billboard榜'
          },
          {
            'key': 19,
            'val': '法国 NRJ Vos Hits榜'
          },
          {
            'key': 8,
            'val': 'iTunes榜'
          },
          {
            'key': 20,
            'val': '台湾Hito排行榜'
          },
          {
            'key': 21,
            'val': 'Beatport全球电子舞曲榜'
          },
          {
            'key': 10,
            'val': '日本Oricon周榜'
          },
          {
            'key': 9,
            'val': 'Hit FM Top榜'
          },
          {
            'key': 7,
            'val': 'KTV唛榜'
          },
          {
            'key': 14,
            'val': '中国TOP排行榜(港台榜)'
          },
          {
            'key': 15,
            'val': '中国TOP排行榜(内地榜)'
          },
          {
            'key': 16,
            'val': '香港电台中文歌曲龙虎榜'
          },
          {
            'key': 17,
            'val': '华语金曲榜'
          },
          {
            'key': 18,
            'val': '中国嘻哈榜'
          }
        ]
      }
    },
    methods: {
      goListContent (ind) {
        console.log(`/listContent/${ind}`)
        this.$router.push({path: `/listContent/${ind}`})
      }
    }
  }
</script>

<style scope>
  
</style>
