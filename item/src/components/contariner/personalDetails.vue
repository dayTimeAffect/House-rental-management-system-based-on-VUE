<template>
  <div id="personalDetails">
    <div class="personalDetails_main">
      <div class="personalDetails_main_top">
        <p style="margin: 50px 0px 26px 0px;padding-left: 35px;font-size: 16px;color: #5c5c5c;padding-bottom: 10px;border-bottom: 1px solid #acacac;">基本信息</p>
        <div class="personalDetails_main_info" style="margin-left: 15px">
          <p class="infoLine">账号：<span style="padding-left: 15px;color: #3a4585;font-size: 13px">{{user}}</span></p>
          <p class="infoLine">姓名：
            <span style="padding-left: 15px;color: #3a4585;font-size: 13.333px" v-if="!newInfo.isAlter">{{name}}</span>
            <input type="text" v-model="newInfo.name" class="newInfo" v-else>
          </p>
          <p class="infoLine">性别：
            <span style="padding-left: 15px;color: #3a4585;font-size: 13.333px" v-if="!newInfo.isAlter">{{sex}}</span>
            <input type="text" v-model="newInfo.sex" v-else class="newInfo">
          </p>
          <p class="infoLine">年龄：
            <span style="padding-left: 15px;color: #3a4585;font-size: 13.333px" v-if="!newInfo.isAlter">{{age}}</span>
            <input type="text" v-model="newInfo.age" v-else class="newInfo">
          </p>
          <p class="infoLine">电话：
            <span style="padding-left: 15px;color: #3a4585;font-size: 13.333px" v-if="!newInfo.isAlter">{{phone}}</span>
            <input type="text" v-model="newInfo.phone" v-else class="newInfo">
          </p>
          <p class="infoLine">邮箱：
            <span style="padding-left: 15px;color: #3a4585;font-size: 13.333px" v-if="!newInfo.isAlter">{{email}}</span>
            <input type="text" v-model="newInfo.email" v-else class="newInfo">
          </p>
        </div>
        <div class="personalDetails_main_img" style="margin-right: 15px">
          <div style="width: 150px;height: 200px;box-shadow: 0px 1px 3px #a3a3a3">
            <img src="" alt="" style="width: 150px;height: 200px;" id="userHeaderImg">
            <img src="../../assets/3.jpg" style="width: 150px;height: 200px;" alt="" v-if="noneImg">
          </div>
            <!--<p style="text-align: center;padding-top: 10px;font-size: 14px"><span style="color: #338af9;cursor: pointer">修改头像</span></p>-->
        </div>
        <div class="clear"></div>
      </div>
      <div class="personalDetails_main_footer">
        <p>
          <span v-on:click="goBack">返回</span>
          <span v-on:click="alterInfo">
            <span v-if="!newInfo.isAlter">修改信息</span>
            <span v-else>保存</span>
          </span>
        </p>
      </div>

<!--      <img src="../../assets/2.jpg" alt="" id="portrait" style="width: 300px;height: 300px" />
      <input type="file" id="saveImage" ref="file" accept="image/*" multiple="multiple" name="f1"/>
      <button v-on:click="release">提交</button>-->
    </div>
    <!--<img src="" alt="" id="test1">-->
  </div>
</template>

<script>
    export default {
      name: "personalDetails",
      data() {
        return {
          fileImg: [],
          img: "",
          text:"",
          user:this.$store.state.user.user,
          name:this.$store.state.user.name,
          sex:this.$store.state.user.sex,
          age:this.$store.state.user.age,
          phone:this.$store.state.user.phone,
          email:this.$store.state.user.email,
          noneImg:true,
          newInfo:{
            isAlter:false,
            name:this.$store.state.user.name,
            sex:this.$store.state.user.sex,
            age:this.$store.state.user.age,
            phone:this.$store.state.user.phone,
            email:this.$store.state.user.email,
          }
        }
      },
      methods: {

        release() {
          document.getElementById('test1').src = this.$store.state.img;
          console.log(this.$store.state.img)
/*          this.fileImg = this.$refs.file.files[0];
          // this.imgSrc = this.$refs.file.value;
          let data = new FormData();
          data.append('file', this.fileImg);
          this.$http({
            method: 'post',
            url: 'http://localhost:2173/release',
            'Content-Type': 'multipart/form-data',
            responseType: 'blob',
            data: data
          }).then((response) => {
            // this.img = "../../../../后台/house/temporary"+response.data
            // console.log(response.data);
            // document.getElementById('portrait').src = response.data;
            let url = URL.createObjectURL(response.data)
            console.log(url);

            document.getElementById('test1').src = url
            // this.text("../../../../后台/house/temporary/"+response.data)
            // document.getElementById('test1').src = "../../../../后台/house/temporary/"+response.data;

          })*/
        },
        /*
        * 动态显示上传的图片
        * */
        getImg() {

          document.getElementById('saveImage').onchange = function () {
            var imgFile = this.files[0];
            var fr = new FileReader();
            fr.onload = function () {
              document.getElementById('portrait').src = fr.result;
            };
            fr.readAsDataURL(imgFile);

          }
        },
        /*
        * 返回
        * */
        goBack(){
          if (this.newInfo.isAlter == true){
            this.newInfo.isAlter = !this.newInfo.isAlter;
            this.name=this.$store.state.user.name;
            this.sex=this.$store.state.user.sex;
            this.age=this.$store.state.user.age;
            this.phone=this.$store.state.user.phone;
            this.email=this.$store.state.user.email;
          }else if (this.newInfo.isAlter == false) {
            this.$router.go(-1);
          }
        },
        /*
        * 修改信息
        * */
        alterInfo(){
          this.newInfo.isAlter = !this.newInfo.isAlter;
          if (this.newInfo.isAlter == false){
            this.$http({
              method: 'post',
              url: 'http://localhost:2173/changeInfo',
              data:{
                name:this.newInfo.name,
                sex:this.newInfo.sex,
                age:this.newInfo.age,
                phone:this.newInfo.phone,
                email:this.newInfo.email,
                manage:this.$store.state.user.manage,
                user:this.user
              }
            }).then((response)=>{
              if (response.data == '修改成功') {
                alert("修改成功")
                this.name=this.newInfo.name;
                this.sex=this.newInfo.sex;
                this.age=this.newInfo.age;
                this.phone=this.newInfo.phone;
                this.email=this.newInfo.email;
                /*修改VUEX中数据*/
                this.$store.state.user.name = this.name;
                this.$store.state.user.sex = this.sex;
                this.$store.state.user.age = this.age;
                this.$store.state.user.phone = this.phone;
                this.$store.state.user.email = this.email;
                /*修改seesionStorage*/
                this.$store.commit("UseLocalStorage")
              }else {
                this.name=this.$store.state.user.name;
                this.sex=this.$store.state.user.sex;
                this.age=this.$store.state.user.age;
                this.phone=this.$store.state.user.phone;
                this.email=this.$store.state.user.email;
              }
            })

          }
        },
      },
      created(){
        if (String(this.$store.state.user.path) != 'null' && String(this.$store.state.user.path) != 'undefined') {
          this.$http({
            method: 'post',
            url: 'http://localhost:2173/login',
            responseType: 'blob',
            data: {
              path:""+this.$store.state.user.path
            }
          }).then((response) => {
            let url = URL.createObjectURL(response.data);
            this.$store.state.img = url
            document.getElementById('userHeaderImg').src = this.$store.state.img
          })
          this.noneImg = false;
        }
      },
      mounted() {
        // this.getImg();
      },
    }
</script>

<style scoped>
  .personalDetails_main{
    width: 100%;
    height: 100%;
  }
  .personalDetails_main_top{
    width: 80%;
    height: 500px;
    margin: auto;
    overflow: hidden;
  }
  .personalDetails_main_info{
    float: left;
    height: 500px;
  }
  .personalDetails_main_info>p{
    font-size: 14px;
    margin: 25px 0;
    width: 300px;
  }
  .personalDetails_main_img{
    float: right;
  }
  .personalDetails_main_footer{
    width: 80%;
    margin: auto;
    text-align: center;
  }
  .personalDetails_main_footer>p>span{
    display: inline-block;
    width: 70px;
    height: 30px;
    margin: 0px 15px;
    line-height: 30px;
    border: 1px solid #dcdcdc;
    background-color: #eeeeee;
    cursor: pointer;
  }
  .infoLine{
    box-sizing: border-box;
    height: 30px;
    line-height: 30px;
  }
  .newInfo{
    box-sizing: border-box;
    height: 25px;
    margin-left: 14px;
    border: 1px solid #999;
    color: rgb(58, 69, 133);
  }
</style>
