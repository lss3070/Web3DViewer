import { Col, Collapse, Row, Button } from "antd"
import { TextHelper } from './common/textHelper';

export const CommonHelperComponent = ()=>{
    const {Panel}=Collapse;
    return(
        <Collapse>
            <Panel key={1} header="Common">
                <Collapse>
                    <Panel key={1} header="Text" >
                       <TextHelper/>
                    </Panel>
                </Collapse>
            </Panel>
        </Collapse>
    )
}