<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getDriverCards } from '@/api/driverCards'
import { getDrivers } from '@/api/drivers'
import { getFacilities } from '@/api/facilities'
import { mdiIdCard, mdiDomain, mdiAccount } from '@mdi/js'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import CardBox from '@/components/CardBox.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import { useDriverCardWorkflowStore } from '@/stores/driverCardWorkflow'

const route = useRoute()

const store = useDriverCardWorkflowStore()

const facilityIdInput = ref('')
const driverIdInput = ref('')

const modalFacility = ref(false)
const modalDriver = ref(false)

const newFacility = ref({ IdentityNumber: '', Name: '' })
const newDriver = ref({ FirstName: '', LastName: '', IdentityNumber: '', FacilityID: '' })

const cardForm = ref({
  CardNumber: '',
  CardType: '',
  FacilityID: '',
  DriverID: '',
  IssueDate: '',
  ExpirationDate: '',
  Supplier: '',
  addingDate: '',
  LastUpdate: '',
  userID: '',
})

onMounted(async () => {
  const id = route.query.id || route.params.id
  const token = route.query.token || route.params.token
  if (id || token) {
    const { data: cards } = await getDriverCards()
    const card = cards.find((c) => (id && c.ID == id) || (token && c.token === token))
    if (card) {
      store.card = card
      const [{ data: drivers }, { data: facilities }] = await Promise.all([
        getDrivers(),
        getFacilities(),
      ])
      store.driver = drivers.find((d) => d.DriverID === card.DriverID) || null
      store.facility = facilities.find((f) => f.FacilityID === card.FacilityID) || null
      facilityIdInput.value = store.facility?.IdentityNumber || ''
      driverIdInput.value = store.driver?.IdentityNumber || ''
      populateCard()
    }
  }
})

async function checkFacility() {
  await store.findFacility(facilityIdInput.value)
  if (!store.facility) {
    newFacility.value.IdentityNumber = facilityIdInput.value
    modalFacility.value = true
  }
}

async function confirmFacility() {
  await store.createFacility(newFacility.value)
  modalFacility.value = false
}

async function checkDriver() {
  await store.findDriver(driverIdInput.value)
  if (!store.driver) {
    newDriver.value.IdentityNumber = driverIdInput.value
    newDriver.value.FacilityID = store.facility?.FacilityID || ''
    modalDriver.value = true
  } else {
    await store.findDriverCard()
    populateCard()
  }
}

async function confirmDriver() {
  await store.createDriver(newDriver.value)
  modalDriver.value = false
  await store.findDriverCard()
  populateCard()
}

function populateCard() {
  cardForm.value = {
    CardNumber: store.card?.CardNumber || '',
    CardType: store.card?.CardType || '',
    FacilityID: store.facility?.FacilityID || '',
    DriverID: store.driver?.DriverID || '',
    IssueDate: store.card?.IssueDate || '',
    ExpirationDate: store.card?.ExpirationDate || '',
    Supplier: store.card?.Supplier || '',
    addingDate: store.card?.addingDate || '',
    LastUpdate: store.card?.LastUpdate || '',
    userID: store.card?.userID || '',
  }
}

async function saveCard() {
  cardForm.value.FacilityID = store.facility?.FacilityID || ''
  cardForm.value.DriverID = store.driver?.DriverID || ''
  await store.saveCard(cardForm.value)
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiIdCard" title="Driver Card Workflow" main />

      <CardBox class="mb-6" is-form @submit.prevent="checkFacility">
        <FormField label="Facility Identity">
          <FormControl v-model="facilityIdInput" :icon="mdiDomain" />
        </FormField>
        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Next" />
          </BaseButtons>
        </template>
      </CardBox>

      <CardBox v-if="store.facility" class="mb-6" is-form @submit.prevent="checkDriver">
        <FormField label="Driver Identity">
          <FormControl v-model="driverIdInput" :icon="mdiAccount" />
        </FormField>
        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Next" />
          </BaseButtons>
        </template>
      </CardBox>

      <CardBox v-if="store.driver" class="mb-6" is-form @submit.prevent="saveCard">
        <FormField label="Card Number">
          <FormControl v-model="cardForm.CardNumber" />
        </FormField>
        <FormField label="Card Type">
          <FormControl v-model="cardForm.CardType" />
        </FormField>
        <FormField label="Issue Date">
          <FormControl v-model="cardForm.IssueDate" type="date" />
        </FormField>
        <FormField label="Expiration Date">
          <FormControl v-model="cardForm.ExpirationDate" type="date" />
        </FormField>
        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="success" label="Save" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionMain>

    <CardBoxModal
      v-model="modalFacility"
      title="Create Facility"
      button-label="Save"
      has-cancel
      @confirm="confirmFacility"
    >
      <FormField label="Identity Number">
        <FormControl v-model="newFacility.IdentityNumber" />
      </FormField>
      <FormField label="Name">
        <FormControl v-model="newFacility.Name" />
      </FormField>
    </CardBoxModal>

    <CardBoxModal
      v-model="modalDriver"
      title="Create Driver"
      button-label="Save"
      has-cancel
      @confirm="confirmDriver"
    >
      <FormField label="First Name">
        <FormControl v-model="newDriver.FirstName" />
      </FormField>
      <FormField label="Last Name">
        <FormControl v-model="newDriver.LastName" />
      </FormField>
      <FormField label="Identity Number">
        <FormControl v-model="newDriver.IdentityNumber" />
      </FormField>
    </CardBoxModal>
  </LayoutAuthenticated>
</template>
