import React from "react";
import "../Stylesheets/TransferFunds.css";
import accountData from "../AccountData";
import dollarSign from "../images/dollarSign.png";

class TransferComplete extends React.Component {
  render() {
    return (
      <div className="animation_container">
        Transfer Complete!
        <div onClick={() => this.props.changeView("account summary")}>
          View Account Summary
        </div>
        <div onClick={() => this.props.changeView("transferDetails")}>
          Make another transfer
        </div>
      </div>
    );
  }
}

class ProcessingAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 5,
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
    return <div className="animation_container">Test: {this.state.timer}</div>;
  }
}

class ConfirmationScreen extends React.Component {
  render() {
    return (
      <div className="confirmation_container">
        Confirm Transaction <br />
        <div onClick={() => this.props.confirm()}>Yes</div>
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
    };
    this.updateReceivingAccntSelection =
      this.updateReceivingAccntSelection.bind(this);
    this.updateSendingAccntSelection =
      this.updateSendingAccntSelection.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkFormCompletion = this.checkFormCompletion.bind(this);
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
    let transferAmount = this.state.transferAmount;
    let transactionDetails = {
      sendAccnt,
      recAccnt,
      transferAmount,
    };

    this.props.startTransaction(transactionDetails);
  }

  render() {
    return (
      <div id="transfer_container">
        <h3>From</h3>
        <select
          id="From"
          name="From"
          onChange={(e) => this.updateSendingAccntSelection(e)}
          className="transfer_field"
        >
          <option value="" disabled selected>
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
        >
          <option value="" disabled selected>
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
              placeholder="ex 20.00"
              value={this.state.transferAmount}
              onChange={this.handleChange}
            />
            <input
              type={this.state.readyToSubmit ? "submit" : "hidden"}
              value="Transfer"
              id="transfer_btn"
            />
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
  }

  startTransaction(transactionDetails) {
    this.setState({ screenView: "confirmationScreen" });

    this.setState({
      currentTransaction: transactionDetails,
    });
  }

  processTransaction() {
    let transaction = this.state.currentTransaction;
    transaction.sendAccnt.balance -= Number(transaction.transferAmount);
    transaction.recAccnt.balance += Number(transaction.transferAmount);

    this.changeView("processingAnimation");
  }

  transactionComplete() {
    this.setState({ screenView: "transferComplete" });
  }

  changeView(viewChoice) {
    this.setState({ screenView: viewChoice });
  }

  render() {
    if (this.state.screenView === "transferDetails")
      return (
        <TransferDetails
          startTransaction={(transactionDetails) =>
            this.startTransaction(transactionDetails)
          }
        />
      );

    if (this.state.screenView === "confirmationScreen")
      return <ConfirmationScreen confirm={() => this.processTransaction()} />;

    if (this.state.screenView === "processingAnimation")
      return (
        <ProcessingAnimation
          transactionComplete={() => this.transactionComplete()}
        />
      );

    if (this.state.screenView === "transferComplete")
      return (
        <TransferComplete
          changeView={(viewChoice) => this.changeView(viewChoice)}
        />
      );
  }
}

export default TransferFunds;
