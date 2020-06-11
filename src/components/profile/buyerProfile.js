import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Button} from 'reactstrap';

import '../navbar/navbar.css';
import NavbarComponent from "../navbar/navbar";
import { connect } from "react-redux";
import * as Actions from "../../redux/action/action";
import './buyerProfile.css';

class BuyerProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
          isDesc: true,
          ischanged: false,
          isButtonDisabled: true,
          isAcon: true,
          isBdetail: true,
          isPod: true,
          isDaddress : true,
          designation: this.props.user.designation,
          alternatemobno: this.props.user.alternateMobile,
          gstno: this.props.user.buyerCompanyDetails.gstNo,
          cinno: this.props.user.buyerCompanyDetails.cin,
          panno: this.props.user.pancard,
          pocname : this.props.user.pointOfContact.firstName,
          pocemail : this.props.user.pointOfContact.email,
          pocmobile : this.props.user.pointOfContact.contactNo,
          line1 : this.props.user.addressses[1].line1,
          line2 : this.props.user.addressses[1].line2,
          street :this.props.user.addressses[1].street,
          city : this.props.user.addressses[1].city,
          pincode : this.props.user.addressses[1].pincode,
          state : this.props.user.addressses[1].state,                                                  
         
        };
        
        this.handleEdit = this.handleEdit.bind(this);
        this.handleconEdit = this.handleconEdit.bind(this);
        this.handledetEdit = this.handledetEdit.bind(this);
        this.handleaddEdit = this.handleaddEdit.bind(this);
        this.handlepocEdit = this.handlepocEdit.bind(this);


        
      }
    handleEdit(){
          this.setState({
              isDesc:!this.state.isDesc
          })
      }
    handleaddEdit(){
        this.setState({
            isDaddress:!this.state.isDaddress
        })
    }
    handlepocEdit(){
        this.setState({
            isPod:!this.state.isPod
        })
    }
      handleconEdit(){
        this.setState({
            isAcon:!this.state.isAcon
        })
    }
    handledetEdit(){
        this.setState({
            isBdetail:!this.state.isBdetail
        })
    }
      handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        this.setState({
            ischanged : true
        });
      }
    render() {
        return (

            <React.Fragment>
                   <NavbarComponent/>
                <Container>
                <div className="profilebackground">
                    <br></br>
                    
                   <div className="profileheading fontplay">My Profile</div>
                   <br></br>
                   <Row noGutters={true}>
                        <Col sm = {{size: "1"}}></Col>

                            <Col sm = {{size: "10"}}>
                           <div className="profilelogo">
                           </div>
                           <div className= "databackground">
                               <Row noGutters={true}>
                                    <Col sm = {{size: "1"}}></Col>
                                    <Col sm = {{size: "10"}}>
                                        <Row noGutters={true}>
                                                    {/* <Col sm = {{size: "1"}}></Col> */}
                                                    <Col sm = {{size: "10"}} className= "profilename">{this.props.user.firstName}<br></br>{this.props.user.lastName}</Col>
                                                    
                                        </Row>
                                        <Row noGutters={true}>
                                                    {/* <Col sm = {{size: "1"}}></Col> */}
                                        
                                                    <Col sm = {{size: "10"}} className= "profiledesig">
                                                    
                                                        <input
                                                        type="text"
                                                        id="designation"
                                                        className="form-control bgdis  BuyerLogin2"
                                                        value= {this.state.designation}
                                                        placeholder = "designation"
                                                        disabled={this.state.isDesc} 
                                                        name="designation"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />

                                                        {this.state.isDesc ? <img
                                                                src={logos.edit}
                                                                className="editdesc"
                                                                style={{"cursor":"pointer"}}
                                                                onClick={this.handleEdit}
                                                        ></img> : 
                                                        <img
                                                                src={logos.done}
                                                                className="checkdesc"
                                                                style={{"cursor":"pointer"}}
                                                                onClick={this.handleEdit}
                                                        ></img>}
                                                        
                                                        {/* {this.props.user.designation}</Col> */}
                                                        </Col>
                                        </Row>
                                        <Row noGutters={true}>
                                                    
                                                    <Col sm = {{size: "6"}} >
                                                        <div  className= "companyname">
                                                        {this.props.user.buyerCompanyDetails.companyName},{" " + this.props.user.addressses[0].city}

                                                        </div>
                                                        <hr className="profileline"></hr>
                                                        <div className="font16 fw600">
                                                                Registered Address
                                                        </div>
                                                        <div className="font14 fw600 mt7">
                                                            {this.props.user.addressses[0].line1},
                                                            {" " + this.props.user.addressses[0].line2},
                                                            {" " + this.props.user.addressses[0].street},
                                                            {" " + this.props.user.addressses[0].city},
                                                            {" " + this.props.user.addressses[0].pincode},
                                                            {" " + this.props.user.addressses[0].state}

                                                            
                                                        </div>
                                                        <div className="font14 fw600 mt7">
                                                        {this.props.user.addressses[0].country.name}
                                                        </div>
                                                    </Col>
                                                    <Col sm = {{size: "6"}}>
                                                        <div className="pcontactbg ">
                                                            <div className= "" >
                                                            <img
                                                                src={logos.maillogo}
                                                                className ="mr10"
                                                                ></img>
                                                                {this.props.user.email}

                                                            </div>
                                                            <div>
                                                            <img
                                                                src={logos.call}
                                                                className ="mr15" ></img>
                                                                {this.props.user.mobile}
                                                                (primary)
                                                            </div>
                                                        </div>

                                                        <div  className="pcontactbg mt7">
                                                        <img
                                                                src={logos.call}
                                                                className ="mr15" ></img>
                                                                <input
                                                                    type="number"
                                                                    id="alternatemobno"
                                                                    className="form-control bgdis2  BuyerLogin2"
                                                                    value= {this.state.alternatemobno}
                                                                    placeholder = "alternatemobno"
                                                                    disabled={this.state.isAcon} 
                                                                    name="alternatemobno"
                                                                    onChange={(e) => this.handleChange(e)}
                                                                    />

                                                                    {this.state.isAcon ? <img
                                                                            src={logos.edit}
                                                                            className=""
                                                                            style={{"cursor":"pointer"}}
                                                                            onClick={this.handleconEdit}
                                                                    ></img> : 
                                                                    <img
                                                                            src={logos.done}
                                                                            className=""
                                                                            style={{"cursor":"pointer"}}
                                                                            onClick={this.handleconEdit}
                                                                    ></img>}
                                                        </div>
                                                    </Col>
                                        </Row>
                                        <hr className="hrlinep2"></hr>
                                        <Row noGutters={true} className="text-center bdetail fw600">
                                          
                                                <div className="text-center font22 fw700">Brand Details 
                                                &nbsp; {this.state.isBdetail ? <img
                                                                            src={logos.edit}
                                                                            className=""
                                                                            style={{"cursor":"pointer" ,
                                                                        "position" : "absolute"}}
                                                                            onClick={this.handledetEdit}
                                                                    ></img> : 
                                                                    <img
                                                                            src={logos.done}
                                                                            className=""
                                                                            style={{"cursor":"pointer",
                                                                            "position" : "absolute"}}
                                                                            onClick={this.handledetEdit}
                                                                    ></img>}
                                            </div>
                                            <Col sm = {{size: "4"}} className="bdetailsheading"> 
                                            GST N0.<br></br>
                                            <input
                                                        type="text"
                                                        id="gstno"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value = {this.state.gstno}
                                                        placeholder = "gstno"
                                                        disabled={this.state.isBdetail} 
                                                        name="gstno"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />

                                            
                                            </Col>
                                            <Col sm = {{size: "4"}} className="bdetailsheading"> 
                                            CIN N0.<br></br>

                                            <input
                                                        type="text"
                                                        id="cinno"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.cinno}
                                                        placeholder = "cinno"
                                                        disabled={this.state.isBdetail} 
                                                        name="cinno"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />
                                            </Col>
                                            <Col sm = {{size: "4"}} className="bdetailsheading">
                                            PAN N0.<br></br>

                                            <input
                                                        type="text"
                                                        id="panno"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.panno}
                                                        placeholder = "panno"
                                                        disabled={this.state.isBdetail} 
                                                        name="panno"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                            </Col>

                                        </Row>
                                        <hr className="hrlinep2"></hr>
                                        <Row noGutters={true}>
                                            <Col sm = {{size: "6"}} className="pocbg1" >
                                                <div className="fw600 bdetailsheading">
                                                    Point of Contact
                                                </div>
                                                {this.state.isPod ? <img
                                                                            src={logos.edit}
                                                                            className="poctick"
                                                                            style={{"cursor":"pointer" ,
                                                                        "position" : "absolute"}}
                                                                            onClick={this.handlepocEdit}
                                                                    ></img> : 
                                                                    <img
                                                                            src={logos.done}
                                                                            className="poctick"
                                                                            style={{"cursor":"pointer",
                                                                            "position" : "absolute"}}
                                                                            onClick={this.handlepocEdit}
                                                                    ></img>}
                                                
                                                <hr className="hrlinep3"></hr>
                                                <div className="fw700 font14">
                                                    Name
                                                </div>
                                                <div>
                                                <input
                                                        type="text"
                                                        id="pocname"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.pocname}
                                                        placeholder = "pocname"
                                                        disabled={this.state.isPod} 
                                                        name="pocname"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                                
                                                </div>
                                                <div className="fw700 font14">
                                                    Mobile No.
                                                </div>
                                                <div>
                                                <input
                                                        type="number"
                                                        id="pocmobile"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.pocmobile}
                                                        placeholder = "pocmobile"
                                                        disabled={this.state.isPod} 
                                                        name="pocmobile"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                                    
                                                </div>
                                                <div className="fw700 font14">
                                                    Email Id
                                                </div>
                                                <div>
                                                <input
                                                        type="email"
                                                        id="pocemail"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.pocemail}
                                                        placeholder = "pocemail"
                                                        disabled={this.state.isPod} 
                                                        name="pocemail"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                                    
                                                </div>
                                            </Col>
                                            
                                            <Col sm = {{size: "6"}} className="pocbg2">
                                                <div className="fw600 bdetailsheading">
                                                    Delivery Address
                                                </div>
                                                {this.state.isDaddress ? <img
                                                                            src={logos.edit}
                                                                            className="poctick"
                                                                            style={{"cursor":"pointer" ,
                                                                        "position" : "absolute"}}
                                                                            onClick={this.handleaddEdit}
                                                                    ></img> : 
                                                                    <img
                                                                            src={logos.done}
                                                                            className="poctick"
                                                                            style={{"cursor":"pointer",
                                                                            "position" : "absolute"}}
                                                                            onClick={this.handleaddEdit}
                                                                    ></img>}
                                                
                                                <hr className="hrlinep3"></hr>
                                                <div className="font16 fw600">
                                                    {this.props.user.buyerCompanyDetails.companyName}
                                                </div>
                                                {this.state.isDaddress 
                                                ? 
                                                    <div className="font14 fw600 mt7">
                                                        {this.state.line1},
                                                        {" " + this.state.line2},
                                                        {" " + this.state.street},
                                                        {" " + this.state.city},
                                                        {" " + this.state.pincode},
                                                        {" " + this.state.state}
                                                    </div>
                                                :
                                                <div>
                                                    <input
                                                        type="text"
                                                        id="line1"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.line1}
                                                        placeholder = "line1"
                                                        name="line1"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />
                                                    <input
                                                        type="text"
                                                        id="line2"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.line2}
                                                        placeholder = "line2"
                                                        name="line2"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />
                                                    <input
                                                        type="text"
                                                        id="street"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.street}
                                                        placeholder = "street"     
                                                        name="street"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />
                                                    <input
                                                        type="text"
                                                        id="city"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.city}
                                                        placeholder = "city"         
                                                        name="city"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />
                                                    <input
                                                        type="number"
                                                        id="pincode"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.pincode}
                                                        placeholder = "pincode"   
                                                        name="pincode"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />
                                                    <input
                                                        type="text"
                                                        id="state"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.state}
                                                        placeholder = "state"
                                                        name="state"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />
                                                    <input
                                                        type="number"
                                                        id="alternatemobno"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.alternatemobno}
                                                        placeholder = "alternatemobno" 
                                                        name="alternatemobno"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 

                                                </div>
                                                }
                                                
                                            </Col>
                                        
                                        
                                        </Row>
                                        <br></br>
                                        <Row noGutters={true} className="text-center ">
                                            <button
                                                id ="savebutton"
                                                disabled={this.state.isButtonDisabled}
                                                className="blackButton"
                                                onClick={() => this.SaveDetails()}
                                            >
                                                Save Details
                                            </button>
                                        </Row>
                                        
                                        <Row noGutters={true}>
                                            <div className="noteprofile">
                                                Please Note In case of change of non editable field, please feel free <span className = " ">to reach out to our support team.</span>
                                            </div>
                                        </Row>
                                         <Row noGutters={true} className="text-center">
                                            <img className="spinimage" src = {logos.spin}></img>
                                        </Row>
                                    </Col>
                                </Row>
                          </div>
                       </Col>
                   </Row>

                </div>

                </Container>
            </React.Fragment>
            // <div>
            //      {console.log("user data")}
            //      {console.log(this.props.user)}
            //      {"this is my buyerprofile page check console for variable"}
            
            // </div>
        )
    }
}

function mapStateToProps(state) {
 
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(BuyerProfile);
export default connectedLoginPage;

