<template>
  <div>
    <el-dialog
      title="编辑用户"
      :visible.sync="isDialogShow"
      width="60%"
    >
      <el-form :model="formItem" :rules="rules1" ref="changeForm" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input readonly></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formItem.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="formItem.mobile"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="isDialogShow = false">取 消</el-button>
      <el-button type="primary" @click="changeForm">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'dialogItem',
  created () { },
  props: {
    isDialogShow: {
      type: Boolean,
      required: true
      // default: false
    }
  },
  data () {
    return {
      // dialogVisible: this.isDialogShow,
      formItem: {
        email: '',
        mobile: ''
      },
      rules1: {
        email: [
          { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        mobile: [
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    changeForm () {
      this.isDialogShow = false
      this.$emit('changeShow',false)
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
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
