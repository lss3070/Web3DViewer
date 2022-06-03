// import {HexColorPicker} from 'react-colorful'


interface IColorHelperProps{
    color:string;
    setColor:Function
}

export const ColorHelper=({color,setColor}:IColorHelperProps)=>{
    return(
        <>
            {/* <HexColorPicker color={color} 
            onChange={(color)=>{
                setColor(color);
            }}/> */}
        </>
    )
}