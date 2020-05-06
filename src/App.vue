<template>
  <div id="app">

    <!-- 放置出口 -->
    <router-view />
  </div>
</template>
<script>
export default {
  // mounted () {
  //   // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
  //   window.onbeforeunload = function (e) {
  //     var storage = window.localStorage;
  //     storage.clear()
  //   }
  // }

}

</script>
<style lang="less">
html,
body,
#app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background: url("./views/assets/image/bg.jpg") no-repeat;
  background-size: 100% 100%;
}
</style>
