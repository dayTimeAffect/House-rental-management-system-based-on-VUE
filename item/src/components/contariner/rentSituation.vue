<template>
    <div id="rentSituation">
      <div id="rentSituationBox">
        <!--功能区-->
        <div id="header_title">
          <span class="switcInfo">
            <span v-if="this.$store.state.reserved == 'true'" class="goE" v-on:click="goE">返回</span>
            <select v-else v-model="pagState" v-on:click="switchRentStatePag" class="stateSelect">
              <option value="1" selected>预订消息</option>
              <option value="2">已查看</option>
              <option value="3">已出租信息</option>
            </select>
          </span>
          <span class="search">
            <span ><i class="fa fa-search"></i></span>
            <input type="text" v-if="this.$store.state.reserved == 'true'" placeholder="根据出租类型检索" v-on:blur="search(2)" v-on:keyup.enter="search(2)" ref="search_input1">
            <input type="text" v-else placeholder="根据房屋ID检索" v-on:blur="search(1)" v-on:keyup.enter="search(1)" ref="search_input1">
            
            <p class="mClassify" v-if="this.$store.state.reserved != 'true'">
              <i v-if="pagState != 3" style="font-size: 16px">按预定时间查询：</i>
              <i v-else  style="font-size: 16px">按入住时间查询：</i>
              <input type="month" style="width: 120px" v-model="timeChassify.startTime" v-on:blur="tChassify">
              -----
              <input type="month" style="width: 120px" v-model="timeChassify.endTime" v-on:blur="tChassify">
              <b v-on:click="clearTClassify" style="cursor: pointer;font-size: 16px" >&nbsp;&nbsp;清空查询时间</b>
            </p>


          </span>
<!--          <span class="search1" v-if="user.manage == 'true'">
          </span>-->
          <div class="btn" v-if="user.manage == 'true'">
            <div class="revocation" v-on:click="revocation" title="删除信息" v-if="pagState != '3'"></div>

            <div class="refresh"  v-on:click="reload" title="刷新"></div>
          </div>
        </div>
        <!--信息的展示-->
        <div id="book_manage">
          <table id="bookDetails">
            <tr v-if="this.$store.state.reserved == 'true'">
              <td class="choose">序号</td>
              <td class="title">宣传标题</td>
              <td class="rentType">出租类型</td>
              <td class="houseArea">面积</td>
              <td class="location">房屋地址</td>
              <td class="houseTheme">房屋装修主题</td>
              <td class="price">房屋租赁价格</td>
              <td class="price">预租时间</td>
              <td class="more">操作</td>
            </tr>
            <tr v-else>
              <td >序号</td>
              <td >房屋id</td>
              <td v-if="pagState != 3">宣传标题</td>
              <td >租客姓名</td>
              <td >租客电话</td>
              <td v-if="pagState == '1'">租客邮箱</td>
              <td v-else-if="pagState == '2'">租客邮箱</td>
              <td v-else-if="pagState == '3'">入住时间</td>
              <td v-if="pagState == '1'">预租时间</td>
              <td v-else-if="pagState == '2'">预租时间</td>
              <td v-else-if="pagState == '3'" >结束时间</td>
              <td >操作</td>
            </tr>

            <template v-if="haveData[1] && this.$store.state.reserved == 'true'">
              <tr v-for="(info,index) in rentMangeInfos[pagState].infos[paging[pagState].pn]"  class="gery_bg" >
                <td class="choose">{{index+1}}<span>. </span><input type="checkbox" ref="checkboxs" name="info"></td>
                <td  :title="info.title">{{info.title}}</td>
                <td  :title="info.rentType">{{info.rentType}}</td>
                <td  :title="info.houseArea">{{info.houseArea}}</td>
                <td  :title="info.location_county + info.location_street">{{info.location_county}}{{info.location_street}}</td>
                <td  :title="info.houseTheme">{{info.houseTheme}}</td>
                <td  :title="info.price">{{info.price}}元/月</td>
                <td  :title="info.bookTime">{{timeDispose(info.bookTime)}}</td>
                <td class="more"><span v-on:click="detailsSwitch(info)">详情</span></td>
              </tr>
            </template>
            <template v-else>
              <tr v-if="haveData[1] && pagState == '1'" v-for="(info,index) in rentMangeInfos[pagState].infos[paging[pagState].pn]" class="gery_bg" >
                <td >{{index+1}}<span>. </span><input type="checkbox" ref="checkboxs" name="info"></td>
                <td  :title="info.houseId">{{info.houseId}}</td>
                <td  :title="info.title">{{info.title}}</td>
                <td  :title="info.renter_name">{{info.renter_name}}</td>
                <td  :title="info.renter_phone">{{info.renter_phone}}</td>
                <td  :title="info.renter_email">{{info.renter_email}}</td>
                <td  :title="info.bookTime">{{timeDispose(info.bookTime)}}</td>
                <td class="more"><span v-on:click="detailsSwitch(info)">详情</span></td>
              </tr>
              <tr v-if="haveData[2] && pagState == '2'" v-for="(info,index) in rentMangeInfos[pagState].infos[paging[pagState].pn]" class="gery_bg" >
                <td >{{index+1}}<span>. </span><input type="checkbox" ref="checkboxs" name="info"></td>
                <td  :title="info.houseId">{{info.houseId}}</td>
                <td  :title="info.title">{{info.title}}</td>
                <td  :title="info.renter_name">{{info.renter_name}}</td>
                <td  :title="info.renter_phone">{{info.renter_phone}}</td>
                <td  :title="info.renter_email">{{info.renter_email}}</td>
                <td  :title="info.bookTime">{{timeDispose(info.bookTime)}}</td>
                <td class="more"><span v-on:click="detailsSwitch(info)">租赁</span></td>
              </tr>
              <tr v-if="haveData[3] && pagState == '3'" v-for="(info,index) in rentMangeInfos[pagState].infos[paging[pagState].pn]" class="gery_bg" >
                <td >{{index+1}}<span>. </span><input type="checkbox" ref="checkboxs" name="info"></td>
                <td  :title="info.houseId">{{info.houseId}}</td>
                <td  :title="info.renter_name">{{info.renter_name}}</td>
                <td  :title="info.renter_phone">{{info.renter_phone}}</td>
                <td  :title="info.rentTime">{{timeDispose(info.rentTime)}}</td>
                <td  :title="info.endTime">{{timeDispose(info.endTime)}}</td>
                <td class="more"><span v-on:click="detailsSwitch(info)">详情</span></td>
              </tr>
            </template>
          </table>
          <template v-if="haveData[1] && this.$store.state.reserved == 'true'">
            <p v-if="!haveData[1] && pagState == '1'" style="text-align: center">暂无数据</p>
          </template>
          <template v-else>
            <p v-if="!haveData[1] && pagState == '1'" style="text-align: center">暂无数据</p>
            <p v-else-if="!haveData[2] && pagState == '2'" style="text-align: center">暂无数据</p>
            <p v-else-if="!haveData[3] && pagState == '3'" style="text-align: center">暂无数据</p>
          </template>
        </div>
        <!--分页-->
        <div class="footer">
          <div class="paging">
            <span v-on:click="set_pn(1)">首页</span>
            <span class="angle-left" v-on:click="minusPn"><i class="fa fa-angle-left"></i></span>
            第&nbsp;
            <input type="text" v-on:blur="input_pag" value="1" v-on:keyup.enter="input_pag" v-model="paging[pagState].mr">
            页 /共&nbsp;{{this.paging[pagState].maxPn}}&nbsp;页
            <span class="angle-right" v-on:click="addPn"><i class="fa fa-angle-right"></i></span>
            <span v-on:click="set_pn(paging[pagState].maxPn)">尾页</span>
          </div>
        </div>

        <!--more弹出框-->
        <div class="details" v-if="isDetails">
          <div class="detailsTop">
            <span v-if="pagState != 2">详情</span>
            <span v-else>出租</span>
            <span v-on:click="detailsSwitch"><i class="fa fa-close fa-2x"></i></span>
          </div>
          <div v-if="pagState != 2" class="detailsContariner" >
            <p><span>房屋唯一id：</span><span>{{detailsDate.id}}</span></p>
            <p><span>宣传标题：</span><span>{{detailsDate.title}}</span></p>
            <p><span>出租类型：</span><span>{{detailsDate.rentType}}</span></p>
            <p><span>房屋类型：</span><span>{{detailsDate.houseType}}</span></p>
            <p><span>出租房屋面积：</span><span>{{detailsDate.houseArea}}</span></p>
            <p><span>出租房屋装修水平：</span><span>{{detailsDate.houseTheme}}</span></p>
            <p><span>房屋所在区县：</span><span>{{detailsDate.location_county}}</span></p>
            <p><span>房屋所在街道：</span><span>{{detailsDate.location_street}}</span></p>
            <p><span>价格：</span><span>{{detailsDate.price}}元/月</span></p>
            <p><span>发布时间：</span><span>{{timeDispose(detailsDate.publish_time)}}</span></p>
            <br>
            <p><span>租客姓名：</span><span>{{detailsDate.renter_name}}</span></p>
            <p><span>租客电话：</span><span>{{detailsDate.renter_phone}}</span></p>
            <p><span>租客邮箱：</span><span>{{detailsDate.renter_email}}</span></p>
            <p v-if="pagState == 3"><span>入住时间：</span><span>{{timeDispose(detailsDate.rentTime)}}</span></p>
            <p v-if="pagState == 3"><span>结束时间：</span><span>{{timeDispose(detailsDate.endTime)}}</span></p>
          </div>
          <div v-else class="detailsContariner">
            <p><span>房屋id：</span><span>{{detailsDate.id}}</span></p>
            <p><span>租客姓名：</span><span>{{detailsDate.renter_name}}</span></p>
            <p><span>租客电话：</span><span>{{detailsDate.renter_phone}}</span></p>
            <p><span>租客邮箱：</span><span>{{detailsDate.renter_email}}</span></p>
            <p><span>预租时间：</span><span>{{timeDispose(detailsDate.bookTime)}}</span></p>
            <br>
            <p><span>入住时间：</span><span><input type="date" ref="rentTime" v-model="rentTime"></span></p>
            <p><span>结束时间：</span><span><input type="date" v-model="endTime"></span></p>
          </div>
          <div class="detailsFooter">
            <p class="detailsBtn">
              <button v-on:click="detailsSwitch({})">关闭</button>
              <button v-if="this.$store.state.reserved == 'true'" v-on:click="switchRentState(4)">取消预订</button>
              <button v-if="pagState == '3'" v-on:click="PrintTheContract">打印合同</button>
              <button v-on:click="switchRentState(1)" v-if="pagState == '1' && this.$store.state.reserved == 'false'">已查看</button>
              <button v-else-if="pagState == '2'" v-on:click="switchRentState(2)">确定租定</button>
              <button v-else-if="pagState == '3'" v-on:click="switchRentState(3)">退租</button>
            </p>
          </div>

        </div>

      </div>
    </div>
</template>

<script>
    export default {
      inject:["reloadContarinerMain"],
      name: "rentSituation",
      data(){
          return {
            user:this.$store.state.user,//管理者信息
            rentMangeInfos:{
              1:{
                state:'预订',
                infos:{},
              },
              2:{
                state:'已查看',
                infos:{},
              },
              3:{
                state:'已出租',
                infos:{},
              },
            },
            haveData:{
              1:true,
              2:true,
              3:true
            },
            paging:{
              1:{
                pn:1,
                maxPn:1,
                maxInfo:10,
                mr:1,
              },
              2:{
                pn:1,
                maxPn:1,
                maxInfo:10,
                mr:1,
              },
              3:{
                pn:1,
                maxPn:1,
                maxInfo:10,
                mr:1,
              }
            },
            state:{
              1:'预订',
              2:'已查看',
              3:'已查看',
            },
            pagState:1,//信息状态的分页
            isDetails:false,//是否打开详情界面
            detailsDate:{},//详情信息存放
            rentTime:"",//入住时间
            endTime:"",//入住时间
            timeChassify:{
              startTime:null,
              endTime:null
            }
          }
      },
      methods:{
        /*UTC时间处理*/
        timeDispose(time) {
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
        /*指向打印合同*/
        PrintTheContract(){
          this.$store.state.rentInfo = this.detailsDate;
          this.$router.push("/manageMain/contract")
        },
        /*
        * 按时间检索
        * */
        tChassify(){
          this.$http({
            method:'post',
            url:'http://localhost:2173/rentMange',
            data:{
              step: 8,
              haolei:this.pagState,
              startTime:(this.timeChassify.startTime || "false"),
              endTime:(this.timeChassify.endTime || "false"),
              linkman_user:this.user.user
            }
          }).then((response) =>{
            if (response.data == '暂无数据') {
              this.haveData[1] = !this.haveData;
              this.haveData[2] = !this.haveData;
              this.haveData[3] = !this.haveData;
              this.paging.pn = 1;
              this.paging.maxPn = 1;
            }else {
              this.haveData[1] = false
              this.haveData[2] = false
              this.haveData[3] = false
              response.data.reverse()
              let state1 = [], state2 = [], state3 = [];
              response.data.forEach((val,index)=>{
                if (val.bookORcheckin == '1') {
                  state1.push(val)
                  this.haveData[1] = true
                }else if (val.bookORcheckin == '2'){
                  state2.push(val)
                  this.haveData[2] = true
                } else {
                  state3.push(val)
                  this.haveData[3] = true
                }
              })
              this.grouping(state3,3)
              this.grouping(state2,2)
              this.grouping(state1,1)
            }
          })
        },
        /*
        * 清空查询时间
        * */
        clearTClassify(){
          this.timeChassify.startTime = null;
          this.timeChassify.endTime = null;
          this.tChassify();
        },
        /*
        * 搜索
        * */
        search(num){
          if (num == 1){
            this.$http({
              method:'post',
              url:'http://localhost:2173/rentMange',
              data:{
                step: 5,
                houseId:(this.$refs.search_input1.value || false),
                linkman_user:this.user.user
              }
            }).then((response)=>{
              if (response.data == '暂无数据') {
                this.haveData[1] = !this.haveData;
                this.haveData[2] = !this.haveData;
                this.haveData[3] = !this.haveData;
                this.paging.pn = 1;
                this.paging.maxPn = 1;
              }else {
                this.haveData[1] = false
                this.haveData[2] = false
                this.haveData[3] = false
                response.data.reverse()
                let state1 = [], state2 = [], state3 = [];
                response.data.forEach((val,index)=>{
                  if (val.bookORcheckin == '1') {
                    state1.push(val)
                    this.haveData[1] = true
                  }else if (val.bookORcheckin == '2'){
                    state2.push(val)
                    this.haveData[2] = true
                  } else {
                    state3.push(val)
                    this.haveData[3] = true
                  }
                })
                this.grouping(state3,3)
                this.grouping(state2,2)
                this.grouping(state1,1)
              }
            })
          } else if (num == 2) {
            this.$http({
              method:'post',
              url:'http://localhost:2173/rentMange',
              data:{
                step: 7,
                rentType:(this.$refs.search_input1.value || false),
                renter_user:this.user.user
              }
            }).then((response)=>{
              if (response.data == '暂无数据') {
                this.haveData[1] = !this.haveData;
                this.haveData[2] = !this.haveData;
                this.haveData[3] = !this.haveData;
                this.paging.pn = 1;
                this.paging.maxPn = 1;
              }else {
                this.haveData[1] = true
                this.grouping(response.data,1)
              }
            })
          }
        },
        /*
        * 刷新
        * */
        reload(){
          this.reloadContarinerMain()
        },
          /*
          * 删除信息
          * */
        revocation(){
          let dataArr = [];
          let pagState = this.pagState;
          let pn = this.paging[pagState].pn;
          let info = this.rentMangeInfos[pagState].infos[pn]
          this.$refs.checkboxs.forEach( (value,index) => {
            if (value.checked == true){
              dataArr.push({key:info[index]["key"],id:info[index]["houseId"],renter_user:info[index]["renter_user"],linkman_user:info[index]["linkman_user"]})
            }
          })
          this.$http({
            method:'post',
            url:'http://localhost:2173/rentMange',
            data:{
              step:4,
              dataArr:dataArr
            }
          }).then((response)=>{
            console.log(response);
            if (response.data == '删除成功') {
              this.$refs.checkboxs.forEach( (value,index) => {
                if (value.checked == true){
                  value.checked = false
                }
              })
              this.initData();
            }
            alert(response.data)
          })

        },
          /*
          * 点击详情，赋值信息
          * */
        detailsSwitch(data){//界面的显示
          /*获取当前时间*/
          let myDate = new Date(),
            year = myDate.getFullYear(),
            month = myDate.getMonth() + 1,
            strDate = myDate.getDate();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          let time = `${year}-${month}-${strDate}`;
          this.rentTime = time
          /*信息传递*/
          this.detailsDate = data;
          /*页面的展现与关闭*/
          this.isDetails = !this.isDetails;
        },
          /*
          * 切换管理信息页面
          * */
        switchRentStatePag(){
          // let state = this.pagState;
          // this.paging.maxPn = this.rentMangeInfos[state].infos.length
          // this.paging.pn = 1;
          // this.paging.mr = 1;
          // console.log(this.paging.maxPn,this.paging.pn,this.paging.mr,this.rentMangeInfos[""+state].infos.length)
        },
          /*
          * 切换pagState信息的状态来更新信息
          * */
        switchRentState(num){
          if (num == 1){
            this.$http({
              method:'post',
              url:'http://localhost:2173/rentMange',
              data:{
                step: num,
                houseId:this.detailsDate.id,
                renter_user:this.detailsDate.renter_user
              }
            }).then((response)=>{
              if (response.data == '成功') {
                this.isDetails = !this.isDetails;
                this.initData();
              }
              alert(response.data)
            })
          } else if(num == 2){
            if (!this.endTime) {
              alert("操作失败")
              return false
            }
            let data = {
              step: num,
              houseId:this.detailsDate.id,
              renter_user:this.detailsDate.renter_user,
              linkman_user:this.user.user,
              rentTime:this.rentTime,
              endTime:this.endTime
            }
            this.$http({
              method:'post',
              url:'http://localhost:2173/rentMange',
              data:data
            }).then((response)=>{
              if (response.data == '操作成功') {
                this.isDetails = !this.isDetails;
                this.initData();
              }
              alert(response.data)
            })
          }else if (num == 3){
            let data = {
              step: num,
              houseId:this.detailsDate.id,
              renter_user:this.detailsDate.renter_user,
              linkman_user:this.user.user,
              key:this.detailsDate.key
            }
            console.log(data);
            this.$http({
              method:'post',
              url:'http://localhost:2173/rentMange',
              data:data
            }).then((response)=>{
              if (response.data == '操作成功') {
                this.isDetails = !this.isDetails;
                this.initData();
              }
              alert(response.data)
            })
          }
          else if (num == 4){
            let dataArr = [{key:this.detailsDate.key}];
            this.$http({
              method:'post',
              url:'http://localhost:2173/rentMange',
              data:{
                step:4,
                dataArr:dataArr
              }
            }).then((response)=>{
              if (response.data == '删除成功') {
                alert("取消预订成功")
                this.isDetails = !this.isDetails;
                this.reservedInfos()
              }else {
                alert("取消预订失败")
              }
            })

          }

        },
          /*
          * 分页
          * */
        set_pn(opt){
          this.paging[this.pagState].pn = opt;
          this.paging[this.pagState].mr = this.paging[this.pagState].pn;
          this.$refs.checkboxs.forEach(function (value, index, array) {
            let checkbox = value;
            checkbox.checked = false;
          })
        },
        addPn(){
          this.paging[this.pagState].pn++;
          if(this.paging[this.pagState].pn >= this.paging[this.pagState].maxPn){
            this.paging[this.pagState].pn = this.paging[this.pagState].maxPn;
          }
          this.paging[this.pagState].mr= this.paging[this.pagState].pn;
          this.$refs.checkboxs.forEach(function (value, index, array) {
            let checkbox = value;
            checkbox.checked = false;
          })
        },
        minusPn(){
          this.paging[this.pagState].pn--;
          if(this.paging[this.pagState].pn <= 1){
            this.paging[this.pagState].pn = 1;
          }
          this.paging[this.pagState].mr = this.paging[this.pagState].pn;
          this.$refs.checkboxs.forEach(function (value, index, array) {
            let checkbox = value;
            checkbox.checked = false;
          })
        },
        input_pag(){
          if (this.paging[this.pagState].mr > this.paging[this.pagState].maxPn){
            this.paging[this.pagState].pn = this.paging[this.pagState].maxPn;
            this.paging[this.pagState].mr = this.paging[this.pagState].maxPn
          }else if (this.paging[this.pagState].mr < 1){
            this.paging[this.pagState].pn = 1;
            this.paging[this.pagState].mr = 1
          } else {
            if (Boolean(this.paging[this.pagState].mr)){
              this.paging[this.pagState].pn = Number(this.paging[this.pagState].mr)
              this.$refs.checkboxs.forEach(function (value, index, array) {
                let checkbox = value;
                checkbox.checked = false;
              })
            } else {
              this.paging[this.pagState].pn = this.paging[this.pagState].mr
            }
          }

        },
        /*
        * 信息的分组
        * */
        grouping(arr,index){
          this.rentMangeInfos[index].infos = {}
          let pn = Math.ceil(arr.length / this.paging[index].maxInfo);
          this.paging[index].maxPn = 0;
          setTimeout(()=>{
            this.paging[index].maxPn = pn;
          },1);

          this.paging[index].pn = 1;
          this.paging[index].mr = 1;
          for(let i = 1; i <= pn;i++){
            this.rentMangeInfos[index].infos[""+i] = arr.slice(this.paging[index].maxInfo*(i - 1),this.paging[index].maxInfo*i)
          }
        },
        /*
        * 初始化加载数据
        * */
        initData(){
          //先获取求租信息
          let data = {
            user:this.user.user,
            name:this.user.name,
            step:'0',
          }
          this.$http({
            method: 'post',
            url: 'http://localhost:2173/rentMange',
            data:data
          }).then((response)=>{
            if (response.data == '暂无数据') {
              this.haveData[1] = !this.haveData;
              this.haveData[2] = !this.haveData;
              this.haveData[3] = !this.haveData;
              this.paging.pn = 1;
              this.paging.maxPn = 1;
            }else {
              this.haveData[1] = false
              this.haveData[2] = false
              this.haveData[3] = false
              response.data.reverse()
              let state1 = [], state2 = [], state3 = [];
              response.data.forEach((val,index)=>{
                if (val.bookORcheckin == '1') {
                  state1.push(val)
                  this.haveData[1] = true
                }else if (val.bookORcheckin == '2'){
                  state2.push(val)
                  this.haveData[2] = true
                } else {
                  state3.push(val)
                  this.haveData[3] = true
                }
              })
              this.grouping(state3,3)
              this.grouping(state2,2)
              this.grouping(state1,1)
            }
          })

        },
        /*
        * 用户查看已预定消息的初始化加载数据
        * */
        reservedInfos(){
          let data = {
            user:this.user.user,
            step:'6',
          }
          this.$http({
            method: 'post',
            url: 'http://localhost:2173/rentMange',
            data:data
          }).then((response)=>{
            if (response.data == '暂无数据') {
              this.haveData[1] = !this.haveData;
              this.haveData[2] = !this.haveData;
              this.haveData[3] = !this.haveData;
              this.paging.pn = 1;
              this.paging.maxPn = 1;
            }else {
              this.haveData[1] = true
              this.grouping(response.data,1)
            }
          })
        },
        goE(){
          this.$router.go(-1)
        }
      },
      created() {
        if (this.$store.state.reserved == "true"){
          this.reservedInfos()
        } else {
          this.initData()
        }
      },

    }
</script>

<style scoped>
  #rentSituation{
    width: 100%;
    margin-left: 15px;
  }
  #rentSituationBox{
    width: 100%;
  }
  #book_manage{
    width: 100%;
  }
  #book_manage>table{
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
  #book_manage>table>tr{
    width: 100%;
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    color: #333;
    text-align: center;

  }
  #book_manage>table>tr:first-child{
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
  /*分页样式*/
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
  /*分页样式结束*/
  /*详情界面布局*/
  .details{
    width: 480px;
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
  .stateSelect{
    height: 45px;
    width: 180px;
    padding: 2px 6px;
    line-height: 24px;
    border: 1px solid #d7d6d7;
    border-radius: 4px;
    color: #333;
    background: #fff;
    font-size: 20px;
  }
  #header_title{
     width: 100%;
     height: 60px;
     line-height: 60px;
     position: relative;
   }
  #header_title .search{
    position: absolute;
    right: 210px;
    z-index: 1;
  }
  .search input{
    height: 30px;
    width: 175px;
    padding: 2px 6px;
    line-height: 24px;
    border: 1px solid #d7d6d7;
    border-radius: 4px;
    color: #555;
    background: #fff;
  }
  .search span{
    display: inline-block;
    width: 24px;
    height: 24px;
    position: relative;
    left: 191px;
    cursor: pointer;
  }
  .btn{
    display: inline-block;
    width: 180px;
    position: absolute;
    top: 6px;
    right: 0;
  }
  .revocation,
  .refresh{
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
  .goE{
    display: inline-block;
    width: 70px;
    height: 30px;
    margin: 0px 15px;
    line-height: 30px;
    border: 1px solid #dcdcdc;
    background-color: #eeeeee;
    cursor: pointer;
    text-align: center;
  }
  .mClassify{
    display: inline-block;
    position: absolute;
    left: -550px;
    width: 560px;
    top: 0;
  }
</style>
