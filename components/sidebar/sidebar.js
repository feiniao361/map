Component({
    properties: {},
    data: {
      menuItems: [
        { id: 1, text: "未接任务", icon: "/images/icons/unaccepted.svg" },
        { id: 2, text: "已接任务", icon: "/images/icons/accepted.svg" },
        { id: 3, text: "我的", icon: "/images/icons/my.svg" },
      ],
    },
    methods: {
      onMenuTap(e) {
        const id = e.currentTarget.dataset.id;
        switch (id) {
          case 1:
            wx.showToast({ title: "未接任务", icon: "none" });
            break;
          case 2:
            wx.showToast({ title: "已接任务", icon: "none" });
            break;
          case 3:
            wx.showToast({ title: "我的", icon: "none" });
            break;
        }
      },
    },
  });