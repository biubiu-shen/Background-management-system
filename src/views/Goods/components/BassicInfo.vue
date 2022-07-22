<template>
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
        :props="{label:'cat_name',value:'cat_id'}"
        @change="handleChange"
      ></el-cascader>
    </el-form-item>
  </el-form>
</template>

<script>
import { GoodsKindList } from '@/api/goods'
export default {
  created () {
    this.getGoodsKindList()
  },
  data () {
    return {
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
    handleChange (value) {
      console.log(value)
    },
    async getGoodsKindList () {
      try {
        const res = await GoodsKindList(this.obj)
        this.options = res.data.data
        console.log('goods',res)
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
</style>
