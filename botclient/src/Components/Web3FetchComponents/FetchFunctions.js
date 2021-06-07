import { ApiPromise, WsProvider } from "@polkadot/api"; // for DOT and KSM
import * as solanaWeb3 from "@solana/web3.js"; // for SOL
import Web3 from "web3"; // for CAKE
import CakeVaultABI from "./ABIs/CakeVaultABI"; // for CAKE
import axios from "axios";
import { options } from "@chainx-v2/api";

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
        reward: FetchFunctions.KSM.ConvertBalance(balance["miscFrozen"]) - 1,
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
        reward: FetchFunctions.KSM.ConvertBalance(balance["miscFrozen"]) - 0,
      });
    },
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
        reward:
          totalBalance -
          FetchFunctions.CAKE.ConvertBalance(userInfo.cakeAtLastUserAction) /
            Math.pow(10, 6),
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
  SOL: {
    initialize: async (component) => {
      const connection = new solanaWeb3.Connection(
        "https://api.mainnet-beta.solana.com"
      );
      component.setState({ api: connection }, () =>
        FetchFunctions.SOL.fetchBalance(component)
      );
    },
    fetchBalance: async (component) => {
      const MainAccountPublicKey = new solanaWeb3.PublicKey(
        component.props.address //"3CvLeYdstYqDGH3zUcZDH4bjoUHQRhy4k4sjkQPproVC"
      );
      const date = new Date();
      const balance = await component.state.api.getBalance(
        MainAccountPublicKey
      );
      //console.log(FetchFunctions.SOL.ConvertBalance(balance));
      const StakeAccountPublicKey = new solanaWeb3.PublicKey(
        "BngVH8Jk5V2BGYxXXCxu3cNLzcHATcYqq1jUBJmu8n7q"
      );
      const StakeBalance = await component.state.api.getBalance(
        StakeAccountPublicKey
      );
      //console.log(FetchFunctions.SOL.ConvertBalance(StakeBalance));
      component.setState({
        balance:
          FetchFunctions.SOL.ConvertBalance(balance) +
          FetchFunctions.SOL.ConvertBalance(StakeBalance),
      });
      component.setState({
        ready: true,
        datetime: date,
        stake_balance: FetchFunctions.SOL.ConvertBalance(StakeBalance),
        reward: FetchFunctions.SOL.ConvertBalance(StakeBalance) - 10.39,
      });
    },
    ConvertBalance: (balance) => {
      return balance / Math.pow(10, 9);
    },
  },
  ADA: {
    initialize: async (component) => {
      const respond = await axios.get(
        "https://cardano-mainnet.blockfrost.io/api/v0/accounts/" +
          component.props.address,
        { headers: { project_id: "UdscOKetZaj0fnvGXtLw7GQtHiRjBk3M" } }
      );
      component.setState({
        balance: FetchFunctions.ADA.ConvertBalance(
          respond.data.controlled_amount
        ),
      });
      const date = new Date();
      component.setState({
        ready: true,
        datetime: date,
        stake_balance: FetchFunctions.ADA.ConvertBalance(
          parseFloat(respond.data.controlled_amount) -
            parseFloat(respond.data.rewards_sum)
        ),
        reward: FetchFunctions.ADA.ConvertBalance(respond.data.rewards_sum),
      });
    },
    ConvertBalance: (balance) => {
      return balance / Math.pow(10, 6);
    },
  },
  // PCX: {
  //   initialize: async (component) => {
  //     const wsProvider = new WsProvider("wss://staging-1.chainx.org/ws");
  //     const api = await ApiPromise.create(options({ provider: wsProvider }));
  //     await api.isReady;
  //     component.setState({ api: api }, () =>
  //       FetchFunctions.PCX.fetchBalance(component)
  //     );
  //   },
  //   fetchBalance: async (component) => {
  //     let {
  //       data: { free: previousFree },
  //       nonce: previousNonce,
  //     } = await component.state.api.query.system.account(
  //       component.props.account
  //     );
  //     console.log(previousFree);
  //   },
  // },
};

export default FetchFunctions;
