<template>
  <div id="app" >

    <router-view></router-view>

  </div>
</template>

<script>
export default {

  name: 'App',
/*  provide(){
    return {
      reload:this.reload
    }
  },

  data:function () {
    return {
      isRouterAlive:true,//
    }
  },
  methods:{
    /!*
    * 刷新路由
    * *!/
    reload(){
      //先清空路由DOM，在加载路由路由DOM
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      })
    }
  },*/

  beforeCreate:function(){
    this.$store.commit('recoverState');


  },
  mounted(){

  },
  components:{

  }
}
</script>

<style>
  *{
    padding: 0;margin: 0;
  }
  a{
    text-decoration: none;
  }
  li{
    list-style: none;
  }
  div,li,span{font-family:'微软雅黑'}
  li{list-style-type:none}
  a,a:active{text-decoration:none;font-family:'微软雅黑';outline:0}
  img{border:none}
  body{
    overflow:hidden;
    color: #333;
    /*background: #fff;*/
    font-family:'微软雅黑','黑体',serif,'宋体';color:#4d6287;font-size:13px;

  }
  #app{
/*    background-image: url("./../src/assets/bg.jpg");
    background-repeat: no-repeat;*/
    /*background-size: 100% 100%;*/
    height: 100%;
  }
  #footer{
    width: 100%;
    height: 200px;
/*    position: absolute;
    bottom: 0;*/
  }


</style>
