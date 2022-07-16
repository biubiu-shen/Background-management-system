<template>
  <div class="main">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- main -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="formtwo">
          <!-- form1 -->
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-input
                v-model="formInline.searchPerson"
                placeholder="请输入内容"
              >
                <template #append>
                  <el-button
                    icon="el-icon-search"
                    @click="onSubmit"
                  ></el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <!-- form2 -->
          <el-form>
            <el-form-item>
              <el-button type="primary" @click="dialogVisible = true"
                >添加用户</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 表格区域 -->
      <el-table
        :data="$store.state.user.userList.users"
        style="width: 100%"
        :stripe="true"
        :border="true"
      >
        <!-- id -->
        <el-table-column prop="id" label="#" width="60"></el-table-column>
        <!-- 姓名 -->
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <!-- 电话 -->
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <!-- 角色 -->
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <!-- 状态开关 -->
        <el-table-column prop="mg_state" label="状态">
          <!-- 开关绑定状态，需要添加scope属性，拿到每一行的状态 row。ma_state -->
          <template scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeState(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <!-- 状态开关结束 -->
        <!-- 操作按钮三个 -->
        <el-table-column label="操作" width="180">
          <template scope="scope">
            <ThreeBtn
              :row="scope.row"
              @updateDel="updateD($event)"
              @update1="update1"
            ></ThreeBtn>
          </template>
        </el-table-column>
        <!-- 操作按钮三个结束 -->
      </el-table>
      <!--  分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-sizes="[1, 2, 4, 6]"
          :page-size="6"
          layout="total, sizes, prev, pager, next, jumper"
          :total="$store.state.user.userList.total"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- popup -->
    <el-dialog title="添加用户对话框" :visible.sync="dialogVisible" width="70%">
      <!-- :before-close="handleClose" -->
      <el-form
        :model="formUser"
        :rules="rules"
        ref="addUser"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formUser.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formUser.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formUser.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="formUser.mobile"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addUser">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import ThreeBtn from '@/components/ThreeBtn.vue'
export default {
  created () {
    this.$store.dispatch('user/getuserList', this.obj)
  },
  data () {
    return {
      // isShow: false,
      dialogVisible: false,
      // 搜索的表单数据
      formInline: {
        searchPerson: ''
      },
      // 添加用户的表单数据
      formUser: {
        username: 'yyy',
        password: 'yyy',
        email: '1255225659@qq.com',
        mobile: '15156515876'
      },
      // 添加用户所需要的表单验证
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在2-7个字符之间', trigger: 'blur' }],
        password: [
          { min: 2, max: 7, message: '长度在2-7个字符之间', trigger: 'blur' },
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        mobile: [
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      },
      // 默认显示第几页
      currentPage1: 1,
      // 获取用户列表所需要的参数
      obj: {
        query: '',
        pagenum: 1,
        pagesize: 6
      }
    }
  },
  methods: {
    // 搜索的提交函数
    onSubmit () {
      this.obj.query = this.formInline.searchPerson
      this.obj.pagenum = 1
      this.obj.pagesize = 6
      this.$store.dispatch('user/getuserList', this.obj)
      this.formInline.searchPerson = ''
      // console.log('submit', this.formInline)
    },
    // 改变每一页显示的条数
    handleSizeChange (val) {
      this.obj.pagesize = val
      this.$store.dispatch('user/getuserList', this.obj)
      console.log(`每页 ${val} 条`)
    },
    // 改变页码
    handleCurrentChange (val) {
      if (this.obj.pagenum !== val) {
        this.obj.pagenum += (val - this.obj.pagenum)
      }
      this.$store.dispatch('user/getuserList', this.obj)
      console.log(`当前页: ${val}`)
    },
    // 改变用户状态
    changeState (val) {
      const arr = [val.id, val.mg_state]
      this.$store.dispatch('user/setuserState', arr
      )
    },
    // 关闭添加用户界面
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    // 添加用户的表单提交
    async addUser () {
      try {
        // await this.$refs.addUser.validator()
        await this.$refs.addUser.validate()
        await this.$store.dispatch('user/adduser', this.formUser)
        this.dialogVisible = false
        this.$store.dispatch('user/getuserList', this.obj)
      } catch (err) {
        this.$message.error(err)
      }
    },
    // 最后一页如果只剩一条，且将其删除后，会出现bug，页面不会回到前一页，也无法使用分页功能
    async update1 () {
      await this.$store.dispatch('user/getuserList', this.obj)
    },
    updateD (val) {
      console.log(val)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$store.dispatch('user/delUsers', val)
        // await this.$emit('updateDel')
        await this.$store.dispatch('user/getuserList', this.obj)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    ThreeBtn
  }
}
</script>

<style scoped lang="less">
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
// .el-breadcrumb {
//   margin-bottom: 20px;
// }

.formtwo {
  display: flex;
}
// .main {
//   .btn {
//     .el-button {
//       width: 44px;
//       height: 29px;
//     }
//   }
// }
</style>
