import React, { Component } from 'react';
import { Row, Col, Container } from "reactstrap";
import "../../Homepage/homepage.css";
import logos from "../../../assets";
import TTCEapi from '../../../services/API/TTCEapi';

export default class buyreg3 extends Component {
    constructor() {
        super();
        this.state = {
          firstname : localStorage.getItem("regFirstName") ? localStorage.getItem("regFirstName") : "",
          lastname : localStorage.getItem("regLastName") ? localStorage.getItem("regLastName") : "",
          mobileno : localStorage.getItem("regMobile") ? localStorage.getItem("regMobile") : "",
          alternatemobno : localStorage.getItem("regAlternateMobile") ? localStorage.getItem("regAlternateMobile") : "",
          designation : localStorage.getItem("regDesignation") ? localStorage.getItem("regDesignation") : "",
          showValidationpass: false,
          message : "",
          
        };
      }
    
      operation() {
        
        if (this.state.firstname == "" || this.state.mobileno == "") {
            this.setState({
                showValidationpass: true,
                message : "please fill mandatory fields"

            });
          }
          else if(parseFloat(this.state.mobileno)>9999999999 || parseFloat(this.state.mobileno)<1000000000 )
          {
            this.setState({
              showValidationpass: true,
              message : "mobile number should be of 10 digits."
          });
          }
          else if(parseFloat(this.state.alternatemobno)>9999999999 || parseFloat(this.state.alternatemobno)<1000000000 )
          {
            this.setState({
              showValidationpass: true,
              message : "alternate mobile number should be of 10 digits."
          });
          }
           else {
             this.props.spd(this.state.firstname,this.state.lastname,this.state.mobileno,this.state.alternatemobno,this.state.designation);
            this.props.handler(3);
          }
      }

      backoperation() {
         this.props.handler(1);
        }
    
    
      handleChange(e) {
        var name = e.target.name;
        this.setState({ 
          [e.target.name]: e.target.value 
        }, () => {
          if(name == "firstname") {
            localStorage.setItem("regFirstName", this.state.firstname);
          }
          else if(name == "lastname") {
            localStorage.setItem("regLastName", this.state.lastname);
          }
          else if(name == "mobileno") {
            localStorage.setItem("regMobile", this.state.mobileno);
          }
          else if(name == "alternatemobno") {
            localStorage.setItem("regAlternateMobile", this.state.alternatemobno);
          }
          else if(name == "designation") {
            localStorage.setItem("regDesignation", this.state.designation);
          }
        });
        this.setState({
            showValidationpass: false,
        });
      }
      componentDidMount(){
        localStorage.setItem("regCurrentPage", 2);
        this.setState({firstname : this.props.firstname ,
          lastname : this.props.lastname,
          mobileno : this.props.mobileno,
          alternatemobno : this.props.alternatemobno,
          designation : this.props.designation,
         
          

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

                <br></br>
                <Row   className="text-center line32 font3">
                  <span className="col-xs-1"></span>
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "var(--lightBlack)",
                    }}
                    className="col-xs-10 fontplay"
                  >
                   
                    Enter your details to complete registration
                  </span>
                </Row>
                <br></br>
                <Row  >
                  <span
                    style={{ fontWeight: "600" }}
                    className="col-xs-10 line32 text-left ml-6 font3 fontplay"
                  >
              
                    Personal Details
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
                        First Name<strong className="requiredStar">*</strong>
                      </label>
                      <div className="inner-addon">
                        <input
                          type="text"
                          id="firstname"
                          className="form-control form2 BuyerLogin1"
                          value= {this.state.firstname}
                          name="firstname"
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
                        Last Name
                      </label>
                      <div className="inner-addon">
                        <input
                          type="text"
                          id="lastname"
                          className="form-control form2 BuyerLogin1"
                          value= {this.state.lastname}
                          name="lastname"
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
                        Mobile Number<strong className="requiredStar">*</strong>
                      </label>
                      <div className="inner-addon">
                        <input
                          type="number"
                          id="mobileno"
                          className="form-control form2 BuyerLogin1"
                          value= {this.state.mobileno}

                          name="mobileno"
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
                        Alternate contact Number
                      </label>
                      <div className="inner-addon">
                        <input
                          type="number"
                          id="alternatemobno"
                          className="form-control form2 BuyerLogin1"
                          value= {this.state.alternatemobno}
                          name="alternatemobno"
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
                        Designation
                      </label>
                      <div className="inner-addon">
                        <input
                          type="text"
                          id="designation"
                          className="form-control form2 BuyerLogin1"
                          value= {this.state.designation}
                          maxLength = "17"
                          name="designation"
                          onChange={(e) => this.handleChange(e)}
                        />
                        
                      </div>
                    </Col>
                  </Col>
                </Row>
                <br></br>
                {this.state.showValidationpass ? (
                    <span className="bg-danger">{this.state.message}</span>
                  ) : (
                    <br />
                  )}           
                <div className="text-center" style={{ color: "#cc6868" }}>
                  <strong
                    className="requiredStar"
                    style={{ marginLeft: "-15px " }}
                  >
                    *
                  </strong>
                  Fields are mandatory
                </div>
                <hr className="hrline2"></hr>
                <div className="text-center">Next up :Company Details</div>
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
                <Row   className="mt30"> 
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
