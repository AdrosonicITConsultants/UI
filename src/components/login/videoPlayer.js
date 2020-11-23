import React, { Component } from 'react'
import ReactPlayer from  "react-player"
import video from "../../assets/file_example_MP4_480_1_5MG.mp4";
import "./buyer.css"
import { memoryHistory, browserHistory } from "../../helpers/history";
import { connect } from "react-redux";
import CMSApi from '../../services/API/CMSApi';
import { useTranslation, withTranslation } from "react-i18next";

class videoPlayer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      videoData : "",  
    };
  
  }

    SkiptoHomepgae() {  
      localStorage.setItem("skipVideo", true);    
      browserHistory.push("/home"); 
    }

    componentDidMount () {
      CMSApi.getDemoVideos().then((response)=>{
        if(response)
        {
          this.setState({
            videoData : response.data[0].acf
          })
        }
      })
    }

    render() {

       let isAuthenticated = this.props.user !== null;
       let user = JSON.parse(localStorage.getItem("user"));
       let userTypeId = user ? user.refRoleId ? user.refRoleId : "2" : null;

        return (
          <div className="">
            { this.state.videoData ?
            user ? user.refRoleId == "1" ? (
              <ReactPlayer
                controls
                width="100vw"
                height="98vh"
                url={this.state.videoData.artisan_demo_video}
                onEnded={() => this.SkiptoHomepgae()}
              ></ReactPlayer>
            ) : (
              <ReactPlayer
                controls
                width="100vw"
                height="98vh"
                url={this.state.videoData.buyer_demo_video}
                onEnded={() => this.SkiptoHomepgae()}
              ></ReactPlayer>
            ) : null : null}

            <button
              className="blackButton SkipButtonVideo"
              onClick={() => this.SkiptoHomepgae()}
            >
              {user ? user.refRoleId == "1" ?
              this.props.t("Pages.object.skipToHomePage")
              :
              "Skip to Homepage" 
            : "Skip to Homepage"}
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

 export default withTranslation()(connectedLoginPage);
