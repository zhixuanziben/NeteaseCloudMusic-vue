<template>
  <div>
    <section>
      <div>精彩评论</div>
      <div v-for="item in hotcomment">
        <div>
          <img :src="item.user.avatarUrl" style="width: 30px; height: 30px">
        </div>
        <div>
          <div>
            {{item.user.nickname}}
          </div>
          <div @click="getDate(item.time)">
            {{item.time}}
            <div>
              {{item.likedCount}}
              <span class="icon-点赞"></span>
            </div>
          </div>
          <div>
            {{item.content}}
          </div>
        </div>
      </div>
    </section>
    <section>
      <h2>最新评论</h2>
      <div v-for="item in comment">
        <div>
          <img :src="item.user.avatarUrl" style="width: 30px; height: 30px">
        </div>
        <div>
          <div>
            {{item.user.nickname}}
          </div>
          <div>
            {{item.time}}
            {{item.likedCount}}
          </div>
          <div>
            {{item.content}}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    props: {
      comment: {
        type: Array
      },
      hotcomment: {
        type: Array
      }
    },
    methods: {
      getDate (str) {
        console.log(str)
      }
    }
  }
</script>

<style>
  
</style>
