// 侧边栏组件
Component({
    /**
     * 组件属性列表
     * 用于接收父页面传递的参数
     */
    properties: {},
    /**
     * 组件初始数据
     * menuItems: 导航菜单项配置
     *   - id: 菜单项唯一标识
     *   - text: 显示文本
     *   - icon: 图标路径
     */
    data: {
      menuItems: [
        { id: 1, text: "未接任务", icon: "/images/icons/help.svg" },
        { id: 2, text: "已接任务", icon: "/images/icons/love.svg" },
        { id: 3, text: "我的", icon: "/images/icons/home.svg" },
      ],
    },
    /**
     * 组件方法列表
     */
    methods: {
      /**
       * 菜单项点击事件处理
       * @param {Object} e - 事件对象
       * @param {Number} e.currentTarget.dataset.id - 菜单项ID
       */
      onMenuTap(e) {
        const id = e.currentTarget.dataset.id;
        switch (id) {
          case 1:
            this.triggerEvent('showTaskList', { type: 'unaccepted' });
            break;
          case 2:
            this.triggerEvent('showTaskList', { type: 'accepted' });
            break;
          case 3:
            this.triggerEvent('showUserCard');
            break;
        }
      },
    },
  });
