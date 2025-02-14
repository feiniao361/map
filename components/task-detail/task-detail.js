// components/task-detail/task-detail.js
const app = getApp()

Page({
  data: {
    task: {},      // 任务详情数据
    isAccepted: false // 任务接受状态
  },

  onLoad(options) {
    // 从全局数据获取任务详情（假设任务数据已加载）
    const taskId = options.id
    const task = app.globalData.tasks.find(t => t.id === taskId)
    this.setData({ task })
  },

  // 切换任务状态
  toggleTaskStatus() {
    this.setData({ isAccepted: !this.data.isAccepted })
  },

  // 导航到任务地点
  navigateToTask() {
    // 保存导航坐标到全局
    app.globalData.navigationTarget = {
      latitude: this.data.task.latitude,
      longitude: this.data.task.longitude,
      name: this.data.task.location
    }

    // 切换回首页并触发导航
    wx.switchTab({
      url: '/pages/index/index',
      success: () => {
        // 通过事件总线通知首页开始导航
        app.eventBus.emit('start-navigation', this.data.task)
      }
    })
  }
})