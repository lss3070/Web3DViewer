import { useEffect, useRef, useState } from "react";

interface IModalPortal{
    children:JSX.Element;
    closePortal:Function;
}

const ModalPortal=({children,closePortal}:IModalPortal)=>{

    const [element, setElement] = useState<HTMLElement | null>(null);
    
    useEffect(()=>{
        setElement(document.getElementById('portal'));
      },[]);
    ​

   
    return(
        <div></div>
    )
}

export default ModalPortal