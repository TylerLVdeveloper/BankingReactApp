import React from "react";
import style from "Stylesheets/SendMoney/Amount.module.css";
import "Stylesheets/TransferFunds.css";
import ResultModal from "Components/Modals/ResultModal.js";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import accountData from "AccountData.js";

class Amount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sendingAccnt: "",
      transferAmount: "",
      readyToSubmit: false,
      resultModal: {
        show: false,
        resultType: null,
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkFormCompletion = this.checkFormCompletion.bind(this);
    this.updateSendingAccntSelection =
      this.updateSendingAccntSelection.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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

  updateSendingAccntSelection(e) {
    this.setState(
      {
        sendingAccnt: e.target.value,
      },
      () => this.checkFormCompletion()
    );
  }

  checkFormCompletion() {
    if (this.state.sendingAccnt !== "" && this.state.transferAmount !== "") {
      this.setState({ readyToSubmit: true });
    } else {
      this.setState({ readyToSubmit: false });
    }
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

    let transferAmount = parseFloat(this.state.transferAmount).toFixed(2);

    if (transferAmount > sendAccnt.balance) {
      this.showResultModal("fail"); // Displays result modal
    } else {
      this.props.selectedDetails(transferAmount, sendAccnt);
    }
  }

  render() {
    return (
      <div id={style.amount_container} ref={this.props.nodeRef}>
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
        <div className={style.page_title}>Enter amount</div>
        <div id={style.form_container}>
          <form onSubmit={this.handleSubmit}>
            <div id={style.amount}>
              <input
                type="number"
                placeholder="ex. 20.00"
                value={this.state.transferAmount}
                onChange={this.handleChange}
                pattern="[0-9]{7}"
                step=".01"
                min=".01"
              />
            </div>
            <div id={style.account}>
              <select
                name="From"
                onChange={(e) => this.updateSendingAccntSelection(e)}
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
            </div>
            <div id={style.review_btn}>
              <input
                type={this.state.readyToSubmit ? "submit" : "hidden"}
                value="Review"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Amount;
