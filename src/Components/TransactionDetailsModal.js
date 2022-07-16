import React from "react";
import "../Stylesheets/TransactionDetailsModal.css";

////////Images
import cancelIcon from "../images/cancelIcon.png";

class TransactionDetailsModal extends React.Component {
  render() {
    return (
      <div className="confirmation_modal_overlay" ref={this.props.nodeRef}>
        <div id="confirmation_modal">test</div>
      </div>
    );
  }
}

export default TransactionDetailsModal;
