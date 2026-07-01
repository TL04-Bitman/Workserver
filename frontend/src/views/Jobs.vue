<template>
  <div class="jobs-page">
    <div class="search-bar">
      <el-input v-model="keyword" placeholder="搜索兼职" @keyup.enter="handleSearch" />
      <el-select v-model="type" placeholder="选择类型">
        <el-option label="全部" value="" />
        <el-option label="日结" value="日结" />
        <el-option label="小时结" value="小时结" />
      </el-select>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
    </div>
    <div class="job-list">
      <JobCard v-for="job in jobs" :key="job.id" :job="job" />
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="page"
        :page-size="pageSize"
        :total="total"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import JobCard from '../components/JobCard.vue'
import { getJobs } from '../api/jobs'

const keyword = ref('')
const type = ref('')
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const jobs = ref([])

const fetchJobs = async () => {
  try {
    const res = await getJobs({ page: page.value, type: type.value, keyword: keyword.value })
    jobs.value = res.data.list
    total.value = res.data.pagination.total
  } catch (err) {
    console.error(err)
  }
}

const handleSearch = () => {
  page.value = 1
  fetchJobs()
}

const handlePageChange = (newPage) => {
  page.value = newPage
  fetchJobs()
}

onMounted(fetchJobs)
</script>

<style scoped>
.jobs-page {
  padding: 20px;
}

.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}

.search-bar .el-input {
  width: 300px;
}

.search-bar .el-select {
  width: 150px;
}

.job-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.pagination {
  text-align: center;
  margin-top: 30px;
}
</style>