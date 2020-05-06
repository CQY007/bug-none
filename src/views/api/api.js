// 所有请求封装的文件
import axios from 'axios'
import { getCookie } from './uit'
//服务器IP
const IP = "http://39.108.125.119:8090/api/"

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
// http request拦截器 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // const token = getCookie('session'); 
  let token = localStorage.getItem("token")
  if (token) {
    config.headers.tk = token;
    config.headers.Authorization = token;
    config.headers.accessToken = token;    //将token放到请求头发送给服务器
    //这里经常搭配token使用，将token值配置到tokenkey中，将tokenkey放在请求头中
    // config.headers['accessToken'] = Token;
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


//登录请求
export function login (tel, code) {
  return axios.post(IP + "Login/Login", {
    tel,    //账号
    code
  })
}

// 退出登录
export function LoginOut () {
  return axios.post(IP + "Login/LoginOut")
}

// 跟进会员
//新增跟进会员
export function Addvip (MemberType, name, tel, qq, bp, store, Wechat, Wangwang
  , ShopName, SiteId, EnterpriseShopType, F_CityArea, MinCredit, MaxCredit, MinPrice, MaxPrice
  , ShopType, Type, Source, MemberClass, F_SalesManId, Remark, State, compatibility) {
  return axios.post(IP + "FollowMember/Add",
    {
      MemberType, name, tel, qq, bp, store, Wechat, Wangwang
      , ShopName, SiteId, EnterpriseShopType, F_CityArea, MinCredit, MaxCredit, MinPrice, MaxPrice
      , ShopType, Type, Source, MemberClass, F_SalesManId, Remark, State, compatibility
    },
  )
}

// 部门获取
export function department (F_BusinessPart) {
  return axios.post(IP + "Public/GetDepartment",
    {
      F_BusinessPart
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}

// 设置打捞
export function SetSalvage (id) {
  return axios.post(IP + "FollowMember/SetSalvage",
    {
      id
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}

export function findvipId (id) {
  return axios.post(IP + "FollowMember/Get",
    {
      id
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}

// 查询指定跟进会员
export function Seevip (id) {
  return axios.post(IP + "FollowMember/List",
    {
      id
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}

//分页查询
export function getpage (pgindex, pgcount, Contact, Name, MinPrice, MaxPrice, CityAreaLev, F_BusinessPartId, F_SalesManId,
  State, MemberType, SiteId, Type, MinCredit, MaxCredit, Source, IsSea, MemberClass, FollowState, CreateDate_Start,
  CreateDate_End, FollowDate_Start, FollowDate_End, F_CityArea, remark, f_Department) {
  return axios.post(IP + "FollowMember/List",
    {
      pgindex,
      pgcount,
      Contact, Name, MinPrice, MaxPrice, CityAreaLev, F_BusinessPartId, F_SalesManId,
      State, MemberType, SiteId, Type, MinCredit, MaxCredit, Source, IsSea, MemberClass, FollowState, CreateDate_Start,
      CreateDate_End, FollowDate_Start, FollowDate_End, F_CityArea, remark, f_Department
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}
// 条件查询
export function Followupenquiries (pgindex, pgcount, Contact, Name, MinPrice, MaxPrice, CityAreaLev, F_BusinessPartId, F_SalesManId, State, MemberType, SiteId, Type, MinCredit, MaxCredit, Source, IsSea, MemberClass, FollowState, CreateDate_Start, CreateDate_End, FollowDate_Start, FollowDate_End, F_CityArea, remark, f_Department) {
  return axios.post(IP + "FollowMember/List",
    {
      pgindex,
      pgcount,
      Contact,//手机号
      Name,//姓名
      MinPrice,//最低价格
      MaxPrice,//最高价
      CityAreaLev,//省市
      F_BusinessPartId,//归属合作商
      F_SalesManId,//归属人员
      State,//状态
      MemberType,//客户分类
      SiteId,//所属平台
      Type,//店铺类目
      MinCredit,//最低信誉
      MaxCredit,//最高信誉
      Source,//客户来源
      IsSea,//是否公海
      MemberClass,//用户等级
      FollowState,//跟进状态
      CreateDate_Start,//开始创建日期
      CreateDate_End,//结束创建日期
      FollowDate_Start,//开始跟进日期
      FollowDate_End,//结束跟进日期
      F_CityArea,
      remark,
      f_Department,
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}

// 删除
export function del (id) {
  return axios.post(IP + "FollowMember/Delete",
    {
      id
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}

// 条件查询
export function Conditionalquery (key, pgindex, pgcount) {
  return axios.post(IP + "FollowMember/List",
    {
      key,
      pgindex,
      pgcount
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}

// 变更归属
export function changeMan (id, f_SalesManId) {
  return axios.post(IP + "FollowMember/ChangeSalemans",
    {
      id,
      f_SalesManId
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}
// 批量变更归属
export function BatchchangeMan (ids, f_ChangeSalesManId) {
  return axios.post(IP + "FollowMember/BatchChangeSalemans",
    {
      ids, f_ChangeSalesManId
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}

// 跟进会员
export function follow (f_FollowMemberId, info, cate) {
  return axios.post(IP + "Follow_FollowMember/Add",
    {
      f_FollowMemberId,
      info,
      cate
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}

// 跟进按钮列表
export function followList (followMemberId, pgindex, pgcount) {
  return axios.post(IP + "Follow_FollowMember/List",
    {
      followMemberId, pgindex, pgcount
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}

// 修改
export function changevip (id, MemberType, name, tel, qq, bp, store, Wechat, Wangwang
  , ShopName, SiteId, EnterpriseShopType, F_CityArea, MinCredit, MaxCredit, MinPrice, MaxPrice
  , ShopType, Type, Source, MemberClass, F_SalesManId, Remark, State, compatibility) {
  return axios.post(IP + "FollowMember/Modify",
    {
      id, MemberType, name, tel, qq, bp, store, Wechat, Wangwang
      , ShopName, SiteId, EnterpriseShopType, F_CityArea, MinCredit, MaxCredit, MinPrice, MaxPrice
      , ShopType, Type, Source, MemberClass, F_SalesManId, Remark, State, compatibility
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}
// 获取省份
export function province () {
  return axios.post(IP + "Public/GetProvinces",
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}

// 获取类目
export function getCategory (categoryType, category) {
  return axios.post(IP + "Public/GetCategory",
    {
      categoryType, category
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}
// 获取业务员
export function GetSalesMan () {
  return axios.post(IP + "Public/GetSalesMan",
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}

// 丢公海
export function lose (id) {
  return axios.post(IP + "FollowMember/ThrowPublicsea",
    {
      id
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}

// 导入
export function Import () {
  return axios.post(IP + "FollowMember/Import",
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}
// 导出
export function out (pgindex, pgcount, Contact, Name, MinPrice, MaxPrice, CityAreaLev, F_BusinessPartId, F_SalesManId,
  State, MemberType, SiteId, Type, MinCredit, MaxCredit, Source, IsSea, MemberClass, FollowState, CreateDate_Start,
  CreateDate_End, FollowDate_Start, FollowDate_End, F_CityArea, remark, f_Department) {
  return axios.post(IP + "FollowMember/Excel",
    {
      pgindex,
      pgcount, Contact, Name, MinPrice, MaxPrice, CityAreaLev, F_BusinessPartId, F_SalesManId,
      State, MemberType, SiteId, Type, MinCredit, MaxCredit, Source, IsSea, MemberClass, FollowState, CreateDate_Start,
      CreateDate_End, FollowDate_Start, FollowDate_End, F_CityArea, remark, f_Department
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}
// 选择导出
export function ExcelByIds (ids) {
  return axios.post(IP + "FollowMember/ExcelByIds",
    {
      ids
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}

// 合作商管理
// 分页信息拉取
export function getCooperativePage (key, pgindex, pgcount) {
  return axios.post(IP + "BusinessPart/List",
    {
      key,
      pgindex,
      pgcount
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}

// 新增合作商
export function Addcooperative (name, isManage, score, scoreMath, remark) {
  return axios.post(IP + "BusinessPart/Add",
    {
      name,
      isManage,
      remark,
      score,
      scoreMath
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}


//删除合作商
export function deletecooperative (id) {
  return axios.post(IP + "BusinessPart/Delete",
    {
      id
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}

//修改合作商资料
export function changecooperative (updateDate, id, name, isManage, score, scoreMath, remark) {
  return axios.post(IP + "BusinessPart/Modify",
    {
      updateDate, id, name, isManage, score, scoreMath, remark
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}

changecooperative
// 查询合作商
export function findcooperative (key) {
  return axios.post(IP + "BusinessPart/List",
    {
      key
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}

// 查询指定合作商
export function findById (id) {
  return axios.post(IP + "BusinessPart/Get",
    {
      id
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}


// 业务员管理
// 获取渲染数据
export function salesman (key, tel, pgindex, pgcount) {
  return axios.post(IP + "FollowMemberSalesMan/List",
    {
      key, tel, pgindex, pgcount
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}

// 查询业务员
export function findsalesman (key, tel, pgindex, pgcount) {
  return axios.post(IP + "FollowMemberSalesMan/List",
    {
      key, tel, pgindex, pgcount
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}

// 添加业务员
export function Addsalesman (name, tel, qq, bp, isManage, store, salvage, f_Department) {
  return axios.post(IP + "FollowMemberSalesMan/Add",
    {
      name,
      tel,
      qq,
      bp,
      isManage,
      store,
      salvage,
      f_Department
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}

// 修改业务员
export function changesalesman (id, name, password, tel, qq, bp, isManage, store, salvage, updateDate, f_Department) {
  return axios.post(IP + "FollowMemberSalesMan/Modify",
    {
      id, name, password, tel, qq, bp, isManage, store, salvage, updateDate, f_Department
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}
// 合作商数据
export function cooperAtive () {
  return axios.post(IP + "Public/GetBusinessPart",
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}

// 删除业务员
export function delsalesman (id, changeSalesmanId) {
  return axios.post(IP + "FollowMemberSalesMan/Delete",
    {
      id, changeSalesmanId
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}

// 库容打捞
export function salvagesalesman (salvage, store, id) {
  return axios.post(IP + "FollowMemberSalesMan/SetStore",
    {
      salvage, store, id
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}
// 获取库容打捞数据
export function Obtain (id) {
  return axios.post(IP + "FollowMemberSalesMan/GetStore", {
    id
  },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}

// 修改按钮获取数据
export function changeBtn (id) {
  return axios.post(IP + "FollowMemberSalesMan/Get",
    {
      id
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}


// 登录极验
export function Register () {
  return axios.post(IP + "Sms/GetImageCode",
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
}

// 第二次极验
export function smsCheckSend (tel, code) {
  return axios.post(IP + "Sms/CheckImgCode",
    {
      tel, code
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
}












