<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  fetchOptions: {
    type: Function,
    required: true,
  },
  labelField: {
    type: String,
    default: 'label',
  },
  valueField: {
    type: String,
    default: 'value',
  },
  modelValue: {
    type: [String, Number, Object],
    default: null,
  },
})

const emit = defineEmits(['update:modelValue'])

const search = ref('')
const options = ref([])
const listEl = ref(null)
let offset = 0
let loading = false

const computedValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

async function load(initial = false) {
  if (loading) return
  loading = true
  if (initial) {
    offset = 0
  }

  const items = await props.fetchOptions(search.value, offset)
  if (initial) {
    options.value = items
  } else {
    options.value = [...options.value, ...items]
  }
  offset += items.length
  loading = false
}

function select(option) {
  computedValue.value = option[props.valueField]
}

function handleScroll() {
  if (!listEl.value) return
  const { scrollTop, clientHeight, scrollHeight } = listEl.value
  if (scrollTop + clientHeight >= scrollHeight - 20) {
    load()
  }
}

onMounted(() => {
  load(true)
  if (listEl.value) listEl.value.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  if (listEl.value) listEl.value.removeEventListener('scroll', handleScroll)
})

watch(search, () => {
  load(true)
})
</script>

<template>
  <div>
    <input
      v-model="search"
      type="text"
      class="px-3 py-2 h-12 w-full border rounded bg-white dark:bg-slate-800 focus:ring-3 focus:outline-hidden"
      placeholder="Search..."
    />
    <div
      ref="listEl"
      class="border rounded mt-1 max-h-60 overflow-y-auto bg-white dark:bg-slate-800"
    >
      <div
        v-for="option in options"
        :key="option[valueField]"
        class="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700"
        :class="{ 'bg-gray-200 dark:bg-slate-700': computedValue === option[valueField] }"
        @click="select(option)"
      >
        {{ option[labelField] }}
      </div>
    </div>
  </div>
</template>
