<template>
  <div class="applications-page">
    <el-card>
      <h2>我的申请</h2>
      <el-table :data="applications" border>
        <el-table-column prop="job_id" label="兼职ID" />
        <el-table-column prop="title" label="兼职名称" />
        <el-table-column prop="nickname" label="申请人" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">{{ getStatusText(scope.row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="work_hours" label="工时" />
        <el-table-column prop="created_at" label="申请时间" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button v-if="userStore.isCompany() && scope.row.status === 'pending'" @click="handleApprove(scope.row)">通过</el-button>
            <el-button v-if="userStore.isCompany() && scope.row.status === 'pending'" type="danger" @click="handleReject(scope.row)">拒绝</el-button>
            <el-button v-if="userStore.isCompany() && scope.row.status === 'approved'" @click="handleSettle(scope.row)">结算</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog v-model="settleDialogVisible" title="结算" width="400px">
      <el-form :model="settleForm" label-width="80px">
        <el-form-item label="工时">
          <el-input v-model.number="settleForm.work_hours" />
        </el-form-item>
        <el-form-item label="金额">
          <el-input v-model.number="settleForm.amount" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="settleDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmSettle">确认结算</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { getApplications, updateApplication } from '../api/applications'
import { createSettlement } from '../api/settlements'

const userStore = useUserStore()
const applications = ref([])
const settleDialogVisible = ref(false)
const currentApplication = ref(null)
const settleForm = ref({
  work_hours: '',
  amount: ''
})

const fetchApplications = async () => {
  try {
    const res = await getApplications()
    applications.value = res.data.list
  } catch (err) {
    console.error(err)
  }
}

const getStatusType = (status) => {
  const types = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger',
    settled: 'info'
  }
  return types[status] || 'info'
}

const getStatusText = (status) => {
  const texts = {
    pending: '待审核',
    approved: '已通过',
    rejected: '已拒绝',
    settled: '已结算'
  }
  return texts[status] || status
}

const handleApprove = async (application) => {
  try {
    await updateApplication(application.id, { status: 'approved' })
    fetchApplications()
  } catch (err) {
    console.error(err)
  }
}

const handleReject = async (application) => {
  try {
    await updateApplication(application.id, { status: 'rejected' })
    fetchApplications()
  } catch (err) {
    console.error(err)
  }
}

const handleSettle = (application) => {
  currentApplication.value = application
  settleForm.value = {
    work_hours: application.work_hours || '',
    amount: ''
  }
  settleDialogVisible.value = true
}

const confirmSettle = async () => {
  try {
    if (settleForm.value.work_hours) {
      await updateApplication(currentApplication.value.id, { work_hours: settleForm.value.work_hours })
    }
    await createSettlement({
      application_id: currentApplication.value.id,
      amount: settleForm.value.amount
    })
    settleDialogVisible.value = false
    fetchApplications()
  } catch (err) {
    console.error(err)
  }
}

onMounted(fetchApplications)
</script>

<style scoped>
.applications-page {
  padding: 20px;
}

.applications-page h2 {
  margin-bottom: 20px;
}
</style>