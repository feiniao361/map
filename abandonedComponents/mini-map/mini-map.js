const DEFAULT_SCALE = 15;
const DEFAULT_SCROLL = false;
const DEFAULT_ZOOM= false;
const DEFAULT_LOCATION= false;
const DEFAULT_THREED= true;
Component({
  properties: {
    latitude: {
      type: Number,
      value: 0, // 默认值
    },
    longitude: {
      type: Number,
      value: 0, // 默认值
    },
    scale: {
      type: Number,
      value: DEFAULT_SCALE, // 默认小地图缩放
    },
    rotation: {
      type: Number,
      value: 90, // 默认横屏顺时针旋转90度
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

  attached() {
    console.log("【小地图组件】初始化:", this.data);
  },
  ready() {
    console.log("【小地图组件】已准备:", this.data);
  }
});