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
        <h2>注册</h2><p class="tyg-p">欢迎访问  房屋租赁系统</p>
        <div style="margin:5px 0px; padding-top: 20px">
          <span style="vertical-align:1.5px">注册类型：</span>
          <span v-for="user in manageCheck" style="line-height: 36px">
            <span style="margin-left: 15px;margin-right: 5px;;vertical-align:2px">{{user[0]}}</span><input type="radio" name="manage" v-model="manage" :value="user[1]">
          </span>
        </div>
        <div style="margin:5px 0px;">
          <span class="title_input">账号：</span><input v-on:blur="verification(1)" v-model="user" type="text" placeholder="请输入账号..."/><span style="color: red">*</span>
        </div>
        <div style="margin:5px 0px;">
          <span class="title_input">密码：</span><input v-model="password" type="password" placeholder="请输入密码..."/><span style="color: red">*</span>
        </div>
        <div style="margin:5px 0px;">
          <span class="title_input">再次输入密码：</span><input v-model="againPassword" type="password" placeholder="再次输入密码..."/><span style="color: red">*</span>
        </div>
        <div style="margin:5px 0px;">
          <span class="title_input">姓名：</span><input v-model="name" type="text" placeholder="请输入姓名..."/><span style="color: red">*</span>
        </div>
        <div style="margin:5px 0px;">
          <span class="title_input">邮箱：</span><input v-on:blur="verification(2)" v-model="email" type="email" placeholder="请输入邮箱..."/><span v-bind:class="{manage:!manage}" style="color: red">*</span>
        </div>
        <div style="margin:5px 0px;">
          <span class="title_input">电话：</span><input v-on:blur="verification(3)" v-model="phone" type="text" placeholder="请输入电话..."/><span v-bind:class="{manage:!manage}" style="color: red">*</span>
        </div>
        <div style="margin:5px 0px; padding-top: 20px">
          <span>性别：</span><select v-model="sex" autocomplete="off" name="sex">
            <option value="男" selected="selected">男</option>
            <option value="女" >女</option>
          </select>
          <span style="margin-left: 50px">年龄：</span><input type="number" step="1" max="50" min="16" v-model="age" >
        </div>
          <div style="text-align: center"><button v-on:click="register">注<span style="width:20px;"></span>册</button></div>

      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "register",
      data(){
        return {
          manageCheck:[["房东",true],["租客",false]],
          user:'',
          password:'',
          againPassword:'',
          sex:'男',
          age:'20',
          email:'',
          phone:'',
          name:'',
          manage:false
        }
      },
      methods: {
        verification(number){//表单校验
          let target = event.target;
          if(!$(target).val() && this.manage){
            $(target).css({
              borderColor:'red'
            })
            return
          }else if(!$(target).val() && !this.manage){
            if (number == 1) {
              $(target).css({
                borderColor:'red'
              })
            }
            return
          }

          if ($(target).val()) {
            $(target).css({
              borderColor:'initial'
            })
            if(number == 1){
              //验证只能是字母和数字
              let zmnumReg=/^[0-9a-zA-Z]*$/;
              if(!zmnumReg.test($(target).val())) {
                alert("只能输入是字母或者数字,请重新输入");
                $(target).val("");
                this.user="";
                return false;
              }
            }else if (number == 2){
              //对电子邮件的验证
              let myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
              if(!myreg.test($(target).val()))
              {
                $(target).val("");
                this.email="";
                alert('请输入有效的邮箱！');
                return false;
              }
            }else if (number == 3){
              if($(target).val().length!=11)
              {
                $(target).val("");
                this.phone="";
                alert('请输入有效的手机号码，需是11位！');
                return false;
              }

              let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
              if(!myreg.test($(target).val()))
              {
                $(target).val("");
                this.phone="";
                alert('请输入有效的手机号码！');
                return false;
              }
            }
          }

            return false;
        },
        register() {
          //提交前校验
          let kong = false;
          if (this.manage == true) {
            // console.log(!this.user);
            switch (true) {
              case !this.user:
                alert('账号不能为空');
                return
                break;
              case !this.password:
                alert('密码不能为空');
                return
                break;
              case !this.againPassword:
                alert('请再次输入密码');
                return
                break;
              case !this.name:
                alert('姓名不能为空');
                return
                break;
              case !this.email:
                alert('邮箱不能为空');
                return
                break;
              case !this.phone:
                alert('电话不能为空');
                return
                break;
              default:
                kong = true;
                break;
            }
            if (kong){
              if (this.password != this.againPassword){
                this.againPassword = "";
                alert('两次密码输入不匹配');
                return
              }
            }
          } else if (this.manage == false) {
            switch (true) {
              case !this.user:
                alert('账号不能为空');
                return;
                break;
              case !this.password:
                alert('密码不能为空');
                return
                break;
              case !this.againPassword:
                alert('请再次输入密码');
                return
                break;
              case !this.name:
                alert('姓名不能为空');
                return
                break;
              default:
                kong = true;
                break;
            }
            if (kong){
              if (this.password != this.againPassword){
                this.againPassword = "";
                alert('两次密码输入不匹配');
                return
              }
            }
          }
          let data={
            user:""+this.user,
              password: ""+this.password,
              sex:""+this.sex,
              age:""+this.age,
              email:""+this.email,
              phone:""+this.phone,
              name:""+this.name,
              manage:this.manage
          }
          this.$http({
            method: 'post',
            url: 'http://localhost:2173/register',
            data:data
          }).then( (response) => {
            alert(response.data);
            if (response.data == '注册成功'){
              this.$router.push('/login')
            }else {
                this.password = "";
                this.email = "";
                this.phone = "";
                this.name = "";
            }
          })
        }
      },
    }
</script>

<style scoped>
  .title_input{
    display: inline-block;
    box-sizing: border-box;
    width: 85px;
  }
  .manage{
    display: none;
  }
  .loginInterfaceHide{
    display: none;
  }
  .loginInterface{
    width: 200px;
    height: 100px;
    text-align: center;
    font-size: 30px;
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
    font-size: 14px;
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
    width:360px;
    height:auto;
    margin:120px auto 0 auto;
    color:#2ec0f6;
  }
  .tyg-div-form {padding:10px;}
  .tyg-div-form input[type="text"],
  .tyg-div-form input[type="password"],
  .tyg-div-form input[type="email"]
  {
    width: 240px;
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
    font-size: 14px;
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
