import { motion } from 'framer-motion';

const EnhancedAnimation = ({ src }) => {
  return (
    <div className="h-[250px] w-[250px] relative border border-green-700 flex items-center justify-center">
      {/* Image */}
      <img src={src} alt="" className="rounded-full" />

      {/* Animated Pulsing Circle 1 */}
      <motion.div
        className="h-[250px] w-[250px] absolute top-[0%] right-0 border-2 border-dashed border-blue-600 rounded-full"
        initial={{ scale: 0.8, opacity: 1 }}
        animate={{
          scale: 1.2,
          opacity: 0,
          rotate: [0, 360], // Optional: add rotation for extra dynamic motion
        }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      />

      {/* Animated Pulsing Circle 2 */}
      {/* <motion.div
        className="h-[250px] w-[250px] absolute top-[0%] right-0 border border-blue-600 rounded-full"
        initial={{ 
            scale: 1, opacity: 1 
        }}
        animate={{
          scale: 1.4,
          opacity: 0,
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      /> */}

      {/* Animated Pulsing Circle 3 */}
      {/* <motion.div
        className="h-[250px] w-[250px] absolute top-[0%] right-0 border border-yellow-600 rounded-full"
        initial={{ scale: 1, opacity: 1 }}
        animate={{
          scale: 2.2,
          opacity: 0,
        }}
        transition={{
          duration: 4,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      /> */}
    </div>
  );
};

export default EnhancedAnimation;
