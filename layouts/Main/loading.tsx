
import {motion} from 'framer-motion';

const LoadingComponent=()=>{
    const loadingCircleTransition = {
        duration: 0.5,
        yoyo: Infinity,
        ease: "easeInOut",
      }
    const loadingCircleVariants = {
        start: {
         top:'150px',
          height:'10px'
          // y: "0%",
        },
        end: {
          top:'0px',
          height:'150px'
          // y: "100%",
        },
      }
    const loadingContainerVariants = {
        start: {
          transition: {
            staggerChildren: 0.9,
          },
        },
        end: {
          transition: {
            staggerChildren: 0.9,
          },
        },
      }

      const loadingContainer = {
        
        width: "auto",
        height: "2rem",
        display: "contents",
        justifyContent: "space-around"
      };
      const loadingCircle = {
        display: "block",
        marginLeft:'10px',
        width: "1rem",
        height: "2rem",
        backgroundColor: "black",
        borderRadius: "10px",
      };
      

    return(
        <div className='w-full h-full absolute top-0 left-0 flex 
        items-center 
        justify-center
        bg-[#000000]/30
        z-50
       '>
         <div className='grid gap-5'>
         <motion.div className='flex 
          h-32 items-center justify-center
         '
         >

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
          </motion.div>
          <div className='text-2xl text-black dark:text-white text-center'>
              Loading
            </div>
         </div>
         
       </div>
    )
}
export default LoadingComponent