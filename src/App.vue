<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';

const store = useStore()

onMounted(() => {
  store.commit("INIT")
})

</script>
<style>
@import './assets/base.css';
</style>
