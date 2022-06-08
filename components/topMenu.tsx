import { useFBX } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { ChangeEvent, useEffect, useState } from "react";
import { Mesh, Vector3 } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import {OBJExporter} from 'three/examples/jsm/exporters/OBJExporter';
import {GLTFExporter} from 'three/examples/jsm/exporters/GLTFExporter';
import { SearchOutlined,CloseOutlined, LeftCircleOutlined, RightCircleOutlined, LeftCircleFilled, RightCircleFilled, LeftOutlined, RightOutlined, DownloadOutlined} from '@ant-design/icons'
import { Button } from "antd";
import { useMeshSWR } from '../swrs/mesh.swr';
import DarkModeSwitch from "./darkModeSwitch";
import FileManager from "./fileManager";

interface ITopMenu{
    helperVisible:boolean;
    setHelperVisibile:Function;
    setMobileHelper:Function;
}

export const TopMenu=({helperVisible,setHelperVisibile,setMobileHelper}:ITopMenu)=>{


    const {meshState}=useMeshSWR()


    return(
            <div className=" w-full grid grid-cols-7 h-12 border gap-5">
                <div className="flex col-span-1 items-center justify-center
                 w-56
                ">
                    logo
                </div>
                <div className=" col-span-5 flex gap-5">
                    <FileManager/>
                </div>
                <div className="flex col-span-1 items-center justify-end mr-8">
                    <DarkModeSwitch/>
                </div>
                
            </div>
    )
}