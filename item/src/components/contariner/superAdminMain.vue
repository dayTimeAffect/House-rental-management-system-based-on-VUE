<template>
  <div>
    <div class="nav">
      <div class="containerTop">
        <ul class="left">
          <li  v-on:click="showPage(1)"><i class="fa fa-home fa-lg"></i> 房屋租赁管理系统</li>
        </ul>
        <ul class="right">
          <li v-on:mouseenter="user_operations_hide = true" v-on:mouseleave="user_operations_hide = false">
            <span>用户</span>
            <i class="fa fa-angle-down userInterface"></i>
            <div class="user-operations" v-if="user_operations_hide">
              <div class="reserved" v-on:click="showPage(1)">返回主页</div>
              <div class="reserved" v-on:click="showPage(2)">房东管理</div>
              <div class="reserved" v-on:click="showPage(3)">租客管理</div>
              <div class="logout" v-on:click="logout">退出系统</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div style="width: 100%;height: 80vh;overflow: auto">
      <div class="main">
        <div class="welcome" v-if="show == 1">
          <div class="welcome_box">
            <img src="../../assets/slide1.jpg" alt="">
            <div class="welcome_box-content">
              <h3 style="font-size: 40px" class="welcome_title">Welcome</h3>
            </div>
            <div class="welcome_box-btn">
              <span v-on:click="showPage(2)">前往房东管理</span>
              <br>
              <span style="margin-top: 15px;display: inline-block" v-on:click="showPage(3)">前往租客管理</span>
            </div>
          </div>

        </div>
        <div class="landlordManage" v-else-if="show == 2">
          <table id="landlordDetails" class="table_details">
            <tr>
              <td>序号</td>
              <td>账号</td>
              <td>姓名</td>
              <td>性别</td>
              <td>年龄</td>
              <td>电话</td>
              <td class="more">操作</td>
            </tr>
            <tr v-for="(info,index) in infos.landlord" class="gery_bg">
              <td>{{index+1}}</td>
              <td>{{info.user}}</td>
              <td>{{info.name}}</td>
              <td>{{info.sex}}</td>
              <td>{{info.age}}</td>
              <td>{{info.phone}}</td>
              <td class="more">
                <span  v-on:click="remove(1,info)">删除</span>
                <span  v-on:click="showPage(4,info)">查看其发布房屋</span>
              </td>
            </tr>
          </table>
        </div>
        <div class="lesseeManage"  v-else-if="show == 3">
          <table class="table_details">
            <tr>
              <td>序号</td>
              <td>账号</td>
              <td>姓名</td>
              <td>性别</td>
              <td>年龄</td>
              <td>电话</td>
              <td class="more">操作</td>
            </tr>
            <tr v-for="(info,index) in infos.lessee" class="gery_bg">
              <td>{{index+1}}</td>
              <td>{{info.user}}</td>
              <td>{{info.name}}</td>
              <td>{{info.sex}}</td>
              <td>{{info.age}}</td>
              <td>{{info.phone}}</td>
              <td class="more">
                <span  v-on:click="remove(2,info)">删除</span>
                <span  v-on:click="showPage(4,info)">查看其预订房屋</span>
              </td>
            </tr>
          </table>
        </div>
        <div class="otherInfo"  v-else-if="show == 4">
          <table class="table_details">
            <tr>
              <td class="choose">序号</td>
              <template v-for="(info,index) in otherInfos[other_show][0].title">
                <td :class="index">{{info}}</td>
              </template>
              <td class="more">操作</td>
            </tr>
            <template v-if="other_show == 'landlord'">
              <tr  v-for="(info,index) in otherInfos.landlord.infos" class="gery_bg" >
                <td class="choose">{{index+1}}<span>. </span><input type="checkbox" ref="checkboxs" name="info"></td>
                <td class="title" :title="info.title">{{info.title}}</td>
                <td class="rentType" :title="info.rentType">{{info.rentType}}</td>
                <td class="houseArea" :title="info.houseArea">{{info.houseArea}}</td>
                <td class="location" :title="info.location_county + info.location_street">{{info.location_county}}{{info.location_street}}</td>
                <td class="houseTheme" :title="info.houseTheme">{{info.houseTheme}}</td>
                <td class="price" :title="info.price">{{info.price}}元/月</td>
                <td class="more"><span v-on:click="detailsSwitch(info)">详情</span></td>
              </tr>
              <p v-if="nodata['2'] == true" style="text-align: center">暂无数据</p>
            </template>
            <template v-else>
              <tr  v-for="(info,index) in otherInfos.lessee.infos" class="gery_bg" >
                <td class="choose">{{index+1}}<span>. </span><input type="checkbox" ref="checkboxs" name="info"></td>
                <td class="title" :title="info.title">{{info.houseId}}</td>
                <td class="houseArea" :title="info.houseArea">{{info.renter_user}}</td>
                <td class="rentType" :title="info.rentType">{{info.linkman_user}}</td>
                <td class="location" :title="info.location_county + info.location_street">{{timeDispose(info.bookTime)}}</td>
                <td class="houseTheme" :title="info.houseTheme">{{timeDispose(info.rentTime)}}</td>
                <td class="price" :title="info.price">{{timeDispose(info.endTime)}}</td>
                <td class="more"><span v-on:click="remove(3,info)">删除</span></td>
              </tr>
              <p v-if="nodata['3'] == true" style="text-align: center">暂无数据</p>
            </template>
          </table>

        </div>
      </div>
    </div>

    <div class="details" v-if="isDetails">
      <div class="detailsTop">
        <span >详情</span>
        <span v-on:click="detailsSwitch"><i class="fa fa-close fa-2x"></i></span>
      </div>
      <div class="detailsContariner" >
        <p><span>房屋唯一id：</span><span>{{otherInfos.details.id}}</span></p>
        <p><span>宣传标题：</span><span>{{otherInfos.details.title}}</span></p>
        <p><span>出租类型：</span><span>{{otherInfos.details.rentType}}</span></p>
        <p><span>房屋类型：</span><span>{{otherInfos.details.houseType}}</span></p>
        <p><span>出租房屋面积：</span><span>{{otherInfos.details.houseArea}}</span></p>
        <p><span>出租房屋装修水平：</span><span>{{otherInfos.details.houseTheme}}</span></p>

        <p><span>房屋所在区县：</span><span>{{otherInfos.details.location_county}}</span></p>
        <p><span>房屋所在街道：</span><span>{{otherInfos.details.location_street}}</span></p>
        <p><span>价格：</span><span>{{otherInfos.details.price}}元/月</span></p>
        <p><span>发布人姓名：</span><span>{{otherInfos.details.linkman_name}}</span></p>
        <p><span>发布人账号：</span><span>{{otherInfos.details.linkman_user}}</span></p>
        <p><span>发布人电话：</span><span>{{otherInfos.details.linkman_phone}}</span></p>
        <p><span>发布时间：</span><span>{{timeDispose(otherInfos.details.publish_time)}}</span></p>
        <p><span>备注：</span><span>{{otherInfos.details.remark}}</span></p>
      </div>

      <div class="detailsFooter">
        <p class="detailsBtn">
          <button v-on:click="detailsSwitch({})">关闭</button>
          <button v-on:click="remove(4,otherInfos.details)">撤销</button>
        </p>
      </div>

    </div>
    <div v-if="nodata['2'] == true" style="opacity: 0"></div>
  </div>
</template>

<script>
    export default {
        name: "superAdminMain",
      data () {
        return {
          isDetails:false,
          hide:true,
          user_operations_hide:false,
          show:1,
          infos:{
            landlord:[],
            lessee:[]
          },
          otherInfos:{
            landlord:[{
              title: {title:"宣传标题",rentType:"出租类型",houseArea:"面积",location:"房屋地址",houseTheme:"房屋装修主题",price:"房屋租赁价格"},
              infos:[]
            }],
            lessee:[{
              title:{title:"房屋id",rentType:"租客账号",houseArea:"房东账号",location:"预租时间",houseTheme:"入住时间",price:"结束时间"},
              infos:[]
            }],
            details:{}
          },
          other_show:"landlord",
          aaa:11,
          nodata:{
            2:true,
            3:true,
            4:true
          }
        }
      },
      methods:{

        logout(){
          let logoutStr = window.confirm("是否退出系统！");
          if (logoutStr){
            this.$store.state.user = {};
            this.$store.state.reserved = '';
            this.$store.commit('emptyLocalStorage')
            this.$router.push('/superAdmin')
          }
        },
        showPage(num,info,key){
          key = key || this.show
          if (num == '4'){
            if (key == 2){
              this.other_show = "landlord"
              this.$http({
                method: 'post',
                url: 'http://localhost:2173/superQuery',
                data:{
                  user:info.user,
                  step:1
                }
              }).then((response) =>{
                if (response.data == '暂无数据'){
                  this.nodata[key] = true
                  this.otherInfos.landlord.infos = []
                }else {
                  this.nodata[key] = false
                  this.otherInfos.landlord.infos = response.data
                  this.show = num;
                }
              })
            }
            else if (key == 3){
              this.other_show = "lessee"
              this.$http({
                method: 'post',
                url: 'http://localhost:2173/superQuery',
                data:{
                  user:info.user,
                  step:2
                }
              }).then((response) =>{
                if (response.data == '暂无数据'){
                  this.nodata[key] = true
                  this.otherInfos.lessee.infos = []
                }else {
                  this.nodata[key] = false
                  this.otherInfos.lessee.infos = response.data
                  this.show = num;
                }
              })
            }
          }
          else{
            this.show = num;
          }
          // this.show = num;
        },
        detailsSwitch(info){
          this.otherInfos.details = info;
          this.isDetails = !this.isDetails
        },
        /*UTC时间处理*/
        timeDispose(time) {
          if (time == null) return "无"
          let year = Number(time.slice(0,4)),
            month = Number(time.slice(5,7)),
            day = Number(time.slice(8,10));
          day = 1 + day;
          let arr = [1,3,5,7,8,10,12],
            brr = [4,6,9,11];
          if (arr.indexOf(month)){
            if (day > 31){
              month = 1+month;
              day = 1
            }
          }else if(brr.indexOf(month)){
            if (day > 30){
              month = 1+month;
              day = 1
            }
          }else {
            if (day > 28){
              month = 1+month;
              day = 1
            }
          }
          if (month > 12){
            month = 1;
            year = 1+year
          }
          if (month < 10){
            month = "0"+month
          }
          if (day < 10){
            day = "0"+day
          }
          return `${year}-${month}-${day}`
        },
        remove(num,info){
          this.nodata["2"] = false;
          this.aaa = 222;
          this.$http({
            method: 'post',
            url: 'http://localhost:2173/remove',
            data:{
              num:num,
              info:info,
            }
          }).then((response) =>{
            this.aaa = 111;
            this.isDetails = false
            alert(response.data);
            if (num == 4){
              this.showPage(4,info,2)
            }
            else if (num == 3){
              console.log(info);
              this.showPage(4,{user:info.renter_user},3)
            }
            else if(num == 1 || num == 2){
              this.$http({
                method: 'post',
                url: 'http://localhost:2173/superAdmin',
                data:{
                  step:2
                }
              }).then((response) =>{
                this.nodata["2"] = true;
                this.infos.landlord = [];
                this.infos.lessee = []
                this.infos.landlord = response.data[0]["landlord"]
                this.infos.lessee = response.data[0]["lessee"]
              })

            }
            this.nodata["2"] = true;

          })
        },

      },
      computed:{

      },
      mounted() {
        this.$http({
          method: 'post',
          url: 'http://localhost:2173/superAdmin',
          data:{
            step:2
          }
        }).then((response) =>{
          this.infos.landlord = response.data[0]["landlord"]
          this.infos.lessee = response.data[0]["lessee"]
        })
      }
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
    font-size: 20px;
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
    font-size: 15px;
  }
  .user-operations>div{
    height: 60px;
    color: #333;
    cursor: pointer;
  }
  .user-operations>{
    border-bottom: 1px solid #ccc;
  }
  .logout:hover,
  .reserved:hover{
    color: #23b8ff;
  }

  .main{
    width: 80%;
    margin: auto;
  }

  .welcome_box {
    font-family: 'Ubuntu', sans-serif;
    overflow: hidden;
    position: relative;
    transition: all 0.3s;
  }
  .welcome_box:hover {
    box-shadow: 0 0 15px -5px #000;
  }
  .welcome_box:before {
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
  .welcome_box:hover:before {
    opacity: 1;
  }
  .welcome_box img {
    width: 100%;
    height: auto;
    transition: all 0.3s ease 0s;
  }
  .welcome_box:hover img {
    filter: blur(2px);
  }
  .welcome_box .welcome_box-content {
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
  .welcome_box:hover .welcome_box-content {
    top: 0;
  }
  .welcome_box .welcome_title {
    color: #fff;
    font-size: 23px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin: 0;
  }
  .welcome_box .welcome_post {
    color: #32c287;
    font-size: 14px;
    font-style: italic;
    text-transform: capitalize;
    letter-spacing: 2px;
  }
  .welcome_box-btn{
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

  table{
    width: calc(100% - 15px);
    table-layout:fixed;
    border-spacing:0px;
    border-collapse: collapse;
    margin-top: 10px;
  }
  td{
    text-overflow:ellipsis;
    overflow: hidden;
    white-space:nowrap;
  }
  table>tr{
    width: 100%;
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    color: #333;
    text-align: center;

  }
  table>tr:first-child{
    font-size: 16px;
    margin-top: 0;
    padding: 0;
    width: 100%;
    background: #f2f2f2 url(./../../assets/table-head-bg.jpg) 0 0 repeat;
    border: 1px solid #dcdcdc;
    height: 34px;
    line-height: 34px;
    zoom: 1;
    border-radius: 10px;
  }
  .more{
    width: 150px;
  }
  .more>span{
    color: #338af9;
  }
  .more>span:hover{
    cursor: pointer;
  }
  .gery_bg:nth-child(2n+1){
    background-color: #eee;
  }

  .table_details{
    overflow: auto;
  }
  .choose{
    width: 45px;
  }
  .title{
    width: 12%;
  }
  .rentType{
    width: 8%;
  }
  .houseArea{
    width: 8%;
  }
  .location{
    width: 8%;
  }
  .houseTheme{
    width: 8%;
  }
  .price{
    width: 8%;
  }
  .landlordManage{
    width: 100%;
  }

  /*详情界面布局*/
  .details{
    width: 500px;
    height: 400px;
    position: fixed;
    left: 40%;
    top: 25%;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0px 0px 6px #555;
    z-index: 999;
  }
  .detailsTop{
    width: 100%;
    height: 40px;
    overflow: hidden;
    background-color: #189098;
  }
  .detailsTop>span:first-child{
    margin: 0 0 0 10px;
    text-align: left;
    font-size: 16px;
    line-height: 40px;
    float: left;
    color: #fff;
    font-weight: bold;
  }
  .detailsTop>span:last-child{
    margin-left: 410px;
  }
  .detailsTop>span:last-child>i{
    color: #fff;
    line-height: 40px;
    cursor: pointer;
  }
  .detailsContariner{
    display: flex;
    width: 100%;
    height: 300px;
    background-color: #fcfcfc;
    justify-content:center;
    flex-direction:column;
    flex-wrap: nowrap;
  }
  .detailsContariner>p{
    flex: 1;
  }
  .detailsContariner>p>span:first-child{
    display: inline-block;
    width: 120px;
    padding-left: 15px;
  }
  .detailsContariner>p>span:last-child{
    display: inline-block;
    width: calc(100% - 135px);
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
  }
  .detailsFooter{
    width: 100%;
    /*position: relative;*/
    height: 60px;
    background-color: #f5f5f5;
    border-top: 1px solid #ddd;
    padding: 17px 0;
  }
  .detailsFooter>.detailsBtn{
    text-align: center;
  }
  .detailsFooter>.detailsBtn>button {
    display: inline-block;
    min-width: 66px;
    padding: 4px 12px;
    background: #fafafa;
    margin-bottom: 0;
    margin-right: 3px;
    font-size: 12px;
    color: #333;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    border: 1px solid #d9d9d9;
    border-radius: 3px;
  }

</style>
