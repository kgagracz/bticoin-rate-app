import React, { Component } from "react";
import axios from "axios";

import CryptoList from "./CryptoRate-components/CryptoList";
import FilteringCurrency from "./CryptoRate-components/FilteringCurrency";

class CryptoRate extends Component {

    constructor() {
        super();
        this.state = {
            cryptoArray: [],
            filteredCryptoArray: []
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.getData();
        }, 5000)

    }


    //funckja pobierajaca dane
    getData = () => {
        axios
            .get(
                `https://blockchain.info/pl/ticker?fbclid=IwAR2wOEDMLJTVXrQ86D9dkUe7ENOZ0QoZdyoJj_lRcqqFeCHEfXSXi4HrKnw`
            )
            .then(res => {
                const cryptoData = res.data;

                //zamiana obiektu na tablice
                let transformedCryptoArray = [];
                let i = 0;
                let classValue = 'blue';
                for (let key in cryptoData) {

                    let prevCryptoValue = this.state.cryptoArray[i];
                    console.log(prevCryptoValue)
                    if (prevCryptoValue !== undefined) {
                        console.log(this.state.cryptoArray[i].last);
                        if (prevCryptoValue.last > cryptoData[key].last) {
                            classValue = 'red';
                        }
                        else if (prevCryptoValue.last < cryptoData[key].last) {
                            classValue = 'green';
                        }
                    }


                    let cryptoObj = {
                        last: cryptoData[key].last,
                        symbol: cryptoData[key].symbol,
                        currency: key,
                        colorClass: classValue
                    }

                    transformedCryptoArray.push(cryptoObj);
                    i++;
                }
                this.setState({
                    cryptoArray: transformedCryptoArray,
                    filteredCryptoArray: transformedCryptoArray
                });
            });
    };

    filter = (event) => {
        let filteredCryptoArray = this.state.cryptoArray.filter(cryptoElement => {
            return cryptoElement.currency
                .toUpperCase()
                .includes(event.target.value.toUpperCase());
        });
        this.setState({ cryptoArray: filteredCryptoArray });
    };
    

    render() {

        return (
            <div>
                <FilteringCurrency filter={this.filter} />
                <CryptoList cryptoArray={this.state.cryptoArray} />
            </div >
        );
    }

};

export default CryptoRate;
