import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Front from '../assets/cube-front.svg'
import Back from '../assets/cube-back.svg'
import Left from '../assets/cube-left.svg'
import Right from '../assets/cube-right.svg'
import Top from '../assets/cube-top.svg'
import Down from '../assets/cube-down.svg'
const CameraPosition=()=>{
    return(
        <div className="
        absolute top-[5%] left-[15%] w-auto h-10
        flex gap-1">
            <div className='w-8 cursor-pointer'>
                <Front/>
            </div>
            <div className='w-8 cursor-pointer'>
                <Back/>
            </div>
            <div className='w-8 cursor-pointer'>
                <Left/>
            </div>
            <div className='w-8 cursor-pointer'>
                <Right/>
            </div>
            <div className='w-8 cursor-pointer'>
                <Top/>
            </div>
            <div className='w-8 cursor-pointer'>
                <Down/>
            </div>
    
             {/* <FontAwesomeIcon
                icon={['fas','angle-up']}
                className="w-10 h-10 "/>
            <FontAwesomeIcon
                icon={['fas','angle-up']}
                className="w-10 h-10 "/>
             <FontAwesomeIcon
                icon={['fas','angle-up']}
                className="w-10 h-10 "/>
             <FontAwesomeIcon
                icon={['fas','angle-up']}
                className="w-10 h-10 "/> */}
        </div>
    )
}
export default CameraPosition;