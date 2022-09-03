<template>
    <div class="section">
      <div class="p-5 flex flex-wrap 2xl:justify-center">
        <div v-for="photo in photos" :key="photo.id" class="pb-5 2xl:max-w-xl 2xl:px-5">
          <img :src="photo.file.file"/>
        </div>
      </div>
    </div>
  </template>
  
<script>
  export default {
    name: 'HomePage',
    data:() => ({
      photos: []
    }),
    async mounted() {
      if (!this.photos.length) { 
        await this.$store.dispatch('getPhotos') 
        const photos = this.$store.state.Gallery.photos
        photos.map(({ node }) => {
          this.photos.push(node)
        })
      }
    },
  }
</script>

<style scoped>

</style>
  