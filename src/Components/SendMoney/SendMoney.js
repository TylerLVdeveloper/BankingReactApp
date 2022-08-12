import React from "react";
// Package used for CSS transitions as components enter or leave the DOM
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "Stylesheets/TransitionStyles.css";
import style from "Stylesheets/SendMoney/SendMoney.module.css";

import Recipients from "./Recipients.js";
import Amount from "./Amount.js";
import Confirmation from "../CommonScreens/Confirmation.js";
import ProcessingAnimation from "Components/CommonScreens/ProcessingAnimation.js";
import TransactionComplete from "Components/CommonScreens/TransactionComplete.js";

class SendMoney extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRecipient: true,
      transactionComplete: false,
      processingAnimation: false,
      enterAmount: false,
      confirmation: false,
      recipient: null,
      trnxDetails: {
        amount: null,
        sendAccnt: null,
      },
    };

    this.updateRecipient = this.updateRecipient.bind(this);

    this.TransactionCompleteRef = React.createRef(null);
    this.selectRecipientRef = React.createRef(null);
    this.enterAmountRef = React.createRef(null);
    this.confirmationRef = React.createRef(null);
    this.processingAnimationRef = React.createRef(null);
  }

  resetScreen() {
    this.setState({
      selectedRecipient: true,
      transactionComplete: false,
      processingAnimation: false,
      enterAmount: false,
      confirmation: false,
      recipient: null,
      trnxDetails: {
        amount: null,
        sendAccnt: null,
      },
    });
  }

  transactionComplete() {
    this.setState({ processingAnimation: false, transactionComplete: true });
  }

  processTransaction() {
    this.setState({ confirmation: false, processingAnimation: true });

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
    this.setState({ selectedRecipient: false, enterAmount: true });
  }

  updateDetails(amount, account) {
    this.setState({
      trnxDetails: { amount: amount, sendAccnt: account },
    });
    this.setState({ enterAmount: false, confirmation: true });
  }

  render() {
    return (
      <div ref={this.props.nodeRef} id={style.send_money_container}>
        <div className="screen_title">Send Money</div>
        <TransitionGroup>
          {this.state.selectedRecipient ? (
            <CSSTransition
              nodeRef={this.selectRecipientRef}
              in={this.state.selectedRecipient}
              timeout={1000}
              classNames="horizontal_slide"
            >
              <Recipients
                nodeRef={this.selectRecipientRef}
                selectedRecipient={(recipient) =>
                  this.updateRecipient(recipient)
                }
              />
            </CSSTransition>
          ) : null}
        </TransitionGroup>

        <TransitionGroup>
          {this.state.enterAmount ? (
            <CSSTransition
              nodeRef={this.enterAmountRef}
              in={this.state.enterAmount}
              timeout={1000}
              classNames="horizontal_slide"
            >
              <Amount
                nodeRef={this.enterAmountRef}
                rec={this.state.trnxDetails.recipient}
                selectedDetails={(amount, account) =>
                  this.updateDetails(amount, account)
                }
              />
            </CSSTransition>
          ) : null}
        </TransitionGroup>

        <TransitionGroup>
          {this.state.confirmation ? (
            <CSSTransition
              nodeRef={this.confirmationRef}
              in={this.state.confirmation}
              timeout={1000}
              classNames="slideIn_fadeOut"
            >
              <Confirmation
                nodeRef={this.confirmationRef}
                transactionType="SendMoney"
                trxn={this.state.trnxDetails}
                recipient={this.state.recipient}
                confirmed={() => this.processTransaction()}
                cancelled={() => this.props.returnHome()}
              />
            </CSSTransition>
          ) : null}
        </TransitionGroup>

        <TransitionGroup>
          {this.state.processingAnimation ? (
            <CSSTransition
              nodeRef={this.processingAnimationRef}
              in={this.state.processingAnimation}
              timeout={1000}
              classNames="fade"
            >
              <ProcessingAnimation
                nodeRef={this.processingAnimationRef}
                transactionComplete={() => this.transactionComplete()}
                transactionType="SendMoney"
                transactionDetails={this.state.trnxDetails}
                recipient={this.state.recipient}
              />
            </CSSTransition>
          ) : null}
        </TransitionGroup>

        <TransitionGroup>
          {this.state.transactionComplete ? (
            <CSSTransition
              nodeRef={this.TransactionCompleteRef}
              in={this.state.transactionComplete}
              timeout={1000}
              classNames="fade"
            >
              <TransactionComplete
                nodeRef={this.TransactionCompleteRef}
                transactionType="SendMoney"
                changeScreen={() => {
                  this.resetScreen();
                }}
                returnHome={() => this.props.returnHome()}
              />
            </CSSTransition>
          ) : null}
        </TransitionGroup>
      </div>
    );
  }
}

export default SendMoney;
