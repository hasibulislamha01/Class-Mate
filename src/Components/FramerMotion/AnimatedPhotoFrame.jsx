import { motion } from 'framer-motion';
import PropTypes from 'prop-types'

const AnimatedPhotoFrame = ({ src, alt }) => {
  return (
    <div className="h-[250px] w-[250px] relative flex items-center justify-center">
      {/* Image */}
      <img src={src} alt={alt} className="rounded-full" />

      {/* Animated Pulsing Circle 1 */}
      <motion.div
        className="h-[250px] w-[250px] absolute top-[0%] right-0 border-2  border-blue-600 rounded-full"
        initial={{ 
          scale: 1, opacity: 0 
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 0, 0.5],
      }}
      transition={{
        duration: 2.25,
        ease: 'easeInOut',
        repeat: Infinity,
      }}
      />
      
    </div>
  );
};


AnimatedPhotoFrame.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string
}
export default AnimatedPhotoFrame;
