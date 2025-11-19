import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { CarComparison, CarSpec } from '../types/car';
import SpecItem from './SpecItem';
import ImageGallery from './ImageGallery';
import ParamModal from './ParamModal';
import { getComparisonScenario } from '../data/mock';

interface ModelCardProps {
  car: CarComparison;
  allCars: CarComparison[];
  index: number;
}

export default function ModelCard({ car, allCars, index }: ModelCardProps) {
  const [hoveredSpec, setHoveredSpec] = useState<string | null>(null);
  const [selectedSpec, setSelectedSpec] = useState<CarSpec | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const getSpecValue = (key: keyof CarComparison): number | undefined => {
    const value = car[key];
    return typeof value === 'number' ? value : undefined;
  };

  const createSpec = (label: string, value: string | number, key?: string): any => {
    const spec: any = { label, value };
    
    if (key && typeof value === 'number') {
      const allValues = allCars.map(car => getSpecValue(key as keyof CarComparison)).filter(v => v !== undefined) as number[];
      const scenario = getComparisonScenario(key, value, allValues);
      if (scenario) {
        spec.context = {
          description: `当前数值：${value}${getUnit(label)}`,
          scenario
        };
      }
    }
    
    return spec;
  };

  const getUnit = (label: string): string => {
    if (label.includes('续航')) return 'km';
    if (label.includes('马力')) return 'PS';
    if (label.includes('加速')) return 's';
    if (label.includes('油耗')) return 'L/100km';
    if (label.includes('电耗')) return 'kWh/100km';
    if (label.includes('长') || label.includes('宽') || label.includes('高') || label.includes('轴距')) return 'mm';
    if (label.includes('容量')) return 'kWh';
    if (label.includes('价格')) return '万元';
    return '';
  };

  const specs = [
    createSpec('厂商', car.manufacturer),
    createSpec('能源类型', car.energyType),
    createSpec('上市时间', car.launchDate),
    ...(car.pureElectricRange ? [createSpec('纯电续航', `${car.pureElectricRange}km`, 'pureElectricRange')] : []),
    createSpec('最大马力', `${car.maxPower}PS`, 'maxPower'),
    createSpec('百公里加速', `${car.acceleration}s`, 'acceleration'),
    ...(car.fuelConsumption ? [createSpec('百公里油耗', `${car.fuelConsumption}L`)] : []),
    ...(car.electricityConsumption ? [createSpec('百公里电耗', `${car.electricityConsumption}kWh`)] : []),
    createSpec('长宽高', `${car.length}×${car.width}×${car.height}mm`, 'length'),
    createSpec('轴距', `${car.wheelbase}mm`, 'wheelbase'),
    ...(car.batteryType ? [createSpec('电池类型', car.batteryType)] : []),
    ...(car.batteryCellBrand ? [createSpec('电芯品牌', car.batteryCellBrand)] : []),
    ...(car.batteryCapacity ? [createSpec('电池容量', `${car.batteryCapacity}kWh`, 'batteryCapacity')] : []),
    ...(car.adLevel ? [createSpec('辅助驾驶级别', car.adLevel)] : []),
    ...(car.cockpitIntelligence ? [createSpec('座舱智能化', car.cockpitIntelligence)] : []),
    createSpec('车主价格', `${car.ownerPrice}万元`),
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="relative group"
    >
      <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
        {/* 顶部渐变条 */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 group-hover:opacity-100 transition-opacity" />
        
        {/* 车型图片画廊 */}
        <div className="relative">
          <ImageGallery 
            images={[
              'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop',
              'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
              'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop',
              'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400&h=300&fit=crop'
            ]}
            mainImage={car.image}
            alt={car.name}
          />
          
          {/* 评分徽章 */}
          <div className="absolute top-4 right-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              {car.rating.toFixed(1)}分
            </div>
          </div>
        </div>
        
        {/* 车型信息 */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{car.name}</h3>
          <p className="text-sm text-gray-600 mb-4">{car.manufacturer} · {car.energyType}</p>
          
          {/* 参数列表 */}
          <div className="divide-y divide-gray-200">
            {specs.map((spec, specIndex) => (
              <SpecItem
                key={specIndex}
                spec={spec}
                isActive={hoveredSpec === `${index}-${specIndex}`}
                onHover={() => setHoveredSpec(`${index}-${specIndex}`)}
                onLeave={() => setHoveredSpec(null)}
                onClick={() => {
                  if (spec.context) {
                    setSelectedSpec(spec);
                    setIsModalOpen(true);
                  }
                }}
              />
            ))}
          </div>
          
          {/* 参数详情弹窗 */}
          <ParamModal
            spec={selectedSpec}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
          
          {/* 综合评价 */}
          <motion.div 
            className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100"
            whileHover={{ scale: 1.02 }}
          >
            <h4 className="text-sm font-semibold text-gray-700 mb-2">综合评价</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{car.review}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}