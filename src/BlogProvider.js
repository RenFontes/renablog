import Vue from 'vue';
export const BlogProvider = new Vue({
    data: {
        posts: [],
        currentPage: 0
    },
    methods: {
        loadPage(page) {
            if(this.currentPage === page && this.posts.length > 0){
                this.$emit('loadPage', this.posts);
                return;                
            }

            this.currentPage = page;
            this.$http.get(`/posts?page=${page}`).then(response => {
                this.posts = response.body;
                this.$emit('loadPage', this.posts);
            }, response => {
                console.log(response);
            });
        },
        getPost(id) {
            var post = this.posts.find((p) => p._id === id);
            return post;
        },
        savePost(post) {
            this.$http.post('/posts', post)
                .then(
                response => {
                    this.$emit('savePost', response.body);
                },
                response => {
                    this.$emit('savePost', response.body);
                }
                );
        },
        updatePost(post) {
            var self = this;
            this.$http.put('/posts', post)
                .then(
                response => {
                    this.$emit('updatePost', response.body);
                },
                response => {
                    this.$emit('updatePost', response.body);
                }
                );
        },
        deletePost(id) {
            this.$http.delete(`/posts?id=${id}`).then(response => {
                this.$emit('deletePost', response.body);
                this.loadPage(this.currentPage);
                this.$router.push('/');
            });
        }
    }
});