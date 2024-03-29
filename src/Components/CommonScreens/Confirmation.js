import React from "react";
import style from "Stylesheets/CommonScreens/Confirmation.module.css";

import AcceptButton from "Components/CommonComponents/AcceptButton";

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const amount = Number(this.props.trxn.amount);
    const transactionAmount = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });
    this.setState({ transactionAmount: transactionAmount });
  }

  render() {
    return (
      <div id={style.confirmation_container} ref={this.props.nodeRef}>
        <div className={style.page_title}>Review & Confirm</div>
        <div className={style.sub_label}>
          {this.props.transactionType === "SendMoney" ? "Send" : null}
          {this.props.transactionType === "TransferFunds" ? "Transfer" : null}
        </div>
        <div className={style.main_label}>${this.state.transactionAmount}</div>
        {this.props.transactionType === "TransferFunds" ? (
          <div className={style.sub_label}>From</div>
        ) : null}
        {this.props.transactionType === "TransferFunds" ? (
          <div className={style.main_label}>
            {this.props.trxn.sendAccnt.accountType}
          </div>
        ) : null}

        <div className={style.sub_label}>To</div>

        <div className={style.main_label}>
          {this.props.transactionType === "SendMoney"
            ? `${this.props.recipient.firstName} ${this.props.recipient.lastName}`
            : null}
          {this.props.transactionType === "TransferFunds"
            ? `${this.props.trxn.recAccnt.accountType}`
            : null}
        </div>

        <AcceptButton onClick={() => this.props.confirmed()} text={"Confirm"} />
        <br />
        <AcceptButton onClick={() => this.props.cancelled()} text={"Cancel"} />
      </div>
    );
  }
}

export default Confirmation;
