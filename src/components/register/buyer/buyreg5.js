import React, { Component } from 'react';
import { Row, Col, Container } from "reactstrap";
import "../../Homepage/homepage.css";
import logos from "../../../assets"
import TTCEapi from '../../../services/API/TTCEapi';

export default class buyreg5 extends Component {
    constructor() {
        super();
        this.state = {
          adl1 : localStorage.getItem("regAddress1") ? localStorage.getItem("regAddress1") : "",
          adl2 : localStorage.getItem("regAddress2") ? localStorage.getItem("regAddress2") : "",
          street : localStorage.getItem("regStreet") ? localStorage.getItem("regStreet") : "",
          city : localStorage.getItem("regCity") ? localStorage.getItem("regCity") : "",
          state : localStorage.getItem("regState") ? localStorage.getItem("regState") : "",
          countryid : localStorage.getItem("regCountryId") ? localStorage.getItem("regCountryId") : "",
          country : localStorage.getItem("regCountry") ? localStorage.getItem("regCountry") : "",
          pincode : localStorage.getItem("regPincode") ? localStorage.getItem("regPincode") : "",
          landmark : localStorage.getItem("regLandmark") ? localStorage.getItem("regLandmark") : "",    
          showValidationpass: false,
          countrydata : [],
          message : "please fill mandatory fields",
          
        };
      }

      operation() {
        var pin=/([0-9])$/;
       
    
      if (this.state.adl1 == "" || this.state.countryid == -1  ||  this.state.pincode == "") {
            this.setState({
              showValidationpass: true,
              message : "please fill mandatory fields"
            });
          }
          else if(!pin.test(this.state.pincode)   )
          {
            this.setState({
              showValidationpass: true,
              message : "Invalid Pincode."
          });
          }
          else {
            this.props.sad(this.state.adl1,this.state.adl2,this.state.street,this.state.city,this.state.state,this.state.country,this.state.pincode,this.state.landmark,this.state.countryid)
            this.props.handler(5);
          }
      }

      backoperation() {
         this.props.handler(3);
        }
    
    
      handleChange(e) {
        var name = e.target.name;
        this.setState({ 
          [e.target.name]: e.target.value 
        }, () => {
          if(name == "adl1") {
            localStorage.setItem("regAddress1", this.state.adl1);
          }
          else if(name == "adl2") {
            localStorage.setItem("regAddress2", this.state.adl2);
          }
          else if(name == "street") {
            localStorage.setItem("regStreet", this.state.street);
          }
          else if(name == "city") {
            localStorage.setItem("regCity", this.state.city);
          }
          else if(name == "state") {
            localStorage.setItem("regState", this.state.state);
          }
          else if(name == "pincode") {
            localStorage.setItem("regPincode", this.state.pincode);
          }
          else if(name == "landmark") {
            localStorage.setItem("regLandmark", this.state.landmark);
          }
        });
        this.setState({
            showValidationpass: false,
        });
      }
      handleCountry(e) {
        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index];
        var option =  optionElement.getAttribute('countryid');
        this.setState({ [e.target.name]: e.target.value , countryid : option}, ()=> {
          localStorage.setItem("regCountry", this.state.country);
          localStorage.setItem("regCountryId", option);
        });
        this.setState({
            showValidationpass: false,
        });
      }
      componentDidMount(){
        localStorage.setItem("regCurrentPage", 4);
        this.setState({adl1 : this.props.adl1 ,
          adl2 : this.props.adl2,
          street : this.props.street,
          city : this.props.city,
          state : this.props.state,
          country : this.props.country,
          pincode : this.props.pincode,
          landmark : this.props.landmark,
          countryid : this.props.countryid,

         
          

         },()=>{
         });
        
         TTCEapi.getCountries().then((response)=>{
          this.setState({countrydata : response.data.data},()=>{
            if(this.state.countryid > 0)
            {
              // this.setState({clusterid : -1 });
              
            }
            else {
              this.setState({countryid : -1  , country : 'Select Country' });


            }
          });
         
     

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
                <Row   className="text-left line32  font3">
                  {/* <span className="col-xs-1"></span> */}
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
                {/* <br></br> */}

                <Row  >
                  <span
                    style={{ fontWeight: "600" }}
                    className="col-xs-10 line32 text-left ml-6 font3 fontplay"
                  >
                   
                    Registered Address
                  </span>
                </Row>
                <br />
                <Row  >
                  <Col xs={{ size: "12" }} md={{ size: "6" }}>
                    <Col
                      xs={{ size: "11", offset: "1" }}
                      className="form-group11 text-left"
                    >
                      <label className="control-label padform text-left">
                        Address Line 1
                        <strong className="requiredStar">*</strong>
                      </label>
                      <div className="inner-addon">
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                          type="text"
                          id="adl1"
                          className="form-control form2 BuyerLogin1"
                          //placeholder="firstname"
                          value={this.state.adl1}
                          name="adl1"
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                    </Col>
                  </Col>
                  <Col xs={{ size: "12" }} md={{ size: "6" }}>
                    <Col
                      xs={{ size: "11", offset: "1" }}
                      className="form-group11 text-left"
                    >
                      <label className="control-label padform text-left">
                        Address Line 2
                      </label>
                      <div className="inner-addon">
                        <input
                          type="text"
                          id="adl2"
                          className="form-control form2 BuyerLogin1"
                          value={this.state.adl2}
                          name="adl2"
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                    </Col>
                  </Col>
                  <Col xs={{ size: "12" }} md={{ size: "6" }}>
                    <Col
                      xs={{ size: "11", offset: "1" }}
                      className="form-group11 text-left"
                    >
                      <label className="control-label padform text-left">
                        Street
                      </label>
                      <div className="inner-addon">
                        <input
                          type="text"
                          id="street"
                          className="form-control form2 BuyerLogin1"
                          value={this.state.street}
                          name="street"
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                    </Col>
                  </Col>
                  <Col xs={{ size: "12" }} md={{ size: "6" }}>
                    <Col
                      xs={{ size: "11", offset: "1" }}
                      className="form-group11 text-left"
                    >
                      <label className="control-label padform text-left">
                        City
                      </label>
                      <div className="inner-addon">
                        <input
                          type="text"
                          id="city"
                          className="form-control form2 BuyerLogin1"
                          value={this.state.city}
                          name="city"
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                    </Col>
                  </Col>
                  <Col xs={{ size: "12" }} md={{ size: "6" }}>
                    <Col
                      xs={{ size: "11", offset: "1" }}
                      className="form-group11 text-left"
                    >
                      <label className="control-label padform text-left">
                        State
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
                      className="form-group11 text-left"
                    >
                      <label className="control-label padform text-left">
                        Country<strong className="requiredStar">*</strong>
                      </label>
                      <div className="inner-addon">
                        <select
                          id="country"
                          className="form-control form2 BuyerLogin1"
                          name="country"
                          value={this.state.country}
                          onChange={(e) => this.handleCountry(e)}
                        >
                          <option key="0" countryid="-1" value="Select Country">
                            Select Country
                          </option>
                          {this.state.countrydata.map((item) => (
                            <option
                              key={item.id}
                              countryid={item.id}
                              value={item.name}
                            >
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Col>
                  </Col>
                  <Col xs={{ size: "12" }} md={{ size: "6" }}>
                    <Col
                      xs={{ size: "11", offset: "1" }}
                      className="form-group11 text-left"
                    >
                      <label className="control-label padform text-left">
                        Pincode<strong className="requiredStar">*</strong>
                      </label>
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
                      className="form-group11 text-left"
                    >
                      <label className="control-label padform text-left">
                        Landmark
                      </label>
                      <div className="inner-addon">
                        <input
                          type="text"
                          id="landmark"
                          className="form-control form2 BuyerLogin1"
                          value={this.state.landmark}
                          name="landmark"
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
                  Fields are mandatory
                </div>
                <hr className="hrline2"></hr>
                <div className="text-center">Next up :Website Link</div>

                <Row  >
                  <div className="col-xs-12 text-center">
                    <button
                      className="blackButton"
                      style={{
                        marginTop: "8px",
                      }}
                      onClick={() => this.operation()}
                    >
                      Next
                    </button>
                  </div>
                </Row>

                <Row noGutters={true} className="mt10">
                  <strong className="col-xs-12 text-center line7 ">
                  <a style={{color:"black"}} href={TTCEapi.DocumentsURL + "Help.pdf"}
                                    target="_blank">Help?</a>
                  </strong>
                </Row>

               
              </div>
            </Col>
          </React.Fragment>
        );
    }
}
