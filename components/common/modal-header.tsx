import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IModalHeader{
    children:JSX.Element|JSX.Element[]
    onClose:()=>void;
}

const ModalHeader=({children,onClose}:IModalHeader)=>{
    return(
        <div className='w-full flex items-center justify-center h-12'>
        {children}
        <div className='w-full flex justify-end'>
            <FontAwesomeIcon
                onClick={onClose}
                icon={['fas','xmark']}
                size="lg"
                className="cursor-pointer"/>
        </div>
    </div>
    )
}

export default ModalHeader;