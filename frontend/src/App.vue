<template>
  <div class="app-container">
    <NavBar v-if="!isAuthPage" />
    <div class="main-content">
      <router-view />
    </div>
    <el-footer v-if="!isAuthPage" style="text-align: center; padding: 20px;">
      大学生日结兼职服务平台 ©2024
    </el-footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'

const route = useRoute()

const isAuthPage = computed(() => {
  return ['Login', 'Register'].includes(route.name)
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>