import {Button, Col, Row} from "antd"
import { useCommonSWR } from "../../../swrs/common.swr"

export const TextHelper = () => {
    const {commonState, setOnText: setTextAble} = useCommonSWR()

    return (
        <> 
            < Row > 
                <Col>
                    <Button
                        onClick={() => setTextAble(!commonState?.onText !)}>
                        {commonState?.onText? 'Text Off': 'Text On'}
                    </Button>
                </Col>
             </Row>
        </>
    )
}