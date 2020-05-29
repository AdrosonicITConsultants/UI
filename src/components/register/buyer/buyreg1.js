import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import "../../Homepage/homepage.css";
import logos from "../../../assets";
import isEmail from "validator/lib/isEmail";   
import customToast from "../../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { memoryHistory, browserHistory } from "../../../helpers/history";



toast.configure()
export default class buyreg1 extends Component {
  constructor() {
    super();
    this.state = {
      emailid: "",
      otppin: "",
      showValidation: false,
      showValidationpin: false,
      showUserName: true,
    };
  }
  operation1() {    
    const emailcheck = isEmail;
    
    // validator.isEmail(this.state.emailid);
    if (this.state.emailid == "" || !emailcheck(this.state.emailid)) {
      this.setState({
        showValidation: !this.state.showValidation,
      });
    }
    else{
      this.props.so(this.state.emailid);
      // toast.success("OTP sent successfully.",{position:toast.POSITION.TOP_CENTER})    
    }
  }
  operation() {
    debugger;
    const emailcheck = isEmail;
    if (this.state.emailid == "" ||!emailcheck(this.state.emailid)) {
      this.setState({
        showValidation: !this.state.showValidation,
      });
    } else if (this.state.otppin == "") {
      this.setState({
        showValidationpin: !this.state.showValidationpin,
      });
    } else {
      this.props.vo(this.state.emailid, this.state.otppin);
     
    }
  }

  backoperation() {
    
            browserHistory.push("/"); 
    // this.props.handler(0);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({
      showValidation: false,
      showValidationpin: false,
    });
  }

  render() {
    return (
      <React.Fragment>
        <Col
          xs={{ size: "12" }}
          sm={{ size: "2" }}
          md={{ size: "3" }}
          lg={{ size: "3" }}
          className="vcenter fullscreen"
        ></Col>
        <Col
          xs={{ size: "12" }}
          sm={{ size: "8" }}
          md={{ size: "6" }}
          lg={{ size: "6" }}
          className="vcenter "
        >
          <div className="demoa demoabAnimation text-center" noGutters={true}>
            <br></br>
            <Row noGutters={true} className="">
              <div className="col-xs-6">
                <img
                  src={logos.backarrowicon}
                  className="col-xs-2 margin-arrow arrowsize glyphicon"
                  onClick={() => this.backoperation()}
                ></img>
                <div>
                  <h2 className="col-xs-6 margin-registertext">Register</h2>
                  <h4 className="margin-roletext">Buyer</h4>
                </div>
              </div>

              <img
                src={logos.mainlogoside}
                className="col-xs-6 tatatrustLogo"
                alt="TataTrusts logo"
              ></img>
            </Row>
            <br></br>
            <Row noGutters={true} className="text-center line32 font3">
              <span className="col-xs-1"></span>

              <span className="col-xs-10 fontplay">
                <img
                  src={logos.emaillogo}
                  className="locklogo1 glyphicon mr-5"
                ></img>
                Enter your email ID
              </span>
            </Row>

            <Row noGutters={true}>
              <div className="col-xs-1"></div>
              <div className="form-group col-xs-10 ">
                <label className="control-label"></label>
                <div className="inner-addon ">
                  {/* <i className="glyphicon glyphicon-user"></i> */}
                  <input
                    type="email"
                    id="emailid"
                    className="form-control BuyerLogin"
                    placeholder="emailID"
                    name="emailid"
                    onChange={(e) => this.handleChange(e)}
                  />
                  {this.state.showValidation ? (
                    <span className="bg-danger">
                      please enter valid email ID
                    </span>
                  ) : (
                    <br />
                  )}
                </div>
              </div>
            </Row>

            <Row noGutters={true}>
              <div className="col-xs-12 text-center">
                <button
                  className="blackButton"
                  onClick={() => this.operation1()}
                >
                  Send OTP
                </button>
              </div>
            </Row>

            <Row noGutters={true}>
              <div className="col-xs-1"></div>
              <div className="form-group col-xs-10 ">
                <label className="control-label"></label>
                <div className="inner-addon ">
                  {/* <i className="glyphicon glyphicon-user"></i> */}
                  <input
                    type="number"
                    id="otppin"
                    className="form-control BuyerLogin"
                    placeholder="Enter OTP received in your email id"
                    name="otppin"
                    onChange={(e) => this.handleChange(e)}
                  />
                  {this.state.showValidationpin ? (
                    <span className="bg-danger">please enter OTP</span>
                  ) : (
                    <br />
                  )}
                </div>
              </div>
            </Row>

            <Row noGutters={true}>
              <div className="col-xs-12 text-center">
                <button
                  className="blackButton"
                  style={{
                    width: "11em",
                  }}
                  onClick={() => this.operation()}
                >
                  Verify & proceed
                </button>
              </div>
            </Row>
            <br />
            <hr className="hrline"></hr>
            <Row noGutters={true} className="text-center line311 font3">
              <span className="col-xs-2"></span>
              <span className="col-xs-8">In case of any help </span>
            </Row>

            <br />
            <Row noGutters={true}>
              <div className="col-xs-12 text-center">
                <button
                  className="whiteButton"
                  style={{
                    width: "10em",
                  }}
                  //   onClick={() => this.operation()}
                >
                  Reach out to us
                </button>
              </div>
            </Row>

            {/* <Row noGutters={true} className="text-center line6 mt37">
              Change language
              <img src={logos.language} className="ml-5"></img>
            </Row> */}

            {/* <Row noGutters={true}>
            <span className="col-xs-3 text-center">Help</span>
            <span className="col-xs-5"></span>
            <span className="col-xs-4 text-center">Privacy policy</span>
          </Row> */}
            <br></br>
          </div>
        </Col>
      </React.Fragment>
    );
  }
}
