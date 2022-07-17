<template>
  <div class="main">
    <BreadCrumb></BreadCrumb>
    <el-card>
   <router-view></router-view>
    </el-card>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  created () {
    // this.$store.dispatch('goods/setGoodsList', this.obj)
  },
  data () {
    return {
      // obj: {
      //   query: null,
      //   pagenum: 1,
      //   pagesize: 6
      // },
      // formGoods: {
      //   searchGoods: ''
      // },
      // currentPage: 1
    }
  },
  methods: {
    // onSubmit () { },
    // handleSizeChange (val) {
    //   this.obj.pagesize = val
    //   this.$store.dispatch('goods/setGoodsList', this.obj)
    //   // console.log(`每页 ${val} 条`)
    // },
    // handleCurrentChange (val) {
    //   if (this.obj.pagenum !== val) {
    //     this.obj.pagenum = val
    //     this.$store.dispatch('goods/setGoodsList', this.obj)
    //   }
    //   // console.log(`当前页: ${val}`)
    // }
  },
  computed: {
    // ...mapGetters(['goodsList'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.main {
  height: 100vh;
  overflow: auto;
}
// .formtwo {
//   display: flex;
// }
</style>
