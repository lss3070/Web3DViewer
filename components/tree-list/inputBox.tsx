import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

interface ITreeSearchBoxProps{
    onChange:Function;
}

const TreeSearchBox=({onChange}:ITreeSearchBoxProps)=>{
    return(
        <div className="w-full relative mb-2">
        <input className="w-full h-8 p-2 
         select-none
        bg-[#f7fafb]
        dark:bg-gray-400 rounded-xl
        placeholder:text-gray-600 
         dark:placeholder:text-white
        outline-none shadow-lg border border-gray-100 dark:border-transparent"
        placeholder="Search"
        onChange={(e)=>onChange(e)}
        />
        <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size='lg'
            className="absolute top-2 right-2"/>
    </div>
    )
}
export default TreeSearchBox