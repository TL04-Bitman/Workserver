<template>
  <div class="job-detail-page">
    <el-card v-if="job">
      <div class="job-header">
        <h1>{{ job.title }}</h1>
        <span class="job-type">{{ job.type }}</span>
      </div>
      <div class="job-info">
        <div class="info-item">
          <el-icon><component :is="Wallet" /></el-icon>
          <span>薪资：¥{{ job.wage }}/{{ job.type === '日结' ? '天' : '小时' }}</span>
        </div>
        <div class="info-item">
          <el-icon><component :is="Clock" /></el-icon>
          <span>工作时间：{{ job.work_time }}</span>
        </div>
        <div class="info-item">
          <el-icon><component :is="MapLocation" /></el-icon>
          <span>工作地点：{{ job.location }}</span>
        </div>
        <div class="info-item">
          <el-icon><component :is="OfficeBuilding" /></el-icon>
          <span>企业名称：{{ job.company_name }}</span>
        </div>
      </div>
      <div class="job-section">
        <h3>兼职描述</h3>
        <p>{{ job.description }}</p>
      </div>
      <div class="job-section" v-if="job.requirements">
        <h3>任职要求</h3>
        <p>{{ job.requirements }}</p>
      </div>
      <div class="job-actions">
        <el-button type="primary" @click="handleApply" v-if="userStore.isStudent() && !applied">申请兼职</el-button>
        <el-button disabled v-else-if="applied">已申请</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Wallet, Clock, MapLocation, OfficeBuilding } from '@element-plus/icons-vue'
import { useUserStore } from '../stores/user'
import { getJobDetail } from '../api/jobs'
import { createApplication } from '../api/applications'

const route = useRoute()
const userStore = useUserStore()
const job = ref(null)
const applied = ref(false)

onMounted(async () => {
  try {
    const res = await getJobDetail(route.params.id)
    job.value = res.data
  } catch (err) {
    console.error(err)
  }
})

const handleApply = async () => {
  try {
    await createApplication({ job_id: job.value.id })
    applied.value = true
  } catch (err) {
    console.error(err)
  }
}
</script>

<style scoped>
.job-detail-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.job-header h1 {
  font-size: 28px;
}

.job-type {
  background: #ecf5ff;
  color: #409eff;
  padding: 5px 15px;
  border-radius: 4px;
}

.job-info {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
}

.job-section {
  margin-bottom: 30px;
}

.job-section h3 {
  font-size: 18px;
  margin-bottom: 15px;
}

.job-section p {
  color: #666;
  line-height: 1.8;
}

.job-actions {
  text-align: center;
  margin-top: 30px;
}
</style>