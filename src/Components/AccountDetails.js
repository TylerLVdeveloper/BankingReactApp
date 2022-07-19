import React from "react";
import style from "../Stylesheets/AccountDetails.module.css";
import TransactionDetailsModal from "./TransactionDetailsModal.js";

class AccountDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionDetailsModal: {
        visible: false,
        transaction: null,
      },
    };
    this.viewTransactionDetails = this.viewTransactionDetails.bind(this);
  }

  closeModal() {
    this.setState({
      transactionDetailsModal: { visible: false, transaction: null },
    });
  }

  viewTransactionDetails(trxn) {
    this.setState({
      transactionDetailsModal: {
        visible: true,
        transaction: trxn,
      },
    });
  }

  render() {
    const account = this.props.selectedAccount;
    return (
      <div id={style.account_details_container}>
        {this.state.transactionDetailsModal.visible ? (
          <TransactionDetailsModal
            trxn={this.state.transactionDetailsModal.transaction}
            cancel={() => this.closeModal()}
          />
        ) : null}
        <div id={style.account_heading}>
          <div id={style.accountTitle}>{account.accountType}</div>
          <div id={style.accountNumber}>{account.accountNumber}</div>
        </div>

        {account.transactions.map((transaction, i, _) => {
          return (
            <div
              className={style.transaction}
              onClick={() => this.viewTransactionDetails(transaction)}
            >
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
