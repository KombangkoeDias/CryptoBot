import React from "react";

const Modal = (props) => {
  return (
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content" style={{ borderRadius: "20px" }}>
        <div class="modal-header">
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
          <h5 class="modal-title" id="exampleModalLongTitle">
            {props.symbol}
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">{props.CoinValues()}</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
