import {  Slider } from "antd";
import { ChangeEvent } from "react";

interface SliderItemProps{
    label:string;
    max:number;
    min:number;
    value:number;
    step?:number;
    sliderChangeEvent:(e: number) => void;
    inputChangeEvent:(e: ChangeEvent<HTMLInputElement>) => void;
}

const SliderItem=({
    label,max,min,value,step,sliderChangeEvent,inputChangeEvent
}:SliderItemProps)=>{
    return(
        <div className="grid grid-cols-12">
            <div className="col-span-1 
            text-gray-600
            dark:text-white
            text-center">
                {label}
            </div>
            <div className="col-span-9">
            <Slider min={min} max={max}
                    value={value}
                    onChange={sliderChangeEvent}
                    handleStyle={{
                        borderColor:'#6b7280'
                    }}
                    trackStyle={{
        
                        backgroundColor:'#6b7280'
                    }}
                    />
            </div>
            <div className="col-span-2">
                <input className="w-full text-center rounded-md shadow-md
                dark:text-gray-600 outline-none
                "
                 value={value} onChange={inputChangeEvent}/>
            </div>
        </div>
    )
}
export default SliderItem;