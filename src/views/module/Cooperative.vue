<template>
  <div style="font-size:12px !important">
    <el-row>
      <el-col :span="16">
        <el-input v-model="value"
                  placeholder="请输入合作商名称"
                  style="width:300px;"
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
    <el-row style="text-align: right;margin-top:10px">
      <el-button type="primary"
                 @click="dialogFormVisible = true"
                 size='mini'
                 class='addBtn'
                 v-show="bpIsManage == 1">新增</el-button>

      <el-dialog title="新增合作商"
                 :visible.sync="dialogFormVisible"
                 :close-on-click-modal=false
                 :destroy-on-close=true
                 :show-close=false
                 :center=true>
        <el-form :model="form"
                 :rules="rules"
                 ref="form">
          <el-form-item label="名称"
                        :label-width="formLabelWidth"
                        prop="name">
            <el-input v-model="form.name"
                      placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="管理方"
                        :label-width="formLabelWidth"
                        prop="isManage">
            <el-select v-model="form.isManage"
                       placeholder="请选择管理方">
              <el-option label="管理方平台"
                         value="1"></el-option>
              <el-option label="普通合作商"
                         value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="积分额度"
                        :label-width="formLabelWidth"
                        prop="score">
            <el-input v-model="form.score"
                      placeholder="内容必须是数值,<0：表示无限制；>=0：表示当前合作商可用积分额度"></el-input>
          </el-form-item>
          <el-form-item label="兑换比例"
                        :label-width="formLabelWidth"
                        prop="scoreMath">
            <el-input v-model="form.scoreMath"
                      placeholder="必须是小数,0表示不进行兑换；>0：表示每提交1个有效会员，兑换{该值}个积分"></el-input>
          </el-form-item>
          <el-form-item label="描述"
                        :label-width="formLabelWidth">
            <el-input type="textarea"
                      :rows="2"
                      placeholder="请输入内容"
                      v-model="form.remark">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogFormVisible = false;cancelBtn()">取 消</el-button>
          <el-button type="primary"
                     @click="addsure">确 定</el-button>
        </div>
      </el-dialog>
    </el-row>
    <el-row>
      <el-table :data="tableData"
                border
                style="width: 100%;font-size:12px"
                align='center'
                v-loading="loading"
                element-loading-text="拼命加载中"
                :cell-style="{height:'50px'}"
                class='tableBox'>
        <el-table-column type="selection"
                         width="55"
                         align='center'>
        </el-table-column>
        <el-table-column prop="name"
                         label="名称"
                         width="220"
                         align='center'></el-table-column>
        <el-table-column prop="isManage"
                         label="管理方"
                         width="200"
                         align='center'>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.isManage == 1 ? '管理方平台':'合作方平台'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="score"
                         label="积分额度"
                         width="100"
                         align='center'></el-table-column>
        <el-table-column prop="scoreMath"
                         label="兑换比例"
                         width="100"
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
                         width="220"
                         align='center'>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.salvage_Use+'/'+(scope.row.salvage >= 0 ?scope.row.salvage:'不限')  }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark"
                         label="描述"
                         width="400"
                         align='center'></el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="200"
                         align='center'>
          <template slot-scope="scope">
            <el-button type="text"
                       size='mini'
                       @click="dialogFormVisible11=true;StorageBtn(scope.row)">库容打捞</el-button>
            <el-button @click="dialogFormVisible1 = true;changeBtn(scope.row)"
                       type="text"
                       size="small"
                       v-show="bpIsManage == 1 && IsManage == 1">修改</el-button>
            <el-button @click="centerDialogVisible = true;delBtn(scope.row)"
                       type="text"
                       size="small"
                       v-show="bpIsManage == 1 && IsManage ==1">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="提示"
                 :visible.sync="centerDialogVisible"
                 width="30%"
                 center
                 :append-to-body="true">
        <span>该操作会删除该条数据,请谨慎操作</span>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="handleClick()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="修改"
                 :visible.sync="dialogFormVisible1"
                 :close-on-click-modal=false
                 :center=true
                 :append-to-body="true">
        <el-form :model="findForm">
          <el-form-item label="名称"
                        :label-width="formLabelWidth">
            <el-input v-model="findForm.name"
                      placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="管理方"
                        :label-width="formLabelWidth">
            <el-select v-model="findForm.isManage"
                       placeholder="请选择管理方">
              <el-option :label="i.label"
                         v-for="i in isManage"
                         :key="i.value"
                         :value="i.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="积分额度"
                        :label-width="formLabelWidth">
            <el-input v-model="findForm.score"
                      placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="兑换比例"
                        :label-width="formLabelWidth">
            <el-input v-model="findForm.scoreMath"
                      placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="描述"
                        :label-width="formLabelWidth">
            <el-input placeholder="请输入内容"
                      v-model="findForm.remark"
                      style="max-height: 40px;overflow: hidden; ">
            </el-input>
          </el-form-item>

        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary"
                     @click="handleClick1();">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="库容打捞设置"
                 :visible.sync="dialogFormVisible11"
                 :close-on-click-modal=false
                 :center=true
                 :append-to-body="true">
        <el-form :model="formSalvage"
                 :rules="rules"
                 ref="form">
          <el-form-item label="库容上限"
                        :label-width="formLabelWidth"
                        prop="store">
            <el-input v-model="formSalvage.store"
                      placeholder="请输入库容上限"></el-input>
          </el-form-item>
          <el-form-item label="每月打捞上限"
                        :label-width="formLabelWidth"
                        prop="salvage">
            <el-input v-model="formSalvage.salvage"
                      placeholder="请输入账号每月打捞上限"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogFormVisible11 = false">取 消</el-button>
          <el-button type="primary"
                     @click="Storage ()">确 定</el-button>
        </div>
      </el-dialog>
    </el-row>
    <el-pagination background
                   layout="total,prev, pager, next,jumper"
                   @current-change="pageChange"
                   :total="total"
                   :page-size="pgcount"
                   style="position: fixed;bottom: 10px;"
                   :current-page.sync="pgindex"></el-pagination>
  </div>
</template>

<script>
import { salvagesalesman, Obtain, getCooperativePage, Addcooperative, deletecooperative, changecooperative, findcooperative, findById } from "../api/api"
export default {

  data () {
    return {
      loading: true,
      IsManage: '',
      bpIsManage: '',
      dialogFormVisible11: false,
      //验证规则
      rules: {
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' },],
        isManage: [{ required: true, message: '管理方不能为空', trigger: 'blur' },],
        score: [{ required: true, message: '积分额度不能为空', trigger: 'blur' },],
        scoreMath: [{ required: true, message: '兑换比例不能为空', trigger: 'blur' },],

      },
      isManage: [
        { label: "管理方平台", value: 1 },
        { label: "合作商平台", value: 2 }
      ],
      // 修改时选中的ID
      id: '',
      // 删除时选中德id
      delId: '',
      // 分页
      pgindex: 1,  //当前选中的页数
      total: 8,    // 最大条数
      pgcount: 12, //每页显示的条数 
      // 删除弹窗
      centerDialogVisible: false,
      // 修改按钮弹窗
      dialogFormVisible1: false,
      // 新增按钮弹窗
      dialogFormVisible: false,
      form: {
        name: '',
        isManage: '',
        score: '',
        scoreMath: '',
        remark: '',
      },
      findForm: {
        name: '',
        isManage: '',
        score: '',
        scoreMath: '',
        remark: '',
      },
      formLabelWidth: '150px',
      // 时间选择器
      creationTime: "",
      followUpTime: "",
      // 条件选择
      value: "",
      value1: "",
      value2: "",
      options: [

      ],
      //   列表数据
      tableData: [
      ],
      updateDate: '',
      // 库容打捞
      formSalvage: {
        salvage: '',
        store: '',
      },
      StorageId: '',
    };
  },
  created () {
    this.getAjax(this.pgindex)
    this.bpIsManage = localStorage.getItem('bpIsManage')
    this.IsManage = localStorage.getItem('isManage')
  },
  methods: {
    // 库容打捞设置
    StorageBtn (row) {
      this.StorageId = row.id
      Obtain(row.id).then(res => {
        this.formSalvage.salvage = res.data.data.salvage
        this.formSalvage.store = res.data.data.store
      })
    },
    Storage () {
      var id = this.StorageId
      var salvage = this.formSalvage.salvage
      var store = this.formSalvage.store
      salvagesalesman(salvage, store, id).then(res => {
        if (res.data.state == 1) {
          this.$notify({
            title: '成功',
            message: res.data.data,
            type: 'success',
            duration: 2000
          });
          this.getAjax(this.pgindex)
          this.dialogFormVisible11 = false
        } else {
          this.$alert(res.data.data, '错误', {
            confirmButtonText: '确定',
          });
        }

      })
    },
    // 清空查询条件
    cleanQuery () {
      this.value = ''
      this.getAjax(this.pgindex)
    },
    // 条件查询按钮
    query () {
      var key = this.value
      this.pgindex = 1
      findcooperative(key).then(res => {
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
    // 新增按钮确认
    addsure () {
      var name = this.form.name
      var isManage = parseInt(this.form.isManage)
      var score = parseFloat(this.form.score).toFixed(2)
      var scoreMath = parseFloat(this.form.scoreMath).toFixed(2)
      var remark = this.form.remark
      this.$refs.form.validate(valid => {

        if (valid) {
          Addcooperative(name, isManage, score, scoreMath, remark).then(res => {
            if (res.data.state == 1) {
              this.$notify({
                title: '成功',
                message: '新增成功',
                type: 'success',
                duration: 2000
              });
              for (let key in this.form) {
                this.form[key] = ''
              }
              this.dialogFormVisible = false
              this.getAjax(this.pgindex)
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
        }      })

    },
    cancelBtn () {
      for (let key in this.form) {
        this.form[key] = ''
      }
      this.getAjax(this.pgindex)
    },
    //    删除按钮
    delBtn (row) {
      this.delId = row.id
    },
    handleClick () {
      deletecooperative(this.delId).then(res => {
        if (res.data.state == 1) {
          this.$notify({
            title: '成功',
            message: res.data.data,
            type: 'success',
            duration: 2000
          });
          this.getAjax(this.pgindex)
          this.centerDialogVisible = false
        } else {
          this.$alert(res.data.data, '错误', {
            confirmButtonText: '确定',
          });
        }

      })
    },
    // // 修改按钮
    changeBtn (row) {
      this.id = row.id
      this.updateDate = row.updateDate
      findById(row.id).then(res => {
        this.findForm.name = res.data.data.name
        this.findForm.isManage = res.data.data.isManage
        this.findForm.score = parseFloat(res.data.data.score).toFixed(2)
        this.findForm.scoreMath = parseFloat(res.data.data.scoreMath).toFixed(2)
        this.findForm.remark = res.data.data.remark
      })
    },
    // 修改确认按钮
    handleClick1 () {
      var name = this.findForm.name
      var isManage = parseInt(this.findForm.isManage)
      var score = this.findForm.score
      var scoreMath = this.findForm.scoreMath
      var remark = this.findForm.remark
      changecooperative(this.updateDate, this.id, name, isManage, score, scoreMath, remark).then(res => {
        if (res.data.state == 1) {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          });
          this.getAjax()
        } else {
          this.$alert(res.data.data, '错误', {
            confirmButtonText: '确定',
          });
          this.getAjax(this.pgindex)
        }
      })
      this.dialogFormVisible1 = false
      this.getAjax(this.pgindex)
    },
    // 分页
    pageChange (curpage) {
      //保存当前页数
      this.pgindex = curpage
      //请求当前页数的数据
      this.getAjax(this.pgindex)
    },
    // 页面数据拿取渲染
    getAjax (curpage) {
      var key = this.value
      getCooperativePage(key, curpage, this.pgcount).then(res => {
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
.el-table__header tr,
.el-table__header th {
  padding: 0;
  height: 40px;
}
.el-table__body tr,
.el-table__body td {
  padding: 0;
  height: 40px;
}
.tableBox {
  tr {
    td {
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