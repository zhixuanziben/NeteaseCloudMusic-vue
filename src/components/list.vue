<template>
  <div>
    <section>
      <h2>官方榜</h2>
      <div @click="goListContent(3)">飙升榜</div>
      <div @click="goListContent(0)">新歌榜</div>
      <div @click="goListContent(2)">原创榜</div>
      <div @click="goListContent(1)">热歌榜</div>
    </section>
    <section>
      
    </section>
  </div>
</template>

<script>
  export default {
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
