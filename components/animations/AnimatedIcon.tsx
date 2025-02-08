import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import React from "react";

interface AnimatedIconProps {
  icon: React.ReactNode;
  count: number;
  onClick?: () => void;
  isActive?: boolean;
  isShare?: boolean;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  icon,
  count,
  onClick,
  isActive = false,
  isShare = false,
}) => {
  return (
    <div
      className='flex items-center gap-x-2 cursor-pointer select-none'
      onClick={onClick}
    >
      <div className='relative'>
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className='absolute inset-0 bg-red-500 rounded-full'
            />
          )}
        </AnimatePresence>
        <motion.div
          animate={isShare ? { rotate: 360 } : {}}
          transition={isShare ? { duration: 0.5, ease: "easeInOut" } : {}}
          className={`relative z-10 ${
            isActive ? "text-white" : "text-gray-500"
          }`}
        >
          {
            // @ts-ignore
            isActive && icon?.type === Heart ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, type: "spring" }}
                className='h-6 w-6 flex flex-col items-center justify-center'
              >
                <Heart size={16} />
              </motion.div>
            ) : (
              icon
            )
          }
        </motion.div>
      </div>
      <span
        className={`text-sm ${isActive ? "text-red-500" : "text-gray-500"}`}
      >
        {count}
      </span>
    </div>
  );
};

export default AnimatedIcon;
