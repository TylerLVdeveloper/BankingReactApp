import React from "react";
import style from "../Stylesheets/AccountDetails.module.css";

class AccountDetails extends React.Component {
  render() {
    const account = this.props.selectedAccount;
    return (
      <div id={style.account_details_container}>
        <div id={style.account_heading}>
          <div id={style.accountTitle}>{account.accountType}</div>
          <div id={style.accountNumber}>{account.accountNumber}</div>
        </div>

        {account.transactions.map((transaction, i, _) => {
          return (
            <div className={style.transaction}>
              <div className={style.date}>{transaction.date}</div>
              <div className={style.type}>{transaction.type}</div>
              <div className={style.amount}>${transaction.amount}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default AccountDetails;
