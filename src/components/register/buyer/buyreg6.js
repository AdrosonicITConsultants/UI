import React, { Component } from 'react';
import { Row, Col, Container } from "reactstrap";
import "../../Homepage/homepage.css";
import logos from "../../../assets"

export default class buyreg6 extends Component {
    constructor() {
        super();
        this.state = {
          weblink : "",
          sociallink : "",
         
        };
      }
    
      operation() {
        debugger;
            this.props.sl(this.state.weblink,this.state.sociallink);
            // window.open("./", "_self"); // to redirect to login page
            // this.props.handler(5);
         
      }

      backoperation() {
         this.props.handler(4);
        }
    
    
      handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        
      }
    
    render() {
      const { Country, region } = this.state;
        return (
          <React.Fragment>
            <Col
              xs={{ size: "12" }}
              sm={{ size: "12" }}
              md={{ size: "2" }}
              lg={{ size: "2" }}
              className="vcenter1 fullscreen1"
            ></Col>
            <Col
              xs={{ size: "12" }}
              sm={{ size: "12" }}
              md={{ size: "8" }}
              lg={{ size: "8" }}
              className="vcenter1 "
            >
              <div className="demoab text-center" noGutters={true}>
                <br></br>
                <Row noGutters={true} className="">
                  <div className="col-xs-7">
                    <img
                      src={logos.backarrowicon}
                      className="col-xs-2 margin-arrow arrowsize glyphicon"
                      onClick={() => this.backoperation()}
                    ></img>
                    <div>
                      <h3 className="col-xs-6 margin-registertext text-left">
                        Register
                      </h3>
                      <h4 className="margin-roletext1">Buyer</h4>
                    </div>
                  </div>

                  <img
                    src={logos.mainlogoside}
                    className="col-xs-3 logoreg3wid"
                    alt="TataTrusts logo"
                  ></img>
                </Row>

                <Row noGutters={true} className="text-left line32  font3">
                  {/*  */}
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      color: "var(--lightBlack)",
                    }}
                    className="col-xs-10 ml-6"
                  >
                    {/* <img src={logos.locklogo}   
                    className="locklogo1 glyphicon mr-5"></img> */}
                    Enter your details to complete registeration
                  </span>
                </Row>
                <br></br>
                <Row noGutters={true}>
                  <span className="col-xs-1"></span>
                  <span
                    style={{ fontWeight: "600" }}
                    className="col-xs-10 line32 text-center font3"
                  >
                    {/* <img src={logos.locklogo}   
                        className="locklogo1 glyphicon mr-5"></img> */}
                    Provide your link for web presence
                  </span>
                </Row>
                <br></br>

                <Row noGutters={true}>
                  <div className="col-xs-12 text-center reg6text font2">
                    you can{" "}
                    <text style={{ color: "var(--mainBlue)" }}>skip</text> this
                    step and add
                  </div>
                  <div className="col-xs-12 text-center reg6text font2">
                    your links later in the profile section
                  </div>
                </Row>
                <br></br>

                <Row noGutters={true}>
                  <Col xs={{ size: "12" }}>
                    <Col
                      xs={{ size: "12" }}
                      className="form-group11 text-center"
                    >
                      <label className="control-label  text-center ">
                        Website Link
                      </label>
                      <div className="inner-addon">
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                          type="text"
                          id="weblink"
                          className="form-control reg6textbox BuyerLogin1"
                          //placeholder="firstname"
                          name="weblink"
                          onChange={(e) => this.handleChange(e)}
                        />
                        <br />
                      </div>
                    </Col>
                  </Col>
                  <Col xs={{ size: "12" }}>
                    <Col
                      xs={{ size: "12" }}
                      className="form-group11 text-center"
                    >
                      <label className="control-label  text-center">
                        Social mdeia Link
                      </label>
                      <div className="inner-addon">
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                          type="text"
                          id="sociallink"
                          className="form-control reg6textbox BuyerLogin1"
                          //placeholder="firstname"
                          name="sociallink"
                          onChange={(e) => this.handleChange(e)}
                        />
                        <br />
                      </div>
                    </Col>
                  </Col>
                </Row>
                <Row noGutters={true}>
                  <span className="col-xs-1"></span>
                  <span className="col-xs-10 line322 text-center font3">
                    {/* <img src={logos.locklogo}   
                        className="locklogo1 glyphicon mr-5"></img> */}
                 <img style={{width:"13px", marginRight :"5px"}} src={logos.skiplogo}></img>   skip
                  </span>
                </Row>
                <br></br>

                <Row noGutters={true}>
                  <div className="col-xs-12 text-center">
                    <button
                      style={{
                        background: "#000000",
                        color: "white",
                        borderRadius: "2em",
                        width: "8em",
                        height: "2.5em",
                      }}
                      onClick={() => this.operation()}
                    >
                      Complete
                    </button>
                  </div>
                </Row>
                <br/>
                <Row noGutters={true} className="text-center line312 font1">
                  <div
                    style={{
                      fontFamily: "var(--LatoFont)",
                      color: "grey",
                      marginTop: "10px",
                      fontSize: "10px",
                    }}
                    className="col-xs-12 text-center"
                  >
                    By completing this form and singuo process. you hearby agree
                    to our{" "}
                  </div>
                  <div>
                    <a
                      style={{ cursor: "pointer", fontSize: "10px" }}
                      onClick={() => {
                        alert("clicked");
                      }}
                    >
                      Terms and condition
                    </a>
                  </div>
                </Row>

                <br></br>

                <Row noGutters={true} className="mt17">
                  <strong className="col-xs-3 text-center line7 font3">
                    Help?
                  </strong>
                  <span className="col-xs-4"></span>
                  <span
                    style={{ color: "var(--lightFont)" }}
                    className="col-xs-5 text-center line7 font3"
                  >
                    Privacy policy
                  </span>
                </Row>

                {/* <Row noGutters={true}>
            <span className="col-xs-3 text-center">Help</span>
            <span className="col-xs-5"></span>
            <span className="col-xs-4 text-center">Privacy policy</span>
          </Row> */}
                
              </div>
            </Col>
          </React.Fragment>
        );
    }
}
