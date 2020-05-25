import React, { Component } from 'react';
import { Row, Col, Container } from "reactstrap";
import "../../Homepage/homepage.css";
import logos from "../../../assets"

export default class buyreg5 extends Component {
    constructor() {
        super();
        this.state = {
          adl1 : "",
          adl2 : "",
          street : "",
          city : "",
          state : "",
          country : "",
          pincode : "",
          landmark : "",    
          showValidationpass: false,
          
        };
      }

      operation() {
        debugger;
        if (this.state.adl1 == "" || this.state.country == "" || this.state.pincode == "") {
            this.setState({
                showValidationpass: !this.state.showValidationpass,
            });
          }else {
            this.props.sad(this.state.adl1,this.state.adl2,this.state.street,this.state.city,this.state.state,this.state.country,this.state.pincode,this.state.landmark)
            this.props.handler(5);
          }
      }

      backoperation() {
         this.props.handler(3);
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
                <Row noGutters={true} className="text-left line32  font3">
                  {/* <span className="col-xs-1"></span> */}
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
                  <span
                    style={{ fontWeight: "600" }}
                    className="col-xs-10 line32 text-left ml-6 font3"
                  >
                    {/* <img src={logos.locklogo}   
                        className="locklogo1 glyphicon mr-5"></img> */}
                    Registered Address
                  </span>
                </Row>
                <br />
                <Row noGutters={true}>
                  <Col xs={{ size: "12" }} md={{ size: "6" }}>
                    <Col
                      xs={{ size: "11", offset: "1" }}
                      className="form-group11 text-left"
                    >
                      <label className="control-label padform text-left">
                        Address Line 1
                        <strong className="requiredStar">*</strong>
                      </label>
                      <div className="inner-addon">
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                          type="text"
                          id="adl1"
                          className="form-control form2 BuyerLogin1"
                          //placeholder="firstname"
                          name="adl1"
                          onChange={(e) => this.handleChange(e)}
                        />
                        
                      </div>
                    </Col>
                  </Col>
                  <Col xs={{ size: "12" }} md={{ size: "6" }}>
                    <Col
                      xs={{ size: "11", offset: "1" }}
                      className="form-group11 text-left"
                    >
                      <label className="control-label padform text-left">
                        Address Line 2
                      </label>
                      <div className="inner-addon">
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                          type="text"
                          id="adl2"
                          className="form-control form2 BuyerLogin1"
                          //placeholder="firstname"
                          name="adl2"
                          onChange={(e) => this.handleChange(e)}
                        />
                        
                      </div>
                    </Col>
                  </Col>
                  <Col xs={{ size: "12" }} md={{ size: "6" }}>
                    <Col
                      xs={{ size: "11", offset: "1" }}
                      className="form-group11 text-left"
                    >
                      <label className="control-label padform text-left">
                        Street
                      </label>
                      <div className="inner-addon">
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                          type="text"
                          id="street"
                          className="form-control form2 BuyerLogin1"
                          //placeholder="firstname"
                          name="firststreetame"
                          onChange={(e) => this.handleChange(e)}
                        />
                      
                      </div>
                    </Col>
                  </Col>
                  <Col xs={{ size: "12" }} md={{ size: "6" }}>
                    <Col
                      xs={{ size: "11", offset: "1" }}
                      className="form-group11 text-left"
                    >
                      <label className="control-label padform text-left">
                        City
                      </label>
                      <div className="inner-addon">
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                          type="text"
                          id="city"
                          className="form-control form2 BuyerLogin1"
                          //placeholder="firstname"
                          name="city"
                          onChange={(e) => this.handleChange(e)}
                        />
                       
                      </div>
                    </Col>
                  </Col>
                  <Col xs={{ size: "12" }} md={{ size: "6" }}>
                    <Col
                      xs={{ size: "11", offset: "1" }}
                      className="form-group11 text-left"
                    >
                      <label className="control-label padform text-left">
                        State
                      </label>
                      <div className="inner-addon">
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                          type="text"
                          id="state"
                          className="form-control form2 BuyerLogin1"
                          //placeholder="firstname"
                          name="state"
                          onChange={(e) => this.handleChange(e)}
                        />
                      
                      </div>
                    </Col>
                  </Col>
                  <Col xs={{ size: "12" }} md={{ size: "6" }}>
                    <Col
                      xs={{ size: "11", offset: "1" }}
                      className="form-group11 text-left"
                    >
                      <label className="control-label padform text-left">
                        Country<strong className="requiredStar">*</strong>
                      </label>
                      <div className="inner-addon">
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                          type="text"
                          id="country"
                          className="form-control form2 BuyerLogin1"
                          //placeholder="firstname"
                          name="country"
                          onChange={(e) => this.handleChange(e)}
                        />
                        
                      </div>
                    </Col>
                  </Col>
                  <Col xs={{ size: "12" }} md={{ size: "6" }}>
                    <Col
                      xs={{ size: "11", offset: "1" }}
                      className="form-group11 text-left"
                    >
                      <label className="control-label padform text-left">
                        Pincode<strong className="requiredStar">*</strong>
                      </label>
                      <div className="inner-addon">
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                          type="text"
                          id="pincode"
                          className="form-control form2 BuyerLogin1"
                          //placeholder="firstname"
                          name="pincode"
                          onChange={(e) => this.handleChange(e)}
                        />
                        
                      </div>
                    </Col>
                  </Col>
                  <Col xs={{ size: "12" }} md={{ size: "6" }}>
                    <Col
                      xs={{ size: "11", offset: "1" }}
                      className="form-group11 text-left"
                    >
                      <label className="control-label padform text-left">
                        Landmark
                      </label>
                      <div className="inner-addon">
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                          type="text"
                          id="landmark"
                          className="form-control form2 BuyerLogin1"
                          //placeholder="firstname"
                          name="landmark"
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
                <div className="text-center">Next up :Website Link</div>

                <Row noGutters={true}>
                  <div className="col-xs-12 text-center">
                    <button
                      style={{
                        background: "#000000",
                        color: "white",
                        borderRadius: "2em",
                        width: "8em",
                        height: "2.5em",
                        marginTop: "8px",
                      }}
                      onClick={() => this.operation()}
                    >
                      Next
                    </button>
                  </div>
                </Row>

                <Row noGutters={true} className= "mt23">
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
