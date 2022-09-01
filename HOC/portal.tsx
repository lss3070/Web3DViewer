import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Portal=({children})=>{
  const [element,setElement]=useState<HTMLElement|null>(null);

  useEffect(()=>{
    setElement(document.getElementById('portal'))
  },[])

  if(!element){
    return <></>
  }

   
  return ReactDOM.createPortal(children,element)
}
export default Portal;