import {HexColorPicker} from 'react-colorful'


interface IColorHelperProps{
    color:string;
    setColor:Function
}

export const ColorHelper=({color,setColor}:IColorHelperProps)=>{
    return(
        <div className='flex items-center justify-center w-full'>
            <HexColorPicker color={color} 
                onChange={(color)=>{
                    setColor(color);
                }}/>
        </div>
    )
}