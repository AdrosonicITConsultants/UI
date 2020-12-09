import React, { Component } from 'react';
import { Row, Col, Container } from "reactstrap";
import "../../Homepage/homepage.css";
import logos from "../../../assets"
import customToast from "../../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";
import TTCEapi from '../../../services/API/TTCEapi';


export default class buyreg4 extends Component {
                 constructor() {
                   super();
                   this.state = {
                    companyname : localStorage.getItem("regCompany") ? localStorage.getItem("regCompany") : "",
                    gstno : localStorage.getItem("regGST") ? localStorage.getItem("regGST") : "",
                    officeno : "",
                    cinno : localStorage.getItem("regCIN") ? localStorage.getItem("regCIN") : "",
                    panno : localStorage.getItem("regPanNo") ? localStorage.getItem("regPanNo") : "",
                    pocname : localStorage.getItem("regPOCName") ? localStorage.getItem("regPOCName") : "",
                    pocemail : localStorage.getItem("regPOCEmail") ? localStorage.getItem("regPOCEmail") : "",
                    pocmobile : localStorage.getItem("regPOCMobile") ? localStorage.getItem("regPOCMobile") : "",
                    showValidationpass: false,
                    brandLogo : [],
                    logoname : "",
                    message : "",
                   };
                 }
       
                 operation() {
                   
                   const emailcheck = isEmail;
                   var flag = true; 
                   var regex=/([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
                   var alpha=/([A-Z]){1}([0-9]){5}([A-Z]){2}([0-9]){4}([A-Z]){3}([0-9]){6}$/;
                   var gstval=/([0-9]){2}([A-Z0-9]){10}([0-9]){1}([A-Z]){1}([0-9]){1}$/;
                   if (this.state.companyname == "" || this.state.panno == "") {
                     flag = false ;
                     this.setState({
                       showValidationpass: true,
                       message : "please fill mandatory fields"

                     });
                   } else  if(!regex.test(this.state.panno.toUpperCase()))
                   {                       flag = false ;

                            this.setState({
                              showValidationpass: true,
                              message : "Invalid PAN Number"
                          });
                
                          
                    } else if((this.state.gstno.length > 15 || this.state.gstno.length < 15 || !gstval.test(this.state.gstno.toUpperCase()))  &&  this.state.gstno != "")
                    {  flag = false;
                            this.setState({
                              showValidationpass: true,
                              message : "Invalid GST Number"
                          });
                
                          
                    } else if((this.state.cinno.length > 21 || this.state.cinno.length < 21 || !alpha.test(this.state.cinno.toUpperCase())) && this.state.cinno != "")
                    {                   

                            this.setState({
                              showValidationpass: true,
                              message : "Invalid CIN Number"
                          });
                
                          
                    }else if (this.state.pocemail != "" && !emailcheck(this.state.pocemail))
                     {
                      this.setState({
                        showValidationpass: true,
                        message : "POC Email not valid."

                      });
                    }
                     else if((parseFloat(this.state.pocmobile)>9999999999 || parseFloat(this.state.pocmobile)<1000000000) && this.state.pocmobile !="" )
                     {
                      this.setState({
                        showValidationpass: true,
                        message : "POC mobile number should be of 10 digits."
                    });
                    }
                    else {

                     this.props.scd(this.state.companyname,this.state.gstno,this.state.officeno,
                      this.state.brandLogo,this.state.cinno,this.state.panno,this.state.logoname,
                      this.state.pocmobile,this.state.pocemail,this.state.pocname)
                     this.props.handler(4);
                   }
                 }

                 backoperation() {
                   this.props.handler(2);
                 }

                 handleChange(e) {
                  var name = e.target.name;
                  if (e.target.id =="gstno"){
                    var stripped = e.target.value.replace(/[^A-Z0-9\sg]+/i, '')
                    e.target.value = stripped;
                    this.setState({ 
                      [e.target.name]: e.target.value 
                    }, () => {
                      localStorage.setItem("regGST", this.state.gstno);
                    });
                    this.setState({
                      showValidationpass: false,
                    });
                  }
                  else if (e.target.id =="panno"){
                    var stripped = e.target.value.replace(/[^A-Z0-9\sg]+/i, '')
                    e.target.value = stripped;
                    this.setState({ 
                      [e.target.name]: e.target.value 
                    }, () => {
                      localStorage.setItem("regPanNo", this.state.panno);
                    });
                    this.setState({
                      showValidationpass: false,
                    });
                  }
                  else if (e.target.id =="cinno"){
                    var stripped = e.target.value.replace(/[^A-Z0-9\sg]+/i, '')
                    e.target.value = stripped;
                    this.setState({ 
                      [e.target.name]: e.target.value 
                    }, () => {
                      localStorage.setItem("regCIN", this.state.cinno);
                    });
                    this.setState({
                      showValidationpass: false,
                    });
                  }
                  else{
                   this.setState({ 
                     [e.target.name]: e.target.value 
                    }, () => {
                      if(name == "companyname") {
                        localStorage.setItem("regCompany", this.state.companyname);
                      }
                      else if(name == "pocname") {
                        localStorage.setItem("regPOCName", this.state.pocname);
                      }
                      else if(name == "pocemail") {
                        localStorage.setItem("regPOCEmail", this.state.pocemail);
                      }
                      else if(name == "pocmobile") {
                        localStorage.setItem("regPOCMobile", this.state.pocmobile);
                      }
                    });
                   this.setState({
                     showValidationpass: false,
                   });
                 }
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
                    brandLogo: event.target.files[0],
                  });
                 let reader = new FileReader();
                  reader.onloadend = () => {
                      let imagebytes = reader.result;

                    this.setState({
                      imagePreviewUrl: imagebytes
                    });
                  };
               
                  if (event.target.files[0]) {
                  this.refs.fileUploaderName.value = event.target.files[0].name;
                  this.setState({
                    logoname : event.target.files[0].name
                  })
                  }

                  }
                   
                 };
                 componentDidMount(){

                  localStorage.setItem("regCurrentPage", 3);
                  this.setState({companyname : this.props.companyname ,
                    gstno : this.props.gstno,
                    officeno : this.props.officeno,
                    brandLogo : this.props.brandLogo,
                    cinno : this.props.cinno,
                    panno : this.props.panno,
                    logoname : this.props.logoname,
                    pocname : this.props.pocname,
                    pocemail: this.props.pocemail,
                    pocmobile : this.props.pocmobile,                   
                    
          
                   },()=>{
                   });
                  
          
                }
                helpshow(){
                  document.getElementById('help').style.display='block';
              } 
              helpClose(){
                  document.getElementById('help').style.display='none'; 
              }
                 render() {
                   const { Country, region } = this.state;
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
                         <div className="demoab text-center"  >
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
                                 <h4 className="margin-roletext1">Buyer</h4>
                               </div>
                             </div>

                             <img
                               src={logos.mainlogoside}
                               className="col-xs-3 logoreg3wid"
                               alt="TataTrusts logo"
                             ></img>
                           </Row>
                            <br>
                            </br>
                           <Row
                              
                             className="text-left line32  font3"
                           >
                             <span
                               style={{
                                 fontWeight: "bold",
                                 fontSize: "18px",
                                 color: "var(--lightBlack)",
                               }}
                               className="col-xs-10 ml-6 fontplay"
                             >
                              
                               Enter your details to complete registration
                             </span>
                           </Row>
                          
                           <Row  >
                             <span
                               style={{ fontWeight: "600" }}
                               className="col-xs-10 line32 text-left ml-6 font3 fontplay"
                             >
                              
                               Company Details
                             </span>
                           </Row>
                           <br />

                           <Row  >
                             <Col xs={{ size: "12" }} md={{ size: "6" }}>
                               <Col
                                 xs={{ size: "11", offset: "1" }}
                                 className="form-group1 text-left"
                               >
                                 <label className="control-label padform text-left">
                                   Brand/Company Name
                                   <strong className="requiredStar">*</strong>
                                 </label>
                                 <div className="inner-addon">
                                   <input
                                     type="text"
                                     id="companyname"
                                     className="form-control form2 BuyerLogin1"
                                     value = {this.state.companyname}
                                     name="companyname"
                                     onChange={(e) => this.handleChange(e)}
                                   />
                                   
                                 </div>
                               </Col>
                             </Col>
                             <Col xs={{ size: "12" }} md={{ size: "6" }}>
                               <Col
                                 xs={{ size: "11", offset: "1" }}
                                 className="form-group1 text-left"
                               >
                                 <label className="control-label padform text-left">
                                   GST No.
                                 </label>
                                 <div className="inner-addon">
                                   <input
                                     type="text"
                                     id="gstno"
                                     className="form-control form2 BuyerLogin1"
                                     value = {this.state.gstno.toUpperCase()}
                                     name="gstno"
                                     onChange={(e) => this.handleChange(e)}
                                   />
                                  
                                 </div>
                               </Col>
                             </Col>

                             
                             <Col xs={{ size: "12" }} md={{ size: "6" }}>
                               <Col
                                 xs={{ size: "11", offset: "1" }}
                                 className="form-group1 text-left"
                               >
                                 <label className="control-label padform text-left">
                                   Upload your Brand Logo
                                 </label>
                                 <div className="inner-addon">

                                   <input
                                     type="text"
                                     id="fileuploadname"
                                     style={{ paddingRight: "38px" }}
                                     disabled
                                     className="form-control form2 BuyerLogin1"
                                     value = {this.state.logoname}

                                     ref="fileUploaderName"
                                    name="lastname"
                                     onClick={() => {
                                       this.refs.fileUploader.click();
                                     }}
                                   />
                                   <img
                                  
                                     className = "brandupload"
                                     src={logos.uploadlogo}
                                     onClick={() => {
                                       this.refs.fileUploader.click();
                                     }}
                                   ></img>

                                   <input
                                     accept="image/png, image/jpeg"
                                     onChange={this.fileChangedHandler}
                                     type="file"
                                     ref="fileUploader"
                                     style={{ display: "none" }}
                                   ></input>

                                   
                                 </div>
                               </Col>
                             </Col>

                             
                             <Col xs={{ size: "12" }} md={{ size: "6" }}>
                               <Col
                                 xs={{ size: "11", offset: "1" }}
                                 className="form-group1 text-left"
                               >
                                 <label className="control-label padform text-left">
                                   PAN Number
                                   <strong className="requiredStar">*</strong>
                                 </label>
                                 <div className="inner-addon">
                                   <input
                                     type="text"
                                     id="panno"
                                     className="form-control form2 BuyerLogin1"
                                     value = {this.state.panno.toUpperCase()}
                                     name="panno"
                                     onChange={(e) => this.handleChange(e)}
                                   />
                                  
                                 </div>
                               </Col>
                             </Col>
                             <Col xs={{ size: "12" }} md={{ size: "6" }}>
                               <Col
                                 xs={{ size: "11", offset: "1" }}
                                 className="form-group1 text-left"
                               >
                                 <label className="control-label padform text-left">
                                   CIN Number
                                 </label>
                                 <div className="inner-addon">
                                   <input
                                     type="text"
                                     id="cinno"
                                     className="form-control form2 BuyerLogin1"
                                     value = {this.state.cinno.toUpperCase()}
                                     name="cinno"
                                     onChange={(e) => this.handleChange(e)}
                                   />
                                   
                                 </div>
                               </Col>
                             </Col>
                             <Col xs={{ size: "12" }} md={{ size: "6" }}>
                               <Col
                                 xs={{ size: "11", offset: "1" }}
                                 className="form-group1 text-left"
                               >
                                 <label className="control-label padform text-left">
                                   Point of contact (Name)
                                 </label>
                                 <div className="inner-addon">
                                   <input
                                     type="text"
                                     id="pocname"
                                     className="form-control form2 BuyerLogin1"
                                     value = {this.state.pocname}
                                     name="pocname"
                                     onChange={(e) => this.handleChange(e)}
                                   />
                                   
                                 </div>
                               </Col>
                             </Col>
                             <Col xs={{ size: "12" }} md={{ size: "6" }}>
                               <Col
                                 xs={{ size: "11", offset: "1" }}
                                 className="form-group1 text-left"
                               >
                                 <label className="control-label padform text-left">
                                   Email ID for point of contact
                                 </label>
                                 <div className="inner-addon">
                                   <input
                                     type="email"
                                     id="pocemail"
                                     className="form-control form2 BuyerLogin1"
                                     value = {this.state.pocemail}
                                     name="pocemail"
                                     onChange={(e) => this.handleChange(e)}
                                   />
                                   
                                 </div>
                               </Col>
                             </Col>
                             <Col xs={{ size: "12" }} md={{ size: "6" }}>
                               <Col
                                 xs={{ size: "11", offset: "1" }}
                                 className="form-group1 text-left"
                               >
                                 <label className="control-label padform text-left">
                                   Mobile No. for point of contact
                                 </label>
                                 <div className="inner-addon">
                                   <input
                                     type="number"
                                     id="pocmobile"
                                     className="form-control form2 BuyerLogin1"
                                     value = {this.state.pocmobile}
                                     name="pocmobile"
                                     onChange={(e) => this.handleChange(e)}
                                   />
                                  
                                 </div>
                               </Col>
                             </Col>
                           </Row>
                           {this.state.showValidationpass ? (
                    <span className="bg-danger">{this.state.message}</span>
                  ) : (
                    <br />
                  )} 
                           
                           <div
                             className="text-center"
                             style={{ color: "#cc6868" }}
                           >
                             <strong
                               className="requiredStar"
                               style={{ marginLeft: "-15px " }}
                             >
                               *
                             </strong>
                             Fields are mandatory
                           </div>
                           <hr className="hrline2"></hr>
                           <div className="text-center">
                             Next up :Registered address
                           </div>
                           <br></br>

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
                           

                           <Row   className="mt17" style={{marginTop:"-15px"}}>
                             <strong className="col-xs-12 text-center line7 ">
                             {/* <a style={{color:"black"}} href={TTCEapi.DocumentsURL + "Help.pdf"}
                                    target="_blank">Help?</a> */}
                              <p style={{color:"black",fontWeight:"600",cursor:"pointer"}} onClick={this.helpshow}>Help?</p> 

                             </strong>
                             
                           </Row>

                            
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
