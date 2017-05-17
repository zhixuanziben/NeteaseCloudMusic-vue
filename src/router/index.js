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
import musicComment from '../views/music/children/musicComment'
import album from '../views/album/album'
import albumList from '../views/album/albumList'
import artist from '../views/artists/artist'
import mine from '../views/user/mine'
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

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
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
      component: album
    },
    {
      path: '/albumList',
      name: 'albumList',
      component: albumList
    },
    {
      path: '/artist/:id',
      name: 'artist',
      component: artist
    },
    {
      path: '/listContent/:id',
      name: 'listContent',
      component: listContent
    },
    {
      path: '/playList/:id',
      name: 'playList',
      component: playList
    },
    {
      path: '/user',
      name: 'mine',
      component: mine
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
      children: [
        {
          path: 'music',
          name: 'searchResultMusic',
          component: searchResultMusic
        },
        {
          path: 'albums',
          name: 'searchResultAlbum',
          component: searchResultAlbum
        },
        {
          path: 'artists',
          name: 'searchResultArtist',
          component: searchResultArtist
        },
        {
          path: 'mvs',
          name: 'searchResultMV',
          component: searchResultMV
        },
        {
          path: 'radio',
          name: 'searchResultRadio',
          component: searchResultRadio
        },
        {
          path: 'songlist',
          name: 'searchResultSonglist',
          component: searchResultSonglist
        },
        {
          path: 'users',
          name: 'searchResultUser',
          component: searchResultUser
        }
      ]
    },
    {
      path: '/music/:id',
      name: 'music',
      component: music,
      children: [
        {
          path: 'musicComment',
          name: 'musicComment',
          component: musicComment
        }
      ]
    },
    {
      path: '/comment/:id',
      name: 'comment',
      component: comment
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
      children: [
        {
          path: '',
          component: mvdetails
        },
        {
          path: 'details',
          name: 'details',
          component: mvdetails
        },
        {
          path: 'mvcomment',
          name: 'mvcomment',
          component: mvcomment
        },
        {
          path: 'similarMV',
          name: 'similarMV',
          component: similarMV
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
