import React from "react";
import style from "Stylesheets/CommonScreens/ProcessingAnimation.module.css";
import cashIcon from "images/cashIcon.png";
import accntIcon from "images/accountSummaryIcon.png";
import personIcon from "images/personIcon.png";

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
      <div className={style.transfer_funds_overlay}>
        <div id={style.animation_title}>
          {this.props.transactionType === "SendMoney" ? "Sending Money" : null}
          {this.props.transactionType === "TransferFunds"
            ? "Transferring Funds"
            : null}
        </div>
        <div id={style.animation_container}>
          <div id={style.fromAccnt}>
            <img src={accntIcon} alt="" />
            {transaction.sendAccnt.accountType}{" "}
            {transaction.sendAccnt.accountNumber}
          </div>
          <div id={style.cash_icon}>
            <img src={cashIcon} alt="" />
          </div>
          <div id={style.cash_icon2}>
            <img src={cashIcon} alt="" />
          </div>
          <div id={style.cash_icon3}>
            <img src={cashIcon} alt="" />
          </div>
          <div id={style.cash_icon4}>
            <img src={cashIcon} alt="" />
          </div>
          <div id={style.cash_icon5}>
            <img src={cashIcon} alt="" />
          </div>

          {this.props.transactionType === "TransferFunds" ? (
            <div id={style.toAccnt}>
              {" "}
              <img src={accntIcon} alt="" />
              {transaction.recAccnt.accountType}{" "}
              {transaction.recAccnt.accountNumber}
            </div>
          ) : null}

          {this.props.transactionType === "SendMoney" ? (
            <div id={style.toAccnt}>
              {" "}
              <img src={personIcon} alt="" />
              {this.props.recipient.firstName} {this.props.recipient.lastName}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default ProcessingAnimation;
