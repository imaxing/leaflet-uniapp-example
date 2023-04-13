<!-- #ifdef APP-PLUS -->
<template></template>
<!-- #endif -->

<!-- #ifdef H5 -->
<template>
  <router-view></router-view>
</template>
<!-- #endif -->

<script>
export default {
  mpType: 'app',
  onLaunch() {
    this.$restore()
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
