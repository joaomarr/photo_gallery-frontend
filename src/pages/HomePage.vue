<template>
  <div class="section">
      <Loading :isLoading="isLoading" />
      <div class="image-gallery">
        <div v-for="photo in photos" :key="photo.id">
          <img :src="photo.file.file" />
        </div>
      </div>
    </div>
  </template>
  
<script>
import Loading from "../components/Loading" 

  export default {
    name: 'HomePage',
    data:() => ({
      photos: [],
      isLoading: true,
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
    components: {
      Loading
    }
  }
</script>

<style scoped>
.image-gallery {
  @apply flex flex-wrap gap-3 p-5;
}

.image-gallery > div {
  @apply h-28 cursor-pointer relative grow overflow-hidden rounded-md lg:h-40 2xl:h-72;
}

.image-gallery div img {
  @apply object-cover w-full h-full object-center transition hover:scale-105;
}
</style>
  