<template>
  <div class="section min-h-screen">
      <Portal to="homeModal" :disabled="this.$route.params && this.$route.params.id === openedPost">
        <PostModal :post="openedPost" />
      </Portal>
      <Loading :isLoading="isLoading" />
      <div class="image-gallery">
        <router-link 
          :to="{
            name: 'postModal', 
            params: { id: openedPost ? openedPost : '0' }
          }"
          v-for="photo in photos"
          :key="photo.id"
        >
          <img :src="photo.file.file" v-on:click="openedPost = photo.id" />
        </router-link>
      </div>
    </div>
  </template>
  
<script>
import Loading from "../components/Loading"
import PostModal from "../components/PostModal"
import { mapActions } from 'vuex';

  export default {
    name: 'HomePage',
    data:() => ({
      photos: [],
      isLoading: true,
      openedPost: '',
    }),
    async mounted() {
      if (!this.photos.length) { 
        await this.$store.dispatch('getPhotos') 
        const photos = this.$store.state.Gallery.photos.filter(({ node }) => {
          return node.isApproved
        })
        for (let photo in photos) {
          this.photos.push(photos[photo].node)
        }
      }
      if (document.readyState == "complete") {
        this.isLoading = false;
      }
    },
    methods: {
      ...mapActions({
        getPhoto: 'getPhoto',
      }),
    },
    components: {
      Loading,
      PostModal,
    }
  }
</script>

<style scoped>
.image-gallery {
  @apply flex flex-wrap gap-3 p-5;
}

.image-gallery > a {
  @apply h-28 cursor-pointer grow overflow-hidden rounded-md lg:h-40 2xl:h-72;
}

.image-gallery a img {
  @apply object-cover w-full h-full object-center transition hover:scale-105;
}

</style>
  