Component({
  properties: {
    latitude: {
      type: Number,
      value: 39.990464, // 默认纬度
    },
    longitude: {
      type: Number,
      value: 116.481488, // 默认经度
    },
    scale: {
      type: Number,
      value: 16, // 默认缩放等级
    },
  },

  data: {
    markers: [], // 地图标注
  },

  methods: {
    onMarkerTap(e) {
      const markerId = e.markerId;
      const marker = this.data.markers.find((m) => m.id === markerId);
      if (marker) {
        wx.showToast({
          title: `点击了: ${marker.title}`,
          icon: 'none',
        });
      }
    },

    loadMarkers() {
      const { latitude, longitude } = this.data;
      wx.request({
        url: 'https://restapi.amap.com/v3/place/around',
        method: 'GET',
        data: {
          key: 'ef3f8894dd9b19a3402b1b3ce0408909',
          location: `${longitude},${latitude}`, // 经度,纬度
          radius: 1000,
          keywords: '美食', // 示例：查询美食
        },
        success: (res) => {
          if (res.data.pois) {
            const markers = res.data.pois.map((poi, index) => ({
              id: index,
              latitude: parseFloat(poi.location.split(',')[1]),
              longitude: parseFloat(poi.location.split(',')[0]),
              title: poi.name,
              iconPath: '/images/marker.png', // 请替换为实际的标注图标路径
              width: 30,
              height: 30,
            }));
            this.setData({ markers });
          }
        },
        fail: (err) => {
          console.error('加载标注失败:', err);
        },
      });
    },
  },

  lifetimes: {
    attached() {
      // 加载标注数据
      this.loadMarkers();
    },
  },
});