<template>
    <div id="welcome">
      <div class="box" v-if="!help">
        <img src="../../assets/slide1.jpg" alt="">
        <div class="box-content">
          <h3 style="font-size: 40px" class="title">Welcome</h3>
          <span v-if="manage == 'true'" style="font-size: 24px" class="post">房屋租赁管理系统</span>
          <span v-if="manage == 'false'" style="font-size: 24px" class="post">房屋租赁</span>
        </div>
        <div class="box-btn">
          <span v-on:click="goExamine">前往房屋租赁</span>
          <br>
          <span style="margin-top: 15px;display: inline-block" v-on:click="changeWelcome(1)">帮助中心</span>
        </div>
      </div>

      <div class="help" v-if="help">
        <template v-if="this.$store.state.reserved == 'false'">
          <img src="../../assets/help1.png" alt="">
          <hr>
          <img src="../../assets/help2.png" alt="">
          <hr>
          <img src="../../assets/help3.png" alt="">
          <hr>
          <img src="../../assets/help4.png" alt="">
          <hr>
          <img src="../../assets/help5.png" alt="">
          <hr>
        </template>
        <template v-if="this.$store.state.reserved == 'true'">
          <img src="../../assets/userHelp1.png" alt="">
          <hr>
          <img src="../../assets/userHelp2.png" alt="">
          <hr>
        </template>

        <p v-if="help" style="height: 30px; margin-top: 20px;text-align: center" class="goP">
          <span v-on:click="changeWelcome(2)">返回</span>
          <!--<span v-on:click="changeWelcome(2)" style="width: 70px;height: 30px;margin: 0px 15px;line-height: 30px;border: 1px solid #dcdcdc;background-color: #eeeeee;cursor: pointer;">返回</span>-->
        </p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "welcome",
      data(){
          return{
            manage:this.$store.state.user.manage,
            help:false
          }
      },
      methods:{
          goExamine(){
            this.$router.push("/manageMain/examine")
          },
        changeWelcome(boolean){
            if (boolean == 1){
              this.help = true
            } else if (boolean == 2) {
              this.help = false
            }
        },


      }
    }
</script>

<style scoped>
  #welcome{
    width: 100%;
    height: 85vh;
    /*background-image: url("../../assets/slide1.jpg");*/
    /*background-size: 100%;*/
  }
  .help{
    width: 100%;
    height: 90%;
    overflow: scroll;
  }
  .help img{
    width: 100%;
    margin-top: 15px;
  }
  .goP span{
    text-align: center;
    display: inline-block;
    font-size: 20px;
    width: 70px;
    line-height: 30px;
    cursor: pointer;
    border: 1px solid #dcdcdc;
    background-color: #eeeeee;
    margin-bottom: 20px;
  }
  .box {
    font-family: 'Ubuntu', sans-serif;
    overflow: hidden;
    position: relative;
    transition: all 0.3s;
  }
  .box:hover {
    box-shadow: 0 0 15px -5px #000;
  }
  .box:before {
    content: '';
    background-color: transparent;
    background-image: radial-gradient(circle at 20% 80%, transparent 29%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.4) 33%, transparent 34%),  radial-gradient(circle at 80% 20%, transparent 29%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.4) 33%, transparent 34%);
    background-size: 30px 30px;
    height: 100%;
    width: 100%;
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    transition: all 0.3s ease 0.2s;
  }
  .box:hover:before {
    opacity: 1;
  }
  .box img {
    width: 100%;
    height: auto;
    transition: all 0.3s ease 0s;
  }
  .box:hover img {
    filter: blur(2px);
  }
  .box .box-content {
    color: #fff;
    background-color: rgba(0,0,0,0.6);
    text-align: center;
    width: 100%;
    height: 59%;
    padding: 18% 0 0 0;
    position: absolute;
    left: 0;
    top: -100%;
    z-index: 2;
    transition: all 0.3s ease 0s;
  }
  .box:hover .box-content {
    top: 0;
  }
  .box .title {
    color: #fff;
    font-size: 23px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin: 0;
  }
  .box .post {
    color: #32c287;
    font-size: 14px;
    font-style: italic;
    text-transform: capitalize;
    letter-spacing: 2px;
  }
  .box-btn{
    position: absolute;
    height: 30px;
    z-index: 99;
    top: 40%;
    left: 70%;
    font-size: 24px;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    line-height: 30px;
  }


</style>
