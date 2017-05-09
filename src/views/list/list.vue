<template>
  <div class="all-list-wrap">
    <section>
      <h2 class="list-type">官方榜</h2>
      <div v-for="(item, index) of keyValue1" @click="goListContent(item.key)" class="gov-each-list-wrap">
        <div class="gov-each-list-img-wrap">
          <img :src="item.url">
          <span class="uptime">
            {{item.upTime}}
          </span>
        </div>
        <div class="gov-each-list-top">
          <div v-for="(it, inde) of keyValue1[index].music">
            {{inde + 1}}. {{it.name}}
            <span v-for="(i, ind) of it.artists">
              {{i.name}}<span v-if="ind !== (it.artists.length - 1)">/</span>
            </span>
          </div>
        </div>
      </div>
    </section>
    <section>
      <h2 class="list-type">全球榜</h2>
      <div v-for="item of keyValue2" @click="goListContent(item.key)" class="each-list-wrap">
        <div class="each-list-img">
          <img :src="item.url">
        </div>
        <div class="each-list-msg">
          <div class="each-list-name">
            {{item.val}}
          </div>
          <div class="each-list-uptime">
            每周{{item.upTime}}更新
          </div>
        </div>
      </div>
    </section>
    <section>
      
    </section>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        topMusic: [],
        keyValue1: [
          {
            'key': 0,
            'val': '新歌榜',
            'url': 'http://p3.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=150y150',
            'music': [],
            'upTime': '每天更新'
          },
          {
            'key': 1,
            'val': '热歌榜',
            'url': 'http://p3.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg?param=150y150',
            'music': [],
            'upTime': '每周四更新'
          },
          {
            'key': 2,
            'val': '原创榜',
            'url': 'http://p4.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg?param=150y150',
            'music': [],
            'upTime': '每周四更新'
          },
          {
            'key': 3,
            'val': '飙升榜',
            'url': 'http://p3.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=150y150',
            'music': [],
            'upTime': '每天更新'
          }
        ],
        keyValue2: [
          {
            'key': 4,
            'val': '云音乐电音榜',
            'upTime': '五',
            'url': 'http://p3.music.126.net/4mh2HWH-bd5sRufQb-61bg==/3302932937414659.jpg?param=40y40'
          },
          {
            'key': 5,
            'val': 'UK排行榜周榜',
            'upTime': '一',
            'url': 'http://p3.music.126.net/VQOMRRix9_omZbg4t-pVpw==/18930291695438269.jpg?param=40y40'
          },
          {
            'key': 6,
            'val': '美国Billboard榜',
            'upTime': '三',
            'url': 'http://p4.music.126.net/EBRqPmY8k8qyVHyF8AyjdQ==/18641120139148117.jpg?param=40y40'
          },
          {
            'key': 19,
            'val': '法国 NRJ Vos Hits榜',
            'upTime': '五',
            'url': 'http://p3.music.126.net/6O0ZEnO-I_RADBylVypprg==/109951162873641556.jpg?param=40y40'
          },
          {
            'key': 8,
            'val': 'iTunes榜',
            'upTime': '一',
            'url': 'http://p3.music.126.net/83pU_bx5Cz0NlcTq-P3R3g==/18588343581028558.jpg?param=40y40'
          },
          {
            'key': 20,
            'val': '台湾Hito排行榜',
            'upTime': '一',
            'url': 'http://p3.music.126.net/wqi4TF4ILiTUUL5T7zhwsQ==/18646617697286899.jpg?param=40y40'
          },
          {
            'key': 21,
            'val': 'Beatport全球电子舞曲榜',
            'upTime': '四',
            'url': 'http://p3.music.126.net/A61n94BjWAb-ql4xpwpYcg==/18613632348448741.jpg?param=40y40'
          },
          {
            'key': 10,
            'val': '日本Oricon周榜',
            'upTime': '五',
            'url': 'http://p4.music.126.net/Rgqbqsf4b3gNOzZKxOMxuw==/19029247741938160.jpg?param=40y40'
          },
          {
            'key': 9,
            'val': 'Hit FM Top榜',
            'upTime': '三',
            'url': 'http://p4.music.126.net/54vZEZ-fCudWZm6GH7I55w==/19187577416338508.jpg?param=40y40'
          },
          {
            'key': 7,
            'val': 'KTV唛榜',
            'upTime': '五',
            'url': 'http://p3.music.126.net/H4Y7jxd_zwygcAmPMfwJnQ==/19174383276805159.jpg?param=40y40'
          },
          {
            'key': 14,
            'val': '中国TOP排行榜(港台榜)',
            'upTime': '一',
            'url': 'http://p4.music.126.net/JPh-zekmt0sW2Z3TZMsGzA==/18967675090783713.jpg?param=40y40'
          },
          {
            'key': 15,
            'val': '中国TOP排行榜(内地榜)',
            'upTime': '一',
            'url': 'http://p3.music.126.net/2klOtThpDQ0CMhOy5AOzSg==/18878614648932971.jpg?param=40y40'
          },
          {
            'key': 16,
            'val': '香港电台中文歌曲龙虎榜',
            'upTime': '五',
            'url': 'http://p4.music.126.net/YQsr07nkdkOyZrlAkf0SHA==/18976471183805915.jpg?param=40y40'
          },
          {
            'key': 17,
            'val': '华语金曲榜',
            'upTime': '一',
            'url': 'http://p4.music.126.net/N2whh2Prf0l8QHmCpShrcQ==/19140298416347251.jpg?param=40y40'
          },
          {
            'key': 18,
            'val': '中国嘻哈榜',
            'upTime': '五',
            'url': 'http://p4.music.126.net/8gUF9TrXGNoRO6cKVaCzrQ==/5972547162256485.jpg?param=40y40'
          }
        ]
      }
    },
    mounted () {
      this.ajax(0)
      this.ajax(1)
      this.ajax(2)
      this.ajax(3)
    },
    methods: {
      ajax (ind) {
        this.$http.get(`http://localhost:3000/top/list?idx=${ind}`)
        .then((res) => {
          let [{name: name1, artists: ar1}, {name: name2, artists: ar2}, {name: name3, artists: ar3}] = res.data.result.tracks
          this.keyValue1[ind].music = [{name: name1, artists: ar1}, {name: name2, artists: ar2}, {name: name3, artists: ar3}]
          console.log(this.keyValue1[ind])
        })
      },
      goListContent (ind) {
        console.log(`/listContent/${ind}`)
        this.$router.push({path: `/listContent/${ind}`})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .all-list-wrap {
    background-color: #f1f6f4;
    .list-type {
      margin-left: 0.1rem;
      padding-left: 0.05rem;
      font-size: 0.16rem;
      color: #494949;
      border-left: 4px solid #ea4558;
    }
  }
  .gov-each-list-wrap {
    display: flex;
    .gov-each-list-img-wrap {
      position: relative;
      padding: 0.1rem;
      img {
        width: 0.9rem;
        height: 0.9rem;
      }
      .uptime {
        position: absolute;
        right: 0.11rem;
        top: 0.11rem;
        color: #fff;
        font-size: 0.12rem;
      }
    }
    .gov-each-list-top {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-bottom: 1px solid #dce1df;
      color: #6d6d6d;
      font-size: 0.14rem;
    }
  }
  .each-list-wrap {
    display: flex;  
    .each-list-img {
      padding: 0.1rem;
      img {
        width: 0.6rem;
        height: 0.6rem;
      }
    }
    .each-list-msg {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-bottom: 1px solid #e1e6e4;
      .each-list-name {
        font-size: 0.16rem;
        color: #323735;
      }
      .each-list-uptime {
        font-size: 0.13rem;
        color: #969b99;
      }
    }
  }
</style>
