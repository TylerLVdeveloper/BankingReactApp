import React from "react";

import Recipients from "./Recipients.js";
import Amount from "./Amount.js";
import Confirmation from "../CommonScreens/Confirmation.js";
import ProcessingAnimation from "Components/CommonScreens/ProcessingAnimation.js";
import TransactionComplete from "Components/CommonScreens/TransactionComplete.js";

class SendMoney extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeScreen: "Select Recipient",
      recipient: null,
      trnxDetails: {
        amount: null,
        sendAccnt: null,
      },
    };

    this.updateRecipient = this.updateRecipient.bind(this);
  }

  resetScreen() {
    this.setState({
      activeScreen: "Select Recipient",
      recipient: null,
      trnxDetails: {
        amount: null,
        sendAccnt: null,
      },
    });
  }

  transactionComplete() {
    this.setState({ activeScreen: "Transaction Complete" });
  }

  processTransaction() {
    this.setState({ activeScreen: "Processing Animation" });

    const timestamp = new Date();
    let month = timestamp.getMonth() + 1;
    let day = timestamp.getDate();
    let year = timestamp.getFullYear();
    let hours = timestamp.getHours();
    let min = timestamp.getMinutes();
    let amOrPm;

    hours >= 12 ? (amOrPm = "PM") : (amOrPm = "AM");

    if (hours > 12) hours = hours - 12;
    if (month.toString().length === 1) month = "0" + month;
    if (day.toString().length === 1) day = "0" + day;
    if (min.toString().length === 1) min = "0" + min;

    const trxn = this.state.trnxDetails;
    const recipient = this.state.recipient;

    trxn.sendAccnt.balance -= Number(trxn.amount);

    const transactionDetailsSendAccnt = {
      amount: trxn.amount,
      type: "Sent Money",
      action: "Subtract",
      date: `${month}/${day}/${year}`,
      origin: `to ${recipient.firstName} ${recipient.lastName}`,
      endingBalance: trxn.sendAccnt.balance.toFixed(2),
      time: `${hours}:${min} ${amOrPm}`,
      timestamp: timestamp,
    };

    trxn.sendAccnt.transactions.push(transactionDetailsSendAccnt);
  }

  updateRecipient(rec) {
    this.setState({ recipient: rec });
    this.setState({ activeScreen: "Enter Amount" });
  }

  updateDetails(amount, account) {
    this.setState({
      trnxDetails: { amount: amount, sendAccnt: account },
    });
    this.setState({ activeScreen: "Confirmation" });
  }

  render() {
    // STEP 1
    if (this.state.activeScreen === "Select Recipient")
      return (
        <Recipients
          selectedRecipient={(recipient) => this.updateRecipient(recipient)}
        />
      );

    // STEP 2
    if (this.state.activeScreen === "Enter Amount")
      return (
        <Amount
          rec={this.state.trnxDetails.recipient}
          selectedDetails={(amount, account) =>
            this.updateDetails(amount, account)
          }
        />
      );

    // Step 3
    if (this.state.activeScreen === "Confirmation")
      return (
        <Confirmation
          transactionType="SendMoney"
          trxn={this.state.trnxDetails}
          recipient={this.state.recipient}
          confirmed={() => this.processTransaction()}
        />
      );

    // Step 4
    if (this.state.activeScreen === "Processing Animation")
      return (
        <ProcessingAnimation
          transactionComplete={() => this.transactionComplete()}
          transactionType="SendMoney"
          transactionDetails={this.state.trnxDetails}
          recipient={this.state.recipient}
        />
      );

    if (this.state.activeScreen === "Transaction Complete")
      return (
        <TransactionComplete
          transactionType="SendMoney"
          changeScreen={() => {
            this.resetScreen();
          }}
          returnHome={() => this.props.returnHome()}
        />
      );
  }
}

export default SendMoney;
