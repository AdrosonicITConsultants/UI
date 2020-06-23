import React, { Component } from 'react';
import { Row, Col, Container } from "reactstrap";
import "../../Homepage/homepage.css";
import logos from "../../../assets"
import customToast from "../../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default class buyreg4 extends Component {
                 constructor() {
                   super();
                   this.state = {
                    companyname : "",
                    gstno : "",
                    officeno : "",
                    cinno : "",
                    panno : "",
                    pocname : "",
                    pocemail : "",
                    pocmobile : "",
                    showValidationpass: false,
                    brandLogo : [],
                    logoname : ""
                   };
                 }
       
                 operation() {
                   debugger;
                   if (this.state.companyname == "" || this.state.panno == "") {
                     this.setState({
                       showValidationpass: !this.state.showValidationpass,
                     });
                   } else {
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
                   this.setState({ [e.target.name]: e.target.value });
                   this.setState({
                     showValidationpass: false,
                   });
                 }

                 fileChangedHandler = (event) => {
                  let filename = event.target.files[0];
                  if (filename != undefined) {
                    if (filename.size / 1024 / 1024 > 1) {    
                      customToast.error("Please upload product Image below 1MB.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
                    return ;
                  }
                  if (/[^0-9a-zA-Z\-\_\.\(\)]/.test(filename.name)) {
                    customToast.error("Image name contains special characters.", {
                      position: toast.POSITION.TOP_RIGHT,
                      autoClose: true,
                    });
                    return;
                  }
                  this.setState({
                    brandLogo: event.target.files[0],
                  });
                 let reader = new FileReader();
                  reader.onloadend = () => {
                      let imagebytes = reader.result;

                    this.setState({
                     //  brandLogo :{ ...this.state.brandLogo},
                      imagePreviewUrl: imagebytes
                    });
                  };
               
                  if (event.target.files[0]) {
                  //  reader.readAsDataURL(event.target.files[0]);
                  this.refs.fileUploaderName.value = event.target.files[0].name;
                  this.setState({
                    logoname : event.target.files[0].name
                  })
                  }

                  }
                   
                 };
                 componentDidMount(){
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
                    console.log(this.state);
                   });
                  
          
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
                         <div className="demoab text-center" noGutters={true}>
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
                             noGutters={true}
                             className="text-left line32  font3"
                           >
                             {/* <span className="col-xs-1"></span> */}
                             <span
                               style={{
                                 fontWeight: "bold",
                                 fontSize: "18px",
                                 color: "var(--lightBlack)",
                               }}
                               className="col-xs-10 ml-6 fontplay"
                             >
                               {/* <img src={logos.locklogo}   
                    className="locklogo1 glyphicon mr-5"></img> */}
                               Enter your details to complete registration
                             </span>
                           </Row>
                          
                           <Row noGutters={true}>
                             <span
                               style={{ fontWeight: "600" }}
                               className="col-xs-10 line32 text-left ml-6 font3 fontplay"
                             >
                               {/* <img src={logos.locklogo}   
                        className="locklogo1 glyphicon mr-5"></img> */}
                               Company Details
                             </span>
                           </Row>
                           <br />

                           <Row noGutters={true}>
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
                                   {/* <i className="glyphicon glyphicon-user"></i> */}
                                   <input
                                     type="text"
                                     id="companyname"
                                     className="form-control form2 BuyerLogin1"
                                     //placeholder="firstname"
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
                                   {/* <i className="glyphicon glyphicon-user"></i> */}
                                   <input
                                     type="number"
                                     id="gstno"
                                     className="form-control form2 BuyerLogin1"
                                     //placeholder="lastname"
                                     value = {this.state.gstno}

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
                                   {/* <i className="glyphicon glyphicon-user"></i> */}

                                   <input
                                     type="text"
                                     id="fileuploadname"
                                     style={{ paddingRight: "38px" }}
                                     disabled
                                     className="form-control form2 BuyerLogin1"
                                     //placeholder="lastname"
                                     value = {this.state.logoname}

                                     ref="fileUploaderName"
                                    name="lastname"
                                     onClick={() => {
                                       this.refs.fileUploader.click();
                                     }}
                                   />
                                   <img
                                     style={{
                                       position: "absolute",
                                       top: "0.4em",
                                       left: "16em",
                                     }}
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
                                   {/* <i className="glyphicon glyphicon-user"></i> */}
                                   <input
                                     type="text"
                                     id="panno"
                                     className="form-control form2 BuyerLogin1"
                                     //placeholder="address"
                                     value = {this.state.panno}
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
                                   {/* <i className="glyphicon glyphicon-user"></i> */}
                                   <input
                                     type="text"
                                     id="cinno"
                                     className="form-control form2 BuyerLogin1"
                                     //placeholder="address"
                                     value = {this.state.cinno}

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
                                   {/* <strong className="requiredStar">*</strong> */}
                                 </label>
                                 <div className="inner-addon">
                                   {/* <i className="glyphicon glyphicon-user"></i> */}
                                   <input
                                     type="text"
                                     id="pocname"
                                     className="form-control form2 BuyerLogin1"
                                     //placeholder="address"
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
                                   {/* <strong className="requiredStar">*</strong> */}
                                 </label>
                                 <div className="inner-addon">
                                   {/* <i className="glyphicon glyphicon-user"></i> */}
                                   <input
                                     type="email"
                                     id="pocemail"
                                     className="form-control form2 BuyerLogin1"
                                     //placeholder="address"
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
                                   {/* <strong className="requiredStar">*</strong> */}
                                 </label>
                                 <div className="inner-addon">
                                   {/* <i className="glyphicon glyphicon-user"></i> */}
                                   <input
                                     type="number"
                                     id="pocmobile"
                                     className="form-control form2 BuyerLogin1"
                                     //placeholder="address"
                                     value = {this.state.pocmobile}
                                     name="pocmobile"
                                     onChange={(e) => this.handleChange(e)}
                                   />
                                  
                                 </div>
                               </Col>
                             </Col>
                           </Row>
                           {this.state.showValidationpass ? (
                    <span className="bg-danger">please enter all  mandatory fields</span>
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
                           

                           <Row noGutters={true} className="mt17">
                             <strong className="col-xs-12 text-center line7 ">
                               Help?
                             </strong>
                             
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
