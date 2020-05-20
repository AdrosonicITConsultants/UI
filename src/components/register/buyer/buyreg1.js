import React, { Component } from 'react';
import { Row, Col, Container } from "reactstrap";
import "../../Homepage/homepage.css";
import logos from "../../../assets"

export default class artreg1 extends Component {
    constructor() {
        super();
        this.state = {
          weaverid: "",
          weaverpin: "",     
          showValidation: false,
          showValidationpin: false,
          showUserName: true,
        };
      }
    
      operation() {
        debugger;
        if (this.state.weaverid == "") {
            this.setState({
              showValidation: !this.state.showValidation,
            });
          }
          else if (this.state.weaverpin == ""){                    
              this.setState({
                showValidationpin: !this.state.showValidationpin,
              });
          } else {
            this.props.handler(1);
          }
      }

      backoperation() {
         this.props.handler(0);
        }
    
    
      handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        this.setState({
          showValidation: false,
          showValidationpin: false
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
          ></Col>
          <Col
            md={{ size: "12" }}
            sm={{ size: "8" }}
            md={{ size: "6" }}
            lg={{ size: "6" }}
          >
        <div className="demo text-center" noGutters={true}>
          <br></br>
          <Row noGutters={true} className="">
            <div className="col-sm-8">
              <img src={logos.backarrowicon} className="col-sm-2 margin-arrow glyphicon" onClick={() => this.backoperation()}></img>
              <h2 className="col-sm-6 margin-login">Register</h2>
            </div>
           
            <img src={logos.mainlogoside} className="col-sm-4" alt="TataTrusts logo"></img>
          </Row>

          <br />
          <Row noGutters={true} className="text-center line3 font4">
          <span className="col-sm-1"></span>
                <span className="col-sm-10">
                Do you have a weaver ID?
                </span>
               
          </Row>
      
           
             
              <Row noGutters={true}>
                <div className="col-sm-1"></div>
                <div className="form-group col-sm-10 col-xs-6">
                  <label className="control-label"></label>
                  <div className="inner-addon2 left-addon2">
                  <img src={logos.userlogo} className="userLogo glyphicon"></img>
                    <input
                      type="text"
                      id="weaverid"
                      className="form-control BuyerLogin"
                      placeholder="weaverID"
                      name="weaverid"
                      onChange={(e) => this.handleChange(e)}
                    />
                    {this.state.showValidation ? (
                      <span className="bg-danger">please enter weaver ID</span>
                    ) : null}
                  </div>
                </div>
              </Row>
              <Row noGutters={true} className="text-center line3 font4">
              <span className="col-sm-1"></span>
                <span className="col-sm-10">
                Enter your 4 digit pin provided along with weaver ID                </span>
               
          </Row>
          <Row noGutters={true}>
                <div className="col-sm-1"></div>
                <div className="form-group col-sm-10 col-xs-6">
                  <label className="control-label"></label>
                  <div className="inner-addon2 left-addon2">
                  <img src={logos.ionickeylogo} className="ionickeylogo glyphicon"></img>
                    <input
                      type="number"
                      id="weaverpin"
                      className="form-control BuyerLogin"
                      placeholder="weaverpin"
                      name="weaverpin"
                      onChange={(e) => this.handleChange(e)}
                    />
                    {this.state.showValidationpin ? (
                      <span className="bg-danger">please enter pin</span>
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
          <hr className="hrline"></hr>
          <Row noGutters={true} className="text-center line31 font4">
              <span className="col-sm-2"></span>
                <span className="col-sm-8">
                If you don't have a weaver id get in touch with us.                </span>
               
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
         

          <Row noGutters={true}>
            <span className="col-sm-3 text-center line7 font3">Help?</span>
            <span className="col-sm-3"></span>
            <span className="col-sm-6 text-center line6 font3">
                                    
                                    Change language
                                    <img src={logos.language} className="ml-5"></img>
                                </span>
          </Row>
          <br></br>
        </div>
        </Col>
      </React.Fragment>
      );
    }
}
