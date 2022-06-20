<template>
  <div class="wrapper">
    <!-- 头部 -->
    <div class="header">
    </div>

    <!-- 主体部分 -->
    <ElRow class="main">
      <RouterView/>
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
    height: 100%;
    background: #1c2b36;
    height: $height;
    color: #fff;
  }

  .main {
    height: calc(100% - #{$height});
  }
}
</style>
