<template>
  <el-container class="container">
    <el-header>
      <h1>
        <img class="logoImg" src="../../assets/logo.png" alt="" />
        马黑州杭后台管理系统
      </h1>
      <el-button @click="quit">退出</el-button>
    </el-header>
    <!-- aside -->
    <el-container>
      <el-aside :width="isChange ? '64px' : '200px'" ref="aside">
        <div class="button" @click="changeWidth">| | |</div>
        <el-menu background-color="#373d41" text-color="#fff" unique-opened>
          <!-- 1 -->
          <el-submenu index="1">
            <template #title>
              <i class="el-icon-user-solid"></i>
              <span v-if="!isChange">用户管理</span>
            </template>
            <el-menu-item index="1-1" @click="$router.push({ name: 'user' })">
              <i class="el-icon-menu"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
          </el-submenu>
          <!-- 2 -->
          <el-submenu index="2">
            <template #title>
              <i class="el-icon-s-opportunity"></i>
              <span v-if="!isChange">权限管理</span>
            </template>
            <el-menu-item
              index="2-1"
              @click="$router.push({ name: 'rolelist' })"
            >
              <i class="el-icon-menu"></i>
              <span slot="title">角色列表</span>
            </el-menu-item>
            <el-menu-item
              index="2-2"
              @click="$router.push({ name: 'prelist' })"
            >
              <i class="el-icon-menu"></i>
              <span slot="title">权限列表</span>
            </el-menu-item>
          </el-submenu>
          <!-- 3 -->
          <el-submenu index="3">
            <template #title>
              <i class="el-icon-s-goods"></i>
              <span v-if="!isChange">商品管理</span>
            </template>
            <el-menu-item
              index="3-1"
              @click="$router.push({ name: 'goodslist' })"
            >
              <i class="el-icon-menu"></i>
              <span slot="title">商品列表</span>
            </el-menu-item>
            <el-menu-item
              index="3-2"
              @click="$router.push({ name: 'kindinfo' })"
            >
              <i class="el-icon-menu"></i>
              <span slot="title">分类参数</span>
            </el-menu-item>
            <el-menu-item
              index="3-3"
              @click="$router.push({ name: 'goodskind' })"
            >
              <i class="el-icon-menu"></i>
              <span slot="title">商品分类</span>
            </el-menu-item>
          </el-submenu>
          <!-- 4 -->
          <el-submenu index="4">
            <template #title>
              <i class="el-icon-s-order"></i>
              <span v-if="!isChange">订单管理</span></template
            >
            <el-menu-item index="4-1" @click="$router.push({ name: 'order' })">
              <i class="el-icon-menu"></i>
              <span slot="title">订单列表</span>
            </el-menu-item>
          </el-submenu>
          <!-- 5 -->
          <el-submenu index="5">
            <template #title>
              <i class="el-icon-s-marketing"></i>
              <span v-if="!isChange">数据统计</span></template
            >
            <el-menu-item index="5-1">
              <i class="el-icon-menu"></i>
              <span slot="title">数据报表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- main -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'home',
  created () { },
  data () {
    return {
      isChange: false
    }
  },
  methods: {
    changeWidth () {
      this.isChange = !this.isChange
      // this.$refs.aside.$el.style.width = '64px'
    },
    quit () {
      this.$store.commit('user/removeToken1')
      this.$router.push('/login')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.container {
  height: 100vh;
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      color: #eaedf1;
      font-weight: 400;
      font-size: 22px;
      .logoImg {
        width: 61px;
        height: 56px;
      }
    }
  }
  .el-aside {
    background-color: #373d41;
    overflow: hidden;
    .button {
      text-align: center;
      line-height: 40px;
      color: #fff;
      width: 200px;
      height: 40px;
      background-color: #ff69b4;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
}
.el-menu {
  border-right: none;
}
.el-menu-item.is-active {
  color: red;
}
</style>
