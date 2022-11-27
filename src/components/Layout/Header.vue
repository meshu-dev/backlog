<script setup>
  import { RouterLink } from 'vue-router';
  import { useAuthStore } from '@/stores/AuthStore';

  const logout = () => {
    const authStore = useAuthStore();
    authStore.logout();
  };
</script>

<template>
  <header id="header">
    <div id="header-content">
      <span id="header-logo">Backlog</span>
      <nav>
        <v-btn variant="plain">
          <RouterLink
            to="/"
            class="nav-link">
            Home
          </RouterLink>
        </v-btn>
        <v-btn variant="plain">
          <RouterLink
            to="/item/new"
            class="nav-link">
            Add Item
          </RouterLink>
        </v-btn>
        <v-btn variant="plain">
          <span class="nav-link" @click="logout">Logout</span>
        </v-btn>
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
      justify-content: space-between;
      width: 1000px;
      height: 100%;
      margin: 0 auto;
      color: #FFF;
    }

    #header-logo {
      display: flex;
      align-items: center;
      font-size: 30px;
    }

    nav {
      display: flex;
      align-items: center;

      .nav-link {
        height: 25px;
        color: #FFF;
        text-decoration: none;
      }
    }
  }
</style>
