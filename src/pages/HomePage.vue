<template>
  <div class="section">
      <Portal to="homeModal" :disabled="this.$route.params && this.$route.params.id === openedPost">
        <PostModal :post="openedPost" />
      </Portal>
      <Loading :isLoading="isLoading" />
      <UploadForm />
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
import UploadForm from "@/components/UploadForm.vue";

  export default {
    name: 'HomePage',
    data:() => ({
      photos: [],
      isLoading: true,
      openedPost: '',
    }),
    async mounted() {
      if (!this.$store.state.Gallery.photos) { 
        await this.$store.dispatch('getPhotos') 
      }
      const photos = this.$store.state.Gallery.photos
        for (let photo in photos) {
          this.photos.push(photos[photo].node)
      }
      if (document.readyState == "complete") {
        this.isLoading = false;
      }
    },
    components: {
    Loading,
    PostModal,
    UploadForm
}
  }
</script>

<style scoped>
.image-gallery {
  @apply flex flex-wrap gap-3 p-5 bg-[#F1F1F1];
}

.image-gallery > a {
  @apply h-28 cursor-pointer grow overflow-hidden rounded-md lg:h-40 2xl:h-72;
}

.image-gallery a img {
  @apply object-cover w-full h-full object-center transition hover:scale-105;
}

</style>
  