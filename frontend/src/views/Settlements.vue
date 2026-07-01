<template>
  <div class="settlements-page">
    <el-card>
      <h2>结算记录</h2>
      <el-table :data="settlements" border>
        <el-table-column prop="id" label="结算ID" />
        <el-table-column prop="title" label="兼职名称" />
        <el-table-column prop="nickname" label="学生" />
        <el-table-column prop="amount" label="金额">
          <template #default="scope">
            <span style="color: #f56c6c; font-weight: bold;">¥{{ scope.row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag type="success">{{ scope.row.status === 'completed' ? '已完成' : scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="结算时间" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getSettlements } from '../api/settlements'

const settlements = ref([])

onMounted(async () => {
  try {
    const res = await getSettlements()
    settlements.value = res.data.list
  } catch (err) {
    console.error(err)
  }
})
</script>

<style scoped>
.settlements-page {
  padding: 20px;
}

.settlements-page h2 {
  margin-bottom: 20px;
}
</style>