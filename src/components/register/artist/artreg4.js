import React, { Component } from 'react';
import { Row, Col, Container, ButtonGroup,Button } from "reactstrap";
import "../../Homepage/homepage.css";
import logos from "../../../assets"
import TTCEapi from '../../../services/API/TTCEapi';
import { useTranslation, withTranslation } from "react-i18next";
import changeLang from "../../../services/utils/changeLang";

class artreg4 extends Component {
    constructor() {
        super();
        this.state = {
          firstname : localStorage.getItem("regFirstName") ? localStorage.getItem("regFirstName") : "",
          lastname : localStorage.getItem("regLastName") ? localStorage.getItem("regLastName") : "",
          pincode : localStorage.getItem("regPincode") ? localStorage.getItem("regPincode") : "",
          cluster : localStorage.getItem("regCluster") ? localStorage.getItem("regCluster") : "",
          district : localStorage.getItem("regDistrict") ? localStorage.getItem("regDistrict") : "",
          state : localStorage.getItem("regState") ? localStorage.getItem("regState") : "",
          mobileno : localStorage.getItem("regMobile") ? localStorage.getItem("regMobile") : "",
          panno : localStorage.getItem("regPanNo") ? localStorage.getItem("regPanNo") : "",
          address : localStorage.getItem("regAddress") ? localStorage.getItem("regAddress") : "",
          clusterdata : [],
          clusterid : localStorage.getItem("regClusterId") ? localStorage.getItem("regClusterId") : -1,
          message : "please fill mandatory fields",
          showValidationpass: false,
          showValidationconfirmpass: false,
          showUserName: true,
          State: '', region: '' ,
        };
      }

      changeLang = (data) => {
        localStorage.setItem("i18nextLng", data);
      }
     
      operation() {
        var pin=/([0-9]){1}([0-9]){5}$/;
        // 
        if (this.state.firstname == ""  || this.state.clusterid == -1 || this.state.pincode == "" || this.state.mobileno == "") {
            this.setState({
                showValidationpass: true,
                message : "please fill mandatory fields"
            });
          }
          else if(!pin.test(this.state.pincode) || this.state.pincode.length != 6)
          {
            this.setState({
              showValidationpass: true,
              message : "pincode should be of 6 digits."
          });
          }
          else if(parseFloat(this.state.mobileno)>9999999999 || parseFloat(this.state.mobileno)<1000000000 )
          {
            this.setState({
              showValidationpass: true,
              message : "mobile number should be of 10 digits."
          });
          }
          else if((this.state.panno.length > 10 || this.state.panno.length < 10) && this.state.panno != "")
          {
            this.setState({
              showValidationpass: true,
              message : "pan number should be of 10 characters."
          });

          }
          else {
            this.props.sd1(this.state.firstname,this.state.lastname,this.state.pincode,this.state.clusterid,this.state.district,this.state.state,this.state.mobileno,this.state.panno,this.state.address,this.state.cluster)
            this.props.handler(4);
 
          }
      }

      backoperation() {
         this.props.handler(2);
        }
    
        handleCluster(e) {
          var index = e.target.selectedIndex;
          var optionElement = e.target.childNodes[index];
          var option =  optionElement.getAttribute('clusterid');
          
          this.setState({ [e.target.name]: e.target.value , clusterid : option}, ()=> {
            localStorage.setItem("regCluster", this.state.cluster);
            localStorage.setItem("regClusterId", option);
          });
          this.setState({
              showValidationpass: false,
          });
        }
      handleChange(e) {
        if (e.target.id =="panno"){
          var stripped = e.target.value.replace(/[^A-Z0-9\sg]+/i, '')
          e.target.value = stripped;
          this.setState({ 
            [e.target.name]: e.target.value 
          }, () => {            
            localStorage.setItem("regPanNo", this.state.panno);            
          });
        }
        else{
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
            else if(name == "pincode") {
              localStorage.setItem("regPincode", this.state.pincode);
            }
            else if(name == "district") {
              localStorage.setItem("regDistrict", this.state.district);
            }
            else if(name == "state") {
              localStorage.setItem("regState", this.state.state);
            }
            else if(name == "mobileno") {
              localStorage.setItem("regMobile", this.state.mobileno);
            }
            else if(name == "address") {
              localStorage.setItem("regAddress", this.state.address);
            }
          });
          this.setState({
              showValidationpass: false,
          });
        }
      
      }
      componentDidMount(){
        localStorage.setItem("regCurrentPage", 3);
        this.setState({firstname : this.props.firstname ,
          lastname : this.props.lastname,
          pincode : this.props.pincode,
          clusterid : this.props.cluster,
          district : this.props.district,
          state : this.props.state,
          mobileno : this.props.mobileno,
          panno : this.props.panno,
          address : this.props.address,
          cluster: this.props.clustername,
          

         },()=>{
         });

        TTCEapi.getClusters().then((response)=>{
            this.setState({clusterdata : response.data.data},() => {
             
              if(this.state.clusterid > 0)
              {
               
              }
              else {
                this.setState({clusterid : -1  , cluster : 'Select Cluster' });
               
              }
              
            });

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

                <Row   className="text-center line32 font3">
                  <span className="col-xs-1"></span>
                  <span className="col-xs-10">
                   
                    <span className = "fontplay">{this.props.t("Pages.object.regArtisanID")} : </span>{this.props.weaverid}
                  </span>
                </Row>
                <Row  >
                  <Col xs={{ size: "12" }} md={{ size: "6" }}>
                    <Col
                      xs={{ size: "11", offset: "1" }}
                      className="form-group1 text-left"
                    >
                      <label className="control-label padform text-left">
                      {this.props.t("Pages.object.regFirstName")}
                      </label>
                      <strong className="requiredStar">*</strong>

                      <div className="inner-addon">
                        <input
                          type="text"
                          id="firstname"
                          className="form-control form2 BuyerLogin1"
                          value={this.state.firstname}
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
                      {this.props.t("Pages.object.regLastName")}
                      </label>
                      <div className="inner-addon">
                        <input
                          type="text"
                          id="lastname"
                          className="form-control form2 BuyerLogin1"
                          value={this.state.lastname}
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
                      {this.props.t("Pages.object.regPinCode")}
                      </label>
                      <strong className="requiredStar">*</strong>
                      <div className="inner-addon">
                        <input
                          type="number"
                          id="pincode"
                          className="form-control form2 BuyerLogin1"
                          value={this.state.pincode}
                          name="pincode"
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
                      {this.props.t("Pages.object.regCluster")}
                      </label>
                      <strong className="requiredStar">*</strong>

                      <div className="inner-addon">
                        <select
                          id="cluster"
                          className="form-control boxDropdown form2 BuyerLogin1"
                          name="cluster"
                          value = {this.state.cluster}
                          onChange={(e) => this.handleCluster(e)}  >
                            <option key = '0' clusterid = '-1'  value='Select Cluster'>Select Cluster</option>
                        {this.state.clusterdata.map((item) => <option key =  {item.id} clusterid={item.id} value={item.desc}>{item.desc}</option>)}
                      </select>
                        
                      </div>
                    </Col>
                  </Col>
                  <Col xs={{ size: "12" }} md={{ size: "6" }}>
                    <Col
                      xs={{ size: "11", offset: "1" }}
                      className="form-group1 text-left"
                    >
                      <label className="control-label padform text-left">
                      {this.props.t("Pages.object.regDistrict")}
                      </label>
                      <div className="inner-addon">
                        <input
                          type="text"
                          id="district"
                          className="form-control form2 BuyerLogin1"
                          name="district"
                          value={this.state.district}
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
                      {this.props.t("Pages.object.regState")}
                      </label>
                      <div className="inner-addon">
                        <input
                          type="text"
                          id="state"
                          className="form-control form2 BuyerLogin1"
                          value={this.state.state}
                          name="state"
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
                      {this.props.t("Pages.object.regEmailId")}
                      </label>
                      <strong className="requiredStar">*</strong>

                      <div className="inner-addon">
                        <input
                          type="email"
                          id="emailid"
                          className="form-control form2 BuyerLogin1"
                          value={this.props.emailid}
                          name="emailid"
                          disabled
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
                      {this.props.t("Pages.object.regMobileNumber")}
                      </label>
                      <strong className="requiredStar">*</strong>

                      <div className="inner-addon">
                        <input
                          type="number"
                          id="mobileno"
                          className="form-control form2 BuyerLogin1"
                          value={this.state.mobileno}
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
                      {this.props.t("Pages.object.regPANNo")}
                      </label>
                      <div className="inner-addon">
                        <input
                          type="text"
                          id="panno"
                          className="form-control form2 BuyerLogin1"
                          value={this.state.panno.toUpperCase()}
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
                      {this.props.t("Pages.object.regAddress")}
                      </label>
                      <div className="inner-addon">
                        <input
                          type="text"
                          id="address"
                          className="form-control form2 BuyerLogin1"
                          value={this.state.address}
                          name="address"
                          onChange={(e) => this.handleChange(e)}
                        />
                        
                      </div>
                    </Col>
                  </Col>
                </Row>
                {this.state.showValidationpass ? (
                          <span className="bg-danger text-center">
                            {this.state.message}
                          </span>
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
                  {this.props.t("Pages.object.regMandatoryFields")}
                </div>
                <hr className="hrline2"></hr>

                <Row  >
                  <div className="col-xs-12 text-center">
                    <button
                      className="blackButton"
                      onClick={() => this.operation()}
                    >
                      {this.props.t("Pages.object.regNextButton")}
                    </button>
                  </div>
                </Row>
                

                <Row   className="text-center line312 font2">
                  <span className="col-xs-2"></span>
                  
                  <span className="col-xs-8">
                  {/* <a style={{color:"black"}} href={TTCEapi.DocumentsURL + "Help.pdf"}
                                    target="_blank"> {this.props.t("Pages.object.regNeedHelp")}
                                    </a> */}
                   <p style={{color:"black",fontWeight:"600"}} onClick={this.helpshow}> {this.props.t("Pages.object.regNeedHelp")}</p> 

                                    </span>
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

                <Row   className="text-center line6 ">
                {this.props.t("Pages.object.changelanguage")}
                  <img src={logos.language} className="ml-5"></img>
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
       <a href = "mailto: antaran@tatatrusts.org">
             antaran@tatatrusts.org</a></p>
       
                                                                     
        
    </div>
    </div>
</div>

      {/* -------------------------------------------Modal ends   ----------------          */}   

            </Col>
          </React.Fragment>
        );
    }
}

export default withTranslation()(artreg4);
