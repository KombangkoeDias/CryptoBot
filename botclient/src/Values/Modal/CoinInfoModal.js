import React from "react";
import CoinLogo from "../../Components/CoinImg/CoinLogo";

const Modal = (props) => {
  return (
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div
        className="modal-content"
        style={{
          borderRadius: "20px",
          backgroundColor: "darkgray",
          color: "white",
        }}
      >
        <div className="modal-header">
          <CoinLogo coin={props.coin} logo={props.logo} />
          <h5 className="modal-title" id="exampleModalLongTitle">
            {props.symbol}
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">{props.CoinValues()}</div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
