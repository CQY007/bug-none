<template>
  <div class="container">
    <div class="top">
      <div>
        <img src="./assets/image/logo.png"
             style="width:110px;height:50px;" />
      </div>
      <div class="head-div">
        <div></div>
        <div></div>
        <div style="margin-right:100px;color:#a1f7ab;"></div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link"
                style="font-size:12px;color:#a1f7ab;">
            {{userName}}[ {{isManage == 1 ? '管理员':'业务员'}} ]-{{  bP_Name  }}{{ bpIsManage == 1 ?'[' + ' 管理方 ' + ']':''}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="center">
      <div class="left-div">
        <!-- //默认激活的选项卡  默认激活的id-->
        <el-menu :default-active="active"
                 class="mymenu"
                 @open="handleOpen"
                 @close="handleClose"
                 background-color="#242F41"
                 text-color="#fff"
                 active-text-color="#fff"
                 unique-opened
                 router>
          <el-menu-item index="/index/FollowUpMember">
            <i class="el-icon-s-cooperation"></i>
            <span slot="title">跟进会员</span>
          </el-menu-item>
          <el-menu-item v-for="item in treelist"
                        v-show="navShow(1,item)"
                        :key='item.index'
                        :index="item.index">
            <i :class="item.cls"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right-div">
        <!-- <div class="right-top">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/index/FollowUpMember' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div> -->
        <div class="right-buttom">
          <!-- <el-tabs v-model="editableTabsValue"
                   type="card"
                   editable
                   @edit="handleTabsEdit">
            <el-tab-pane :key="item.name"
                         v-for="(item) in editableTabs"
                         :label="item.title"
                         :name="item.name">{{item.content}}</el-tab-pane>
          </el-tabs> -->
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginOut } from "./api/api";
export default {
  data () {
    return {
      f_Department: '',
      // 账号属性
      bP_Name: '',
      isManage: '',
      bpIsManage: '',
      // 用户名
      userName: '',
      active: "/index",
      // 权限
      jurisdiction: '',

      // 标签页

      editableTabsValue: "1",
      editableTabs: [
        {
          title: "会员",
          name: "1",
          // content: "Tab 1 content"
        },
        {
          title: "业务员",
          name: "2",
          // content: "Tab 2 content"
        },
        {
          title: "合作商",
          name: "3",
          // content: "Tab 3 content"
        }
      ],
      tabIndex: 2,

      // 动态菜单创建
      treelist: [
        // {
        //   index: "1",
        //   cls: "el-icon-s-cooperation",
        //   title: "跟进会员",
        //   index: "/index/FollowUpMember",
        //   name: "跟进会员",
        //   jurisdiction: ['Manage', 'Member',]
        // },
        {
          index: "2",
          cls: "el-icon-menu",
          title: "合作商管理",
          index: "/index/Cooperative",
          name: "合作商管理",
          jurisdiction: ['Manage']
        },
        {
          index: "3",
          cls: "el-icon-document",
          title: "业务员管理",
          index: "/index/Salesman",
          name: "业务员管理",
          jurisdiction: ['Manage']
        }
      ]
    };
  },
  created () {
    //根据hash值  改变active属性
    //根据hash值,设置当前激活标签
    this.active = location.hash.replace("#", "");
    this.userName = localStorage.getItem("acc")
    this.jurisdiction = localStorage.getItem('menuModel')
    this.bP_Name = localStorage.getItem('bP_Name')
    this.isManage = localStorage.getItem('isManage')
    this.bpIsManage = localStorage.getItem('bpIsManage')
    this.f_Department = localStorage.getItem('f_Department')
  },
  methods: {
    // 导航栏显示隐藏
    navShow (type, item) {
      switch (type) {
        case 1: return (item.jurisdiction.indexOf(this.jurisdiction) != -1 && (this.f_Department == 'null' || this.f_Department <= 0))
      }
    },
    // 退出登录
    handleCommand (command) {
      if (command == 'a') {
        LoginOut().then(res => {
        })
        this.$router.push("/");
      }

    },
    // 标签页
    handleTabsEdit (targetName, action) {
      if (action === "add") {
        let newTabName = ++this.tabIndex + "";
        this.editableTabs.push({
          title: "New Tab",
          name: newTabName,
          content: "New Tab content"
        });
        this.editableTabsValue = newTabName;
      }
      if (action === "remove") {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    },
    handleOpen (key, keyPath) {
      //选项卡展开时触发的函数
      //   console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      //选项卡关闭时触发的函数
      //   console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less" scoped>
.el-menu-item.is-active {
  background-color: #5aa25f !important;
}
.container {
  height: 100%;
  width: 100%;

  .top {
    height: 5%;
    background-color: #242f41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    padding: 0 40px;
    h3 {
      margin: 0;
    }
    img {
      width: 45px;
    }

    .head-div {
      display: flex;
      align-items: center;

      label {
        margin-left: 10px;
      }
      .el-dropdown-link {
        font-size: 20px;
        color: #fff;
      }
    }
  }

  .center {
    height: 95%;
    width: 100%;
    display: flex;

    .left-div {
      width: 8%;
      min-width: 160px;
      height: 100%;
      background-color: #242f41;

      .mymenu {
        height: 100%;
      }
    }

    .right-div {
      width: 91%;
      background-color: #f3f3f3;
      padding: 1%;
      .right-top {
        height: 5%;
        width: 100%;
      }
      .right-buttom {
        height: 95%;
        width: 100%;
      }
    }
  }
}
</style>