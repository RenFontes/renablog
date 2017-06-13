<template lang="pug">
div(v-bind:class="{ content: isRoute, post: isRoute }")
    h2.post-title
        span(@click="navigateTo(post._id)") {{post.title}}
        if process.env.NODE_ENV === 'development'
            a.button.is-white.icon(@click="editPost(post._id)",v-if="post.markdown")
                span.fa.fa-pencil-square-o
            a.button.is-white.icon(@click="deletePost(post._id)")
                span.fa.fa-trash-o
    p.label.is-small {{new Date(post.created_at).toLocaleDateString()}}
    div.post-description(v-html="htmlText")
</template>

<script>
import { BlogProvider as blogProvider } from '@/BlogProvider'
import marked from 'marked';
export default {
    name: 'Post',
    props: ['postProp'],
    data() {
        return {
            loadedPost: null,
            isRoute: false
        };
    },
    computed: {
        post: function () {
            return this.postProp ? this.postProp : this.loadedPost;
        },
        htmlText: function () {
            return this.post.markdown ? marked(this.post.text) : this.post.text;
        }
    },
    methods: {
        navigateTo(id) {
            if (this.$router.path !== '/post') {
                this.$router.push({ name: 'post', params: { id: id } });
            }
        },
        editPost(id) {
            this.$router.push({ name: 'edit post', params: { id: id } });
        },
        deletePost(id) {
            blogProvider.deletePost(id);
        }
    },
    created() {
        this.isRoute = this.$route.path.indexOf('/post') > -1;
        if (this.isRoute) {
            this.loadedPost = blogProvider.getPost(this.$route.params.id);
        }
    }
}
</script>