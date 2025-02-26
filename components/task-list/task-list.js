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
      value: [
        { id: 1, name: '任务 1', progress: '60/70', level: 'SSR', distance: '0.27公里' },
        { id: 2, name: '任务 2', progress: '60/70', level: 'SSR', distance: '0.27公里' },
        // 更多任务...
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.triggerEvent('closeTaskList');
    }
  }
})