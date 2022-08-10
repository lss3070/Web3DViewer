import { useEffect } from "react"

const DeleteKeyPress=(event:Function)=>{

    const downHandler = ({ key }) => {
   
        if (key === 'Backspace') event()
      };

      useEffect(()=>{
        window.addEventListener('keydown',downHandler)

        return()=>{
            window.removeEventListener('keydown',downHandler)
        }
      },[])
}
export default DeleteKeyPress