<script setup>
import { computed } from 'vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
  modelValue: {
    type: Number,
    default: 0,
  },
  maxVisible: {
    type: Number,
    default: 5,
  },
})

const emit = defineEmits(['update:modelValue'])

const { t } = useI18n()

const pages = computed(() => {
  const total = props.total
  const max = props.maxVisible
  const current = props.modelValue
  if (total <= max) {
    return Array.from({ length: total }, (_, i) => i)
  }

  const half = Math.floor(max / 2)
  let start = current - half
  let end = current + half

  if (max % 2 === 0) {
    end -= 1
  }

  if (start < 0) {
    end += -start
    start = 0
  }
  if (end > total - 1) {
    start -= end - (total - 1)
    end = total - 1
  }

  start = Math.max(0, start)
  end = Math.min(total - 1, end)

  const list = []

  if (start > 0) {
    list.push(0)
    if (start > 1) list.push('...')
  }

  for (let i = start; i <= end; i++) list.push(i)

  if (end < total - 1) {
    if (end < total - 2) list.push('...')
    list.push(total - 1)
  }

  return list
})

function select(page) {
  if (page === '...' || page < 0 || page >= props.total) return
  emit('update:modelValue', page)
}
</script>

<template>
  <BaseButtons type="justify-center">
    <BaseButton
      :label="t('previous')"
      color="whiteDark"
      small
      :disabled="modelValue <= 0"
      @click="select(modelValue - 1)"
    />
    <BaseButton
      v-for="(page, index) in pages"
      :key="index"
      :label="page === '...' ? '...' : page + 1"
      :active="page === modelValue"
      :disabled="page === '...'"
      :color="page === modelValue ? 'lightDark' : 'whiteDark'"
      small
      @click="select(page)"
    />
    <BaseButton
      :label="t('next')"
      color="whiteDark"
      small
      :disabled="modelValue >= total - 1"
      @click="select(modelValue + 1)"
    />
  </BaseButtons>
</template>
