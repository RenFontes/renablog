<template lang="pug">
div.content
    div#new-post
        form
            ul.no-style
                li
                        input(type="text",v-model="title", placeholder="Title")
                li
                    textarea(v-model="text",
                    rows="6",cols="60")
                    input(type="hidden",v-model="id")
                li
                    input.button(type="button",v-on:click="SavePost",value="Save Post")
        div#preview.post(v-html="transformed")
</template>

<script>
import marked from 'marked';
import { BlogProvider as blogProvider } from '@/BlogProvider'
export default {
    name: 'Editor',
    data() {
        return {
            id: null,
            title: null,
            text: "Type **markdown** here"
        };
    },
    computed: {
        transformed: function() {
            return marked(this.text);
        }
    },
    methods: {
        SavePost() {
            var self = this;
            if (this.$route.path.indexOf('/newpost') > -1) {
                blogProvider.$on('savePost', res => {
                    self.$router.replace('/');
                });                
                blogProvider.savePost({ title: this.title, text: this.text });
            } else if (this.$route.path.indexOf('/editpost') > -1) {
                blogProvider.$on('updatePost', res => {
                    self.$router.replace('/');
                });                
                blogProvider.updatePost({ id: this.id, title: this.title, text: this.text });
            }
        }
    },
    created(){
        this.isRoute = this.$route.path.indexOf('/editpost') > -1;
        if (this.isRoute) {
            var post = blogProvider.getPost(this.$route.params.id);
            this.text = post.text;
            this.title = post.title;
            this.id = post._id;
        }
    }
}
</script>
