<template>
  <div class="create-job-page">
    <el-card>
      <h2>发布兼职</h2>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="兼职标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入兼职标题" />
        </el-form-item>
        <el-form-item label="兼职描述" prop="description">
          <el-input v-model="form.description" type="textarea" :rows="4" placeholder="请输入兼职描述" />
        </el-form-item>
        <el-form-item label="结算方式" prop="type">
          <el-select v-model="form.type">
            <el-option label="日结" value="日结" />
            <el-option label="小时结" value="小时结" />
          </el-select>
        </el-form-item>
        <el-form-item label="薪资" prop="wage">
          <el-input v-model.number="form.wage" placeholder="请输入薪资" />
          <span>{{ form.type === '日结' ? '元/天' : '元/小时' }}</span>
        </el-form-item>
        <el-form-item label="工作时间" prop="work_time">
          <el-input v-model="form.work_time" placeholder="请输入工作时间" />
        </el-form-item>
        <el-form-item label="工作地点" prop="location">
          <el-input v-model="form.location" placeholder="请输入工作地点" />
        </el-form-item>
        <el-form-item label="任职要求" prop="requirements">
          <el-input v-model="form.requirements" type="textarea" :rows="3" placeholder="请输入任职要求" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit" :loading="loading">发布</el-button>
          <el-button @click="$router.back()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createJob } from '../api/jobs'

const router = useRouter()
const formRef = ref()
const loading = ref(false)

const form = ref({
  title: '',
  description: '',
  type: '日结',
  wage: '',
  work_time: '',
  location: '',
  requirements: ''
})

const rules = {
  title: [{ required: true, message: '请输入兼职标题', trigger: 'blur' }],
  description: [{ required: true, message: '请输入兼职描述', trigger: 'blur' }],
  wage: [{ required: true, message: '请输入薪资', trigger: 'blur' }],
  work_time: [{ required: true, message: '请输入工作时间', trigger: 'blur' }]
}

const handleSubmit = async () => {
  if (!formRef.value.validate()) return
  
  loading.value = true
  try {
    await createJob(form.value)
    router.push('/jobs')
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.create-job-page {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.create-job-page h2 {
  margin-bottom: 30px;
}
</style>