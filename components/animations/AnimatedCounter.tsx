import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface AnimatedCounterProps {
  count: number;
  isActive: boolean;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  count,
  isActive,
}) => {
  return (
    <div className='relative h-5 overflow-hidden'>
      <AnimatePresence initial={false}>
        <motion.span
          key={count}
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          exit={{ y: -20 }}
          transition={{ duration: 0.3 }}
          className={`absolute ${isActive ? "text-red-500" : "text-white"}`}
        >
          {count}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedCounter;
