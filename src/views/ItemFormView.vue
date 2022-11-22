<script setup>
  import { onMounted } from 'vue';
  import { useCategoryStore } from '@/stores/CategoryStore';
  import { useItemStore } from '@/stores/ItemStore';
  import Layout from '@/components/Layout/Layout.vue';
  import CategorySelector from '@/components/Category/CategorySelector.vue';
  import ItemList from '@/components/Item/ItemList.vue';

  const categoryStore = useCategoryStore();
  const itemStore = useItemStore();
  
  const form = false;
  
  const onSubmit = () => {

  };

  onMounted(async () => {
    await itemStore.fetchItems();
  });
</script>

<template>
  <Layout>
    <template v-slot:main>
      <div class="add-item">
        <h1>This</h1>
      </div>
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
    </template>
  </Layout>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
