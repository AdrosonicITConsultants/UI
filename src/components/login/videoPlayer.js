import React, { Component } from 'react'
import ReactPlayer from  "react-player"
import video from "../../assets/file_example_MP4_480_1_5MG.mp4";

export default class videoPlayer extends Component {

    SkiptoHomepgae() {
        window.open("./","_self");
    }
    render() {
        return (
          <div className="">
            <ReactPlayer
              controls
              width="100vw"
              height="98vh"
              url={video}
              onEnded={() => this.SkiptoHomepgae()}
            ></ReactPlayer>
            <button
              className="blackButton"
              style={{
                float: "right",
                position: "relative",
                marginRight: "20px",
                marginTop: "-20vh",
              }}
              onClick={() => this.SkiptoHomepgae()}
            >
              Skip to Homepage
            </button>
          </div>
        );
    }
}
