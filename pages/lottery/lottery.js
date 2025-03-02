Page({
  data: {
    points: 100,
    prizes: [
      { image: '../../images/icons/love.svg' },
      { image: '../../images/icons/love.svg' },
      { image: '../../images/icons/love.svg' },
      { image: '../../images/icons/love.svg' },
      { image: '../../images/icons/love.svg' },
      { image: '../../images/icons/love.svg' },
      { image: '../../images/icons/love.svg' },
      { image: '../../images/icons/love.svg' },
      { image: '../../images/icons/love.svg' }
    ],
    message: '',
    messageClass: '',
    bReady: true,
    prizeOrder: [0, 1, 2, 4, 7, 6, 5, 3, 8],
    num: 0,
    timer: null
  },

  /**
   * 开始抽奖主逻辑
   * 1. 检查是否可抽奖状态
   * 2. 重置提示信息
   * 3. 生成随机奖品序号
   * 4. 启动奖品高亮动画
   */
  startLottery: function() {
    // 检查当前是否处于可抽奖状态
    if (this.data.bReady) {
      this.setData({
        message: '',
        messageClass: '',
        bReady: false
      });
      this.data.num = this.getRandomNum(1, 9);
      this.startInit(this.data.num);
    }
  },

  /**
   * 生成指定范围的随机整数
   * @param {number} n 最小值（包含）
   * @param {number} m 最大值（不包含）
   * @returns {number} 随机整数
   */
  getRandomNum: function(n, m) {
    return Math.floor(Math.random() * (m - n) + n);
  },

  /**
   * 启动奖品高亮动画
   * @param {number} num 最终中奖序号
   */
  startInit: function(num) {
    let i = 0; // 动画帧计数器
    let t = 200; // 初始动画间隔时间(ms)
    const rounds = 5; // 基础旋转圈数
    const rNum = rounds * 8; // 总基础动画帧数（8个奖品位置）

    // 奖品高亮动画核心逻辑
    const startScroll = () => {
      // 更新奖品高亮状态
      this.setData({
        prizes: this.data.prizes.map((item, index) => ({
          ...item,
          // 根据预设的奖品顺序循环高亮
          active: index === this.data.prizeOrder[i % this.data.prizeOrder.length]
        }))
      });

      i++; // 增加帧计数

      // 前段动画：快速匀速旋转
      if (i < rNum - 8) {
        this.data.timer = setTimeout(startScroll, t);
      } 
      // 后段动画：减速直到停在目标位置
      else if (i >= rNum - 8 && i < rNum + num) {
        t += (i - rNum + 8) * 5; // 逐步增加间隔时间实现减速效果
        this.data.timer = setTimeout(startScroll, t);
      }

      // 动画结束处理
      if (i >= rNum + num) {
        this.showMessage(num); // 显示中奖信息
        clearTimeout(this.data.timer); // 清除定时器
      }
    };

    // 启动初始定时器
    this.data.timer = setTimeout(startScroll, t);
  },

  /**
   * 显示中奖结果信息
   * @param {number} num 中奖序号 
   */
  showMessage: function(num) {
    let message = ''; // 初始化提示信息
    switch (num) {
      case 1: message = "恭喜你中了耳机"; break;
      case 2: message = "恭喜你中了iPad"; break;
      case 3: message = "感谢参与"; break;
      case 4: message = "恭喜你中了洋娃娃"; break;
      case 5: message = "恭喜你中了红色鞋子"; break;
      case 6: message = "恭喜你中了白色手机"; break;
      case 7: message = "恭喜你中了黑色手机"; break;
      case 8: message = "恭喜你中了蓝色鞋子"; break;
    }

    this.setData({
      points: this.data.points - 10,
      message: message,
      messageClass: 'show',
      bReady: true
    });
  }
});
