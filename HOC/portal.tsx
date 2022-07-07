import ReactDOM from "react-dom";

const Portal=({children})=>{
    const element =
    typeof window !== "undefined" && document.querySelector("#portal");
  return element && children ? ReactDOM.createPortal(children, element) : null;
}
export default Portal;