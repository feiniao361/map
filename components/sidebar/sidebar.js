Component({
    properties: {},
    data: {
      menuItems: [
        { id: 1, text: "未接任务", icon: "/images/icons/help.svg" },
        { id: 2, text: "已接任务", icon: "/images/icons/love.svg" },
        { id: 3, text: "我的", icon: "/images/icons/home.svg" },
      ],
    },
    methods: {
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