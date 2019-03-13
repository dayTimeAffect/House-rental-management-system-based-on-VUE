<template>
  <div id="manage">
    <navtop></navtop>
    <div class="contariner">
      <!--左侧导航部分-->
      <div class="contariner_Left" v-if="get_ismanage()">
        <contarinerLeft></contarinerLeft>
      </div>
      <!--右侧内容部分-->
      <div class="contariner_Main" v-bind:class="{contariner_Main_width:!get_ismanage()}">
        <contarinerMain></contarinerMain>
      </div>
    </div>
  </div>
</template>

<script>
  import navtop from './manageMain/navtop'
  import contarinerLeft from './manageMain/contarinerLeft'
  import contarinerMain from './manageMain/contarinerMain'


export default {
  name: 'manage',
  data:function () {
    return {
      contariner_Left_none:false,//判断是否是管理员登录，如果不是，不显示导航。
    }
  },
  methods:{
    get_ismanage(){
      if (this.$store.state.user.manage == 'true'){
        return true
      } else {
        return false
      }
    },
  },
  components:{
    navtop,
    contarinerLeft,
    contarinerMain
  }
}
</script>

<style scoped>
  .contariner{
    position: relative;
    width: 80%;
    margin: auto;
  }
  .contariner_Left{
    position: absolute;
    left: 0;
    float: left;
    width: 20%;
  }
  .contariner_Main{
    /*border: 1px solid black;*/
    position: absolute;
    right: 0;
    width: 80%;
    margin: auto;
  }
  .contariner_Main_width{
    width: 100%;
  }
  .contariner_Main::after{
    display: block;
    content: "";
    clear: both;
  }
</style>
