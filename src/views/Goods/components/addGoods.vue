<template>
  <div class="add">
    <!-- 提示框 -->
    <el-alert
      title="添加商品"
      type="info"
      center
      show-icon
      :closable="false"
      style="margin-bottom: 20px"
    >
    </el-alert>
    <!-- 步骤条 -->
    <!-- <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="18"> -->
    <el-steps
      :space="200"
      :active="active"
      finish-status="success"
      align-center
      style="margin-bottom: 20px"
    >
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <!-- </el-col>
    </el-row> -->
    <!-- aside -->
    <el-tabs tab-position="left" style="height: 200px" @tab-click="changeTab">
      <el-tab-pane label="基本信息">
        <el-form :model="obj" :rules="rules" ref="objForm">
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="obj.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
            <el-input v-model="obj.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="goods_weight">
            <el-input v-model="obj.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="goods_number">
            <el-input v-model="obj.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="goods_cat">
            <el-input v-model="obj.goods_cat"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数">配置管理</el-tab-pane>
      <el-tab-pane label="商品属性">角色管理</el-tab-pane>
      <el-tab-pane label="商品图片">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {

      fileList: [],
      active: 0,
      obj: {
        goods_name: null,
        goods_cat: null,
        goods_price: null,
        goods_number: null,
        goods_weight: null,
        goods_introduce: null,
        pics: null,
        attrs: null
      },
      rules: {
        goods_name: [
          { requierd: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    changeTab (val) {
      this.active = parseInt(val.index)
      console.log(val.index)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  },
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
/* ::v-deep .el-tab-pane {
  width: 100vh;
} */
.add {
  height: 1000px;
}
</style>
