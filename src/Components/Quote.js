import React from "react";
import styled from "@emotion/styled";

const ResultContainer = styled.div`
  color: white;
  font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
  font-size: 18px;
  
  span {
    font-weight: bold;
  }
`;

const Price = styled.span`
  font-size: 30px;
  
  span {
    font-weight: bold;
  }
`;

const Quote = ({quote}) => {
    if (Object.keys(quote).length === 0) return null;
    return (
        <ResultContainer>
            <Price><span>1 {quote.FROMSYMBOL}</span> is equal to <span>{quote.PRICE}</span></Price>
            <Info>Highest price of the day: <span>{quote.HIGHDAY}</span></Info>
            <Info>Lowest price of the day: <span>{quote.LOWDAY}</span></Info>
            <Info>Variation last 24 hours: <span>{quote.CHANGEPCT24HOUR}</span></Info>
            <Info>Last update: <span>{quote.LASTUPDATE}</span></Info>
        </ResultContainer>
    );
}

export default Quote;