const API = require('../../config/api.js');

/**
 * 任务详情页面
 */
Page({
  /**
   * 页面初始数据
   */
  data: {
    taskDetails: {
      name: '',           // 任务名称
      level: '',          // 任务等级
      publisher: '系统',   // 发布者
      rewardPoints: 0,    // 奖励积分
      latitude: '',       // 纬度
      longitude: '',      // 经度
      address: '',        // 任务地址
      conditions: '无特殊条件',  // 任务条件
      content: '请用手机与小吴进行互动',  // 任务内容
      taskId: '',         // 任务ID
      isAccepted: false   // 是否已接受任务
    }
  },

  /**
   * 生命周期函数--监听页面加载
   * @param {Object} options 页面参数
   */
  onLoad(options) {
    const { taskId, isAccepted } = options;
    this.setData({
      'taskDetails.isAccepted': isAccepted === 'true'
    });
    if (!taskId) {
      wx.showToast({
        title: "任务 ID 缺失",
        icon: "none",
      });
      return;
    }
    this.loadTaskDetails(taskId);
  },

  /**
   * 加载任务详情
   * @param {string} taskId 任务ID
   */
  loadTaskDetails(taskId) {
    const token = wx.getStorageSync('accessToken');
    const username = wx.getStorageSync('username');

    this.setData({
      'taskDetails.taskId': taskId
    });

    wx.request({
      url: API.TASK.LIST,
      method: 'POST',
      header: {
        'authorization': `Bearer ${token}`
      },
      data: {
        username: username,
        taskId: taskId
      },
      success: (res) => {
        if (res.statusCode === 200 && res.data && res.data.pointTasks?.length > 0) {
          const task = res.data.pointTasks[0];  // 获取数组第一个任务
          
          this.setData({
            taskDetails: {
              ...this.data.taskDetails,
              name: task.taskName,
              level: task.taskType?.toUpperCase() || 'N/A',
              publisher: '数字部落',
              rewardPoints: task.rewardPoints || 0,
              latitude: task.latitude,
              longitude: task.longitude,
              address: task.address || '上海市松江区沪松公路1177号A座606室',  // 添加地址字段
              conditions: task.description || '无特殊条件',
              content: task.description || '和小吴进行互动',
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

  /**
   * 接受任务
   * 调用接口接受任务，成功后返回首页
   */
  onAcceptTask() {
    const token = wx.getStorageSync('accessToken');
    const username = wx.getStorageSync('username');
    const taskId = this.data.taskDetails.taskId;
    
    wx.request({
      url: API.TASK.ACCEPT,
      method: 'POST',
      header: {
        'authorization': `Bearer ${token}`
      },
      data: {
        username: username,
        taskId: taskId
      },
      success: (res) => {
        console.log('接口返回结果:', res.data);
        if (res.statusCode === 200) {
          wx.showToast({
            title: '接受任务成功',
            icon: 'success',
            duration: 2000
          });
          
          setTimeout(() => {
            wx.reLaunch({
              url: '/pages/index/index',
              fail: (err) => {
                console.error('跳转失败:', err);
              }
            });
          }, 2000); // 2秒后跳转
        }
      },
      fail: (error) => {
        console.error('接受任务失败:', error);
        console.log('错误详情:', error);
        wx.showToast({
          title: '接受任务失败',
          icon: 'none'
        });
      }
    });
  },

  // 添加放弃任务方法
  // 放弃任务方法
  onAbandonTask() {
    const token = wx.getStorageSync('accessToken');
    wx.request({
      url: API.TASK.ABANDON,
      method: 'POST',
      header: {
        'authorization': `Bearer ${token}`
      },
      data: {
        taskId: this.data.taskDetails.taskId
      },
      success: (res) => {
        if (res.statusCode === 200) {
          wx.showToast({
            title: '放弃任务成功',
            icon: 'success',
            duration: 2000
          });
          setTimeout(() => {
            wx.reLaunch({
              url: '/pages/index/index',
              fail: (err) => {
                console.error('跳转失败:', err);
              }
            });
          }, 2000);
        }
      },
      fail: (error) => {
        console.error('放弃任务失败:', error);
        wx.showToast({
          title: '放弃任务失败',
          icon: 'none'
        });
      }
    });
  },

  // 完成任务方法
  onCompleteTask() {
    const token = wx.getStorageSync('accessToken');
    const username = wx.getStorageSync('username');
    const taskId = this.data.taskDetails.taskId;
  
    this.sendMessage(taskId, token)
      .then(() => {
        this.completeTaskRequest(username, taskId, token);
      })
      .catch((error) => {
        wx.showToast({
          title: '任务完成失败',
          icon: 'none'
        });
      });
  },

  /**
   * 发送消息到服务器
   * @param {string} taskId 任务ID
   * @param {string} token 认证token
   * @returns {Promise} 返回Promise对象
   */
  sendMessage(taskId, token) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: API.MESSAGE.SEND,
        method: 'POST',
        header: {
          'authorization': `Bearer ${token}`
        },
        data: {
          key: "playTemp",
          force: 1,
          taskId: taskId,
          videoList: ["nazha-1.mp4"]
        },
        success: (res) => {
          if (res.statusCode === 200) {
            console.log('消息发送成功:', res);
            resolve(res);
          } else {
            reject(new Error('消息发送失败'));
          }
        },
        fail: (error) => {
          console.error('消息发送失败:', error);
          reject(error);
        }
      });
    });  // 修复：添加缺失的右括号
  },

  completeTaskRequest(username, taskId, token) {
    wx.request({
      url: API.TASK.COMPLETE,
      method: 'POST',
      header: {
        'authorization': `Bearer ${token}`
      },
      data: {
        username: username,
        taskId: taskId
      },
      success: (res) => {
        if (res.statusCode === 200) {
          wx.showToast({
            title: '完成任务成功',
            icon: 'success',
            duration: 2000
          });
          setTimeout(() => {
            wx.reLaunch({
              url: '/pages/index/index',
              fail: (err) => {
                console.error('跳转失败:', err);
              }
            });
          }, 2000);
        }
      },
      fail: (error) => {
        console.error('完成任务失败:', error);
        wx.showToast({
          title: '完成任务失败',
          icon: 'none'
        });
      }
    });
  },
  /**
     * 跳转到导航页面
     */
  onNavigateTap() {
    const { latitude, longitude } = this.data.taskDetails;
    if (!latitude || !longitude) {
      wx.showToast({
        title: '暂无位置信息',
        icon: 'none'
      });
      return;
    }
  
    wx.navigateTo({
      url: `/pages/navigation/navigation?targetLat=${latitude}&targetLng=${longitude}`,
      fail: (err) => {
        console.error('导航跳转失败:', err);
        wx.showToast({
          title: '导航跳转失败',
          icon: 'none'
        });
      }
    });
  }  // 修复：移除多余的逗号
});