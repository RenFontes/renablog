<template lang="pug">
#app
  .columns
    .column.is-2.blog-menu(v-bind:style="background")
      aside.menu
        p.menu-label.blog-menu-color.blog-title {{title}}
        ul.menu-list
          li
            router-link.blog-menu-color(to='/') Home
          li
            router-link.blog-menu-color(to='/about') About Me
          if process.env.NODE_ENV === 'development'
            li
              router-link.blog-menu-color(to='/newpost') New Post
    .column.main
      router-view
</template>

<script>
import { Settings as settings } from '@/Settings';
export default {
  name: 'app',
  data() {
    return {
      background: 
      settings.background && settings.background !== '' ?  
      `background-image: url(${settings.background}); ${settings.backgroundStyle}`
      : '',
      title: settings.title
    }
  },
  created() {
    document.title = settings.title;
  }
}
</script>
