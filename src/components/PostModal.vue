<template>
    <div v-if="Object.keys(post).length !== 0">
        <div class="modal-overlay"></div>
        <div class="post-modal">
            <div class="image-div">
                <img :src="post.node.file.file" />
            </div>
            <div class="post-div">
                <div class="border-b-2 flex flex-col px-5 py-2">
                    <strong class="text-blue-500 text-sm">
                        @{{post.node.owner.username}}
                    </strong>
                    <span class="text-gray-800 text-[10px] font-light">
                        Posted at {{formattedDate}}
                    </span>
                </div>
                <div class="px-5 py-2 overflow-scroll">
                    <div for="comment in comments">
                        <strong class="text-sm">
                            @{{comments[comment].node}}
                        </strong>
                        <span class="text-[10px] font-light">
                            {{comment}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
<script>
import { formatDistanceToNow } from 'date-fns';

export default {
    name: 'PostModal',
    computed: {
        post() {
            return this.$store.state.Gallery.photos.filter(({ node }) => { return node.id === this.$route.params.id })[0]
        },
        comments() {
            return this.post.node.commentSet.edges;
        },
        formattedDate() {
            return formatDistanceToNow(new Date(this.post.node.createdAt))
        }
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .modal-overlay {
        @apply fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-10 h-screen;
    }   

    .post-modal {
        @apply h-[85vh] w-[85vw] min-w-[50vw] flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-sm shadow-2xl overflow-hidden z-50 xl:flex-row md:max-w-[75vw];
    }

    .image-div {
        @apply max-h-[70%] flex justify-center bg-black;
    }

    .image-div img {
        @apply object-contain object-center shadow-inner h-full;
    }

    .post-div {
        @apply w-full bg-white;
    }

</style>
  