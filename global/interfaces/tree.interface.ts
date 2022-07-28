import { DataNode } from "antd/lib/tree";
import { MouseEventHandler } from "react";

export interface CustomNode extends DataNode {
    select:boolean;
    visible:boolean
}


export interface TitleProps{
    node:CustomNode;
    // visibleChange:Function;
    iconClickEvent:Function;
    clickEvent: Function;
    doubleClickEvent:Function;
}

