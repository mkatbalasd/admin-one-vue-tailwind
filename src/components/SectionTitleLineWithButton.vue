<script setup>
import { mdiCog } from '@mdi/js'
import { useSlots, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseIcon from '@/components/BaseIcon.vue'
import BaseButton from '@/components/BaseButton.vue'
import IconRounded from '@/components/IconRounded.vue'

defineProps({
  icon: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    required: true,
  },
  main: Boolean,
})

const hasSlot = computed(() => useSlots().default)
const { t } = useI18n()
</script>

<template>
  <section :class="{ 'pt-6': !main }" class="mb-6 flex items-center justify-between">
    <div class="flex items-center justify-start">
      <IconRounded v-if="icon && main" :icon="icon" color="light" class="me-3" bg />
      <BaseIcon v-else-if="icon" :path="icon" class="me-2" size="20" />
      <h1 :class="main ? 'text-3xl' : 'text-2xl'" class="leading-tight">
        {{ t(title) }}
      </h1>
    </div>
    <slot v-if="hasSlot" />
    <BaseButton v-else :icon="mdiCog" color="whiteDark" />
  </section>
</template>
