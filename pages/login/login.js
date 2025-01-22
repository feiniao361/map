Page({
  data: {
    userInfo: {
      avatarUrl: '', // 用户头像
      nickName: '',  // 用户昵称
    },
    defaultAvatar: '/images/default-avatar.svg', // 默认头像
  },

  // 获取微信头像和昵称
  getUserProfile() {
    wx.getUserProfile({
      desc: '用于展示个人资料', // 授权说明
      success: (res) => {
        console.log('获取成功:', res.userInfo);
        this.setData({
          userInfo: res.userInfo,
        });
      },
      fail: (err) => {
        console.error('获取失败:', err);
        wx.showToast({
          title: '授权失败，请重试',
          icon: 'none',
        });
      },
    });
  },

  // 确认按钮
  onConfirm() {
    if (!this.data.userInfo.nickName || !this.data.userInfo.avatarUrl) {
      wx.showToast({
        title: '请先获取用户信息',
        icon: 'none',
      });
      return;
    }

    // 保存用户信息到全局数据或本地存储
    wx.setStorageSync('userInfo', this.data.userInfo);

    // 跳转到首页
    wx.redirectTo({
      url: '/pages/index/index',
    });
  },
});