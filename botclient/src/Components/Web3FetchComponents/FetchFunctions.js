import { ApiPromise, WsProvider } from "@polkadot/api";

const FetchFunctions = {
  KSM: {
    initialize: async (component) => {
      const wsProvider = new WsProvider("wss://kusama-rpc.polkadot.io");
      const the_api = await ApiPromise.create({ provider: wsProvider });
      component.setState({ api: the_api }, () =>
        FetchFunctions.KSM.fetchBalance(component)
      );
    },
    fetchBalance: async (component) => {
      const now = await component.state.api.query.timestamp.now();
      const { nonce, data: balance } =
        await component.state.api.query.system.account(component.state.Address);
      //console.log(now.toNumber());
      var date = new Date(now.toNumber());
      //console.log(balance["free"].toNumber() / Math.pow(10, 12));
      component.setState({
        balance: balance["free"].toNumber() / Math.pow(10, 12),
      });
      component.setState({
        ready: true,
        datetime: date,
        stake_balance: FetchFunctions.KSM.ConvertBalance(balance["miscFrozen"]),
      });
    },
    ConvertBalance: (balance) => {
      return balance.toNumber() / Math.pow(10, 12);
    },
  },
  DOT: {
    initialize: async (component) => {
      const wsProvider = new WsProvider("wss://rpc.polkadot.io");
      const the_api = await ApiPromise.create({ provider: wsProvider });
      component.setState({ api: the_api }, () =>
        FetchFunctions.DOT.fetchBalance(component)
      );
    },
    fetchBalance: async (component) =>
      FetchFunctions.KSM.fetchBalance(component),
    ConvertBalance: (balance) => FetchFunctions.KSM.ConvertBalance(balance),
  },
};

export default FetchFunctions;
