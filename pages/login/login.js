Page({
  data: {
    username: '', // 用户名
    password: '', // 密码
  },

  // 处理用户名输入
  onUsernameInput(e) {
    this.setData({
      username: e.detail.value
    });
  },

  // 处理密码输入
  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
    });
  },

  // 处理错误
  handleError(message) {
    wx.showToast({
      title: message,
      icon: 'none',
    });
  },

  // 确认按钮
  onConfirm() {
    if (!this.data.username || !this.data.password) {
      this.handleError('请输入用户名和密码');
      return;
    }

    // 显示加载动画
    wx.showLoading({
      title: '正在登录...',
    });

    // 发送请求到登录接口
    wx.request({
      url: 'http://47.116.205.160:9090/user/login',
      method: 'POST',
      data: {
        username: this.data.username,
        password: this.data.password,
      },
      success: (res) => {
        console.log('登录成功:', res);
        const { access_token, refresh_token } = res.data.data;
        wx.setStorageSync('accessToken', access_token); // 保存 access_token
        wx.setStorageSync('refreshToken', refresh_token); // 保存 refresh_token
        wx.redirectTo({
          url: '/pages/index/index',
          complete: () => {
            wx.hideLoading(); // 隐藏加载动画
          },
        });
      },
      fail: (err) => {
        console.error('登录失败:', err);
        this.handleError('登录失败，请重试');
        wx.hideLoading();
      }
    });
  },
});