import React from "react";
import "Stylesheets/TransferFunds.css";

class TransactionComplete extends React.Component {
  render() {
    return (
      <div ref={this.props.nodeRef}>
        <div className="transfer_message_container">
          {this.props.transactionType === "TransferFunds" ? (
            <p id="transfer_complete_message">Transfer Complete!</p>
          ) : null}
          {this.props.transactionType === "SendMoney" ? (
            <p id="transfer_complete_message">Money Sent!</p>
          ) : null}

          <div
            className="transfer_complete_btn"
            id="return_home_btn"
            onClick={() => this.props.returnHome()}
          >
            Accounts
          </div>
          {this.props.transactionType === "TransferFunds" ? (
            <div
              className="transfer_complete_btn"
              id="new_transfer_btn"
              onClick={() => this.props.changeView("transferDetails")}
            >
              Start a New Transfer
            </div>
          ) : null}

          {this.props.transactionType === "SendMoney" ? (
            <div
              className="transfer_complete_btn"
              id="new_transfer_btn"
              onClick={() => this.props.changeScreen()}
            >
              Send Money
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default TransactionComplete;
