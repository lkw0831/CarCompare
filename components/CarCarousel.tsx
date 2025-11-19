'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import ModelCard from './ModelCard';
import { CarComparison } from '../types/car';

interface CarCarouselProps {
  cars: CarComparison[];
}

export default function CarCarousel({ cars }: CarCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const visibleCars = cars.slice(currentIndex, currentIndex + 2);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < cars.length - 2;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const newIndex = prev + newDirection;
      if (newIndex < 0) return 0;
      if (newIndex > cars.length - 2) return cars.length - 2;
      return newIndex;
    });
  };

  return (
    <div className="relative px-1 md:px-4">
      {/* 车型网格 */}
      <div className="grid grid-cols-2 gap-1 md:gap-4 max-w-7xl mx-auto">
        <AnimatePresence mode="wait" custom={direction}>
          {visibleCars.map((car, index) => (
            <motion.div
              key={`${car.id}-${currentIndex}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="h-full"
            >
              <ModelCard car={car} allCars={cars} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 左右箭头按钮 */}
      {hasPrev && (
        <button
          onClick={() => paginate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-lg rounded-full p-3 shadow-lg border border-white/50 hover:bg-white transition-all z-10"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {hasNext && (
        <button
          onClick={() => paginate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-lg rounded-full p-3 shadow-lg border border-white/50 hover:bg-white transition-all z-10"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* 页码指示器 */}
      <div className="flex justify-center mt-6 space-x-2">
        {cars.slice(0, -1).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-blue-500 w-8'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}