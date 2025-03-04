const BASE_URL = 'https://maptest.sooyu.cn';

const API = {
  // 用户相关
  USER: {
    LOGIN: `${BASE_URL}/sso/user/login`,              // 用户登录
    REGISTER: `${BASE_URL}/sso/user/register`,        // 用户注册
  },

  // 任务相关
  TASK: {
    MISSPMLIST: `${BASE_URL}/meta/point/missPmList`, // 未接任务列表
    ACCEPTEDPMLIST: `${BASE_URL}/meta/point/acceptedPmList`, // 已接任务列表
    LIST: `${BASE_URL}/meta/point/pmInfoList`,         // 获取任务列表/详情
    ACCEPT: `${BASE_URL}/meta/point/getPermission`,    // 接受任务
    COMPLETE: `${BASE_URL}/meta/point/submitPm`,   // 完成任务
    ABANDON: `${BASE_URL}/meta/point/giveUpPermission` // 放弃任务
  },

  // 积分相关
  POINT: {
    HISTORY: `${BASE_URL}/meta/point/pointHistory`,    // 积分历史
    POINT: `${BASE_URL}/meta/point/myPointInfo`     // 积分余额
  },

  //sendmessage
  MESSAGE: {
    SEND: `${BASE_URL}/wsapi/send-message`
  }
};

module.exports = API;