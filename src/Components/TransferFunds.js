import React from "react";
import "Stylesheets/TransferFunds.css";
import accountData from "AccountData.js";
import dollarSign from "images/dollarSign.png";
import cashIcon from "images/cashIcon.png";
import accntIcon from "images/accountSummaryIcon.png";

import ResultModal from "Components/Modals/ResultModal.js"; // Displays result message to user after completed action

import { CSSTransition, TransitionGroup } from "react-transition-group"; // ES6

class TransferComplete extends React.Component {
  render() {
    return (
      <div className="transfer_message_container">
        <p id="transfer_complete_message">Transfer Complete!</p>

        <div
          className="transfer_complete_btn"
          id="return_home_btn"
          onClick={() => this.props.returnHome()}
        >
          View Account Summary
        </div>
        <div
          className="transfer_complete_btn"
          id="new_transfer_btn"
          onClick={() => this.props.changeView("transferDetails")}
        >
          Start a New Transfer
        </div>
      </div>
    );
  }
}

class ProcessingAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 7,
    };
    this.tick = this.tick.bind(this);
  }

  tick() {
    this.setState({
      timer: this.state.timer - 1,
    });
  }

  componentDidMount() {
    this.countdown = setInterval(() => {
      if (this.state.timer > 1) {
        this.tick();
      } else {
        clearInterval(this.countdown);
        this.props.transactionComplete();
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.countdown);
  }

  render() {
    const transaction = this.props.transactionDetails;
    return (
      <div className="transfer_funds_overlay">
        <div id="animation_title">Transferring</div>
        <div id="animation_container">
          <div id="fromAccnt">
            <img src={accntIcon} alt="" />
            {transaction.sendAccnt.accountType}{" "}
            {transaction.sendAccnt.accountNumber}
          </div>
          <div id="cash_icon">
            <img src={cashIcon} alt="" />
          </div>
          <div id="cash_icon2">
            <img src={cashIcon} alt="" />
          </div>
          <div id="cash_icon3">
            <img src={cashIcon} alt="" />
          </div>
          <div id="cash_icon4">
            <img src={cashIcon} alt="" />
          </div>
          <div id="cash_icon5">
            <img src={cashIcon} alt="" />
          </div>
          <div id="toAccnt">
            <img src={accntIcon} alt="" />
            {transaction.recAccnt.accountType}{" "}
            {transaction.recAccnt.accountNumber}
          </div>
        </div>
      </div>
    );
  }
}

class ConfirmationScreen extends React.Component {
  render() {
    const transaction = this.props.transactionDetails;
    const message = `Are you sure you want to transfer $${transaction.transferAmount} from
    your ${transaction.sendAccnt.accountType} Account (${transaction.sendAccnt.accountNumber}) to your ${transaction.recAccnt.accountType} Account (${transaction.recAccnt.accountNumber})? `;

    return (
      <div className="transfer_message_container">
        <p id="confirmation_message">{message}</p>

        <div
          className="transfer_funds_btn"
          id="transfer_funds_confirm_btn"
          onClick={() => this.props.confirm()}
        >
          Yes, transfer
        </div>
        <div
          className="transfer_funds_btn"
          id="transfer_funds_cancel_btn"
          onClick={() => this.props.cancel()}
        >
          No, cancel
        </div>
      </div>
    );
  }
}

class TransferDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sendingAccnt: "",
      receivingAccnt: "",
      transferAmount: "",
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
      this.state.transferAmount !== ""
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

    this.setState({ transferAmount: e.target.value }, () =>
      this.checkFormCompletion()
    );
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
    let transferAmount = parseFloat(this.state.transferAmount).toFixed(2);

    if (transferAmount > sendAccnt.balance) {
      this.showResultModal("fail"); // Displays result modal
    } else {
      let transactionDetails = {
        sendAccnt,
        recAccnt,
        transferAmount,
      };

      this.props.startTransaction(transactionDetails);
    }
  }

  render() {
    return (
      <div id="transfer_container">
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
                phoneNumber={this.state.resultModal.phoneNumber}
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
          <option value="" selected>
            Select an account
          </option>
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
          <option value="" selected>
            Select an account
          </option>
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
              placeholder="ex. 20.00"
              value={this.state.transferAmount}
              onChange={this.handleChange}
              pattern="[0-9]{7}"
              step=".01"
              min=".01"
            />
            <div id="transfer_btn">
              <input
                type={this.state.readyToSubmit ? "submit" : "hidden"}
                value="Transfer"
                // disabled
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

class TransferFundsContainer extends React.Component {
  render() {
    if (this.props.screenView === "transferDetails")
      return (
        <TransferDetails
          startTransaction={(transactionDetails) =>
            this.props.startTransaction(transactionDetails)
          }
        />
      );

    if (this.props.screenView === "confirmationScreen")
      return (
        <ConfirmationScreen
          confirm={() => this.props.confirm()}
          cancel={() => this.props.cancel()}
          transactionDetails={this.props.currentTransaction}
        />
      );

    if (this.props.screenView === "processingAnimation")
      return (
        <ProcessingAnimation
          transactionComplete={() => this.props.transactionComplete()}
          transactionDetails={this.props.currentTransaction}
        />
      );

    if (this.props.screenView === "transferComplete")
      return (
        <TransferComplete
          changeView={(viewChoice) => this.props.changeView(viewChoice)}
          returnHome={() => this.props.returnHome()}
        />
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
    transaction.sendAccnt.balance -= Number(transaction.transferAmount);
    transaction.recAccnt.balance += Number(transaction.transferAmount);

    const transactionDetailsRecAccnt = {
      amount: transaction.transferAmount,
      type: "Transfer",
      action: "Add",
      date: `${month}/${day}/${year}`,
      origin: `from ${transaction.sendAccnt.accountType} Account`,
      endingBalance: transaction.recAccnt.balance.toFixed(2),
      time: `${hours}:${min} ${amOrPm}`,
      timestamp: timestamp,
    };

    const transactionDetailsSendAccnt = {
      amount: transaction.transferAmount,
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
      <div id="transfer_funds_container">
        <TransitionGroup>
          <CSSTransition
            key={this.state.screenView}
            timeout={1000}
            classNames="contentChange"
          >
            <TransferFundsContainer
              screenView={this.state.screenView}
              key={this.state.screenView}
              startTransaction={(transactionDetails) =>
                this.startTransaction(transactionDetails)
              }
              confirm={() => this.processTransaction()}
              cancel={() => this.changeView("transferDetails")}
              currentTransaction={this.state.currentTransaction}
              transactionComplete={() => this.transactionComplete()}
              changeView={(viewChoice) => this.changeView(viewChoice)}
              returnHome={() => this.props.returnHome()}
            />
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

export default TransferFunds;
