function mapStateToProps(state) {
  return {
    CoinList: state.CoinList,
    LogoList: state.LogoList,
    TradeData: state.TradeData,
    TransactionData: state.TransactionData,
  };
}

export default mapStateToProps;
