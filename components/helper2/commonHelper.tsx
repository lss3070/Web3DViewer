import {motion,AnimatePresence} from 'framer-motion'
import { MeshMode } from '../../interfaces/swr.interface';
import { useMeshSWR } from '../../swrs/mesh.swr';
import { TextHelper } from '../helper/common/textHelper';

interface CommonProps{
    openId?:number;
    setOpenId:Function;
}


const CommonHelper=({openId,setOpenId}:CommonProps)=>{

    const {meshState,setMeshMode}=useMeshSWR();
    const id=10;
    const toggleOpen = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        id===openId?setOpenId():setOpenId(id);
    }
    return(
        <motion.li
        transition={{
            layout:{
                duration:1,
                type:'spring'
            }
        }}
        style={{transition:`opacity 0.5s ease-in-out`}}
        className="border bg-gray-400 grid"
        initial={{ borderRadius: 10 }}>
            <div className='flex items-center justify-center h-9'>
                <div className=' w-full'>Common</div>
                <div className=' w-full flex justify-end mr-4 cursor-pointer'
                  onClick={toggleOpen} 
                >
                    V
                </div>
            </div>
                <AnimatePresence initial={false} >
                {openId===id && (
                  <motion.div
                  className=' bg-white h-full flex'
                  onClick={(e)=>{
                      e.stopPropagation()
                  }}
                  key="content"
                  initial='collapsed'
                  animate="open"
                  exit="collapsed"
                  variants={{
                      open: { opacity: 1, height: `auto` },
                      collapsed: { opacity: 0, height: 0 },
                      layout:{}
                  }}
                  transition={{
                      duration:0.5,
                       ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <TextHelper/>
                    <div
                    onClick={()=>setMeshMode(MeshMode.Wire)}
                    >wire button</div>
                    <div>point button</div>
                </motion.div>
                )}
                </AnimatePresence>
        </motion.li>
    )
}
export default CommonHelper