import React, { Component } from 'react';
import { Row, Col} from "reactstrap";
import "../../Homepage/homepage.css";
import logos from "../../../assets"
import { memoryHistory, browserHistory } from "../../../helpers/history";


export default class artreg1 extends Component {
    constructor() {
        super();
        this.state = {
          weaverid: "",
        //  weaverpin: "",     
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
          // else if (this.state.weaverpin == ""){                    
          //     this.setState({
          //       showValidationpin: !this.state.showValidationpin,
          //     });
         // }
           else {
            this.props.cwi(this.state.weaverid)

            // this.props.handler(1);
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
              className="vcenter fullscreen"
            ></Col>
            <Col
              xs={{ size: "12" }}
              sm={{ size: "8" }}
              md={{ size: "6" }}
              lg={{ size: "6" }}
              className="vcenter "
            >
              <div
                className="demoa demoabAnimation text-center"
                noGutters={true}
              >
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
                      <h4 className="margin-roletext">Artisan</h4>
                    </div>
                  </div>

                  <img
                    src={logos.mainlogoside}
                    className="tatatrustLogo col-xs-6"
                    alt="TataTrusts logo"
                  ></img>
                </Row>
                <br></br>
                <br />

                <Row noGutters={true} className="text-center line32 font3">
                  <span className="col-xs-1"></span>
                  <span className="col-xs-10 fontplay">
                    Do you have a Artisan ID?
                  </span>
                </Row>

                <Row noGutters={true}>
                  <div className="col-xs-1"></div>
                  <div className="form-group col-xs-10 ">
                    <label className="control-label"></label>
                    <div className="inner-addon2 left-addon2">
                      <img
                        src={logos.userlogo}
                        className="userLogo glyphicon"
                      ></img>
                      <input
                        type="text"
                        id="weaverid"
                        className="form-control BuyerLogin"
                        placeholder="ArtisanID"
                        name="weaverid"
                        onChange={(e) => this.handleChange(e)}
                      />
                      {this.state.showValidation ? (
                        <span className="bg-danger">
                          please enter weaver ID
                        </span>
                      ) : (
                        <br />
                      )}
                    </div>
                  </div>
                </Row>
                {/* <Row noGutters={true} className="text-center line32 font3">
                  <span className="col-xs-1"></span>
                  <span className="col-xs-10 fontplay">
                    Enter your 4 digit pin provided along with weaver ID{" "}
                  </span>
                </Row> */}
                {/* <Row noGutters={true}>
                  <div className="col-xs-1"></div>
                  <div className="form-group col-xs-10 ">
                    <label className="control-label"></label>
                    <div className="inner-addon2 left-addon2">
                      <img
                        src={logos.ionickeylogo}
                        className="ionickeylogo glyphicon"
                      ></img>
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
                      ) : (
                        <br />
                      )}
                    </div>
                  </div>
                </Row> */}
                <br />
                <br />
                <Row noGutters={true}>
                  <div className="col-xs-12 text-center">
                    <button
                      className="blackButton"
                      onClick={() => this.operation()}
                    >
                      Next
                    </button>
                  </div>
                </Row>
                <br />
                <br />
                <br />
                <hr className="hrline"></hr>
                <Row noGutters={true} className="text-center line32 font3">
                  <span className="col-xs-2"></span>
                  <span className="col-xs-8">
                    If you don't have a weaver id get in touch with us.{" "}
                  </span>
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
                <br />

                <Row noGutters={true} className="mt7">
                  {/* <span className="col-xs-3 text-center line7 font6">
                    Help?
                  </span> */}
                  {/* <span className="col-xs-3"></span> */}
                  <span className="col-xs-12 text-center line6 font6">
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
