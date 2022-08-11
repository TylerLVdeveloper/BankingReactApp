import React from "react";
import "Stylesheets/TransferFunds.css";
import accountData from "AccountData.js";
import dollarSign from "images/dollarSign.png";

import "Stylesheets/TransitionStyles.css";

import ProcessingAnimation from "Components/CommonScreens/ProcessingAnimation";
import ResultModal from "Components/Modals/ResultModal.js"; // Displays result message to user after completed action
import TransactionComplete from "Components/CommonScreens/TransactionComplete";
import Confirmation from "Components/CommonScreens/Confirmation.js";

import { CSSTransition, TransitionGroup } from "react-transition-group"; // ES6

class TransferDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sendingAccnt: "",
      receivingAccnt: "",
      amount: "",
      readyToSubmit: false,
      resultModal: {
        show: false,
        resultType: null,
      },
    };
    this.updateReceivingAccntSelection =
      this.updateReceivingAccntSelection.bind(this);
    this.updateSendingAccntSelection =
      this.updateSendingAccntSelection.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkFormCompletion = this.checkFormCompletion.bind(this);

    this.resultModalRef = React.createRef(null);
  }

  showResultModal(resultType) {
    this.setState({
      resultModal: {
        show: true,
        resultType: resultType,
      },
    });

    const hideModal = () => {
      this.setState({
        resultModal: {
          show: false,
          resultType: null,
        },
      });
    };
    // Hides result modal 3 seconds after appearing
    setTimeout(hideModal, 3000);
  }

  checkFormCompletion() {
    if (
      this.state.sendingAccnt !== "" &&
      this.state.receivingAccnt !== "" &&
      this.state.amount !== ""
    ) {
      this.setState({ readyToSubmit: true });
    } else {
      this.setState({ readyToSubmit: false });
    }
  }

  updateReceivingAccntSelection(e) {
    this.setState(
      {
        receivingAccnt: e.target.value,
      },
      () => this.checkFormCompletion()
    );
  }

  updateSendingAccntSelection(e) {
    this.setState(
      {
        sendingAccnt: e.target.value,
      },
      () => this.checkFormCompletion()
    );
  }

  handleChange(e) {
    //Prevents user from entering more than 2 digits after the decimal
    if (e.target.value.includes(".")) {
      const decimalCheck = e.target.value.toString().split(".");
      if (decimalCheck[1].length > 2) {
        const updatedValue = Number(e.target.value).toFixed(2);
        e.target.value = updatedValue;
      }
    }

    this.setState({ amount: e.target.value }, () => this.checkFormCompletion());
  }

  handleSubmit(e) {
    e.preventDefault();
    let sendAccnt = accountData.find((account) => {
      if (account.key === this.state.sendingAccnt) {
        return Number(account.balance);
      } else {
        return null;
      }
    });
    let recAccnt = accountData.find((account) => {
      if (account.key === this.state.receivingAccnt) {
        return Number(account.balance);
      } else {
        return null;
      }
    });
    let amount = parseFloat(this.state.amount).toFixed(2);

    if (amount > sendAccnt.balance) {
      this.showResultModal("fail"); // Displays result modal
    } else {
      let transactionDetails = {
        sendAccnt,
        recAccnt,
        amount,
      };

      this.props.startTransaction(transactionDetails);
    }
  }

  render() {
    return (
      <div id="transfer_container" ref={this.props.nodeRef}>
        <TransitionGroup>
          {this.state.resultModal.show ? (
            <CSSTransition
              nodeRef={this.resultModalRef}
              in={this.state.resultModal.show}
              timeout={500}
              classNames="result_modal_transition"
            >
              <ResultModal
                nodeRef={this.resultModalRef}
                action={this.state.resultModal.action}
                resultType={this.state.resultModal.resultType}
              />
            </CSSTransition>
          ) : null}
        </TransitionGroup>

        <h3>From</h3>
        <select
          id="From"
          name="From"
          onChange={(e) => this.updateSendingAccntSelection(e)}
          className="transfer_field"
          defaultValue={""}
        >
          <option value="">Select an account</option>
          {accountData.map((account) => {
            return (
              <option value={account.key} key={account.key}>
                {account.accountType} ({account.accountNumber})
              </option>
            );
          })}
        </select>

        <h3>To</h3>
        <select
          id="From"
          name="To"
          onChange={(e) => this.updateReceivingAccntSelection(e)}
          className="transfer_field"
          defaultValue={""}
        >
          <option value="">Select an account</option>
          {accountData.map((account) => {
            if (account.key !== this.state.sendingAccnt) {
              return (
                <option value={account.key} key={account.key}>
                  {account.accountType} ({account.accountNumber})
                </option>
              );
            } else {
              return null;
            }
          })}
        </select>

        <img src={dollarSign} alt="" id="dollarSign" />
        <div id="amount_field">
          <form onSubmit={this.handleSubmit}>
            <input
              type="number"
              id="Amount"
              className="transfer_field"
              placeholder="Enter amount"
              value={this.state.amount}
              onChange={this.handleChange}
              pattern="[0-9]{7}"
              step=".01"
              min=".01"
            />
            <div id="transfer_btn">
              <input
                type={this.state.readyToSubmit ? "submit" : "hidden"}
                value="Transfer"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

class TransferFunds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenView: "transferDetails",
    };
    this.startTransaction = this.startTransaction.bind(this);
    this.processTransaction = this.processTransaction.bind(this);
    this.transactionComplete = this.transactionComplete.bind(this);
    this.changeView = this.changeView.bind(this);

    this.transferDetailsRef = React.createRef(null);
    this.confirmationScreenRef = React.createRef(null);
    this.processingAnimationRef = React.createRef(null);
    this.transferCompleteRef = React.createRef(null);
  }

  startTransaction(transactionDetails) {
    this.setState({ screenView: "confirmationScreen" });

    this.setState({
      currentTransaction: transactionDetails,
    });
  }

  processTransaction() {
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

    let transaction = this.state.currentTransaction;
    transaction.sendAccnt.balance -= Number(transaction.amount);
    transaction.recAccnt.balance += Number(transaction.amount);

    const transactionDetailsRecAccnt = {
      amount: transaction.amount,
      type: "Transfer",
      action: "Add",
      date: `${month}/${day}/${year}`,
      origin: `from ${transaction.sendAccnt.accountType} Account`,
      endingBalance: transaction.recAccnt.balance.toFixed(2),
      time: `${hours}:${min} ${amOrPm}`,
      timestamp: timestamp,
    };

    const transactionDetailsSendAccnt = {
      amount: transaction.amount,
      type: "Transfer",
      action: "Subtract",
      date: `${month}/${day}/${year}`,
      origin: `to ${transaction.recAccnt.accountType} Account`,
      endingBalance: transaction.sendAccnt.balance.toFixed(2),
      time: `${hours}:${min} ${amOrPm}`,
      timestamp: timestamp,
    };

    transaction.recAccnt.transactions.push(transactionDetailsRecAccnt);
    transaction.sendAccnt.transactions.push(transactionDetailsSendAccnt);

    this.setState({ screenView: "processingAnimation" });
  }

  transactionComplete() {
    this.setState({ screenView: "transferComplete" });
  }

  changeView(viewChoice) {
    this.setState({ screenView: viewChoice });
  }

  render() {
    return (
      <div id="transfer_funds_container" ref={this.props.nodeRef}>
        <TransitionGroup>
          {this.state.screenView === "transferDetails" ? (
            <CSSTransition
              nodeRef={this.transferDetailsRef}
              in={this.state.screenView === "transferDetails"}
              timeout={1000}
              classNames="horizontal_slide"
            >
              <TransferDetails
                nodeRef={this.transferDetailsRef}
                startTransaction={(transactionDetails) =>
                  this.startTransaction(transactionDetails)
                }
              />
            </CSSTransition>
          ) : null}
        </TransitionGroup>

        <TransitionGroup>
          {this.state.screenView === "confirmationScreen" ? (
            <CSSTransition
              nodeRef={this.confirmationScreenRef}
              in={this.state.screenView === "confirmationScreen"}
              timeout={1000}
              classNames="slideIn_fadeOut"
            >
              <Confirmation
                nodeRef={this.confirmationScreenRef}
                transactionType="TransferFunds"
                trxn={this.state.currentTransaction}
                confirmed={() => this.processTransaction()}
                cancel={() => this.changeView("transferDetails")}
              />
            </CSSTransition>
          ) : null}
        </TransitionGroup>

        <TransitionGroup>
          {this.state.screenView === "processingAnimation" ? (
            <CSSTransition
              nodeRef={this.processingAnimationRef}
              in={this.state.screenView === "processingAnimation"}
              timeout={1000}
              classNames="fade"
            >
              <ProcessingAnimation
                nodeRef={this.processingAnimationRef}
                transactionComplete={() => this.transactionComplete()}
                transactionType="TransferFunds"
                transactionDetails={this.state.currentTransaction}
              />
            </CSSTransition>
          ) : null}
        </TransitionGroup>

        <TransitionGroup>
          {this.state.screenView === "transferComplete" ? (
            <CSSTransition
              nodeRef={this.transferCompleteRef}
              in={this.state.screenView === "transferComplete"}
              timeout={1000}
              classNames="fade"
            >
              <TransactionComplete
                nodeRef={this.transferCompleteRef}
                transactionType="TransferFunds"
                changeView={(viewChoice) => this.changeView(viewChoice)}
                returnHome={() => this.props.returnHome()}
              />
            </CSSTransition>
          ) : null}
        </TransitionGroup>
      </div>
    );
  }
}

export default TransferFunds;
