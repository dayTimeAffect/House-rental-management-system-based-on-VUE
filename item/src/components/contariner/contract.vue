<template>
  <div id="contract">
    <h2 style="text-align: center; margin: 20px 0">房屋租赁合同</h2>
    <div class="mainBody"><p class="headline" style="margin: 5px 0">甲方：<span><input class="input" type="text" v-model="contractInfo.firstParty.user"></span>（出租人）乙方：<span><input
      type="text" class="input" v-model="contractInfo.secondParty.user"></span>（承租人）</p>
      <p>双方经友好协商，根据《合同法》及国家、当地政府对房屋租赁的有关规定，就租赁房屋一事达成以下协议。</p>
      <p class="headline">第一部分 房屋概况</p>
      <p class="headline">第一条 甲方保证向乙方出租的房屋系（本人，共有）拥有完全所有权和使用权，设有房屋它项权利有（如果房屋是共有，则还应增加：已经共有人同意，附书面同意声明。如果是委托租赁，应有房屋所有权人与受托人的委托协议书）</p>
      <p class="headline">第二条 房屋法律概况</p>
      <p>1、房屋所有权证书登记人：<span><input type="text" class="input" v-model="contractInfo.firstParty.user"></span>，身份证号码：<span><input class="input" type="text" v-model="otherInfo[1]"></span>；</p>
      <p>2、房屋所有权证书上登记的房屋建筑面积：<input type="number" class="input" v-model="contractInfo.house.houseArea">；</p>
      <p>3、房屋的使用面积：<input type="number" class="input" v-model="contractInfo.house.houseArea"></p>
      <p class="headline">　第三条 租赁期限、用途</p>
      <p>1、该房屋租赁期共 <input type="number" class="input" v-model="contractInfo.house.totalTime"> 个月。自<span><input class="input" type="date" v-model="contractInfo.house.rentTime"></span>起至<span><input
        type="date" class="input" v-model="contractInfo.house.endTime"></span>止。</p>
      <p>2、乙方向甲方承诺，租赁该房屋仅作为使用。</p>
      <p>3、租赁期满，甲方有权收回出租房屋，乙方应如期交还。</p>
      <p>乙方如要求续租，则必须在租赁期满<span><input type="number" class="input" v-model="contractInfo.house.totalTime"></span>个月之前书面通知甲方，经甲方同意后，重新签订租赁合同。</p>
      <p class="headline">第四条 租金及支付方式</p>
      <p>1、 该房屋每月租金为<span><input type="number" class="input" v-model="contractInfo.house.pirce"></span>元。</p>
      <p>租金总额为<span><input type="number" class="input" v-model="contractInfo.house.totalPrice"></span>元。</p>
      <p>甲方收款后应提供给乙方有效的收款凭证。</p>
      <p class="headline">第五条 租赁期间相关费用及税金</p>
      <p>1、 甲方应承担的费用：</p>
      <p>（1）租赁期间，房屋和土地的产权税由甲方依法交纳。如果发生政府有关部门征收本合同中未列出项目但与该房屋有关的费用，应由甲方负担。</p>
      <p>2、乙方交纳以下费用：</p>
      <p>（1）乙方应按时交纳自行负担的费用。</p>
      <p>（2）甲方不得擅自增加本合同未明确由乙方交纳的费用。</p>
      <p class="headline">第六条 房屋修缮与使用</p>
      <p>1、在租赁期内，甲方应保证出租房屋的使用安全。该房屋及所属设施的维修责任除双方在本合同及补充条款中约定外，均由甲方负责（乙方使用不当除外）。</p>
      <p>甲方提出进行维修须提前<span><input type="number" value="7" class="input" v-model="otherInfo[2]"></span>日书面通知乙方，乙方应积极协助配合。</p>
      <p>乙方向甲方提出维修请求后，甲方应及时提供维修服务。</p>
      <p>对乙方的装修装饰部分甲方不负有修缮的义务。</p>
      <p>2、乙方应合理使用其所承租的房屋及其附属设施。如因使用不当造成房屋及设施损坏的，乙方应立即负责修复或经济赔偿。</p>
      <p>乙方如改变房屋的内部结构、装修或设置对房屋结构有影响的设备，设计规模、范围、工艺、用料等方案均须事先征得甲方的书面同意后方可施工。租赁期满后或因乙方责任导致退租的，除双方另有约定外，甲方有权选择以下权利中的一种：</p>
      <p>（1）依附于房屋的装修归甲方所有。</p>
      <p>（2）要求乙方恢复原状。</p>
      <p>（3）向乙方收取恢复工程实际发生的费用。</p>
      <p class="headline">第七条 房屋的转让与转租</p>
      <p>1、租赁期间，甲方有权依照法定程序转让该出租的房屋，转让后，本合同对新的房屋所有人和乙方继续有效。</p>
      <p>2、未经甲方同意，乙方不得转租、转借承租房屋。</p>
      <p>3、甲方出售房屋，须在 个月前书面通知乙方，在同等条件下，乙方有优先购买权。</p>
      <p class="headline">第八条 合同的变更、解除与终止</p>
      <p>1、双方可以协商变更或终止本合同。</p>
      <p>2、甲方有以下行为之一的，乙方有权解除合同：</p>
      <p>（1）不能提供房屋或所提供房屋不符合约定条件，严重影响居住。</p>
      <p>（2）甲方未尽房屋修缮义务，严重影响居住的。</p>
      <p>3、房屋租赁期间，乙方有下列行为之一的，甲方有权解除合同，收回出租房屋；</p>
      <p>（1）未经甲方书面同意，转租、转借承租房屋。</p>
      <p>（2）未经甲方书面同意，拆改变动房屋结构。</p>
      <p>（3）损坏承租房屋，在甲方提出的合理期限内仍未修复的。</p>
      <p>（4）未经甲方书面同意，改变本合同约定的房屋租赁用途。</p>
      <p>（5）利用承租房屋存放危险物品或进行违法活动。</p>
      <p>（6）逾期未交纳按约定应当由乙方交纳的各项费用，已经给甲方造成严重损害的。</p>
      <p>（7）拖欠房租累计 <input type="number" max="3" value="1" class="input" v-model="otherInfo[3]"> 个月以上。</p>
      <p>4、租赁期满前，乙方要继续租赁的，应当在租赁期满<span><input type="number" class="input" v-model="contractInfo.house.totalTime"></span>个月前书面通知甲方。如甲方在租期届满后仍要对外出租的，在同等条件下，乙方享有优先承租权。</p>
      <p>5、租赁期满合同自然终止。</p>
      <p>6、因不可抗力因素导致合同无法履行的，合同终止。</p>
      <p class="headline">第九条 房屋交付及收回的验收</p>
      <p>1、甲方应保证租赁房屋本身及附属设施、设备处于能够正常使用状态。</p>
      <p>2、验收时双方共同参与，如对装修、器物等硬件设施、设备有异议应当场提出。当场难以检测判断的，应于 <input type="number" max="7" value="3" class="input" v-model="otherInfo[4]"> 日内向对方主张。</p>
      <p>3、乙方应于房屋租赁期满后，将承租房屋及附属设施、设备交还甲方。</p>
      <p>4、乙方交还甲方房屋应当保持房屋及设施、设备的完好状态，不得留存物品或影响房屋的正常使用。对未经同意留存的物品，甲方有权处置。</p>
      <p class="headline">第十条 甲方违约责任处理规定</p>
      <p>1、甲方因不能提供本合同约定的房屋而解除合同的，应支付乙方本合同租金总额100%的违约金。甲方除应按约定支付违约金外，还应对超出违约金以外的损失进行赔偿。</p>
      <p>2、如乙方要求甲方继续履行合同的，甲方每逾期交房一日，则每日应向乙方支付日租金2倍的滞纳金。甲方还应承担因逾期交付给乙方造成的损失。</p>
      <p>3、由于甲方怠于履行维修义务或情况紧急，乙方组织维修的，甲方应支付乙方费用或折抵租金，但乙方应提供有效凭证。</p>
      <p>4、甲方违反本合同约定，提前收回房屋的，应按照合同总租金的100%向乙方支付违约金，若支付的违约金不足弥补乙方损失的，甲方还应该承担赔偿责任。</p>
      <p>5、甲方因房屋权属瑕疵或非法出租房屋而导致本合同无效时，甲方应赔偿乙方损失。</p>
      <p class="headline">第十一条 乙方违约责任</p>
      <p> 1、租赁期间，乙方有下列行为之一的，甲方有权终止合同，收回该房屋，乙方应按照合同总租金的100%向甲方支付违约金。若支付的违约金不足弥补甲方损失的，乙方还应负责赔偿直至达到弥补全部损失为止。</p>
      <p>（1）未经甲方书面同意，将房屋转租、转借给他人使用的；</p>
      <p>（2）未经甲方书面同意，拆改变动房屋结构或损坏房屋；</p>
      <p>（3）改变本合同规定的租赁用途或利用该房屋进行违法活动的；</p>
      <p>（4）拖欠房租累计 <input type="number" max="3" value="1" class="input" v-model="otherInfo[3]"> 个月以上的。</p>
      <p>2、在租赁期内，乙方逾期交纳本合同约定应由乙方负担的费用的，每逾期一天，则应按上述费用总额的10%支付甲方滞纳金。</p>
      <p>3、在租赁期内，乙方未经甲方同意，中途擅自退租的，乙方应该按合同总租金100%的额度向甲方支付违约金。若支付的违约金不足弥补甲方损失的，乙方还应承担赔偿责任。</p>
      <p>4、乙方如逾期支付租金，每逾期一日，则乙方须按日租金的2倍支付滞纳金。</p>
      <p>5、租赁期满，乙方应如期交还该房屋。乙方逾期归还，则每逾期一日应向甲方支付原日租金2倍的滞纳金。乙方还应承担因逾期归还给甲方造成的损失。</p>
      <p class="headline">第十二条 免责条件</p>
      <p>1、因不可抗力原因致使本合同不能继续履行或造成的损失，甲、乙双方互不承担责任。</p>
      <p>2、因国家政策需要拆除或改造已租赁的房屋，使甲、乙双方造成损失的，互不承担责任。</p>
      <p>3、因上述原因而终止合同的，租金按照实际使用时间计算，不足整月的按天数计算，多退少补。</p>
      <p>4、不可抗力系指 “ 不能预见、不能避免并不能克服的客观情况 ” .</p>
      <p class="headline">第十三条 本合同未尽事宜，经甲、乙双方协商一致，可订立补充条款。补充条款及附件均为本合同组成部分，与本合同具有同等法律效力。</p>
      <p class="headline">第十四条 争议解决</p>
      <p>本合同项下发生的争议，由双方当事人协商或申请调解；协商或调解解决不成的，按下列第 <select class="input" v-model="otherInfo[5]">
        <option value="1">1</option>
        <option value="2" selected>2</option>
      </select>种方式解决（以下两种方式只能选择一种）：</p>
      <p>1、提请仲裁委员会仲裁。</p>
      <p>2、依法向有管辖权的人民法院提起诉讼。</p>
      <p class="headline">第十五条 其他约定事项</p>
      <p>1、<input type="text" class="input" v-model="otherInfo[6]"></p>
      <p>2、<input type="text" class="input" v-model="otherInfo[7]"></p>
      <p class="headline">第十六条 本合同自双方签（章）后生效。</p>
      <p class="headline">第十七条 本合同及附件一式两份，由甲、乙双方各执一份。具有同等法律效力。</p>
      <p class="headline"><span style="display:inline-block;width: 500px">甲方：<span><input class="input" type="text" v-model="contractInfo.firstParty.user"></span></span>乙方：<span><input
        type="text" class="input" v-model="contractInfo.secondParty.user"></span></p>
      <p class="headline"><span style="display:inline-block;width: 500px">身份证号（或营业执照号）：<span><input type="text" class="input" v-model="otherInfo[1]"></span></span>身份证号：<span><input class="input" type="text" v-model="otherInfo[8]"></span></p>
      <p class="headline"><span style="display:inline-block;width: 500px">电话：<span><input class="input" type="text" v-model="contractInfo.firstParty.phone"></span></span>电话：<span><input
        type="text" class="input" v-model="contractInfo.secondParty.phone"></span></p>
      <p class="headline">设施 、设备清单</p>
      <p>本《设施清单》为（甲方）<span><input type="text" class="input" v-model="contractInfo.firstParty.user"></span>同（乙方）<span><input
        type="text" class="input" v-model="contractInfo.secondParty.user"></span>所签订的编号为房屋租赁合同的附件。</p>
      <p>甲方向乙方提供以下设施、设备：</p>
      <p>一、燃气管道 [<input type="checkbox" ref="cbs" class="cbsinfos" v-on:change="change(1)">] 煤气罐 [<input type="checkbox" ref="cbs" class="cbsinfos" v-on:change="change(2)">]</p>
      <p>二、暖气管道 [<input type="checkbox" ref="cbs" class="cbsinfos" v-on:change="change(3)">]</p>
      <p>三、热水管道 [<input type="checkbox" ref="cbs" class="cbsinfos" v-on:change="change(4)">]</p>
      <p>四、燃气热水器 [<input type="checkbox" ref="cbs" class="cbsinfos" v-on:change="change(5)">]</p>
      <p>电热水器 [<input type="checkbox" ref="cbs" class="cbsinfos" v-on:change="change(6)">] </p>
      <p>五、空调 [<input type="checkbox" ref="cbs" class="cbsinfos" v-on:change="change(7)">] 数量：<input type="text" class="input" v-model="otherInfo[10]"></p>
      <p>六、家具 [<input type="checkbox" ref="cbs" class="cbsinfos" v-on:change="change(8)">] 类型及数量：<input type="text" class="input" v-model="otherInfo[11]"></p>
      <p>七、电器 [<input type="checkbox" ref="cbs" class="cbsinfos" v-on:change="change(9)">] 数量：<input type="text" class="input" v-model="otherInfo[16]"></p>
      <p>八、水表现数： <input type="number" class="input" v-model="otherInfo[12]">电表现数： <input type="number" class="input" v-model="otherInfo[13]">燃气表现数：<input type="number" class="input" v-model="otherInfo[14]"></p>
      <p>九、装修状况：{{this.rentInfo.houseTheme}}</p>
      <p>十、其它设施、设备：<input type="text" class="input" v-model="otherInfo[15]"></p>
      <p>甲方：乙方：</p>
      <p>签约日期：<span><input type="date" class="input" v-model="contractInfo.signAContract.time"></span></p>
      <p>签约地点：<span><input type="text" class="input" v-model="contractInfo.signAContract.signAContractLocation"></span></p>


    </div>

    <div class="btn">
      <button v-on:click="preview">预览</button>
    </div>

    <div style="width: 100%;height: 100%;position: absolute;z-index: -10;opacity: 0" id="rentHouse">
      <h2 style="text-align: center; margin: 20px 0">房屋租赁合同</h2>
      <div class="mainBody"><p class="headline" style="margin: 5px 0">甲方：<span> {{this.contractInfo.firstParty.user}} </span>（出租人）乙方：<span> {{contractInfo.secondParty.user}} </span>（承租人）</p>
        <p>&nbsp;&nbsp;双方经友好协商，根据《合同法》及国家、当地政府对房屋租赁的有关规定，就租赁房屋一事达成以下协议。</p>
        <p class="headline">第一部分 房屋概况</p>
        <p class="headline"> 第一条 甲方保证向乙方出租的房屋系（本人，共有）拥有完全所有权和使用权，设有房屋它项权利有（如果房屋是共有，则还应增加：已经共有人同意，附书面同意声明。如果是委托租赁，应有房屋所有权人与受托人的委托协议书）</p>
        <p class="headline"> 第二条 房屋法律概况</p>
        <p>1、房屋所有权证书登记人：<span>{{this.contractInfo.firstParty.user}}</span>，身份证号码：<span>{{this.otherInfo[1]}}</span>；</p>
        <p>2、房屋所有权证书上登记的房屋建筑面积： {{this.contractInfo.house.houseArea}} m²；</p>
        <p>3、房屋的使用面积： {{this.contractInfo.house.houseArea}} m²</p>
        <p class="headline"> 第三条 租赁期限、用途</p>
        <p>1、该房屋租赁期共 {{this.contractInfo.house.totalTime}} 个月。自<span> {{this.contractInfo.house.rentTime}} </span>起至<span> {{this.contractInfo.house.endTime}} </span>止。</p>
        <p>2、乙方向甲方承诺，租赁该房屋仅作为使用。</p>
        <p>3、租赁期满，甲方有权收回出租房屋，乙方应如期交还。</p>
        <p>乙方如要求续租，则必须在租赁期满<span> {{this.contractInfo.house.totalTime}} </span>个月之前书面通知甲方，经甲方同意后，重新签订租赁合同。</p>
        <p class="headline"> 第四条 租金及支付方式</p>
        <p>1、 该房屋每月租金为<span> {{this.contractInfo.house.pirce}} </span>元。</p>
        <p>租金总额为<span> {{this.contractInfo.house.totalPrice}} </span>元。</p>
        <p>甲方收款后应提供给乙方有效的收款凭证。</p>
        <p class="headline"> 第五条 租赁期间相关费用及税金</p>
        <p>1、 甲方应承担的费用：</p>
        <p>（1）租赁期间，房屋和土地的产权税由甲方依法交纳。如果发生政府有关部门征收本合同中未列出项目但与该房屋有关的费用，应由甲方负担。</p>
        <p>2、乙方交纳以下费用：</p>
        <p>（1）乙方应按时交纳自行负担的费用。</p>
        <p>（2）甲方不得擅自增加本合同未明确由乙方交纳的费用。</p>
        <p class="headline"> 第六条 房屋修缮与使用</p>
        <p>1、在租赁期内，甲方应保证出租房屋的使用安全。该房屋及所属设施的维修责任除双方在本合同及补充条款中约定外，均由甲方负责（乙方使用不当除外）。</p>
        <p>甲方提出进行维修须提前<span> {{this.otherInfo[2]}} </span>日书面通知乙方，乙方应积极协助配合。</p>
        <p>乙方向甲方提出维修请求后，甲方应及时提供维修服务。</p>
        <p>对乙方的装修装饰部分甲方不负有修缮的义务。</p>
        <p>2、乙方应合理使用其所承租的房屋及其附属设施。如因使用不当造成房屋及设施损坏的，乙方应立即负责修复或经济赔偿。</p>
        <p>乙方如改变房屋的内部结构、装修或设置对房屋结构有影响的设备，设计规模、范围、工艺、用料等方案均须事先征得甲方的书面同意后方可施工。租赁期满后或因乙方责任导致退租的，除双方另有约定外，甲方有权选择以下权利中的一种：</p>
        <p>（1）依附于房屋的装修归甲方所有。</p>
        <p>（2）要求乙方恢复原状。</p>
        <p>（3）向乙方收取恢复工程实际发生的费用。</p>
        <p class="headline"> 第七条 房屋的转让与转租</p>
        <p>1、租赁期间，甲方有权依照法定程序转让该出租的房屋，转让后，本合同对新的房屋所有人和乙方继续有效。</p>
        <p>2、未经甲方同意，乙方不得转租、转借承租房屋。</p>
        <p>3、甲方出售房屋，须在 个月前书面通知乙方，在同等条件下，乙方有优先购买权。</p>
        <p class="headline"> 第八条 合同的变更、解除与终止</p>
        <p>1、双方可以协商变更或终止本合同。</p>
        <p>2、甲方有以下行为之一的，乙方有权解除合同：</p>
        <p>（1）不能提供房屋或所提供房屋不符合约定条件，严重影响居住。</p>
        <p>（2）甲方未尽房屋修缮义务，严重影响居住的。</p>
        <p>3、房屋租赁期间，乙方有下列行为之一的，甲方有权解除合同，收回出租房屋；</p>
        <p>（1）未经甲方书面同意，转租、转借承租房屋。</p>
        <p>（2）未经甲方书面同意，拆改变动房屋结构。</p>
        <p>（3）损坏承租房屋，在甲方提出的合理期限内仍未修复的。</p>
        <p>（4）未经甲方书面同意，改变本合同约定的房屋租赁用途。</p>
        <p>（5）利用承租房屋存放危险物品或进行违法活动。</p>
        <p>（6）逾期未交纳按约定应当由乙方交纳的各项费用，已经给甲方造成严重损害的。</p>
        <p>（7）拖欠房租累计 {{this.otherInfo[3]}} 个月以上。</p>
        <p>4、租赁期满前，乙方要继续租赁的，应当在租赁期满<span> {{this.contractInfo.house.totalTime}} </span>个月前书面通知甲方。如甲方在租期届满后仍要对外出租的，在同等条件下，乙方享有优先承租权。</p>
        <p>5、租赁期满合同自然终止。</p>
        <p>6、因不可抗力因素导致合同无法履行的，合同终止。</p>
        <p class="headline"> 第九条 房屋交付及收回的验收</p>
        <p>1、甲方应保证租赁房屋本身及附属设施、设备处于能够正常使用状态。</p>
        <p>2、验收时双方共同参与，如对装修、器物等硬件设施、设备有异议应当场提出。当场难以检测判断的，应于 {{this.otherInfo[4]}} 日内向对方主张。</p>
        <p>3、乙方应于房屋租赁期满后，将承租房屋及附属设施、设备交还甲方。</p>
        <p>4、乙方交还甲方房屋应当保持房屋及设施、设备的完好状态，不得留存物品或影响房屋的正常使用。对未经同意留存的物品，甲方有权处置。</p>
        <p class="headline"> 第十条 甲方违约责任处理规定</p>
        <p>1、甲方因不能提供本合同约定的房屋而解除合同的，应支付乙方本合同租金总额100%的违约金。甲方除应按约定支付违约金外，还应对超出违约金以外的损失进行赔偿。</p>
        <p>2、如乙方要求甲方继续履行合同的，甲方每逾期交房一日，则每日应向乙方支付日租金2倍的滞纳金。甲方还应承担因逾期交付给乙方造成的损失。</p>
        <p>3、由于甲方怠于履行维修义务或情况紧急，乙方组织维修的，甲方应支付乙方费用或折抵租金，但乙方应提供有效凭证。</p>
        <p>4、甲方违反本合同约定，提前收回房屋的，应按照合同总租金的100%向乙方支付违约金，若支付的违约金不足弥补乙方损失的，甲方还应该承担赔偿责任。</p>
        <p>5、甲方因房屋权属瑕疵或非法出租房屋而导致本合同无效时，甲方应赔偿乙方损失。</p>
        <p class="headline"> 第十一条 乙方违约责任</p>
        <p> 1、租赁期间，乙方有下列行为之一的，甲方有权终止合同，收回该房屋，乙方应按照合同总租金的100%向甲方支付违约金。若支付的违约金不足弥补甲方损失的，乙方还应负责赔偿直至达到弥补全部损失为止。</p>
        <p>（1）未经甲方书面同意，将房屋转租、转借给他人使用的；</p>
        <p>（2）未经甲方书面同意，拆改变动房屋结构或损坏房屋；</p>
        <p>（3）改变本合同规定的租赁用途或利用该房屋进行违法活动的；</p>
        <p>（4）拖欠房租累计 {{this.otherInfo[3]}} 个月以上的。</p>
        <p>2、在租赁期内，乙方逾期交纳本合同约定应由乙方负担的费用的，每逾期一天，则应按上述费用总额的10%支付甲方滞纳金。</p>
        <p>3、在租赁期内，乙方未经甲方同意，中途擅自退租的，乙方应该按合同总租金100%的额度向甲方支付违约金。若支付的违约金不足弥补甲方损失的，乙方还应承担赔偿责任。</p>
        <p>4、乙方如逾期支付租金，每逾期一日，则乙方须按日租金的2倍支付滞纳金。</p>
        <p>5、租赁期满，乙方应如期交还该房屋。乙方逾期归还，则每逾期一日应向甲方支付原日租金2倍的滞纳金。乙方还应承担因逾期归还给甲方造成的损失。</p>
        <p class="headline"> 第十二条 免责条件</p>
        <p>1、因不可抗力原因致使本合同不能继续履行或造成的损失，甲、乙双方互不承担责任。</p>
        <p>2、因国家政策需要拆除或改造已租赁的房屋，使甲、乙双方造成损失的，互不承担责任。</p>
        <p>3、因上述原因而终止合同的，租金按照实际使用时间计算，不足整月的按天数计算，多退少补。</p>
        <p>4、不可抗力系指 “ 不能预见、不能避免并不能克服的客观情况 ” .</p>
        <p class="headline"> 第十三条 本合同未尽事宜，经甲、乙双方协商一致，可订立补充条款。补充条款及附件均为本合同组成部分，与本合同具有同等法律效力。</p>
        <p class="headline"> 第十四条 争议解决</p>
        <p>本合同项下发生的争议，由双方当事人协商或申请调解；协商或调解解决不成的，按下列第 {{this.otherInfo[5]}} 种方式解决（以下两种方式只能选择一种）：</p>
        <p>1、提请仲裁委员会仲裁。</p>
        <p>2、依法向有管辖权的人民法院提起诉讼。</p>
        <p class="headline"> 第十五条 其他约定事项</p>
        <p>1、 {{this.otherInfo[6]}} </p>
        <p>2、 {{this.otherInfo[7]}} </p>
        <p class="headline"> 第十六条 本合同自双方签（章）后生效。</p>
        <p class="headline"> 第十七条 本合同及附件一式两份，由甲、乙双方各执一份。具有同等法律效力。</p>
        <p class="headline">甲方：<span width="280" >{{this.contractInfo.firstParty.user}}</span></p>
        <p class="headline">乙方：<span> {{this.contractInfo.secondParty.user}}</span></p>
        <p class="headline">甲方身份证号(或营业执照号):<span>{{this.otherInfo[1]}}</span></p>
        <p class="headline">乙方身份证号：<span>{{this.otherInfo[8]}}</span></p>
        <p class="headline">甲方电话：<span>{{this.contractInfo.firstParty.phone}}</span></p>
        <p class="headline">乙方电话：<span>{{this.contractInfo.secondParty.phone}}</span></p>
        <p class="headline">设施 、设备清单</p>
        <p>本《设施清单》为（甲方）<span> {{this.contractInfo.firstParty.user}} </span> 同（乙方）<span> {{this.contractInfo.secondParty.user}} </span>所签订的编号为房屋租赁合同的附件。</p>
        <p>甲方向乙方提供以下设施、设备：</p>
        <p>一、燃气管道 [{{this.otherInfo[9][1]}}] 煤气罐 [{{this.otherInfo[9][2]}}]</p>
        <p>二、暖气管道 [{{this.otherInfo[9][3]}}]</p>
        <p>三、热水管道 [{{this.otherInfo[9][4]}}]</p>
        <p>四、燃气热水器 [{{this.otherInfo[9][5]}}] 电热水器 [{{this.otherInfo[9][6]}}] </p>
        <p>五、空调 [{{this.otherInfo[9][7]}}] 数量：{{this.otherInfo[10]}}</p>
        <p>六、家具 [{{this.otherInfo[9][8]}}] 类型及数量：{{this.otherInfo[11]}}</p>
        <p>七、电器 [{{this.otherInfo[9][9]}}] 数量：{{this.otherInfo[16]}}</p>
        <p>八、水表现数： {{this.otherInfo[12]}}&nbsp;&nbsp;&nbsp;&nbsp;电表现数： {{this.otherInfo[13]}}&nbsp;&nbsp;&nbsp;&nbsp;燃气表现数：{{this.otherInfo[14]}}</p>
        <p>九、装修状况：{{this.rentInfo.houseTheme}}</p>
        <p>十、其它设施、设备：{{this.otherInfo[15]}}</p>
        <p>甲方：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;乙方：</p>
        <p>签约日期：<span>{{this.contractInfo.signAContract.time}}</span></p>
        <p>签约地点：<span>{{this.contractInfo.signAContract.signAContractLocation}}</span></p>
      </div>




    </div>




  </div>
</template>

<script>
  import {XDoc} from '../../../static/xdoc'
  export default {
    name: "contract",
    data(){
      return{
        userInfo:this.$store.state.user,
        rentInfo:this.$store.state.rentInfo,
        contractInfo:{
          firstParty:{
            user:this.$store.state.user.name,
            phone:this.$store.state.user.phone
          },
          secondParty:{
            user:"",
            phone:""
          },
          house:{
            houseArea:"",
            rentTime:"",
            endTime:"",
            pirce:"",
            totalTime:"",
            totalPrice:""
          },
          signAContract:{
            time:"",
            signAContractLocation:"",
          }
        },
        otherInfo:{
          1:"",
          2:7,
          3:1,
          4:3,
          5:2,
          6:"",
          7:"",
          8:"",
          9:{
            1:"",
            2:"",
            3:"",
            4:"",
            5:"",
            6:"",
            7:"",
            8:"",
            9:"",
          },
          10:"",
          11:"",
          12:"",
          13:"",
          14:"",
          15:"",
          16:"",

        }
      }
    },
    methods:{
      change(num){
        let checkboxs = document.getElementsByClassName("cbsinfos")
        if (checkboxs[num - 1].checked == true)
        this.otherInfo[9][num] = "√"
      },
      preview(){
        XDoc.to("text:" + document.getElementById("rentHouse").innerText, "pdf", {}, "_blank");
      },
      initialize(){
        /*签约时间*/
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
        this.contractInfo = {
          firstParty:{
            user:this.userInfo.name,
            phone:this.userInfo.phone
          },
          secondParty:{
            user:this.rentInfo.renter_name || "",
            phone:this.rentInfo.renter_phone || ""
          },
          house:{
            houseArea:this.rentInfo.houseArea || "",
            rentTime:this.rentInfo.rentTime ? this.timeDispose(this.rentInfo.rentTime) : "",
            endTime:this.rentInfo.endTime ? this.timeDispose(this.rentInfo.endTime) : "",
            pirce:this.rentInfo.price || "",
            totalTime:this.rentInfo.rentTime ? this.count(this.timeDispose(this.rentInfo.rentTime),this.timeDispose(this.rentInfo.endTime)) : "",
            totalPrice:this.rentInfo.rentTime ? this.count(this.timeDispose(this.rentInfo.rentTime),this.timeDispose(this.rentInfo.endTime))*this.rentInfo.price : ""
          },
          signAContract:{
            time:time,
            signAContractLocation:this.rentInfo.location_county ? this.rentInfo.location_county+this.rentInfo.location_street : "",
          }
        }
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
      /*计算两个时间相差的月份*/
      count(time1,time2){
        let date1 = time1.split('-');
        let date2 = time2.split('-');
        date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);
        date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);
        let m = Math.abs(date1 - date2);
        return m
      }
    },
    created() {

      this.initialize()
    }
  }
</script>

<style scoped>
  #contract{
    font-size: 14px;
    color: #333;
    height: 85vh;
  }
  .headline{
    font-size: 14px;
    font-weight: 800;
  }
  .mainBody{
    height: 80%;
    overflow: scroll;
    margin-left: 20px;
  }
  .btn {
    margin-top: 20px;
    text-align: center;
  }
  .btn button{
    display: inline-block;
    width: 70px;
    height: 30px;
    margin: 0px 15px;
    line-height: 30px;
    border: 1px solid #dcdcdc;
    background-color: #eeeeee;
    cursor: pointer;
  }
  .input{
    height: 24px;
    /*width: 175px;*/
    padding: 2px 6px;
    line-height: 24px;
    border: 1px solid #d7d6d7;
    border-radius: 4px;
    color: #555;
    background: #fff;
  }
  p{
    margin-top: 5px;
  }
</style>
