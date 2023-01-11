<script setup>
  import Header from '@/components/Layout/Header.vue';
  import Loader from '@/components/Layout/Loader.vue';
  import StatusMsg from '@/components/Layout/StatusMsg.vue';
</script>

<template>
  <Header />
  <main>
    <Loader />
    <StatusMsg />
    <slot name="main" />
  </main>
</template>

<style lang="scss">
  @import "@/assets/variables";

  main {
    margin: 20px auto 0 auto;
    width: $content-width;
  }

  @media screen and (max-width: $content-width) {
    main {
      width: auto;
    }
  }
</style>
