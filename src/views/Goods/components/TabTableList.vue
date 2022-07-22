<template>
  <div>
    <el-button
      type="primary"
      size="mini"
      @click="dialogFormVisible = true"
      style="margin-bottom: 10px"
      >{{ this.sel === "many" ? "添加参数" : "添加属性" }}</el-button
    >
    <el-table :data="list" style="width: 100%" border stripe>
      <el-table-column type="expand">
        <template v-slot="scope">
          <!-- {{ scope.row }} -->
          <el-tag
            v-for="(item, index) in scope.row.attr_vals"
            :key="index"
            closable
            style="margin: 5px 10px"
            @close="handleClose(scope.row, item)"
          >
            {{ item }}</el-tag
          >
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(scope.row)"
            @blur="handleInputConfirm(scope.row)"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput(scope.row.attr_id)"
            >+ New Tag</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="分类名称" prop="attr_name"> </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <TwoBtn
            @delSt="delThings(scope.row)"
            @edits="editThing(scope.row)"
          ></TwoBtn>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      @close="isEdit = false"
    >
      <el-form
        :model="parameter"
        :rules="rules"
        ref="paramsList"
        label-width="120px"
      >
        <el-form-item :label="title" prop="attr_name">
          <el-input v-model="parameter.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="
            dialogFormVisible = false;
            isEdit = false;
          "
          >取 消</el-button
        >
        <el-button type="primary" @click="addSD">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TwoBtn from './TwoBtn.vue'
import { addSomeThing, editCategories, delCategories } from '@/api/goods'
export default {
  name: 'TabTable',
  props: {
    list: {
      type: Array
      // required: true
      // default: []
    },
    sel: {
      type: String,
      required: true
    },
    id: {
      type: Number
    }
  },
  created () { },
  data () {
    return {
      attrId: null,
      isEdit: false,
      inputVisible: false,
      inputValue: '',
      dialogFormVisible: false,
      parameter: {
        attr_name: '',
        sel: null
      },
      rules: {
        attr_name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
      obj: {
        attr_name: '',
        attr_sel: '',
        attr_vals: ''
      }
    }
  },
  methods: {

    // 存在问题：1.想将编辑的ajax封住装，但是替换后，发现newtag会添加错误
    // 2.当展开复数的newtag时，会选中所有输入框，原因是这些遍历出来的input框ref都是一样的

    // async edit (val) {
    //   try {
    //     this.obj.attr_sel = this.sel
    //     this.obj.attr_name = val
    //     await editCategories(this.id, val, this.obj)
    //     this.$emit('updates')
    //   } catch (err) {
    //     console.log(err)
    //   }
    // },
    async handleClose (val, item) {
      // 删除静态属性
      const index = val.attr_vals.findIndex(it => it === item)
      val.attr_vals.splice(index, 1)
      this.obj.attr_sel = this.sel
      this.obj.attr_name = val.attr_name
      this.obj.attr_vals = val.attr_vals.join(' ')
      try {
        const res = await editCategories(this.id, val.attr_id, this.obj)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
      // console.log(val.attr_vals)
      console.log(val)
    },
    async addSD (val) {
      this.parameter.attr_sel = this.sel
      if (this.isEdit) {
        try {
          const res = await editCategories(this.id, this.attrId, this.parameter)
          this.$emit('updates')
          console.log(res)
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          await addSomeThing(this.id, this.parameter)
          this.$emit('updates')
          // console.log('things', res)
        } catch (err) {
          console.log(err)
        }
      }
      this.isEdit = false
      this.dialogFormVisible = false
    },
    showInput (val) {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    async handleInputConfirm (val) {
      const inputValue = this.inputValue
      if (inputValue) {
        this.obj.attr_vals = [...val.attr_vals, inputValue]
        this.obj.attr_vals = this.obj.attr_vals.join(' ')
        // this.edit(val.attr_name)
        try {
          this.obj.attr_name = val.attr_name
          this.obj.attr_sel = this.sel
          const res = await editCategories(this.id, val.attr_id, this.obj)
          this.$emit('updates')
          console.log(res)
        } catch (err) {
          console.log(err)
        }
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    async delThings (val) {
      try {
        await delCategories(
          this.id, val.attr_id
        )
        this.$emit('updates')
        this.$message.success('删除成功')
        // console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    async editThing (val) {
      this.parameter.attr_name = val.attr_name
      this.attrId = val.attr_id
      this.dialogFormVisible = true
      this.isEdit = true
    }
  },
  computed: {
    title () {
      if (this.sel === 'many') {
        return this.isEdit ? '修改动态参数' : '添加动态参数'
      } else {
        return this.isEdit ? '修改静态属性' : '添加静态属性'
      }
      // return this.sel === 'many' ? '添加动态参数' : '添加静态属性'
    }
  },
  watch: {},
  filters: {},
  components: {
    TwoBtn
  }
}
</script>

<style scoped lang="less">
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
