
import { useCommonSWR } from '../../swrs/common.swr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircleButton from "../../components/common/circle-button";

const Guide=()=>{
    const {commonState,setFiltPath}=useCommonSWR();

    const openTree=()=>{
        fetch('https://web3dviewer_worker.lss3070.workers.dev/tree/tree.obj').then(async(file)=>{
            return await file.blob()
        }).then((blob)=>{
            
            const fileMap=new Map<string,File>();
            const objectURL= URL.createObjectURL(blob);

            const file=new File([blob],'tree.obj');
            fileMap.set('tree.obj',file);
            setFiltPath({
                originPath:objectURL!,
                originExtension:'obj',
                originName:'tree',
                fileMap:fileMap!
            })
        })
    }

    const openHelmet=()=>{
        fetch('https://web3dviewer_worker.lss3070.workers.dev/helmet/DamagedHelmet.glb').then(async(file)=>{
            return await file.blob()
        }).then((blob)=>{
            
            const fileMap=new Map<string,File>();
            const objectURL= URL.createObjectURL(blob);

            const file=new File([blob],'DamagedHelmet.glb');
            fileMap.set('DamagedHelmet.glb',file);
            setFiltPath({
                originPath:objectURL!,
                originExtension:'glb',
                originName:'DamagedHelmet',
                fileMap:fileMap!
            })
        })
    }

    const openMannequin=()=>{
        fetch('https://web3dviewer_worker.lss3070.workers.dev/mannequin/Samba_Dancing.fbx').then(async(file)=>{
            return await file.blob()
        }).then((blob)=>{
            
            const fileMap=new Map<string,File>();
            const objectURL= URL.createObjectURL(blob);

            const file=new File([blob],'Samba_Dancing.fbx');
            fileMap.set('Samba_Dancing.fbx',file);
            setFiltPath({
                originPath:objectURL!,
                originExtension:'fbx',
                originName:'Samba_Dancing',
                fileMap:fileMap!
            })
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
             font-bold">
                Drag and Drop your 3D model here
            </div>
                <div className="
                flex 
                items-center 
                justify-center
                 text-base
                " >
                    Example Models
                </div>
                <div className="flex space-x-3 items-center justify-center">
                    <CircleButton onClick={openTree}>
                        <FontAwesomeIcon
                        icon={['fas','tree']}
                        size='2x'
                        />
                    </CircleButton>
                    <CircleButton onClick={openHelmet}>
                        <FontAwesomeIcon
                        icon={['fas','helmet-safety']}
                        size='2x'
                        />
                    </CircleButton>
                    <CircleButton onClick={openMannequin}>
                        <FontAwesomeIcon
                        icon={['fas','person']}
                        size='2x'
                        />
                    </CircleButton>
                </div>
            </div>
    )
}

  
export default Guide;