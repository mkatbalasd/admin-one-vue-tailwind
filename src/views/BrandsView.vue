<script setup>
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import TableBrands from '@/components/TableBrands.vue'
import { mdiTable } from '@mdi/js'
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTable" title="Brands" main />
      <TableBrands />
    </SectionMain>
  </LayoutAuthenticated>
</template>
