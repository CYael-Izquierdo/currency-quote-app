import React, {Fragment, useState} from "react"
import styled from "@emotion/styled";

const Label = styled.label`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
`;

const useCurrency = (label, initState, currencies) => {
    // Custom hook state
    const [state, setState] = useState(initState);

    const SelectCurrency = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={e => setState(e.target.value)}
                value={state}
            >
                <option value="">-- Select --</option>
                {currencies.map(({key, cod, name}) => (
                    <option key={key} value={cod}>{name}</option>
                ))}
            </Select>
        </Fragment>
    );

    // return state, ui and function to modify state
    return [state, SelectCurrency, setState];
}

export default useCurrency;