<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import { useDriverCardsStore } from '@/stores/driverCards'

const router = useRouter()
const store = useDriverCardsStore()

onMounted(() => {
  store.fetchDriverCards()
})

function editCard(card) {
  router.push({ name: 'driver-card-workflow', query: { id: card.ID } })
}
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
      <tr v-for="card in store.cards" :key="card.ID">
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
</template>
