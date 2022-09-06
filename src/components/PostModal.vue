<template>
    <div v-if="Object.keys(post).length !== 0">
        <div class="modal-overlay"></div>
        <div class="post-modal">
            <img :src="post.node.file.file" />
            <div>
                <p>This will be the description of the image</p>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PostModal',
    computed: {
        post() {
            return this.$store.state.Gallery.photos.filter(({ node }) => { return node.id === this.$route.params.id })[0]
        }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .modal-overlay {
        @apply fixed top-0 bottom-0 left-0 right-0 bg-black/40 z-10 h-screen;
    }   

    .post-modal {
        @apply absolute flex left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-sm shadow-2xl overflow-hidden z-50;
    }

    .post-modal img {
        @apply max-h-[90vh] object-center shadow-inner;
    }

    .postal-modal div {
        @apply w-64 h-full bg-white;
    }

</style>
  