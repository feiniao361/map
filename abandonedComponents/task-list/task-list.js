const { tasks } = require('../../data/tasks'); // 导入任务数据
const { getDistance } = require('../../utils/distance'); // 导入距离计算函数

Component({
  properties: {
    currentLatitude: Number, // 当前纬度
    currentLongitude: Number, // 当前经度
    maxDistance: {
      type: Number,
      value: 3, // 距离阈值（单位：公里）
    },
  },
  data: {
    nearbyTasks: [], // 附近的任务列表
    visible: true, // 控制任务栏的显示状态
    currentTab: 'unaccepted', // 当前选中的任务类型标签
    unacceptedTasks: [], // 未接任务列表
    acceptedTasks: [], // 已接任务列表
  },
  methods: {
    // 获取等级名称
    getLevelName(level) {
      const levels = ['未知等级', 'E', 'D', 'C', 'B', 'A', 'S', 'SS', 'SSS', 'SR', 'SSR'];
      return levels[level] || levels[0];
    },

    // 动态更新范围内任务列表
    updateTasksInRange() {
      const { currentLatitude, currentLongitude, maxDistance } = this.data;

      if (!currentLatitude || !currentLongitude) {
        console.warn("未获取到有效的当前坐标");
        return;
      }

      // 计算每个任务的距离
      const updatedTasks = tasks.map((task) => {
        const distance = getDistance(
          currentLatitude,
          currentLongitude,
          task.latitude,
          task.longitude
        );

        return {
          ...task,
          distance: parseFloat(distance.toFixed(2)), // 强制转换为数值
          levelName: this.getLevelName(task.level),
        };
      });

      // 筛选范围内任务
      const unaccepted = updatedTasks
        .filter((task) => task.distance <= maxDistance && !task.accepted) // 未接任务
        .sort((a, b) => b.level - a.level) // 等级降序
        .slice(0, 5);

      const accepted = updatedTasks
        .filter((task) => task.accepted) // 已接任务
        .sort((a, b) => b.level - a.level) // 等级降序
        .slice(0, 5);

      this.setData({
        unacceptedTasks: unaccepted,
        acceptedTasks: accepted,
      });

      // 根据当前选中的标签更新显示列表
      this.updateTaskList();
    },

    // 更新显示任务列表
    updateTaskList() {
      const { currentTab, unacceptedTasks, acceptedTasks } = this.data;
      this.setData({
        nearbyTasks: currentTab === 'unaccepted' ? unacceptedTasks : acceptedTasks,
      });
    },

    // 切换任务栏显示状态
    onCollapse() {
      const { visible } = this.data;
      this.setData({
        visible: !visible,
      });
    },

    // 切换任务类型标签
    onTabSwitch(e) {
      const { tab } = e.currentTarget.dataset;
      if (tab !== this.data.currentTab) {
        this.setData({ currentTab: tab }, this.updateTaskList);
      }
    },

    // 点击任务条目进入详情页
    onTaskClick(e) {
      const { task } = e.currentTarget.dataset; // 获取任务数据
      if (task) {
        wx.navigateTo({
          url: `/pages/task-detail/task-detail?id=${task.id}`, // 跳转到任务详情页
        });
      } else {
        console.error('未找到任务数据');
      }
    },
  },

  lifetimes: {
    attached() {
      this.updateTasksInRange(); // 初始化时加载任务列表
    },
  },

  observers: {
    // 当坐标发生变化时，实时更新任务
    'currentLatitude, currentLongitude': function () {
      this.updateTasksInRange();
    },
  },
});