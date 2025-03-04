Page({
  data: {
    taskDetails: {
      name: '',
      level: '',
      publisher: '系统',
      rewardPoints: 0,
      latitude: '',
      longitude: '',
      conditions: '无特殊条件',
      content: '暂无详细内容',
      taskId: ''
    }
  },

  onLoad(options) {
    // 从路由参数获取任务信息
    const { taskId } = options;
    if (!taskId) {
      wx.showToast({
        title: "任务 ID 缺失",
        icon: "none",
      });
      return;
    }

    this.loadTaskDetails(taskId);
  },

  loadTaskDetails(taskId) {
    const token = wx.getStorageSync('accessToken');
    const username = wx.getStorageSync('username');

    wx.request({
      url: 'http://47.116.205.160:9081/point/taskDetail',
      method: 'POST',
      header: {
        'authorization': `Bearer ${token}`
      },
      data: {
        username: username,
        taskId: taskId
      },
      success: (res) => {
        if (res.statusCode === 200 && res.data) {
          const task = res.data;
          this.setData({
            taskDetails: {
              name: task.taskName,
              level: task.taskType?.toUpperCase() || 'N/A',
              publisher: '系统',
              rewardPoints: task.rewardPoints,
              latitude: task.latitude,
              longitude: task.longitude,
              conditions: task.description || '无特殊条件',
              content: task.description || '暂无详细内容',
              taskId: task.taskId
            }
          });
        }
      },
      fail: (error) => {
        console.error('获取任务详情失败:', error);
        wx.showToast({
          title: '获取任务详情失败',
          icon: 'none'
        });
      }
    });
  },

  onAcceptTask() {
    const token = wx.getStorageSync('accessToken');
    const username = wx.getStorageSync('username');
    
    wx.request({
      url: 'http://47.116.205.160:9081/point/getPermission',
      method: 'POST',
      header: {
        'authorization': `Bearer ${token}`
      },
      data: {
        username: username,
        taskId: this.data.taskDetails.taskId
      },
      success: (res) => {
        if (res.statusCode === 200) {
          wx.showToast({
            title: '接受任务成功',
            icon: 'success'
          });
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      },
      fail: (error) => {
        console.error('接受任务失败:', error);
        wx.showToast({
          title: '接受任务失败',
          icon: 'none'
        });
      }
    });
  }
});