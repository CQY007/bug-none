<template>
  <div style="font-size:12px !important">
    <el-row>
      <el-col :span="16">

        <el-input v-model="value"
                  placeholder="请输入姓名查询"
                  style="width:200px;margin-right:10px"
                  size='mini'></el-input>
        <el-input v-model="value1"
                  placeholder="请输入手机号查询"
                  style="width:200px"
                  size='mini'></el-input>
      </el-col>
      <el-col :span="8"
              style="text-align: right;">
        <el-button type="primary"
                   @click='query'
                   size='mini'>查询</el-button>
        <el-button type="warning"
                   @click="cleanQuery"
                   size='mini'>清空查询条件</el-button>
      </el-col>
    </el-row>
    <el-row style="text-align: right;">
      <el-button type="primary"
                 @click="dialogFormVisible = true;"
                 style="margin-right:10px;"
                 size='mini'>新增</el-button>
      <el-dialog title="新增业务员"
                 :visible.sync="dialogFormVisible"
                 :close-on-click-modal=false
                 :center=true
                 :show-close=false
                 :destroy-on-close=true>
        <el-form :model="form"
                 :rules="rules"
                 ref="form">
          <el-form-item label="姓名"
                        :label-width="formLabelWidth"
                        prop="name">
            <el-input v-model="form.name"
                      placeholder="请输入姓名"></el-input>
          </el-form-item>
          <!-- <el-form-item label="登录密码"
                        :label-width="formLabelWidth"
                        prop="password">
            <el-input v-model="form.password"
                      placeholder="请输入密码"></el-input>
          </el-form-item> -->
          <el-form-item label="手机号"
                        :label-width="formLabelWidth"
                        prop="tel">
            <el-input v-model="form.tel"
                      placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="QQ"
                        :label-width="formLabelWidth"
                        prop="qq">
            <el-input v-model="form.qq"
                      placeholder="请输入QQ"></el-input>
          </el-form-item>
          <el-form-item label="合作商"
                        :label-width="formLabelWidth"
                        prop="bp">
            <el-select v-model="form.bp"
                       placeholder="请选择合作商"
                       @change='changeBp'>
              <el-option :label='i.name'
                         v-for="i in cooperative"
                         :key="i.id"
                         :value='i.id'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门"
                        :label-width="formLabelWidth">
            <el-cascader :options="departmentArr"
                         @change="departmentChoice"
                         v-model="form.GetDepartment"
                         :props="departmentProps"
                         :disabled="optionsChanged"
                         :placeholder="showPlaceholder"
                         change-on-select=true
                         :clearable=true></el-cascader>
          </el-form-item>
          <el-form-item label="管理"
                        :label-width="formLabelWidth"
                        prop="isManage">
            <el-select v-model="form.isManage"
                       placeholder="请选择管理权限">
              <el-option :label='i.label'
                         v-for="i in Managementauthority"
                         :key="i.isManage"
                         :value='i.isManage'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账号库容上限"
                        :label-width="formLabelWidth"
                        prop="store">
            <el-input v-model="form.store"
                      placeholder="整数,-1表示无限制,大于等于0则表示库容上限,例如1就表示库容上限为1条"></el-input>
          </el-form-item>
          <el-form-item label="账号每月打捞上限"
                        :label-width="formLabelWidth"
                        prop="salvage">
            <el-input v-model="form.salvage"
                      placeholder="整数,-1表示无限制,大于等于0则表示打捞上限,例如1就表示每月打捞上限为1条"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogFormVisible = false;cancelBtn()">取 消</el-button>
          <el-button type="primary"
                     @click="submitForm()">确 定</el-button>
        </div>
      </el-dialog>

    </el-row>
    <el-row>
      <el-table :data="tableData"
                border
                style="width: 100%;font-size:12px"
                @selection-change="handleSelectionChange"
                v-loading="loading"
                element-loading-text="拼命加载中"
                class='salestableBox'>
        <el-table-column type="selection"
                         width="60"
                         align='center'>
        </el-table-column>
        <el-table-column prop="tel"
                         label="电话"
                         width="150"
                         align='center'></el-table-column>
        <el-table-column prop="bP_Name"
                         label="合作商"
                         width="150"
                         align='center'></el-table-column>
        <el-table-column prop="namePath"
                         label="部门"
                         width="150"
                         align='center'>
        </el-table-column>
        <el-table-column prop="name"
                         label="姓名"
                         width="150"
                         align='center'></el-table-column>
        <el-table-column prop="qq"
                         label="QQ"
                         width="210"
                         align='center'></el-table-column>
        <el-table-column prop="store"
                         label="库容(已用/上限)"
                         width="220"
                         align='center'>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.store_Use+'/'+ (scope.row.store >= 0 ?scope.row.store:'不限') }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="salvage"
                         label="每月打捞(已用/上限)"
                         width="250"
                         align='center'>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.salvage_Use+'/'+(scope.row.salvage >= 0 ?scope.row.salvage:'不限')  }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="400"
                         align='center'>
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row);dialogFormVisible1 = true"
                       type="text"
                       size="small">修改</el-button>

            <el-button @click="centerDialogVisible = true;delBtn(scope.row)"
                       type="text"
                       size="small">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="提示"
                 :visible.sync="centerDialogVisible"
                 width="30%"
                 center
                 :append-to-body="true">
        <el-form :model="changeSalesmanId"
                 :rules="rules"
                 ref="changeSalesmanId">
          <el-form-item label="选择新归属人员"
                        :label-width="formLabelWidth"
                        prop="id">
            <el-select v-model="changeSalesmanId.id"
                       placeholder="业务人员"
                       style="width:150px"
                       size='mini'
                       filterable>
              <el-option v-for="i in SalesmanList"
                         :key="i.id"
                         :label="i.name"
                         :value="i.id"></el-option>
            </el-select>
          </el-form-item>
          <div style="margin-top:20px;color:red">'归属人员'为该业务人员的所有跟进会员将迁移至所选人员</div>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="DelhandleClick()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="修改"
                 :visible.sync="dialogFormVisible1"
                 :close-on-click-modal=false
                 :center=true
                 :append-to-body="true">
        <el-form :model="changeSA"
                 :rules="rules"
                 ref="changeSA">
          <el-form-item label="姓名"
                        :label-width="formLabelWidth"
                        prop="name">
            <el-input v-model="changeSA.name"
                      placeholder="请输入姓名"></el-input>
          </el-form-item>
          <!-- <el-form-item label="登录密码"
                        :label-width="formLabelWidth"
                        prop="password">
            <el-input v-model="changeSA.password"
                      placeholder="请输入密码"></el-input>
          </el-form-item> -->
          <el-form-item label="手机号"
                        :label-width="formLabelWidth"
                        prop="mobile">
            <el-input v-model="changeSA.mobile"
                      placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="QQ"
                        :label-width="formLabelWidth"
                        prop="qq">
            <el-input v-model="changeSA.qq"
                      placeholder="请输入QQ"></el-input>
          </el-form-item>
          <el-form-item label="合作商"
                        :label-width="formLabelWidth"
                        prop="id">
            <el-select v-model="changeSA.id"
                       placeholder="请选择合作商"
                       @change='changeBp'>
              <el-option :label='i.name'
                         v-for="i in cooperative"
                         :key="i.id"
                         :value='i.id'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门"
                        :label-width="formLabelWidth">
            <el-cascader :options="departmentArr"
                         @change="departmentChoice1"
                         v-model="changeSA.GetDepartment"
                         :disabled="optionsChanged"
                         :props="departmentProps"
                         :placeholder="showPlaceholder"
                         change-on-select=true
                         :clearable=true></el-cascader>
          </el-form-item>
          <el-form-item label="管理"
                        :label-width="formLabelWidth"
                        prop="isManage">
            <el-select v-model="changeSA.isManage"
                       placeholder="请选择管理权限">
              <el-option :label='i.label'
                         v-for="i in Managementauthority"
                         :key="i.isManage"
                         :value='i.isManage'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账号库容上限"
                        :label-width="formLabelWidth"
                        prop="store">
            <el-input v-model="changeSA.store"
                      placeholder="请输入库容上限"></el-input>
          </el-form-item>
          <el-form-item label="账号每月打捞上限"
                        :label-width="formLabelWidth"
                        prop="salvage">
            <el-input v-model="changeSA.salvage"
                      placeholder="请输入账号每月打捞上限"></el-input>
          </el-form-item>
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
                   @current-change="pageChange"
                   :total="total"
                   :page-size="pgcount"
                   style="position: fixed;bottom: 0px;"
                   :current-page.sync="pgindex"></el-pagination>
  </div>
</template>

<script>
import { GetSalesMan, department, cooperAtive, getCooperativePage, changeBtn, Obtain, salvagesalesman, delsalesman, changesalesman, Addsalesman, salesman, findsalesman } from "../api/api"
export default {

  data () {
    //手机号验证规则
    var validatePass = (rule, value, callback) => {
      var reg = /^1[3456789]\d{9}$/;
      if (reg.test(value)) {
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
    // QQ验证
    var validateQq = (rule, value, callback) => {
      var reg = /^[1-9][0-9]{4,11}$/;
      if (value.length == 0) {
        callback(); //验证通过
      } else if (reg.test(value)) {
        callback(); //验证通过
      } else {
        callback(new Error("请输入正确的QQ号")); //验证失败
      }
    };
    // 姓名验证
    var validateName = (rule, value, callback) => {
      var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
      if (reg.test(value)) {
        callback(); //验证通过
      } else callback(new Error("请输入正确姓名")); //验证失败
    };
    return {
      loading: true,
      SalesmanList: '',
      changeSalesmanId: {
        id: '',
      },

      // 管理权限
      Managementauthority: [
        { label: '是', isManage: 1 },
        { label: '否', isManage: 2 }
      ],
      dialogFormVisible11: false,
      // 分页
      pgindex: 1,  //当前选中的页数
      total: 8,    // 最大条数
      pgcount: 12, //每页显示的条数 
      // 修改按钮id和时间
      changeId: '',
      changeupdateDate: '',
      // 删除按钮id
      delId: '',
      // 删除弹窗
      centerDialogVisible: false,
      //验证规则
      rules: {
        GetDepartment: [{ required: true, message: '部门不能为空', trigger: 'blur' },],
        id: [{ required: true, message: '新归属人员不能为空', trigger: 'blur' },],
        isManage: [{ required: true, message: '管理权限不能为空', trigger: 'blur' },],
        bp: [{ required: true, message: '合作商不能为空', trigger: 'blur' },],
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' },],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: validatePwd, trigger: "blur" }
        ],
        qq: [
          { validator: validateQq, trigger: "blur" }
        ],
        tel: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: validatePass, trigger: "blur" }
        ],
        isManage: [{ required: true, message: '管理权限不能为空', trigger: 'blur' },],
        store: [{ required: true, message: '库容上限不能为空', trigger: 'blur' },],
        salvage: [{ required: true, message: '每月打捞上限不能为空', trigger: 'blur' },]
      },
      // 新增业务员弹窗
      cooperative: [],
      dialogFormVisible: false,
      form: {
        name: '',
        password: '',
        tel: '',
        qq: '',
        bp: '',
        isManage: '',
        store: '',
        salvage: '',
        GetDepartment: '',
      },
      Getdepartment: '',
      formSalvage: {
        salvage: '',
        store: '',
      },
      changeSA: {
        name: '',
        mobile: '',
        password: '',
        qq: '',
        id: '',
        isManage: '',
        store: '',
        salvage: '',
        updateDate: '',
        GetDepartment: '',
      },
      // 修改按钮弹窗
      dialogFormVisible1: false,
      formLabelWidth: '140px',
      // 时间选择器
      creationTime: "",
      followUpTime: "",
      // 条件选择
      value: "",
      value1: "",
      value2: "",
      //   列表数据
      tableData: [
      ],
      StorageId: '',
      // 部门信息
      departmentArr: [],
      departmentProps: {
        value: 'code',
        label: 'name',
        children: 'child'
      },
      optionsChanged: false,
      showPlaceholder: '部门筛选'
    };
  },
  created () {
    this.getAjax(this.pgindex)
    // this.departmentList()
    this.attribution()
    cooperAtive().then(res => {
      this.cooperative = res.data.data
    })
  },
  methods: {
    handleSelectionChange (val) {
      for (var v of val) {
        this.StorageId = v.id
        // this.changef_SalesManId = val.f_SalesManId
      }
      this.multipleSelection = val;
    },
    getTreeData (data) {
      // 循环遍历json数据
      for (var i = 0; i < data.length; i++) {

        if (data[i].child == null || data[i].child.length < 1) {
          // children若为空数组，则将children设为undefined
          data[i].child = undefined;
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].child);
        }
      }
      this.departmentArr = data;
    },
    // 合作商选择函数
    async  changeBp (value) {
      this.changeSA.GetDepartment = ''
      this.Getdepartment = ''
      var F_BusinessPart = value
      await department(F_BusinessPart).then(res => {
        if (res.data.data.length == 0) {
          this.optionsChanged = true
          this.showPlaceholder = '该合作商下无部门'
          return
        } else {
          this.optionsChanged = false
          this.showPlaceholder = '部门筛选'
          this.getTreeData(res.data.data)
          // this.departmentArr = res.data.data
        }

      })
    },
    // 部门获取
    // departmentList () {
    //   department().then(res => {
    //     this.getTreeData(res.data.data)
    //     // this.departmentArr = res.data.data
    //   })
    // },
    departmentChoice (value) {
      if (value.length > 1) {
        this.Getdepartment = parseInt(value.slice(value.length - 1, value.length).join())
      } else {
        this.Getdepartment = parseInt(value.slice(0, 1).join())
      }
    },
    departmentChoice1 (value) {
      this.changeSA.GetDepartment = parseInt(value.slice(value.length - 1, value.length).join())
    },
    // 清空查询条件
    cleanQuery () {
      this.value = ''
      this.value1 = ''
      this.getAjax(this.pgindex)
    },
    // 关键字查询
    query () {
      var key = this.value
      var tel = this.value1
      this.pgindex = 1
      findsalesman(key, tel, this.pgindex, this.pgcount).then(res => {
        if (res.data.state == 2) {
          this.$alert(res.data.data, '错误', {
            confirmButtonText: '确定',
          })
        } else {
          this.tableData = res.data.data.rows
          this.total = res.data.data.total
        }

      });
    },
    pageChange (curpage) {
      //保存当前页数
      this.pgindex = curpage
      //请求当前页数的数据
      this.getAjax(this.pgindex)
    },
    // 页面渲染
    getAjax (curpage) {
      var key = this.value
      var tel = this.value1
      salesman(key, tel, curpage, this.pgcount).then(res => {
        this.tableData = res.data.data.rows
        this.total = res.data.data.total

        if (res.data.state == 4) {
          this.$router.push("/");
        } else if (res.data.state == 2) {
          this.$alert(res.data.data, '错误', {
            confirmButtonText: '确定',
          });
        }
        this.loading = false
      })
    },
    delBtn (row) {
      this.delId = row.id

    },
    // 删除确认
    DelhandleClick (row) {
      var changeSalesmanId = this.changeSalesmanId.id
      var id = this.delId
      this.$refs.changeSalesmanId.validate(valid => {
        //valid: 是否验证通过
        if (valid) {
          if (id == changeSalesmanId) {
            this.$alert('不能选择删除人员作为新归属人', '错误', {
              confirmButtonText: '确定',
            });
          } else {
            delsalesman(id, changeSalesmanId).then(res => {
              if (res.data.state == 1) {
                this.centerDialogVisible = false
                this.$notify({
                  title: '成功',
                  message: res.data.data,
                  type: 'success',
                  duration: 2000
                });
                this.changeSalesmanId.id = ''
                this.getAjax(this.pgindex)
              } else {
                this.$alert(res.data.data, '错误', {
                  confirmButtonText: '确定',
                });
                this.centerDialogVisible = false
              }
            })
          }
        }
      })
    },
    //    修改按钮
    handleClick (row) {
      var F_BusinessPart = row.bp
      department(F_BusinessPart).then(res => {
        if (res.data.data.length == 0) {
          this.optionsChanged = true
          this.showPlaceholder = '该合作商下无部门'
          return
        } else {
          this.optionsChanged = false
          this.showPlaceholder = '部门筛选'
          this.getTreeData(res.data.data)
          // this.departmentArr = res.data.data
        }
        // if (res.data.data.length > 0) {
        //   this.departmentArr = res.data.data
        // }
      })
      this.changeId = row.id
      changeBtn(this.changeId).then(res => {
        this.changeSA.name = res.data.data.name
        // this.changeSA.password = res.data.data.password
        this.changeSA.mobile = res.data.data.tel
        this.changeSA.qq = res.data.data.qq
        this.changeSA.id = res.data.data.bp
        this.changeSA.isManage = res.data.data.isManage
        this.changeSA.store = res.data.data.store
        this.changeSA.salvage = res.data.data.salvage
        this.changeSA.GetDepartment = res.data.data.f_Department
      })
      this.changeupdateDate = row.updateDate
    },
    // 修改按钮确认
    submitForm1 (row) {
      var updateDate = this.changeupdateDate
      var id = this.changeId
      var name = this.changeSA.name
      var password = this.changeSA.password
      var tel = this.changeSA.mobile
      var qq = this.changeSA.qq
      var bp = this.changeSA.id
      var isManage = this.changeSA.isManage
      var store = this.changeSA.store
      var salvage = this.changeSA.salvage
      var f_Department = this.changeSA.GetDepartment
      this.$refs.changeSA.validate(valid => {
        //valid: 是否验证通过
        if (valid) {
          //验证通过发送请求给服务器
          changesalesman(id, name, password, tel, qq, bp, isManage, store, salvage, updateDate, f_Department).then(res => {
            if (res.data.state == 1) {
              this.$notify({
                title: '成功',
                message: res.data.data,
                type: 'success',
                duration: 2000
              });
              this.getAjax(this.pgindex)
              this.dialogFormVisible1 = false
            } else {
              this.$alert(res.data.data, '错误', {
                confirmButtonText: '确定',
              });
            }
          })
        }
      })
    },
    // 获取归属人员
    attribution () {
      GetSalesMan().then(res => {
        this.SalesmanList = res.data.data
      })
    },
    // 新增按钮
    // addSales () {
    //   // getCooperativePage().then(res => {
    //   //   console.log(res);

    //   //   this.cooperative = res.data.data.rows
    //   // })
    // },
    // 新增业务员弹窗确认按钮
    async submitForm () {
      var name = this.form.name
      var tel = this.form.tel
      var qq = this.form.qq
      var bp = this.form.bp
      var isManage = this.form.isManage
      var store = this.form.store
      var salvage = this.form.salvage
      var f_Department = this.Getdepartment
      this.$refs.form.validate(valid => {
        //valid: 是否验证通过
        if (valid) {
          //验证通过发送请求给服务器
          Addsalesman(name, tel, qq, bp, isManage, store, salvage, f_Department).then(res => {

            if (res.data.state == 1) {
              this.$notify({
                title: '成功',
                message: res.data.data,
                type: 'success',
                duration: 2000
              });
              this.getAjax(this.pgindex)
              this.dialogFormVisible = false
              this.form.name = '',
                this.form.password = '',
                this.form.tel = '',
                this.form.qq = '',
                this.form.bp = '',
                this.form.isManage = '',
                this.form.store = '',
                this.form.salvage = ''
              this.Getdepartment = ''
              this.form.GetDepartment = ''
            } else {
              this.$alert(res.data.data, '错误', {
                confirmButtonText: '确定',
              });
            }
          })

        } else {
          this.$notify.error({
            title: '错误',
            message: '请填写正确完整资料',
            duration: 2000
          });
        }
      });
    },
    cancelBtn () {
      this.form.name = '',
        this.form.password = '',
        this.form.tel = '',
        this.form.qq = '',
        this.form.bp = '',
        this.form.isManage = '',
        this.form.store = '',
        this.form.salvage = ''
    }
  }
};
</script>

<style lang="less">
.el-message-box__message p {
  color: red;
}
.el-notification {
  position: fixed;
  top: 40% !important;
  left: 43% !important;
}
.el-row {
  margin-bottom: 10px;
}
.el-select {
  margin-right: 10px;
}
.el-date-editor {
  margin-right: 10px;
  width: 217px;
}
.salestableBox {
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
</style>