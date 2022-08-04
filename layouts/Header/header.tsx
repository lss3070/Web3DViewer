
import FileManager from './fileManager';
import MenuManager from "./menuManager";
import { useCommonSWR } from '../../swrs/common.swr';
import SettingManager from "./settingManager";
import useIsMobile from '../../hooks/useIsMobile';

const Header=()=>{

    const isMobile = useIsMobile()
    const {commonState}=useCommonSWR()


    return(
            <div className="w-full grid grid-cols-7 h-full space-x-3
            bg-white
            dark:bg-[#3d3e42]">
                <div className="flex col-span-1 items-center justify-center
                dark:text-white text-gray-500 font-bold
                ">
                    Web 3D Viewer
                </div>
                <div className=" col-span-5 space-x-3 flex items-center ">
                    <FileManager/>
                    {!isMobile&&commonState?.fileLoad&&(
                        <MenuManager/>
                    )}
                </div>
                <div className="flex col-span-1 items-center justify-end mr-4
                text-gray-600 dark:text-white
                ">
                    <SettingManager/>
                </div>
            </div>
    )
}

export default Header