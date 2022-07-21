<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.meta.title?$route.meta.title:'null'}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.meta.son?$route.meta.son:'null'}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  created () {
    // if(this.$route.meta){
    //   this.route.mate
    // }
    console.log('meta', this.$route.meta)
  },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
