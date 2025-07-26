<script setup>
import { onMounted, computed, ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BasePagination from '@/components/BasePagination.vue'
import { useFacilitiesStore } from '@/stores/facilities'

const emit = defineEmits(['edit'])

const store = useFacilitiesStore()

onMounted(() => {
  store.fetchFacilities()
})

const perPage = ref(10)
const currentPage = ref(0)

const items = computed(() => store.facilities)

const itemsPaginated = computed(() =>
  items.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1),
  ),
)

const numPages = computed(() => Math.ceil(items.value.length / perPage.value))

const currentPageHuman = computed(() => currentPage.value + 1)

function editFacility(facility) {
  emit('edit', facility)
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Identity</th>
        <th>Name</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="facility in itemsPaginated" :key="facility.FacilityID">
        <td>{{ facility.FacilityID }}</td>
        <td>{{ facility.IdentityNumber }}</td>
        <td>{{ facility.Name }}</td>
        <td>
          <BaseButton color="info" label="Edit" small @click="editFacility(facility)" />
        </td>
      </tr>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BasePagination v-model="currentPage" :total="numPages" />
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>
