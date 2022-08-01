
import { useCommonSWR } from '../../swrs/common.swr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircleButton from "../../components/common/circle-button";

const Guide=()=>{
    const {commonState,setFiltPath}=useCommonSWR();

    const openTree=()=>{
        fetch(process.env.NEXT_PUBLIC_ENV_TREE!).then(async(file)=>{
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
        fetch(process.env.NEXT_PUBLIC_ENV_HELMET!).then(async(file)=>{
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
    //    Promise.all([
    //         fetch(process.env.NEXT_PUBLIC_ENV_TREE_HELMET_BIN!),
    //         fetch(process.env.NEXT_PUBLIC_ENV_TREE_HELMET_GLTF!),
    //         fetch(process.env.NEXT_PUBLIC_ENV_TREE_HELMET_ALBEDO!),
    //         fetch(process.env.NEXT_PUBLIC_ENV_TREE_HELMET_AO!),
    //         fetch(process.env.NEXT_PUBLIC_ENV_TREE_HELMET_EMISSIVE!),
    //         fetch(process.env.NEXT_PUBLIC_ENV_TREE_HELMET_METALROUGHNESS!),
    //         fetch(process.env.NEXT_PUBLIC_ENV_TREE_HELMET_NORMAL!)
    //     ]).then(async(result)=>{
    //         return [
    //             await result[0].blob(),
    //             await result[1].blob(),
    //             await result[2].blob(),
    //             await result[3].blob(),
    //             await result[4].blob(),
    //             await result[5].blob(),
    //             await result[6].blob()
    //         ]
    //     }).then(result=>{
    //         console.log(result);

    //         const fileMap = new Map<string,File>();
     
    //         fileMap.set('DamagedHelmet.bin'
    //         ,new File([result[0]],'DamagedHelmet.bin'));
    //         fileMap.set('DamagedHelmet.gltf'
    //         ,new File([result[1]],'DamagedHelmet.gltf'));
    //         fileMap.set('Default_albedo.jpg'
    //         ,new File([result[2]],'Default_albedo.jpg'));
    //         fileMap.set('Default_AO.jpg'
    //         ,new File([result[3]],'Default_AO.jpg'));
    //         fileMap.set('Default_emissive.jpg'
    //         ,new File([result[4]],'Default_emissive.jpg'));
    //         fileMap.set('Default_metalRoughness.jpg'
    //         ,new File([result[5]],'Default_metalRoughness.jpg'));
    //         fileMap.set('Default_normal.jpg'
    //         ,new File([result[6]],'Default_normal.jpg'));

    //         const objectURL= URL.createObjectURL(result[1]);

    //         setFiltPath({
    //             originPath:objectURL!,
    //             originExtension:'gltf',
    //             originName:'helmet',
    //             fileMap:fileMap!
    //         })
    //     })
    }

    const openMannequin=()=>{
        fetch(process.env.NEXT_PUBLIC_ENV_MANNEQUIN!).then(async(file)=>{
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