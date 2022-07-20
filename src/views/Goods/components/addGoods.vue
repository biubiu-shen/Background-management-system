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
        <BassicInfo></BassicInfo>
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
      <el-tab-pane label="商品内容">
        <quillEditor></quillEditor>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import BassicInfo from './BassicInfo.vue'
export default {
  created () { },
  data () {
    return {

      fileList: [],
      active: 0
    }
  },
  methods: {
    changeTab (val) {
      this.active = parseInt(val.index)
      console.log(val.index)
    },
    // 图片事件
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
    },
    // 图片事件结束
    // 下拉选择
    handleChange (value) {
      console.log(value)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    quillEditor,
    BassicInfo
  }
}
</script>

<style scoped lang="less">
.add {
  height: 100vh;
}
/deep/.el-tabs--left {
  overflow: unset;
}
</style>
