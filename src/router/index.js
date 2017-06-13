import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Post from '@/components/Post'
import Editor from '@/components/Editor'
import About from '@/components/About'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'blog',
      component: Main
    },
    {
      path: '/blog/:page',
      name: 'blog page',
      component: Main
    },
    {
      path: '/post/:id',
      name: 'post',
      component: Post
    },
    {
      path: '/newpost',
      name: 'new post',
      component: Editor
    },
    {
      path: '/editpost:id',
      name: 'edit post',
      component: Editor
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
