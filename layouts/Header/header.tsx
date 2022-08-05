
import FileManager from './fileManager';
import MenuManager from "./menuManager";
import { useCommonSWR } from '../../swrs/common.swr';

import useIsMobile from '../../hooks/useIsMobile';
import SettingManager from './settingManager';

const Header=()=>{

    const isMobile = useIsMobile()
    const {commonState}=useCommonSWR()


    return(
            <div className="w-full block space-x-3
            bg-white
            dark:bg-[#3d3e42] ">
                <div className="flex float-left h-full items-center select-none
                dark:text-white text-gray-500 font-bold justify-start pl-2 
                 
                ">
                    <img src='test.png' className='w-10'/>
                    <span>Web 3D Viewer</span>
                </div>
                <div className={`${isMobile?`float-right pr-2`:`float-left`} h-full  space-x-3 flex items-center `}>
                    <FileManager/>
                    {!isMobile&&commonState?.fileLoad&&(
                        <MenuManager/>
                    )}
                </div>
                {!isMobile&&(
                    <div className="h-full float-right flex items-center justify-end
                    text-gray-600 dark:text-white">
                        <SettingManager/>
                    </div>
                )}
               
            </div>
    )
}

export default Header