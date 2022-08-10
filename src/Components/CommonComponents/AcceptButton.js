import React from "react";
import style from "Stylesheets/CommonComponents/AcceptButton.module.css";

class AcceptButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <button
        onClick={() => this.props.onClick()}
        className={style.confirmation_btn}
      >
        {this.props.text}
      </button>
    );
  }
}

export default AcceptButton;
//
