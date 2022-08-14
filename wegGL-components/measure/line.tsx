
import { Html, Line } from "@react-three/drei";
import _ from "lodash";
import { useMemo } from "react"
import { BufferGeometry, Vector3 } from "three";
import useMeasureStore from "../../store/measure.store";


interface ILineProps{
    points:Vector3[]
}

const LineComponent=({points}:ILineProps)=>{

    const [selectPoints,setSelectMeasure]=useMeasureStore((state)=>[
        state.selectPoints,
        state.setSelectMeasure
    ]);


    const lineVectors = useMemo(()=>{
        const result:Vector3[][] =[]
        if(points.length!>0){        
            let vectors:Vector3[]=[]

            for(let i in points){
                const item = points[i]!;
                if(+i%2===0){
                    vectors=[]
                    vectors.push(item);
                }else{
                    vectors.push(item);
                    result.push(_.cloneDeep(vectors));
                }
            }
           return result;
        }
    },[points])

    return(
        <>
        {
            lineVectors?.map((item,index)=>{
                const center = new Vector3(
                    (item[0].x+item[1].x)/2,
                    (item[0].y+item[1].y)/2,
                    (item[0].z+item[1].z)/2
                )
                const distance= (item[0].distanceTo(item[1])).toFixed(2)
                const angle = (item[0].angleTo(item[1])*10).toFixed(2)
                const select = selectPoints.length!>1&&
                selectPoints[0].equals(item[0])&&
                selectPoints[1].equals(item[1])
              

                return(
                    <Line key={index} points={item}
                    lineWidth={1}
                    color={0x64758b} 
                    depthWrite={false} 
                    depthTest={false}>
                        <Html position={center} 
                        style={{backgroundColor:select?`#bdbdbd`:'white'}}
                        className="
                        rounded-xl shadow-lg p-2
                        cursor-pointer
                        text-blue-400
                        "
                        >
                            <div className="text-center" onClick={()=>setSelectMeasure(item)}>
                                <div className=" select-none">
                                    <span className="text-xl">⧟</span>
                                    <span>{distance}</span>
                                </div>
                                <div className=" select-none">
                                    <span className=" text-xl">⊾</span>
                                    <span>{angle}°</span>
                                     
                                    </div>
                            </div>
                        </Html>
                    </Line>
                )
            })
        }
        </>
        
    )
}
export default LineComponent