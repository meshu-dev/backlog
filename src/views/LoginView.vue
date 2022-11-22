<script>
  import { useAuthStore } from '../stores/AuthStore';

  export default {
    data: () => ({
      form: false,
      email: null,
      password: null,
      loading: false,
    }),
    methods: {
      async onSubmit () {
        if (!this.form) return;

        this.loading = true;

        const authStore = useAuthStore();
        const response = await authStore.login(this.email, this.password);

        console.log('Bing!', response);
        this.loading = false;
      },
      required (value) {
        return !!value || 'Field is required'
      }
    },
  }
</script>

<template>
  <div id="login-wrapper">
    <v-card class="mx-auto px-6 py-8" width="400">
      <v-form
        v-model="form"
        @submit.prevent="onSubmit">
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          label="Email" />
        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          :type="'password'"
          clearable
          label="Password"
          placeholder="Enter your password" />
        <br />
        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated">
          Sign In
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<style lang="scss">
  #login-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
  }

  @media (min-width: 1024px) {
    .login {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
</style>
