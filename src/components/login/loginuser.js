import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import "../Homepage/homepage.css";
import "./buyer.css"
import logos from "../../assets"

export default class buyeruser extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",   
      showValidation: false     
    };
  }


              showValidation(){
  this.setState({
    showValidation: !this.state.showValidation,
  });
}
operation = (event) => {
  event.preventDefault();
    if (this.state.userName == "") {
     this.showValidation();
    } else {
      if(this.props.userpage == 1){
        this.props.cub(this.state.userName);
    
      }
      else{
        this.props.cua(this.state.userName);
      
      }
      
    }
  } 
  backoperation() {
     this.props.handler(0);
    }


  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({
      showValidation: false,
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="demo" noGutters={true}>
          <br></br>
          <Row   className="">
            <div className="col-xs-6">
              <img
                src={logos.backarrowicon}
                className="col-xs-2 margin-arrow arrowsize glyphicon"
                onClick={() => this.backoperation()}
              ></img>
              <h2 className="col-xs-6 margin-login">Login</h2>
            </div>

            <img
              src={logos.mainlogoside}
              className="col-xs-6 tatatrustLogo"
              alt="TataTrusts logo"
            ></img>
          </Row>

          <br />
          <br />
          <br />
          <Row  >
            <span className="col-xs-4"></span>
            {this.props.userpage == 1 ? (
              <div className="col-xs-4 text-center">
                <i className="circleDiv">
                  <img
                    src={logos.buyerlogo}
                    className="cicrleLogo"
                    alt="buyer TataTrusts logo"
                  ></img>
                  <div className="circleText">Buyer</div>
                </i>
              </div>
            ) : (
              <div className="col-xs-4 text-center">
                <i className="circleDiv">
                  <img
                    src={logos.buyerlogo}
                    className="cicrleLogo"
                    alt="artist TataTrusts logo"
                  ></img>
                  <div className="circleText">Artisan</div>
                </i>
              </div>
            )}

            <span className="col-xs-4"></span>
          </Row>
          <br />

          <br />
          <form onSubmit={this.operation}>
          <div>
            <Row  >
              <span className="col-xs-1"></span>
              <span className="col-xs-10 text-center font13">
                Enter your registered mobile number or email id
              </span>
            </Row>
            <Row  >
              <div className="col-xs-1"></div>
              <div className="form-group col-xs-10">
                <label className="control-label"></label>
                <div className="inner-addon left-addon">
                  <img
                    src={logos.usernamelogo}
                    className="usernameLogo glyphicon"
                  ></img>
                  <input
                    type="text"
                    id="userName"
                    className="form-control BuyerLogin"
                    placeholder="Username"
                    name="userName"
                    onChange={(e) => this.handleChange(e)}
                  />
                  {this.state.showValidation ? (
                    <div className="bg-danger text-center loginUserErrorTop">Please enter valid userID</div>
                  ) : (
                    <br />
                  )}
                </div>
              </div>
            </Row>
          </div>
          <br />
          <Row  >
            <div className="col-xs-12 text-center">
              <button
                className="blackButton"
                // onClick={() => this.operation()}
                // onClick={() => this.operation()}
              >
                Next
              </button>
            </div>
          </Row>
          </form>
          <br />         
          <br />
          {/* <Row  >
                <div className="col-xs-12 text-center">
                  <h2>Or</h2>
                </div>
              </Row>

              <br />

              <Row  >
                <div className="col-xs-12 text-center">
                  <h2>google login</h2>
                </div>
              </Row> */}
          <hr
            className="hrline"
            style={{ bordertop: "2px solid #d8d9da !important" }}
          ></hr>
          <Row  >
            <div className="col-xs-12 text-center font13">
              {this.props.userpage == 1 ? (
                <div>
                  New user <a href="/buyer-registration">click here</a> to
                  register.
                </div>
              ) : (
                <div>
                  New user <a href="/artist-registration">click here</a> to
                  register.
                </div>
              )}
            </div>
          </Row>
<br/>
          <Row   className="mt30 pb10">
            <strong className="col-xs-3 text-center line7 font6">Help?</strong>
            <span className="col-xs-4"></span>
            <span
              style={{ color: "var(--lightFont)" }}
              className="col-xs-5 text-center line7 font6"
            >
              Privacy policy
            </span>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}
