// app.js

App({
  onLaunch() {
    // 在应用启动时检查是否已经保存了用户信息
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo && userInfo.nickName && userInfo.avatarUrl) {
      this.globalData.userInfo = userInfo;
    }
  },
  globalData: {
    userInfo: {
      avatarUrl: '',
      nickName: '',
    }
  }
});