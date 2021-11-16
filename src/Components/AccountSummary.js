import React from "react";
import "../Stylesheets/AccountSummary.css";

const accountData = [
  { accountType: "Checking", balance: 2000, key: 0 },
  { accountType: "Savings", balance: 4322, key: 1 },
];

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
      <div className="account">
        <div className="accnt_type">
          <p>{this.props.accountType}</p>
        </div>
        <div className="balance">
          <p>Available Balance: ${this.props.balance}</p>
        </div>
      </div>
    );
  }
}

class AccountSummary extends React.Component {
  render() {
    return (
      <div id="account_summary_container">
        <UserGreeting />
        {accountData.map((accnt, i, _) => {
          return (
            <Account
              accountType={accnt.accountType}
              balance={accnt.balance}
              key={accnt.key}
            />
          );
        })}
      </div>
    );
  }
}

export default AccountSummary;
