

// export interface CustomDataNode extends DataNode {
//     uuid?: string;
// }

export interface  CustomDataNode {
    children?: CustomDataNode[];
    type?:any;
    // 'Group'|'Mesh'|'Bone'|'LineSegments'
    key: string;
    title?: string;
    visible:boolean;
    select:boolean;
}