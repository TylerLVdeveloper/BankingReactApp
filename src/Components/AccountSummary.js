import React from "react";
import "Stylesheets/AccountSummary.css";
import accountData from "AccountData.js";

class UserGreeting extends React.Component {
  render() {
    return (
      <div id="user_greeting_container">
        <h1>Hello, Tyler</h1>
      </div>
    );
  }
}

class Account extends React.Component {
  render() {
    return (
      <div className="account" onClick={() => this.props.BtnClick()}>
        <div className="accnt_type">{this.props.accountType}</div>
        <div className="balance">Available Balance: ${this.props.balance}</div>
      </div>
    );
  }
}

class AccountSummary extends React.Component {
  render() {
    return (
      <div id="account_summary_container" ref={this.props.nodeRef}>
        <UserGreeting />
        {accountData.map((accnt, i, _) => {
          const balance = accnt.balance.toLocaleString("en-US", {
            minimumFractionDigits: 2,
          });
          return (
            <Account
              accountType={accnt.accountType}
              balance={balance}
              key={accnt.key}
              BtnClick={() => this.props.BtnClick(accnt)}
            />
          );
        })}
      </div>
    );
  }
}

export default AccountSummary;
