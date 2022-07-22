<template>
  <div>
    <el-button type="primary" size="mini" icon="el-icon-edit" @click="$emit('edits')">编辑</el-button>
    <el-button type="danger" size="mini" icon="el-icon-delete" @click="$emit('delSt')">删除</el-button>
  </div>
</template>

<script>
export default {
  name: 'Twobtn',
  created () { },
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
