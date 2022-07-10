<template>
  <div class="wrapper">
    <!-- 头部 -->
    <div class="header">
      <div class="title">VineTestPlatform</div>
    </div>

    <!-- 主体部分 -->
    <ElRow class="main">
      <ElCol :span="4"
             class="nav-bar">
        <el-menu
            router
            active-text-color="#1b867b"
            background-color="#1C2B36"
            class="menu"
            default-active="2"
            text-color="#fff"
            @open="handleOpen"
            @close="handleClose"
        >
          <el-menu-item index="1"
                        :route="{ name: 'Dashboard' }">
            <el-icon><Compass /></el-icon>
            <span>仪表盘</span>
          </el-menu-item>
<!--          <el-sub-menu index="2">-->
<!--            <template #title>-->
<!--              <el-icon><location /></el-icon>-->
<!--              <span>Navigator One</span>-->
<!--            </template>-->
<!--            <el-menu-item-group title="Group One">-->
<!--              <el-menu-item index="1-1">item one</el-menu-item>-->
<!--              <el-menu-item index="1-2">item one</el-menu-item>-->
<!--            </el-menu-item-group>-->
<!--            <el-menu-item-group title="Group Two">-->
<!--              <el-menu-item index="1-3">item three</el-menu-item>-->
<!--            </el-menu-item-group>-->
<!--            <el-sub-menu index="1-4">-->
<!--              <template #title>item four</template>-->
<!--              <el-menu-item index="1-4-1">item one</el-menu-item>-->
<!--            </el-sub-menu>-->
<!--          </el-sub-menu>-->

          <el-menu-item index="3"
                        :route="{ name: 'CaseManage' }">
            <el-icon><document /></el-icon>
            <span>用例管理</span>
          </el-menu-item>
<!--          <el-menu-item index="4">-->
<!--            <el-icon><setting /></el-icon>-->
<!--            <span>Navigator Four</span>-->
<!--          </el-menu-item>-->
        </el-menu>
      </ElCol>
      <ElCol :span="20">
        <RouterView/>
      </ElCol>

    </ElRow>

    <!-- 底部 -->
    <!--    <div class="footer">footer</div>-->
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
$height: 64px;
.wrapper {
  height: 100%;

  .header {
    display: flex;
    justify-content: start;
    align-items: center;
    background: #1c2b36;
    height: $height;
    color: #fff;
    .title {
      width: 15%;
      text-align: center;
      font-weight: bold;
      font-size: 22px;
    }
  }

  .main {
    height: calc(100% - #{$height});
    .nav-bar {
      //min-width: 150px;
      .menu {
        height: 100%;
      }
    }
  }
}
</style>
