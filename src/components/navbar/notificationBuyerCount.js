import React, { Component } from "react";
import "./navbar.css";
import { connect } from "react-redux";
import Autosuggest from "react-autosuggest";
import axios from "axios";
import logos from "../../assets";
import "./suggestions.css";
import * as Actions from "../../redux/action/action";
import TTCEapi from "../../services/API/TTCEapi";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { left } from "glamor";

class NotificationBuyerCount extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div>
        <div>
          <NotificationBadge  count="10" effect={Effect.ROTATE_X}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  console.log("User : ");
  console.log(user);
  return { user };
}

const NotificationBuyerConnected = connect(mapStateToProps)(NotificationBuyerCount);
export default NotificationBuyerConnected;
