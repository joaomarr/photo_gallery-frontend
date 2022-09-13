<template>
    <div v-if="Object.keys(post).length !== 0">
        <div class="modal-overlay"></div>
        <div class="root-visual flex-container">
            <div class="lvl1-el1-visual">
                <img :src="post.node.file.file" />
            </div>
            <div class="lvl1-el2-visual flex-container non-scrollable">
                <div class="lvl3-el1-visual">
                    <div class="flex flex-col">
                        <strong class="text-blue-500 text-sm">
                            {{post.node.owner.username}}
                        </strong>
                        <span class="text-gray-800 text-[10px] font-light">
                            Posted at {{formattedDate(post.node.createdAt)}}
                        </span>
                    </div>
                    <div class="relative w-fit h-full cursor-pointer transition hover:scale-105" v-on:click="likePost()">
                        <span class="absolute rounded-full text-xs bg-blue-500 text-white w-4 h-4 flex justify-center items-center -right-2 -top-1 opacity-80">
                            {{post.node.likes.length}}
                        </span>
                        <svg v-if="liked" class="w-6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100%" height="100%" viewBox="0 0 256 256" xml:space="preserve">
                            <defs>
                            </defs>
                            <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                                <path d="M 7.486 13.502 c 9.982 -9.982 26.165 -9.982 36.147 0 L 45 14.869 l 0 0 c 6.895 22.882 6.259 47.092 0 72.294 L 26.927 69.089 c 0 0 0 0 0 0 l -19.44 -19.44 C -2.495 39.667 -2.495 23.484 7.486 13.502 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(214,73,62); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                                <path d="M 82.514 13.502 c -9.982 -9.982 -26.165 -9.982 -36.147 0 L 45 14.869 l 0 0 v 72.294 l 18.073 -18.073 c 0 0 0 0 0 0 l 19.44 -19.44 C 92.495 39.667 92.495 23.484 82.514 13.502 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(215,90,74); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                            </g>
                        </svg>
                        <svg v-else class="w-6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100%" height="100%" viewBox="0 0 256 256" xml:space="preserve">
                            <defs>
                            </defs>
                            <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                                <path d="M 45 84.334 L 6.802 46.136 C 2.416 41.75 0 35.918 0 29.716 c 0 -6.203 2.416 -12.034 6.802 -16.42 c 4.386 -4.386 10.217 -6.802 16.42 -6.802 c 6.203 0 12.034 2.416 16.42 6.802 L 45 18.654 l 5.358 -5.358 c 4.386 -4.386 10.218 -6.802 16.42 -6.802 c 6.203 0 12.034 2.416 16.42 6.802 l 0 0 l 0 0 C 87.585 17.682 90 23.513 90 29.716 c 0 6.203 -2.415 12.034 -6.802 16.42 L 45 84.334 z M 23.222 10.494 c -5.134 0 -9.961 2 -13.592 5.63 S 4 24.582 4 29.716 s 2 9.961 5.63 13.592 L 45 78.678 l 35.37 -35.37 C 84.001 39.677 86 34.85 86 29.716 s -1.999 -9.961 -5.63 -13.592 l 0 0 c -3.631 -3.63 -8.457 -5.63 -13.592 -5.63 c -5.134 0 -9.961 2 -13.592 5.63 L 45 24.311 l -8.187 -8.187 C 33.183 12.494 28.356 10.494 23.222 10.494 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                            </g>
                        </svg>
                    </div>
                </div>
                <div class="lvl2-el2-visual flex-container non-scrollable">
                    <div class="scrollable">
                        <div v-for="comment in comments" :key="comment.node.id" class="py-3">
                            <p class="leading-3">
                                <strong class="text-xs font-semibold">
                                    {{comment.node.owner.username}}
                                </strong>
                                <span class="text-xs">
                                    {{comment.node.text}}
                                </span>
                            </p>
                            <span class="text-[8px] text-blue-500/80 xl:text-xs">
                                {{formattedDate(comment.node.created)}}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="lvl2-el1-visual">
                    <div class="w-3 mx-2">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100%" height="100%" viewBox="0 0 256 256" xml:space="preserve">
                            <defs>
                            </defs>
                            <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                                <path d="M 83.924 7.756 L 4.202 38.496 c -5.442 2.183 -5.409 5.219 -0.992 6.571 l 20.455 6.385 l 7.035 23.153 c 0.925 2.553 0.469 3.566 3.151 3.566 c 2.069 0 2.983 -0.946 4.138 -2.069 l 9.941 -9.666 l 20.681 15.28 c 3.806 2.1 6.553 1.012 7.501 -3.533 l 13.577 -63.978 C 91.079 8.631 87.565 6.103 83.924 7.756 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(33,151,201); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                                <path d="M 33.942 72.016 l -6.747 -22.204 L 79.13 19.002 L 40.751 56.789 L 33.942 72.016 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                            </g>
                        </svg>
                    </div>
                    <form class="h-full flex flex-1" @submit.prevent="commentPost">
                        <input 
                            type="text" 
                            required
                            v-model="comment"
                            placeholder="Add a comment..." 
                            class="text-xs text-gray-500 flex-1 h-full focus:outline-0"
                        />
                        <button class="w-fit text-xs text-blue-500/80 transition hover:text-blue-500">
                            Publish
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  </template>
  
<script>
import { formatDistanceToNow } from 'date-fns';

export default {
    name: 'PostModal',
    data: () => ({
        post: {},
        comments: {},
        liked: false,
        comment: '',
    }),
    mounted() {
        this.post = this.$store.state.Gallery.photos.filter(({ node }) => { return node.id === this.$route.params.id })[0]
        this.comments = this.post.node.commentSet.edges;
        this.liked = this.post.node.likes.some(like => like.id == this.$store.state.Auth.profile.pk)
    },
    methods: {
        formattedDate(date) {
            return formatDistanceToNow(new Date(date))
        },
        async likePost() {
            const index = this.post.node.likes.findIndex(like => like.id == this.$store.state.Auth.profile.pk)
            this.liked = !this.liked
            if (this.post.node.likes[index]) {
                this.post.node.likes.splice(index, 1)
            } else {
                this.post.node.likes.push({id: this.$store.state.Auth.profile.pk})
            }
            const { toggleLikePost } = await this.$store.dispatch('toggleLikePost', this.post.node.id);
            if (toggleLikePost.success !== true) { 
                this.liked = !this.liked
                if (this.post.node.likes[index]) {
                    this.post.node.likes.splice(index, 1)
                } else {
                    this.post.node.likes.push({id: this.$store.state.Auth.profile.pk})
                }
             }
        },
        async commentPost() {
            if (!this.comment.length) { return }
            const postData = { postId: this.post.node.id, text: this.comment }
            this.comments.push(
                {node: {text: this.comment, id: this.comments.length, created: new Date(), owner: {username: this.$store.state.Auth.profile.username}}}
            )
            this.comment = ''
            await this.$store.dispatch('commentPost', postData)
        }
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .modal-overlay {
        @apply fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-10 h-screen;
    }   

    .flex-container {
        @apply flex flex-col;
    }

    .flex-container > :not(.scrollable):not(.non-scrollable) {
        @apply shrink;
    }

    .flex-container > .scrollable, .non-scrollable {
        @apply grow;
    }

    .non-scrollable {
        @apply overflow-hidden;
    }

    .scrollable {
        @apply overflow-auto;
    }

    .lvl1-el1-visual {
        @apply max-h-[70%] flex justify-center bg-[#f0f0f0f2] grow xl:max-h-full;
    }

    .lvl1-el1-visual img {
        @apply object-contain object-center shadow-inner h-full;
    }

    .lvl1-el2-visual {
        @apply w-full bg-white xl:max-w-md;
    }

    .lvl2-el1-visual {
        @apply h-12 w-full bg-[#f0f0f0f2] border-t-2 py-2 pr-5 flex;
    }

    .lvl2-el2-visual {
        @apply px-5 py-2;
    }

    .lvl3-el1-visual {
        @apply border-b-2 flex justify-between items-center px-5 py-2 bg-[#f0f0f0f2];
    }

    .root-visual {
        @apply h-[85vh] w-[85vw] min-w-[50vw] flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-sm shadow-2xl overflow-hidden z-50 xl:flex-row md:max-w-[75vw];
    }

</style>
  