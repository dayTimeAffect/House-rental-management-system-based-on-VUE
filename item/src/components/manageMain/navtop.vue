<template>
  <div class="nav">
    <div class="containerTop">
      <ul class="left">
        <li><router-link to="/manageMain/welcome" tag="div"><i class="fa fa-home fa-lg"></i> 房屋租赁管理</router-link></li>
      </ul>
      <ul class="right">
        <li v-on:mouseenter="user_operations_hide = true" v-on:mouseleave="user_operations_hide = false">
          <span>用户</span>
          <i class="fa fa-angle-down userInterface"></i>
          <div class="user-operations" v-if="user_operations_hide">
            <router-link to="/manageMain/personalDetails" tag="div" class="userInfo">个人信息</router-link>
            <div class="logout" v-on:click="logout">退出登录</div>
          </div>
        </li>
        <li><i class="fa fa-question-circle-o"></i><span> 帮助中心</span></li>
        <li v-on:click="information_change">
          <i class="fa fa-envelope-o changeIcon"></i>
          <span> 消息公告</span>
        </li>
      </ul>
    </div>

    <div v-bind:class="{information:true,hide:hide}">
      <div class="informationTop">
        <span>消息公告</span>
        <span v-on:click.stop="information_change1"><i>X</i></span>
      </div>
      <div class="informationMain">
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'navtop',
  data () {
    return {
      hide:true,
      user_operations_hide:false
    }
  },
  methods:{
    information_change:function () {
      $('.changeIcon').removeClass('fa-envelope-o').addClass('fa-envelope-open')
      this.hide = false;
      $('.right>li').eq(2).addClass('white')

    },
    information_change1:function () {
      $('.changeIcon').removeClass('fa-envelope-open').addClass('fa-envelope-o')
      this.hide = true;
      $('.right>li').eq(2).removeClass('white')
    },
    logout(){
      let logoutStr = window.confirm("是否退出登录！");
      if (logoutStr){
        this.$store.state.user = {};
        this.$store.commit('emptyLocalStorage')
        this.$router.push('/login/login')
      }
    },

  },
  created() {

},
}
</script>


<style scoped>

  .nav{
    width: 100%;
    position: relative;
    height: 60px;
    line-height: 60px;
    background-color: #1b926c;
    color: #b0ddce;
  }
  .containerTop{
    width: 80%;
    margin: auto;
  }
  .right{
    width: 40%;
    float: right;
  }
  .right>li:hover{
    color: #ffffff;
  }
  .left>li{
    color: #ffffff;
  }
  .left{
    width: 30%;
    float: left;
  }
  .right>li{
    float: right;
    margin-right: 12%;
    cursor: pointer;

  }
  .left>li{
    float: left;
    cursor: pointer;
  }
  .left>li:first-child{
    font-size: 18px;
  }
  .userInterface{
    margin-left: 20px;
  }
  .information{
    position: absolute;
    width: 300px;
    height: 400px;
    z-index: 222;
    left: 40%;
    top: 300%;
    border: 1px solid black;
    border-radius: 5px;
  }
  .informationTop{
    font-size: 18px;
    box-sizing: border-box;
    width: 100%;
    padding: 0px 15px;
    background-color: #999999;
    border: 1px solid black;
  }
  .informationTop>span>i{
    float: right;
    padding-right: 20px;
  }
  .hide{
    display: none;
  }
  .user-operations{
    width: 120px;
    height: 120px;
    position: absolute;
    right: 220px;
    top: 60px;
    border: 1px solid #ddd;
    background: #fff;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,.12);
    z-index: 1000;
    text-align: center;
    color: #333;
    font-size: 14px;
  }
  .user-operations>div{
    cursor: pointer;

  }
  .user-operations>{
    border-bottom: 1px solid #ccc;
  }
  .userInfo:hover,
  .logout:hover{
    color: #23b8ff;
  }
  .white{
    color: #fff;
  }
</style>
