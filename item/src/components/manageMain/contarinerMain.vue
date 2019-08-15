<template>
    <div class="contarinerMain">
      <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>

<script>
  //
    export default {
      name: "contarinerMain",
      provide(){
        return {
          reloadContarinerMain:this.reloadContarinerMain

        }
      },

      data:function () {
        return {
          isRouterAlive:true,
        }
      },
      methods:{
        /*
        * 刷新路由
        * */
        reloadContarinerMain(){
          //先清空路由DOM，在加载路由路由DOM
          this.isRouterAlive = false;
          this.$nextTick(function () {
            this.isRouterAlive = true;
          })
        }
      },
    }
</script>

<style scoped>
  .contarinerMain{
    height: 100%;
    overflow: hidden;
  }
</style>
