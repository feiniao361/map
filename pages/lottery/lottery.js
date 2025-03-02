Page({
  data: {
    points: 100,
    prizes: [
      { image: 'images/icons/love.svg' },
      { image: 'images/icons/love.svg' },
      { image: 'images/icons/love.svg' },
      { image: 'images/icons/love.svg' },
      { image: 'images/icons/love.svg' },
      { image: 'images/icons/love.svg' },
      { image: 'images/icons/love.svg' },
      { image: 'images/icons/love.svg' },
      { image: 'images/icons/new_prize.svg' }
    ],
    message: '',
    messageClass: '',
    bReady: true,
    prizeOrder: [0, 1, 2, 4, 7, 6, 5, 3, 8],
    num: 0,
    timer: null
  },

  startLottery: function() {
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

  getRandomNum: function(n, m) {
    return Math.floor(Math.random() * (m - n) + n);
  },

  startInit: function(num) {
    let i = 0;
    let t = 200;
    const rounds = 5;
    const rNum = rounds * 8;

    const startScroll = () => {
      this.setData({
        prizes: this.data.prizes.map((item, index) => ({
          ...item,
          active: index === this.data.prizeOrder[i % this.data.prizeOrder.length]
        }))
      });

      i++;

      if (i < rNum - 8) {
        this.data.timer = setTimeout(startScroll, t);
      } else if (i >= rNum - 8 && i < rNum + num) {
        t += (i - rNum + 8) * 5;
        this.data.timer = setTimeout(startScroll, t);
      }

      if (i >= rNum + num) {
        this.showMessage(num);
        clearTimeout(this.data.timer);
      }
    };

    this.data.timer = setTimeout(startScroll, t);
  },

  showMessage: function(num) {
    let message = '';
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