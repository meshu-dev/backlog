<script>
  import { RouterLink } from "vue-router";

  export default {
    name: 'Header',
    inheritAttrs: false,
    customOptions: {}
  }
</script>

<template>
  <header id="header">
    <img
      style="display: none"
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />
    <div id="header-content">
      <span id="header-logo">Backlog</span>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/add-item">Add Item</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style lang="scss">
  #header {
    background-color: #34495E;
    height: 80px;
  
    #header-content {
      display: flex;
      width: 1000px;
      margin: 0 auto;
    }

    #header-logo {
      font-size: 30px;
    }

    nav {
      display: flex;
      margin-left: 20px;
      align-items: center;

      a {
        margin-right: 5px;
        height: 25px;
      }
    }
  }
</style>
