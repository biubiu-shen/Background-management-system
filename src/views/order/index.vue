<template>
  <div class="main">
    <BreadCrumb></BreadCrumb>
    <el-card>
      <el-form :inline="true" :model="formOrder" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="formOrder.searchOrder" placeholder="请输入内容">
            <template #append>
              <el-button icon="el-icon-search" @click="onSubmit"></el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <!-- 搜索框结束 -->
      <el-table :data="orderList" style="width: 100%" border stripe>
        <el-table-column type="index" label="#" width="50"> </el-table-column>
        <el-table-column prop="order_number" label="订单编号">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格"> </el-table-column>
        <el-table-column label="是否付款">
          <template v-slot="scope">
            <el-tag
              effect="dark"
              :type="scope.row.order_pay == 0 ? 'danger' : 'success'"
              >{{ scope.row.order_pay == 0 ? "未支付" : "已支付" }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"> </el-table-column>
        <el-table-column prop="create_time" label="下单时间"> </el-table-column>
        <el-table-column label="操作"
          ><el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
          ></el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  created () {
    this.$store.dispatch('order/setOrders', this.obj)
  },
  data () {
    return {
      obj: {
        query: null,
        pagenum: 1,
        pagesize: 10,
        user_id: null,
        pay_status: null,
        is_send: null,
        order_fapiao_title: null,
        order_fapiao_company: null,
        order_fapiao_content: null,
        consignee_addr: null
      },
      formOrder: {
        searchOrder: ''
      }
    }
  },
  methods: {
    onSubmit () { }
    // type1 (val) {
    //   return val === '0' ? 'danger' : 'success'
    // }
  },
  computed: {
    ...mapGetters(['orderList'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
