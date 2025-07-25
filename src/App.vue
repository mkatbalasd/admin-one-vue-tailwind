<script setup>
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
</script>

<template>
  <div :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <RouterView />
  </div>
</template>
