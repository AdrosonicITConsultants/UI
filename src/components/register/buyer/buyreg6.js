import React, { Component } from 'react';
import { Row, Col, Container } from "reactstrap";
import "../../Homepage/homepage.css";
import logos from "../../../assets"
import customToast from "../../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import TTCEapi from '../../../services/API/TTCEapi';

export default class buyreg6 extends Component {
    constructor() {
        super();
        this.state = {
          weblink : "",
          sociallink : "",
          checktc : false,
         
        };
      }
    
      operation() {
        debugger;
        if(document.getElementById('agree').checked)
            {this.props.sl(this.state.weblink,this.state.sociallink);
            }
            else{
         customToast.error("Please agree to T&C", {
           position: toast.POSITION.TOP_RIGHT,
           autoClose: true,
         });
            }
            // window.open("./", "_self"); // to redirect to login page
            // this.props.handler(5);
         
      }

      backoperation() {
         this.props.handler(4);
        }
    
    
      handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        
      }
      componentDidMount(){
        if(document.getElementById('agree').checked){
          this.setState({checktc : true});
        }
        else{
          this.setState({checktc : false});
        }
        this.setState({weblink : this.props.weblink ,
          sociallink : this.props.sociallink,

         },()=>{
          console.log(this.state);
         });
        

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
              <div className="demoab text-center"  >
                <br></br>
                <Row   className="">
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
                <br></br>
                <Row
                   
                  className="text-left line32  fontplay font3"
                >
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
                    Enter your details to complete registration
                  </span>
                </Row>
                <br></br>
                <Row  >
                  <span className="col-xs-1"></span>
                  <span
                    style={{ fontWeight: "600" }}
                    className="col-xs-10 line32 text-center fontplay font3"
                  >
                    {/* <img src={logos.locklogo}   
                        className="locklogo1 glyphicon mr-5"></img> */}
                    Provide your link for web presence
                  </span>
                </Row>
                <br></br>

                <Row  >
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

                <Row  >
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
                          type="url"
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
                          type="url"
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

                <br></br>

                <Row   className="text-center line312 font1">
                  <div
                    style={{
                      fontFamily: "var(--LatoFont)",
                      color: "grey",
                      marginTop: "10px",
                      fontSize: "15px",
                    }}
                    className="col-xs-12 text-center"
                  >
                    <input
                      type="checkbox"
                      name="checkbox"
                      value="check"
                      id="agree"
                    />{" "}
                    You hearby agree to our
                    <a
                      style={{ cursor: "pointer", fontSize: "15px" }}
                      href={TTCEapi.DocumentsURL + "TERMS_and_CONDITIONS.pdf"}
                      target="_blank"
                    >
                      Terms and condition
                    </a>
                  </div>
                </Row>
                <br></br>
                <Row  >
                  <div className="col-xs-12 text-center">
                    <button
                      className="blackButton"
                      onClick={() => this.operation()}
                      // disabled = {this.state.checktc}
                      // { this.state.checktc == false  ? (disabled) : () }
                    >
                      Complete
                    </button>
                  </div>
                </Row>
                <br></br>

                <Row   className="mt30">
                  {/* <span className="col-xs-1 col-md-1"></span> */}
                  <strong className="col-xs-12 text-center line7 help">
                  <a style={{color:"black"}} href={TTCEapi.DocumentsURL + "Help.pdf"}
                                    target="_blank">Help?</a>
                  </strong>
                </Row>

                {/* <Row  >
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
