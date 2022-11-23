<script setup>
  import { ref, toRefs, onMounted } from 'vue';
  import router from '@/router';
  import { useLayoutStore } from '@/stores/LayoutStore';
  import { useItemStore } from '@/stores/ItemStore';
  import { useCategorySelectStore } from '@/stores/CategorySelectStore';
  import Layout from '@/components/Layout/Layout.vue';
  import * as formFtns from '@/helpers/item-form';

  const layoutStore = useLayoutStore();
  const itemStore = useItemStore();
  const categorySelectStore = useCategorySelectStore();

  const props = defineProps({
    id: [String, Number]
  });

  const { id } = toRefs(props);
  const itemId = parseInt(id.value);
  const isEdit = itemId > 0 ? true : false;

  console.log('isEdit', itemId, id);

  const form = ref(false);
  const item = ref(formFtns.getEmptyItem());

  const onSubmit = async () => {
    const apiParams = formFtns.makeApiParams(item);
    let result = null;

    if (isEdit === true) {
      result = await itemStore.editItem(itemId, apiParams);
    } else {
      result = await itemStore.addItem(apiParams);
    }

    console.log('result', result);

    if (result) {
      const msg = isEdit ? 'Item has been edited' : 'Item has been added';

      layoutStore.setStatusMsg({
        type: 'success',
        text: msg
      });
      router.push(`/`);
    }
  };

  onMounted(async () => {
    await formFtns.fetchData();

    if (isEdit == true) {
      itemStore.setSelectedItem(itemId);
      formFtns.updateItemRef(item);
    }
  });
</script>

<template>
  <Layout>
    <template v-slot:main>
      <h1>{{ isEdit ? 'Edit item' : 'Add item' }}</h1>
      <v-form
        id="item-form"
        v-model="form"
        @submit.prevent="onSubmit">
        <v-text-field
          v-model="item.name"
          :readonly="loading"
          :rules="[required]"
          class="item-field"
          clearable
          label="Name" />
        <v-select
          v-model="item.category.option"
          :items="categorySelectStore.getCategoryOptions(false)"
          item-title="text"
          item-value="value"
          return-object
          single-line
          label="Select category">
        </v-select>
        <v-btn
          :disabled="!form"
          :loading="loading"
          color="success"
          type="submit"
          variant="elevated">
          Submit
        </v-btn>
      </v-form>
    </template>
  </Layout>
</template>

<style>
  #item-form {
    max-width: 400px;
  }
</style>
