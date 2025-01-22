Component({
  properties: {
    fogRadius: {
      type: Number,
      value: 20, // 默认迷雾半径
    },
    centerLat: {
      type: Number,
      value: 31.2304, // 默认中心纬度
    },
    centerLng: {
      type: Number,
      value: 121.4737, // 默认中心经度
    },
    mapResolution: {
      type: Number,
      value: 1, // 地图分辨率（米/像素）
    },
  },
  data: {
    fogCanvas: null,
    fogCtx: null,
    canvasWidth: 0,
    canvasHeight: 0,
  },
  lifetimes: {
    attached() {
      this.initFogCanvas();
    },
    detached() {
      this.clearFogCanvas();
    },
  },
  methods: {
    initFogCanvas() {
      const query = this.createSelectorQuery();
      query
        .select('#fogCanvas')
        .fields({ node: true, size: true })
        .exec((res) => {
          if (!res[0] || !res[0].node) {
            console.error('无法找到 fogCanvas 节点');
            return;
          }

          const fogCanvas = res[0].node;
          const fogCtx = fogCanvas.getContext('2d');
          const { width, height } = res[0];
          fogCanvas.width = width;
          fogCanvas.height = height;

          this.setData({
            fogCanvas,
            fogCtx,
            canvasWidth: width,
            canvasHeight: height,
          });

          this.drawFog(); // 初次绘制
        });
    },
    drawFog() {
      const { fogCtx, fogCanvas, fogRadius, canvasWidth, canvasHeight, mapResolution } = this.data;

      if (!fogCanvas || !fogCtx) return;

      // 清空画布
      fogCtx.clearRect(0, 0, canvasWidth, canvasHeight);

      // 获取迷雾中心点
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;

      // 动态计算迷雾范围
      const radius100m = 100 / mapResolution; // 100米对应的像素
      const maxRadius = Math.sqrt(canvasWidth ** 2 + canvasHeight ** 2); // 画布对角线长度

      // 优化透明圆的计算范围
      const startRadius = fogRadius; // 透明圆的边缘起始半径
      const endRadius = fogRadius + maxRadius * 0.3; // 渐变范围扩大30%

      // 创建径向渐变
      const gradient = fogCtx.createRadialGradient(centerX, centerY, startRadius, centerX, centerY, endRadius);
      gradient.addColorStop(0, 'rgba(0,0,0,0)'); // 中心完全透明
      gradient.addColorStop(0.1, 'rgba(0,0,0,0.6)');
      gradient.addColorStop(0.2, 'rgba(0,0,0,0.7)');
      gradient.addColorStop(0.3, 'rgba(0,0,0,0.8)');
      gradient.addColorStop(0.4, 'rgba(0,0,0,0.8)');
      gradient.addColorStop(0.5, 'rgba(0,0,0,0.8)');
      gradient.addColorStop(0.6, 'rgba(0,0,0,0.8)');
      gradient.addColorStop(0.7, 'rgba(0,0,0,0.8)');
      gradient.addColorStop(0.8, 'rgba(0,0,0,0.8)');
      gradient.addColorStop(0.9, 'rgba(0,0,0,0.8)');
      gradient.addColorStop(1, 'rgba(0,0,0,0.8)'); // 最外圈完全黑暗

      // 填充渐变
      fogCtx.fillStyle = gradient;
      fogCtx.fillRect(0, 0, canvasWidth, canvasHeight);

      // 排除小地图区域
      fogCtx.globalCompositeOperation = 'destination-out';
      fogCtx.beginPath();
      fogCtx.rect(canvasWidth - 170, 10, 160, 160); // 假设小地图位置为右上角
      fogCtx.fill();

      // 排除摇杆区域
      const joystickRadius = 50; // 摇杆半径
      fogCtx.beginPath();
      fogCtx.arc(joystickRadius + 30, canvasHeight - joystickRadius - 30, joystickRadius, 0, Math.PI * 2); // 假设摇杆位置为左下角
      fogCtx.fill();

      // 恢复默认绘制模式
      fogCtx.globalCompositeOperation = 'source-over';

      console.log('迷雾绘制完成');
    },
    clearFogCanvas() {
      const { fogCanvas } = this.data;
      if (fogCanvas) {
        fogCanvas.getContext('2d').clearRect(0, 0, fogCanvas.width, fogCanvas.height);
      }
    },
  },
});