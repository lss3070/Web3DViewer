import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { Color, Mesh } from "three"

interface IVisibleHelper{
    meshList:Mesh[]
    visible:boolean;
    setVisible:Function;
}
export const VisibleHelper=({meshList,visible,setVisible}:IVisibleHelper)=>{

    const visibleChangeEvent=(visible:boolean)=>{
        setVisible(visible)
        meshList?.forEach((mesh)=>{
            mesh.visible=visible;
        })
    }

    return(
    <>
        <Row>
            <Col>
                <Button onClick={()=>visibleChangeEvent(!visible)}>{visible?'UnVisible':'Visible'}</Button>
            </Col>
        </Row>
    </>
    )
}