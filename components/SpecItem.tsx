import { motion } from 'framer-motion';
import { CarSpec } from '../types/car';

interface SpecItemProps {
  spec: CarSpec;
  isActive?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
  onClick?: () => void;
}

export default function SpecItem({ spec, isActive, onHover, onLeave, onClick }: SpecItemProps) {
  const handleClick = () => {
    if (spec.context && onClick) {
      onClick();
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <motion.div
        className="group relative py-2 md:py-3 border-b border-gray-200 last:border-b-0 transition-all duration-300 hover:bg-white/30"
        whileHover={{ scale: 1.01 }}
        onHoverStart={onHover}
        onHoverEnd={onLeave}
      >
        <div className="mb-1.5">
          <span className="block text-[11px] md:text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">{spec.label}</span>
          <span className="block text-lg md:text-xl font-bold text-gray-900 leading-snug">{spec.value}</span>
        </div>
        
        {spec.context && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ 
              opacity: isActive ? 1 : 0, 
              y: isActive ? 0 : -8
            }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`${isActive ? 'mt-1.5' : 'mt-0'}`}
          >
            <div className="p-2 md:p-2.5 bg-gradient-to-r from-blue-50/40 to-purple-50/40 rounded-md border-l-4 border-blue-400">
              <p className="text-xs text-gray-700 leading-relaxed">{spec.context.description}</p>
              {spec.context.scenario && (
                <p className="text-[11px] text-blue-600 mt-1 italic leading-relaxed">{spec.context.scenario}</p>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}