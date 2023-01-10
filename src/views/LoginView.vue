<script setup>
  import { ref } from 'vue';
  import StatusMsg from '@/components/Layout/StatusMsg.vue';
  import { useAuthStore } from '@/stores/AuthStore';

  const form = ref(false);
  const email = ref(null);
  const password = ref(null);
  const loading = ref(false);

  const required = (value) => {
    return !!value || 'Field is required';
  }
  
  const onSubmit = async () => {
    if (!form) return;

    loading.value = true;

    if (email.value && password.value) {
      const authStore = useAuthStore();
      await authStore.login(email.value, password.value);
    }

    loading.value = false;
  };
</script>

<template>
  <div id="login-wrapper">
    <div id="login-content">
      <div id="login-title">Backlog Login</div>
      <StatusMsg />
      <v-card class="mx-auto px-6 py-8">
        <v-form
          v-model="form"
          @submit.prevent="onSubmit">
          <v-text-field
            v-model="email"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            label="Email"
            variant="underlined"
            clearable />
          <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            :type="'password'"
            label="Password"
            placeholder="Enter your password"
            variant="underlined"
            clearable />
          <div id="login-btn-wrapper">
            <v-btn
              :disabled="!form"
              :loading="loading"
              color="secondary"
              type="submit"
              variant="flat">
              Sign In
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </div>
  </div>
</template>

<style lang="scss">
  @import "@/assets/variables";

  #login-wrapper {
    display: flex;
    align-items: center;
    height: 100%;

    #login-content {
      width: 400px;
      margin: 0 auto;

      #login-title {
        font-size: 40px;
        text-align: center;
        margin-bottom: 20px;
      }

      .v-card {
        background-color: $panel-bgcolor;

        .v-form {
          #login-btn-wrapper {
            display: flex;
            justify-content: center;
            margin-top: 20px;
          }
        }
      }
    }
  }

  @media (min-width: 1024px) {
    .login {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
</style>
