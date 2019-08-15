<template>
  <div>
    <div id="contPar" class="contPar">
      <div id="page1"  style="z-index:1;">
        <img alt="" class="bg img3 png" src="./../../../src/assets/page1_3.jpg">
      </div>
    </div>
    <div class="tyg-div-denglv" style="text-align: center">
      <div class="tyg-div-form">

        <h2 style="text-align: center; padding-top: 15px">管理登录</h2>
        <div style="margin:5px 0px; text-align: center">
          <input v-model="user" type="text" placeholder="请输入账号..."/>
        </div>
        <div style="margin:5px 0px; text-align: center">
          <input v-on:keyup.enter="login" v-model="password" type="password" placeholder="请输入密码..."/>
        </div>
        <button v-on:click="login" style="text-align: center">登<span style="width:20px;"></span>录</button>

      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "superAdmin",
      data(){
          return {
            user:"",
            password:"",
          }
      },
      methods:{
        login(){
          this.$http({
            method: 'post',
            url: 'http://localhost:2173/superAdmin',
            data:{
              user:""+this.user,
              password: ""+this.password,
              step:1
            }
          }).then((response) =>{
            if (response.data == '登录失败'){
              alert('账号或密码错误！');
              this.password = "";
            } else {
              this.$store.state.user = response.data;
              alert('登录成功')
              this.$store.commit('emptyLocalStorage')
              this.$store.commit('UseLocalStorage');
              this.$router.push('/superAdminMain')
            }
          })
        },
      }
    }
</script>

<style scoped>



  ul li{font-size: 30px;color:#2ec0f6;}

  .tyg-div-denglv{
    z-index:1000;position:fixed;right:50%;top:50%;
    transform: translateX(160px) translateY(-260px);
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

  .bg{
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100vh;
  }
</style>
