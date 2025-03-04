Page({
  data: {
    username: '123',
    password: '123',
  },

  onReady() {
    // 页面加载完毕后自动登录
    this.autoLogin();
  },

  autoLogin() {
    const API = require('../../config/api.js');
    wx.request({
      url: API.USER.LOGIN,
      method: 'POST',
      data: {
        username: this.data.username,
        password: this.data.password,
      },
      success: (res) => {
        console.log('登录成功:', res);
        const { access_token, refresh_token } = res.data.data;
        wx.setStorageSync('accessToken', access_token);
        wx.setStorageSync('refreshToken', refresh_token);
        wx.setStorageSync('username', this.data.username);
        
        // 登录成功后发送消息
        wx.request({
          url: API.MESSAGE.SEND,
          method: 'POST',
          header: {
            'authorization': `Bearer ${access_token}`
          },
          data: {
            key: "playTemp",
            force: 1,
            taskId: "20250209001",
            videoList: ["a.mp4"]
          },
          success: (msgRes) => {
            console.log('login消息发送成功:', msgRes);
            // 消息发送成功后跳转到首页
            wx.redirectTo({
              url: '/pages/index/index',
              complete: () => {
                wx.hideLoading();
              },
            });
          },
          fail: (error) => {
            console.error('login消息发送失败:', error);
            // 即使消息发送失败也跳转到首页
            wx.redirectTo({
              url: '/pages/index/index',
              complete: () => {
                wx.hideLoading();
              },
            });
          }
        });
      },
      fail: (err) => {
        console.error('登录失败:', err);
        this.handleError('登录失败，请重试');
        wx.hideLoading();
      }
    });
  },

  handleError(message) {
    wx.showToast({
      title: message,
      icon: 'none',
    });
  },
});