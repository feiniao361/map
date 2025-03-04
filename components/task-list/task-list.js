const API = require('../../config/api.js');

// components/task-list/task-list.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    taskTitle: {
      type: String,
      value: '未接任务'
    },
    tasks: {
      type: Array,
      value: []
    }
  },

  data: {
  },

  methods: {
    onClose() {
      this.triggerEvent('closeTaskList');
    },

    // 添加任务点击事件处理
    // 在 onTaskTap 方法中
    onTaskTap(e) {
      const taskId = e.currentTarget.dataset.taskId;
      console.log('点击的任务ID:', taskId); // 添加调试日志
      const task = this.data.tasks.find(t => t.id === taskId);
      console.log('找到的任务:', task); // 添加调试日志
      
      wx.navigateTo({
        url: `/pages/task-detail/task-detail?taskId=${task.taskId}&isAccepted=${this.properties.taskTitle === '已接任务'}`
      });
    },

    // 保留原有的加载任务方法
    loadUnacceptedTasks() {
      const token = wx.getStorageSync('accessToken');
      const username = wx.getStorageSync('username');
      const API = require('../../config/api.js');
      wx.request({
        url: API.TASK.MISSPMLIST,
        method: 'POST',
        header: {
          'authorization': `Bearer ${token}`
        },
        data: {
          username: username
        },
        success: (res) => {
          if (res.statusCode === 200 && res.data && res.data.pointTasks) {
            const tasks = res.data.pointTasks.map(task => ({
              id: task.id,
              name: task.taskName,
              taskId: task.taskId,
              progress: task.isCompleted ? '发布者：数字部落' : '发布者：数字部落',
              level: task.taskType?.toUpperCase() || 'N/A',
              distance: '1KM',
              rewardPoints: task.rewardPoints,
              latitude: task.latitude,
              longitude: task.longitude
            }));
            this.setData({ tasks });
            this.triggerEvent('tasksLoaded', { tasks });
          }
        },
        fail: (error) => {
          console.error('获取未接任务失败:', error);
          wx.showToast({
            title: '获取任务列表失败',
            icon: 'none'
          });
        }
      });
    },

    loadAcceptedTasks() {
      const token = wx.getStorageSync('accessToken');
      const username = wx.getStorageSync('username');
      wx.request({
        url: API.TASK.ACCEPTEDPMLIST,
        method: 'POST',
        header: {
          'authorization': `Bearer ${token}`
        },
        data: {
          username: username
        },
        success: (res) => {
          if (res.statusCode === 200 && res.data && res.data.pointTasks) {
            const tasks = res.data.pointTasks.map(task => ({
              id: task.id,
              name: task.taskName,
              taskId: task.taskId,
              progress: task.isCompleted ? '发布者：数字部落' : '发布者：数字部落',
              level: task.taskType?.toUpperCase() || 'N/A',
              distance: '1KM',
              rewardPoints: task.rewardPoints,
              latitude: task.latitude,
              longitude: task.longitude
            }));
            this.setData({ tasks });
            this.triggerEvent('tasksLoaded', { tasks });
          }
        },
        fail: (error) => {
          console.error('获取已接任务失败:', error);
          wx.showToast({
            title: '获取任务列表失败',
            icon: 'none'
          });
        }
      });
    }
  }
})