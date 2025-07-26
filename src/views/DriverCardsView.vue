<script setup>
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import CardBox from '@/components/CardBox.vue'
import TableDriverCards from '@/components/TableDriverCards.vue'
import BaseButton from '@/components/BaseButton.vue'
import { mdiTable, mdiPlus } from '@mdi/js'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTable" title="driverCards" main>
        <BaseButton
          :to="{ name: 'driver-card-workflow' }"
          :icon="mdiPlus"
          :label="t('addDriverCard')"
          color="info"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
      <CardBox has-table>
        <TableDriverCards />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
