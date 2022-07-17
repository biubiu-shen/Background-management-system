<template>
  <div>
    <div slot="header" class="clearfix">
      <div class="formtwo">
        <!-- form1 -->
        <el-form :inline="true" :model="formGoods" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="formGoods.searchGoods" placeholder="请输入内容">
              <template #append>
                <el-button icon="el-icon-search" @click="onSubmit"></el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <!-- form2 -->
        <el-form>
          <el-form-item>
            <el-button type="primary" @click="$router.push({ name: 'add' })"
              >添加商品</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- table -->
    <el-table :data="goodsList.goods" style="width: 100%" border stripe>
      <el-table-column type="index" label="#" width="50"> </el-table-column>
      <el-table-column prop="goods_name" label="商品名称"> </el-table-column>
      <el-table-column prop="goods_price" label="商品价格"> </el-table-column>
      <el-table-column prop="goods_weight" label="商品重量"> </el-table-column>
      <el-table-column label="创建时间">
        <template v-slot="scope">
          {{ scope.row.add_time | DateFormat }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-button size="mini" icon="el-icon-edit" type="primary">
          编辑
        </el-button>
        <el-button type="danger" size="mini" icon="el-icon-delete">
          删除
        </el-button>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block" style="margin-top: 18px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 6, 10, 15]"
        :page-size="6"
        layout="total, sizes, prev, pager, next, jumper"
        :total="goodsList.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  created () {
    this.$store.dispatch('goods/setGoodsList', this.obj)
  },
  data () {
    return {
      obj: {
        query: null,
        pagenum: 1,
        pagesize: 6
      },
      formGoods: {
        searchGoods: ''
      },
      currentPage: 1
    }
  },
  methods: {
    onSubmit () { },
    handleSizeChange (val) {
      this.obj.pagesize = val
      this.$store.dispatch('goods/setGoodsList', this.obj)
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      if (this.obj.pagenum !== val) {
        this.obj.pagenum = val
        this.$store.dispatch('goods/setGoodsList', this.obj)
      }
      // console.log(`当前页: ${val}`)
    }
  },
  computed: {
    ...mapGetters(['goodsList'])

  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
.formtwo {
  display: flex;
}
</style>
