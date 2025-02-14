Component({
  properties: {
    menuBtn:{
      type:Number,
      value:50
    },
    menuiconSize: {
      type: Number,
      value: 30, // 菜单按钮大小
    },
    menuSize: {
      type: Number,
      value: 50, // 菜单按钮大小
    },
    menubtnIcon: {
      type: String,
      value: '/images/character1.svg', // 菜单按钮图标
    },
    items: {
      type: Array,
      value: [
        { angle: -20, icon: '/images/icons/home.svg' },
        { angle: 40, icon: '/images/icons/help.svg' },
        { angle: 100, icon: '/images/icons/love.svg' },
        { angle: 160, icon: '/images/icons/shop.svg' },
        { angle: 220, icon: '/images/icons/home.svg' },
        { angle: 280, icon: '/images/icons/close.svg' },
      ],
    },
    radius: {
      type: Number,
      value: -50, // 默认距离屏幕中心的半径
    },
  },

  data: {
    isOverlayVisible: false, // 控制遮罩层显示状态
    isMenuOpen: false,       // 控制菜单显示状态
  },

  methods: {
    // 切换菜单和遮罩层状态
    toggleMenu() {
      const isMenuOpen = !this.data.isMenuOpen;
      this.setData({
        isMenuOpen,
        isOverlayVisible: isMenuOpen, // 仅 menu-btn 控制遮罩层显示状态
      });
    },

    // 空方法，防止遮罩层触发状态变化
    noop() {
      // 遮罩层点击时不执行任何操作
    },

    // 菜单项点击事件
    handleItemClick(e) {
      const index = e.currentTarget.dataset.index;
      console.log('点击的菜单项索引:', index);
    },
  },
});