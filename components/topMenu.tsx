
import FileManager from './fileManager';
import MenuManager from "./menuManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Eye from '../public/eye.svg'
import { useCommonSWR } from '../swrs/common.swr';
import RightMenuManager from "./rightMenuManager";
import useIsMobile from '../hooks/useIsMobile';

export const TopMenu=()=>{

    const isMobile = useIsMobile()
    const {commonState}=useCommonSWR()


    return(
            <div className=" w-full grid grid-cols-7 h-full gap-5
            bg-white
            dark:bg-[#3d3e42]
            ">
                <div className="flex col-span-1 items-center justify-center
                ">
                    Web 3D Viewer
                </div>
                <div className=" col-span-5 flex gap-5">
                    <FileManager/>
                    {!isMobile&&commonState?.fileLoad&&(
                        <MenuManager/>
                    )}
                </div>
                <div className="flex col-span-1 items-center justify-end mr-4
                text-gray-600 dark:text-white
                ">
                    <RightMenuManager/>
                </div>
            </div>
    )
}