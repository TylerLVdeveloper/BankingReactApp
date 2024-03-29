import React from "react";
import style from "Stylesheets/AccountDetails.module.css";
import "App.css";
import TransactionDetailsModal from "Components/Modals/TransactionDetailsModal.js";

// Package used for CSS transitions as components enter or leave the DOM
import { CSSTransition, TransitionGroup } from "react-transition-group";

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

    this.resultModalRef = React.createRef(null);
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
    const balance = account.balance.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });
    return (
      <div ref={this.props.nodeRef}>
        <div id={style.account_heading}>
          <div id={style.accountTitle}>{account.accountType}</div>
          <div id={style.accountNumber}>{account.accountNumber}</div>
          <div className={style.summary_value}>${balance}</div>
          <div className={style.summary_label}>Available Balance</div>
        </div>
        <div id={style.account_details_container}>
          <TransitionGroup>
            {this.state.transactionDetailsModal.visible ? (
              <CSSTransition
                nodeRef={this.resultModalRef}
                in={this.state.transactionDetailsModal.visible}
                timeout={500}
                classNames="result_modal_transition"
              >
                <TransactionDetailsModal
                  trxn={this.state.transactionDetailsModal.transaction}
                  cancel={() => this.closeModal()}
                  nodeRef={this.resultModalRef}
                />
              </CSSTransition>
            ) : null}
          </TransitionGroup>

          {account.transactions.map((transaction, i, _) => {
            return (
              <div
                className={style.transaction}
                onClick={() => this.viewTransactionDetails(transaction)}
                key={i}
              >
                <div className={style.date}>{transaction.date}</div>
                <div className={style.type}>{transaction.type}</div>
                {transaction.action === "Add" ? (
                  <div className={style.added}>
                    + $
                    {Number(transaction.amount).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                ) : (
                  <div className={style.removed}>
                    - $
                    {Number(transaction.amount).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default AccountDetails;
