Component({
  properties: {
    latitude: {
      type: Number,
      value: 31.2304,
    },
    longitude: {
      type: Number,
      value: 121.4737,
    },
    scale: {
      type: Number,
      value: 15,
    },
  },
  lifetimes: {
    attached() {
      console.log("【地图组件】attached 生命周期触发，属性数据:", this.data);
    },
    ready() {
      console.log("【地图组件】ready 生命周期触发");
      this.triggerEvent('mapready'); // 通知父组件地图加载完成
    },
  },
  methods: {
    onMapReady() {
      console.log("【地图组件】地图加载完成事件触发");
      const mapCtx = wx.createMapContext("map", this);
      if (mapCtx) {
        console.log("【地图组件】地图上下文创建成功:", mapCtx);
      } else {
        console.error("【地图组件】地图上下文创建失败");
      }
    },
  },
});