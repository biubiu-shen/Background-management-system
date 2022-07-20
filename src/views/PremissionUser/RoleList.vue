<template>
  <div>
    <bread-crumb></bread-crumb>
    <el-card class="box-card">
      <el-button type="primary">添加角色</el-button>
      <!-- 表格 -->
      <el-table
        :data="$store.state.premiss.roleList"
        border
        style="width: 100%"
      >
        <el-table-column label="#" type="expand">
          <template slot-scope="props">
            <div
              class="total"
              v-for="item in props.row.children"
              :key="item.id"
            >
              <div style="margin-right: 120px">
                <el-tag>{{ item.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </div>

              <div>
                <div
                  class="green"
                  v-for="item1 in item.children"
                  :key="item1.id"
                >
                  <div>
                    <el-tag type="success">{{ item1.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </div>
                  <div>
                    <el-tag
                      v-for="tag in item1.children"
                      :key="tag.id"
                      closable
                      @close="handleClose(props.row.id, tag.id)"
                    >
                      {{ tag.authName }}
                    </el-tag>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete" size="mini"
              >删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="assignment(scope.row.id)"
              >分配权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- popup -->
    <el-dialog
      title="分配权限"
      :visible.sync="dialogTableVisible"
      @close="clearTreeArr"
    >
      <el-tree
        v-if="dialogTableVisible"
        :data="rightList"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        :props="{ label: 'authName' }"
        highlight-current
        :default-checked-keys="treeArr"
      >
      </el-tree>
      <div class="btn">
        <el-button @click="dialogTableVisible = false">取消</el-button>
        <el-button type="primary" @click="treeform">确定</el-button>
      </div>
    </el-dialog>
    {{ arrRole }}
  </div>
</template>

<script>
// 未解决：删除完第三级的权限后，第二级应该也自动消失，树形图相应更新
import { mapGetters } from 'vuex'
export default {
  created () {
    this.$store.dispatch('premiss/setRoleList')
    this.$store.dispatch('premiss/setRights')
  },
  data () {
    return {
      dialogTableVisible: false,
      // defaultProps: {
      //   label: 'authName',
      //   children: 'children'
      // },
      treeArr: [],
      roleArrandId: {
        id: null,
        arr: []
      }
    }
  },
  methods: {
    handleClose (roleId, rightId) {
      // console.log('tt', item)
      const arr = [roleId, rightId]
      this.$store.dispatch('premiss/delRolePower1', arr)
    },
    async treeform () {
      this.roleArrandId.arr = [...this.$refs.tree.getCheckedKeys(), ...this.$refs.tree.getHalfCheckedKeys()]
      await this.$store.dispatch('premiss/changeRight', this.roleArrandId)
      await this.$store.dispatch('premiss/setRoleList')
      this.dialogTableVisible = false
    },
    // 未解决第一次点开对话框会报错，但第二次就没问题
    // 似乎是对话框点开的时候tree没被创建出来，报错是没有setcheckedkyes函数
    assignment (id) {
      this.dialogTableVisible = true
      // this.treeArr = []
      // console.log(this.treeArr.length)
      this.roleArrandId.id = id
      this.treeArr = this.arrRole[id]
      // this.$refs.tree.setCheckedKeys([105])
      // this.$refs.tree.setCheckedKeys(this.treeArr)
      // console.log(this.treeArr.length)
    },
    clearTreeArr () {
      this.treeArr = []
      console.log('ss')
    }
  },
  computed: {
    ...mapGetters(['rightList', 'roleList']),
    arrRole () {
      const obj = {}
      let arr = []
      function fn (list) {
        list.forEach(item => {
          if (item.children && item.children.length !== 0) {
            fn(item.children)
          } else {
            arr.push(item.id)
          }
        })
        return arr
      }
      this.roleList.forEach(item => {
        const id = item.id
        arr = []
        // item.children.forEach(item1 => {
        //   item1.children.forEach(item2 => {
        //     item2.children.forEach(item3 => {
        //       arr.push(item3.id)
        //     })
        //   })
        // })
        obj[id] = fn(item.children)
        // obj[id] = arr
      })
      return obj
    }
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 5.625rem;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.total {
  display: flex;
  width: 100%;
  padding-left: 30px;
  border-bottom: 1px solid #eee;
  align-items: center;
  .green {
    display: flex;
    align-items: center;

    border-bottom: 1px solid #eee;
    .el-tag {
      margin: 10px;
    }
  }
}
.btn {
  margin-top: 30px;
  padding: 0 12px 10px 0;
  width: 100%;
  display: flex;
  justify-content: end;
}
</style>
