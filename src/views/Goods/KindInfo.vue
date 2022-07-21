<template>
  <div>
    <BreadCrumb></BreadCrumb>
    <el-card>
      <el-alert
        show-icon
        title="注意：只允许第三级分类设置相关参数！"
        type="warning"
        :closable="false"
      >
      </el-alert>
      <!-- 下拉 -->
      <SelectDown @staticList="getstaticList($event)" :sel="sel"></SelectDown>
      <!-- neirong -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="first">
          <TabTableList
            :list="staticList"
            :sel="sel"
            :id="id"
            @updates="getList"
          ></TabTableList>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="second">
          <TabTableList
            :list="staticList"
            :sel="sel"
            :id="id"
            @updates="getList"
          ></TabTableList>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { findCategories } from '@/api/goods'
import SelectDown from './components/SelectDown.vue'
import TabTableList from './components/TabTableList.vue'
export default {
  created () { },
  data () {
    return {
      activeName: 'first',
      staticList: [],
      sel: 'many',
      id: null
    }
  },
  methods: {
    handleClick () {
      // console.log(tab, event)
      this.sel = this.activeName === 'first' ? 'many' : 'only'
      console.log(this.sel)
      this.getList()
    },
    async getList () {
      try {
        const res = await findCategories(this.id, this.sel)
        this.staticList = res.data.data
        this.staticList.forEach(item => {
          if (item.attr_vals && item.attr_vals.length !== 0) {
            item.attr_vals = item.attr_vals.split(' ')
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    getstaticList (val) {
      this.id = val
      this.getList()
      console.log('sataic', this.staticList)
    }
  },
  computed: {
    // staticListPlus () {

    // }
  },
  watch: {},
  filters: {},
  components: {
    SelectDown,
    TabTableList
  }
}
</script>

<style scoped lang='less'>
</style>
