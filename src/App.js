import "./App.css";
import React from "react";

// Data Structures
import navigationOptions from "./NavigationData.js";

// Top Navigation Component
import TopNavigation from "./Components/TopNavigation";

//Main Content Components
import AccountSummary from "./Components/AccountSummary";
import LoanRequests from "./Components/LoanRequest";
import SendMoney from "./Components/SendMoney";
import TransferFunds from "./Components/TransferFunds";

class MainContent extends React.Component {
  render() {
    if (this.props.activeWindow === "Account Summary")
      return <AccountSummary />;
    if (this.props.activeWindow === "Transfer Funds") return <TransferFunds />;
    if (this.props.activeWindow === "Request a Loan") return <LoanRequests />;
    if (this.props.activeWindow === "Send Money") return <SendMoney />;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenuOption: navigationOptions[0],
    };
    this.handleBtnClick = this.handleBtnClick.bind(this);
  }

  handleBtnClick(i) {
    this.setState({ activeMenuOption: navigationOptions[i] });
  }
  render() {
    return (
      <div>
        <TopNavigation
          BtnClick={(i) => this.handleBtnClick(i)}
          activeMenuOption={this.state.activeMenuOption}
        />
        <MainContent activeWindow={this.state.activeMenuOption.name} />
      </div>
    );
  }
}

export default App;
