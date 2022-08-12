import React from "react";
import style from "Stylesheets/CommonComponents/AcceptButton.module.css";

class AcceptButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.text === "Cancel")
      return (
        <button
          onClick={() => this.props.onClick()}
          className={`${style.confirmation_btn} ${style.cancel}`}
        >
          {this.props.text}
        </button>
      );

    if (this.props.text === "Confirm")
      return (
        <button
          onClick={() => this.props.onClick()}
          className={`${style.confirmation_btn} ${style.confirm}`}
        >
          {this.props.text}
        </button>
      );
  }
}

export default AcceptButton;
//
