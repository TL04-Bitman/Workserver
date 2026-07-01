<template>
  <div class="auth-page">
    <div class="auth-left">
      <div class="platform-info">
        <h1>大学生日结兼职服务平台</h1>
        <div class="features">
          <div class="feature-item">
            <div class="feature-icon">
              <el-icon><component :is="Aim" /></el-icon>
            </div>
            <span>高匹配性</span>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <el-icon><component :is="Lightning" /></el-icon>
            </div>
            <span>便捷性</span>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <el-icon><component :is="Lock" /></el-icon>
            </div>
            <span>真实性</span>
          </div>
        </div>
        <p class="slogan">安全可靠 · 日结薪资 · 海量兼职</p>
      </div>
    </div>
    <div class="auth-right">
      <div class="auth-card">
        <h2>登录</h2>
        <el-tabs v-model="activeTab" type="card" class="login-tabs">
          <el-tab-pane label="密码登录" name="password">
            <el-form :model="passwordForm" :rules="passwordRules" ref="passwordFormRef" label-width="80px">
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="passwordForm.phone" placeholder="请输入手机号" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="passwordForm.password" type="password" placeholder="请输入密码" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handlePasswordLogin" :loading="loading" style="width: 100%;">登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="验证码登录" name="sms">
            <el-form :model="smsForm" :rules="smsRules" ref="smsFormRef" label-width="80px">
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="smsForm.phone" placeholder="请输入手机号" />
              </el-form-item>
              <el-form-item label="验证码" prop="smsCode">
                <el-row :gutter="10">
                  <el-col :span="16">
                    <el-input v-model="smsForm.smsCode" placeholder="请输入验证码" />
                  </el-col>
                  <el-col :span="8">
                    <el-button type="primary" @click="handleSendLoginCode" :loading="smsLoading" :disabled="!canSendCode" style="width: 100%;">
                      {{ sendButtonText }}
                    </el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleSmsLogin" :loading="loading" style="width: 100%;">登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <el-form-item style="margin-bottom: 0;">
          <span class="link-text" @click="$router.push('/register')">还没有账号？立即注册</span>
        </el-form-item>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Aim, Lightning, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '../stores/user'
import api from '../api/auth'

const router = useRouter()
const userStore = useUserStore()
const passwordFormRef = ref()
const smsFormRef = ref()
const loading = ref(false)
const smsLoading = ref(false)
const countdown = ref(0)

const activeTab = ref('password')

const passwordForm = ref({
  phone: '',
  password: ''
})

const smsForm = ref({
  phone: '',
  smsCode: ''
})

const passwordRules = {
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const smsRules = {
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  smsCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
}

const canSendCode = computed(() => {
  return countdown.value === 0 && smsForm.value.phone.length === 11
})

const sendButtonText = computed(() => {
  if (countdown.value > 0) {
    return `${countdown.value}秒后重新获取`
  }
  return '获取验证码'
})

const handlePasswordLogin = async () => {
  if (!passwordFormRef.value.validate()) return
  
  loading.value = true
  try {
    await userStore.login(passwordForm.value.phone, passwordForm.value.password)
    router.push('/')
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const handleSendLoginCode = async () => {
  smsLoading.value = true
  try {
    await api.sendLoginCode(smsForm.value.phone)
    countdown.value = 60
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value === 0) {
        clearInterval(timer)
      }
    }, 1000)
  } catch (err) {
    console.error(err)
  } finally {
    smsLoading.value = false
  }
}

const handleSmsLogin = async () => {
  if (!smsFormRef.value.validate()) return
  
  loading.value = true
  try {
    await userStore.loginBySms(smsForm.value.phone, smsForm.value.smsCode)
    router.push('/')
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  display: flex;
  height: 100vh;
}

.auth-left {
  flex: 1;
  background: linear-gradient(135deg, #a8c0ff 0%, #3f5efb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
}

.platform-info {
  text-align: center;
  color: #fff;
}

.platform-info h1 {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 60px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.features {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-bottom: 40px;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.feature-icon {
  width: 70px;
  height: 70px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.feature-item span {
  font-size: 18px;
  font-weight: 500;
}

.slogan {
  font-size: 16px;
  opacity: 0.8;
  letter-spacing: 2px;
}

.auth-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
}

.auth-card {
  width: 450px;
  padding: 50px 40px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.auth-card h2 {
  text-align: center;
  margin-bottom: 35px;
  font-size: 24px;
  color: #303133;
}

.login-tabs {
  margin-bottom: 20px;
}

.link-text {
  color: #409eff;
  cursor: pointer;
  font-size: 14px;
}

.link-text:hover {
  text-decoration: underline;
}
</style>