import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import Axios from "axios"
import useCurrency from "../hooks/useCurrency";
import Error from "./Error";

const Button = styled.input`
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66A2FE;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #FFF;
  transition: background-color .3s ease;
  
  &:hover {
    background-color: #326AC0;
    cursor: pointer;
  }
`

const Form = ({setCurrency, setCrypto}) => {

    const [cryptoList, setCryptoList] = useState([]);
    const [error, setError] = useState(false);

    const CURRENCIES = [
        {key: "USD", cod: "USD", name: "US Dollar"},
        {key: "MXN", cod: "MXN", name: "Mexican Peso"},
        {key: "ARS", cod: "ARS", name: "Argentinian Peso"},
        {key: "EUR", cod: "EUR", name: "Euro"},
        {key: "GBP", cod: "GBP", name: "Pound sterling"}
    ];

    // My custom hook
    const [currency, SelectCurrencies] = useCurrency("Choose your currency", "", CURRENCIES);
    const [crypto, SelectCrypto] = useCurrency("Choose your cryptocurrency", "", cryptoList)

    // Get crypto currencies from API whe component is render
    useEffect(() => {
        const requestAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

            const result = await Axios.get(url);
            const currencyFormattedList = result.data.Data.map(currency => (
                {
                    key: currency.CoinInfo.Id,
                    cod: currency.CoinInfo.Name,
                    name: currency.CoinInfo.FullName
                }
            ));
            setCryptoList(currencyFormattedList);
        }
        requestAPI();
    }, []);

    // On submit, quote currency
    const handleSubmit = e => {
        e.preventDefault();

        // Validations
        if (currency.trim() === "" || crypto.trim() === "") {
            setError(true);
            return;
        }
        setError(false);

        // Send values to App component
        setCurrency(currency);
        setCrypto(crypto);
    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            {error ?
                <Error
                    message="All fields are required"
                /> : null
            }
            <SelectCurrencies/>
            <SelectCrypto/>
            <Button
                type="submit"
                value="Quote"
            />
        </form>
    );
}

export default Form;