import React from "react";
import BalanceInfo from "./Web3FetchComponents/BalanceInfo";

const StakeBalances = () => {
  return (
    <React.Fragment>
      <BalanceInfo
        symbol="KSM"
        address="E3FRzURvdjbmKEUupyvQFAckwWeTHXGSepzfsQ3JoPbjF4b"
      />
      <BalanceInfo
        symbol="DOT"
        address="15knng9JywX9EKFThL2oN8fCk8xmFKktHzAvgcnQky3HSXfm"
      />
    </React.Fragment>
  );
};

export default StakeBalances;
