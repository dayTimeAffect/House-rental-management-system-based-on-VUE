<template>
  <div class="nav">
    <div class="containerTop">
      <ul class="left">
        <li><router-link to="/manageMain/welcome" tag="div"><i class="fa fa-home fa-lg"></i> 房屋租赁管理系统</router-link></li>
      </ul>
      <ul class="right">
        <li v-on:mouseenter="user_operations_hide = true" v-on:mouseleave="user_operations_hide = false">
          <span>用户</span>
          <i class="fa fa-angle-down userInterface"></i>
          <div class="user-operations" v-if="user_operations_hide">
            <router-link to="/manageMain/personalDetails" tag="div" class="userInfo">个人信息</router-link>
            <div v-if="this.$store.state.user.manage == 'false'" class="reserved" v-on:click="reservedInfo(1)">房屋租赁</div>
            <div v-if="this.$store.state.user.manage == 'false'" class="reserved" v-on:click="reservedInfo(2)">已预订房屋</div>
            <div class="logout" v-on:click="logout">退出登录</div>
          </div>
        </li>
        <li v-on:click="goHelp"><i class="fa fa-question-circle-o"></i><span> 帮助中心</span></li>
      </ul>
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
    goHelp(){
      this.$router.push("/manageMain/welcome")
    },
    logout(){
      let logoutStr = window.confirm("是否退出登录！");
      if (logoutStr){
        this.$store.state.user = {};
        this.$store.state.reserved = '';
        this.$store.commit('emptyLocalStorage')
        this.$router.push('/login/login')
      }
    },
    reservedInfo(num){
      if (num == 1){
        this.$router.push("/manageMain/examine")
      } else if (num == 2){
        this.$router.push("/manageMain/rentSituation")

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

  .informationTop>span>i{
    float: right;
    padding-right: 20px;
  }

  .user-operations{
    width: 120px;
    position: absolute;
    right: 220px;
    top: 60px;
    border: 1px solid #ddd;
    background: #fff;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,.12);
    z-index: 1000;
    text-align: center;
    font-size: 14px;
  }
  .user-operations>div{
    height: 60px;
    color: #333;
    cursor: pointer;
  }
  .user-operations>{
    border-bottom: 1px solid #ccc;
  }
  .userInfo:hover,
  .logout:hover,
  .reserved:hover{
    color: #23b8ff;
  }

</style>
