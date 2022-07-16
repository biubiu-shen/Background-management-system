<template>
  <div class="bfc">
    <bread-crumb></bread-crumb>
    <el-card>
      <el-table :data="tableData" style="width: 100%" border stripe>
        <el-table-column prop="id" label="#" width="80"> </el-table-column>
        <el-table-column prop="authName" label="权限名称">
        </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column label="权限等级">
          <template v-slot="scope">
            <el-tag>{{ scope.row.pid }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
// import BreadCrumb from '@/components/BreadCrumb.vue'
import { rightList } from '@/api/premiss'
export default {
  created () {
    this.getRights()
  },
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    async getRights () {
      try {
        const res = await rightList('list')
        this.tableData = res.data.data
        console.log(this.tableData)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.bfc {
  height: 100vh;
  overflow: auto;
}
</style>
