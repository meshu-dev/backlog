<script setup>
  import Header from './Header.vue';
  import StatusMsg from './StatusMsg.vue';
</script>

<template>
  <!-- <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet"> -->
  <Header />
  <main>
    <StatusMsg />
    <slot name="main" />
  </main>
</template>

<style lang="scss">

</style>
