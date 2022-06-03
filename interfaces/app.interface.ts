

// export interface CustomDataNode extends DataNode {
//     uuid?: string;
// }

export interface  CustomDataNode {
    children?: CustomDataNode[];
    key: string;
    title?: string;
}