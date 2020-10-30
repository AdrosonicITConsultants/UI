import React, { Component } from 'react';
import {ButtonGroup,Button, Row, Col} from "reactstrap";
import "../../Homepage/homepage.css";
import logos from "../../../assets"
import { memoryHistory, browserHistory } from "../../../helpers/history";
import { useTranslation, withTranslation } from "react-i18next";
import changeLang from "../../../services/utils/changeLang"

 class artreg1 extends Component {
                 constructor(props) {
                   // const { t } = useTranslation();
                   super(props);
                   this.state = {
                     weaverid: "",
                     //  weaverpin: "",
                     showValidation: false,
                     showValidationpin: false,
                     showUserName: true,
                   };
                 }

                

                 componentWillReceiveProps(props){
                   debugger;
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
                     this.props.cwi(this.state.weaverid);

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
                     showValidationpin: false,
                   });
                 }

                 changeLang = (data) => {
                   localStorage.setItem("i18nextLng", data);
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
                            
                         >
                           <br></br>
                           <Row   className="">
                             <div className="col-xs-6">
                               <img
                                 src={logos.backarrowicon}
                                 className="col-xs-2 margin-arrow arrowsize glyphicon"
                                 onClick={() => this.backoperation()}
                               ></img>
                               <div>
                                 <h2 className="col-xs-6 margin-registertext">
                                   {this.props.t("Pages.object.register")}
                                 </h2>
                                 <h4 className="margin-roletext">
                                   {" "}
                                   {this.props.t("Pages.object.artist")}
                                 </h4>
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
                           <br />
                           <Row
                              
                             className="text-center line32 font3"
                           >
                             <span className="col-xs-1"></span>
                             <span className="col-xs-10 fontplay">
                               {this.props.t("Pages.object.regHaveArtisanID")}
                             </span>
                           </Row>

                           <Row  >
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
                           {/* <Row   className="text-center line32 font3">
                  <span className="col-xs-1"></span>
                  <span className="col-xs-10 fontplay">
                    Enter your 4 digit pin provided along with weaver ID{" "}
                  </span>
                </Row> */}
                           {/* <Row  >
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
                           <Row  >
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
                           <hr className="hrline"></hr>
                           <Row
                              
                             className="text-center line32 font3"
                           >
                             <span className="col-xs-2"></span>
                             <span className="col-xs-8">
                               {this.props.t("Pages.object.regArtisanIdGetTouch")}
                             </span>
                           </Row>

                           <br />

                           <Row  >
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
                           <br></br>
                         </div>
                       </Col>
                     </React.Fragment>
                   );
                 }
               }


             export default withTranslation()(artreg1);