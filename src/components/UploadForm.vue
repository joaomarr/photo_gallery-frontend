<template>
  <section class="flex justify-center text-center py-4">
    <Loading :isLoading="isLoading" />
    <div>
      <h1 class="text-blue-500 font-black text-4xl py-4">
        Upload Your's
      </h1>
      <form @submit.prevent="sendFile" ectype="multipart/form-data" class="uploadForm">
        <input
          type="file"
          name="file"
          ref="file"
          multiple
          @change="selectFile"
          class="file-input"
        />
        <div>
          <button class="bg-blue-500 text-white px-5 py-2 h-full font-semibold rounded-r-md">Send</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import Loading from "../components/Loading" 

export default {
  name: 'UploadFormComponent',

  data: () => ({
      files: [],
      message: [],
      isLoading: false,
  }),
  methods: {
    selectFile() {
      for (let file of this.$refs.file.files) {
        this.files.push(file)
      }
    },
    async sendFile() {
      const response = await this.$store.dispatch('uploadPost', this.files)
      if (response === 'success') { this.$forceUpdate(); }
    }
  },
  components: {
    Loading
  }
}
</script>

<style>
  .uploadForm {
    @apply flex border-2 border-[#F1F1F1];
  }

  .file-input {
    @apply text-zinc-400 items-center;
  }

</style>
