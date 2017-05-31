import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/home/home'
import musicLibrary from '../views/home/children/musicLibrary'
import personalAdvice from '../views/home/children/personalAdvice'
import recommendSongs from '../views/list/recommendSongs'
import songList from '../views/home/children/songList'
import list from '../views/list/list'
import listContent from '../views/list/listContent'
import playList from '../views/list/playList'
import music from '../views/music/music'
import album from '../views/album/album'
import albumList from '../views/album/albumList'
import artist from '../views/artists/artist'
import artistMsg from '../views/artists/children/artistMsg'
import artistAlbum from '../views/artists/children/artistAlbum'
import artistHotmusic from '../views/artists/children/artistHotmusic'
import artistMV from '../views/artists/children/artistMV'
import artistSimi from '../views/artists/children/artistSimi'
import comment from '../views/comment/comment'
import serchPage from '../views/search/serchPage'
import searchResult from '../views/search/searchResult'
import searchResultMusic from '../views/search/children/searchResultMusic'
import searchResultAlbum from '../views/search/children/searchResultAlbum'
import searchResultArtist from '../views/search/children/searchResultArtist'
import searchResultMV from '../views/search/children/searchResultMV'
import searchResultRadio from '../views/search/children/searchResultRadio'
import searchResultSonglist from '../views/search/children/searchResultSonglist'
import searchResultUser from '../views/search/children/searchResultUser'
import mvhome from '../views/mv/mvhome'
import mvLibrary from '../views/mv/mvList'
import mvdetails from '../views/mv/children/MVdetails'
import mvcomment from '../views/mv/children/mvComment'
import similarMV from '../views/mv/children/similarMV'
import hotMV from '../views/mv/children/hotMV'
import newMV from '../views/mv/children/newMV'
import mine from '../views/user/mine'
import userHome from '../views/user/userHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      redirect: { name: 'personalAdvice' },
      children: [
        {
          path: 'musicLibrary',
          name: 'library',
          component: musicLibrary,
          children: [
            {
              path: 'personalAdvice',
              name: 'personalAdvice',
              component: personalAdvice
            },
            {
              path: 'songList',
              name: 'songList',
              component: songList
            },
            {
              path: 'list',
              name: 'list',
              component: list
            }
          ]
        }
      ]
    },
    {
      path: '/album/:id',
      name: 'album',
      component: album,
      meta: { notKeepAlive: true }
    },
    {
      path: '/albumList',
      name: 'albumList',
      component: albumList
    },
    {
      path: '/artist/:id',
      name: 'artist',
      component: artist,
      meta: { notKeepAlive: true },
      children: [
        {
          path: '',
          redirect: 'artistHotmusic'
        },
        {
          path: 'artistMsg',
          name: 'artistMsg',
          component: artistMsg
        },
        {
          path: 'artistAlbum',
          name: 'artistAlbum',
          component: artistAlbum
        },
        {
          path: 'artistHotmusic',
          name: 'artistHotmusic',
          component: artistHotmusic
        },
        {
          path: 'artistMV',
          name: 'artistMV',
          component: artistMV
        },
        {
          path: 'artistSimi',
          name: 'artistSimi',
          component: artistSimi
        }
      ]
    },
    {
      path: '/listContent/:id',
      name: 'listContent',
      component: listContent,
      meta: { notKeepAlive: true }
    },
    {
      path: '/playList/:id',
      name: 'playList',
      component: playList,
      meta: { notKeepAlive: true }
    },
    {
      path: '/user',
      name: 'mine',
      component: mine
    },
    {
      path: '/userHome/:id',
      name: 'userHome',
      component: userHome
    },
    {
      path: '/serchPage',
      name: 'serchPage',
      component: serchPage
    },
    {
      path: '/searchResult',
      name: 'searchResult',
      component: searchResult,
      meta: { notKeepAlive: true },
      children: [
        {
          path: 'music',
          name: 'searchResultMusic',
          component: searchResultMusic,
          meta: { notKeepAlive: true }
        },
        {
          path: 'albums',
          name: 'searchResultAlbum',
          component: searchResultAlbum,
          meta: { notKeepAlive: true }
        },
        {
          path: 'artists',
          name: 'searchResultArtist',
          component: searchResultArtist,
          meta: { notKeepAlive: true }
        },
        {
          path: 'mvs',
          name: 'searchResultMV',
          component: searchResultMV,
          meta: { notKeepAlive: true }
        },
        {
          path: 'radio',
          name: 'searchResultRadio',
          component: searchResultRadio,
          meta: { notKeepAlive: true }
        },
        {
          path: 'songlist',
          name: 'searchResultSonglist',
          component: searchResultSonglist,
          meta: { notKeepAlive: true }
        },
        {
          path: 'users',
          name: 'searchResultUser',
          component: searchResultUser,
          meta: { notKeepAlive: true }
        }
      ]
    },
    {
      path: '/music/:id',
      name: 'music',
      component: music,
      meta: { notKeepAlive: true }
    },
    {
      path: '/comment/:id',
      name: 'comment',
      component: comment,
      meta: { notKeepAlive: true }
    },
    {
      path: '/recommendSongs',
      name: 'recommendSongs',
      component: recommendSongs
    },
    {
      path: '/mv/:id',
      name: 'mv',
      component: mvhome,
      meta: { notKeepAlive: true },
      children: [
        {
          path: '',
          component: mvdetails,
          meta: { notKeepAlive: true }
        },
        {
          path: 'details',
          name: 'details',
          component: mvdetails,
          meta: { notKeepAlive: true }
        },
        {
          path: 'mvcomment',
          name: 'mvcomment',
          component: mvcomment,
          meta: { notKeepAlive: true }
        },
        {
          path: 'similarMV',
          name: 'similarMV',
          component: similarMV,
          meta: { notKeepAlive: true }
        }
      ]
    },
    {
      path: '/mvLibrary',
      name: 'mvLibrary',
      component: mvLibrary,
      children: [
        {
          path: '',
          component: hotMV
        },
        {
          path: 'hotMV',
          name: 'hotMV',
          component: hotMV
        },
        {
          path: 'newMV',
          name: 'newMV',
          component: newMV
        }
      ]
    }
  ]
})
