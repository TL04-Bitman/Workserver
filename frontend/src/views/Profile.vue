<template>
  <div class="profile-page">
    <el-card>
      <h2>个人中心</h2>
      <el-form :model="form" label-width="100px">
        <el-form-item label="手机号">
          <el-input v-model="form.phone" disabled />
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="roleText" disabled />
        </el-form-item>
        <el-form-item label="昵称" v-if="userStore.isStudent()">
          <el-input v-model="form.nickname" />
        </el-form-item>
        <el-form-item label="企业名称" v-if="userStore.isCompany()">
          <el-input v-model="form.company_name" />
        </el-form-item>
        <el-form-item label="余额">
          <el-input v-model="form.balance" disabled />
          <span style="color: #f56c6c; font-weight: bold;">¥{{ form.balance }}</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUpdate">更新</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { getProfile, updateProfile } from '../api/users'

const userStore = useUserStore()

const form = ref({
  phone: '',
  nickname: '',
  company_name: '',
  balance: 0
})

const roleText = computed(() => {
  const texts = {
    student: '学生',
    company: '企业',
    admin: '管理员'
  }
  return texts[userStore.userInfo?.role] || userStore.userInfo?.role
})

onMounted(async () => {
  try {
    const res = await getProfile()
    form.value = res.data
  } catch (err) {
    console.error(err)
  }
})

const handleUpdate = async () => {
  try {
    await updateProfile({
      nickname: form.value.nickname,
      company_name: form.value.company_name
    })
  } catch (err) {
    console.error(err)
  }
}
</script>

<style scoped>
.profile-page {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.profile-page h2 {
  margin-bottom: 30px;
}
</style>