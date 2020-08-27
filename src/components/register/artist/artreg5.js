import React, { Component } from 'react';
import { Row, Col, Container } from "reactstrap";
import "../../Homepage/homepage.css";
import logos from "../../../assets"
import TTCEapi from '../../../services/API/TTCEapi';
import customToast from "../../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default class artreg5 extends Component {
                 constructor() {
                   super();
               
                   this.state = {
                     products : [{id: 0 , productDesc :""},{id: 0 , productDesc :""},{id: 0 , productDesc :""},{id: 0 , productDesc :""},{id: 0 , productDesc :""},{id: 0 , productDesc :""}],
                     password: "",
                     confirmpass: "",
                     showValidationpass: false,
                     showValidationconfirmpass: false,
                     showUserName: true,
                     selectedFile: [],
                     selectedprods :[]
                   };
                 }

                 operation() {
                   debugger;
                   if(document.getElementById('agree').checked){
                    {this.state.products.map((item) => { if(document.getElementById(item.id).checked){ this.state.selectedprods.push(item.id)}   console.log(this.state.selectedprods) }  )     }
                      this.props.cr(this.state.selectedprods,this.state.selectedFile);
                     
                   }
                   else{
                       customToast.error("Please agree to T&C", {
                         position: toast.POSITION.TOP_RIGHT,
                         autoClose: true,
                       });
                  //  alert("Please agree to T&C");
                   }
                 }

                 backoperation() {
                   this.props.handler(3);
                 }
                  
                  componentDidMount(){
                      
                    TTCEapi.getProducts().then((response)=>{
                      this.setState({products : response.data.data},() => {
                        
                        console.log(this.state.products[0].productDesc);
                      });
          
                  });
                  }
                 
                 fileChangedHandler = (event) => {
                  let filename = event.target.files[0];

                  if (filename != undefined) {
                    //  filename.name = filename.name.replace(/\s/g, '');
                      if (filename.size / 1024 / 1024 > 1) {    
                          customToast.error("Please upload product Image below 1MB.", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: true,
                          });
                        return ;
                      }
                      // if (/[^0-9a-zA-Z\-\_\.\(\)]/.test(filename.name)) {
                      //   customToast.error("Image name contains special characters.", {
                      //     position: toast.POSITION.TOP_RIGHT,
                      //     autoClose: true,
                      //   });
                      //   return;
                      // }
                   this.setState({
                     selectedFile: event.target.files[0],
                   },()=>{
                     console.log(this.state);
                   });

                   let reader = new FileReader();

                   reader.onloadend = () => {
                   let imagebytes = reader.result;               
                     this.setState({
                      //  selectedFile: { ...this.state.selectedFile },
                       imagePreviewUrl: imagebytes,
                     },()=>{
                          console.log(this.state);
                     });
                   };
                   if (event.target.files[0]) {
                   reader.readAsDataURL(event.target.files[0]);

                   }
                  }
                 };

                resertImage(){
                this.setState({
                  selectedFile : [],
                  imagePreviewUrl: logos.uploadphoto,
                });
              }

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
                            
                         >
                           <br></br>
                           <Row   className="">
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
                                 <h4 className="margin-roletext1">Artisan</h4>
                               </div>
                             </div>

                             <img
                               src={logos.mainlogoside}
                               className="col-xs-3 logoreg3wid"
                               alt="TataTrusts logo"
                             ></img>
                           </Row>
                           <Row
                              
                             className="text-center line32 font3"
                           ></Row>
                           <br></br>
                           <Row>
                             <div className="col-xs-12">
                               {/* <div className="col-md-4"></div> */}
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
                           <Row  >
                             <div id="ck-button">
                               <label>
                                 <input type="checkbox" value="1" id={this.state.products[0].id}/>
                                  <span>{this.state.products[0].productDesc}</span>
                               </label>
                             </div>
                             <div id="ck-button">
                               <label>
                                 <input type="checkbox" value="2" id={this.state.products[1].id}/>
                                 <span>{this.state.products[1].productDesc}</span>
                               </label>
                             </div>
                             <div id="ck-button">
                               <label>
                                 <input type="checkbox" value="3" id={this.state.products[2].id}/>
                                 <span>{this.state.products[2].productDesc}</span>
                               </label>
                             </div>
                           </Row>
                           <Row  >
                             <div id="ck-button">
                               <label>
                                 <input type="checkbox" value="1" id={this.state.products[3].id}/>
                                 <span>{this.state.products[3].productDesc}</span>
                               </label>
                             </div>
                             <div id="ck-button">
                               <label>
                                 <input type="checkbox" value="2" id={this.state.products[4].id}/>
                                 <span>{this.state.products[4].productDesc}</span>
                               </label>
                             </div>
                             <div id="ck-button">
                               <label>
                                 <input type="checkbox" value="3" id={this.state.products[5].id}/>
                                 <span>{this.state.products[5].productDesc}</span>
                               </label>
                             </div>
                           </Row>
                           <br></br>
                           <Row
                              
                             className="text-center line312 font1"
                           >
                             <div
                               style={{
                                 fontFamily: "var(--LatoFont)",
                                 color: "grey",
                                 marginTop: "10px",
                                 fontSize: "15px",
                               }}
                               className="col-xs-12 text-center"
                             >
                               <input type="checkbox" name="checkbox" value="check" id="agree" /> You
                               hearby agree to our <a
                                 style={{ cursor: "pointer", fontSize: "15px" }}
                                 onClick={() => {
                                   alert("clicked");
                                 }}
                               >
                                 Terms and condition
                               </a>
                               </div>
                           </Row>
                           <br />
                           <Row  >
                             <div className="col-xs-12 text-center">
                               <button
                                 className="blackButton"
                                 onClick={() => this.operation()}
                               >
                                 Complete
                               </button>
                             </div>
                           </Row>
                           

                           <Row   className="text-center mt57">
                             
                             <div className="col-xs-12 line312 font2">
                               Need Help?{" "}
                             </div>
                             
                           </Row>
                           <Row   className="text-center mt7">
                             <div
                               className="col-xs-12 line6"
                              //  style={{ float: "right" }}
                             >
                               {" "}
                               Change language
                               <img src={logos.language} className="ml-5"></img>
                             </div>
                           </Row>
                           {/* <Row  >
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
