import React from "react";
import style from "Stylesheets/SendMoney/Recipients.module.css";

import recipientData from "RecipientData.js";

class Recipients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id={style.recipient_container} ref={this.props.nodeRef}>
        <div className={style.page_title}>Select recipient</div>
        <div className={style.recipient_list}>
          {recipientData.map((recipient) => {
            return (
              <div
                className={style.recipient}
                onClick={() => this.props.selectedRecipient(recipient)}
                key={recipient.phoneNumber}
              >
                {`${recipient.firstName} ${recipient.lastName}`}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Recipients;
