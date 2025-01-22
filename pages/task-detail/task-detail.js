const { tasks } = require("../../data/tasks");

Page({
  data: {
    taskId: null, // 存储任务 ID
    taskDetails: {}, // 存储任务详情
  },

  onLoad(options) {
    // 从页面跳转参数中获取任务 ID
    const { id } = options;

    if (!id) {
      wx.showToast({
        title: "任务 ID 缺失",
        icon: "none",
      });
      return;
    }

    // 转换为数字类型
    const taskId = parseInt(id, 10);
    const task = tasks.find((t) => t.id === taskId);

    if (task) {
      this.setData({
        taskId,
        taskDetails: task,
      });
    } else {
      wx.showToast({
        title: "任务不存在",
        icon: "none",
      });
    }
  },
  onAcceptTask() {
    wx.showToast({
      title: "任务已接受！",
      icon: "success",
    });
  },
});