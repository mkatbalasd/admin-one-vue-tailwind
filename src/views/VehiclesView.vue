<script setup>
import { ref } from 'vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableVehicles from '@/components/TableVehicles.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import AsyncSelect from '@/components/AsyncSelect.vue'
import BaseButton from '@/components/BaseButton.vue'
import { mdiTable, mdiPlus } from '@mdi/js'
import { useVehiclesStore } from '@/stores/vehicles'
import { searchFacilities } from '@/api/facilities'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useVehiclesStore()
const showModal = ref(false)
const editing = ref(null)
const form = ref({
  PlateNumber: '',
  SerialNumber: '',
  ManufacturingYear: '',
  FacilityID: null,
})

function openAdd() {
  editing.value = null
  form.value = { PlateNumber: '', SerialNumber: '', ManufacturingYear: '', FacilityID: null }
  showModal.value = true
}

function openEdit(vehicle) {
  editing.value = vehicle
  form.value = { ...vehicle }
  showModal.value = true
}

async function save() {
  if (editing.value) {
    await store.updateVehicle(editing.value.ID, form.value)
  } else {
    await store.createVehicle(form.value)
  }
  showModal.value = false
}

async function fetchFacilityOptions(search, offset) {
  const { data } = await searchFacilities({ search, limit: 10, offset })
  return data.map((f) => ({ label: `${f.IdentityNumber} - ${f.Name}`, value: f.FacilityID }))
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTable" title="vehicles" main>
        <BaseButton
          :icon="mdiPlus"
          color="info"
          rounded-full
          small
          :label="t('addVehicle')"
          @click="openAdd"
        />
      </SectionTitleLineWithButton>
      <CardBox has-table>
        <TableVehicles @edit="openEdit" />
      </CardBox>
    </SectionMain>
    <CardBoxModal v-model="showModal" title="Vehicle" button-label="Save" has-cancel @confirm="save">
      <FormField label="Plate Number">
        <FormControl v-model="form.PlateNumber" />
      </FormField>
      <FormField label="Serial Number">
        <FormControl v-model="form.SerialNumber" />
      </FormField>
      <FormField label="Manufacturing Year">
        <FormControl v-model="form.ManufacturingYear" />
      </FormField>
      <FormField label="Facility">
        <AsyncSelect v-model="form.FacilityID" :fetch-options="fetchFacilityOptions" />
      </FormField>
    </CardBoxModal>
  </LayoutAuthenticated>
</template>
