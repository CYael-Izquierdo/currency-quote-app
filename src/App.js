import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import image from "./cryptocurrency.png"
import Form from "./Components/Form";
import Axios from "axios";
import Quote from "./Components/Quote";
import Spinner from "./Components/spinners/Spinner";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
  @media (max-width:992px) {
    img {
      display: none;
    }
  }
`;

const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`;

function App() {

    const [currency, setCurrency] = useState("");
    const [crypto, setCrypto] = useState("");
    const [quote, setQuote] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const quoteCrypto = async () => {
            // Prevent execution when component is rendered
            if(currency.trim() === "" || crypto.trim() === "") return;

            setLoading(true);
            // Get currency quote from API
            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${currency}`;
            const result = await Axios.get(url);
            setQuote(result.data.DISPLAY[crypto][currency]);
            setLoading(false)
        }
        quoteCrypto();
    }, [currency, crypto]);

    // Show Spinner o Quote
    const component = loading ? <Spinner/> : <Quote quote={quote}/>

    return (
        <Container>
            <div>
                <Image
                    src={image}
                    alt="crypto image"
                />
            </div>
            <div>
                <Heading>Quote cryptocurrencies instantly</Heading>
                <Form
                    setCurrency={setCurrency}
                    setCrypto={setCrypto}
                />
                {component}
            </div>
        </Container>
    );
}

export default App;
