

const NumberWithComma=(x:string)=>{

   
    const parts = parseInt(x).toFixed(2).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

export default NumberWithComma