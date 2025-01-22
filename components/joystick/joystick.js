// components/joystick/joystick.js

let moveInterval = null; // 触发移动的定时器
const MOVE_INTERVAL = 50; // 每隔 50ms 触发一次事件

Component({
  properties: {
    maxDistance: {
      type: Number,
      value: 30 // 默认最大半径
    }
  },
  data: {
    joystickX: 0,
    joystickY: 0,
    joystickOrigin: { x: 0, y: 0 },
    isControlling: false,
    lastOffset: { x: 0, y: 0 } // 记录最后的偏移量
  },
  methods: {
    // 开始控制摇杆
    onControlStart(e) {
      const touch = e.touches[0];
      const origin = { x: touch.clientX, y: touch.clientY };

      this.setData({
        joystickOrigin: origin,
        isControlling: true,
        joystickX: 0,
        joystickY: 0,
        lastOffset: { x: 0, y: 0 }
      });

      // 启动定时器，持续触发移动事件
      this.startMoveLoop();
    },

    // 移动摇杆
    onControlMove(e) {
      if (!this.data.isControlling) return;

      const touch = e.touches[0];
      const dx = touch.clientX - this.data.joystickOrigin.x;
      const dy = touch.clientY - this.data.joystickOrigin.y;

      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = this.data.maxDistance;

      let offsetX = dx;
      let offsetY = dy;

      // 限制移动范围
      if (dist > maxDist) {
        const ratio = maxDist / dist;
        offsetX = dx * ratio;
        offsetY = dy * ratio;
      }

      const angle = Math.atan2(offsetY, offsetX) * (180 / Math.PI); // 弧度转角度

      this.setData({
        joystickX: offsetX,
        joystickY: offsetY,
        lastOffset: { x: offsetX, y: offsetY } // 记录偏移量
      });

      //console.log("摇杆移动:", { offsetX, offsetY });

      //视角旋转
      
      this.triggerEvent('joystickrotate', { angle }); // 触发方向旋转事件
      //console.log("摇杆方向角度:", angle);
    },

    // 结束控制摇杆
    onControlEnd() {
      this.setData({
        isControlling: false,
        joystickX: 0,
        joystickY: 0,
        lastOffset: { x: 0, y: 0 }
      });

      // 触发摇杆停止事件
      this.triggerEvent('joystickstop');
      //console.log("摇杆停止，位置归零");

      // 触发归零事件
      this.triggerEvent('joystickmove', { offsetX: 0, offsetY: 0 });
      this.clearMoveLoop();
    },

    // 开始持续触发移动事件
    startMoveLoop() {
      if (moveInterval) return; // 防止重复启动

      moveInterval = setInterval(() => {
        const { lastOffset } = this.data;

        // 如果用户正在控制摇杆，持续发送最后的偏移量
        if (this.data.isControlling) {
          this.triggerEvent('joystickmove', {
            offsetX: lastOffset.x,
            offsetY: lastOffset.y
          });
          //console.log("保持移动事件:", { offsetX: lastOffset.x, offsetY: lastOffset.y });
        }
      }, MOVE_INTERVAL);
    },

    // 清除移动定时器
    clearMoveLoop() {
      if (moveInterval) {
        clearInterval(moveInterval);
        moveInterval = null;
      }
    }
  }
});