import React from "react";

const Modal = (props) => {
  return (
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content" style={{ borderRadius: "20px" }}>
        <div className="modal-header">
          <img
            src={
              "/Asset/logos/" +
              props.abbr +
              (props.abbr === "pols" || props.abbr === "safemoon"
                ? ".jpeg"
                : ".png")
            }
            width="30"
            height="30"
            className="mr-1"
            alt={props.symbol}
          ></img>
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
