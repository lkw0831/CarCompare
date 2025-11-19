export interface CarComparison {
  id: string;
  name: string;
  manufacturer: string;
  energyType: '纯电动' | '插电混动' | '增程式' | '燃油';
  launchDate: string;
  image: string;
  
  // 性能参数
  pureElectricRange?: number; // 纯电续航 (km)
  maxPower: number; // 最大马力 (PS)
  acceleration: number; // 百公里加速 (s)
  fuelConsumption?: number; // 百公里油耗 (L)
  electricityConsumption?: number; // 百公里电耗 (kWh)
  
  // 尺寸参数
  length: number; // 长 (mm)
  width: number; // 宽 (mm)
  height: number; // 高 (mm)
  wheelbase: number; // 轴距 (mm)
  
  // 电池参数
  batteryType?: string; // 电池类型
  batteryCellBrand?: string; // 电芯品牌
  batteryCapacity?: number; // 电池容量 (kWh)
  
  // 智能化
  adLevel?: string; // 辅助驾驶级别
  cockpitIntelligence?: string; // 座舱智能化等级
  
  // 价格和评价
  ownerPrice: number; // 车主价格 (万元)
  rating: number; // 综合评分 (0-10)
  review: string; // 综合评价
}

export interface ComparisonContext {
  value: string | number;
  description: string;
  scenario?: string; // 场景化描述
}

export interface CarSpec {
  label: string;
  value: string | number;
  context?: ComparisonContext;
}
