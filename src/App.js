import "./App.css";
import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group"; // ES6

// Data Structures
import navigationOptions from "./NavigationData.js";
// import accountData from "./AccountData";

// Top Navigation Component
import TopNavigation from "./Components/TopNavigation";

//Main Content Components
import AccountSummary from "./Components/AccountSummary";
import LoanRequests from "./Components/LoanRequest";
import SendMoney from "./Components/SendMoney";
import TransferFunds from "./Components/TransferFunds";
import AccountDetails from "./Components/AccountDetails";

class MainContent extends React.Component {
  render() {
    if (this.props.activeWindow === "Account Summary")
      return <AccountSummary BtnClick={(i) => this.props.BtnClick(i)} />;
    if (this.props.activeWindow === "Transfer Funds") return <TransferFunds />;
    if (this.props.activeWindow === "Request a Loan") return <LoanRequests />;
    if (this.props.activeWindow === "Send Money") return <SendMoney />;
    if (this.props.activeWindow === "Account Details")
      return <AccountDetails />;
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

  accntClick(i) {
    this.setState({ activeMenuOption: { name: "Account Details", key: 4 } });
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
                BtnClick={(i) => this.accntClick(i)}
              />
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

export default App;
