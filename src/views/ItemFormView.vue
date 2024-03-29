<script setup>
  import { ref, toRefs, onMounted } from 'vue';
  import router from '@/router';
  
  import { useLayoutStore } from '@/stores/LayoutStore';
  import { useItemStore } from '@/stores/ItemStore';
  import { useCategorySelectStore } from '@/stores/CategorySelectStore';
  import { useImageStore } from '@/stores/ImageStore';

  import Layout from '@/components/Layout/Layout.vue';
  import ItemImageDialog from '@/components/Item/ItemImage/ItemImageDialog.vue';
  import ItemFormImage from '@/components/Item/ItemForm/ItemFormImage.vue';
  import * as formFtns from '@/helpers/item-form';

  const layoutStore = useLayoutStore();
  const itemStore = useItemStore();
  const categorySelectStore = useCategorySelectStore();
  const imageStore = useImageStore();

  const props = defineProps({
    id: [String, Number]
  });

  const { id } = toRefs(props);
  const itemId = parseInt(id.value);
  const isEdit = itemId > 0 ? true : false;

  const form = ref(false);
  const item = ref(formFtns.getEmptyItem());
  const loading = ref(false);

  const required = (value) => {
    return (value ? true : false) || 'Field is required';
  }

  const isMinLength = (value) => {
    return (value && value.length >= 3) || 'Field length must be over 3 characters';
  }

  const dialogRef = ref();

  const onAddImageClick = () => {
    dialogRef.value.openDialog();
  };

  const onRemoveImageClick = () => {
    imageStore.setImageUrl(null);
  }

  const onSubmit = async () => {
    item.imageUrl = imageStore.getImageUrl;
    const apiParams = formFtns.makeApiParams(item);
    let result = null;

    loading.value = true;

    if (isEdit === true) {
      result = await itemStore.editItem(itemId, apiParams);
    } else {
      result = await itemStore.addItem(apiParams);
    }

    loading.value = false;

    if (result) {
      router.push(`/`);
        
      const msg = isEdit ? 'Item has been edited' : 'Item has been added';
      layoutStore.setStatusMsg('success', msg);
    
      imageStore.setImageUrl(null);
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
      <div id="item-form-wrapper">
        <div id="item-form">
          <h1>{{ isEdit ? 'Edit item' : 'Add item' }}</h1>
          <v-form
            v-model="form"
            @submit.prevent="onSubmit">
            <v-text-field
              label="Name"
              v-model="item.name"
              class="item-field"
              :readonly="loading"
              :rules="[required, isMinLength]"
              clearable />
            <v-select
              v-model="item.category.option"
              :items="categorySelectStore.getCategoryOptions(false)"
              item-title="text"
              item-value="value"
              :readonly="loading"
              :rules="[required]"
              return-object
              single-line
              label="Select category">
            </v-select>
            <div v-if="imageStore.getImageUrl" id="item-form-mobileimage">
              <ItemFormImage />
            </div>
            <div id="item-image-btns" :class="imageStore.getImageUrl ? 'item-image-editbtns' : '' ">
              <v-btn
                color="secondary"
                variant="flat"
                @click="onAddImageClick">
                {{ imageStore.getImageUrl ? 'Change image' : 'Add image' }}
              </v-btn>
              <v-btn
                v-if="imageStore.getImageUrl"
                color="secondary"
                variant="flat"
                @click="onRemoveImageClick">
                Remove image
              </v-btn>
            </div>
            <ItemImageDialog
              ref="dialogRef"
              :item="item" />
            <v-btn
              :disabled="!form"
              :loading="loading"
              color="secondary"
              variant="flat"
              type="submit">
              Submit
            </v-btn>
          </v-form>
        </div>
        <div id="item-form-image">
          <ItemFormImage />
        </div>
      </div>
    </template>
  </Layout>
</template>

<style lang="scss">
  @import "@/assets/variables";

  #item-form-wrapper {
    display: flex;
    flex-direction: row;
    margin: 0 $content-gap;

    #item-form {
      width: 400px;

      #item-image-btns {
        display: flex;
        column-gap: 10px;
        margin-bottom: 20px;
      }

      .item-image-editbtns {
        justify-content: flex-start;
      }

      #item-form-mobileimage {
        display: none;
        margin-bottom: 20px;
      }
    }

    #item-form-image {
      width: 300px;
    }
  }

  @media screen and (max-width: 600px) {
    #item-form-wrapper {
      flex-direction: column;

      #item-form {
        width: 100%;

        .item-image-editbtns {
          justify-content: center;
        }

        #item-form-mobileimage {
          display: block;
        }
      }

      #item-form-image {
        display: none;
      }
    }
  }
</style>
