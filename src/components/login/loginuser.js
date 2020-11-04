import React, { Component } from "react";
import { Row, Col, Container,ButtonGroup,Button } from "reactstrap";
import "../Homepage/homepage.css";
import "./buyer.css";
import logos from "../../assets";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import TTCEapi from '../../services/API/TTCEapi';
import { useTranslation, withTranslation } from "react-i18next";
import changeLang from "../../services/utils/changeLang"

class buyeruser extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",   
      showValidation: false,
      message:"",
      googleFBErrorMsg: false,
    };
  }

  changeLang = (data) => {
    localStorage.setItem("i18nextLng", data);
  }
  showValidation(message){
  this.setState({
    showValidation: !this.state.showValidation,
    message: message,
  });
}
operation = (event) => {
  event.preventDefault();
    if (this.state.userName == "") {
      this.setState({
        showValidation: !this.state.showValidation,
        message: "enter Username",
      });
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

  responseFacebook = (response) => {
    console.log("facebook console");
    console.log(response);
    this.checkGoogleFB();
  }

  responseGoogle = (response) => {
    console.log("google console");
    console.log(response);
    this.checkGoogleFB();
  }

  checkGoogleFB = () => {
    var roleId = 0;
    if(this.props.userpage == 1) {
      roleId = 2;
    }
    else {
      roleId = 1;
    }

    var userName = "";
    var password = "";

    TTCEapi.login(userName, password, roleId).then((response)=>{
      if(response.data.valid === false)
      {
        this.setState({
          googleFBErrorMsg: true,
        });
        console.log(response.data.data);
      }
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
              <h2 className="col-xs-6 margin-login">
                {this.props.userpage == 1 ? "Login" : this.props.t("Pages.object.regLogin")}</h2>
            </div>

            <img
              src={logos.mainlogoside}
              className="col-xs-6 tatatrustLogo"
              alt="TataTrusts logo"
            ></img>
          </Row>

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
                  <div className="circleText">{this.props.t("Pages.object.artist")}</div>
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
              {this.props.userpage == 1 ?
                "Enter your registered mobile number or email id" :
                this.props.t("Pages.object.regMobileEmailLogin")
              }
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
                    placeholder={this.props.userpage == 1 ? "Username" : this.props.t("Pages.object.regUsername")}
                    name="userName"
                    onChange={(e) => this.handleChange(e)}
                  />
                  {this.state.showValidation ? (
                    <div className="bg-danger text-center loginUserErrorTop">{this.state.message}</div>
                  ) : (
                    <br />
                  )}

                  {/* {this.state.googleFBErrorMsg ? (
                    <div className="bg-danger text-center loginUserErrorTop">Please try again</div>
                  ) : null} */}
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
              >{this.props.userpage == 1 ?
                "Next" :
                this.props.t("Pages.object.regNextButton")
              }
              </button>
            </div>
          </Row>
          </form>
          <br />        

          <Row noGutters={true}>
            <Col className="col-xs-6 text-right">
              <FacebookLogin
              appId="2751983971736639"
              autoLoad={false}
              fields="name,email,picture"
              callback={this.responseFacebook}/>
            </Col>
            <Col className="col-xs-6 text-left googleLoginButton">
              <GoogleLogin
              clientId="22783379582-k6lub35ijaki3ku3dvi0flo0qkstds4f.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}/>
            </Col>
          </Row>          

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
{this.props.userpage == 1 ?
null :
<>
<Row noGutters={true}>
  <Col className="col-xs-12 text-center">
  <ButtonGroup aria-label="Basic example">
                             <Button
                               onClick={() => changeLang("hi")}
                               className="LangBtn"
                               variant="secondary"
                             >
                               हिन्दी
                             </Button>
                             <Button
                               onClick={() => changeLang("en")}
                               className="LangBtn"
                               variant="secondary"
                             >
                               English
                             </Button>
                           </ButtonGroup>
</Col>
</Row>
                           <Row   className="mt7">
                             {/* <span className="col-xs-3 text-center line7 font6">
                    Help?
                  </span> */}
                             {/* <span className="col-xs-3"></span> */}
                             <span className="col-xs-12 text-center line6 font6">
                               Change language
                               <img src={logos.language} className="ml-5"></img>
                             </span>
                           </Row>  
                           </>
  }


          <Row   className="mt10 pb10">
            <strong className="col-xs-4 text-center line7 font6">
              {this.props.userpage == 1 ?
                "Help ?" :
                this.props.t("Pages.object.regHelp")
              }
            </strong>
            <a 
            href={TTCEapi.DocumentsURL + "LEGAL%20DISCLAIMER.pdf"}
            target="_blank">
            <span
              style={{ color: "var(--lightFont)"}}
              className="col-xs-4 text-center line7 font6"
            >
              {this.props.userpage == 1 ?
                "Legal Disclaimer" :
                this.props.t("Pages.object.legalDisclaimer")
              }              
            </span>
            </a>
            <a 
            href={TTCEapi.DocumentsURL + "PRIVACY%20POLICY.pdf"}
            target="_blank">
            <span
              style={{ color: "var(--lightFont)" }}
              className="col-xs-4 text-center line7 font6"
            >
              {this.props.userpage == 1 ?
                "Privacy policy" :
                this.props.t("Pages.object.privacyPolicy")
              }               
            </span>
            </a>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default withTranslation()(buyeruser);