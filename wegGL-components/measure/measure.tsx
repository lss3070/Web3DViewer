
import useMeasureStore from "../../store/measure.store";
import LineComponent from "./line"
import SpriteComponent from "./sprite"

const MeasureComponent=()=>{
    const [onMeasure,points] = useMeasureStore(state=>[state.onMeasure,state.points]);
    // const points=useMeasureStore(state=>state.points);

    return(
        <>
            {
                onMeasure&&(
                    <>
                        <SpriteComponent points={points}/>
                        <LineComponent points={points}/>
                    </>
                )
            }
            
        </>
    )
}
export default MeasureComponent