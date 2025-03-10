Component({
  properties: {
  },

  data: {
    latitude: 31.150857,
    longitude: 121.336321,
    scale: 17,
    markers: [{
      id: 1,
      latitude: 31.150857,
      longitude: 121.336321,
      title: '测试标记',
      width: 32,    // 添加标记宽度
      height: 32,   // 添加标记高度
      callout: {    // 添加标记文本气泡
        content: '测试标记',
        padding: 10,
        borderRadius: 5,
        display: 'ALWAYS'
      }
    }],
    setting: {
      skew: 0,
      rotate: 0,
      showLocation: true,
      showScale: true,
      subkey: 'AFPBZ-5MJEZ-OYOXR-ZVVTU-OBGDQ-RIBTK',
      layerStyle: 1,  // 修改为数字 2 表示黑色样式
      enableZoom: true,
      enableScroll: true,
      enableRotate: false,
      showCompass: false,
      enable3D: true,
      enableOverlooking: false,
      enableSatellite: false,
      enableTraffic: false
    }
  },

  methods: {
    onTap(e) {
      console.log('地图点击事件：', e);
    },

    onMarkerTap(e) {
      console.log('标记点击事件：', e);
    },

    onUpdated(e) {
      console.log('地图更新事件：', e);
    }
  }
});