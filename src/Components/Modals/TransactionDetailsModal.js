import React from "react";
import "Stylesheets/Modals/TransactionDetailsModal.css";

////////Images
import cancelIcon from "images/cancelIcon.png";

class TransactionDetailsModal extends React.Component {
  render() {
    return (
      <div className="trxn_details_modal_overlay" ref={this.props.nodeRef}>
        <div id="trxn_details_modal">
          <img
            src={cancelIcon}
            className="cancel_icon"
            onClick={this.props.cancel}
            alt=""
          />
          <div id="trxn_type">
            {this.props.trxn.type}
            <div id="trxn_origin">{this.props.trxn.origin}</div>
          </div>

          <div id="trxn_amount">
            ${this.props.trxn.amount}
            <div id="trxn_balance">
              Ending Balance: ${this.props.trxn.endingBalance}
            </div>
          </div>

          <div id="trxn_date">
            <div id="trxn_time">{this.props.trxn.time}</div>
            {this.props.trxn.date}
          </div>
        </div>
      </div>
    );
  }
}

export default TransactionDetailsModal;
