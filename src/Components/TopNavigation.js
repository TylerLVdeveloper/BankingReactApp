import React from "react";
import "Stylesheets/TopNavigation.css";

import navigationOptions from "../NavigationData.js";

class Button extends React.Component {
  render() {
    return (
      <div
        className={this.props.buttonStyle}
        onClick={() => this.props.BtnClick()}
      >
        <img src={this.props.icon} alt="" />
        <br />

        {this.props.buttonName}
      </div>
    );
  }
}

class TopNavigation extends React.Component {
  render() {
    return (
      <div id="top_nav_container">
        {navigationOptions.map((btn, i, _) => {
          return (
            <Button
              key={i}
              buttonStyle={
                btn === this.props.activeMenuOption
                  ? "active_btn btn"
                  : "inactive_btn btn"
              }
              buttonName={btn.name}
              icon={btn.icon}
              BtnClick={() => this.props.BtnClick(i)}
            />
          );
        })}
      </div>
    );
  }
}

export default TopNavigation;
