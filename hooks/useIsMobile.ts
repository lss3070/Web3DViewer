import { debounce } from "lodash";
import {useState, useLayoutEffect } from 'react';
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";


const useIsMobile=()=>{
    const [isMobile,setIsMobile]=useState<boolean>(false);

    useIsomorphicLayoutEffect(() => {
        const updateSize = (): void => {
          setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', debounce(updateSize, 100));
        updateSize();
        return (): void => window.removeEventListener('resize', updateSize);
      }, []);
    
    return isMobile;
}

export default useIsMobile;