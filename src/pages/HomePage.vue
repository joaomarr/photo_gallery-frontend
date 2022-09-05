<template>
  <div class="section">
      <Loading :isLoading="isLoading" />
      <div class="p-5 flex flex-wrap 2xl:justify-center">
        <div v-for="photo in photos" :key="photo.id" class="pb-5 2xl:max-w-xl 2xl:px-5">
          <img :src="photo.file.file"/>
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
        const photos = this.$store.state.Gallery.photos
        photos.map(({ node }) => {
          this.photos.push(node)
        })
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

</style>
  