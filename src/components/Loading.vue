<template>
    <div class="page-loader" v-if="isLoading">
      <div class="cube bg-green-500"></div>
      <div class="cube bg-cyan-500"></div>
      <div class="cube bg-yellow-500"></div>
      <div class="cube bg-orange-600"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoadingComponent',
    props:{
        isLoading:Boolean,
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-loader {
    @apply backdrop-blur-xl;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    position: fixed;
    background: #ffffffde;
    z-index: 99;
}

.cube {
    width: 40px;
    height: 40px;
    margin-right: 10px;
}

.cube:first-child {
    animation: left infinite 1s;
}

.cube:last-child {
    animation: right infinite 1s .5s;
}

@keyframes left {
    40% {
        transform: translateX(-60px);
    }
    50% {
        transform: translateX(0)
    }
}

@keyframes right {
    40% {
        transform: translateX(60px);
    }
    50% {
        transform: translateX(0)
    }
}

</style>
  