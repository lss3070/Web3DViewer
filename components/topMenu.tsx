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
import FileManager from './fileManager';
import MenuManager from "./menuManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ITopMenu{
}

export const TopMenu=()=>{
    return(
            <div className=" w-full grid grid-cols-7 h-full gap-5
             bg-[#f5f5f5]
            dark:bg-[#3d3e42]
            ">
                <div className="flex col-span-1 items-center justify-center
                 w-56
                ">
                    logo
                </div>
                <div className=" col-span-5 flex gap-5">
                    <FileManager/>
                    <MenuManager/>
                    
                </div>
                <div className="flex col-span-1 items-center justify-end mr-8">
                    <div className='flex items-center justify-center'>
                        <FontAwesomeIcon
                                icon={['fas','camera']}
                                className="w-5 h-5 text-[white]"/>
                    </div>
                    <div className='flex items-center justify-center'>
                    <FontAwesomeIcon
                                icon={['fas','print']}
                                className="w-5 h-5 text-[white]"/>
                    </div>
                </div>
            </div>
    )
}