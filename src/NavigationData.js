import accntSummaryIcon from "./images/accountSummaryIcon.png";
import sendIcon from "./images/sendIcon.png";
import transferFundsIcon from "./images/transferFundsIcon.png";
import loanRequest from "./images/loanRequestIcon.png";
const navigationOptions = [
  {
    name: "Account Summary",
    key: 0,
    icon: accntSummaryIcon,
  },
  { name: "Transfer Funds", key: 1, icon: transferFundsIcon },
  { name: "Send Money", key: 2, icon: sendIcon },
  { name: "Request a Loan", key: 3, icon: loanRequest },
];

export default navigationOptions;
