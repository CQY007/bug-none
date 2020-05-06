<template>
  <div style="font-size:12px !important"
       v-loading='outloading'
       element-loading-text="正在导出,请稍等......">
    <el-row class=top>
      <el-col>
        <el-input v-model="conditionSearch.Contact"
                  placeholder="QQ/手机/微信/旺旺/姓名/店铺名"
                  style="width: 310px;"
                  size='mini'></el-input>
        <el-input v-model="conditionSearch.Name"
                  placeholder="客户姓名"
                  style="width:150px"
                  size='mini'></el-input>
        <!-- <el-select v-model="conditionSearch.Name"
                   placeholder="客户姓名"
                   style="width:150px"
                   size='mini'
                   filterable>
          <el-option v-for="(item ,index) in userName"
                     :key="index"
                     :label="item"
                     :value="item"></el-option>
        </el-select> -->
        <el-cascader :options="child"
                     @change="handleChange1"
                     v-model="conditionSearch.CityAreaLev"
                     :props="props"
                     style="width:150px;margin-right:10px"
                     placeholder="省市"
                     size='mini'
                     change-on-select=true></el-cascader>
        <el-select v-model="conditionSearch.F_SalesManId"
                   placeholder="业务人员"
                   style="width:150px"
                   size='mini'
                   filterable>
          <el-option v-for="i in salseman"
                     :key="i.id"
                     :label="i.name"
                     :value="i.id"></el-option>
        </el-select>
        <el-select v-model="conditionSearch.State"
                   placeholder="状态"
                   style="width:150px"
                   size='mini'>
          <el-option v-for="(i,key) in State"
                     :key="key"
                     :label="i.label"
                     :value="i.State"></el-option>
        </el-select>
        <el-select v-model="conditionSearch.MemberType"
                   placeholder="客户分类"
                   style="width:150px"
                   size='mini'>
          <el-option :label="i.label"
                     v-for="(i,key) in MemberType"
                     :key="key"
                     :value="i.MemberType"></el-option>

        </el-select>
        <el-select v-model="conditionSearch.SiteId"
                   placeholder="平台"
                   style="width:150px"
                   size='mini'>
          <el-option :label="i.label"
                     v-for="(i,key) in enumSite"
                     :key="key"
                     :value="i.SiteId"></el-option>
        </el-select>
        <el-select v-model="conditionSearch.code"
                   placeholder="类目"
                   style="width:150px"
                   size='mini'>
          <el-option v-for="i in Type"
                     :key="i.code"
                     :label="i.name"
                     :value="i.code"></el-option>
        </el-select>
        <el-select v-model="conditionSearch.Source"
                   placeholder="来源"
                   style="width:150px"
                   size='mini'>
          <el-option v-for="item in Source"
                     :key='item.Source'
                     :label="item.label"
                     :value="item.Source"></el-option>
        </el-select>
        <el-select v-model="conditionSearch.IsSea"
                   placeholder="是否公海"
                   style="width:150px"
                   size='mini'>
          <el-option label="是"
                     value="1"></el-option>
          <el-option label="否"
                     value="2"></el-option>
        </el-select>
        <el-select v-model="conditionSearch.MemberClass"
                   placeholder="客户等级"
                   style="width:150px"
                   size='mini'>
          <el-option label="A级"
                     value="1"></el-option>
          <el-option label="B级"
                     value="2"></el-option>
          <el-option label="C级"
                     value="3"></el-option>
          <el-option label="D级"
                     value="4"></el-option>
        </el-select>
        <el-select v-model="conditionSearch.FollowState"
                   placeholder="跟进状态"
                   style="width:150px"
                   size='mini'>
          <el-option v-for="i in followList"
                     :key="i.value"
                     :label="i.label"
                     :value="i.value"></el-option>
        </el-select>
        <el-select v-model="conditionSearch.MinCredit"
                   placeholder="最低信誉"
                   style="width:150px;margin-right: 0;"
                   size='mini'>
          <el-option v-for="item in EnumCredit"
                     :key='item.MinCredit'
                     :label="item.label"
                     :value="item.MinCredit"></el-option>
        </el-select>~<el-select v-model="conditionSearch.MaxCredit"
                   placeholder="最高信誉"
                   style="width:150px"
                   size='mini'>
          <el-option v-for="item in EnumCredit"
                     :key='item.MinCredit'
                     :label="item.label"
                     :value="item.MinCredit"></el-option>
        </el-select>
        <el-input v-model="conditionSearch.MinPrice"
                  placeholder="最低价格"
                  style="width:150px;margin-right:0"
                  size='mini'></el-input>~
        <el-input v-model="conditionSearch.MaxPrice"
                  placeholder="最高价格"
                  style="width:145px"
                  size='mini'></el-input>
        <el-date-picker v-model="conditionSearch.CreateDate_Start"
                        type="date"
                        placeholder="创建开始日期"
                        size='mini'
                        style="margin-left:0px;width:185px"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
        </el-date-picker>~
        <el-date-picker v-model="conditionSearch.CreateDate_End"
                        type="date"
                        placeholder="创建结束日期"
                        size='mini'
                        format="yyyy 年 MM 月 dd 日"
                        style="margin-left:0px;width:185px"
                        value-format="yyyy-MM-dd">
        </el-date-picker>
        <el-date-picker v-model="conditionSearch.FollowDate_Start"
                        type="date"
                        placeholder="跟进开始日期"
                        size='mini'
                        style="margin-left:0;width:185px"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
        </el-date-picker>~
        <el-date-picker v-model="conditionSearch.FollowDate_End"
                        type="date"
                        placeholder="跟进结束日期"
                        size='mini'
                        format="yyyy 年 MM 月 dd 日"
                        style="margin-left:0px;width:185px"
                        value-format="yyyy-MM-dd">
        </el-date-picker>
        <el-input v-model="conditionSearch.remark"
                  placeholder="备注"
                  style="width:200px;vertical-align: middle;"
                  size='mini'></el-input>

        <el-select v-model="conditionSearch.id"
                   placeholder="请选择合作商"
                   @change='changeBp'
                   size='mini'>
          <el-option :label='i.name'
                     v-for="i in cooperative"
                     :key="i.id"
                     :value='i.id'></el-option>
        </el-select>
        <el-cascader :options="departmentArr"
                     @change="departmentChoice"
                     v-model="conditionSearch.GetDepartment"
                     :props="departmentProps"
                     style="width:150px;margin-right:10px"
                     placeholder="部门筛选"
                     size='mini'
                     change-on-select=true></el-cascader>
      </el-col>
    </el-row>
    <el-row style="text-align: right;margin-bottom: 5px;">
      <el-button type="primary"
                 @click='query(pgindex)'
                 size='mini'>查询</el-button>
      <el-button type="warning"
                 @click='cleanQuery'
                 size='mini'>清空查询条件</el-button>
    </el-row>
    <el-row style="margin-bottom:5px;">
      <el-col :span="24"
              style="text-align: right;">
        <el-button type="primary"
                   @click="dialogFormVisible = true;"
                   style="margin-right:10px;"
                   size='mini'>新增</el-button>
        <el-dialog title="新增跟进会员"
                   :visible.sync="dialogFormVisible"
                   :close-on-click-modal=false
                   :center=true
                   :destroy-on-close=true
                   width="80%"
                   :show-close=false>
          <el-form :model="form"
                   :rules="rules"
                   ref="form">
            <el-row style="display:flex;flex-wrap: wrap">
              <el-form-item label="客户分类"
                            :label-width="formLabelWidth"
                            prop="MemberType">
                <el-select v-model="form.MemberType"
                           placeholder="请选择客户类型"
                           style="width:202px">
                  <el-option label="卖家"
                             value="1"></el-option>
                  <el-option label="买家"
                             value="2"></el-option>
                  <el-option label="买卖家"
                             value="3"></el-option>
                  <el-option label="待明确"
                             value="4"></el-option>
                  <el-option label="入驻"
                             value="5"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="名字"
                            :label-width="formLabelWidth"
                            prop="name">
                <el-input v-model="form.name"
                          placeholder="请输入名字"></el-input>
              </el-form-item>
              <el-form-item label="手机号"
                            :label-width="formLabelWidth"
                            prop="tel">
                <el-input v-model="form.tel"
                          placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item label="微信号"
                            :label-width="formLabelWidth"
                            prop="Wechat">
                <el-input v-model="form.Wechat"
                          placeholder="请输入微信号"></el-input>
              </el-form-item>
              <el-form-item label="QQ"
                            :label-width="formLabelWidth"
                            prop="QQ">
                <el-input v-model="form.qq"
                          placeholder="请输入QQ"></el-input>
              </el-form-item>
              <el-form-item label="旺旺"
                            :label-width="formLabelWidth"
                            prop="Wangwang">
                <el-input v-model="form.Wangwang"
                          placeholder="请输入旺旺号"></el-input>
              </el-form-item>
              <el-form-item label="店铺名称"
                            :label-width="formLabelWidth"
                            prop="ShopName">
                <el-input v-model="form.ShopName"
                          placeholder="请输入店铺名称"></el-input>
              </el-form-item>
              <el-form-item label="平台"
                            :label-width="formLabelWidth"
                            prop="SiteId">
                <el-select v-model="form.SiteId"
                           placeholder="请选择平台"
                           style="width:202px">
                  <el-option label="淘宝"
                             value="1010"></el-option>
                  <el-option label="天猫"
                             value="1020"></el-option>
                  <el-option label="其他"
                             value="1030"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="企业店铺类型"
                            :label-width="formLabelWidth"
                            prop="EnterpriseShopType">
                <el-select v-model="form.EnterpriseShopType"
                           placeholder="请选择店铺类型"
                           style="width:202px">
                  <el-option label="企业店铺"
                             value="1"></el-option>
                  <el-option label="待升级企业店铺"
                             value="2"></el-option>
                  <el-option label="不可升级企业店铺"
                             value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="省市"
                            :label-width="formLabelWidth">
                <el-cascader :options="child"
                             @change="handleChange2"
                             v-model="form.F_CityArea"
                             :props="props"
                             style="width:202px"
                             placeholder="请选择省市"
                             change-on-select=true></el-cascader>
              </el-form-item>
              <el-form-item label="最低信誉"
                            :label-width="formLabelWidth"
                            prop="MinCredit">
                <el-select v-model="form.MinCredit"
                           placeholder="请选择最低信誉"
                           style="width:202px">
                  <el-option v-for="item in EnumCredit"
                             :key='item.MinCredit'
                             :label="item.label"
                             :value="item.MinCredit"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="最高信誉"
                            :label-width="formLabelWidth">
                <el-select v-model="MinCredit"
                           placeholder="请选择最高信誉"
                           style="width:202px">
                  <el-option v-for="item in EnumCredit"
                             :key='item.MinCredit'
                             :label="item.label"
                             :value="item.MinCredit"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="最低价格"
                            :label-width="formLabelWidth"
                            prop="MinPrice">
                <el-input v-model="form.MinPrice"
                          placeholder="请输入最低价格"></el-input>
              </el-form-item>
              <el-form-item label="最高价格"
                            :label-width="formLabelWidth"
                            prop="MaxPrice">
                <el-input v-model="form.MaxPrice"
                          placeholder="请输入最高价格"></el-input>
              </el-form-item>
              <el-form-item label="商城类型"
                            :label-width="formLabelWidth"
                            prop="ShopType">
                <label><input name="Fruit"
                         type="checkbox"
                         value="1"
                         v-model="form.ShopType" />旗舰店 </label>
                <label><input name="Fruit"
                         type="checkbox"
                         value="2"
                         v-model="form.ShopType" />专营店 </label>
                <label><input name="Fruit"
                         type="checkbox"
                         value="3"
                         v-model="form.ShopType" />专卖店 </label>
              </el-form-item>
              <el-form-item label="类目"
                            :label-width="formLabelWidth"
                            style="margin-left:10px;">
                <el-select v-model="form.Type"
                           placeholder="请选择类别"
                           style="width:202px">
                  <el-option v-for="i in Type"
                             :key="i.code"
                             :label="i.name"
                             :value="i.code"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="客户来源"
                            :label-width="formLabelWidth"
                            prop="Source">
                <el-select v-model="form.Source"
                           placeholder="请选择客户来源"
                           style="width:202px">
                  <el-option v-for="item in Source"
                             :key='item.Source'
                             :label="item.label"
                             :value="item.Source"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="客户等级"
                            :label-width="formLabelWidth"
                            prop="MemberClass">
                <el-select v-model="form.MemberClass"
                           placeholder="请选择客户等级"
                           style="width:202px">
                  <el-option label="A级"
                             value="1"></el-option>
                  <el-option label="B级"
                             value="2"></el-option>
                  <el-option label="C级"
                             value="3"></el-option>
                  <el-option label="D级"
                             value="4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="归属人员"
                            :label-width="formLabelWidth"
                            prop="F_SalesManId">
                <el-select v-model="form.F_SalesManId"
                           placeholder="请选择归属人员"
                           style="width:202px"
                           filterable>
                  <el-option v-for="i in salseman"
                             :key="i.id"
                             :label="i.name"
                             :value="i.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态"
                            :label-width="formLabelWidth"
                            prop="State">
                <el-select v-model="form.State"
                           placeholder="请选择店铺状态"
                           style="width:202px">
                  <el-option label="交易中"
                             value="1"></el-option>
                  <el-option label="已成交"
                             value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="兼容需求"
                            :label-width="formLabelWidth"
                            style="margin-right:46px;">
                <label><input name="Fruit"
                         type="checkbox"
                         value="1"
                         v-model="form.compatibility" />天猫新店 </label>
                <label><input name="Fruit"
                         type="checkbox"
                         value="2"
                         v-model="form.compatibility" />企业店铺 </label>
              </el-form-item>
              <el-form-item label="备注"
                            :label-width="formLabelWidth"
                            prop="Remark">
                <el-input v-model="form.Remark"
                          placeholder="请输入备注"
                          style="width:100%"></el-input>
              </el-form-item>
            </el-row>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogFormVisible = false;cancelBtn()">取 消</el-button>
            <el-button type="primary"
                       @click="submitForm()">新 增 确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="提示"
                   :visible.sync="outerVisible"
                   :close-on-click-modal=false
                   :center=true
                   width="30%">
          <span>未设置归属人员，将直接掉入公海，是否确认?</span>
          <span slot="footer"
                class="dialog-footer">
            <el-button @click="outerVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="outerVisible = false;addSureBtn()">确 定</el-button>
          </span>
        </el-dialog>
        <el-button type="primary"
                   @click="dialogFormVisiblechange=true;"
                   size='mini'
                   style="margin-right:10px">更改归属</el-button>
        <el-dialog title="更改归属"
                   :visible.sync="dialogFormVisiblechange"
                   :close-on-click-modal=false
                   :center=true>
          <el-form :model="changef_SalesManId"
                   :rules="rules"
                   ref="changef_SalesManId">
            <el-form-item label="选择新的归属人员"
                          :label-width="formLabelWidth"
                          prop="id">
              <el-select v-model="changef_SalesManId.id"
                         placeholder="请选择归属人员"
                         style="width:202px"
                         filterable>
                <el-option v-for="i in salseman"
                           :key="i.id"
                           :label="i.name"
                           :value="i.id"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogFormVisiblechange = false">取 消</el-button>
            <el-button type="primary"
                       @click="changeman()">确 定</el-button>
          </div>
        </el-dialog>
        <el-button type="primary"
                   size='mini'
                   @click="ImportPopup= true"
                   style="margin-right:10px">导入</el-button>
        <el-dialog title="导入文件"
                   :visible.sync="ImportPopup"
                   style="text-align: left;"
                   :close-on-click-modal=false
                   :show-close=false>
          <el-upload class="upload-demo"
                     action="http://39.108.125.119:8090/api/FollowMember/Import"
                     :headers="myHeader"
                     :on-success="handleChangeOut"
                     :on-error="handleChangeOuterr"
                     :file-list="fileList3"
                     ref="upload"
                     :auto-upload="false">
            <el-button size="mini"
                       type="primary"
                       slot="trigger">选择文件</el-button>
            <el-button type="primary"
                       size="mini"
                       @click="ImportBtn()"
                       style="margin-left:10px;">确认提交</el-button>
            <el-button type="primary"
                       size='mini'
                       @click="downloadTemplate"
                       style="margin-left:10px;">点击下载模板</el-button>
          </el-upload>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="ImportPopup = false;ImportClose()">关闭</el-button>
          </div>
        </el-dialog>
        <el-button type="primary"
                   size='mini'
                   @click="outBtn(pgindex)">全部导出</el-button>
        <el-button type="primary"
                   size='mini'
                   @click="selectExportBtn(pgindex)">选择导出</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData"
                border
                style="width: 100%;font-size:12px"
                @selection-change="handleSelectionChange"
                class='tableBox'
                v-loading="loading"
                :row-class-name="tableRowClassName">
        <el-table-column type="selection"
                         width="50"
                         align='center'>
        </el-table-column>
        <el-table-column prop="id"
                         label="编号"
                         width="80"
                         align='center'></el-table-column>
        <el-table-column prop="createDate"
                         label="创建时间"
                         width="160"
                         align='center'></el-table-column>
        <el-table-column prop="followDate"
                         label="最新跟进时间"
                         width="160"
                         align='center'></el-table-column>
        <el-table-column prop="followState"
                         label="跟进状态"
                         width="80"
                         align='center'>
          <template slot-scope="scope">
            <span style="margin-left: 10px">
              {{ scope.row.followState == 1 ? '日常跟进': (scope.row.followState >1 ? followVipList.filter(function(item){return item.value == scope.row.followState})[0].label:'无') }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="source"
                         label="客户来源"
                         width="70"
                         align='center'>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.source>0?Source.filter(function(item){return item.Source == scope.row.source})[0].label:'' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="memberType"
                         label="客户分类"
                         width="70"
                         align='center'>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.memberType>0?MemberType.filter(function(item){return item.MemberType == scope.row.memberType})[0].label:'' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="memberClass"
                         label="客户等级"
                         width="70"
                         align='center'>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.memberClass>0?MemberClass.filter(function(item){return item.MemberClass == scope.row.memberClass})[0].label:'' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="平台"
                         prop="siteId"
                         width="50"
                         align='center'>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.siteId >1000?enumSite.filter(function(item){return item.SiteId == scope.row.siteId})[0].label:'' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="typeName"
                         label="类目"
                         width="80"
                         align='center'>
        </el-table-column>
        <el-table-column prop="maxCredit"
                         label="信誉"
                         width="100"
                         align='center'>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              (scope.row.minCredit>0?EnumCredit.filter(function(item){return item.MinCredit == scope.row.minCredit})[0].label:'')
               + '-' + 
               (scope.row.maxCredit >0 ?EnumCredit.filter(function(item){return item.MinCredit == scope.row.maxCredit})[0].label:'')
               }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="f_CityArea_PathName"
                         label="地区"
                         width="150"
                         align='center'></el-table-column>
        <el-table-column prop="maxPrice"
                         label="价格"
                         width="120"
                         align='center'>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ 
              (scope.row.minPrice == 0 ?'': scope.row.minPrice)
               + '-' + 
               (scope.row.maxPrice == 0 ?'':scope.row.maxPrice) 
               }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="f_SalesManIdOriginal_Name"
                         label="原始归属"
                         width="120"
                         align='center'>
        </el-table-column>
        <el-table-column prop="f_SalesManId_Name"
                         f_BusinessPartId_Name
                         label="归属人员"
                         width="150"
                         align='center'>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ 
               (scope.row.f_BusinessPartId_Name == null ?'': "["+scope.row.f_BusinessPartId_Name+"]" ) + (scope.row.f_SalesManId_Name == null ?'':scope.row.f_SalesManId_Name) 
             }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="220"
                         align='center'>
          <template slot-scope="scope">
            <el-button @click="followhandleClick(scope.row);dialogFormVisiblefollow = true"
                       type="text"
                       size="small"
                       v-show="BtnJurisdiction(1,scope.row)">跟进</el-button>
            <el-button @click="modifyBtn(scope.row);dialogFormVisibleSee=true"
                       type="text"
                       size="small">查看</el-button>
            <el-button @click="modifyBtn(scope.row);dialogFormVisible1 = true;"
                       type="text"
                       size="small"
                       v-show="(IsManage == 1 && BpIsManage == 1)? 'true':((IsManage != 1 && BpIsManage != 1  && scope.row.f_SalesManId==saleId)?'true':((BpIsManage == 1 && IsManage != 1 && scope.row.f_BusinessPartId == Bp)?'true':((BpIsManage !=1 && IsManage == 1 && (scope.row.f_BusinessPartId == Bp || scope.row.f_SalesManId==saleId))?'true':Jurisdiction)))">修改</el-button>
            <el-button @click="handleClickDel(scope.row);centerDialogVisible = true"
                       type="text"
                       size="small"
                       v-show='BtnJurisdiction(3,scope.row)'>删除</el-button>
            <el-button @click="handleClickLose(scope.row)"
                       type="text"
                       size="small"
                       v-show="(IsManage == 1 && BpIsManage == 1)? 'true':((BpIsManage == 1 && IsManage != 1 && scope.row.f_SalesManId==saleId)?'true':((BpIsManage != 1 && IsManage != 1 && (scope.row.f_SalesManId==saleId || scope.row.f_SalesManId <= 0))?'true':((scope.row.f_SalesManId <= 0)?'true':((BpIsManage !=1 && IsManage == 1 && (scope.row.f_BusinessPartId == Bp || scope.row.f_SalesManId==saleId))?'true':Jurisdiction))))">{{ scope.row.f_SalesManId > 0 ?'丢公海':'打捞' }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="提示"
                 :visible.sync="centerDialogVisible"
                 width="30%"
                 center
                 :append-to-body="true">
        <span>该操作会删除该条数据,请谨慎操作,确认删除吗?</span>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="delSure()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="跟进"
                 :visible.sync="dialogFormVisiblefollow"
                 :close-on-click-modal=false
                 :center=true
                 :append-to-body="true">
        <el-form>
          <el-form-item label="跟进情况"
                        :label-width="formLabelWidth"
                        style="margin-bottom:0px">
            <el-select v-model="followListV"
                       placeholder="请选择跟进状态"
                       style="width:202px"
                       size='mini'>
              <el-option v-for="i in followList"
                         :key="i.value"
                         :label="i.label"
                         :value="i.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述"
                        :label-width="formLabelWidth">
            <el-input type="textarea"
                      :rows="1"
                      placeholder="请输入内容(选填)"
                      v-model="followR"
                      size='mini'>
            </el-input>
          </el-form-item>
        </el-form>
        <el-table :data="fllowUpVip"
                  style="width: 100%;font-size:12px;height:325px"
                  border
                  size='mini'>
          <el-table-column prop="createDate"
                           label="跟进日期"
                           width="180">
          </el-table-column>
          <el-table-column prop="f_SalesManId_Name"
                           label="操作人"
                           width="180">
          </el-table-column>
          <el-table-column prop="bP_Name"
                           label="所属合作商">
          </el-table-column>
          <el-table-column prop="cate"
                           label="跟进情况">
            <template slot-scope="scope">
              <span style="margin-left: 10px">
                {{ scope.row.cate== 1?'日常跟进' : (scope.row.cate >1 ? followVipList.filter(function(item){return item.value == scope.row.cate})[0].label:'无') }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="info"
                           label="描述">
          </el-table-column>
        </el-table>
        <el-pagination background
                       layout="total,prev, pager, next,jumper"
                       @current-change="pageChange1"
                       :total="total1"
                       :page-size="pgcount1"
                       small></el-pagination>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogFormVisiblefollow = false">取 消</el-button>
          <el-button type="primary"
                     @click="followvip()">跟进会员</el-button>
        </div>
      </el-dialog>
      <el-dialog title="查看跟进会员"
                 :visible.sync="dialogFormVisibleSee"
                 :close-on-click-modal=false
                 :center=true
                 width="80%"
                 :append-to-body="true">
        <el-form :model="changeForm"
                 ref="changeForm">
          <el-row style="display:flex;flex-wrap: wrap">
            <el-form-item label="客户分类"
                          :label-width="formLabelWidth">
              <el-select v-model="changeForm.MemberType"
                         style="width:202px"
                         disabled="disabled">
                <el-option :label="i.label"
                           v-for="(i,key) in MemberType"
                           :key="key"
                           :value="i.MemberType"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="名字"
                          :label-width="formLabelWidth">
              <el-input v-model="changeForm.name"
                        disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="手机号"
                          :label-width="formLabelWidth">
              <el-input v-model="changeForm.tel"
                        disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="微信号"
                          :label-width="formLabelWidth">
              <el-input v-model="changeForm.Wechat"
                        disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="QQ"
                          :label-width="formLabelWidth">
              <el-input v-model="changeForm.qq"
                        disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="旺旺"
                          :label-width="formLabelWidth">
              <el-input v-model="changeForm.Wangwang"
                        disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="店铺名称"
                          :label-width="formLabelWidth">
              <el-input v-model="changeForm.ShopName"
                        disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="平台"
                          :label-width="formLabelWidth">
              <el-select v-model="changeForm.SiteId"
                         disabled="disabled"
                         style="width:202px">
                <el-option :label="i.label"
                           v-for="(i,key) in enumSite"
                           :key="key"
                           :value="i.SiteId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="企业店铺类型"
                          :label-width="formLabelWidth">
              <el-select v-model="changeForm.EnterpriseShopType"
                         disabled="disabled"
                         style="width:202px">
                <el-option :label="i.label"
                           v-for="(i,key) in EnterpriseShoptype"
                           :key="key"
                           :value="i.EnterpriseShopType"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="省市"
                          :label-width="formLabelWidth">
              <el-cascader :options="child"
                           @change="handleChange"
                           disabled="disabled"
                           v-model="address"
                           :props="props"
                           style="width:202px"
                           change-on-select=true></el-cascader>
            </el-form-item>
            <el-form-item label="最低信誉"
                          :label-width="formLabelWidth">
              <el-select v-model="changeForm.MinCredit"
                         disabled="disabled"
                         style="width:202px">
                <el-option v-for="item in EnumCredit"
                           :key='item.MinCredit'
                           :label="item.label"
                           :value="item.MinCredit"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="最高信誉"
                          :label-width="formLabelWidth">
              <el-select v-model="changeForm.MaxCredit"
                         disabled="disabled"
                         style="width:202px">
                <el-option v-for="item in EnumCredit"
                           :key='item.MinCredit'
                           :label="item.label"
                           :value="item.MinCredit"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="最低价格"
                          :label-width="formLabelWidth">
              <el-input v-model="changeForm.MinPrice"
                        disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="最高价格"
                          :label-width="formLabelWidth">
              <el-input v-model="changeForm.MaxPrice"
                        disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="商城类型"
                          :label-width="formLabelWidth">
              <el-checkbox-group v-model="changeForm.ShopType">
                <el-checkbox label="1"
                             style="margin-right:2px"
                             disabled="disabled">旗舰店</el-checkbox>
                <el-checkbox label="2"
                             style="margin-right:2px"
                             disabled="disabled">专营店</el-checkbox>
                <el-checkbox label="3"
                             style="margin-right:2px"
                             disabled="disabled">专卖店</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="类目"
                          :label-width="formLabelWidth">
              <el-select v-model="changeForm.code"
                         disabled="disabled"
                         style="width:202px">
                <el-option v-for="i in Type"
                           :key="i.code"
                           :label="i.name"
                           :value="i.code"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户来源"
                          :label-width="formLabelWidth">
              <el-select v-model="changeForm.Source"
                         disabled="disabled"
                         style="width:202px">
                <el-option v-for="item in Source"
                           :key='item.Source'
                           :label="item.label"
                           :value="item.Source"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户等级"
                          :label-width="formLabelWidth">
              <el-select v-model="changeForm.MemberClass"
                         disabled="disabled"
                         style="width:202px">
                <el-option :label="i.label"
                           v-for="(i,key) in MemberClass"
                           :key='key'
                           :value="i.MemberClass"></el-option>
                <el-option label="B级"
                           value="2"></el-option>
                <el-option label="C级"
                           value="3"></el-option>
                <el-option label="D级"
                           value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="归属人员"
                          :label-width="formLabelWidth">
              <el-input v-model="changeForm.f_SalesManId_Name"
                        disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="备注"
                          :label-width="formLabelWidth">
              <el-input v-model="changeForm.Remark"
                        disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="状态"
                          :label-width="formLabelWidth">
              <el-select v-model="changeForm.State"
                         disabled="disabled"
                         style="width:202px">
                <el-option v-for="(i,key) in State"
                           :key="key"
                           :label="i.label"
                           :value="i.State"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="兼容需求"
                          :label-width="formLabelWidth">
              <el-checkbox-group v-model="changeForm.compatibility">
                <el-checkbox label="1"
                             style="margin-right:2px"
                             disabled="disabled">天猫新店</el-checkbox>
                <el-checkbox label="2"
                             style="margin-right:2px"
                             disabled="disabled">企业店铺</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-row>
        </el-form>
      </el-dialog>
      <el-dialog title="修改跟进会员"
                 :visible.sync="dialogFormVisible1"
                 :close-on-click-modal=false
                 :center=true
                 width="80%"
                 :modal-append-to-body='false'>
        <el-form :model="changeForm"
                 :rules="rules"
                 ref="changeForm">
          <el-row style="display:flex;flex-wrap: wrap">
            <el-form-item label="客户分类"
                          :label-width="formLabelWidth">
              <el-select v-model="changeForm.MemberType"
                         placeholder="请选择客户分类"
                         style="width:202px">
                <el-option :label="i.label"
                           v-for="(i,key) in MemberType"
                           :key="key"
                           :value="i.MemberType"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="名字"
                          :label-width="formLabelWidth"
                          prop="name">
              <el-input v-model="changeForm.name"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="手机号"
                          :label-width="formLabelWidth"
                          prop="tel">
              <el-input v-model="changeForm.tel"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="微信号"
                          :label-width="formLabelWidth">
              <el-input v-model="changeForm.Wechat"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="QQ"
                          :label-width="formLabelWidth">
              <el-input v-model="changeForm.qq"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="旺旺"
                          :label-width="formLabelWidth">
              <el-input v-model="changeForm.Wangwang"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="店铺名称"
                          :label-width="formLabelWidth">
              <el-input v-model="changeForm.ShopName"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="平台"
                          :label-width="formLabelWidth">
              <el-select v-model="changeForm.SiteId"
                         placeholder="请选择平台"
                         style="width:202px">
                <el-option :label="i.label"
                           v-for="(i,key) in enumSite"
                           :key="key"
                           :value="i.SiteId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="企业店铺类型"
                          :label-width="formLabelWidth">
              <el-select v-model="changeForm.EnterpriseShopType"
                         placeholder="请选择店铺类型"
                         style="width:202px">
                <el-option :label="i.label"
                           v-for="(i,key) in EnterpriseShoptype"
                           :key="key"
                           :value="i.EnterpriseShopType"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="省市"
                          :label-width="formLabelWidth">
              <el-cascader :options="child"
                           @change="handleChange"
                           v-model="address"
                           :props="props"
                           style="width:202px"
                           placeholder="请选择省市"
                           change-on-select=true></el-cascader>
            </el-form-item>
            <el-form-item label="最低信誉"
                          :label-width="formLabelWidth">
              <el-select v-model="changeForm.MinCredit"
                         placeholder="请选择信誉"
                         style="width:202px">
                <el-option v-for="item in EnumCredit"
                           :key='item.MinCredit'
                           :label="item.label"
                           :value="item.MinCredit"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="最高信誉"
                          :label-width="formLabelWidth">
              <el-select v-model="MinCredit"
                         placeholder="请选择信誉"
                         style="width:202px">
                <el-option v-for="item in EnumCredit"
                           :key='item.MinCredit'
                           :label="item.label"
                           :value="item.MinCredit"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="最低价格"
                          :label-width="formLabelWidth">
              <el-input v-model="changeForm.MinPrice"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="最高价格"
                          :label-width="formLabelWidth">
              <el-input v-model="changeForm.MaxPrice"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="商城类型"
                          :label-width="formLabelWidth">
              <el-checkbox-group v-model="changeForm.ShopType">
                <el-checkbox label="1"
                             style="margin-right:2px">旗舰店</el-checkbox>
                <el-checkbox label="2"
                             style="margin-right:2px">专营店</el-checkbox>
                <el-checkbox label="3"
                             style="margin-right:2px">专卖店</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="类目"
                          :label-width="formLabelWidth">
              <el-select v-model="changeForm.code"
                         placeholder="请选择类别"
                         style="width:202px">
                <el-option v-for="i in Type"
                           :key="i.code"
                           :label="i.name"
                           :value="i.code"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户来源"
                          :label-width="formLabelWidth">
              <el-select v-model="changeForm.Source"
                         placeholder="请选择信誉"
                         style="width:202px">
                <el-option v-for="item in Source"
                           :key='item.Source'
                           :label="item.label"
                           :value="item.Source"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户等级"
                          :label-width="formLabelWidth">
              <el-select v-model="changeForm.MemberClass"
                         placeholder="请选择用户等级"
                         style="width:202px">
                <el-option :label="i.label"
                           v-for="(i,key) in MemberClass"
                           :key='key'
                           :value="i.MemberClass"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="归属人员"
                          :label-width="formLabelWidth">
              <el-select v-model="changeForm.F_SalesManId"
                         placeholder="请选择归属人员"
                         style="width:202px"
                         filterable>
                <el-option v-for="i in salseman"
                           :key="i.id"
                           :label="i.name"
                           :value="i.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注"
                          :label-width="formLabelWidth">
              <el-input v-model="changeForm.Remark"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="状态"
                          :label-width="formLabelWidth">
              <el-select v-model="changeForm.State"
                         placeholder="请选择店铺类型"
                         style="width:202px">
                <el-option v-for="(i,key) in State"
                           :key="key"
                           :label="i.label"
                           :value="i.State"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="兼容需求"
                          :label-width="formLabelWidth">
              <el-checkbox-group v-model="changeForm.compatibility">
                <el-checkbox label="1"
                             style="margin-right:2px">天猫新店</el-checkbox>
                <el-checkbox label="2"
                             style="margin-right:2px">企业店铺</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-row>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary"
                     @click="submitForm1()">修改确 定</el-button>
        </div>
      </el-dialog>
    </el-row>
    <el-pagination background
                   layout="total,prev, pager, next,jumper"
                   style="position: fixed;bottom: 10px;"
                   @current-change="pageChange"
                   :total="total"
                   :page-size="pgcount"
                   small
                   :current-page.sync="pgindex"></el-pagination>
  </div>
</template>
<script>
import qs from 'qs'
import { ExcelByIds, cooperAtive, department, BatchchangeMan, Followupenquiries, out, Import, followList, findvipId, SetSalvage, getpage, Addvip, del, Conditionalquery, changeMan, follow, changevip, lose, province, getCategory, Seevip, GetSalesMan } from "../api/api"
import { log } from 'util';
export default {
  data () {
    //手机号验证规则
    var validatePass = (rule, value, callback) => {
      var reg = /^1[3456789]\d{9}$/;
      if (value == '') {
        callback()
      } else if (reg.test(value)) {
        callback(); //验证通过
      } else callback(new Error("请输入正确手机号")); //验证失败
    };

    //密码验证规则
    var validatePwd = (rule, value, callback) => {
      var reg = /^\w{6,20}$/;
      if (reg.test(value)) {
        callback(); //验证通过
      } else callback(new Error("密码只能是6-20位数字字母下划线")); //验证失败
    };
    var token = localStorage.getItem('token')
    return {
      url: 'http://39.108.125.119:8090',
      cooperative: [],
      outerVisible: false,
      // 列表跟进,查看,修改,删除按钮权限
      BpIsManage: '',
      BP_Name: '',
      IsManage: '',
      Bp: '',
      saleId: '',
      Jurisdiction: false,
      // 部门信息
      f_Department: '',
      departmentArr: [],
      departmentProps: {
        value: 'codePath',
        label: 'name',
        children: 'child'
      },
      // 跟进会员按钮里面列表分页
      pgindex1: 1,  //当前选中的页数
      total1: 8,    // 最大条数
      pgcount1: 8, //每页显示的条数 
      // 加载中
      outloading: false,
      loading: true,
      // 原归属人
      f_SalesManId_Name: '',
      // 条件选择字段
      newSearch: {},
      userName: [],
      conditionSearch: {
        Contact: '',//手机号
        Name: '',//姓名
        MinPrice: '',//最低价格
        MaxPrice: '',//最高价
        CityAreaLev: '',//省市
        F_BusinessPartId: '',//归属合作商
        F_SalesManId: '',//归属人员
        State: '',//状态
        MemberType: '',//客户分类
        SiteId: '',//所属平台
        code: '',//店铺类目
        MinCredit: '',//最低信誉
        MaxCredit: '',//最高信誉
        Source: '',//客户来源
        IsSea: '',//是否公海
        MemberClass: '',//用户等级
        FollowState: '',//跟进状态
        CreateDate_Start: '',//开始创建日期
        CreateDate_End: '',//结束创建日期
        FollowDate_Start: '',//开始跟进日期
        FollowDate_End: '',//结束跟进日期
        F_CityArea: '', //省市
        remark: '', //描述
        GetDepartment: '', //部门
        id: '',//合作商
      },
      Getdepartment: '',
      // 上传
      myHeader: { tk: token },
      ImportPopup: false,
      fileList3: [
      ],
      F_SalesManId: '',
      // 查看按钮
      findId: '',
      dialogFormVisibleSee: false,
      // 删除弹窗
      DelId: '',
      centerDialogVisible: false,
      // 跟进按钮Id
      followId: '',
      // 归属人员名单
      salseman: [],
      // 选中省市
      selectedOptions2: [],
      // 丢公海文字
      loseText: '',
      // 跟进弹窗
      fllowUpVip: [],
      followR: '',
      followListV: '',
      dialogFormVisiblefollow: false,
      // 平台
      enumSite: [
        { label: "淘宝", SiteId: 1010 },
        { label: "天猫", SiteId: 1020 },
        { label: "其他", SiteId: 1030 },
      ],
      // 企业店铺类型
      EnterpriseShoptype: [
        { label: "企业店铺", EnterpriseShopType: 1 },
        { label: "待升级企业店铺", EnterpriseShopType: 2 },
        { label: "不可升级企业店铺", EnterpriseShopType: 3 },
      ],
      valueSite: '',
      // 跟进列表
      followList: [
        { label: "卖价太高", value: "2" },
        { label: "预算不足", value: "3" },
        { label: "客户失联", value: "4" },
        { label: "没有店铺", value: "5" },
        { label: "没有买家", value: "6" },
        { label: "安全顾虑", value: "7" },
        { label: "需要升级", value: "8" },
        { label: "资料不齐", value: "9" },
        { label: "地区问题", value: "10" },
        { label: "无法验店", value: "11" },
        { label: "垃圾店铺", value: "12" },
        { label: "交易中", value: "13" },
        { label: "公海跟进", value: "14" },
      ],
      // 客户分类
      MemberType: [
        { label: '卖家', MemberType: 1 },
        { label: '买家', MemberType: 2 },
        { label: '买卖家', MemberType: 3 },
        { label: '待明确', MemberType: 4 },
        { label: '入驻', MemberType: 5 },
      ],
      // 客户等级
      MemberClass: [
        { label: "A级", MemberClass: 1 },
        { label: "B级", MemberClass: 2 },
        { label: "C级", MemberClass: 3 },
        { label: "D级", MemberClass: 4 },
      ],
      // 状态
      State: [
        { label: "交易中", State: 1 },
        { label: "已成交", State: 2 },
      ],
      // 店铺信誉,列表
      EnumCredit: [
        { label: "一心", MinCredit: 10010 },
        { label: "二心", MinCredit: 10020 },
        { label: "三心", MinCredit: 10030 },
        { label: "四心", MinCredit: 10040 },
        { label: "五心", MinCredit: 10050 },
        { label: "一钻", MinCredit: 10110 },
        { label: "二钻", MinCredit: 10120 },
        { label: "三钻", MinCredit: 10130 },
        { label: "四钻", MinCredit: 10140 },
        { label: "五钻", MinCredit: 10150 },
        { label: "一皇冠", MinCredit: 10210 },
        { label: "二皇冠", MinCredit: 10220 },
        { label: "三皇冠", MinCredit: 10230 },
        { label: "四皇冠", MinCredit: 10240 },
        { label: "五皇冠", MinCredit: 10250 },
        { label: "一金冠", MinCredit: 10310 },
        { label: "二金冠", MinCredit: 10320 },
        { label: "三金冠", MinCredit: 10330 },
        { label: "四金冠", MinCredit: 10340 },
        { label: "五金冠", MinCredit: 10350 },
      ],
      // 客户来源列表
      Source: [
        { label: "五三分配", Source: 1 },
        { label: "电话分配", Source: 2 },
        { label: "微信分配", Source: 3 },
        { label: "企业QQ	", Source: 4 },
        { label: "群发", Source: 5 },
        { label: "扫帖", Source: 6 },
        { label: "转介绍", Source: 7 },
        { label: "扫店", Source: 8 },
        { label: "微信", Source: 9 },
        { label: "电话", Source: 10 },
        { label: "店铺评估", Source: 11 },
        { label: "砍价", Source: 12 },
        { label: "会员分配", Source: 13 },
        { label: "自媒体", Source: 14 },
        { label: "买家登记", Source: 15 },
        { label: "卖家登记", Source: 16 },
        { label: "信息采集", Source: 17 },
        { label: "员工推荐", Source: 18 },
        { label: "抖音分配", Source: 19 },
        { label: "网站访问", Source: 20 },
        { label: "公海打捞", Source: 21 },
        { label: "老客户", Source: 22 },
      ],
      followVipList: [
        { label: '卖价太高', value: 2 },
        { label: '预算不足', value: 3 },
        { label: '客户失联', value: 4 },
        { label: '没有店铺', value: 5 },
        { label: '没有买家', value: 6 },
        { label: '安全顾虑', value: 7 },
        { label: '需要升级', value: 8 },
        { label: '资料不齐', value: 9 },
        { label: '地区问题', value: 10 },
        { label: '无法验店', value: 11 },
        { label: '垃圾店铺', value: 12 },
        { label: '交易中', value: 13 },
        { label: '公海跟进', value: 14 }
      ],
      // 分页
      tableData1: {},
      pgindex: 1,  //当前选中的页数
      total: 8,    // 最大条数
      pgcount: 11, //每页显示的条数 
      //验证规则
      rules: {
        id: [{ required: true, message: '归属人员不能为空', trigger: 'blur' },],
        Source: [{ required: true, message: '来源不能为空', trigger: 'blur' },],
        MemberClass: [{ required: true, message: '等级不能为空', trigger: 'blur' },],
        State: [{ required: true, message: '状态不能为空', trigger: 'blur' },],
        MemberType: [{ required: true, message: '客户分类不能为空', trigger: 'blur' },],
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' },],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: validatePwd, trigger: "blur" }
        ],
        // qq: [
        //   { validator: validateQq, trigger: "blur" }
        // ],
        tel: [
          { validator: validatePass, trigger: "blur" }
        ],
        isManage: [{ required: true, message: '管理权限不能为空', trigger: 'blur' },],
        store: [{ required: true, message: '库容上限不能为空', trigger: 'blur' },],
        salvage: [{ required: true, message: '每月打捞上限不能为空', trigger: 'blur' },]
      },
      // 变更归属弹窗
      dialogFormVisiblechange: false,
      // 修改按钮弹窗
      dialogFormVisible1: false,
      // 新增按钮弹窗
      dialogFormVisible: false,
      // 省市
      provinceCity: [],
      child: [],
      props: {
        value: 'code',
        children: 'child'
      },
      form: {
        MemberType: '',
        name: '',
        isManage: '',
        tel: '',
        qq: '',
        scoreMath: '',
        salvage: '',
        password: '',
        bp: '',
        Wechat: '',
        Wangwang: '',
        ShopName: '',
        SiteId: '',
        EnterpriseShopType: '',
        F_CityArea: '',
        MinCredit: '',
        MaxCredit: '',
        MinPrice: '',
        MaxPrice: '',
        ShopType: [],
        Source: '',
        MemberClass: '',
        F_SalesManId: '',
        Remark: '',
        State: '',
        compatibility: [],
        Type: [],
      },
      MinCredit: '',
      Type: [],
      // 修改按钮ID
      modifyId: '',
      // 修改列表
      changeForm: {
        MemberType: '',
        name: '',
        isManage: '',
        tel: '',
        qq: '',
        scoreMath: '',
        salvage: '',
        password: '',
        bp: '',
        Wechat: '',
        Wangwang: '',
        ShopName: '',
        SiteId: '',
        EnterpriseShopType: '',
        F_CityArea: '',
        MinCredit: '',
        MaxCredit: '',
        MinPrice: '',
        MaxPrice: '',
        ShopType: [],
        code: '',
        Source: '',
        MemberClass: '',
        F_SalesManId: '',
        Remark: '',
        State: '',
        compatibility: [],
        f_SalesManId_Name: '',
      },
      formLabelWidth: '140px',
      // 时间选择器
      creationTime: "",
      followUpTime: "",
      // 条件选择
      value: "",
      value1: "",
      value2: "",
      options: [],
      //   列表数据
      tableData: [],
      changeid: [],
      Batchchangeid: [],
      arrchange: [],
      changef_SalesManId: {
        id: ''
      },
      // 查看里面的三元值
      tianmao: '',
      shoptype: '',
      // 公海打捞
      salesManId: '',
      address: '',
      // 选择数据id集合
      choiceId: [],
    };
  },
  methods: {
    BtnJurisdiction (type, row) {
      switch (type) {
        //跟进按钮
        case 1: return (this.IsManage == 1 && this.BpIsManage == 1 && row.f_BusinessPartId == this.Bp) || (this.IsManage != 1 && this.BpIsManage != 1 && row.f_SalesManId == this.saleId) || (this.BpIsManage == 1 && this.IsManage != 1 && row.f_BusinessPartId == this.Bp) || (this.BpIsManage != 1 && this.IsManage == 1 && row.f_BusinessPartId == this.Bp)
        // 更改归属
        case 2: return
        // 删除
        case 3: return (this.IsManage == 1 && this.BpIsManage == 1 && (row.tel == '' || row.tel == null)) || (this.BpIsManage != 1 && this.IsManage == 1 && ((parseInt(row.f_BusinessPartId)) == this.Bp && row.tel == ''))
        // 修改
        case 4: return
        // 丢公海
        case 5: return
        case 6: return

      }
    },
    // 合作商选择
    changeBp (value) {
      var F_BusinessPart = value
      department(F_BusinessPart).then(res => {
        // this.getTreeData(res.data.data)
        this.departmentArr = res.data.data
      })
    },
    // 公海数据背景色设置
    tableRowClassName ({ row, rowIndex }) {
      if (row.f_SalesManId > 0) {
        return 'success-row';
      } else {
        return 'warning-row';
      }
      return '';
    },
    // 下载模板
    downloadTemplate () {
      window.open(this.url + '/Excel/跟进会员导入模板.xlsx')
    },
    // 导出
    outBtn (curpage) {
      this.outloading = true
      var Contact = this.conditionSearch.Contact
      var Name = this.conditionSearch.Name
      var MinPrice = (this.conditionSearch.MinPrice == '' ? 0 : parseInt(this.conditionSearch.MinPrice))
      var MaxPrice = (this.conditionSearch.MaxPrice == '' ? 0 : parseInt(this.conditionSearch.MaxPrice))
      var CityAreaLev = (this.conditionSearch.CityAreaLev == '' ? 0 : this.conditionSearch.CityAreaLev)
      var F_BusinessPartId = (this.conditionSearch.F_BusinessPartId == '' ? 0 : this.conditionSearch.F_BusinessPartId)
      var F_SalesManId = (this.conditionSearch.F_SalesManId == '' ? 0 : this.conditionSearch.F_SalesManId)
      var State = (this.conditionSearch.State == '' ? 0 : this.conditionSearch.State)
      var MemberType = (this.conditionSearch.MemberType == '' ? 0 : this.conditionSearch.MemberType)
      var SiteId = (this.conditionSearch.SiteId == '' ? 0 : this.conditionSearch.SiteId)
      var Type = this.conditionSearch.code
      var MinCredit = (this.conditionSearch.MinCredit == '' ? 0 : this.conditionSearch.MinCredit)
      var MaxCredit = (this.conditionSearch.MaxCredit == '' ? 0 : this.conditionSearch.MaxCredit)
      var Source = (this.conditionSearch.Source == '' ? 0 : this.conditionSearch.Source)
      var IsSea = (this.conditionSearch.IsSea == '' ? 0 : parseInt(this.conditionSearch.IsSea))
      var MemberClass = (this.conditionSearch.MemberClass == '' ? 0 : this.conditionSearch.MemberClass)
      var FollowState = (this.conditionSearch.FollowState == '' ? 0 : this.conditionSearch.FollowState)
      var CreateDate_Start = this.conditionSearch.CreateDate_Start
      var CreateDate_End = this.conditionSearch.CreateDate_End
      var FollowDate_Start = this.conditionSearch.FollowDate_Start
      var FollowDate_End = this.conditionSearch.FollowDate_End
      var F_CityArea = this.conditionSearch.F_CityArea
      var remark = this.conditionSearch.remark
      var f_Department = this.Getdepartment
      out(curpage, this.pgcount, Contact, Name, MinPrice, MaxPrice, CityAreaLev, F_BusinessPartId, F_SalesManId,
        State, MemberType, SiteId, Type, MinCredit, MaxCredit, Source, IsSea, MemberClass, FollowState, CreateDate_Start,
        CreateDate_End, FollowDate_Start, FollowDate_End, F_CityArea, remark, f_Department).then(res => {

          if (res.data.state == 1) {
            window.open(this.url + res.data.data)
          } else {
            this.$alert(res.data.data, '错误', {
              confirmButtonText: '确定',
            });
          }
          this.outloading = false
        })
    },
    // 导入
    handleChangeOut (file, fileList) {
      this.$notify({
        title: '成功',
        message: file.data[0].msg,
        type: 'success',
        duration: 2000
      });
      this.ajaxgetusers(this.pgindex)
    },
    handleChangeOuterr (file) {
      this.$alert(res.data.data, '错误', {
        confirmButtonText: '确定',
      });
    },
    ImportBtn () {
      this.$refs.upload.submit();
    },
    ImportClose () {
      this.fileList3 = []
      this.ajaxgetusers(this.pgindex)
    },
    // 获取类目
    getType () {
      getCategory(1).then(res => {
        // this.changeForm.Type = res.data.data
        this.form.Type = res.data.data
        this.Type = res.data.data
      })
    },
    // getTreeData (data) {
    //   // 循环遍历json数据
    //   for (var i = 0; i < data.length; i++) {

    //     if (data[i].child.length < 1) {
    //       // children若为空数组，则将children设为undefined
    //       data[i].child = undefined;
    //     } else {
    //       // children若不为空数组，则继续 递归调用 本方法
    //       this.getTreeData(data[i].child);
    //     }
    //   }
    //   this.departmentArr = data;
    // },
    // 部门获取
    // departmentList () {
    //   department().then(res => {
    //     // this.getTreeData(res.data.data)
    //     this.departmentArr = res.data.data
    //   })
    // },
    departmentChoice (value) {
      if (value.length > 1) {
        this.Getdepartment = value.slice(value.length - 1, value.length).join()
      } else {
        this.Getdepartment = value.slice(0, 1).join()
      }
    },
    // 省市选择框
    handleChange (value) {
      if (value.length > 1) {
        this.changeForm.F_CityArea = parseInt(value.slice(1, 2).join())
        this.address = value
      } else {
        this.changeForm.F_CityArea = parseInt(value.slice(0, 1).join())
      }
    },
    handleChange2 (value) {
      if (value.length > 1) {
        this.form.F_CityArea = parseInt(value.slice(1, 2).join())
      } else {
        this.form.F_CityArea = parseInt(value.slice(0, 1).join())
      }
    },
    handleChange1 (value) {
      if (value.length > 1) {
        this.conditionSearch.CityAreaLev = 2
        this.conditionSearch.F_CityArea = value.slice(1, 2).join()
      } else {
        this.conditionSearch.CityAreaLev = 1
        this.conditionSearch.F_CityArea = value.slice(0, 1).join()
      }
    },
    // 获取省份
    getProvince () {
      var child = [];
      province().then(res => {
        for (var i = 0; i < res.data.data.length; i++) {
          var obj = {
            value: res.data.data[i].name,
            label: res.data.data[i].name,
            code: res.data.data[i].code,
            codePath: res.data.data[i].codePath,
            area: res.data.data[i].area,
            lev: res.data.data[i].lev,
            parent: res.data.data[i].parent,
            namePath: res.data.data[i].namePath,
          }
          for (var v = 0; v < res.data.data[i].child.length; v++) {
            var obj1 = {
              value: res.data.data[i].child[v].name,
              label: res.data.data[i].child[v].name,
              code: res.data.data[i].child[v].code,
              codePath: res.data.data[i].child[v].codePath,
              area: res.data.data[i].child[v].area,
              lev: res.data.data[i].child[v].lev,
              parent: res.data.data[i].child[v].parent,
              namePath: res.data.data[i].child[v].namePath,
            }
            child.push(obj1)
          }
          obj["child"] = child;
          this.child.push(obj)
          child = []

        }
      })
    },
    // 获取业务员
    async  getSales () {
      await GetSalesMan().then(res => {
        this.$nextTick(() => {
          this.salseman = res.data.data
        })
      })
    },
    // 跟进按钮
    followhandleClick (row) {
      this.followId = row.id
      var followMemberId = row.id
      followList(row.id, this.pgindex1, this.pgcount1).then(res => {
        this.fllowUpVip = res.data.data.rows
        this.total1 = res.data.data.total
      })
    },
    // 跟进会员
    async followvip () {
      var followR = this.followR
      var followListV = this.followListV
      var f_FollowMemberId = this.followId
      await follow(f_FollowMemberId, followR, followListV).then(res => {
        if (followListV == '') {
          this.$alert('跟进情况不能为空', '错误', {
            confirmButtonText: '确定',
          });
        } else if (res.data.state == 1) {
          this.$notify({
            title: '成功',
            message: res.data.data,
            type: 'success',
            duration: 2000
          });
          this.dialogFormVisiblefollow = false
          this.ajaxgetusers(this.pgindex)
        } else {
          this.$alert(res.data.data, '错误', {
            confirmButtonText: '确定',
          });
        }
      })
      this.followListV = ''
      this.followR = ''
    },
    // 列表左边选择小框点击函数
    handleSelectionChange (val) {
      this.arrchange = val
      this.choiceId = []
      if (val.length > 0) {
        for (var v of val) {
          this.changeid = v.id
          this.f_SalesManId_Name = v.f_SalesManId_Name
          this.choiceId.push(v.id)
          // this.changef_SalesManId = val.f_SalesManId
        }
        this.multipleSelection = val;
      } else {
        this.changeid = ''
      }
    },
    // 选择导出
    selectExportBtn () {
      var ids = this.choiceId.join(',')
      ExcelByIds(ids).then(res => {
        if (res.data.state) {
          window.open(this.url + res.data.data)
        } else {
          this.$alert(res.data.data, '错误', {
            confirmButtonText: '确定',
          });
        }
      })
    },
    // 变更归属
    // changeBtn (row) {
    //   this.changeid = row.id
    // },
    changeman () {
      if (this.arrchange.length == 0) {
        this.$alert('请先选择需要变更的数据', '错误', {
          confirmButtonText: '确定',
        });
      } else {
        for (var changeV of this.arrchange) {
          this.Batchchangeid.push(changeV.id)
        }
        var id = this.changeid
        var f_SalesManId = this.changef_SalesManId.id
        var f_ChangeSalesManId = this.changef_SalesManId.id
        if (this.arrchange.length > 1) {
          var ids = (this.Batchchangeid).join(',')
          BatchchangeMan(ids, f_ChangeSalesManId).then(res => {
            if (res.data.state == 1) {
              this.$notify({
                title: '成功',
                message: res.data.data,
                type: 'success',
                duration: 2000
              });
            } else {
              this.$alert(res.data.data, '错误', {
                confirmButtonText: '确定',
              });
            }
            this.dialogFormVisiblechange = false
            this.ajaxgetusers(this.pgindex)
            this.arrchange = []
            this.Batchchangeid = []
          })
        } else {
          this.$refs.changef_SalesManId.validate(valid => {
            //valid: 是否验证通过
            if (valid) {
              changeMan(id, f_SalesManId).then(res => {
                if (res.data.state == 1) {
                  this.$notify({
                    title: '成功',
                    message: res.data.data,
                    type: 'success',
                    duration: 2000,
                  });
                  this.dialogFormVisiblechange = false
                  this.changef_SalesManId.id = ''
                  this.ajaxgetusers(this.pgindex)
                } else {
                  this.$alert(res.data.data, '错误', {
                    confirmButtonText: '确定',
                  });
                }
                this.changef_SalesManId.id = ''
              })
            }
          })
        }
      }
    },
    // 清空查询条件
    cleanQuery () {
      this.conditionSearch.Contact = '',//手机号
        this.conditionSearch.Name = '',//姓名
        this.conditionSearch.MinPrice = '',//最低价格
        this.conditionSearch.MaxPrice = '',//最高价
        this.conditionSearch.CityAreaLev = '',//省市
        this.conditionSearch.F_BusinessPartId = '',//归属合作商
        this.conditionSearch.F_SalesManId = '',//归属人员
        this.conditionSearch.State = '',//状态
        this.conditionSearch.MemberType = '',//客户分类
        this.conditionSearch.SiteId = '',//所属平台
        this.conditionSearch.code = '',//店铺类目
        this.conditionSearch.MinCredit = '',//最低信誉
        this.conditionSearch.MaxCredit = '',//最高信誉
        this.conditionSearch.Source = '',//客户来源
        this.conditionSearch.IsSea = '',//是否公海
        this.conditionSearch.MemberClass = '',//用户等级
        this.conditionSearch.FollowState = '',//跟进状态
        this.conditionSearch.CreateDate_Start = '',//开始创建日期
        this.conditionSearch.CreateDate_End = '',//结束创建日期
        this.conditionSearch.FollowDate_Start = '',//开始跟进日期
        this.conditionSearch.FollowDate_End = ''//结束跟进日期
      this.conditionSearch.F_CityArea = '' //省市
      this.conditionSearch.remark = ''//备注
      this.Getdepartment = ''
      this.conditionSearch.GetDepartment = ''
      this.conditionSearch.id = ''
      this.ajaxgetusers(this.pgindex)
    },
    // 条件查询按钮
    query (curpage) {
      var Contact = this.conditionSearch.Contact
      var Name = this.conditionSearch.Name
      var MinPrice = (this.conditionSearch.MinPrice == '' ? 0 : parseInt(this.conditionSearch.MinPrice))
      var MaxPrice = (this.conditionSearch.MaxPrice == '' ? 0 : parseInt(this.conditionSearch.MaxPrice))
      var CityAreaLev = (this.conditionSearch.CityAreaLev == '' ? 0 : this.conditionSearch.CityAreaLev)
      var F_BusinessPartId = (this.conditionSearch.id == '' ? 0 : this.conditionSearch.id)
      var F_SalesManId = (this.conditionSearch.F_SalesManId == '' ? 0 : this.conditionSearch.F_SalesManId)
      var State = (this.conditionSearch.State == '' ? 0 : this.conditionSearch.State)
      var MemberType = (this.conditionSearch.MemberType == '' ? 0 : this.conditionSearch.MemberType)
      var SiteId = (this.conditionSearch.SiteId == '' ? 0 : this.conditionSearch.SiteId)
      var Type = this.conditionSearch.code
      var MinCredit = (this.conditionSearch.MinCredit == '' ? 0 : this.conditionSearch.MinCredit)
      var MaxCredit = (this.conditionSearch.MaxCredit == '' ? 0 : this.conditionSearch.MaxCredit)
      var Source = (this.conditionSearch.Source == '' ? 0 : this.conditionSearch.Source)
      var IsSea = (this.conditionSearch.IsSea == '' ? 0 : parseInt(this.conditionSearch.IsSea))
      var MemberClass = (this.conditionSearch.MemberClass == '' ? 0 : this.conditionSearch.MemberClass)
      var FollowState = (this.conditionSearch.FollowState == '' ? 0 : this.conditionSearch.FollowState)
      var CreateDate_Start = this.conditionSearch.CreateDate_Start
      var CreateDate_End = this.conditionSearch.CreateDate_End
      var FollowDate_Start = this.conditionSearch.FollowDate_Start
      var FollowDate_End = this.conditionSearch.FollowDate_End
      var F_CityArea = this.conditionSearch.F_CityArea
      var remark = this.conditionSearch.remark
      var f_Department = this.Getdepartment
      // var queryData = qs.stringify({
      //   conditionSearch: JSON.stringify(this.conditionSearch)
      // });
      // curpage = 1
      // var objVal = []
      // var data = {}
      // for (var i in this.conditionSearch) {
      //   if (this.conditionSearch[i] != '') {
      //     var key = i
      //     var value = this.conditionSearch[i]
      //     data[key] = this.conditionSearch[i]
      //   }
      // }
      // console.log(data);

      this.pgindex = 1
      for (var SearchV in this.conditionSearch) {
        if (this.conditionSearch[SearchV] != '') {
          this.newSearch[SearchV] = this.conditionSearch[SearchV]
        } else {
          continue
        }
      }
      Followupenquiries(this.pgindex, this.pgcount, Contact, Name, MinPrice, MaxPrice, CityAreaLev, F_BusinessPartId, F_SalesManId,
        State, MemberType, SiteId, Type, MinCredit, MaxCredit, Source, IsSea, MemberClass, FollowState, CreateDate_Start,
        CreateDate_End, FollowDate_Start, FollowDate_End, F_CityArea, remark, f_Department).then(res => {
          if (res.data.state == 2) {
            this.$alert(res.data.data, '错误', {
              confirmButtonText: '确定',
            });
          } else {
            this.tableData = res.data.data.rows
            this.total = res.data.data.total
          }

        });
      this.newSearch = {}
    },
    // 跟进按钮里面列表分页
    pageChange1 (curpage) {
      //保存当前页数
      this.pgindex1 = curpage
      //请求当前页数的数据
      followList(this.followId, this.pgindex1, this.pgcount1).then(res => {
        this.fllowUpVip = res.data.data.rows
      })
    },
    // 分页
    pageChange (curpage) {
      //保存当前页数
      this.pgindex = curpage
      //请求当前页数的数据
      this.ajaxgetusers(this.pgindex)
    },
    //发送请求获取用户信息
    ajaxgetusers (curpage) {
      // var queryData = qs.stringify({
      //   conditionSearch: JSON.stringify(this.conditionSearch)
      // });
      var Contact = this.conditionSearch.Contact
      var Name = this.conditionSearch.Name
      var MinPrice = (this.conditionSearch.MinPrice == '' ? 0 : parseInt(this.conditionSearch.MinPrice))
      var MaxPrice = (this.conditionSearch.MaxPrice == '' ? 0 : parseInt(this.conditionSearch.MaxPrice))
      var CityAreaLev = (this.conditionSearch.CityAreaLev == '' ? 0 : this.conditionSearch.CityAreaLev)
      var F_BusinessPartId = (this.conditionSearch.id == '' ? 0 : this.conditionSearch.id)
      var F_SalesManId = (this.conditionSearch.F_SalesManId == '' ? 0 : this.conditionSearch.F_SalesManId)
      var State = (this.conditionSearch.State == '' ? 0 : this.conditionSearch.State)
      var MemberType = (this.conditionSearch.MemberType == '' ? 0 : this.conditionSearch.MemberType)
      var SiteId = (this.conditionSearch.SiteId == '' ? 0 : this.conditionSearch.SiteId)
      var Type = this.conditionSearch.code
      var MinCredit = (this.conditionSearch.MinCredit == '' ? 0 : this.conditionSearch.MinCredit)
      var MaxCredit = (this.conditionSearch.MaxCredit == '' ? 0 : this.conditionSearch.MaxCredit)
      var Source = (this.conditionSearch.Source == '' ? 0 : this.conditionSearch.Source)
      var IsSea = (this.conditionSearch.IsSea == '' ? 0 : parseInt(this.conditionSearch.IsSea))
      var MemberClass = (this.conditionSearch.MemberClass == '' ? 0 : this.conditionSearch.MemberClass)
      var FollowState = (this.conditionSearch.FollowState == '' ? 0 : this.conditionSearch.FollowState)
      var CreateDate_Start = this.conditionSearch.CreateDate_Start
      var CreateDate_End = this.conditionSearch.CreateDate_End
      var FollowDate_Start = this.conditionSearch.FollowDate_Start
      var FollowDate_End = this.conditionSearch.FollowDate_End
      var F_CityArea = this.conditionSearch.F_CityArea
      var remark = this.conditionSearch.remark
      var f_Department = this.Getdepartment
      getpage(curpage, this.pgcount, Contact, Name, MinPrice, MaxPrice, CityAreaLev, F_BusinessPartId, F_SalesManId,
        State, MemberType, SiteId, Type, MinCredit, MaxCredit, Source, IsSea, MemberClass, FollowState, CreateDate_Start,
        CreateDate_End, FollowDate_Start, FollowDate_End, F_CityArea, remark, f_Department).then(res => {
          this.total = res.data.data.total
          this.tableData = res.data.data.rows
          // for (var i of this.tableData) {
          //   this.userName.push(i.name)
          // }
          if (res.data.state == 4) {
            this.$router.push("/");
          } else if (res.data.state == 2) {
            this.$alert(res.data.data, '错误', {
              confirmButtonText: '确定',
            });
          } else {
            for (var i of res.data.data.rows) {
              if (i.tel == null) {
                return
              } else {
                var obj = {
                  value: i.tel,
                  label: i.tel
                }
                this.options.push(obj)
              }
            }
          }

          this.loading = false
        });
    },
    // 新增业务员弹窗确认按钮
    submitForm () {
      var F_SalesManId = (this.form.F_SalesManId == '' ? 0 : this.form.F_SalesManId)
      if (F_SalesManId == 0) {
        this.outerVisible = true
      } else {
        this.addSureBtn()
      }
    },
    addSureBtn () {
      var MemberType = this.form.MemberType
      var name = this.form.name
      var password = this.form.password
      var tel = (this.form.tel == '' || !this.form.tel) ? '' : this.form.tel
      var qq = this.form.qq
      var bp = this.form.bp
      var isManage = this.form.isManage
      var store = this.form.store
      var salvage = this.form.salvage
      var Wechat = this.form.Wechat
      var Wangwang = this.form.Wangwang
      var ShopName = this.form.ShopName
      var SiteId = (this.form.SiteId == '' ? 0 : this.form.SiteId)
      var EnterpriseShopType = (this.form.EnterpriseShopType == '' ? 0 : this.form.EnterpriseShopType)
      var F_CityArea = this.form.F_CityArea
      var MinCredit = (this.form.MinCredit == '' ? 0 : this.form.MinCredit)
      var MaxCredit = (this.MinCredit == '' ? 0 : this.MinCredit)
      var MinPrice = (this.form.MinPrice == '' ? 0 : this.form.MinPrice)
      var MaxPrice = (this.form.MaxPrice == '' ? 0 : this.form.MaxPrice)
      var ShopType = (this.form.ShopType).join(',')
      var Type = this.form.Type
      var Source = this.form.Source
      var MemberClass = this.form.MemberClass
      var F_SalesManId = (this.form.F_SalesManId == '' ? 0 : this.form.F_SalesManId)
      var Remark = this.form.Remark
      var State = this.form.State
      var compatibility = (this.form.compatibility).join(',')
      this.pgindex = 1
      this.$refs.form.validate(valid => {
        //valid: 是否验证通过
        if (valid) {
          // scoreMath: '',
          //   salvage: '', isManage
          //验证通过发送请求给服务器
          this.dialogFormVisible = false
          Addvip(MemberType, name, tel, qq, bp, store, Wechat, Wangwang
            , ShopName, SiteId, EnterpriseShopType, F_CityArea, MinCredit, MaxCredit, MinPrice, MaxPrice
            , ShopType, Type, Source, MemberClass, F_SalesManId, Remark, State, compatibility, password, isManage, salvage
          ).then(res => {
            if (res.data.state == 1) {
              this.$notify({
                title: '成功',
                message: res.data.data,
                type: 'success',
                duration: 2000
              });
              this.ajaxgetusers(this.pgindex)
              // for (var obj in this.form) {
              //   this.form[obj] = null
              // }
              // this.MinCredit = ''
              for (let key in this.form) {
                this.form[key] = ''
              }
              this.form.ShopType = []
              this.form.compatibility = []
              this.MinCredit = ''
            } else {
              //失败
              this.ajaxgetusers(this.pgindex)
              this.$alert(res.data.data, '错误', {
                confirmButtonText: '确定',
              });
              this.error = true; //显示我们的错误节点
            }
          });
        } else {
          this.$message.error('请填写正确完整资料');
        }
        this.form.ShopType = []
        this.form.compatibility = []
      });
    },
    cancelBtn () {
      for (let key in this.form) {
        this.form[key] = ''
      }
      this.form.ShopType = []
      this.form.compatibility = []
      this.MinCredit = ''
      this.ajaxgetusers(this.pgindex)
    },
    // 修改按钮
    modifyBtn (row) {
      this.modifyId = row.id
      findvipId(row.id).then(res => {
        this.changeForm.f_SalesManId_Name = res.data.data.f_SalesManId_Name
        this.changeForm.name = res.data.data.name
        this.changeForm.MemberType = res.data.data.memberType
        this.changeForm.isManage = res.data.data.isManage
        this.changeForm.tel = res.data.data.tel
        this.changeForm.qq = res.data.data.qq
        this.changeForm.scoreMath = res.data.data.scoreMath
        this.changeForm.salvage = res.data.data.salvage
        this.changeForm.password = res.data.data.password
        this.changeForm.bp = res.data.data.bp
        this.valueSite = res.data.data.siteId
        this.changeForm.Wechat = res.data.data.wechat
        this.changeForm.Wangwang = res.data.data.wangwang
        this.changeForm.ShopName = res.data.data.shopName
        this.changeForm.SiteId = (res.data.data.siteId <= 0 ? '' : res.data.data.siteId)
        this.changeForm.EnterpriseShopType = (res.data.data.enterpriseShopType <= 0 ? '' : res.data.data.enterpriseShopType)
        this.address = res.data.data.f_CityArea
        this.changeForm.F_CityArea = res.data.data.f_CityArea
        this.changeForm.MinCredit = (res.data.data.minCredit <= 0 ? '' : res.data.data.minCredit)
        this.changeForm.MaxCredit = (res.data.data.maxCredit <= 0 ? '' : res.data.data.maxCredit)
        this.MinCredit = (res.data.data.maxCredit <= 0 ? '' : res.data.data.maxCredit)
        this.changeForm.MinPrice = (res.data.data.minPrice <= 0 ? '' : res.data.data.minPrice)
        this.changeForm.MaxPrice = (res.data.data.maxPrice <= 0 ? '' : res.data.data.maxPrice)
        this.changeForm.ShopType = (res.data.data.shopType == null || res.data.data.shopType.length <= 0) ? [] : (res.data.data.shopType).split(",")
        this.changeForm.Source = res.data.data.source > 0 ? res.data.data.source : ''
        this.changeForm.MemberClass = res.data.data.memberClass
        this.changeForm.F_SalesManId = (res.data.data.f_SalesManId <= 0 ? '' : res.data.data.f_SalesManId)
        this.changeForm.Remark = res.data.data.remark
        this.changeForm.State = res.data.data.state
        this.changeForm.compatibility = (res.data.data.compatibility == null || res.data.data.compatibility.length <= 0) ? [] : (res.data.data.compatibility).split(",")
        this.changeForm.code = res.data.data.type
      })
    },
    // 修改按钮确认
    submitForm1 () {
      var id = this.modifyId
      var MemberType = this.changeForm.MemberType
      var name = this.changeForm.name
      var password = this.changeForm.password
      var tel = this.changeForm.tel
      var qq = this.changeForm.qq
      var bp = this.changeForm.bp
      var isManage = this.changeForm.isManage
      var store = this.changeForm.store
      var salvage = this.changeForm.salvage
      var Wechat = this.changeForm.Wechat
      var Wangwang = this.changeForm.Wangwang
      var ShopName = this.changeForm.ShopName
      var SiteId = (this.changeForm.SiteId > 0 ? this.changeForm.SiteId : 0)
      var EnterpriseShopType = (this.changeForm.EnterpriseShopType > 0 ? this.changeForm.EnterpriseShopType : 0)
      var F_CityArea = this.changeForm.F_CityArea
      var MinCredit = (this.changeForm.MinCredit > 0 ? this.changeForm.MinCredit : 0)
      var MaxCredit = (this.MinCredit > 0 ? this.MinCredit : 0)
      var MinPrice = (this.changeForm.MinPrice > 0 ? this.changeForm.MinPrice : 0)
      var MaxPrice = (this.changeForm.MaxPrice > 0 ? this.changeForm.MaxPrice : 0)
      var ShopType = this.changeForm.ShopType.length > 0 ? this.changeForm.ShopType.join(',') : ''
      var code = this.changeForm.code
      var Source = this.changeForm.Source > 0 ? this.changeForm.Source : 0
      var MemberClass = this.changeForm.MemberClass > 0 ? this.changeForm.MemberClass : 0
      var F_SalesManId = (this.changeForm.F_SalesManId > 0 ? this.changeForm.F_SalesManId : 0)
      var Remark = this.changeForm.Remark
      var State = this.changeForm.State > 0 ? this.changeForm.State : 0
      var compatibility = (this.changeForm.compatibility).join(',')
      var Type = code
      this.$refs.changeForm.validate(valid => {
        //valid: 是否验证通过
        if (valid) {
          // scoreMath: '',
          //   salvage: '', isManage
          //验证通过发送请求给服务器
          this.dialogFormVisible1 = false
          changevip(id, MemberType, name, tel, qq, bp, store, Wechat, Wangwang
            , ShopName, SiteId, EnterpriseShopType, F_CityArea, MinCredit, MaxCredit, MinPrice, MaxPrice
            , ShopType, Type, Source, MemberClass, F_SalesManId, Remark, State, compatibility, password, isManage, salvage
          ).then(res => {
            if (res.data.state == 1) {
              this.ajaxgetusers(this.pgindex)
              this.$notify({
                title: '成功',
                message: res.data.data,
                type: 'success',
                duration: 2000
              });
            } else {
              //失败
              this.ajaxgetusers(this.pgindex)
              this.$alert(res.data.data, '错误', {
                confirmButtonText: '确定',
              });
              this.error = true; //显示我们的错误节点
            }
          });
        } else {
          this.$message.error('请填写正确完整资料');
        }
      });
    },
    //    查看列表按钮
    handleClick (row) {
      this.findId = row.id
      var id = this.findId
      Seevip(id).then(res => {
        this.tableData1 = res.data.data.rows[0]
        if (res.data.data.rows[0].siteId == 1010) {
          this.tianmao = "淘宝"
        } else {
          this.tianmao = "天猫"
        }
        if (res.data.data.rows[0].shopType == 1) {
          this.shoptype = '企业店铺'
        } else if (res.data.data.rows[0].shopType == 2) {
          this.shoptype = '待升级企业店铺'
        } else {
          this.shoptype = '不可升级企业店铺'
        }
      })
    },
    // 丢公海
    handleClickLose (row) {
      this.F_SalesManId = row.f_SalesManId
      this.salesManId = row.id
      this.$confirm('确定操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row.f_SalesManId == null || row.f_SalesManId == 0) {
          SetSalvage(this.salesManId).then(res => {
            if (res.data.state == 1) {
              this.$notify({
                title: '成功',
                message: res.data.data,
                type: 'success',
                duration: 2000
              });
              this.ajaxgetusers(this.pgindex)
            } else {
              this.ajaxgetusers(this.pgindex)
              this.$alert(res.data.data, '错误', {
                confirmButtonText: '确定',
              });
            }
          })
        } else {
          lose(row.id).then(res => {
            if (res.data.state == 1) {
              this.$notify({
                title: '成功',
                message: res.data.data,
                type: 'success',
                duration: 2000
              });
              this.ajaxgetusers(this.pgindex)
            } else {
              this.$alert(res.data.data, '错误', {
                confirmButtonText: '确定',
              });
            }
          })
        }
      })
    },
    // 删除按钮id
    handleClickDel (row) {
      this.DelId = row.id
    },
    // 删除按钮
    delSure () {
      var id = this.DelId
      del(id).then(res => {
        if (res.data.state == 1) {
          this.centerDialogVisible = false
          this.ajaxgetusers(this.pgindex)
          this.$notify({
            title: '成功',
            message: res.data.data,
            type: 'success',
            duration: 2000
          });
        } else {
          this.centerDialogVisible = false
          this.$alert(res.data.data, '错误', {
            confirmButtonText: '确定',
          });
        }
      })
    },
  },
  created () {
    this.ajaxgetusers(this.pgindex, this.pgcount);
    this.getProvince()
    this.getType()
    this.getSales()
    this.BpIsManage = localStorage.getItem('bpIsManage')
    this.BP_Name = localStorage.getItem('bP_Name')
    this.IsManage = localStorage.getItem('isManage')
    this.Bp = localStorage.getItem('bp')
    this.saleId = localStorage.getItem("id");
    this.f_Department = localStorage.getItem("f_Department");
    cooperAtive().then(res => {
      this.cooperative = res.data.data
    })
  },
};
</script>
<style lang="less">
// .el-input__inner::-webkit-input-placeholder,
// .el-textarea__inner::-webkit-input-placeholder {
//   color: #000;
// }

// .el-input__inner::-webkit-input-placeholder,
// .el-textarea__inner::-moz-input-placeholder {
//   color: #000;
// }

// .el-input__inner::-webkit-input-placeholder,
// .el-textarea__inner::-ms-input-placeholder {
//   color: #000;
// }
.el-message-box__message p {
  color: red;
}
.el-notification {
  position: fixed;
  top: 40% !important;
  left: 43% !important;
}
.is-checked {
  span {
    color: #000 !important;
    .el-checkbox__inner {
      background-color: #409eff !important;
    }
  }
}
.el-input.is-disabled .el-input__inner {
  color: #000;
}
.upload-demo {
  float: none !important;
}
.tableBox {
  tr {
    td {
      padding: 0;
      .cell {
        padding: 0 !important;
        height: 50px !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        line-height: 50px;
      }
    }
  }
}
.el-table .warning-row {
  background: #ffc8c8;
}

.el-table .success-row {
  background: #fff;
}
.top {
  .el-input {
    margin: 0 10px 5px 0;
  }
  .el-select {
    margin: 0 10px 5px 0;
  }
}
.upload-demo {
  float: left;
}
</style>