import React, { useEffect } from "react";
import BalanceInfo from "./Web3FetchComponents/BalanceInfo";

const StakeBalances = () => {
  useEffect(() => {
    setInterval(() => {
      window.location.reload();
    }, 60 * 20 * 1000);
  }, []);
  return (
    <React.Fragment>
      <BalanceInfo
        symbol="KSM"
        address="E3FRzURvdjbmKEUupyvQFAckwWeTHXGSepzfsQ3JoPbjF4b"
        logo="https://s2.coinmarketcap.com/static/img/coins/64x64/5034.png"
      />
      <BalanceInfo
        symbol="DOT"
        address="15knng9JywX9EKFThL2oN8fCk8xmFKktHzAvgcnQky3HSXfm"
        logo="https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png"
      />
      <BalanceInfo
        symbol="ADA"
        address="stake1uxz00jr2h6rs60tzt2m9wpqmrxwv8hf7rsqyt99m45p4s6qcnd6j8"
        logo="https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png"
      />
      <BalanceInfo
        symbol="SOL"
        address="3CvLeYdstYqDGH3zUcZDH4bjoUHQRhy4k4sjkQPproVC"
        logo="https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png"
      />
      <BalanceInfo
        symbol="CAKE"
        address="0x079A7EEf35B1651d409986567FC8A928fC459eb8"
        logo="https://s2.coinmarketcap.com/static/img/coins/64x64/7186.png"
      />
      <BalanceInfo
        symbol="PCX"
        address="5QbVA5vLo33ZjL4kgvigRBcd5Dak7ZkGr2dFrR8Xb1uSrEmk"
        logo="https://s2.coinmarketcap.com/static/img/coins/64x64/4200.png"
      />
    </React.Fragment>
  );
};

export default StakeBalances;
