<template>
<div>
  <div v-bind:class="{loginInterface:true,loginInterfaceHide:this.$store.state.user.id > 0}">
    <router-link to="/login/login" tag="span">登录</router-link>
    <router-link to="/login/register" tag="span">注册</router-link>
  </div>
  <div id="contPar" class="contPar">
    <div id="page1"  style="z-index:1;">
      <div class="imgGroug">
        <ul>
          <img alt="" class="img0 png" src="./../../../src/assets/page1_0.png">
          <img alt="" class="img1 png" src="./../../../src/assets/page1_1.png">
          <img alt="" class="img2 png" src="./../../../src/assets/page1_2.png">
        </ul>
      </div>
      <img alt="" class="bg img3 png" src="./../../../src/assets/page1_3.jpg">
    </div>
  </div>
  <div class="tyg-div-denglv">
    <div class="tyg-div-form">

        <h2>登录</h2><p class="tyg-p">欢迎访问  房屋租赁系统</p>
      <div style="margin:5px 0px; padding-top: 20px">
        <span style="vertical-align:1.5px">登录方式：</span>
        <span v-for="user in manageCheck" style="line-height: 36px">
            <span style="margin-left: 15px;margin-right: 5px;;vertical-align:2px">{{user[0]}}</span><input type="radio" name="manage" v-model="manage" :value="user[1]">
          </span>
      </div>
        <div style="margin:5px 0px;">
          <input v-model="user" type="text" placeholder="请输入账号..."/>
        </div>
        <div style="margin:5px 0px;">
          <input v-on:keyup.enter="login" v-model="password" type="password" placeholder="请输入密码..."/>
        </div>
        <button v-on:click="login" style="text-align: center">登<span style="width:20px;"></span>录</button>

    </div>
  </div>
</div>
</template>

<script>
    export default {
        name: "login",
      data(){
          return {
            user:'',
            password:'',
            manageCheck:[["房东登录",true],["租客登录",false]],
            manage:false
          }
      },
      methods:{
          login(){
            let jy = false;
            //提交前校验
            switch (true) {
              case !this.user:
                alert('账号不能为空');
                jy = true;
                break;
              case !this.password:
                alert('密码不能为空');
                jy = true;
                break;
              default:
                break;
            }
            if (jy){
              return false;
            }
            this.$http({
              method: 'post',
              url: 'http://localhost:2173/login',
              data:{
                user:""+this.user,
                password: ""+this.password,
                manage:this.manage
              }
            }).then( (response) => {
              if (response.data == '登录失败'){
                alert('账号或密码错误！');
                this.password = "";
              } else {
                if (response.data.manage == true || response.data.manage == 'true'){
                  this.$store.state.reserved = "false"
                } else {
                  this.$store.state.reserved = "true"
                }
                this.$store.state.user = response.data;
                alert('登录成功')

                this.$store.commit('emptyLocalStorage')
                this.$store.commit('UseLocalStorage');
                this.$router.push('/manage')
              }
            })
          }
      },
    }
</script>

<style scoped>
  .loginInterfaceHide{
    display: none;
  }
  .loginInterface{
    width: 200px;
    height: 100px;
    text-align: center;
    font-size: 40px;
    font-weight: 600;
    color: #333;
    line-height: 100px;
    text-shadow: 2px 2px 2px cornflowerblue;
    position: absolute;
    z-index: 50;
  }
  .loginInterface>span{

    padding-left: 7px;
    padding-right: 7px;

  }
  .loginInterface>span:hover{
    cursor: pointer;
  }

  ul li{font-size: 30px;color:#2ec0f6;}
  .tyg-div{z-index:-1000;float:left;position:absolute;left:5%;top:20%;}
  .tyg-p{
    font-size: 16px;
    font-family: 'microsoft yahei';
    position: absolute;
    top: 135px;
    left: 60px;
  }
  .tyg-div-denglv{
    z-index:1000;float:right;position:absolute;right:3%;top:10%;
  }
  .tyg-div-form{
    background-color: #23305a;
    width:300px;
    height:auto;
    margin:120px auto 0 auto;
    color:#2ec0f6;
  }
  .tyg-div-form {padding:10px;}
  .tyg-div-form input[type="text"],
  .tyg-div-form input[type="password"]
  {
    width: 270px;
    height: 30px;
    margin: 25px 10px 0px 0px;
  }
  .tyg-div-form button {
    cursor: pointer;
    width: 270px;
    height: 44px;
    margin-top: 25px;
    padding: 0;
    background: #2ec0f6;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    border: 1px solid #2ec0f6;
    -moz-box-shadow:
      0 15px 30px 0 rgba(255,255,255,.25) inset,
      0 2px 7px 0 rgba(0,0,0,.2);
    -webkit-box-shadow:
      0 15px 30px 0 rgba(255,255,255,.25) inset,
      0 2px 7px 0 rgba(0,0,0,.2);
    box-shadow:
      0 15px 30px 0 rgba(255,255,255,.25) inset,
      0 2px 7px 0 rgba(0,0,0,.2);
    font-family: 'PT Sans', Helvetica, Arial, sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0,0,0,.1);
    -o-transition: all .2s;
    -moz-transition: all .2s;
    -webkit-transition: all .2s;
    -ms-transition: all .2s;
  }
  #contPar{
    width: 100%;
    height: 100vh;
    position: relative;
  }
  #page1{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .imgGroug{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 20;
  }
  @keyframes move1{
    0% {transform: rotateY(0deg)}
    25% {transform: rotateY(90deg)}
    50% {transform: rotateY(180deg)}
    75% {transform: rotateY(270deg)}
    100% {transform: rotateY(360deg)}
  }
  .imgGroug>ul{

    position: absolute;
    top:50%;
    left: calc(50% - 170px / 2);
    z-index: 20;
    transform: rotateY(0deg);
    animation: move1 10s linear infinite;
    transform-style: preserve-3d;
    transform-origin:85px;
  }
  .imgGroug>ul>img{
    transform-style: preserve-3d;
    position: absolute;
  }
  .imgGroug>ul>img:nth-child(1){
      transform: translateX(-300px) translateZ(-75px) rotateY(-120deg);
  }
  .imgGroug>ul>img:nth-child(2){
    transform:translateZ(150px);
  }
  .imgGroug>ul>img:nth-child(3){
    transform: translateX(300px) translateZ(-75px) rotateY(-240deg);
  }
  .imgGroug>ul>img:hover{

  }
  .bg{
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100vh;
  }
</style>
