<template>
  <el-form label-width="120px">
    <el-form-item label="选择商品分类：">
      <el-cascader
        ref="select"
        v-model="formArr"
        :options="option"
        :props="{ label: 'cat_name', value: 'cat_id' }"
        clearable
        @visible-change="things($event)"
      ></el-cascader>
      <!-- :props="{ checkStrictly: true, label: 'cat_name', value: 'cat_id' }" -->
    </el-form-item>
  </el-form>
</template>

<script>
import { GoodsKindList } from '@/api/goods'
export default {
  name: 'SelectDown',
  props: {
    sel: {
      type: String,
      required: true
    }
  },
  created () {
    this.getGoodsKList()
  },
  data () {
    return {
      option: [],
      formArr: '',
      obj: {
        pagesize: 4,
        pagenum: 1
      }
      // jingtai: [],
      // dongtai: []
    }
  },
  methods: {
    async getGoodsKList () {
      try {
        const res = await GoodsKindList(this.obj)
        this.option = res.data.data.result
        // this.total = res.data.data.total
        console.log('option', this.option)
        console.log('res', res)
      } catch (err) {
        console.log(err)
      }
    },
    async things (val) {
      if (!val) {
        // console.log(this.$refs.select.getCheckedNodes()[0].level)
        if (this.$refs.select.getCheckedNodes()[0] && this.$refs.select.getCheckedNodes()[0].level - 0 === 3) {
          const id = this.$refs.select.getCheckedNodes()[0].data.cat_id - 0
          console.log(id)
          // const sel = 'only'
          this.$emit('staticList', id)
          // try {
          //   const res = await findCategories(id, this.sel)
          //   this.$emit('staticList', res.data.data)
          //   // this.jingtai = res.data
          //   // console.log(this.jingtai)
          // } catch (err) {
          //   console.log(err)
          // }
          this.$message.success('success')
        } else {
          this.$nextTick(function () {
            this.formArr = ''
            console.log(this.formArr)
            this.$message.error('只允许第三级分类设置相关参数！ ')
          })
        }
      }
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
