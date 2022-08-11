import "./App.css";
import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group"; // ES6

import navigationOptions from "NavigationData.js";

// Top Navigation Component
import TopNavigation from "Components/TopNavigation";

import "Stylesheets/TransitionStyles.css";

//Main Content Components
import AccountSummary from "Components/AccountSummary";
import SendMoney from "Components/SendMoney/SendMoney";
import TransferFunds from "Components/TransferFunds";
import AccountDetails from "Components/AccountDetails";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenuOption: navigationOptions[0],
    };
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.accntClick = this.accntClick.bind(this);

    this.accountsRef = React.createRef(null);
    this.transferFundsRef = React.createRef(null);
    this.sendMoneyRef = React.createRef(null);
    this.accountDetailsRef = React.createRef(null);
  }

  accntClick(accnt) {
    this.setState({
      activeMenuOption: { name: "Account Details", key: 4 },
      selectedAccount: accnt,
    });
  }

  handleBtnClick(i) {
    this.setState({ activeMenuOption: navigationOptions[i] });
  }

  returnHome() {
    this.setState({ activeMenuOption: navigationOptions[0] });
  }

  render() {
    return (
      <div id="page_container">
        <TopNavigation
          BtnClick={(i) => this.handleBtnClick(i)}
          activeMenuOption={this.state.activeMenuOption}
        />

        <div className="main_content_container">
          <TransitionGroup>
            {this.state.activeMenuOption.name === "Accounts" ? (
              <CSSTransition
                nodeRef={this.accountsRef}
                in={this.state.activeMenuOption.name === "Accounts"}
                timeout={1000}
                classNames="fade"
              >
                <AccountSummary
                  BtnClick={(accnt) => this.accntClick(accnt)}
                  nodeRef={this.accountsRef}
                />
              </CSSTransition>
            ) : null}
          </TransitionGroup>
          <TransitionGroup>
            {this.state.activeMenuOption.name === "Transfer Funds" ? (
              <CSSTransition
                nodeRef={this.transferFundsRef}
                in={this.state.activeMenuOption.name === "Transfer Funds"}
                timeout={1000}
                classNames="fade"
              >
                <TransferFunds
                  returnHome={() => this.returnHome()}
                  nodeRef={this.transferFundsRef}
                />
              </CSSTransition>
            ) : null}
          </TransitionGroup>
          <TransitionGroup>
            {this.state.activeMenuOption.name === "Send Money" ? (
              <CSSTransition
                nodeRef={this.sendMoneyRef}
                in={this.state.activeMenuOption.name === "Send Money"}
                timeout={1000}
                classNames="fade"
              >
                <SendMoney
                  returnHome={() => this.returnHome()}
                  nodeRef={this.sendMoneyRef}
                />
              </CSSTransition>
            ) : null}
          </TransitionGroup>
          <TransitionGroup>
            {this.state.activeMenuOption.name === "Account Details" ? (
              <CSSTransition
                nodeRef={this.accountDetailsRef}
                in={this.state.activeMenuOption.name === "Account Details"}
                timeout={1000}
                classNames="fade"
              >
                <AccountDetails
                  selectedAccount={this.state.selectedAccount}
                  nodeRef={this.accountDetailsRef}
                />
              </CSSTransition>
            ) : null}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

export default App;
