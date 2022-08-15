
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircleButton from "../../components/common/circle-button";
import { Dispatch, SetStateAction } from 'react';
import useFileStore from '../../store/file.store';

interface IGuideProps{
    setLoadingComplete: Dispatch<SetStateAction<boolean>>;
}

const Guide=({setLoadingComplete}:IGuideProps)=>{

    const setFileInfo = useFileStore((state)=>state.setFileInfo)
   
    const openFile=(path:string)=>{
        const fullName = path.split('/').pop();
        const fileName=fullName?.split('.').shift();
        const extension = fullName?.split('.').pop();

        setLoadingComplete(false)
        fetch('https://web3dviewer_worker.lss3070.workers.dev/'+path).then(async(file)=>{
            return await file.blob()
        }).then((blob)=>{
            
            const fileMap=new Map<string,File>();
            const objectURL= URL.createObjectURL(blob);

            const file=new File([blob],fullName!);
            fileMap.set(fullName!,file);
            setFileInfo({
                originPath:objectURL!,
                originExtension:extension!,
                originName:fileName!,
                fileMap:fileMap!
            })
        }).catch((err)=>{
            console.log(err);
            setLoadingComplete(true)
        })
    }
    
    return(
        <div className="grid w-full
        space-y-4
        text-gray-600 
        dark:text-white">
            <div className=" 
            text-center
            text-2xl
            min-w-[300px]
             font-bold
             select-none
             ">
                Drag and Drop your 3D model here
            </div>
            <div className='text-center text-base font-normal
            text-gray-500 dark:text-[#bdbdbd] 
            '>
                FBX,OBJ,GLTF,PLY,STL fromats can be loaded</div>
                <div className="
                flex 
                items-center 
                justify-center
                 text-base
                 select-none
                " >
                    Example Models
                </div>
                <div className="flex space-x-3 items-center justify-center">
                    <CircleButton onClick={()=>openFile('tree/tree.obj')}>
                        <FontAwesomeIcon
                        icon={['fas','tree']}
                        size='2x'
                        />
                    </CircleButton>
                    <CircleButton onClick={()=>openFile('helmet/DamagedHelmet.glb')}>
                        <FontAwesomeIcon
                        icon={['fas','helmet-safety']}
                        size='2x'
                        />
                    </CircleButton>
                    {/* <CircleButton onClick={()=>openFile('mannequin/Samba_Dancing.fbx')}>
                        <FontAwesomeIcon
                        icon={['fas','person']}
                        size='2x'
                        />
                    </CircleButton> */}
                    <CircleButton onClick={()=>openFile('Flamingo.glb')}>
                        <FontAwesomeIcon
                        icon={['fas','dove']}
                        size='2x'
                        />
                    </CircleButton>
                </div>
            </div>
    )
}

  
export default Guide;