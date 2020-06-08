import React, { Component } from 'react'
import ReactPlayer from  "react-player"
import video from "../../assets/file_example_MP4_480_1_5MG.mp4";
import "./buyer.css"
import { memoryHistory, browserHistory } from "../../helpers/history";
import { connect } from "react-redux";


class videoPlayer extends Component {

    SkiptoHomepgae() {      
              browserHistory.push("/home"); 
    }
    render() {

       let isAuthenticated = this.props.user !== null;
       let user = this.props.user;
       let userTypeId = user.refRoleId;

        return (
          <div className="">
            {user.refRoleId == "1" ? (
              <ReactPlayer
                controls
                width="100vw"
                height="98vh"
                url={video}
                onEnded={() => this.SkiptoHomepgae()}
              ></ReactPlayer>
            ) : (
              <ReactPlayer
                controls
                width="100vw"
                height="98vh"
                url={video}
                onEnded={() => this.SkiptoHomepgae()}
              ></ReactPlayer>
            )}

            <button
              className="blackButton SkipButtonVideo"
              onClick={() => this.SkiptoHomepgae()}
            >
              Skip to Homepage
            </button>
          </div>
        );
    }
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

 const connectedLoginPage = connect(mapStateToProps)(videoPlayer);
 export default connectedLoginPage;
