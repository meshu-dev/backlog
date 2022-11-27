<script setup>
  import Header from './Header.vue';
  import StatusMsg from './StatusMsg.vue';
</script>

<template>
  <Header />
  <main>
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
