import "./App.css";
import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group"; // ES6

import navigationOptions from "NavigationData.js";

// Top Navigation Component
import TopNavigation from "Components/TopNavigation";

//Main Content Components
import AccountSummary from "Components/AccountSummary";
import LoanRequests from "Components/LoanRequest";
import SendMoney from "Components/SendMoney/SendMoney";
import TransferFunds from "Components/TransferFunds";
import AccountDetails from "Components/AccountDetails";

class MainContent extends React.Component {
  render() {
    if (this.props.activeWindow === "Accounts")
      return <AccountSummary BtnClick={(i) => this.props.BtnClick(i)} />;
    if (this.props.activeWindow === "Transfer Funds")
      return <TransferFunds returnHome={() => this.props.returnHome()} />;
    if (this.props.activeWindow === "Request a Loan") return <LoanRequests />;
    if (this.props.activeWindow === "Send Money")
      return <SendMoney returnHome={() => this.props.returnHome()} />;
    if (this.props.activeWindow === "Account Details")
      return <AccountDetails selectedAccount={this.props.selectedAccount} />;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenuOption: navigationOptions[0],
    };
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.accntClick = this.accntClick.bind(this);
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
      <div>
        <TopNavigation
          BtnClick={(i) => this.handleBtnClick(i)}
          activeMenuOption={this.state.activeMenuOption}
        />
        <TransitionGroup>
          <CSSTransition
            key={this.state.activeMenuOption.key}
            timeout={1000}
            classNames="contentChange"
          >
            <div className="main_content_container">
              <MainContent
                key={this.state.activeMenuOption.key}
                activeWindow={this.state.activeMenuOption.name}
                selectedAccount={this.state.selectedAccount}
                BtnClick={(accnt) => this.accntClick(accnt)}
                returnHome={() => this.returnHome()}
              />
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

export default App;
