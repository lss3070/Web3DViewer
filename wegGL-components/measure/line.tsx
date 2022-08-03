
import { Html, Line } from "@react-three/drei";
import _ from "lodash";
import { useMemo } from "react"
import { BufferGeometry, Vector3 } from "three";
import { useMeasureSWR } from "../../swrs/measure.swr";

interface ILineProps{
    points:Vector3[]
}

const LineComponent=({points}:ILineProps)=>{

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
            lineVectors?.map((item)=>{
                const center = new Vector3(
                    (item[0].x+item[1].x)/2,
                    (item[0].y+item[1].y)/2,
                    (item[0].z+item[1].z)/2
                )
                const distance= (item[0].distanceTo(item[1])).toFixed(3)
                const angle = (item[0].angleTo(item[1])*10).toFixed(3)
                return(
                    <Line points={item}
                    color={0x0000ff} 
                    depthWrite={false} 
                    depthTest={false}>
                        <Html position={center}>
                            distance:{distance}
                            angle:{angle}
                        </Html>
                    </Line>
                )
            })
        }
        </>
        
    )
}
export default LineComponent