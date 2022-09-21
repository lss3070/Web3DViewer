import { extend, ReactThreeFiber } from "@react-three/fiber";
import { EffectComposer, OutlinePass } from "three-stdlib";

declare global{
namespace JSX {
     interface IntrinsicElements {
      outlinePass: ReactThreeFiber.NodeProps<OutlinePass, typeof OutlinePass>;
    }
  }
}