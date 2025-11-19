import { CarComparison } from '../types/car';

export const mockCars: CarComparison[] = [
  {
    id: '1',
    name: '极氪7x',
    manufacturer: '极氪',
    energyType: '纯电动',
    launchDate: '2024-09',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop',
    pureElectricRange: 605,
    maxPower: 422,
    acceleration: 5.8,
    electricityConsumption: 14.8,
    length: 4825,
    width: 1930,
    height: 1656,
    wheelbase: 2925,
    batteryType: '三元锂电池',
    batteryCellBrand: '宁德时代',
    batteryCapacity: 100,
    adLevel: 'L2+',
    cockpitIntelligence: '高',
    ownerPrice: 25.99,
    rating: 8.7,
    review: '空间宽敞，续航扎实，智能化配置丰富，家庭用车首选'
  },
  {
    id: '2',
    name: '岚图知音',
    manufacturer: '岚图',
    energyType: '纯电动',
    launchDate: '2024-10',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
    pureElectricRange: 625,
    maxPower: 435,
    acceleration: 4.5,
    electricityConsumption: 13.9,
    length: 4725,
    width: 1900,
    height: 1636,
    wheelbase: 2900,
    batteryType: '三元锂电池',
    batteryCellBrand: '宁德时代',
    batteryCapacity: 109,
    adLevel: 'L2+',
    cockpitIntelligence: '高',
    ownerPrice: 23.99,
    rating: 8.6,
    review: '续航出色，底盘调校优秀，驾驶质感好，性价比高'
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