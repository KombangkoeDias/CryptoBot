function mapStateToProps(state) {
  return {
    CoinList: state.CoinList,
    LogoList: state.LogoList,
  };
}

export default mapStateToProps;
