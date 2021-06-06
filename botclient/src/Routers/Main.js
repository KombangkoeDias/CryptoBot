import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Prices from "../Components/Prices/Prices";
import RealPort from "../Components/RealPort";
import BotPort from "../Components/BotPort";
import StakeBalances from "../Components/StakeBalances";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/price" exact component={() => <Prices />} />
        <Route path="/real_port" exact component={() => <RealPort />} />
        <Route path="/bot_port" exact component={() => <BotPort />} />
        <Route path="/stake_balance" component={() => <StakeBalances />} />
        <Redirect to="/price" />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
