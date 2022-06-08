import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const CameraPosition=()=>{
    return(
        <div className=" border
        absolute top-[8%] left-[15%] w-72 h-10
        flex gap-5">
             <FontAwesomeIcon
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
                className="w-10 h-10 "/>
        </div>
    )
}
export default CameraPosition;