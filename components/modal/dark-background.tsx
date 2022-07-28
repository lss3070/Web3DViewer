

const DarkBackGround=({children,onClick})=>{
    return(
        <div className="absolute top-0 left-0 w-full h-full z-40 block
        bg-[#000000]/30" onClick={onClick}>
            {children}
        </div>
    )
}
export default DarkBackGround