// 定义默认属性常量
const DEFAULT_LATITUDE = 31.2304; // 默认纬度
const DEFAULT_LONGITUDE = 121.4737; // 默认经度
const DEFAULT_SCALE = 19; // 默认缩放级别
const DEFAULT_ROTATE = 45; // 旋转角度
const DEFAULT_SKEW = 60; // 水平透视角度
const DEFAULT_TILT = 0; // 倾斜角度, 最大60
const DEFAULT_SCROLL = false; // 默认允许拖动
const DEFAULT_ZOOM = false; // 默认允许缩放
const DEFAULT_LOCATION = false; // 当前位置
const DEFAULT_THREED = true; // 3D

// 环境变量控制日志输出
const isDev = true; // 开发环境设置为 true，生产环境设置为 false

// 日志管理函数
function log(message, ...args) {
  if (isDev) console.log(message, ...args);
}
function error(message, ...args) {
  if (isDev) console.error(message, ...args);
}

Component({
  // 组件的属性定义
  properties: {
    latitude: {
      type: Number,
      value: DEFAULT_LATITUDE, // 默认纬度
    },
    longitude: {
      type: Number,
      value: DEFAULT_LONGITUDE, // 默认经度
    },
    scale: {
      type: Number,
      value: DEFAULT_SCALE, // 默认缩放级别
    },
    rotate: {
      type: Number,
      value: DEFAULT_ROTATE, // 默认旋转角度
    },
    skew: {
      type: Number,
      value: DEFAULT_SKEW, // 默认旋转角度
    },
    tilt: {
      type: Number,
      value: DEFAULT_TILT, // 默认倾斜角度, 最大60
    },
    scroll: {
      type: Boolean,
      value: DEFAULT_SCROLL, // 默认允许拖动
    },
    zoom: {
      type: Boolean,
      value: DEFAULT_ZOOM, // 默认允许缩放
    },
    location: {
      type: Boolean,
      value: DEFAULT_LOCATION, // 当前位置
    },
    threed: {
      type: Boolean,
      value: DEFAULT_THREED, // 3D
    },
  },

  // 组件的内部数据
  data: {
    mapLoaded: false,  // 地图加载状态
  },

  // 组件生命周期
  lifetimes: {
    /**
     * attached: 当组件被挂载时触发
     */
    attached() {
      log("【主地图组件】attached 生命周期触发，属性数据:", this.data);
    },

    /**
     * ready: 当组件初始化完成后触发
     */
    ready() {
      log("【主地图组件】ready 生命周期触发");
      try {
        // 创建地图上下文
        this.mapCtx = wx.createMapContext("mainMap", this);
        if (this.mapCtx) {
          log("【主地图组件】地图上下文创建成功:", this.mapCtx);
        } else {
          error("【主地图组件】地图上下文创建失败");
        }
        if (!this.data.mapLoaded) {
          // 通知父组件地图已加载完成
          this.triggerEvent("mapready", { ready: true });
          this.setData({ mapLoaded: true });
          console.trace("【主地图组件】通知父组件触发点");
        }
      } catch (err) {
        error("【主地图组件】地图上下文初始化出错", err);
      }
    },
  },

  // 组件的方法
  methods: {
    /**
     * 设置地图中心点
     * @param {Number} latitude 新的纬度
     * @param {Number} longitude 新的经度
     */
    setCenter(latitude, longitude) {
      if (this.mapCtx) {
        log("【主地图组件】尝试更新地图中心点:", latitude, longitude);
        this.mapCtx.moveToLocation({
          latitude,
          longitude,
          success: () => log("【主地图组件】成功更新地图中心点:", latitude, longitude),
          fail: (err) => error("【主地图组件】更新地图中心点失败", err),
        });
      } else {
        error("【主地图组件】地图上下文未初始化");
      }
    },

    /**
     * 地图移动事件
     * @param {Number} offsetX 水平偏移量
     * @param {Number} offsetY 垂直偏移量
     */
    onMove(offsetX, offsetY) {
      if (!this.data.mapLoaded) {
        log("地图尚未加载完成，移动操作被忽略");
        return;
      }

      this.updateCharacterDirection(offsetX, offsetY);

      // 更新地图中心点
      const moveDistance = 0.0001; // 每次移动的距离
      const newLatitude = this.data.latitude + offsetY * moveDistance;
      const newLongitude = this.data.longitude + offsetX * moveDistance;

      this.setData({
        latitude: newLatitude,
        longitude: newLongitude,
      });
    },
  },
});