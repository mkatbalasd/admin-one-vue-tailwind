<script setup>
import { ref, watch } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment-hijri'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const innerValue = ref(null)

watch(
  () => props.modelValue,
  (val) => {
    innerValue.value = val ? moment(val, 'iYYYY-iMM-iDD').toDate() : null
  },
  { immediate: true },
)

watch(
  innerValue,
  (val) => {
    if (val) {
      emit('update:modelValue', moment(val).format('iYYYY-iMM-iDD'))
    } else {
      emit('update:modelValue', '')
    }
  },
)
</script>

<template>
  <VueDatePicker
    v-model="innerValue"
    :input-class="'px-3 py-2 h-12 w-full border rounded-sm bg-white dark:bg-slate-800 focus:ring-3 focus:outline-hidden'"
  />
</template>
