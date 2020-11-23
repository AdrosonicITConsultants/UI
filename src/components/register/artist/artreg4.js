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
          firstname : "",
          lastname : "",
          pincode : "",
          cluster : "",
          district : "",
          state : "",
          mobileno : "",
          panno : "",
          address : "",
          clusterdata : [],
          clusterid : -1,
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
        // debugger;
        if (this.state.firstname == ""  || this.state.clusterid == -1 || this.state.pincode == "" || this.state.mobileno == "") {
            this.setState({
                showValidationpass: true,
                message : "please fill mandatory fields"
            });
            console.log(this.state.panno.length);
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
            console.log(this.state);
            this.props.handler(4);
 
          }
      }

      backoperation() {
         this.props.handler(2);
        }
    
        handleCluster(e) {
          // console.log(e.target.id);
          var index = e.target.selectedIndex;
          var optionElement = e.target.childNodes[index];
          var option =  optionElement.getAttribute('clusterid');
          console.log(option);
          
          this.setState({ [e.target.name]: e.target.value , clusterid : option}, ()=> {
            console.log(this.state);
            
          });
          this.setState({
              showValidationpass: false,
          });
        }
      handleChange(e) {
        if (e.target.id =="panno"){
          var stripped = e.target.value.replace(/[^A-Z0-9\sg]+/i, '')
          e.target.value = stripped;
          this.setState({ [e.target.name]: e.target.value });
        }
        else{
          this.setState({ [e.target.name]: e.target.value });
          this.setState({
              showValidationpass: false,
          });
        }
      
      }
      componentDidMount(){
        console.log("here");
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
          console.log(this.state);
         });

        TTCEapi.getClusters().then((response)=>{
            this.setState({clusterdata : response.data.data},() => {
              // this.setState({cluster : this.state.clusterdata[0].desc})
             
              if(this.state.clusterid > 0)
              {
                // this.setState({clusterid : -1 });
                
              }
              else {
                this.setState({clusterid : -1  , cluster : 'Select Cluster' });
                

              }
              // console.log("show" + this.state.clusterdata[ind].desc);
              
            });

        });
        // console.log(this.state);
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
                    {/* <img src={logos.locklogo}   
                    className="locklogo1 glyphicon mr-5"></img> */}
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
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                          type="text"
                          id="firstname"
                          className="form-control form2 BuyerLogin1"
                          //placeholder="firstname"
                          value={this.state.firstname}
                          name="firstname"
                          onChange={(e) => this.handleChange(e)}
                        />
                        {/* {this.state.showValidationpass ? (
                        <span className="bg-danger">please enter your first Name</span>
                        ) : <br/>} */}
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
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                          type="text"
                          id="lastname"
                          className="form-control form2 BuyerLogin1"
                          //placeholder="lastname"
                          value={this.state.lastname}
                          name="lastname"
                          onChange={(e) => this.handleChange(e)}
                        />
                        {/* {this.state.showValidationpass ? (
                        <span className="bg-danger">please enter your lastname</span>
                        ) : <br/>} */}
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
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                          type="number"
                          id="pincode"
                          className="form-control form2 BuyerLogin1"
                          //placeholder="pincode"
                          value={this.state.pincode}
                          name="pincode"
                          onChange={(e) => this.handleChange(e)}
                        />
                        {/* {this.state.showValidationpass ? (
                        <span className="bg-danger">please enter your pincode</span>
                        ) : <br/>} */}
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
                        {/* <i className="glyphicon glyphicon-user"></i> */}
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
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                          type="email"
                          id="emailid"
                          className="form-control form2 BuyerLogin1"
                          value={this.props.emailid}
                          name="emailid"
                          disabled
                          onChange={(e) => this.handleChange(e)}
                        />
                        {/* {this.state.showValidationpass ? (
                        <span className="bg-danger">please enter your emailid</span>
                        ) : <br/>} */}
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
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                          type="number"
                          id="mobileno"
                          className="form-control form2 BuyerLogin1"
                          //placeholder="mobileno"
                          value={this.state.mobileno}
                          name="mobileno"
                          onChange={(e) => this.handleChange(e)}
                        />
                        {/* {this.state.showValidationpass ? (
                        <span className="bg-danger">please enter your mobile no</span>
                        ) : <br/>} */}
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
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                          type="text"
                          id="panno"
                          className="form-control form2 BuyerLogin1"
                          value={this.state.panno.toUpperCase()}
                          //placeholder="panno"
                          name="panno"
                          onChange={(e) => this.handleChange(e)}
                        />
                        {/* {this.state.showValidationpass ? (
                        <span className="bg-danger">please enter your PAN No.</span>
                        ) : <br/>} */}
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
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                          type="text"
                          id="address"
                          className="form-control form2 BuyerLogin1"
                          value={this.state.address}
                          //placeholder="address"
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
                  <a style={{color:"black"}} href={TTCEapi.DocumentsURL + "Help.pdf"}
                                    target="_blank"> {this.props.t("Pages.object.regNeedHelp")}
                                    </a></span>
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

export default withTranslation()(artreg4);
