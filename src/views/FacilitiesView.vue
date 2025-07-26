<script setup>
import { ref } from 'vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableFacilities from '@/components/TableFacilities.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import { mdiTable, mdiPlus } from '@mdi/js'
import { useFacilitiesStore } from '@/stores/facilities'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useFacilitiesStore()
const showModal = ref(false)
const editing = ref(null)
const form = ref({
  IdentityNumber: '',
  Name: '',
})

function openAdd() {
  editing.value = null
  form.value = { IdentityNumber: '', Name: '' }
  showModal.value = true
}

function openEdit(facility) {
  editing.value = facility
  form.value = { ...facility }
  showModal.value = true
}

async function save() {
  if (editing.value) {
    await store.updateFacility?.(editing.value.FacilityID, form.value)
  } else {
    await store.createFacility(form.value)
  }
  showModal.value = false
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTable" title="facilities" main>
        <BaseButton
          :icon="mdiPlus"
          color="info"
          rounded-full
          small
          :label="t('addFacility')"
          @click="openAdd"
        />
      </SectionTitleLineWithButton>
      <CardBox has-table>
        <TableFacilities @edit="openEdit" />
      </CardBox>
    </SectionMain>
    <CardBoxModal v-model="showModal" title="Facility" button-label="Save" has-cancel @confirm="save">
      <FormField label="Identity Number">
        <FormControl v-model="form.IdentityNumber" />
      </FormField>
      <FormField label="Name">
        <FormControl v-model="form.Name" />
      </FormField>
    </CardBoxModal>
  </LayoutAuthenticated>
</template>
