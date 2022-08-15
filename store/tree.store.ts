import create from "zustand";
import { CustomDataNode } from "../global/interfaces/app.interface";

interface ITreeStateProps{

    groupList?:CustomDataNode[]
    setGroupList:(groupList:CustomDataNode[])=>void;
}

const useTreeStore= create<ITreeStateProps>((set)=>({
    setGroupList:(groupList:CustomDataNode[])=>set((state)=>({
        ...state,
        groupList
    }))
}));

export default useTreeStore;