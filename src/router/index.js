import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home'
import musicLibrary from '../components/musicLibrary'
import personalAdvice from '../components/personalAdvice'
import songList from '../components/songList'
import list from '../components/list'
import listContent from '../components/listContent'
import playList from '../components/playList'
import music from '../components/music'
import album from '../components/album'
import artist from '../components/artist'
import mine from '../components/mine'
import comment from '../components/comment'
import serchPage from '../components/serchPage'
import searchResult from '../components/searchResult'
import searchResultMusic from '../components/search/searchResultMusic'
import searchResultAlbum from '../components/search/searchResultAlbum'
import searchResultArtist from '../components/search/searchResultArtist'

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
        }
      ]
    },
    {
      path: '/music/:id',
      name: 'music',
      component: music
    },
    {
      path: '/comment/:id',
      name: 'comment',
      component: comment
    }
  ]
})
