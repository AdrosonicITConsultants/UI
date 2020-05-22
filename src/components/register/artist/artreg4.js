import React, { Component } from 'react';
import { Row, Col, Container } from "reactstrap";
import "../../Homepage/homepage.css";
import logos from "../../../assets"
import { CountryDropdown, RegionDropdown } from 'react-indian-state-region-selector';

export default class artreg4 extends Component {
    constructor() {
        super();
        this.state = {
          password: "",
          confirmpass: "",     
          showValidationpass: false,
          showValidationconfirmpass: false,
          showUserName: true,
          State: '', region: '' ,
        };
      }
      selectCountry (val) {
        this.setState({ State: val });
      }
     
      selectRegion (val) {
        this.setState({ region: val });
      }
      operation() {
        debugger;
        if (this.state.password == "") {
            this.setState({
                showValidationpass: !this.state.showValidationpass,
            });
          }
          else if (this.state.confirmpass !== this.state.password ){                    
              this.setState({
                showValidationconfirmpass: !this.state.showValidationconfirmpass,
              });
          } else {
            this.props.handler(3);
          }
      }

      backoperation() {
         this.props.handler(2);
        }
    
    
      handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        this.setState({
            showValidationpass: false,
            showValidationconfirmpass: false
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
                <img src={logos.backarrowicon} className="col-xs-2 margin-arrow arrowsize glyphicon" onClick={() => this.backoperation()}></img>
                        <div>
                        <h3 className="col-xs-6 margin-registertext text-left">Register</h3>
                        <h4 className="margin-roletext1">Artist</h4>
                        </div>
                </div>
            
                <img src={logos.mainlogoside} className="col-xs-3 logoreg3wid" alt="TataTrusts logo"></img>
            </Row>

          
            <Row noGutters={true} className="text-center line32 font3">
            <span className="col-xs-1"></span>
                <span className="col-xs-10">
                {/* <img src={logos.locklogo}   
                    className="locklogo1 glyphicon mr-5"></img> */}
                WEAVER ID : BIKASNAG10
                </span>
                
            </Row>
            <Row noGutters={true}>
                <Col xs={{size :"12"}} md={{size :"6"}}>
                    <Col xs={{size :"11", offset:"1" }} className="form-group1 text-left">
                    <label className="control-label padform text-left">First Name</label>
                    <div className="inner-addon">
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                        type="text"
                        id="firstname"
                        className="form-control form2 BuyerLogin1"
                        //placeholder="firstname"
                        name="firstname"
                        onChange={(e) => this.handleChange(e)}
                        />
                        {/* {this.state.showValidationpass ? (
                        <span className="bg-danger">please enter your first Name</span>
                        ) : <br/>} */}
                    </div>
                    </Col>
                </Col>
                <Col xs={{size :"12"}} md={{size :"6"}}>
                    <Col xs={{size :"11" ,offset:"1"}} className="form-group1 text-left">
                    <label className="control-label padform text-left">Last Name</label>
                    <div className="inner-addon">
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                        type="text"
                        id="lastname"
                        className="form-control form2 BuyerLogin1"
                        //placeholder="lastname"
                        name="lastname"
                        onChange={(e) => this.handleChange(e)}
                        />
                        {/* {this.state.showValidationpass ? (
                        <span className="bg-danger">please enter your lastname</span>
                        ) : <br/>} */}
                    </div>  
                    </Col>
                </Col> 
                <Col xs={{size :"12"}} md={{size :"6"}}>
                    <Col xs={{size :"11" ,offset:"1"}} className="form-group1 text-left">
                    <label className="control-label padform text-left">Pin Code</label>
                    <div className="inner-addon">
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                        type="number"
                        id="pincode"
                        className="form-control form2 BuyerLogin1"
                        //placeholder="pincode"
                        name="pincode"
                        onChange={(e) => this.handleChange(e)}
                        />
                        {/* {this.state.showValidationpass ? (
                        <span className="bg-danger">please enter your pincode</span>
                        ) : <br/>} */}
                    </div>  
                    </Col>
                </Col>
                <Col xs={{size :"12"}} md={{size :"6"}}>
                    <Col xs={{size :"11" ,offset:"1"}} className="form-group1 text-left">
                    <label className="control-label padform text-left">Cluster</label>
                    <div className="inner-addon">
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                        type="text"
                        id="cluster"
                        className="form-control form2 BuyerLogin1"
                        //placeholder="cluster"
                        name="cluster"
                        onChange={(e) => this.handleChange(e)}
                        />
                        {/* {this.state.showValidationpass ? (
                        <span className="bg-danger">please enter your cluster</span>
                        ) : <br/>} */}
                    </div>  
                    </Col>
                </Col>
                <Col xs={{size :"12"}} md={{size :"6"}}>
                    <Col xs={{size :"11" ,offset:"1"}} className="form-group1 text-left">
                    <label className="control-label padform text-left">District</label>
                    <div className="inner-addon">
                       
                        <input
                        type="text"
                        id="district"
                        className="form-control form2 BuyerLogin1"
                       
                        name="cluster"
                        onChange={(e) => this.handleChange(e)}
                        />
                        
                    </div>  
                    </Col>
                </Col>
                <Col xs={{size :"12"}} md={{size :"6"}}>
                    <Col xs={{size :"11" ,offset:"1"}} className="form-group1 text-left">
                    <label className="control-label padform text-left">State</label>
                    <div className="inner-addon">
                       
                        <input
                        type="text"
                        id="state"
                        className="form-control form2 BuyerLogin1"
                        
                        name="state"
                        onChange={(e) => this.handleChange(e)}
                        />
                        
                    </div>  
                    
                    </Col>
                </Col>
                <Col xs={{size :"12"}} md={{size :"6"}}>
                    <Col xs={{size :"11" ,offset:"1"}} className="form-group1 text-left">
                    <label className="control-label padform text-left">Email ID</label>
                    <div className="inner-addon">
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                        type="email"
                        id="emailid"
                        className="form-control form2 BuyerLogin1"
                        //placeholder="emailid"
                        name="emailid"
                        onChange={(e) => this.handleChange(e)}
                        />
                        {/* {this.state.showValidationpass ? (
                        <span className="bg-danger">please enter your emailid</span>
                        ) : <br/>} */}
                    </div>  
                    </Col>
                </Col>   
                <Col xs={{size :"12"}} md={{size :"6"}}>
                    <Col xs={{size :"11" ,offset:"1"}} className="form-group1 text-left">
                    <label className="control-label padform text-left">Mobile Number</label>
                    <div className="inner-addon">
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                        type="number"
                        id="mobileno"
                        className="form-control form2 BuyerLogin1"
                        //placeholder="mobileno"
                        name="mobileno"
                        onChange={(e) => this.handleChange(e)}
                        />
                        {/* {this.state.showValidationpass ? (
                        <span className="bg-danger">please enter your mobile no</span>
                        ) : <br/>} */}
                    </div>  
                    </Col>
                </Col>
                <Col xs={{size :"12"}} md={{size :"6"}}>
                    <Col xs={{size :"11" ,offset:"1"}} className="form-group1 text-left">
                    <label className="control-label padform text-left">PAN No.</label>
                    <div className="inner-addon">
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                        type="text"
                        id="panno"
                        className="form-control form2 BuyerLogin1"
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
                <Col xs={{size :"12"}} md={{size :"6"}}>
                    <Col xs={{size :"11" ,offset:"1"}} className="form-group1 text-left">
                    <label className="control-label padform text-left">Address</label>
                    <div className="inner-addon">
                        {/* <i className="glyphicon glyphicon-user"></i> */}
                        <input
                        type="text"
                        id="address"
                        className="form-control form2 BuyerLogin1"
                        //placeholder="address"
                        name="address"
                        onChange={(e) => this.handleChange(e)}
                        />
                        {/* {this.state.showValidationpass ? (
                        <span className="bg-danger">please enter your Address</span>
                        ) : <br/>} */}
                    </div>  
                    </Col>
                </Col>  
                
            </Row>
            <br></br>
            <div className="text-center">Fields are mandatory</div>      
            <hr className="hrline2"></hr>
           
             
             
         
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
                 Next
                </button>
              </div>
            </Row>   
            <br></br>      
       
         
          
          <Row noGutters={true} className="text-center line312 font3">
              <span className="col-xs-2"></span>
                <span className="col-xs-8">
                Need Help?             </span>
               
          </Row>
          
            
            
           
            <Row noGutters={true} className="text-center line6 font3">
                                    
                                    Change language
                                    <img src={logos.language}  className="ml-5"></img>
                                </Row>

          {/* <Row noGutters={true}>
            <span className="col-xs-3 text-center">Help</span>
            <span className="col-xs-5"></span>
            <span className="col-xs-4 text-center">Privacy policy</span>
          </Row> */}
          <br></br>
        </div>
        </Col>
      </React.Fragment>
      );
    }
}
