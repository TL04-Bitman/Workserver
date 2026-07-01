<template>
  <el-header class="navbar-header" style="height: 60px; line-height: 60px;">
    <div class="navbar-container">
      <div class="navbar-left">
        <div class="logo" @click="$router.push('/')">
          <el-icon class="logo-icon"><component :is="Briefcase" /></el-icon>
          <span>大学生日结兼职平台</span>
        </div>
      </div>
      
      <div class="navbar-center">
        <div class="nav-items">
          <div 
            class="nav-item" 
            :class="{ active: activeMenu === '/' }"
            @click="$router.push('/')"
          >
            <el-icon><component :is="HomeFilled" /></el-icon>
            <span>首页</span>
          </div>
          <div 
            class="nav-item" 
            :class="{ active: activeMenu === '/jobs' }"
            @click="$router.push('/jobs')"
          >
            <el-icon><component :is="Grid" /></el-icon>
            <span>兼职列表</span>
          </div>
          <div 
            class="nav-item" 
            :class="{ active: activeMenu === '/applications' }"
            @click="handleNavClick('/applications')"
          >
            <el-icon><component :is="List" /></el-icon>
            <span>我的申请</span>
          </div>
          <div 
            class="nav-item" 
            :class="{ active: activeMenu === '/settlements' }"
            @click="handleNavClick('/settlements')"
          >
            <el-icon><component :is="Wallet" /></el-icon>
            <span>结算记录</span>
          </div>
          <div 
            class="nav-item" 
            :class="{ active: activeMenu === '/job/create' }"
            v-if="userStore.isCompany() || userStore.isAdmin()"
            @click="$router.push('/job/create')"
          >
            <el-icon><component :is="Plus" /></el-icon>
            <span>发布兼职</span>
          </div>
        </div>
      </div>
      
      <div class="navbar-right">
        <div v-if="!userStore.isLoggedIn()" class="auth-buttons">
          <el-button type="primary" @click="$router.push('/login')" round>登录</el-button>
          <el-button @click="$router.push('/register')" round>注册</el-button>
        </div>
        <el-dropdown v-else class="user-dropdown">
          <span class="user-info">
            <el-icon class="user-icon"><component :is="User" /></el-icon>
            <span>{{ userStore.userInfo?.nickname || userStore.userInfo?.phone }}</span>
            <el-icon class="arrow-icon"><component :is="ArrowDown" /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="$router.push('/profile')">
                <el-icon><component :is="UserFilled" /></el-icon>
                <span>个人中心</span>
              </el-dropdown-item>
              <el-dropdown-item divided @click="handleLogout">
                <el-icon><component :is="SwitchButton" /></el-icon>
                <span>退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        
        <div class="mobile-menu-btn" @click="toggleMobileMenu">
          <el-icon><component :is="Menu" /></el-icon>
        </div>
      </div>
    </div>
    
    <div class="mobile-menu" v-if="showMobileMenu">
      <div class="mobile-nav-items">
        <div 
          class="mobile-nav-item" 
          :class="{ active: activeMenu === '/' }"
          @click="handleMobileNavClick('/')"
        >
          <el-icon><component :is="HomeFilled" /></el-icon>
          <span>首页</span>
        </div>
        <div 
          class="mobile-nav-item" 
          :class="{ active: activeMenu === '/jobs' }"
          @click="handleMobileNavClick('/jobs')"
        >
          <el-icon><component :is="Grid" /></el-icon>
          <span>兼职列表</span>
        </div>
        <div 
          class="mobile-nav-item" 
          :class="{ active: activeMenu === '/applications' }"
          @click="handleMobileNavClick('/applications')"
        >
          <el-icon><component :is="List" /></el-icon>
          <span>我的申请</span>
        </div>
        <div 
          class="mobile-nav-item" 
          :class="{ active: activeMenu === '/settlements' }"
          @click="handleMobileNavClick('/settlements')"
        >
          <el-icon><component :is="Wallet" /></el-icon>
          <span>结算记录</span>
        </div>
        <div 
          class="mobile-nav-item" 
          :class="{ active: activeMenu === '/job/create' }"
          v-if="userStore.isCompany() || userStore.isAdmin()"
          @click="handleMobileNavClick('/job/create')"
        >
          <el-icon><component :is="Plus" /></el-icon>
          <span>发布兼职</span>
        </div>
      </div>
    </div>
  </el-header>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  Briefcase, 
  HomeFilled, 
  Grid, 
  List, 
  Wallet, 
  Plus, 
  User, 
  UserFilled,
  ArrowDown,
  SwitchButton,
  Menu
} from '@element-plus/icons-vue'
import { useUserStore } from '../stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const activeMenu = computed(() => route.path)
const showMobileMenu = ref(false)

const handleNavClick = (path) => {
  if (!userStore.isLoggedIn()) {
    router.push('/login')
    return
  }
  router.push(path)
}

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const handleMobileNavClick = (path) => {
  if (!userStore.isLoggedIn() && (path === '/applications' || path === '/settlements')) {
    router.push('/login')
    showMobileMenu.value = false
    return
  }
  router.push(path)
  showMobileMenu.value = false
}
</script>

<style scoped>
.navbar-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 999;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.navbar-left {
  flex-shrink: 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.logo:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.logo-icon {
  font-size: 24px;
}

.navbar-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-items {
  display: flex;
  align-items: center;
  gap: 2px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 20px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 15px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.nav-item.active {
  background-color: rgba(255, 255, 255, 0.25);
  color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.navbar-right {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

.auth-buttons .el-button {
  padding: 6px 20px;
  font-size: 14px;
}

.auth-buttons .el-button--primary {
  background-color: #fff;
  color: #667eea;
  border-color: #fff;
}

.auth-buttons .el-button--primary:hover {
  background-color: rgba(255, 255, 255, 0.9);
}

.user-dropdown {
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  padding: 8px 16px;
  border-radius: 20px;
  transition: background-color 0.3s;
}

.user-info:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.user-icon {
  font-size: 18px;
}

.arrow-icon {
  font-size: 12px;
}

.mobile-menu-btn {
  display: none;
  color: #fff;
  font-size: 24px;
  padding: 8px 12px;
  cursor: pointer;
}

.mobile-menu {
  display: none;
  background-color: #667eea;
  padding: 10px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.mobile-nav-items {
  display: flex;
  flex-direction: column;
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.mobile-nav-item:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.mobile-nav-item.active {
  background-color: rgba(255, 255, 255, 0.25);
  color: #fff;
}

@media (max-width: 768px) {
  .navbar-center {
    display: none;
  }
  
  .mobile-menu-btn {
    display: flex;
    align-items: center;
  }
  
  .mobile-menu {
    display: block;
  }
}
</style>