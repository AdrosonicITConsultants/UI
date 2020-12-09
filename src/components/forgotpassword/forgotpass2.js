import React, { Component } from "react";
import { Row, Col, Container, ButtonGroup,Button } from "reactstrap";
import "../Homepage/homepage.css";
import logos from "../../assets";
import "react-toastify/dist/ReactToastify.css";
import TTCEapi from "../../services/API/TTCEapi";
import { useTranslation, withTranslation } from "react-i18next";
import changeLang from "../../services/utils/changeLang";

class forgotpass2 extends Component {
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

      changeLang = (data) => {
        localStorage.setItem("i18nextLng", data);
      }
    
      operation() {
        
        if (this.state.password == "") {
            this.setState({
                showValidationpass: !this.state.showValidationpass,
            });
          }
        else if (TTCEapi.validatePass(this.state.password)) {
          if (this.state.confirmpass !== this.state.password) {
            this.setState({
              showValidationconfirmpass: !this.state.showValidationconfirmpass,
            });
          } else {
            this.props.pr(this.state.password);

          }
        }          
      }

      backoperation() {
         this.props.handler(0);
        }
    
    
      handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        this.setState({
            showValidationpass: false,
            showValidationconfirmpass: false
        });
      }

      reachOutToUsModal = () => {
        document.getElementById('reachOutToUsModal').style.display='block';
       }

       reachOutToUsModalClose = () => {
        document.getElementById('reachOutToUsModal').style.display='none';
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
              <div className="demoa text-center"  >
                <br>
                </br>
                <Row   className="">
                  <div className="col-xs-6">
                    <img
                      src={logos.backarrowicon}
                      className="col-xs-2 margin-arrow arrowsize glyphicon"
                      onClick={() => this.backoperation()}
                    ></img>
                    <div>
                      {localStorage.getItem("selectedUserId") == 1 ?
                        <h2 className="col-xs-6 margin-registertext">
                          {this.props.t("Pages.object.regResetWord")}
                        </h2>
                        :
                        <h2 className="col-xs-6 margin-registertext">
                          Reset
                        </h2>
                      }
                     
                      {localStorage.getItem("selectedUserId") == 1 ?
                        <h4 className="margin-roletext">{this.props.t("Pages.object.regPasswordWord")}</h4>
                        :
                        <h4 className="margin-roletext">Password</h4>
                      }
                    </div>
                  </div>

                  <img
                    src={logos.mainlogoside}
                    className="tatatrustLogo col-xs-6"
                    alt="TataTrusts logo"
                  ></img>
                </Row>
                <br></br>
                <Row   className="text-center line32 font3">
                  <span className="col-xs-1"></span>
                  <span className="col-xs-10 fontplay">
                    <img
                      src={logos.locklogo}
                      className="locklogo1 glyphicon mr-5"
                    ></img>
                    {localStorage.getItem("selectedUserId") == 1 ?
                    this.props.t("Pages.object.regEnterNewPass")
                    :
                    "Enter your new password" }
                  </span>
                </Row>

                <br />

                <Row  >
                  <div className="col-xs-1"></div>
                  <div className="form-group col-xs-10">
                    <label className="control-label"></label>
                    <div className="inner-addon ">
                      {/* <i className="glyphicon glyphicon-user"></i> */}
                      <input
                        type="password"
                        id="password"
                        className="form-control BuyerLogin"
                        placeholder={localStorage.getItem("selectedUserId") == 1 ?
                        this.props.t("Pages.object.regPasswordWord")
                        :
                        "Password" }
                        name="password"
                        onChange={(e) => this.handleChange(e)}
                      />
                      {this.state.showValidationpass ? (
                        <span className="bg-danger">
                          please enter your password
                        </span>
                      ) : (
                        <br />
                      )}
                    </div>
                  </div>
                </Row>

                <Row  >
                  <div className="col-xs-1"></div>
                  <div className="form-group col-xs-10 ">
                    <label className="control-label"></label>
                    <div className="inner-addon ">
                      {/* <i className="glyphicon glyphicon-user"></i> */}
                      <input
                        type="password"
                        id="confirmpass"
                        className="form-control BuyerLogin"
                        placeholder={localStorage.getItem("selectedUserId") == 1 ?
                        this.props.t("Pages.object.regReEnterPassword")
                        :
                        "Re-enter your password" }
                        name="confirmpass"
                        onChange={(e) => this.handleChange(e)}
                      />
                      {this.state.showValidationconfirmpass ? (
                        <span className="bg-danger">
                          password does not match
                        </span>
                      ) : (
                        <br />
                      )}
                    </div>
                  </div>
                </Row>

                <br />
                <Row  >
                  <div className="col-xs-12 text-center">
                    <button
                      className="blackButton"
                      onClick={() => this.operation()}
                    >
                      {localStorage.getItem("selectedUserId") == 1 ?
                        this.props.t("Pages.object.regNextButton")
                        :
                        "Next" }
                    </button>
                  </div>
                </Row>

                <hr className="hrline"></hr>

                <Row   className="text-center line311 font3">
                  <span className="col-xs-2"></span>
                  {localStorage.getItem("selectedUserId") == 1 ? 
                    <span className="col-xs-8">
                      {this.props.t("Pages.object.regCaseAnyHelp")}
                    </span>
                    :
                    <span className="col-xs-8">
                      In case of any help{" "}
                    </span>
                    }
                </Row>
                <br />

                {localStorage.getItem("selectedUserId") == 1 ? 
                  <Row  >
                    <div className="col-xs-12 text-center">
                      <button
                        className="whiteButton"
                        onClick={this.reachOutToUsModal}
                      >
                        {this.props.t("Pages.object.regReachOut")}
                      </button>
                    </div>
                  </Row>
                  :
                  <Row  >
                    <div className="col-xs-12 text-center">
                      <button
                        className="whiteButton"
                        onClick={this.reachOutToUsModal}
                      >
                        Reach out to us
                      </button>
                    </div>
                  </Row>
                  }

                {localStorage.getItem("selectedUserId") == 1 ? 
                <>
                <Row style={{marginTop: "10px"}}> 
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
              </Row>
                <Row
                  
                  className="text-center line6 mt10"
                >
                  {this.props.t("Pages.object.changelanguage")}
                  <img src={logos.language} className="ml-5"></img>
                </Row>
                </>
                : null }

                {/* <Row  >
            <span className="col-xs-3 text-center">Help</span>
            <span className="col-xs-5"></span>
            <span className="col-xs-4 text-center">Privacy policy</span>
          </Row> */}
              </div>
            </Col>

            <div id="reachOutToUsModal" class="w3-modal">
<div class="w3-modal-content w3-animate-top modalBoxSize">
<div class="w3-container chatAttachModalOuter">
    <div className="text-right">
        <img src={logos.closelogo} className="chatAttachCloseIcon" onClick={this.reachOutToUsModalClose}/>
    </div>
    <h4 className="artisanChatModalTitle text-center">For any query reach us @ <br/><br/><a href = "mailto: antaran@tatatrusts.org">
    antaran@tatatrusts.org</a></h4>
</div>
</div>
</div>
          </React.Fragment>
        );
    }
}

export default withTranslation()(forgotpass2);
