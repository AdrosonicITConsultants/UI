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
import { memoryHistory, browserHistory } from "../../helpers/history";

class NotificationBuyerCount extends Component {
  constructor() {
    super();

    this.state = {
      notificationCount: 0
    };
  }

  componentDidMount(){
    TTCEapi.getAllNotifications().then((response)=>{
      if(response){
        if(response.data.valid)
        {
          this.setState({notificationCount:response.data.data.count})
        }
      }
        else{
          browserHistory.push("/404error")

        }
    })
  } 

  render() {
    return (
      <div>
        <div>
          <NotificationBadge  count={this.state.notificationCount} effect={Effect.ROTATE_X}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

const NotificationBuyerConnected = connect(mapStateToProps)(NotificationBuyerCount);
export default NotificationBuyerConnected;
