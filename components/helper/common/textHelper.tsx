import {Button, Col, Row} from "antd"
import { useCommonSWR } from "../../../swrs/common.swr"

export const TextHelper = () => {
    const {commonState, setTextAble} = useCommonSWR()

    return (
        <> 
            < Row > 
                <Col>
                    <Button
                        onClick={() => setTextAble(!commonState?.textAble !)}>
                        {commonState?.textAble? 'Text Off': 'Text On'}
                    </Button>
                </Col>
             </Row>
        </>
    )
}