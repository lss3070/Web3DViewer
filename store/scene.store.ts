import { RefObject } from "react";
import { Scene } from "three";
import create from "zustand";

interface ISceneStateProps{

    scene?:RefObject<Scene>;
    setScene:(scene:RefObject<Scene>)=>void;
}

const useSceneStore= create<ISceneStateProps>((set)=>({
    setScene:(scene:RefObject<Scene>)=>set({
        scene:scene
    })
}));

export default useSceneStore;