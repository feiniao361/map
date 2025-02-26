const movementManager = require('../../libs/movement-manager');

Page({
  data: {
    latitude: 31.2304, // 主地图纬度
    longitude: 121.4737, // 主地图经度
    //scale: 18, // 主地图缩放级别
    mapReady: false, // 地图加载状态
    miniMapLatitude: 31.2304, // 小地图纬度
    miniMapLongitude: 121.4737, // 小地图经度
    miniScale: 15, // 小地图缩放级别
    pendingJoystickEvents: [], // 待处理的摇杆事件队列
    rotate: 0, // 地图旋转角度
    tilt: 30, // 地图倾斜角度
    skew: 30, // 地图偏移角度（0-30，需开启 enable-3D 才能生效）
    maxTaskDistance: 3, // 5公里范围
    taskBarVisible: false, // 控制任务列表的显示
    isUserVisible: false, // 控制用户信息的显示
    tasks: [],
    taskTitle: '',
  },
  radius: {
    type: Number,
    value: -50, // 默认距离屏幕中心的半径
  },
  /**
   * 页面加载事件
   */
  onLoad() {
    console.log("【页面加载完成】地图初始数据:", this.data);
  },

  // 用户信息组件点击事件
  onUserTap() {
    this.setData({
      isUserVisible: false, // 显示侧边栏
    });
  },

  /**
   * 主地图加载完成事件
   */
  onMapReady(e) {
    //console.log("【父组件】主地图加载完成，接收通知:", e.detail);
    this.setData({ mapReady: true });

    // 处理积压的摇杆事件
    while (this.data.pendingJoystickEvents.length > 0) {
      const event = this.data.pendingJoystickEvents.shift();
      this.processJoystickMovement(event);
    }
  },

  /**
   * 摇杆移动事件
   */
  onJoystickMove(event) {
    const { offsetX, offsetY } = event.detail;
    //console.log("【摇杆移动事件】触发:", { offsetX, offsetY });

    if (!this.data.mapReady) {
      //console.warn("【警告】地图未加载完成，摇杆事件加入队列");
      this.data.pendingJoystickEvents.push(event.detail);
      return;
    }

    //console.log("【摇杆事件】地图已加载，开始处理...");
    this.processJoystickMovement(event.detail);
  },
  /**
   * 摇杆停止事件
   */
  onJoystickStop() {
    //console.log("【摇杆停止】人物复位");
    this.setData({
      rotation: 0, // 复位方向
    });
  },

  /**  
   * 处理摇杆移动事件
   * @param {Object} detail - 摇杆事件的详细数据
   */
  processJoystickMovement(detail) {
    const { offsetX, offsetY } = detail;
    //console.log("【处理摇杆事件】输入偏移量:", { offsetX, offsetY });

    // 使用 movementManager 计算新坐标
    const { newLat, newLng } = movementManager.processJoystickMovement({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      offsetX,
      offsetY,
      scale: this.data.scale
    });

    //console.log("【坐标更新】旧中心点:", { latitude: this.data.latitude, longitude: this.data.longitude });
    //console.log("【坐标更新】新中心点:", { latitude: newLat, longitude: newLng });

    // 更新地图中心点
    this.setData({
      latitude: newLat,
      longitude: newLng,
      miniMapLatitude: newLat,
      miniMapLongitude: newLng
    });

    //console.log("【地图更新完成】主地图中心点:", { latitude: this.data.latitude, longitude: this.data.longitude });
    //console.log("【地图更新完成】小地图中心点:", { latitude: this.data.miniMapLatitude, longitude: this.data.miniMapLongitude });
  },

  // 侧边栏点击事件
  onShowTaskList(e) {
    const { type } = e.detail;
    if (type === 'unaccepted') {
      this.setData({ taskTitle: '未接任务' });
      this.loadUnacceptedTasks();
    } else if (type === 'accepted') {
      this.setData({ taskTitle: '已接任务' });
      this.loadAcceptedTasks();
    }
    this.setData({ taskBarVisible: true });
  },

  // 隐藏任务列表
  onHideTaskList() {
    this.setData({ taskBarVisible: false });
  },

  onShowUserCard() {
    this.setData({ isUserVisible: true });
  },

  onCloseUserCard() {
    this.setData({ isUserVisible: false });
  },

  loadUnacceptedTasks() {
    // 调用未接任务的数据接口
    // 模拟数据
    this.setData({
      tasks: [
        { id: 1, name: '任务 1', progress: '60/70', level: 'SSR', distance: '0.27公里' },
        // 更多未接任务...
      ]
    });
  },

  loadAcceptedTasks() {
    // 调用已接任务的数据接口
    // 模拟数据
    this.setData({
      tasks: [
        { id: 1, name: '任务 A', progress: '30/50', level: 'SR', distance: '0.5公里' },
        // 更多已接任务...
      ]
    });
  },
});