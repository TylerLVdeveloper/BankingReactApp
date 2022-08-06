import accntSummaryIcon from "./images/accountSummaryIcon.png";
import sendIcon from "./images/sendIcon.png";
import transferFundsIcon from "./images/transferFundsIcon.png";
import accountIcon from "./images/accountIcon.png";
const navigationOptions = [
  {
    name: "Accounts",
    key: 0,
    icon: accntSummaryIcon,
  },
  { name: "Transfer Funds", key: 1, icon: transferFundsIcon },
  { name: "Send Money", key: 2, icon: sendIcon },
  { name: "Profile", key: 3, icon: accountIcon },
];

export default navigationOptions;
