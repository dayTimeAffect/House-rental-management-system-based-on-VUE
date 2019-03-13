<template>
    <div id="examine">

        <div class="header_title">
        <span class="search">
          <span v-on:click="search"><i class="fa fa-search"></i></span>
          <input type="text" placeholder="根据出租类型检索" ref="search_input" v-on:blur="search" v-on:keyup.enter="search">
        </span>
          <div class="btn">
            <div class="revocation" v-on:click="revocation" title="撤销发布"></div>
            <div class="refresh" v-on:click="reload" title="刷新"></div>
            <div class="export" title="导出"></div>
          </div>

        </div>
        <div id="examine_manage">
          <table>
            <tr>
              <td class="choose">序号</td>
              <td class="title">宣传标题</td>
              <td class="rentType">出租类型</td>
              <td class="houseArea">面积</td>
              <td class="location">房屋地址</td>
              <td class="houseTheme">房屋装修主题</td>
              <td class="price">房屋租赁价格</td>
              <td class="more">操作</td>
            </tr>
            <tr v-if="nodata.is" v-for="(info,index) in infos[pn]" class="gery_bg" >
              <td class="choose">{{index+1}}<span>. </span><input type="checkbox" ref="checkboxs" name="info"></td>
              <td class="title" :title="info.title">{{info.title}}</td>
              <td class="rentType" :title="info.rentType">{{info.rentType}}</td>
              <td class="houseArea" :title="info.houseArea">{{info.houseArea}}</td>
              <td class="location" :title="info.location_county + info.location_street">{{info.location_county}}{{info.location_street}}</td>
              <td class="houseTheme" :title="info.houseTheme">{{info.houseTheme}}</td>
              <td class="price" :title="info.price">{{info.price}}元/月</td>
              <td class="more"><span v-on:click="detailsSwitch(info)">详情</span></td>
            </tr>

          </table>
          <p v-if="!nodata.is" style="text-align: center">{{nodata.data}}</p>
        </div>
        <div class="footer">
          <div class="paging">
            <span v-on:click="set_pn(1)">首页</span>
            <span class="angle-left" v-on:click="minusPn"><i class="fa fa-angle-left"></i></span>
            第&nbsp;
            <input type="text" ref="pag" v-on:blur="input_pag" value="1" v-on:focus="input_mr_pag" v-on:keyup.enter="input_pag">
            页 /共&nbsp;{{maxPn}}&nbsp;页
            <span class="angle-right" v-on:click="addPn"><i class="fa fa-angle-right"></i></span>
            <span v-on:click="set_pn(maxPn)">尾页</span>
          </div>
        </div>

      <div class="details" v-if="isDetails">
        <div class="detailsTop">
          <span>详情</span>
          <span v-on:click="detailsSwitch"><i class="fa fa-close fa-2x"></i></span>
        </div>
        <div class="detailsContariner">



          <p><span>宣传标题：</span><span>{{detailsDate.title}}</span></p>
          <p><span>出租类型：</span><span>{{detailsDate.rentType}}</span></p>
          <p><span>房屋类型：</span><span>{{detailsDate.houseType}}</span></p>
          <p><span>出租房屋面积：</span><span>{{detailsDate.houseArea}}</span></p>
          <p><span>出租房屋装修水平：</span><span>{{detailsDate.houseTheme}}</span></p>

          <p><span>房屋所在区县：</span><span>{{detailsDate.location_county}}</span></p>
          <p><span>房屋所在街道：</span><span>{{detailsDate.location_street}}</span></p>
          <p><span>价格：</span><span>{{detailsDate.price}}元/月</span></p>
          <p><span>发布人姓名：</span><span>{{detailsDate.linkman_name}}</span></p>
          <p><span>发布人账号：</span><span>{{detailsDate.linkman_user}}</span></p>
          <p><span>发布人电话：</span><span>{{detailsDate.linkman_phone}}</span></p>
          <p><span>发布时间：</span><span>{{detailsDate.publish_time}}</span></p>
          <p><span>备注：</span><span>{{detailsDate.remark}}</span></p>



        </div>
        <div class="detailsFooter">
          <p class="detailsBtn"><button v-on:click="detailsSwitch">关闭</button></p>
        </div>

      </div>

    </div>
</template>

<script>
    export default {
      inject:["reloadContarinerMain"],
      name: "examine",
      data(){
        return {
          infos:{},
          user:this.$store.state.user,
          name:this.$store.state.name,
          manage: this.$store.state.manage,
          pn:1,
          maxPn:1,
          maxInfo:10,
          mr:1,
          nodata:{
            is:true,
            data:"当前暂无数据"
          },
          isDetails:false,
          detailsDate:{},
        }
      },
      methods:{
          /*
          * 分页
          * */
        set_pn(opt){
            this.pn = opt;
          this.$refs.pag.value = this.pn;
          this.$refs.checkboxs.forEach(function (value, index, array) {
            let checkbox = value;
            checkbox.checked = false;
          })
        },
        addPn(){
            this.pn++;
            if(this.pn >= this.maxPn){
              this.pn = this.maxPn;
            }
          this.$refs.pag.value = this.pn;
          this.$refs.checkboxs.forEach(function (value, index, array) {
            let checkbox = value;
            checkbox.checked = false;
          })
        },
        minusPn(){
          this.pn--;
          if(this.pn <= 1){
            this.pn = 1;
          }
          this.$refs.pag.value = this.pn;
          this.$refs.checkboxs.forEach(function (value, index, array) {
            let checkbox = value;
            checkbox.checked = false;
          })
        },
        input_pag(){
          if (this.$refs.pag.value > this.maxPn){
            this.pn = this.maxPn;
            this.$refs.pag.value = this.maxPn
          }else if (this.$refs.pag.value < 1){
            this.pn = 1;
            this.$refs.pag.value = 1
          } else {
            if (Boolean(this.$refs.pag.value)){
              this.pn = Number(this.$refs.pag.value)
              this.$refs.checkboxs.forEach(function (value, index, array) {
                let checkbox = value;
                checkbox.checked = false;
              })
            } else {
              this.pn = this.mr
              this.$refs.pag.value =this.mr
            }
          }


        },
        input_mr_pag(){
          this.mr = Number(this.$refs.pag.value)
        },
        /*
        * 初始数据加载
        * */
        get_infos(){
          let data = {
            user:""+this.user.user,
            name: ""+this.user.name,
            manage:this.user.manage,
          }
          this.$http({
            method: 'post',
            url: 'http://localhost:2173/examine',
            data:data
          }).then((response) =>{
            if (response.data == '暂无数据'){
              this.nodata.is = false
              this.pn = 1;
              this.maxPn = 1;
            }else {
              this.nodata.is = true;
              response.data.reverse()
              let pn = Math.ceil(response.data.length / this.maxInfo);
              this.maxPn = pn;
              for(let i = 1; i <= pn;i++){
                this.infos[""+i] = response.data.slice(this.maxInfo*(i - 1),this.maxInfo*i)
              }
            }
          })
        },
        /*
        * 搜索
        * */
        search(){
          let data = {
            user:""+this.user.user,
            name: ""+this.user.name,
            manage:this.user.manage,
            rentType:""+this.$refs.search_input.value
          }
          this.$http({
            method: 'post',
            url: 'http://localhost:2173/examine',
            data:data
          }).then((response) =>{
            if (response.data == '暂无数据'){
              this.nodata.is = false
              this.pn = 1;
              this.maxPn = 1;
            }else {
              this.nodata.is = true;
              let pn = Math.ceil(response.data.length / this.maxInfo);
              this.maxPn = 0;
              setTimeout(()=>{
                this.maxPn = pn;
              },1);

              for(let i = 1; i <= pn;i++){
                this.infos[""+i] = response.data.slice(this.maxInfo*(i - 1),this.maxInfo*i)
              }

            }
          })
        },
        /*
        * 刷新
        * */
        reload(){

          this.reloadContarinerMain()
        },
        /*
        * 撤销发布
        * */
        revocation(){

          let revocationArr = [];
          this.$refs.checkboxs.forEach((value, index, array) => {
            let checkbox = value;
            if (checkbox.checked) {
              revocationArr.push(this.infos[this.pn][index])
            }
            // console.log(checkbox.checked,index,this.infos[this.pn][index]);
          });
          if (revocationArr.length > 0){
            let str = window.confirm("你是否要撤销这"+revocationArr.length+"项记录！")
            if(str == true){
              this.$http({
                url:'http://localhost:2173/delete',
                method:'post',
                data:revocationArr,
              }).then((response) =>{
                if(response.data == "撤销成功"){
                  this.get_infos();
                  this.reloadContarinerMain()
                  alert("撤销成功")
                }else {
                  alert("撤销失败")
                }
              })
            }
          }

        },
        /*
        * 详情界面
        * */
        detailsSwitch(data){//界面的显示
          this.detailsDate = data;
          this.isDetails = !this.isDetails;

          console.log(this.detailsDate);
        },

      },
      created() {
        this.get_infos()
      }

    }
</script>

<style scoped>
#examine{
  width: 100%;
  margin-left: 15px;
}
.header_title{
  width: 100%;
  height: 40px;
  line-height: 40px;
  position: relative;
}
.header_title .search{
  position: absolute;
  right: 180px;
}
.header_title .search>input{
  height: 24px;
  width: 175px;
  padding: 2px 6px;
  line-height: 24px;
  border: 1px solid #d7d6d7;
  border-radius: 4px;
  color: #555;
  background: #fff;
}
.header_title .search>span{
  display: inline-block;
  width: 24px;
  height: 24px;
  position: relative;
  left: 191px;
  cursor: pointer;
}
.btn{
  display: inline-block;
  width: 150px;
  position: absolute;
  top: 6px;
  right: 0;
}
.revocation,
.refresh,
.export{
  display: inline-block;
  height: 28px;
  line-height: 28px;
  background: url(./../../assets/icon.png) no-repeat;
  width: 28px;
  cursor: pointer;
  margin: 0px 6px;
}
.revocation{
  background-position: -96px -20px
}
.refresh{
  background-position: -134px -20px;
}
.export{
  background-position: -172px -20px;
}
#examine_manage{
  width: 100%;

}
.footer{
  width: 100%;
  height: 40px;
  position: relative;
}
.paging{
  position: absolute;
  right: 30px;
  top: 10px;
}
.paging span{
  padding: 0 7px;
  display: inline-block;
  height: 24px;
  line-height: 24px;
  text-align: center;
  margin-left: 5px;
  color: #444;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
}
.angle-left,
.angle-right{
  min-width: 8px;
}

.paging input{
  padding: 2px 6px;
  margin-right: 4px;
  height: 24px;
  width: 40px;
  line-height: 24px;
  border: 1px solid #d7d6d7;
  border-radius: 4px;
  color: #555;
  background: #fff;
  transition: border linear 0.2s,box-shadow linear 0.2s;
}

#examine_manage>table{
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
#examine_manage>table>tr{
  width: 100%;
  height: 45px;
  line-height: 45px;
  font-size: 14px;
  color: #333;
  text-align: center;

}
#examine_manage>table>tr:first-child{
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
  .more{
    width: 8%;
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

  .details{
    width: 450px;
    height: 400px;
    position: fixed;
    left: 40%;
    top: 25%;
    /*border: 1px solid black;*/
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0px 0px 6px #555;
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
  margin-left: 370px;
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
  width: 110px;
  padding-left: 15px;
}
.detailsContariner>p>span:last-child{
  display: inline-block;
  width: calc(100% - 125px);
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
  .detailsFooter>.detailsBtn>button{
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
