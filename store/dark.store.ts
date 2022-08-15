import create from "zustand";

interface IDarkStateProps{
    darkMode:boolean;
    setDarkMode:(darkMode:boolean)=>void;
}

const useDarkStore= create<IDarkStateProps>((set)=>({
    darkMode:false,
    setDarkMode:(darkMode:boolean)=>set((state)=>({
        ...state,
        darkMode
    }))
}));

export default useDarkStore;