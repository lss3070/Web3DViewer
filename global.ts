import { ReactThreeFiber } from "@react-three/fiber";
import { OutlinePass } from "three-stdlib";

declare global{
namespace JSX {
     interface IntrinsicElements {
      outlinePass: ReactThreeFiber.Node<OutlinePass, typeof OutlinePass>;
    }
  }
}