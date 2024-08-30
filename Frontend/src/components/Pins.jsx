import React from "react";

function Pins({pin}){
    return (
        <div className="pin">
            <img src={pin.imageUrl} alt={pin.title}/>
            <p>{pin.title}</p>
        </div>
    )
}

export default Pins;