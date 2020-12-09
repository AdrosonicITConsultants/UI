import React, { Component } from 'react';
import { Row, Col, Container, ButtonGroup,Button } from "reactstrap";
import "../../Homepage/homepage.css";
import logos from "../../../assets"
import TTCEapi from '../../../services/API/TTCEapi';
import customToast from "../../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useTranslation, withTranslation } from "react-i18next";
import changeLang from "../../../services/utils/changeLang";

class artreg5 extends Component {
                 constructor() {
                   super();
               
                   this.state = {
                     products : [{id: 0 , productDesc :""},{id: 0 , productDesc :""},{id: 0 , productDesc :""},{id: 0 , productDesc :""},{id: 0 , productDesc :""},{id: 0 , productDesc :""},{id: 0 , productDesc :""}],
                     password: "",
                     confirmpass: "",
                     showValidationpass: false,
                     showValidationconfirmpass: false,
                     showUserName: true,
                     selectedFile: [],
                     selectedprods : [],
                   };
                 }

                 changeLang = (data) => {
                  localStorage.setItem("i18nextLng", data);
                }

                 operation() {
                   
                   if(document.getElementById('agree').checked){
                    {this.state.products.map((item) => { if(document.getElementById(item.id).checked){ this.state.selectedprods.push(item.id)} }  )     }
                      this.props.cr(this.state.selectedprods,this.state.selectedFile);
                     
                   }
                   else{
                       customToast.error("Please agree to T&C", {
                         position: toast.POSITION.TOP_RIGHT,
                         autoClose: true,
                       });
                   }
                 }

                 backoperation() {
                   this.props.handler(3);
                 }
                  
                  componentDidMount(){
                    localStorage.setItem("regCurrentPage", 4);
                      
                    TTCEapi.getProducts().then((response)=>{
                      this.setState({products : response.data.data},() => {
                        
                      });
          
                  });
                  }
                 
                 fileChangedHandler = (event) => {
                  let filename = event.target.files[0];

                  if (filename != undefined) {
                      if (filename.size / 1024 / 1024 > 1) {    
                          customToast.error("Please upload product image below 1MB.", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: true,
                          });
                        return ;
                      }
                    
                   this.setState({
                     selectedFile: event.target.files[0],
                   },()=>{
                   });

                   let reader = new FileReader();

                   reader.onloadend = () => {
                   let imagebytes = reader.result;               
                     this.setState({
                       imagePreviewUrl: imagebytes,
                     },()=>{
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
                 helpshow(){
                  document.getElementById('help').style.display='block';
              } 
              helpClose(){
                  document.getElementById('help').style.display='none'; 
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
                                 {this.props.t("Pages.object.register")}
                                 </h3>
                                 <h4 className="margin-roletext1">{this.props.t("Pages.object.artist")}</h4>
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
                               {$imagePreview}
                               <input
                                 accept="image/png, image/jpeg"
                                 onChange={this.fileChangedHandler}
                                 type="file"
                                 ref="fileUploader"
                                 style={{ display: "none" }}
                               ></input>
                             </div>
                           </Row>
                           <hr className="hrline2"></hr>
                           <div
                             style={{ fontFamily: "var(--PlayfairFont)" }}
                             className="text-center"
                           >
                             {this.props.t("Pages.object.regSelectCategory")}
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
                           <Row  noGutters={true}>
                             <Col className="col-xs-12 text-center">
                             <div id="ck-button">
                               <label>
                                 <input type="checkbox" value="2" id={this.state.products[6].id}/>
                                 <span>{this.state.products[6].productDesc}</span>
                               </label>
                             </div>
                             </Col>                             
                           </Row>
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
                               <input type="checkbox" name="checkbox" value="check" id="agree" /> <a
                                 style={{ cursor: "pointer", fontSize: "15px" }}
                                 href={TTCEapi.DocumentsURL + "TERMS_and_CONDITIONS.pdf"}
                                 target="_blank"
                               >
                               {this.props.t("Pages.object.regAgreeTermsConditions")}
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
                                 {this.props.t("Pages.object.regCompleteButton")}
                               </button>
                             </div>
                           </Row>
                           

                           <Row   className="text-center" style={{marginBottom: "10px"}}>
                             
                             <div className="col-xs-12 line312 font2">
                             {/* <a style={{color:"black"}} href={TTCEapi.DocumentsURL + "Help.pdf"}
                                    target="_blank">
                             {this.props.t("Pages.object.regNeedHelp")}{" "}
                             </a> */}
                              <p style={{color:"black",fontWeight:"600",cursor:"pointer"}} onClick={this.helpshow}> {this.props.t("Pages.object.regNeedHelp")}</p> 

                             </div>
                             
                           </Row>

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
                           <Row   className="text-center mt7">
                             <div
                               className="col-xs-12 line6"
                              //  style={{ float: "right" }}
                             >
                               {" "}
                               {this.props.t("Pages.object.changelanguage")}
                               <img src={logos.language} className="ml-5"></img>
                             </div>
                           </Row>
                           {/* <Row  >
            <span className="col-xs-3 text-center">Help</span>
            <span className="col-xs-5"></span>
            <span className="col-xs-4 text-center">Privacy policy</span>
          </Row> */}
                         </div>
                         {/* _____________________________________________Modal ________________________________________________ */}
   <div id="help" class="w3-modal" style={{paddingTop:"200px"}}>
    <div class="w3-modal-content w3-animate-top modalBoxSize" >
        <div class="w3-container buyerMOQAcceptModalContainer">
        <Row noGutters={true}>
            <Col sm={12}  style={{textAlign:"right"}}>
              <h1 className="closebtn" onClick={() => this.helpClose()}>X</h1>
            </Col>
  
        </Row>
       <p className="helpptag">For any kind of help reach out to us at <br></br>
       <a href = "mailto: craftxchange.tatatrusts@gmail.com">
       craftxchange.tatatrusts@gmail.com</a></p>
       
                                                                     
        
    </div>
    </div>
</div>

      {/* -------------------------------------------Modal ends   ----------------          */}   

                       </Col>
                     </React.Fragment>
                   );
                 }
               }

               export default withTranslation()(artreg5);