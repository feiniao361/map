const API = require('../../config/api.js');
Page({
  data: {
    totalPoints: 0,
    pointList: [],
    loading: true
  },

  onLoad: function() {
    this.loadPointsData();
  },

  loadPointsData: function() {
    const that = this;
    const accessToken = wx.getStorageSync('accessToken');
    
    
    wx.showLoading({ title: '加载中...' });

    wx.request({
      url: API.POINT.POINT,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      data: {
        username: '123' // 根据实际用户信息修改
      },
      success: function(res) {
        if (res.statusCode === 200 && res.data.code === 200) {
          that.setData({
            totalPoints: res.data.sumPoint.totalPoints,
            pointList: res.data.pointList.map(item => ({
              ...item,
              createdTime: item.createdTime.replace('T', ' ').substring(0, 16)
            })),
            loading: false
          });
        }
      },
      fail: function() {
        wx.showToast({ title: '请求失败', icon: 'none' });
      },
      complete: function() {
        wx.hideLoading();
      }
    });
  }
});
