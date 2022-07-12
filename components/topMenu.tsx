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
import Eye from '../public/eye.svg'
import { useCommonSWR } from '../swrs/common.swr';

export const TopMenu=()=>{
    const {commonState}=useCommonSWR()
    return(
            <div className=" w-full grid grid-cols-7 h-full gap-5
            bg-white
            dark:bg-[#3d3e42]
            ">
                <div className="flex col-span-1 items-center justify-center
                 w-56
                ">
                    Web 3D Viewer
                </div>
                <div className=" col-span-5 flex gap-5">
                    <FileManager/>
                    {commonState?.fileLoad&&(
                        <MenuManager/>
                    )}
                </div>
                <div className="flex col-span-1 items-center justify-end mr-8
                text-gray-600 dark:text-white
                ">
                    <div className='flex items-center justify-center'>
                        <FontAwesomeIcon
                                icon={['fas','camera']}
                                className="w-5 h-5 "/>
                    </div>
                    <div className='flex items-center justify-center'>
                        <FontAwesomeIcon
                                    icon={['fas','print']}
                                    className="w-5 h-5 "/>
                    </div>
                    <div className='flex items-center justify-center'>
                        <FontAwesomeIcon
                                    icon={['fas','circle-info']}
                                    className="w-5 h-5  cursor-pointer"/>
                    </div>
                </div>
            </div>
    )
}