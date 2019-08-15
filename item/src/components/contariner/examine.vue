<template>
    <div id="examine">

        <div class="header_title">
          <span>
            <select name="" id="occupancy" ref="IsOccupancy" v-on:change="switchoverInfo" v-model="IsOccupancy" v-if="user.manage == 'true'">
              <option value="1" selected>未出租</option>
              <option value="2">已出租</option>
            </select>
          </span>
        <span class="search">
          <span v-on:click="search"><i class="fa fa-search"></i></span>
          <input type="text" placeholder="根据出租类型检索" ref="search_input1" v-on:blur="search" v-on:keyup.enter="search">
        </span>
          <!--按钮-->
          <div class="btn" v-if="user.manage == 'true'">
            <div class="revocation" style=" background-position: -20px -20px;" title="添加发布" v-on:click="switchoverDatePage"></div>
            <div class="revocation" v-on:click="revocation" title="撤销发布" v-if="IsOccupancy == '1'"></div>
            <div class="refresh" v-on:click="reload" title="刷新"></div>
            <div class="export" title="导出" v-on:click="exportFile"></div>
          </div>
          <div v-else>
            <span class="search1">
              <span v-on:click="search"><i class="fa fa-search"></i></span>
              <input type="text" placeholder="根据房屋地址检索" ref="search_input2" v-on:blur="search" v-on:keyup.enter="search">
            </span>
            <span class="search2">
              面积：
              <select name="" id="searchHouseArea" ref="search_input3" v-on:blur="search" v-on:keyup.enter="search">
                <option value="false" selected>全部</option>
                <option value="1">10m²</option>
                <option value="2">10-20m²</option>
                <option value="3">20-30m²</option>
                <option value="4">30-40m²</option>
                <option value="5">40-50m²</option>
                <option value="6">50-100m²</option>
                <option value="7">100-200m²</option>
                <option value="8">200m²以上</option>
              </select>
            </span>
            <span class="search3">
              价格：
              <!--<span v-on:click="search"><i class="fa fa-search"></i></span>-->
              <!--<input type="text" placeholder="根据租赁检索" ref="search_input4" v-on:blur="search" v-on:keyup.enter="search">-->
              <select name="" id="searchPrice" ref="search_input4" v-on:blur="search" v-on:keyup.enter="search">
                <option value="false" selected>全部</option>
                <option value="1">500元以下</option>
                <option value="2">500-1000元</option>
                <option value="3">1000-1500元</option>
                <option value="4">1500-2000元</option>
                <option value="5">2000-3000元</option>
                <option value="6">3000-4000元</option>
                <option value="7">4000-6000元</option>
                <option value="8">6000元以上</option>
              </select>
            </span>
          </div>

        </div>
        <div id="examine_manage">
          <table id="houseDetails">
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
            <tr v-if="nodata.is[1] && IsOccupancy == '1' " v-for="(info,index) in infos[pn]" class="gery_bg" >
              <td class="choose">{{index+1}}<span>. </span><input type="checkbox" ref="checkboxs" name="info"></td>
              <td class="title" :title="info.title">{{info.title}}</td>
              <td class="rentType" :title="info.rentType">{{info.rentType}}</td>
              <td class="houseArea" :title="info.houseArea">{{info.houseArea}}</td>
              <td class="location" :title="info.location_county + info.location_street">{{info.location_county}}{{info.location_street}}</td>
              <td class="houseTheme" :title="info.houseTheme">{{info.houseTheme}}</td>
              <td class="price" :title="info.price">{{info.price}}元/月</td>
              <td class="more"><span v-on:click="detailsSwitch(info)">详情</span></td>
            </tr>
            <tr v-if="nodata.is[2] && IsOccupancy == '2'" v-for="(info,index) in infos[pn]" class="gery_bg" >
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
          <p v-if="!nodata.is[1] && IsOccupancy == '1' " style="text-align: center">{{nodata.data}}</p>
          <p v-else-if="!nodata.is[2] && IsOccupancy == '2'" style="text-align: center">{{nodata.data}}</p>
        </div>
        <div class="footer">
          <div class="paging">
            <span v-on:click="set_pn(1)">首页</span>
            <span class="angle-left" v-on:click="minusPn"><i class="fa fa-angle-left"></i></span>
            第&nbsp;
            <input type="text" v-on:blur="input_pag" value="1" v-on:keyup.enter="input_pag" v-model="mr">
            页 /共&nbsp;{{maxPn}}&nbsp;页
            <span class="angle-right" v-on:click="addPn"><i class="fa fa-angle-right"></i></span>
            <span v-on:click="set_pn(maxPn)">尾页</span>
          </div>
        </div>

      <!--用户管理界面的详情-->
      <div class="details" v-if="isDetails">
        <div class="detailsTop">
          <span>详情</span>
          <span v-on:click="detailsSwitch"><i class="fa fa-close fa-2x"></i></span>
        </div>
        <div class="detailsContariner">


          <p><span>房屋唯一id：</span><span>{{detailsDate.id}}</span></p>
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
          <p><span>发布时间：</span><span>{{timeDispose(detailsDate.publish_time)}}</span></p>
          <p><span>备注：</span><span>{{detailsDate.remark}}</span></p>
        </div>
        <div class="detailsFooter">
          <p class="detailsBtn">
            <button v-on:click="detailsSwitch">关闭</button>
            <button v-on:click="book" v-if="user.manage != 'true'">预订</button>
            <button v-else-if="IsOccupancy == '1'" v-on:click="switchoverRentState(0)">转为已出租</button>
            <button v-else-if="IsOccupancy == '2'" v-on:click="switchoverRentState(1)">转为未出租</button>
          </p>
        </div>

      </div>

      <!--添加发布-->
      <div class="add" v-if="addDate">
        <div class="addTop">
          <span>添加房屋信息</span>
          <span v-on:click="switchoverDatePage"><i class="fa fa-close fa-2x"></i></span>
        </div>
        <div class="addContariner">



          <p style="padding: 5px 0px 5px 15px">
            <span class="addHeadline">宣传标题：</span>
            <span><input type="text" v-model="addDates.title" class="inputTetx" v-on:blur="inputBlur(1)"></span>
            <span v-if="inputBlurHint.inputBlurOne && !hint.vacancy1" style="color: red">* 不超过64个字符</span>
            <span v-if="inputBlurHint.inputBlurOne && hint.vacancy1" style="color: red">* 不能为空</span>
          </p>
          <p style="padding: 5px 0px 5px 15px">
            <span class="addHeadline">出租类型：</span>
            <select name="rentType"  v-model="addDates.rentType" class="inputTetx" style="height: 22px;width: 202px;">
              <option value="整套出租">整套出租</option>
              <option value="单间(主卧)">单间(主卧)</option>
              <option value="单间(次卧)">单间(次卧)</option>
            </select>
          </p>
          <p style="padding: 5px 0px 5px 15px">
            <span class="addHeadline">房屋类型：</span>
            <span><input type="text" v-model="addDates.houseType" class="inputTetx" v-on:blur="inputBlur(2)"></span>
            <span v-if="inputBlurHint.inputBlurTwo && !hint.vacancy2" style="color: red">* 不超过16个字符</span>
            <span v-else-if="inputBlurHint.inputBlurTwo && hint.vacancy2" style="color: red">* 不能为空</span>
            <span v-else>例如：3室1厅</span>
          </p>
          <p style="padding: 5px 0px 5px 15px">
            <span class="addHeadline">出租房屋面积：</span>
            <span><input type="text" v-model="addDates.houseArea" class="inputTetx" v-on:blur="inputBlur(3)" placeholder="若是单间，只填写该房间面积"></span>
            <span v-if="inputBlurHint.inputBlurThree && !hint.vacancy3" style="color: red">* 不超过8个字符</span>
            <span v-else-if="inputBlurHint.inputBlurThree && hint.vacancy3" style="color: red">* 不能为空</span>
            <span v-else>m²</span>
          </p>
          <p style="padding: 5px 0px 5px 15px">
            <span class="addHeadline">出租房屋装修水平：</span>
            <span><input type="text" v-model="addDates.houseTheme" class="inputTetx" v-on:blur="inputBlur(4)"></span>
            <span>例如：精装</span>
          </p>
          <p style="padding: 5px 0px 5px 15px">
            <span class="addHeadline">房屋所在区县：</span>
            <span><input type="text" v-model="addDates.location_county" class="inputTetx" v-on:blur="inputBlur(5)"></span>
            <span v-if="inputBlurHint.inputBlurFive" style="color: red">* 不能为空</span>
          </p>
          <p style="padding: 5px 0px 5px 15px">
            <span class="addHeadline">房屋所在街道：</span>
            <span><input type="text" v-model="addDates.location_street" class="inputTetx" v-on:blur="inputBlur(6)" placeholder="请输入具体地址"></span>
            <span v-if="inputBlurHint.inputBlurSix" style="color: red">* 不能为空</span>
          </p>
          <p style="padding: 5px 0px 5px 15px">
            <span class="addHeadline">价格：</span>
            <span><input type="number" v-model="addDates.price" class="inputTetx" v-on:blur="inputBlur(7)" placeholder="请输入价格">元/月</span>
            <span v-if="inputBlurHint.inputBlurSeven" style="color: red">* 不能为空</span>
          </p>
          <p style="padding: 10px 0px 10px 15px">
            <span  class="addHeadline" style="vertical-align: top">备注：</span>
            <span><textarea name="" id="" cols="30" rows="3" placeholder="备注" style="resize:none;height: 60px" class="inputTetx" v-on:blur="inputBlur(8)" v-model="addDates.remark"></textarea></span>
          </p>



        </div>
        <div class="addFooter">
          <p class="addBtn"><button v-on:click="insertionDataBase">发布</button></p>
          <p class="addBtn"><button v-on:click="switchoverDatePage">关闭</button></p>
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
          occupancyInfos:[],
          NoOccupancyInfos:[],
          user:this.$store.state.user,
          name:this.$store.state.user.name,
          manage: this.$store.state.user.manage,
          pn:1,
          maxPn:1,
          maxInfo:10,
          mr:1,
          nodata:{
            is:{
              1:true,
              2:true
            },
            data:"当前暂无数据"
          },
          isDetails:false,
          detailsDate:{},
          addDates:{
            title:"",
            rentType:"",
            houseType:"",
            houseArea:"",
            houseTheme:"",
            location_county:"",
            location_street:"",
            price:"",
            linkman_name:this.$store.state.user.name,
            linkman_user:this.$store.state.user.user,
            linkman_phone:this.$store.state.user.phone,
            publish_time:"",
            remark:"",
            occupancy:false
          },
          inputBlurHint :{
            inputBlurOne:false,
            inputBlurTwo:false,
            inputBlurThree:false,
            inputBlurFive:false,
            inputBlurSix:false,
            inputBlurSeven:false,
          },
          hint:{//提示信息
            vacancy1:false,
            vacancy2:false,
            vacancy3:false,
          },
          addDate:false,//添加发布信息页面
          IsOccupancy:'1'

        }
      },
      methods:{
        /*
        * 分别展示已出租与未出租的信息
        * */
        switchoverInfo(){
          if ( this.IsOccupancy == '2'){
            let pn = Math.ceil(this.NoOccupancyInfos.length / this.maxInfo);
            this.maxPn = 0;
            setTimeout(()=>{
              this.maxPn = pn;
            },1);

            this.pn = 1;
            this.mr = 1;
            for(let i = 1; i <= pn;i++){
              this.infos[""+i] = this.NoOccupancyInfos.slice(this.maxInfo*(i - 1),this.maxInfo*i)
            }
          }else if(this.IsOccupancy == '1'){
            let pn = Math.ceil(this.occupancyInfos.length / this.maxInfo);
            this.maxPn = 0;
            setTimeout(()=>{
              this.maxPn = pn;
            },1);

            this.pn = 1;
            this.mr = 1;
            for(let i = 1; i <= pn;i++){
              this.infos[""+i] = this.occupancyInfos.slice(this.maxInfo*(i - 1),this.maxInfo*i)
            }
          }
        },
        /*
        * 切换房屋是否已出租的状态
        * */
        switchoverRentState(num){
          this.$http({
            method:'post',
            url:'http://localhost:2173/switchoverRentState',
            data:{
              houseId:this.detailsDate.id,
              occupancy:num
            }
          }).then((response)=>{
            if (response.data == '修改成功') {
              this.isDetails = !this.isDetails;
              this.get_infos();
            }

            alert(response.data)
          })
        },
        /*
        * 预订
        * */
        book(){
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
          let bookTime = `${year}-${month}-${strDate}`;
          let data = {
            houseId:this.detailsDate.id,
            // linkman_name: this.detailsDate.linkman_name,
            linkman_user:this.detailsDate.linkman_user,
            // linkman_phone:this.detailsDate.linkman_phone,
            renter_user: this.user.user,
            renter_name:this.$store.state.user.name,
            bookORcheckin:1,
            renter_phone:this.$store.state.user.phone ? this.$store.state.user.phone : "无",
            renter_email:this.$store.state.user.email ? this.$store.state.user.email : "无",
            bookTime:bookTime
          }
          this.$http({
            method:'post',
            url: 'http://localhost:2173/bookHouse',
            data:data
          }).then((response)=>{
            if (response.data == '预订成功，请等待房东联系') {
              alert('预订成功，请等待房东联系')
              this.isDetails = !this.isDetails;
            }else {
              alert(response.data)
            }
          })
        },
          /*
          * 分页
          * */
        set_pn(opt){
            this.pn = opt;
          this.mr = this.pn;
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
          this.mr= this.pn;
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
          this.mr = this.pn;
          this.$refs.checkboxs.forEach(function (value, index, array) {
            let checkbox = value;
            checkbox.checked = false;
          })
        },
        input_pag(){
          if (this.mr > this.maxPn){
            this.pn = this.maxPn;
            this.mr = this.maxPn
          }else if (this.mr < 1){
            this.pn = 1;
            this.mr = 1
          } else {
            if (Boolean(this.mr)){
              this.pn = Number(this.mr)
              this.$refs.checkboxs.forEach(function (value, index, array) {
                let checkbox = value;
                checkbox.checked = false;
              })
            } else {
              this.pn = this.mr
            }
          }

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
            this.nodata.is[1] = false
            this.nodata.is[2] = false
            if (response.data == '暂无数据'){
              this.pn = 1;
              this.maxPn = 1;
            }else {
              response.data.reverse()
              this.occupancyInfos = [];
              this.NoOccupancyInfos = [];
              response.data.forEach( (val) => {
                if (val.occupancy == 'false') {
                  this.occupancyInfos.push(val)
                  this.nodata.is[1] = true
                }else {
                  this.NoOccupancyInfos.push(val)
                  this.nodata.is[2] = true
                }
              })
              this.processing();
            }
          })
        },
        /*
        * 搜索
        * */
        search(){
          let data;
          if (this.user.manage == "true"){
            data = {
              user:""+this.user.user,
              name: ""+this.user.name,
              manage:this.user.manage,
              rentType:(this.$refs.search_input1.value || false),
            }
          } else {
            data = {
              user:""+this.user.user,
              name: ""+this.user.name,
              manage:this.user.manage,
              rentType:(this.$refs.search_input1.value || false),
              location:(this.$refs.search_input2.value || false),
              houseArea:(this.$refs.search_input3.value == 'false' ? false : this.$refs.search_input3.value),
              price:(this.$refs.search_input4.value == 'false' ? false : this.$refs.search_input4.value),
            }
          }
          this.$http({
            method: 'post',
            url: 'http://localhost:2173/examine',
            data:data
          }).then((response) =>{
            this.nodata.is[1] = false
            this.nodata.is[2] = false
            if (response.data == '暂无数据'){
              this.pn = 1;
              this.maxPn = 1;
            }else {
              this.occupancyInfos = [];
              this.NoOccupancyInfos = [];
              if (this.manage == 'false') this.IsOccupancy = '1'
              response.data.reverse()
              response.data.forEach( (val) => {
                if (val.occupancy == 'false') {
                  this.occupancyInfos.push(val)
                  this.nodata.is[1] = true
                }else {
                  this.nodata.is[2] = true
                  this.NoOccupancyInfos.push(val)
                }
              })
              this.processing();
            }
          })
        },
        /*
        * 数据分组处理
        * */
        processing(){
          if(this.manage == 'true'){
            if (this.IsOccupancy == '2'){
              let pn = Math.ceil(this.NoOccupancyInfos.length / this.maxInfo);
              this.maxPn = 0;
              setTimeout(()=>{
                this.maxPn = pn;
              },1);

              this.pn = 1;
              this.mr = 1;
              for(let i = 1; i <= pn;i++){
                this.infos[""+i] = this.NoOccupancyInfos.slice(this.maxInfo*(i - 1),this.maxInfo*i)
              }
            }else {
              let pn = Math.ceil(this.occupancyInfos.length / this.maxInfo);
              this.maxPn = 0;
              setTimeout(()=>{
                this.maxPn = pn;
              },1);

              this.pn = 1;
              this.mr = 1;
              for(let i = 1; i <= pn;i++){
                this.infos[""+i] = this.occupancyInfos.slice(this.maxInfo*(i - 1),this.maxInfo*i)
              }
            }
          }else {
            let pn = Math.ceil(this.occupancyInfos.length / this.maxInfo);
            this.maxPn = 0;
            setTimeout(()=>{
              this.maxPn = pn;
            },1);

            this.pn = 1;
            this.mr = 1;
            for(let i = 1; i <= pn;i++){
              this.infos[""+i] = this.occupancyInfos.slice(this.maxInfo*(i - 1),this.maxInfo*i)
            }
          }
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
        },

        /*
        *添加发布页面
        * */
        switchoverDatePage(){
          this.addDate = !this.addDate
        },
        /*
        * 添加验证
        * */
        inputBlur(number){
          if (number == 1){
            let reg1=/[^\x00-\x80]/g;
            let titleStr = this.addDates.title;
            let titlelen = titleStr.length;

            let titleStrLen = titleStr.match(reg1);
            if (String(titleStrLen) != 'null') {
              titlelen += titleStrLen.length
            }
            if (titlelen > 64) {
              this.inputBlurHint.inputBlurOne = true;
              this.addDates.title = ""
            }else if (titlelen == 0) {
              this.inputBlurHint.inputBlurOne = true;
              this.hint.vacancy1 = true
            } else {
              this.inputBlurHint.inputBlurOne = false;
              this.hint.vacancy1 = false
            }
          }
          if (number == 2){
            let reg1=/[^\x00-\x80]/g;
            let houseTypeStr = this.addDates.houseType;
            let houseTypelen = houseTypeStr.length;

            let houseTypeStrLen = houseTypeStr.match(reg1);
            if (String(houseTypeStrLen) != 'null') {
              houseTypelen += houseTypeStrLen.length
            }
            if (houseTypelen > 16) {
              this.inputBlurHint.inputBlurTwo = true;
              this.addDates.houseType = ""
            }else if (houseTypelen == 0) {
              this.inputBlurHint.inputBlurTwo = true;
              this.hint.vacancy2 = true
            } else {
              this.inputBlurHint.inputBlurTwo = false;
              this.hint.vacancy2 = false
            }
          }
          if (number == 3){
            let reg1=/[^\x00-\x80]/g;
            let houseAreaStr = this.addDates.houseArea;
            let houseArealen = houseAreaStr.length;

            let houseAreaLen = houseAreaStr.match(reg1);
            if (String(houseAreaLen) != 'null') {
              houseArealen += houseAreaLen.length
            }
            if (houseAreaLen > 8) {
              this.inputBlurHint.inputBlurThree = true;
              this.addDates.houseArea = ""
            }else if (houseArealen == 0) {
              this.inputBlurHint.inputBlurThree = true;
              this.hint.vacancy3 = true
            } else {
              this.inputBlurHint.inputBlurThree = false;
              this.hint.vacancy3 = false
            }
          }
          if (number == 5){
            if (this.addDates.location_county.length == 0){
              this.inputBlurHint.inputBlurFive = true
            } else {
              this.inputBlurHint.inputBlurFive = false
            }
          }
          if (number == 6){
            if (this.addDates.location_street.length == 0){
              this.inputBlurHint.inputBlurSix = true
            } else {
              this.inputBlurHint.inputBlurSix = false
            }
          }
          if (number == 7){
            if (this.addDates.price.length == 0){
              this.inputBlurHint.inputBlurSeven = true
            } else {
              this.inputBlurHint.inputBlurSeven = false
            }
          }
        },
        /*
        * 插入数据库
        * */
        insertionDataBase(){
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
          this.addDates.publish_time = `${year}-${month}-${strDate}`;
          this.addDates.remark = this.addDates.remark || "没有备注";
          let dataProcessing = {
            title:"房屋标题",
            location_county:"房屋所在区县",
            location_street:"房屋所在街道",
            rentType:"出租类型",
            houseType:"房屋类型",
            houseArea:"房屋面积",
            houseTheme:"房屋装修或主题",
            price:"房屋价格",
            remark:"备注",
          }
          for(let key in this.addDates){
            if (this.addDates[key].length == 0){
              alert(`${dataProcessing[key]} 不能为空`);
              return false
            }
          }
          this.$http({
            method: 'post',
            url: 'http://localhost:2173/release',
            data:this.addDates
          }).then((response) =>{
            if (response.data) {
              this.addDate = !this.addDate//关闭发布窗口
              alert("发布成功");
              this.addDates = {
                title:"",
                rentType:"",
                houseType:"",
                houseArea:"",
                houseTheme:"",
                location_county:"",
                location_street:"",
                price:"",
                linkman_name:this.$store.state.user.name,
                linkman_user:this.$store.state.user.user,
                linkman_phone:this.$store.state.user.phone,
                publish_time:"",
                remark:"",
                occupancy:false
              };//发布信息重新清空
              this.reloadContarinerMain()//刷新
            }else {
              alert("发布失败");
              this.addDates = {
                title:"",
                rentType:"",
                houseType:"",
                houseArea:"",
                houseTheme:"",
                location_county:"",
                location_street:"",
                price:"",
                linkman_name:this.$store.state.user.name,
                linkman_user:this.$store.state.user.user,
                linkman_phone:this.$store.state.user.phone,
                publish_time:"",
                remark:"",
                occupancy:false
              };//发布信息重新清空

            }
          })

        },
        /*
        * 导出数据
        * */
        exportFile(){
          let exportData = [];
          for (let i = 0;i < this.maxPn; i++){
            exportData = exportData.concat(this.infos[i+1])
          }
          let dataProcessing = {
            title:"房屋标题",
            rentType:"出租类型",
            houseType:"房屋类型",
            houseArea:"房屋出租面积",
            houseTheme:"房屋装修或主题",
            location_county:"房屋所在区县",
            location_street:"房屋所在街道",
            price:"出租价格",
            publish_time:"发布时间",
            remark:"备注",
          }
          //列标题，逗号隔开，每一个逗号就是隔开一个单元格
          let str = `房屋标题,出租类型,房屋类型,房屋出租面积,房屋装修或主题,房屋所在区县,房屋所在街道,出租价格,发布时间,备注\n`;
          //增加\t为了不让表格显示科学计数法或者其他格式
          for(let i = 0 ; i < exportData.length ; i++ ){
            for(let item in dataProcessing){
              str+=`${exportData[i][item] + '\t'},`;
            }
            str+='\n';
          }
          //encodeURIComponent解决中文乱码
          let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
          //通过创建a标签实现
          let link = document.createElement("a");
          link.href = uri;
          //对下载的文件命名
          link.download =  "房屋信息.csv";
          document.body.appendChild(link);
          link.click();
        },
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
      },
      computed:{

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
  height: 60px;
  line-height: 60px;
  position: relative;
}
.header_title .search{
  position: absolute;
  right: 210px;
  z-index: 1;
}
#occupancy{
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
.search1{
  position: absolute;
  right: 28%;
  z-index: 1;
}

.search2{
  position: absolute;
  left: 16%;
  z-index: 1;
}
.search3{
  position: absolute;
  left: 32%;
  z-index: 1;
}
.header_title .search>input,
.search1>input,
.search2>select,
.search3>select{
  height: 30px;
  width: 175px;
  padding: 2px 6px;
  line-height: 24px;
  border: 1px solid #d7d6d7;
  border-radius: 4px;
  color: #555;
  background: #fff;
}

.header_title .search>span,
.search1>span{
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
  font-size: 16px;
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

  /*详情界面布局*/
  .details{
    width: 450px;
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
  /*添加界面布局*/
  .add{
    width: 450px;
    height: 470px;
    position: fixed;
    left: 40%;
    top: 25%;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0px 0px 6px #555;
    z-index: 998;
  }
  .addTop{
  width: 100%;
  height: 40px;
  overflow: hidden;
  background-color: #189098;
}
  .addTop>span:first-child{
  margin: 0 0 0 10px;
  text-align: left;
  font-size: 16px;
  line-height: 40px;
  float: left;
  color: #fff;
  font-weight: bold;
}
  .addTop>span:last-child{
  margin-left: 305px;
}
  .addTop>span:last-child>i{
  color: #fff;
  line-height: 40px;
  cursor: pointer;
}
  .addContariner{
    height: 370px;
    width: 100%;
    background-color: #fcfcfc;
  }
  .addContariner .addHeadline{
    display: inline-block;
    font-size: 14px;
    color: #333;
    vertical-align: bottom;
    width: 126px;
  }
  .addFooter{
    width: 100%;
    height: 60px;
    background-color: #f5f5f5;
    border-top: 1px solid #ddd;
    padding: 0px 0;
    text-align: center;
    line-height: 60px;
  }
  .addFooter>.addBtn{
    text-align: center;
    display: inline-block;
    padding: 0px 15px;
}
  .addFooter>.addBtn>button{
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

  .inputTetx{
    width: 200px;
    border: 1px solid #d7d6d7;
    border-radius: 5px;
    height: 22px;
  }
</style>
