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
  router.push({ name: 'driver-card-workflow', query: { cardId: card.ID } })
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Card Number</th>
        <th>Driver</th>
        <th>Card Type</th>
        <th>Facility</th>
        <th>Issue Date</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="card in store.driverCards" :key="card.ID">
        <td>
          <a
            :href="`https://s.mnaseb.com/h/OPcard/driver.php?token=${card.token}`"
            target="_blank"
            class="text-blue-600 underline"
            >{{ card.CardNumber }}</a
          >
        </td>
        <td>{{ card.driverName }}</td>
        <td>{{ card.CardType }}</td>
        <td>{{ card.facilityName }}</td>
        <td>{{ card.IssueDate }}</td>
        <td>
          <BaseButton color="info" label="Edit" small @click="editCard(card)" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
