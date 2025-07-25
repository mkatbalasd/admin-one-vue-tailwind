<script setup>
import { onMounted } from 'vue'
import { useBrandsStore } from '@/stores/brands'

const store = useBrandsStore()

onMounted(() => {
  store.fetchBrands()
})
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>English</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="brand in store.brands" :key="brand.BrandID">
        <td>{{ brand.BrandID }}</td>
        <td>{{ brand.BrandName }}</td>
        <td>{{ brand.BrandEn }}</td>
      </tr>
    </tbody>
  </table>
</template>
