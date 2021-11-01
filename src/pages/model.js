import React, {useState, useEffect} from "react";
import ScrollForMore from "../components/scrollForMore";
import {motion, useViewportScroll, useTransform} from 'framer-motion';


const Model = ({imageDetails}) => {

  const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };

  const listOfColors = ['#1e1f13', '#ffbcd9']

  const {scrollYProgress} = useViewportScroll()
  const scale = useTransform(scrollYProgress, [0,1], [1, 1.15])
  const color = useTransform(scrollYProgress, [0,0.2], listOfColors)

  const firstName = {
    initial: {
      opacity: 1,
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6,
        staggerDirection: -1,
      }
    }
  }

  const lastName = {
    initial: {
      opacity: 1,
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6,
        staggerDirection: 1,
      }
    }
  }

  const letter = {
    initial: {
      y: 400,
    },
    animate: {
      y: 0,
      transition: {duration: 1, ...transition}
    }
  }
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    if(canScroll === false) {
      document.querySelector("body").classList.add("no-scroll")
    }
    else {
      document.querySelector("body").classList.remove("no-scroll")
    }
  }, [canScroll])

  return (
    <motion.div className='single'
      initial='initial'
      animate='animate'
      exit='exit'>
      <div className='container fluid'>
        <div className='row center top-row'>
          <div className='top'>
            <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0, transition:{delay: 1.3, ...transition}}}className='details'>
              <div className='location'>
                <span>28.538336</span>
                <span>-81.379234</span>
              </div>
              <div className='mua'>MUA: @mylifeascrystall</div>
            </motion.div>
            <motion.div className='model'>
              <motion.span variants={firstName} initial='initial' animate='animate' className='first'>
                <motion.span variants={letter}>Y</motion.span>
                <motion.span variants={letter}>a</motion.span>
                <motion.span variants={letter}>s</motion.span>
                <motion.span variants={letter}>m</motion.span>
                <motion.span variants={letter}>e</motion.span>
                <motion.span variants={letter}>e</motion.span>
                <motion.span variants={letter}>n</motion.span>
              </motion.span>
              <motion.span variants={lastName} initial='initial' animate='animate' className='last'>
                <motion.span variants={letter} >T</motion.span>
                <motion.span variants={letter} >a</motion.span>
                <motion.span variants={letter} >r</motion.span>
                <motion.span variants={letter} >i</motion.span>
                <motion.span style={{color: color}} variants={letter} >q</motion.span>
              </motion.span>
            </motion.div>
          </div>
        </div>
        <div className='row bottom-row'>
          <div className='bottom'>
            <div className='image-container-single'>
              <motion.div className='thumbnail-single'
                initial={{
                  height: imageDetails.height,
                  width: imageDetails.width,
                  y: '-50%'
                }}
                animate={{
                  y:'0',
                  width: '100%',
                  height: window.innerWidth > 1440 ? 800 : 400,
                  transition: {delay: 0.2,...transition}
                }}
                onAnimationComplete={() => setCanScroll(true)}
              >
                <div className='frame-single'>
                  <motion.img 
                  initial={{scale: 1}}
                  animate={{
                    y: window.innerWidth > 1440 ? -1000 : -600,
                    transition: {delay: 0.2,...transition}
                    }}
                    src={require("../images/yasmeen.webp")} alt='an image' style={{scale: scale}}/>
                </div>
              </motion.div>
            </div>
          </div>
          <ScrollForMore />
        </div>
      </div>
      <div className='detailed-information'> {/* This adds margin from the picture  */}
      </div>
    </motion.div>
  );
};

export default Model;
