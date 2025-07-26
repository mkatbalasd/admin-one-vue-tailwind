<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import { useDriverCardsStore } from '@/stores/driverCards'

const router = useRouter()
const store = useDriverCardsStore()

onMounted(() => {
  store.fetchDriverCards()
})

function editCard(card) {
  router.push({ name: 'driver-card-workflow', query: { id: card.ID } })
}

const perPage = ref(10)
const currentPage = ref(0)

const items = computed(() => store.cards)

const itemsPaginated = computed(() =>
  items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1)),
)

const numPages = computed(() => Math.ceil(items.value.length / perPage.value))

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }

  return pagesList
})
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Card Number</th>
        <th>Driver</th>
        <th>Facility</th>
        <th>Issue Date</th>
        <th>Expiration Date</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="card in itemsPaginated" :key="card.ID">
        <td>{{ card.ID }}</td>
        <td>
          <a
            :href="`https://s.mnaseb.com/h/OPcard/driver.php?token=${card.token}`"
            target="_blank"
            class="text-blue-600 underline"
            >{{ card.CardNumber }}</a
          >
        </td>
        <td>{{ card.driverName }}</td>
        <td>{{ card.facilityName }}</td>
        <td>{{ card.IssueDate }}</td>
        <td>{{ card.ExpirationDate }}</td>
        <td>
          <BaseButton color="info" label="Edit" small @click="editCard(card)" />
        </td>
      </tr>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>
