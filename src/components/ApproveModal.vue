<template>
    <div v-if="Object.keys(post).length !== 0">
        <div class="modal-overlay" @click="closeModal"></div>
        <button class="close-button" @click="closeModal">X</button>
        <div class="root-visual">
            <div class="lvl1-el1-visual">
                <img :src="post.node.file.file"/>
            </div>
            <div class="lvl1-el2-visual">
                <div class="lvl3-el1-visual">
                    <div class="flex flex-col">
                        <strong class="text-blue-500 text-sm">
                            {{post.node.owner.username}}
                        </strong>
                        <span class="text-white text-[10px] font-light">
                            Posted at {{formattedDate(post.node.createdAt)}}
                        </span>
                    </div>
                    <div class="flex justify-between w-20">
                        <button class="w-8 h-8 rounded-full bg-white/60 transition hover:scale-110 hover:brightness-110">
                            <img src="../assets/checkmark.png"/>
                        </button>
                        <button class="w-8 h-8 rounded-full bg-white/60 transition hover:scale-110 hover:brightness-110">
                            <img src="../assets/xmark.png"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import { formatDistanceToNow } from 'date-fns';
  
  export default {
    name: 'ApproveModal',
    data: () => ({
        post: {},
    }),
    mounted() {
        this.post = this.$store.state.Gallery.toApprove.filter(({ node }) => { return node.id === this.$route.params.id })[0]
    },
    methods: {
        formattedDate(date) {
            return formatDistanceToNow(new Date(date))
        },
        closeModal() {
            this.$router.push('/approve');
            this.post = {}
        },
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    .modal-overlay {
        @apply fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-10 h-screen;
    }   
  
    .close-button {
        @apply text-white text-4xl fixed top-5 right-5 z-50;
    }
  
    .lvl1-el1-visual {
        @apply max-h-[70%] flex justify-center grow xl:max-h-full;
    }
  
    .lvl1-el1-visual img {
        @apply shadow-inner;
    }
  
    .lvl1-el2-visual {
        @apply absolute w-full bg-white/20 backdrop-blur-[2px];
    }
  
    .lvl2-el1-visual {
        @apply h-12 w-full  py-2 pr-5 flex;
    }
  
    .lvl2-el2-visual {
        @apply px-5 py-2;
    }
  
    .lvl3-el1-visual {
        @apply flex flex-wrap justify-between items-center px-5 py-2;
    }
  
    .root-visual {
        @apply w-full flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm shadow-2xl overflow-hidden z-50 md:max-w-fit md:max-h-[85vh];
    }
  
  </style>
  