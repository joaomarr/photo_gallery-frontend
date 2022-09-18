<template>
    <div class="section">
        <Portal to="approveModal" :disabled="this.$route.params && this.$route.params.id === openedPost">
            <ApproveModal :post="openedPost" />
        </Portal>
        <Loading :isLoading="isLoading" />
        <div class="image-gallery">
            <div 
                class="image-div" 
                v-for="photo in photos" 
                :key="photo.id"
            >
                <div class="absolute bottom-1 right-1 w-20 flex justify-between">
                    <button 
                        class="w-8 h-8 rounded-full bg-white/60 transition hover:scale-110 hover:brightness-110"
                        v-on:click="postApproval(true, photo.id)"
                    >
                        <img src="../assets/checkmark.png"/>
                    </button>
                    <button 
                        class="w-8 h-8 rounded-full bg-white/60 transition hover:scale-110 hover:brightness-110"
                        v-on:click="postApproval(false, photo.id)"
                    >
                        <img src="../assets/xmark.png"/>
                    </button>
                </div>
                <router-link 
                    :to="{
                        name: 'approveModal', 
                        params: { id: openedPost ? openedPost : '0' }
                    }"
                >
                    <p class="absolute left-1 top-1 text-[8px] text-white/50 md:text-xs">
                        Posted by 
                        <span class="text-white">
                            {{photo.owner.username}}
                        </span>
                        -
                        {{formattedDate(photo.createdAt)}}
                    </p>
                    <img :src="photo.file.file" v-on:click="openedPost = photo.id" />
                </router-link>
            </div>
        </div>
    </div>
</template>
    
<script>
import Loading from "../components/Loading"
import ApproveModal from "../components/ApproveModal"
import { formatDistanceToNow } from 'date-fns';
  
export default {
    name: 'HomePage',
    data:() => ({
        photos: [],
        isLoading: true,
        openedPost: '',
    }),
    async mounted() {
        if (!this.$store.state.Gallery.toApprove) { 
            await this.$store.dispatch('getToApprove') 
        }
        const photos = this.$store.state.Gallery.toApprove
            for (let photo in photos) {
            this.photos.push(photos[photo].node)
            }
        if (document.readyState == "complete") {
            this.isLoading = false;
        }
    },
    methods: {
        formattedDate(date) {
            return formatDistanceToNow(new Date(date))
        },
        async postApproval(approve, postId) {
            const variables = { postId: postId, approve: approve }
            const response = await this.$store.dispatch('postApproval', variables)
            return response
        }
    },
    components: {
        Loading,
        ApproveModal
    }
}
</script>
  
<style scoped>
  .image-gallery {
    @apply flex flex-wrap gap-3 p-5 bg-[#F1F1F1];
  }
  
  .image-div {
    @apply relative h-28 cursor-pointer grow overflow-hidden rounded-md lg:h-40 2xl:h-72;
  }
  
  .image-div img {
    @apply object-cover w-full h-full object-center;
  }
  
</style>
    