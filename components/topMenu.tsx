import { useFBX } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { ChangeEvent, useEffect, useState } from "react";
import { Mesh, Vector3 } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { SearchOutlined,CloseOutlined, LeftCircleOutlined, RightCircleOutlined, LeftCircleFilled, RightCircleFilled, LeftOutlined, RightOutlined} from '@ant-design/icons'
import { Button } from "antd";
import { useCommonSWR } from "../swrs/common.swr";

interface ITopMenu{
    helperVisible:boolean;
    setHelperVisibile:Function;
    setMobileHelper:Function;
}

export const TopMenu=({helperVisible,setHelperVisibile,setMobileHelper}:ITopMenu)=>{

    const {setFiltPath,setFileExtension}=useCommonSWR();

    const fileChange =(e:ChangeEvent<HTMLInputElement>)=>{
   
        const file = e.currentTarget.files![0];
        const extension = file?.name?.substr(file?.name?.lastIndexOf('.') + 1);
        const link = window.URL.createObjectURL(file);

        setFileExtension(extension);
        setFiltPath(link);
    }


    return(
        <div className="grid w-full h-12 grid-cols-7" >
            <div className="col-span-2">
                <input type="file" onChange={fileChange}/>
            </div>
            <div className="col-span-5">
                <div className=" float-right mt-2">
                    <Button onClick={()=>{
                        setHelperVisibile(!helperVisible)
                        setMobileHelper();
                    }} 
                    shape={`circle`} 
                    icon={helperVisible?<LeftOutlined/>:<RightOutlined/> }/>
                </div>
            </div>
            {/* <div className="col-span-1">
                <div className=" grid w-full grid-flow-col">
                    <div onClick={async()=>await setPosition(new Vector3(0,400,0))}>right</div>
                    <div onClick={async()=>await setPosition(new Vector3(0,-400,0))}>left</div>
                    <div onClick={async()=>await setPosition(new Vector3(0,0,400))}>top</div>
                </div>
                <div className="grid w-full grid-flow-col">
                    <div onClick={async()=>await setPosition(new Vector3(0,0,-400))}>bottom</div>
                    <div onClick={async()=>await setPosition(new Vector3(400,0,0))}>front</div>
                    <div onClick={async()=>await setPosition(new Vector3(-400,0,0))}>back</div>
                    
                </div>
            </div> */}
            {/* <div className="col-span-1">
            <select onChange={(e)=>setMeshMode(parseInt(e.currentTarget.value))}>
                <option 
                value={MeshMode.Default}
               >일반</option>
                <option 
                 value={MeshMode.Point}
                >점</option>
                <option 
                 value={MeshMode.Wire}
                >선</option>
            </select>
            </div> */}
        </div>
    )
}