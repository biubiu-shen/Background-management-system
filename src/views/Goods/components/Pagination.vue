<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[1, 2, 3, 4, 5, 6]"
    :page-size="pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    total: {
      type: [String, Number],
      required: true
    },
    pagesize: {
      type: [String, Number],
      // required: true
      default: 4
    }
  },
  created () { },
  data () {
    return {
      currentPage: 1
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('changeSize', val)
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.$emit('changeNum',val)
      console.log(`当前页: ${val}`)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
