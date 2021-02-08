import Vue from 'vue'
import VueRouter from 'vue-router'
import Header from '../components/Header.vue'
import HeaderTitle from '../components/HeaderTitle.vue'
import Home from '../views/Home.vue'
import Timeline from '../views/Timeline.vue'

import Community from '../views/Community.vue'

import CommunityBlogType from '../views/CommunityBlogType.vue'

import Place from '../views/Place.vue'

import addpet from '../views/Addpet.vue'

import placeDesktop from '../views/PlaceDesktop.vue'

import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Header',
    component: Header,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/timeline',
        name: 'Timeline',
        component: Timeline
      },
      {
        path: '/community/:tab',
        name: 'Community',
        component: Community
      },
      {
        path: '/place',
        name: 'Place',
        component: Place
      }
    ]
  },
  {
    path: '/',
    name: 'HeaderTitle',
    component: HeaderTitle,
    children: [
      {
        path: 'community/blog/:type',
        name: 'CommunityBlogType',
        component: CommunityBlogType
      },
      {
        path: 'community/blog/detail/:id',
        name: 'CommunityBlogType',
        component: CommunityBlogType
      },
      {
        path: '/addpet',
        name: 'addpet',
        component: addpet
      }
    ]
  },
  {
    path: '/placedesktop',
    name: 'placedesktop',
    component: placeDesktop
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      const position = {}
      if (to.hash) {
        position.selector = to.hash
        return false
      }
    }
  }
})

export default router
