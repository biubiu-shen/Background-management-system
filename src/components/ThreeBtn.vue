<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-edit"
      size="mini"
      @click="isDialogShow = true"
    ></el-button>
    <el-button
      type="danger"
      icon="el-icon-delete"
      size="mini"
      @click="open(row.id)"
    ></el-button>
    <el-button
      type="warning"
      icon="el-icon-setting"
      size="mini"
      @click="roles"
    ></el-button>
    <el-dialog title="编辑用户" :visible.sync="isDialogShow" width="60%">
      <el-form
        :model="formItem"
        :rules="rules1"
        ref="changeForm"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input disabled :value="row.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formItem.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="formItem.mobile"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="isDialogShow = false">取 消</el-button>
      <el-button type="primary" @click="edit">确 定</el-button>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="isShow" width="60%">
      <el-form label-width="100px" :model="form">
        <el-form-item label="当前用户：">{{ row.username }}</el-form-item>
        <el-form-item label="当前角色：">{{ row.role_name }}</el-form-item>
        <el-form-item label="分配新角色">
          <el-select v-model="form.rid" placeholder="请选择活动区域">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="btnss">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="roleSub">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    row: {
      type: Object,
      required: true
    }
  },
  name: 'threebtn',
  created () {
    // try {
    //   const res = await rightList('list')
    //   console.log('list', res)
    // } catch (err) {
    //   console.log(err)
    // }
  },
  data () {
    return {
      isShow: false,
      isDialogShow: false,
      form: {
        id: this.row.id,
        rid: null
      },
      formItem: {
        id: this.row.id,
        email: this.row.email,
        mobile: this.row.mobile
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
    async edit () {
      try {
        await this.$refs.changeForm.validate()
        await this.$store.dispatch('user/editUsers', this.formItem)
        this.$emit('update1')
        this.isDialogShow = false
      } catch (err) {
        this.$message.error('eidt wrong')
      }
    },
    open (val) {
      this.$emit('updateDel', val)
    },
    roles () {
      this.isShow = true
      this.$store.dispatch('premiss/setRoleList')
    },
    roleSub () {
      console.log(this.form)
      this.$store.dispatch('user/roleUsers',this.form)
      this.isShow = false
    }

  },
  computed: {
    ...mapGetters(['roleList'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
// .btnss{
//   width: 100%;
//   display: flex;
//   justify-items: flex-end;
// }
</style>
