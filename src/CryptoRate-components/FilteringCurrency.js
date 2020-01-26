import React from "react";

const FilteringCurrency = props => {
    return (
        <input type="text" placeholder="Szukaj" onChange={props.filter} />
    )
}

export default FilteringCurrency;;