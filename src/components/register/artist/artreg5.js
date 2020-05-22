import React, { Component } from 'react';
import { Row, Col, Container } from "reactstrap";
import "../../Homepage/homepage.css";
import logos from "../../../assets"

export default class artreg5 extends Component {
                 constructor() {
                   super();
               
                   this.state = {
                     password: "",
                     confirmpass: "",
                     showValidationpass: false,
                     showValidationconfirmpass: false,
                     showUserName: true,
                     selectedFile: []
                   };
                 }

                 operation() {
                   debugger;
                   if (this.state.password == "") {
                     this.setState({
                       showValidationpass: !this.state.showValidationpass,
                     });
                   } else if (this.state.confirmpass !== this.state.password) {
                     this.setState({
                       showValidationconfirmpass: !this.state
                         .showValidationconfirmpass,
                     });
                   } else {
                     this.props.handler(3);
                   }
                 }

                 backoperation() {
                   this.props.handler(3);
                 }

                 fileChangedHandler = (event) => {
                   this.setState({
                     selectedFile: event.target.files[0],
                   });

                   let reader = new FileReader();

                   reader.onloadend = () => {
                   let imagebytes = reader.result;               
                     this.setState({
                       selectedFile: { ...this.state.selectedFile, imagebytes },
                       imagePreviewUrl: imagebytes,
                     });
                   };
                   if (event.target.files[0]) {
                   reader.readAsDataURL(event.target.files[0]);

                   }
                 };

resertImage(){
this.setState({
  selectedFile : [],
  imagePreviewUrl: logos.uploadphoto,
});}

                 handleChange(e) {
                   this.setState({ [e.target.name]: e.target.value });
                   this.setState({
                     showValidationpass: false,
                     showValidationconfirmpass: false,
                   });
                 }

                 render() {
                     let $imagePreview = (
                       <img
                         onClick={() => {
                           this.refs.fileUploader.click();
                         }}
                         className="profileImage"
                         src={logos.uploadphoto}
                       ></img>
                     );
                     if (this.state.imagePreviewUrl) {
                       $imagePreview = (
                         <div className="image-container img_wrp">
                           <img
                             className="profileImage"
                             onClick={() => {
                               this.refs.fileUploader.click();
                             }}
                             src={this.state.imagePreviewUrl}
                             alt="icon"
                             width="200"
                           />{" "}
                        
                             <img
                               style={{ margin: "-3px", width:"14px" }}
                               type="button"
                               className="close"
                               aria-label="Close"
                               onClick={() => {
                                 this.resertImage();
                               }}
                               
                               src={logos.closelogo}
                               aria-hidden="true"
                             >
                               
                             </img>
                        
                         </div>
                       );
                     }
                     else{
                        $imagePreview = (
                          <img
                            onClick={() => {
                              this.refs.fileUploader.click();
                            }}
                            style={{
                              width: "100px",
                              marginLeft: "18em",
                              cursor: "pointer",
                            }}
                            src={logos.uploadphoto}
                          ></img>
                        );
                     }

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
                         <div
                           className="demoab demoabAnimation text-center"
                           noGutters={true}
                         >
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
                                 <h4 className="margin-roletext1">Artist</h4>
                               </div>
                             </div>

                             <img
                               src={logos.mainlogoside}
                               style={{ marginLeft: "4em" }}
                               className="col-xs-3 logoreg3wid"
                               alt="TataTrusts logo"
                             ></img>
                           </Row>
                           <Row
                             noGutters={true}
                             className="text-center line32 font3"
                           ></Row>
                           <br></br>
                           <Row>
                             <div className="col-md-6 offset-md-3 col-sm-6 offset-sm-3 col-ld-6 offset-ld-3">
                               <div className="col-md-4"></div>
                               {$imagePreview}
                               <input
                                 accept="image/png, image/jpeg"
                                 onChange={this.fileChangedHandler}
                                 type="file"
                                 ref="fileUploader"
                                 style={{ display: "none" }}
                               ></input>
                               {/* <Avtar style={{marginLeft:"50px"}} className="col-md-4"></Avtar> */}
                             </div>
                           </Row>
                           <hr className="hrline2"></hr>
                           <div
                             style={{ fontFamily: "var(--PlayfairFont)" }}
                             className="text-center"
                           >
                             Select category of product you make
                           </div>
                           <Row noGutters={true}>
                             <div id="ck-button">
                               <label>
                                 <input type="checkbox" value="1" />
                                 <span>Sarees</span>
                               </label>
                             </div>
                             <div id="ck-button">
                               <label>
                                 <input type="checkbox" value="2" />
                                 <span>Dupatta</span>
                               </label>
                             </div>
                             <div id="ck-button">
                               <label>
                                 <input type="checkbox" value="3" />
                                 <span>Stole/Scarf</span>
                               </label>
                             </div>
                           </Row>
                           <Row noGutters={true}>
                             <div id="ck-button">
                               <label>
                                 <input type="checkbox" value="1" />
                                 <span>Fabric</span>
                               </label>
                             </div>
                             <div id="ck-button">
                               <label>
                                 <input type="checkbox" value="2" />
                                 <span>Accessories</span>
                               </label>
                             </div>
                           </Row>
                           <Row
                             noGutters={true}
                             className="text-center line312 font2"
                           >
                             <span className="col-xs-2"></span>
                             <span
                               style={{
                                 fontFamily: "var(--LatoFont)",
                                 color: "grey",
                               }}
                               className="col-xs-8"
                             >
                               You can always do this step later.{" "}
                               <strong
                                 style={{ cursor: "pointer" }}
                                 onClick={() => {
                                   alert("clicked");
                                 }}
                               >
                                 SKIP >
                               </strong>
                             </span>
                           </Row>
                           <br />
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
                                 Complete
                               </button>
                             </div>
                           </Row>
                           <Row
                             noGutters={true}
                             className="text-center line312 font1"
                           >
                             <div
                               style={{
                                 fontFamily: "var(--LatoFont)",
                                 color: "grey",
                                 marginTop: "10px",
                                 fontSize: "10px",
                               }}
                               className="col-xs-12 text-center"
                             >
                               By completing this form and singuo process. you
                               hearby agree to our{" "}
                             </div>
                             <div>
                               <a
                                 style={{ cursor: "pointer", fontSize: "10px" }}
                                 onClick={() => {
                                   alert("clicked");
                                 }}
                               >
                                 Terms and condition
                               </a>
                             </div>
                           </Row>
                           <br />
                           <br />
                           <br />
                           <br />
                           <Row
                             noGutters={true}
                             className="text-center line312 font2"
                           >
                             <div
                               className="col-xs-4 font2"
                               style={{ float: "left" }}
                             >
                               Privacy Policy
                             </div>
                             <div className="col-xs-4 font2">Need Help? </div>
                             <div
                               className="col-xs-4 font2"
                               style={{ float: "right" }}
                             >
                               {" "}
                               Change language
                               <img src={logos.language} className="ml-5"></img>
                             </div>
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
