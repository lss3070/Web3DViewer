import { useMeasureSWR } from "../../swrs/measure.swr";
import LineComponent from "./line"
import SpriteComponent from "./sprite"

const MeasureComponent=()=>{
    const {measureState}=useMeasureSWR();


    return(
        <>
            {
                measureState?.onMeasure&&(
                    <>
                        <SpriteComponent points={measureState?.point!}/>
                        <LineComponent points={measureState?.point!}/>
                    </>
                )
            }
            
        </>
    )
}
export default MeasureComponent