import React from "react";

const CryptoList = props => {


    const listItems = props.cryptoArray.map( (element, index)=> {

        return (
            <li key={index} className="crypto-li ">
                <p><span className={element.colorClass}>{element.last}</span> {element.currency} {element.symbol}</p>
            </li>
        )
    })
    return (
        <div>
            <ul className="crypto">
                {listItems}
            </ul>
        </div>
    )
}

export default CryptoList;