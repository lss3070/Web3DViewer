import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
            icon={['fas','magnifying-glass']}
            className="w-5 h-5 absolute top-2 right-1 "/>
    </div>
    )
}
export default TreeSearchBox