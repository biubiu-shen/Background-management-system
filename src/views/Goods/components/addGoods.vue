<template>
  <div class="add">
    <el-alert
      title="添加商品"
      type="info"
      center
      show-icon
      :closable="false"
      style="margin-bottom: 20px"
    >
    </el-alert>
    <el-steps :space="200" :active="1" finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
/* ::deep(.el-steps) {
  margin: 0 auto;
} */
</style>
