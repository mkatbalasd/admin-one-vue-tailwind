<script setup>
import { ref, watch } from 'vue'
import DatePicker from 'vue-hijri-picker'
import 'vue-hijri-picker/dist/style.css'
import moment from 'moment-hijri'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const innerValue = ref('')

watch(
  () => props.modelValue,
  (val) => {
    innerValue.value = val ? moment(val, 'iYYYY-iMM-iDD').toISOString() : ''
  },
  { immediate: true },
)

watch(innerValue, (val) => {
  if (val) {
    emit('update:modelValue', moment(val).format('iYYYY-iMM-iDD'))
  } else {
    emit('update:modelValue', '')
  }
})
</script>

<template>
  <DatePicker
    v-model="innerValue"
    initialType="hijri"
    language="ar"
    format="iYYYY-iMM-iDD"
    :input-class="'px-3 py-2 h-12 w-full border rounded-sm bg-white dark:bg-slate-800 focus:ring-3 focus:outline-hidden'"
  />
</template>
