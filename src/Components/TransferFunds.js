import React from "react";
import "../Stylesheets/TransferFunds.css";
import accountData from "../AccountData";
import dollarSign from "../images/dollarSign.png";

class TransferFunds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sendingAccnt: "0",
      receivingAccnt: "1",
      transferAmount: "",
    };
    this.updateReceivingAccntSelection =
      this.updateReceivingAccntSelection.bind(this);
    this.updateSendingAccntSelection =
      this.updateSendingAccntSelection.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateReceivingAccntSelection(e) {
    this.setState({
      receivingAccnt: e.target.value,
    });
  }

  updateSendingAccntSelection(e) {
    this.setState({
      sendingAccnt: e.target.value,
    });
  }

  handleChange(e) {
    this.setState({ transferAmount: e.target.value });
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
    sendAccnt.balance -= this.state.transferAmount;
    recAccnt.balance += Number(this.state.transferAmount);
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
            <input type="submit" value="Transfer" id="transfer_btn" />
          </form>
        </div>
      </div>
    );
  }
}

export default TransferFunds;
