// pages/user-info/user-info.js

Page({
    data: {
      canIUseNicknameComp: wx.canIUse('button.open-type.chooseAvatar'), // 是否支持 chooseAvatar
      canIUseGetUserProfile: wx.canIUse('getUserProfile'),             // 是否支持 getUserProfile
      userInfo: {
        avatarUrl: '',
        nickName: '',
      },
      hasUserInfo: false, // 是否已经获取到用户信息
    },
  
    /**
     * 处理 chooseAvatar 获取头像
     */
    onChooseAvatar(e) {
      console.log('chooseAvatar 事件触发', e);
      this.setData({
        'userInfo.avatarUrl': e.detail.avatarUrl,
      });
    },
  
    /**
     * 处理输入框变化，获取用户输入的昵称
     */
    onInputChange(e) {
      this.setData({
        'userInfo.nickName': e.detail.value,
        hasUserInfo: !!e.detail.value && !!this.data.userInfo.avatarUrl, // 检查头像和昵称是否完整
      });
    },
  
    /**
     * 处理 getUserProfile 获取用户信息
     */
    getUserProfile() {
      wx.getUserProfile({
        desc: '用于完善用户信息', // 声明获取用户个人信息的用途
        success: (res) => {
          console.log('getUserProfile 成功', res.userInfo);
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          });
        },
        fail: (err) => {
          console.error('getUserProfile 失败', err);
          wx.showToast({
            title: '获取用户信息失败',
            icon: 'none',
          });
        },
      });
    },
  
    /**
     * 确认并跳转到下一页
     */
    onConfirm() {
      if (!this.data.hasUserInfo) return;
  
      // 保存用户信息到全局数据
      const app = getApp();
      app.globalData.userInfo = this.data.userInfo;
  
      // 保存到本地存储
      wx.setStorageSync('userInfo', this.data.userInfo);
  
      // 跳转到首页或其他页面
      wx.redirectTo({
        url: '/pages/index/index',
      });
    },
  });