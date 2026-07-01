<template>
  <div class="home-page">
    <div class="banner">
      <h1>大学生日结兼职服务平台</h1>
      <p>安全可靠 · 日结薪资 · 海量兼职</p>
      <el-button type="primary" size="large" @click="$router.push('/jobs')">浏览兼职</el-button>
    </div>
    <div class="features">
      <div class="feature-item">
        <el-icon class="icon"><component :is="User" /></el-icon>
        <h3>学生兼职</h3>
        <p>海量日结兼职，灵活自由</p>
      </div>
      <div class="feature-item">
        <el-icon class="icon"><component :is="OfficeBuilding" /></el-icon>
        <h3>企业入驻</h3>
        <p>发布兼职，招聘人才</p>
      </div>
      <div class="feature-item">
        <el-icon class="icon"><component :is="Wallet" /></el-icon>
        <h3>日结结算</h3>
        <p>当日完成，当日到账</p>
      </div>
    </div>
    <div class="recent-jobs">
      <h2>最新兼职</h2>
      <div class="job-list">
        <JobCard v-for="job in jobs" :key="job.id" :job="job" />
      </div>
      <div class="view-more">
        <el-button @click="$router.push('/jobs')">查看更多</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { User, OfficeBuilding, Wallet } from '@element-plus/icons-vue'
import JobCard from '../components/JobCard.vue'
import { getJobs } from '../api/jobs'

const jobs = ref([])

onMounted(async () => {
  try {
    const res = await getJobs({ page: 1, pageSize: 6 })
    jobs.value = res.data.list
  } catch (err) {
    console.error(err)
  }
})
</script>

<style scoped>
.home-page {
  padding: 20px;
}

.banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
  border-radius: 10px;
  margin-bottom: 40px;
}

.banner h1 {
  font-size: 40px;
  margin-bottom: 20px;
}

.banner p {
  font-size: 18px;
  margin-bottom: 30px;
  opacity: 0.9;
}

.features {
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;
}

.feature-item {
  text-align: center;
  padding: 30px;
}

.feature-item .icon {
  font-size: 48px;
  color: #667eea;
  margin-bottom: 20px;
}

.feature-item h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.feature-item p {
  color: #666;
}

.recent-jobs {
  max-width: 1200px;
  margin: 0 auto;
}

.recent-jobs h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.job-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.view-more {
  text-align: center;
  margin-top: 30px;
}
</style>