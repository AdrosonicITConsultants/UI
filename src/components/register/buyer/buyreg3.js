import React, { Component } from 'react';
import { Row, Col, Container } from "reactstrap";
import "../../Homepage/homepage.css";
import logos from "../../../assets"

export default class buyreg3 extends Component {
    constructor() {
        super();
        this.state = {
          firstname : "",
          lastname :"",
          mobileno : "",
          alternatemobno : "",
          designation : "",
          showValidationpass: false,
          
        };
      }
    
      operation() {
        debugger;
        if (this.state.firstname == "" || this.state.mobileno == "") {
            this.setState({
                showValidationpass: !this.state.showValidationpass,
            });
          }
           else {
             this.props.spd(this.state.firstname,this.state.lastname,this.state.mobileno,this.state.alternatemobno,this.state.designation);
            this.props.handler(3);
          }
      }

      backoperation() {
         this.props.handler(1);
        }
    
    
      handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        this.setState({
            showValidationpass: false,
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

                <br></br>
                <Row noGutters={true} className="text-center line32 font3">
                  <span className="col-xs-1"></span>
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "larger",
                      color: "var(--lightBlack)",
                    }}
                    className="col-xs-10"
                  >
                    {/* <img src={logos.locklogo}   
                    className="locklogo1 glyphicon mr-5"></img> */}
                    Enter your details to complete registeration
                  </span>
                </Row>
                <br></br>
                <Row noGutters={true}>
                  <span
                    style={{ fontWeight: "600" }}
                    className="col-xs-10 line32 text-left ml-6 font3"
                  >
                    {/* <img src={logos.locklogo}   
                        className="locklogo1 glyphicon mr-5"></img> */}
                    Personal Details
                  </span>
                </Row>
                <br />

                <Row noGutters={true}>
                  <Col xs={{ size: "12" }} md={{ size: "6" }}>
                    <Col
                      xs={{ size: "11", offset: "1" }}
                      className="form-group1 text-left"
                    >
                      <label className="control-label padform text-left">
                        First Name<strong className="requiredStar">*</strong>
                      </label>
                      <div className="inner-addon">
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                          type="text"
                          id="firstname"
                          className="form-control form2 BuyerLogin1"
                          //placeholder="firstname"
                          name="firstname"
                          onChange={(e) => this.handleChange(e)}
                        />
                       
                          
                        
                      </div>
                    </Col>
                  </Col>
                  <Col xs={{ size: "12" }} md={{ size: "6" }}>
                    <Col
                      xs={{ size: "11", offset: "1" }}
                      className="form-group1 text-left"
                    >
                      <label className="control-label padform text-left">
                        Last Name
                      </label>
                      <div className="inner-addon">
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                          type="text"
                          id="lastname"
                          className="form-control form2 BuyerLogin1"
                          //placeholder="lastname"
                          name="lastname"
                          onChange={(e) => this.handleChange(e)}
                        />
                        
                      </div>
                    </Col>
                  </Col>

                  <Col xs={{ size: "12" }} md={{ size: "6" }}>
                    <Col
                      xs={{ size: "11", offset: "1" }}
                      className="form-group1 text-left"
                    >
                      <label className="control-label padform text-left">
                        Mobile Number<strong className="requiredStar">*</strong>
                      </label>
                      <div className="inner-addon">
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                          type="number"
                          id="mobileno"
                          className="form-control form2 BuyerLogin1"
                          //placeholder="mobileno"
                          name="mobileno"
                          onChange={(e) => this.handleChange(e)}
                        />
                        
                      </div>
                    </Col>
                  </Col>
                  <Col xs={{ size: "12" }} md={{ size: "6" }}>
                    <Col
                      xs={{ size: "11", offset: "1" }}
                      className="form-group1 text-left"
                    >
                      <label className="control-label padform text-left">
                        Alternate contact Number
                      </label>
                      <div className="inner-addon">
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                          type="number"
                          id="alternatemobno"
                          className="form-control form2 BuyerLogin1"
                          //placeholder="mobileno"
                          name="alternatemobno"
                          onChange={(e) => this.handleChange(e)}
                        />
                        
                      </div>
                    </Col>
                  </Col>

                  <Col xs={{ size: "12" }} md={{ size: "6" }}>
                    <Col
                      xs={{ size: "11", offset: "1" }}
                      className="form-group1 text-left"
                    >
                      <label className="control-label padform text-left">
                        Designation
                      </label>
                      <div className="inner-addon">
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                          type="text"
                          id="designation"
                          className="form-control form2 BuyerLogin1"
                          name="designation"
                          onChange={(e) => this.handleChange(e)}
                        />
                        
                      </div>
                    </Col>
                  </Col>
                </Row>
                {this.state.showValidationpass ? (
                    <span className="bg-danger">please enter all  mandatory fields</span>
                  ) : (
                    <br />
                  )}           
                <div className="text-center" style={{ color: "#cc6868" }}>
                  <strong
                    className="requiredStar"
                    style={{ marginLeft: "-15px " }}
                  >
                    *
                  </strong>
                  Fields are mandatory
                </div>
                <hr className="hrline2"></hr>
                <div className="text-center">Next up :Company Details</div>
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
                      Next
                    </button>
                  </div>
                </Row>
                <Row noGutters={true} className="mt37"> 
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
