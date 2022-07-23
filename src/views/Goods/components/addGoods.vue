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
        <!-- <BassicInfo></BassicInfo> -->
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
            <el-cascader
              v-model="obj.goods_cat"
              :options="options"
              :props="{ label: 'cat_name', value: 'cat_id' }"
              @change="handleChange"
            ></el-cascader>
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
          :file-list="fileList"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容">
        <quillEditor style="height: 200px; margin-bottom: 18px"></quillEditor>
        <el-button
          type="primary"
          @click="onsubmit"
          style="margin-top: 80px; overflow: hidden"
          >提交</el-button
        >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { GoodsKindList, addGoods } from '@/api/goods'

import { quillEditor } from 'vue-quill-editor'
// import BassicInfo from './BassicInfo.vue'
export default {
  created () {
    this.getGoodsKindList()
  },
  data () {
    return {
      fileList: [],
      active: 0,
      obj: {
        goods_name: null,
        goods_cat: null,
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce: null,
        pics: null,
        attrs: null
      },
      rules: {
        goods_name: [
          { required: true, message: '用户名不可以为空', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '', trigger: 'blur' }
        ]
      },
      options: []
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
    // 图片事件结束
    // 下拉选择
    handleChange (value) {
      console.log(value)
    },
    async onsubmit () {
      this.obj.goods_cat = this.obj.goods_cat.join(',')

      try {
        const res = await addGoods(this.obj)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
      console.log('obj', this.obj)
    },
    // handleChange (value) {
    //   console.log(value)
    // },
    async getGoodsKindList () {
      // console.log(this.obj.goods_cat)
      try {
        const res = await GoodsKindList(this.obj)
        this.options = res.data.data
        console.log('goods', res)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    quillEditor
    // BassicInfo
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
