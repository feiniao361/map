const tasks = [
  // 25 条范围在 3 公里内
  { id: 1, level: 1, name: "任务 1", description: "任务描述 1", condition: "完成 10 次动作", publisher: "系统", amount: 100, remaining: 80, latitude: 31.2310, longitude: 121.4735, accepted: 0 ,reward: "任务奖励1 50 经验值 + 30 金币",startTime: 1702956000,endTime: 1765466400 },
  { id: 2, level: 3, name: "任务 2", description: "任务描述 2", condition: "击败 5 个敌人", publisher: "玩家 A", amount: 50, remaining: 50, latitude: 31.2306, longitude: 121.4740, accepted: 0 ,reward: "任务奖励2 50 经验值 + 30 金币",startTime: 1702956000,endTime: 1765466400},
  { id: 3, level: 2, name: "任务 3", description: "任务描述 3", condition: "采集 20 颗资源", publisher: "系统", amount: 200, remaining: 150, latitude: 31.2320, longitude: 121.4739, accepted: 0 ,reward: "任务奖励3 50 经验值 + 30 金币",startTime: 1702956000,endTime: 1765466400},
  { id: 4, level: 4, name: "任务 4", description: "任务描述 4", condition: "护送 NPC", publisher: "玩家 B", amount: 30, remaining: 30, latitude: 31.2309, longitude: 121.4728, accepted: 0 ,reward: "任务奖励4 50 经验值 + 30 金币",startTime: 1702956000,endTime: 1765466400},
  { id: 5, level: 5, name: "任务 5", description: "任务描述 5", condition: "占领据点", publisher: "玩家 C", amount: 10, remaining: 8, latitude: 31.2312, longitude: 121.4750, accepted: 0 ,reward: "任务奖励5 50 经验值 + 30 金币",startTime: 1702956000,endTime: 1765466400},
  { id: 6, level: 6, name: "任务 6", description: "任务描述 6", condition: "完成探索", publisher: "玩家 D", amount: 50, remaining: 45, latitude: 31.2325, longitude: 121.4748, accepted: 0 ,reward: "任务奖励6 50 经验值 + 30 金币",startTime: 1702956000,endTime: 1765466400},
  { id: 7, level: 7, name: "任务 7", description: "任务描述 7", condition: "拯救平民", publisher: "玩家 E", amount: 120, remaining: 100, latitude: 31.2298, longitude: 121.4712, accepted: 0 ,reward: "任务奖励7 50 经验值 + 30 金币",startTime: 1702956000,endTime: 1765466400},
  { id: 8, level: 4, name: "任务 8", description: "任务描述 8", condition: "修理车辆", publisher: "系统", amount: 90, remaining: 80, latitude: 31.2285, longitude: 121.4706, accepted: 0 ,reward: "任务奖励8 50 经验值 + 30 金币",startTime: 1702956000,endTime: 1765466400},
  { id: 9, level: 9, name: "任务 9", description: "任务描述 9", condition: "击败怪兽", publisher: "玩家 F", amount: 70, remaining: 60, latitude: 31.2330, longitude: 121.4760, accepted: 0 ,reward: "任务奖励9 50 经验值 + 30 金币",startTime: 1702956000,endTime: 1765466400},
  { id: 10, level: 5, name: "任务 10", description: "任务描述 10", condition: "运输资源", publisher: "玩家 G", amount: 80, remaining: 70, latitude: 31.2305, longitude: 121.4739, accepted: 0 ,reward: "任务奖励10 50 经验值 + 30 金币",startTime: 1702956000,endTime: 1765466400},
  { id: 11, level: 8, name: "任务 11", description: "任务描述 11", condition: "建造基地", publisher: "玩家 H", amount: 40, remaining: 30, latitude: 31.2314, longitude: 121.4747, accepted: 0 ,reward: "任务奖励11 50 经验值 + 30 金币",startTime: 1702956000,endTime: 1765466400},
  { id: 12, level: 2, name: "任务 12", description: "任务描述 12", condition: "完成测试", publisher: "系统", amount: 200, remaining: 150, latitude: 31.2290, longitude: 121.4718, accepted: 0 ,reward: "任务奖励12 50 经验值 + 30 金币",startTime: 1702956000,endTime: 1765466400},
  { id: 13, level: 1, name: "任务 13", description: "任务描述 13", condition: "挖掘矿石", publisher: "玩家 I", amount: 30, remaining: 10, latitude: 31.2306, longitude: 121.4745, accepted: 0 ,reward: "任务奖励13 50 经验值 + 30 金币",startTime: 1702956000,endTime: 1765466400},
  { id: 14, level: 3, name: "任务 14", description: "任务描述 14", condition: "防守据点", publisher: "玩家 J", amount: 60, remaining: 40, latitude: 31.2312, longitude: 121.4753, accepted: 0 ,reward: "任务奖励14 50 经验值 + 30 金币",startTime: 1702956000,endTime: 1765466400},
  { id: 15, level: 10, name: "任务 15", description: "任务描述 15", condition: "解决危机", publisher: "玩家 K", amount: 70, remaining: 60, latitude: 31.2301, longitude: 121.4709, accepted: 0 ,reward: "任务奖励15 50 经验值 + 30 金币",startTime: 1702956000,endTime: 1765466400},
  // 25 条范围在 3-6 公里
  { id: 16, level: 7, name: "任务 16", description: "任务描述 16", condition: "护送任务", publisher: "玩家 L", amount: 50, remaining: 40, latitude: 31.2390, longitude: 121.4790, accepted: 0 ,reward: "任务奖励16 50 经验值 + 30 金币",startTime: 1702956000,endTime: 1765466400},
  { id: 17, level: 6, name: "任务 17", description: "任务描述 17", condition: "侦查任务", publisher: "系统", amount: 40, remaining: 30, latitude: 31.2410, longitude: 121.4825, accepted: 0 ,reward: "任务奖励17 50 经验值 + 30 金币",startTime: 1702956000,endTime: 1765466400},
  { id: 18, level: 9, name: "任务 18", description: "任务描述 18", condition: "击杀目标", publisher: "玩家 M", amount: 90, remaining: 70, latitude: 31.2455, longitude: 121.4870, accepted: 0 ,reward: "任务奖励18 50 经验值 + 30 金币",startTime: 1702956000,endTime: 1765466400},
  { id: 19, level: 8, name: "任务 19", description: "任务描述 19", condition: "采集资源", publisher: "玩家 N", amount: 80, remaining: 70, latitude: 31.2402, longitude: 121.4805, accepted: 0 ,reward: "任务奖励19 50 经验值 + 30 金币",startTime: 1702956000,endTime: 1765466400},
  { id: 20, level: 3, name: "任务 20", description: "任务描述 20", condition: "运输弹药", publisher: "系统", amount: 70, remaining: 60, latitude: 31.2430, longitude: 121.4850, accepted: 0 ,reward: "任务奖励20 50 经验值 + 30 金币",startTime: 1702956000,endTime: 1765466400},
  { id: 21, level: 1, name: "任务 21", description: "任务描述 21", condition: "解决难题", publisher: "玩家 O", amount: 30, remaining: 25, latitude: 31.2460, longitude: 121.4880, accepted: 0 ,reward: "任务奖励21 50 经验值 + 30 金币",startTime: 1702956000,endTime: 1765466400},
  { id: 22, level: 4, name: "任务 22", description: "任务描述 22", condition: "完成调查", publisher: "系统", amount: 100, remaining: 90, latitude: 31.2440, longitude: 121.4840, accepted: 0 ,reward: "任务奖励22 50 经验值 + 30 金币",startTime: 1702956000,endTime: 1765466400},
  { id: 23, level: 10, name: "任务 23", description: "任务描述 23", condition: "推进任务", publisher: "玩家 P", amount: 50, remaining: 40, latitude: 31.2480, longitude: 121.4900, accepted: 0 ,reward: "任务奖励23 50 经验值 + 30 金币",startTime: 1702956000,endTime: 1765466400},
  { id: 24, level: 5, name: "任务 24", description: "任务描述 24", condition: "解锁新区域", publisher: "玩家 Q", amount: 60, remaining: 50, latitude: 31.2470, longitude: 121.4910, accepted: 0 ,reward: "任务奖励24 50 经验值 + 30 金币",startTime: 1702956000,endTime: 1765466400},
  { id: 25, level: 2, name: "任务 25", description: "任务描述 25", condition: "战斗行动", publisher: "系统", amount: 40, remaining: 30, latitude: 31.2465, longitude: 121.4865, accepted: 0 ,reward: "任务奖励25 50 经验值 + 30 金币",startTime: 1702956000,endTime: 1765466400},
];

module.exports = {
  tasks,
};

// id: 任务唯一标识符，用于区分任务
// level: 任务等级，数值越高表示任务难度或奖励越高
// name: 任务名称，用于显示在任务列表中
// description: 任务的详细描述，介绍任务内容
// condition: 完成任务的条件说明
// publisher: 任务的发布者，可以是系统或玩家
// amount: 任务的总数量，一共可以接取任务数量
// remaining: 任务的剩余数量，剩余可以接取的任务数量
// latitude: 任务的地理位置（纬度）
// longitude: 任务的地理位置（经度）
// accepted: 任务状态 0 - 未接任务 1 - 已接任务 2 - 已完成任务 3 - 任务失效
// startTime: 任务开始时间
// endTime: 任务结束时间
// reward: 任务奖励描述，具体内容可以是经验值、金币、道具等的描述