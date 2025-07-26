<script setup>
import { ref } from 'vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableDrivers from '@/components/TableDrivers.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import AsyncSelect from '@/components/AsyncSelect.vue'
import BaseButton from '@/components/BaseButton.vue'
import { mdiTable, mdiPlus } from '@mdi/js'
import { useDriversStore } from '@/stores/drivers'
import { searchFacilities } from '@/api/facilities'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useDriversStore()
const showModal = ref(false)
const editing = ref(null)
const form = ref({
  FirstName: '',
  LastName: '',
  IdentityNumber: '',
  FacilityID: null,
})

function openAdd() {
  editing.value = null
  form.value = { FirstName: '', LastName: '', IdentityNumber: '', FacilityID: null }
  showModal.value = true
}

function openEdit(driver) {
  editing.value = driver
  form.value = { ...driver }
  showModal.value = true
}

async function save() {
  if (editing.value) {
    await store.updateDriver(editing.value.DriverID, form.value)
  } else {
    await store.createDriver(form.value)
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
      <SectionTitleLineWithButton :icon="mdiTable" title="drivers" main>
        <BaseButton
          :icon="mdiPlus"
          color="info"
          rounded-full
          small
          :label="t('addDriver')"
          @click="openAdd"
        />
      </SectionTitleLineWithButton>
      <CardBox has-table>
        <TableDrivers @edit="openEdit" />
      </CardBox>
    </SectionMain>
    <CardBoxModal v-model="showModal" title="Driver" button-label="Save" has-cancel @confirm="save">
      <FormField label="First Name">
        <FormControl v-model="form.FirstName" />
      </FormField>
      <FormField label="Last Name">
        <FormControl v-model="form.LastName" />
      </FormField>
      <FormField label="Identity Number">
        <FormControl v-model="form.IdentityNumber" />
      </FormField>
      <FormField label="Facility">
        <AsyncSelect v-model="form.FacilityID" :fetch-options="fetchFacilityOptions" />
      </FormField>
    </CardBoxModal>
  </LayoutAuthenticated>
</template>
