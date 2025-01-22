/**
 * 常量配置
 */
const MOVEMENT_SCALE = 0.05; // 灵敏度系数
const BASE_MOVE_STEP = 0.0005; // 基准步长

/**
 * 根据地图缩放级别计算动态步长
 * @param {Number} scale - 地图缩放级别
 * @returns {Number} 动态步长
 */
function getDynamicStepSize(scale) {
  if (typeof scale !== 'number' || scale <= 0) {
    throw new Error("无效的地图缩放级别：scale 必须是正数。");
  }
  return BASE_MOVE_STEP * (1 / scale);
}

/**
 * 根据当前坐标和偏移量计算新位置
 * @param {Number} latitude - 当前纬度
 * @param {Number} longitude - 当前经度
 * @param {Number} offsetX - 摇杆X轴偏移量
 * @param {Number} offsetY - 摇杆Y轴偏移量
 * @param {Number} scale - 地图缩放比例（默认18）
 * @returns {Object} { newLat, newLng } - 新的纬度和经度
 */
function calculateNewPosition(latitude, longitude, offsetX, offsetY, scale = 18) {
  // 输入校验
  if (![latitude, longitude, offsetX, offsetY, scale].every(n => typeof n === 'number')) {
    throw new Error("输入参数无效：所有参数必须是数字类型。");
  }

  const step = getDynamicStepSize(scale) * MOVEMENT_SCALE; // 动态步长
  const newLat = latitude - offsetY * step; // Y轴向上为负，向下为正
  const newLng = longitude + offsetX * step; // X轴向右为正，向左为负

  return { newLat, newLng };
}

/**
 * 处理摇杆事件，返回新的坐标
 * @param {Object} params - 参数对象
 * @param {Number} params.latitude - 当前纬度
 * @param {Number} params.longitude - 当前经度
 * @param {Number} params.offsetX - 摇杆X轴偏移量
 * @param {Number} params.offsetY - 摇杆Y轴偏移量
 * @param {Number} params.scale - 当前地图缩放级别
 * @returns {Object} { newLat, newLng } - 计算后新坐标
 */
function processJoystickMovement({ latitude, longitude, offsetX, offsetY, scale }) {
  //console.log("【摇杆事件】输入坐标:", { latitude, longitude, offsetX, offsetY, scale });

  try {
    const { newLat, newLng } = calculateNewPosition(latitude, longitude, offsetX, offsetY, scale);
    //console.log("【摇杆事件】新坐标:", { newLat, newLng });
    return { newLat, newLng };
  } catch (error) {
    console.error("【摇杆事件】计算错误:", error.message);
    return { newLat: latitude, newLng: longitude }; // 保持原坐标
  }
}

module.exports = {
  getDynamicStepSize,
  calculateNewPosition,
  processJoystickMovement
};