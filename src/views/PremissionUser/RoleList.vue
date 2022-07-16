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
          <template>
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
              @click="dialogTableVisible = true"
              >分配权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- popup -->
    <el-dialog title="分配权限" :visible.sync="dialogTableVisible">
      <el-tree
        :data="rightList"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
      >
      </el-tree>
      <div class="btn">
        <el-button>取消</el-button>
        <el-button type="primary" @click="treeform">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  created () {
    this.$store.dispatch('premiss/setRoleList')
    this.$store.dispatch('premiss/setRights')
  },
  data () {
    return {
      dialogTableVisible: false,
      defaultProps: {
        label: 'authName',
        children: 'children'
      }
    }
  },
  methods: {
    handleClose (roleId, rightId) {
      // console.log('tt', item)
      const arr = [roleId, rightId]
      this.$store.dispatch('premiss/delRolePower1', arr)
    },
    treeform () { }
  },
  computed: {
    ...mapGetters(['rightList'])
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
.btn{
  margin-top: 30px;
  padding: 0 12px 10px 0;
  width: 100%;
  display: flex;
  justify-content: end;
}
</style>
