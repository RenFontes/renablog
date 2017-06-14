<template lang="pug">
div#main
  .posts.content
    section.post(v-for="post in posts")
      post(v-bind:post-prop="post")
    section.post(v-if="componentLoaded && posts.length === 0")
      div Woops! There are no more posts!
  nav(class="pagination is-right")
    a(class="pagination-previous" v-if="currentPage > 1" v-on:click="previousPage") Previous Page
    a(class="pagination-next" v-if="posts.length == 10" v-on:click="nextPage") Next Page
    ul(class="pagination-list")
      li
</template>

<script>
import { BlogProvider as blogProvider } from '@/BlogProvider';
export default {
  name: 'Blog',
  data() {
    return {
      posts: [],
      currentPage: 1,
      componentLoaded: false
    }
  },
  watch: {
    '$route'(to, from) {
      this.loadPage();
    }
  },
  methods: {
    nextPage() {
      if(this.posts.length == 10)
        this.$router.push({ name: 'blog page', params: { page: ++this.currentPage } });
    },
    previousPage() {
      if (this.currentPage > 1)
        this.$router.push({ name: 'blog page', params: { page: --this.currentPage } });
    },
    loadPage() {
      blogProvider.loadPage(this.currentPage);
    }
  },
  created: function () {
    if (this.$route.params.page) {
      this.currentPage = this.$route.params.page;
    }
    var self = this;
    if (!this.componentLoaded) {
      blogProvider.$on('loadPage', function (posts) {
        self.posts = posts;
      });
      this.componentLoaded = true;
    }

    this.loadPage();

  }
}
</script>