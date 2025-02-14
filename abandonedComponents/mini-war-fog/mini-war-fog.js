Component({
  properties: {
    fogRadius: {
      type: Number,
      value: 30, // 小地图迷雾半径
    },
    position: {
      type: Object,
      value: { 
        x: 0, 
        y: 0, 
        width: 160, 
        height: 160 
      }, // 小地图位置和尺寸
    },
  },
  data: {
    fogCanvas: null,
    fogCtx: null,
    canvasWidth: 0,
    canvasHeight: 0,
    noiseInterval: null, // 定时器用于动态噪声
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
    /**
     * 初始化迷雾画布
     */
    initFogCanvas() {
      const query = this.createSelectorQuery();
      query
        .select('#miniFogCanvas')
        .fields({ node: true, size: true })
        .exec((res) => {
          if (!res[0] || !res[0].node) {
            console.error('无法找到 miniFogCanvas 节点');
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

          this.startDynamicFog(); // 开始动态迷雾效果
        });
    },

    /**
     * 开始动态迷雾效果
     */
    startDynamicFog() {
      const { fogCtx, fogCanvas, fogRadius, position } = this.data;

      const drawFogFrame = () => {
        const { x, y, width, height } = position;
        fogCtx.clearRect(0, 0, fogCanvas.width, fogCanvas.height);

        // 绘制多层半透明渐变
        this.drawSmokeLayer(fogCtx, x, y, width, height, fogRadius, 'rgba(0, 0, 0, 0.4)');
        this.drawSmokeLayer(fogCtx, x + 10, y + 10, width, height, fogRadius * 1.5, 'rgba(0, 0, 0, 0.2)');

        // 添加噪声纹理
        this.addNoise(fogCtx, x, y, width, height);

        // 使用定时器代替 requestAnimationFrame
        this.setData({
          noiseInterval: setTimeout(drawFogFrame, 16), // 约 60 FPS
        });
      };

      drawFogFrame();
    },

    /**
     * 绘制单层烟雾
     */
    drawSmokeLayer(ctx, x, y, width, height, radius, color) {
      const centerX = x + width / 2;
      const centerY = y + height / 2;

      const gradient = ctx.createRadialGradient(centerX, centerY, radius, centerX, centerY, radius * 2);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(1, color);

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, width, height);
    },

    /**
     * 添加动态噪声
     */
    addNoise(ctx, x, y, width, height) {
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const randomValue = Math.floor(Math.random() * 255);
        data[i] = data[i + 1] = data[i + 2] = randomValue; // 灰色噪声
        data[i + 3] = 80; // 透明度
      }

      ctx.putImageData(imageData, x, y);
    },

    /**
     * 清理迷雾画布
     */
    clearFogCanvas() {
      const { fogCanvas, noiseInterval } = this.data;
      if (fogCanvas) {
        fogCanvas.getContext('2d').clearRect(0, 0, fogCanvas.width, fogCanvas.height);
      }
      if (noiseInterval) {
        clearTimeout(noiseInterval); // 停止定时器
        this.setData({ noiseInterval: null });
      }
    },
  },
});