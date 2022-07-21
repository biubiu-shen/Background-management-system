<template>
  <div>
    <BreadCrumb></BreadCrumb>
    <el-card>
      <el-button type="primary" @click="isdialogKind = true"
        >添加分类</el-button
      >
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px; margin-top: 20px"
        row-key="cat_id"
        border
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column type="index" label="#" width="50"> </el-table-column>
        <el-table-column prop="cat_name" label="分类名称"> </el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效">
          <template v-slot="scope">
            <i
              :class="
                scope.row.cat_deleted ? 'el-icon-error' : 'el-icon-success'
              "
              :style="scope.row.cat_deleted ? 'color:red' : 'color:green'"
            ></i>
          </template>
        </el-table-column>
        <el-table-column prop="cat_level" label="排序">
          <template v-slot="scope1">
            <el-tag :type="kindType(scope1.row.cat_level)"
              >{{ scope1.row.cat_level - 0 + 1 }}级</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" size="mini" icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" icon="el-icon-delete"
            >删除</el-button
          >
        </el-table-column>
      </el-table>
      <Pagination
        :total="total"
        @changeSize="changeSize($event)"
        @changeNum="changeNum($event)"
      ></Pagination>
    </el-card>
    <el-dialog title="添加分类" :visible.sync="isdialogKind">
      <el-form label-width="100px" :model="formGoodsKind" :rules="rules">
        <el-form-item label="分类名称:" prop="cat_name">
          <el-input v-model="formGoodsKind.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类:">
          <el-cascader
            v-model="formGoodsKind.cat_level"
            :options="tableData"
            :props="{
              checkStrictly: true,
              label: 'cat_name',
              value: 'cat_level',
            }"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// 提交还没做
import { GoodsKindList } from '@/api/goods'
import Pagination from './components/Pagination.vue'
export default {
  created () {
    this.getGoodsKList()
  },
  data () {
    return {
      formGoodsKind: {
        cat_pid: null,
        cat_name: null,
        cat_level: null
      },
      // options: [],
      isdialogKind: false,
      tableData: [],
      obj: {
        pagesize: 4,
        pagenum: 1
      },
      total: 0,
      rules: {
        cat_name: [
          { required: true, message: '商民名称不可以为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async getGoodsKList () {
      try {
        const res = await GoodsKindList(this.obj)
        this.tableData = res.data.data.result
        this.total = res.data.data.total
        console.log('res', res)
        console.log(this.tableData)
      } catch (err) {
        console.log(err)
      }
    },
    changeSize (val) {
      this.obj.pagesize = val
      this.getGoodsKList()
    },
    changeNum (val) {
      this.obj.pagenum = val
      this.getGoodsKList()
    },
    kindType (val) {
      if (val - 0 === 0) {
        return ''
      } else if (val - 0 === 1) {
        return 'success'
      } else {
        return 'warning'
      }
    }
  },
  computed: {
  },
  watch: {},
  filters: {},
  components: {
    Pagination
  }
}
</script>

<style scoped lang='less'>
</style>
