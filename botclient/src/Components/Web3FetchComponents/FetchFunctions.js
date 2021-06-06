import { ApiPromise, WsProvider } from "@polkadot/api";
import Web3 from "web3";
import CakeVaultABI from "./ABIs/CakeVaultABI";

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
  CAKE: {
    initialize: async (component) => {
      const web3 = new Web3("https://bsc-dataseed1.binance.org:443");
      // web3.eth
      //   .getBalance("0x079A7EEf35B1651d409986567FC8A928fC459eb8")
      //   .then(console.log);
      const CakeVault = new web3.eth.Contract(
        CakeVaultABI,
        "0xa80240Eb5d7E05d3F250cF000eEc0891d00b51CC"
      );
      component.setState({ api: CakeVault }, () =>
        FetchFunctions.CAKE.fetchBalance(component)
      );
    },
    fetchBalance: async (component) => {
      const CakeVault = component.state.api;
      var date = new Date();
      const pricePerFullShare = await CakeVault.methods
        .getPricePerFullShare()
        .call();
      const userInfo = await CakeVault.methods
        .userInfo(component.props.address)
        .call();
      const totalBalance = FetchFunctions.CAKE.ConvertBalance(
        FetchFunctions.CAKE.ConvertBalance(userInfo.shares) *
          FetchFunctions.CAKE.ConvertBalance(pricePerFullShare)
      );
      component.setState({ balance: totalBalance });
      component.setState({
        ready: true,
        datetime: date,
        stake_balance: totalBalance,
      });
      // console.log(
      //   FetchFunctions.CAKE.ConvertBalance(
      //     FetchFunctions.CAKE.ConvertBalance(userInfo.shares) *
      //       FetchFunctions.CAKE.ConvertBalance(pricePerFullShare)
      //   )
      // );
    },
    ConvertBalance: (balance) => {
      return balance / Math.pow(10, 12);
    },
  },
};

export default FetchFunctions;
