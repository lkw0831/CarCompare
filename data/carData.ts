import { CarComparison } from '../types/car';

export const carComparisonData: CarComparison[] = [
  {
    id: "df752f18-edaa-4a78-8103-a73a954437ed",
    name: "宝马X5",
    manufacturer: "宝马",
    energyType: "纯电动",
    launchDate: "",
    image: "",
    pureElectricRange: 0,
    maxPower: 286,
    acceleration: 8.0,
    electricityConsumption: 0.0,
    length: 4700,
    width: 1900,
    height: 1500,
    wheelbase: 2800,
    batteryType: "三元锂电池",
    batteryCellBrand: "宁德时代",
    batteryCapacity: 0,
    adLevel: "L2+",
    cockpitIntelligence: "高",
    ownerPrice: 63.9,
    rating: 8.0,
    review: "宝马X5是一款性能优秀的车型，值得考虑。",
  },
  {
    id: "53e5c332-93c3-47e5-9daa-dfc91b9291e8",
    name: "奔驰GLE",
    manufacturer: "奔驰",
    energyType: "纯电动",
    launchDate: "",
    image: "",
    pureElectricRange: 103,
    maxPower: 252,
    acceleration: 8.0,
    electricityConsumption: 0.0,
    length: 4700,
    width: 1900,
    height: 1500,
    wheelbase: 2800,
    batteryType: "三元锂电池",
    batteryCellBrand: "宁德时代",
    batteryCapacity: 0,
    adLevel: "L2+",
    cockpitIntelligence: "高",
    ownerPrice: 82.48,
    rating: 8.0,
    review: "奔驰GLE是一款性能优秀的车型，值得考虑。",
  }
];

export const getComparisonScenario = (spec: string, value: number, values: number[]): string => {
  switch (spec) {
    case 'pureElectricRange':
      const maxRange = Math.max(...values);
      const minRange = Math.min(...values);
      if (value === maxRange) {
        return `续航最长，可轻松应对跨城通勤，一周仅需充电1-2次`;
      } else if (value === minRange) {
        return `适合城市代步，建议家中安装充电桩`;
      }
      return `满足日常通勤需求，周末短途出行无压力`;
    
    case 'maxPower':
      const maxPower = Math.max(...values);
      if (value === maxPower) {
        return `动力最强，高速超车游刃有余，驾驶乐趣十足`;
      }
      return `动力充沛，日常驾驶完全够用`;
    
    case 'acceleration':
      const minAccel = Math.min(...values);
      if (value === minAccel) {
        return `加速最快，推背感强烈，运动性能出众`;
      }
      return `加速平顺，兼顾舒适与性能`;
    
    case 'length':
      const maxLength = Math.max(...values);
      if (value === maxLength) {
        return `车身最长，内部空间宽敞，乘坐舒适性佳`;
      }
      return `尺寸适中，城市驾驶灵活便捷`;
    
    case 'wheelbase':
      const maxWheelbase = Math.max(...values);
      if (value === maxWheelbase) {
        return `轴距最长，后排腿部空间充裕，乘坐体验优秀`;
      }
      return `轴距合理，操控稳定性好`;
    
    case 'batteryCapacity':
      const maxCapacity = Math.max(...values);
      if (value === maxCapacity) {
        return `电池容量最大，续航更有保障`;
      }
      return `电池容量适中，满足日常使用`;
    
    default:
      return '';
  }
};
