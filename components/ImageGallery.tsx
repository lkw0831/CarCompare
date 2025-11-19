'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  mainImage: string;
  alt: string;
}

export default function ImageGallery({ images, mainImage, alt }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const allImages = [mainImage, ...images];

  const openLightbox = (image: string) => {
    const index = allImages.indexOf(image);
    setCurrentImageIndex(index);
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: number) => {
    const newIndex = currentImageIndex + direction;
    if (newIndex >= 0 && newIndex < allImages.length) {
      setCurrentImageIndex(newIndex);
      setSelectedImage(allImages[newIndex]);
    }
  };

  return (
    <div className="w-full">
      {/* 主图片 */}
      <div className="relative h-48 md:h-64 overflow-hidden cursor-pointer group">
        <img 
          src={mainImage} 
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onClick={() => openLightbox(mainImage)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        
        {/* 点击查看提示 */}
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          点击查看大图
        </div>
      </div>
      
      {/* 缩略图网格 */}
      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-1 mt-2">
          {images.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className="relative aspect-video overflow-hidden cursor-pointer rounded-lg border-2 border-transparent hover:border-blue-400 transition-all"
              onClick={() => openLightbox(image)}
            >
              <img 
                src={image} 
                alt={`${alt} ${index + 2}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      )}

      {/* 图片遮罩 */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <div className="relative max-w-5xl max-h-screen p-4" onClick={(e) => e.stopPropagation()}>
              {/* 关闭按钮 */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* 图片 */}
              <motion.img
                key={selectedImage}
                src={selectedImage}
                alt={alt}
                className="max-w-full max-h-full object-contain"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* 左右导航箭头 */}
              {currentImageIndex > 0 && (
                <button
                  onClick={() => navigateImage(-1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 rounded-full p-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {currentImageIndex < allImages.length - 1 && (
                <button
                  onClick={() => navigateImage(1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 rounded-full p-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

              {/* 图片计数 */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {allImages.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}