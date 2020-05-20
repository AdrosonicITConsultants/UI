import React, { Component } from 'react';
import { Row, Col, Container } from "reactstrap";
import "../../Homepage/homepage.css";
import logos from "../../../assets"

export default class artreg3 extends Component {
    constructor() {
        super();
        this.state = {
          password: "",
          confirmpass: "",     
          showValidationpass: false,
          showValidationconfirmpass: false,
          showUserName: true,
        };
      }
    
      operation() {
        debugger;
        if (this.state.password == "") {
            this.setState({
                showValidationpass: !this.state.showValidationpass,
            });
          }
          else if (this.state.confirmpass !== this.state.password ){                    
              this.setState({
                showValidationconfirmpass: !this.state.showValidationconfirmpass,
              });
          } else {
            this.props.handler(2);
          }
      }

      backoperation() {
         this.props.handler(1);
        }
    
    
      handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        this.setState({
            showValidationpass: false,
            showValidationconfirmpass: false
        });
      }
    
    render() {
        return (
            <React.Fragment>
         <Col
            xs={{ size: "12" }}
            sm={{ size: "2" }}
            md={{ size: "3" }}
            md={{ size: "3" }}
          ></Col>
          <Col
            md={{ size: "12" }}
            sm={{ size: "8" }}
            md={{ size: "6" }}
            md={{ size: "6" }}
          >
        <div className="demo text-center" noGutters={true}>
          <br></br>
          <Row noGutters={true} className="">
            <div className="col-sm-8">
              <img src={logos.backarrowicon} className="col-sm-2 margin-arrow glyphicon" onClick={() => this.backoperation()}></img>
              <h2 className="col-sm-6 margin-login">Register</h2>
            </div>
           
                  <div className="col-sm-4 text-center">
                    <i className="circleDiv smallCirclediv">
                      <img src={logos.buyerlogo} className="smallCircleLogo" alt="buyer TataTrusts logo"></img>
                      <div className="circleText smallCirclelogoText">Buyer</div>
                    </i>
                    <img src={logos.mainlogoside} className="registerLogo" alt="TataTrusts logo "></img>
                  </div>
          </Row>

          <br />
          <br />
          <Row noGutters={true} className="text-center line3 font4">
          <span className="col-sm-1"></span>
                <span className="col-sm-10">
                <img src={logos.locklogo}   
                  className="locklogo glyphicon mr-5"></img>
                Enter your new password
                </span>
               
          </Row>

          <br />         
           
             
              <Row noGutters={true}>
                <div className="col-sm-1"></div>
                <div className="form-group col-sm-10 col-xs-6">
                  <label className="control-label"></label>
                  <div className="inner-addon left-addon">
                    {/* <i className="glyphicon glyphicon-user"></i> */}
                    <input
                      type="password"
                      id="password"
                      className="form-control BuyerLogin"
                      placeholder="password"
                      name="password"
                      onChange={(e) => this.handleChange(e)}
                    />
                    {this.state.showValidationpass ? (
                      <span className="bg-danger">please enter your password</span>
                    ) : null}
                  </div>
                </div>
              </Row>
       
              <Row noGutters={true}>
                <div className="col-sm-1"></div>
                <div className="form-group col-sm-10 col-xs-6">
                  <label className="control-label"></label>
                  <div className="inner-addon left-addon">
                    {/* <i className="glyphicon glyphicon-user"></i> */}
                    <input
                      type="password"
                      id="confirmpass"
                      className="form-control BuyerLogin"
                      placeholder="Re-enter yourpassword"
                      name="confirmpass"
                      onChange={(e) => this.handleChange(e)}
                    />
                    {this.state.showValidationconfirmpass ? (
                      <span className="bg-danger">password does not match</span>
                    ) : null}
                  </div>
                </div>
              </Row>
                 
          <br />
            <Row noGutters={true}>
              <div className="col-sm-12 text-center">
                <button
                  style={{
                    background: "#000000",
                    color: "white",
                    borderRadius: "2em",
                    width: "8em",
                    height: "3em",
                  }}
                  onClick={() => this.operation()}
                >
                 Next
                </button>
              </div>
            </Row>         
          <br />
          <br />
          <hr className="hrline"></hr>
          <br />
          <Row noGutters={true} className="text-center line311 font4">
              <span className="col-sm-2"></span>
                <span className="col-sm-8">
                In case of any help               </span>
               
          </Row>
          <br/>
          <Row noGutters={true}>
              <div className="col-sm-12 text-center">
                <button
                  style={{
                    background: "white",
                    color: "#000000",
                    borderRadius: "2em",
                    width: "10em",
                    height: "3em",
                  }}
                //   onClick={() => this.operation()}
                >
                  Reach out to us
                </button>
              </div>
            </Row> 
            <br/>
            
            <br/>
            <Row noGutters={true} className="text-center line6 font3">
                                    
                                    Change language
                                    <img src={logos.language}  className="ml-5"></img>
                                </Row>

          {/* <Row noGutters={true}>
            <span className="col-sm-3 text-center">Help</span>
            <span className="col-sm-5"></span>
            <span className="col-sm-4 text-center">Privacy policy</span>
          </Row> */}
          <br></br>
        </div>
        </Col>
      </React.Fragment>
      );
    }
}
