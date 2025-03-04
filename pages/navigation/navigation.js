const API = require('../../config/api.js');

Page({
  data: {
    latitude: 31.150857,  // 默认上海市位置
    longitude: 121.336321,
    markers: [],
    destination: null,
    polyline: []
  },

  getCurrentLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        const { latitude, longitude } = res;
        this.setData({ latitude, longitude });
        if (this.data.destination) {
          this.calculateRoute();
        }
      },
      fail: () => {
        wx.showToast({
          title: '使用默认位置',
          icon: 'none'
        });
        // 使用默认位置（上海市）并计算路线
        if (this.data.destination) {
          this.calculateRoute();
        }
      }
    });
  },

  setDestination(location) {
    this.setData({
      destination: location,
      markers: [{
        id: 1,
        latitude: location.latitude,
        longitude: location.longitude,
        width: 32,
        height: 32,
        iconPath: '/images/marker.png',
        callout: {
          content: '目的地',
          color: '#ffffff',
          fontSize: 14,
          borderRadius: 4,
          bgColor: '#1989fa',
          padding: 8,
          display: 'ALWAYS'
        }
      }]
    });
  },

  calculateRoute() {
    const { latitude, longitude, destination } = this.data;
    
    // 简单的直线连接
    this.setData({
      polyline: [{
        points: [
          { latitude, longitude },
          { latitude: destination.latitude, longitude: destination.longitude }
        ],
        color: '#1989fa',
        width: 4,
        arrowLine: true
      }]
    });
  },

  openMapApp() {
    const { destination } = this.data;
    const defaultLocation = {
      latitude: 31.150857,
      longitude: 121.336321
    };
    
    const lat = destination ? destination.latitude : defaultLocation.latitude;
    const lng = destination ? destination.longitude : defaultLocation.longitude;

    // 检查用户手机平台
    wx.getSystemInfo({
      success: (res) => {
        if (res.platform === 'ios') {
          // iOS 使用苹果地图
          wx.openLocation({
            latitude: lat,
            longitude: lng,
            name: '任务目的地',
            address: '任务地点',
            scale: 18
          });
        } else {
          // Android 使用腾讯地图
          const url = `qqmap://map/routeplan?type=drive&from=我的位置&fromcoord=CurrentLocation&to=任务目的地&tocoord=${lat},${lng}&referer=myapp`;
          
          wx.showModal({
            title: '导航提示',
            content: '是否打开地图导航？',
            success: (res) => {
              if (res.confirm) {
                wx.navigateToMiniProgram({
                  appId: 'wx50b5593e81dd937a', // 腾讯地图小程序的 appId
                  path: `pages/routePlan/index?key=QXZBZ-KPGC6-DQYS2-EWZK4-5KGFJ-MTBQO&referer=myapp&navigation=1&to=${lat},${lng}`,
                  fail: () => {
                    wx.openLocation({
                      latitude: lat,
                      longitude: lng,
                      name: '任务目的地',
                      address: '任务地点',
                      scale: 18
                    });
                  }
                });
              }
            }
          });
        }
      }
    });
  },
  onBackTap() {
    wx.navigateBack();
  }
});