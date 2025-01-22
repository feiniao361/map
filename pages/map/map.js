// pages/map/map.js

// 引入移动管理模块，从 '../../libs/movement-manager.js' 文件中导入 `updateCharacterPosition` 函数
const { updateCharacterPosition } = require('../../libs/movement-manager.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    latitude: 31.2304,    // 当前地图中心的纬度
    longitude: 121.4737,  // 当前地图中心的经度
    scale: 19,             // 地图的缩放级别，数值越大，地图越详细（放大）
    fogRadius: 100,        // 战争迷雾的半径，控制可视范围
    offsetX: 0,            // 摇杆在X轴的偏移量，用于控制移动方向
    offsetY: 0             // 摇杆在Y轴的偏移量，用于控制移动方向
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   * 页面加载完成后调用，用于初始化操作
   */
  onReady() {
    console.log("页面已准备就绪");
    
    // 使用 setInterval 持续调用移动逻辑，实现角色的持续移动
    // 每16毫秒（约60帧/秒）调用一次，用于流畅的移动效果
    this.moveInterval = setInterval(() => {
      // 从页面数据中解构出当前的偏移量和地图中心位置
      const { offsetX, offsetY, latitude, longitude } = this.data;
      
      // 调用 `updateCharacterPosition` 函数，根据当前偏移量计算新的位置
      const { newLat, newLng } = updateCharacterPosition(latitude, longitude, offsetX, offsetY);

      // 如果新的位置与当前的位置不同，则更新页面数据
      if (newLat !== latitude || newLng !== longitude) {
        this.setData({ 
          latitude: newLat, 
          longitude: newLng 
        });

        // 获取 `war-fog` 组件的实例，通过组件的 ID 选择器
        const warFogComp = this.selectComponent('#warFog');
        
        // 如果成功获取到 `war-fog` 组件实例，则调用其 `updateFog` 方法以更新迷雾
        if (warFogComp) {
          warFogComp.updateFog();
        }
      }
    }, 16); // 16毫秒的间隔，约等于每秒60次调用
  },

  /**
   * 处理摇杆组件触发的方向变化事件
   * @param {Object} e - 事件对象，包含偏移量信息
   */
  onDirectionChange(e) {
    // 从事件详情中解构出 `offsetX` 和 `offsetY`
    const { offsetX, offsetY } = e.detail;
    
    // 更新页面数据中的偏移量，用于控制移动方向
    this.setData({ 
      offsetX, 
      offsetY 
    });
  },

  /**
   * 生命周期函数--监听页面卸载
   * 页面卸载时调用，用于清理资源，防止内存泄漏
   */
  onUnload() {
    // 如果移动定时器存在，则清除定时器
    if (this.moveInterval) {
      clearInterval(this.moveInterval);
    }
  }
});