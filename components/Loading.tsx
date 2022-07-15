
import {motion} from 'framer-motion';

const LoadingComponent=()=>{
    const loadingCircleTransition = {
        duration: 0.5,
        yoyo: Infinity,
        ease: "easeInOut",
      }
    const loadingCircleVariants = {
        start: {
          y: "0%",
        },
        end: {
          y: "100%",
        },
      }
    const loadingContainerVariants = {
        start: {
          transition: {
            staggerChildren: 0.2,
          },
        },
        end: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }

      const loadingContainer = {
        width: "4rem",
        height: "2rem",
        display: "flex",
        justifyContent: "space-around"
      };
      const loadingCircle = {
        display: "block",
        width: "1rem",
        height: "1rem",
        backgroundColor: "black",
        borderRadius: "50%"
      };
      

    return(
        <div className='w-full h-full absolute top-0 left-0 flex 
        items-center 
        justify-center
        bg-[#000000]/30
        z-50
       '>
         <div className=' text-2xl text-black dark:text-white'>
           Loading
         </div>
            <motion.div
            style={loadingContainer}
            variants={loadingContainerVariants}
            initial="start"
            animate="end"
            >
            <motion.span
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
            />
            <motion.span
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
            />
            <motion.span
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
            />
            </motion.div>
       </div>
    )
}
export default LoadingComponent