import React from "react";
import "Stylesheets/Modals/ResultModal.css";

class ResultModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
    };
  }
  componentDidMount() {
    if (this.props.resultType === "fail")
      this.setState({
        message: `Amount exceeds available balance.`,
      });
  }
  render() {
    return (
      <div
        ref={this.props.nodeRef}
        id="result_modal"
        className={this.props.resultType}
      >
        {this.state.message}
      </div>
    );
  }
}

export default ResultModal;
