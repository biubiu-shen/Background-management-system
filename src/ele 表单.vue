<template>
  <div>
    <el-button type="primary" icon="el-icon-edit" circle></el-button>
    <el-button type="warning" icon="el-icon-s-release" circle></el-button>
    <!-- 表单固定写法，缺一不可，在总的表单上使用model绑定之后需要提交的数据集合 -->
    <!-- rules中是需要校验的数据与条件，校验的名字必须和v-model绑定的名字一样 -->
    <!-- 必须有prop属性 -->
    <el-form label-width="100px" :model="loginFrom" :rules="rules">
      <el-form-item label="username" prop="username">
        <el-input v-model="loginFrom.username"></el-input>
      </el-form-item>
    </el-form>
    <el-card>
      <template #header>
        biaoti
      </template>
      jjjj
    </el-card>
  </div>
</template>

<script>
export default {
  created () { 
    // this.$message('asd')
    // this.$message.error('asd')
    // this.$message.success('asd')
    // this.$notify({title:'timu'})
    // this.$prompt('asd',123)
    // this.$alert('xzc')
    // this.$msgbox('qwesad')
    // this.loading()
  },
  data () {
    const validatorUserName = function (rule, value, callback) {
      if (['red', 'bule', 'pink'].includes(value)) {
        callback()//相当于next（），校验通过
      } else {
        callback(new Error('choose in arr'))
      }
    }
    return {
      loginFrom: {
        username: ''
      },
      rules: {
        username: [
          // { required: true, message: 'error', trigger: 'blur' }, { min: 3, max: 6, message: 'length wrong', trigger: 'blur' },
          // { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: 'mobile wrong', trigger: 'blur' },
          { validator: validatorUserName, trigger: 'blur' }]
      }
    }
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
