<template>
  <el-card class="job-card" @click="$router.push(`/job/${job.id}`)">
    <div class="job-header">
      <h3 class="job-title">{{ job.title }}</h3>
      <span class="job-type">{{ job.type }}</span>
    </div>
    <p class="job-desc">{{ job.description }}</p>
    <div class="job-info">
      <span class="wage">¥{{ job.wage }}/{{ job.type === '日结' ? '天' : '小时' }}</span>
      <span class="time">{{ job.work_time }}</span>
      <span class="location">{{ job.location }}</span>
    </div>
    <div class="job-footer">
      <span class="company">{{ job.company_name }}</span>
      <span class="status" :class="job.status">{{ job.status === 'active' ? '进行中' : '已结束' }}</span>
    </div>
  </el-card>
</template>

<script setup>
defineProps({
  job: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.job-card {
  cursor: pointer;
  transition: all 0.3s;
}

.job-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.job-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.job-type {
  background: #ecf5ff;
  color: #409eff;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.job-desc {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 15px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.job-info {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 15px;
}

.wage {
  color: #f56c6c;
  font-weight: bold;
  font-size: 16px;
}

.time, .location {
  color: #999;
  font-size: 14px;
}

.job-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.company {
  color: #666;
  font-size: 14px;
}

.status {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
}

.status.active {
  background: #f0f9eb;
  color: #67c23a;
}

.status.deleted {
  background: #fef0f0;
  color: #f56c6c;
}
</style>