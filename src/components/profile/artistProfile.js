import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Button} from 'reactstrap';
import '../navbar/navbar.css';
import NavbarComponent from "../navbar/navbar";
import { connect } from "react-redux";
import * as Actions from "../../redux/action/action";
import "./artistProfile.css";
import "./buyerProfile.css"
class ArtistProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
          firstName : this.props.user.firstName,
          lastName : this.props.user.lastName,
          isProfile : false,
          isDetailsEdit : true,
          accountno : "",
          bankname : "" ,
          branch : "" ,
          ifsccode : "",
          benificiaryname : "",
          gpayupi : "",
          paytmupi : "",
          phonepeupi  : "",

          name: this.props.user.firstName +" "+ this.props.user.lastName,
          mobile:this.props.user.mobile,
          email:this.props.user.email,
          

          isDesc: true,
          ischanged: false,
          isButtonDisabled: true,
          isAcon: true,
          isBdetail: true,
          isPod: true,
          isDaddress : true,
          designation: this.props.user.designation,
          alternatemobno: this.props.user.alternateMobile,
          panno: this.props.user.pancard,
          line1 : this.props.user.addressses[0].line1,
          line2 : this.props.user.addressses[0].line2,
          street :this.props.user.addressses[0].street,
          city : this.props.user.addressses[0].city,
          pincode : this.props.user.addressses[0].pincode,
          state : this.props.user.addressses[0].state,                                                  
         
        };
        this.handleDetail = this.handleDetail.bind(this);
        this.handlebdetEdit = this.handlebdetEdit.bind(this);

        this.handleEdit = this.handleEdit.bind(this);
        this.handleconEdit = this.handleconEdit.bind(this);
        this.handledetEdit = this.handledetEdit.bind(this);
        this.handlebEdit = this.handlebEdit.bind(this);
        this.handlepocEdit = this.handlepocEdit.bind(this);


        
      }
      handlebdetEdit(){
        this.setState({
            isDetailsEdit:!this.state.isDetailsEdit
        })
    }
    handleEdit(){
          this.setState({
              isDesc:!this.state.isDesc
          })
      }
    handlebEdit(){
        this.setState({
            isBdetail:!this.state.isBdetail
        })
    }
    handlepocEdit(){
        this.setState({
            isAcon:!this.state.isAcon
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
      handleDetail(){
        this.setState({
            isProfile:!this.state.isProfile
        })
    }
    render() {
        return (
            <React.Fragment>
                <NavbarComponent/>
                <div className="Aopbg">
                    <Container >
                        <Row noGutters={true}>
                        <div className="aprofilelogo">
                           </div>
                        </Row>
                        <Row noGutters={true} className="text-center welcome">
                           Welcome,{ " " +this.state.firstName + " " + this.state.lastName }
                        </Row>
                        <Row noGutters={true} className="text-center ">
                           Manage your info,brand and bank details 
                        </Row>
                        <Row noGutters={true} className="mt30 ">
                            <Col sm = {{size: "6"}} className="text-right">
                               {this.state.isProfile 
                               ?
                               <u className="selected">My Details</u> 
                                :
                                <span className="notSelected" style={{"cursor":"pointer" }}  onClick={this.handleDetail}>My Details</span>
                                }
                            </Col>
                            <Col sm = {{size: "6"}} className="text-left">
                            {this.state.isProfile
                               ?
                               <span className="notSelected" style={{"cursor":"pointer" }} onClick={this.handleDetail}>Bank Details</span>
                                :
                                <u className="selected">Bank Details</u> 
                                }
                            </Col>
                        </Row>
                        <br>
                        </br>
                        {this.state.isProfile 
                        ?

                <Row noGutters={true} >
                                            <Col sm = {{size: "6"}} className="aocbg1" >
                                                <div className="fw600 bdetailsheading">
                                                <img
                                                                            src={logos.personalicon}
                                                                            className="iconcss"
                                                                            onClick={this.handlepocEdit}
                                                                    ></img>      Personal Details
                                                </div>
                                                {this.state.isAcon ? <img
                                                                            src={logos.apedit}
                                                                            className="aoctick"
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
                                                
                                                <hr className="hrlineaop3 "></hr>
                                                <Col sm = {{size: "7"}} className="cardtextfield" >
                                                <div className="fw700 font14">
                                                    Name:
                                                </div>
                                                <div>
                                                    {this.state.name}
                                                {/* <input
                                                        type="text"
                                                        id="pocname"
                                                        className="form-control bgdis3  BuyerLogin21"
                                                        value= {this.state.name}
                                                        placeholder = "pocname"
                                                        disabled={this.state.isAcon} 
                                                        name="pocname"
                                                        onChange={(e) => this.handleChange(e)}
                                                       disabled />  */}
                                                
                                                </div>
                                                <div className="fw700 font14">
                                                   Email Id:
                                                </div>
                                                <div>
                                                <input
                                                        type="email"
                                                        id="pocemail"
                                                        className="form-control bgdis3  BuyerLogin21"
                                                        value= {this.state.email}
                                                        placeholder = "pocmobile"
                                                        disabled={this.state.isAcon} 
                                                        name="pocemail"
                                                        onChange={(e) => this.handleChange(e)}
                                                        disabled
                                                        /> 
                                                    
                                                </div>
                                                <div className="fw700 font14">
                                                    Mobile:
                                                </div>
                                                <div>
                                                <input
                                                        type="number"
                                                        id="pocmobile"
                                                        className="form-control bgdis3  BuyerLogin21"
                                                        value= {this.state.mobile}
                                                        placeholder = "pocemail"
                                                        disabled={this.state.isAcon} 
                                                        name="pocmobile"
                                                        onChange={(e) => this.handleChange(e)}
                                                        disabled
                                                        /> 
                                                    
                                                </div>
                                                <div className="fw700 font14">
                                                    Address:
                                                </div>
                                                {this.state.isAcon 
                                                ? 
                                                    <div className="font14  mt7">
                                                        {this.state.line1},
                                                        {" " + this.state.line2},
                                                       
                                                    </div>
                                                :
                                                <div>
                                                    <input
                                                        type="text"
                                                        id="line1"
                                                        className="form-control bgdis3  BuyerLogin21"
                                                        value= {this.state.line1}
                                                        disabled={this.state.isAcon} 
                                                        placeholder = "line1"
                                                        name="line1"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />
                                                        
                                                 </div>
                                                        }
                                              </Col>
                                              <Col sm={{size:"5"}}>
                                              <div class="Profilecontainer">

                                            <div class="card Profilecard">
                                                <img className="profileimg" src="https://codepen-chriscoyier-bucket.imgix.net/1.png" alt="Avatar for user 1"/>
                                                    
                                                </div>


                                            </div>
                                              </Col>
                                            </Col>
                                            <Col sm = {{size: "6"}} className="aocbg2" >
                                                <div className="fw600 bdetailsheading">
                                                <img
                                                                            src={logos.brandicon}
                                                                            className="iconcss"
                                                                            onClick={this.handlepocEdit}
                                                                    ></img>    Brand Details
                                                </div>
                                                {this.state.isBdetail ? <img
                                                                            src={logos.apedit}
                                                                            className="aoctick"
                                                                            style={{"cursor":"pointer" ,
                                                                        "position" : "absolute"}}
                                                                            onClick={this.handlebEdit}
                                                                    ></img> : 
                                                                    <img
                                                                            src={logos.done}
                                                                            className="poctick"
                                                                            style={{"cursor":"pointer",
                                                                            "position" : "absolute"}}
                                                                            onClick={this.handlebEdit}
                                                                    ></img>}
                                                
                                                <hr className="hrlineaop3"></hr>
                                                <Col sm={{size:7}} className="cardtextfield">
                                                <div className="fw700 font14">
                                                    Name:
                                                </div>
                                                <div>
                                                <input
                                                        type="text"
                                                        id="pocname"
                                                        className="form-control bgdis3  BuyerLogin21 Margintopcss"
                                                        value= {this.state.pocname}
                                                        disabled={this.state.isBdetail} 
                                                        placeholder = "pocname"
                                                        name="pocname"
                                                        onChange={(e) => this.handleChange(e)}
                                                        
                                                        />
                                                
                                                </div>
                                                <div className="fw700 font14">
                                                    Cluster:
                                                </div>
                                                <div>
                                                <input
                                                        type="number"
                                                        id="pocmobile"
                                                        className="form-control bgdis3  BuyerLogin21"
                                                        value= {this.state.cluster}
                                                        placeholder = "pocmobile"
                                                        disabled={this.state.isBdetail} 
                                                        name="pocmobile"
                                                        onChange={(e) => this.handleChange(e)}
                                                        disabled/> 
                                                    
                                                </div>
                                                <div className="fw700 font14">
                                                    Product Category:
                                                </div>
                                                <div>
                                                <input
                                                        type="text"
                                                        id="pocmobile"
                                                        className="form-control bgdis3  BuyerLogin21"
                                                        value= {this.state.pocmobile}
                                                        placeholder = "pocmobile"
                                                        disabled={this.state.isBdetail} 
                                                        name="pocmobile"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                                    
                                                </div>
                                                <div className="fw700 font14">
                                                   Description:
                                                </div>
                                                <div>
                                                <input
                                                        type="text"
                                                        id="pocdesc"
                                                        className="form-control bgdis3  BuyerLogin21"
                                                        value= {this.state.pocdesc}
                                                        placeholder = "pocmobile"
                                                        disabled={this.state.isBdetail} 
                                                        name="pocdesc"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                                    
                                                </div>
                                                </Col>
                                                <Col sm={{size:5}}>
                                                <div class="Profilecontainer">

                                                        <div class="card Profilecard">
                                                            <img className="profileimg" src="https://codepen-chriscoyier-bucket.imgix.net/8.png" alt="Avatar for user 1"/>
                                                        
                                                                {/* <div class="edit"><a href="#"><i class="fa fa-pencil fa-lg"></i></a></div> */}

                                                            </div>


                                                        </div>
                                                </Col>
                                            </Col>
                                         
                                        
                                        </Row>
                                        :
                                        <Row noGutters={true}>
                                            <Col sm = {{size: "1"}} ></Col>
                                            <Col sm = {{size: "10"}}>
                                                    <div className="bankdetails">
                                                        <div className="bankheading">
                                                        <img src={logos.bankicon} className="bankicon ">

                                                        </img>
                                                            Bank and Digital Payment Options
                                                            {this.state.isDetailsEdit ? <img
                                                                    src={logos.editblack}
                                                                    className="poctick2 "
                                                                    style={{"cursor":"pointer" ,
                                                                    "position" : "absolute"}}
                                                                    onClick={this.handlebdetEdit}
                                                            ></img> : 
                                                            <img
                                                                    src={logos.done}
                                                                    className="poctick2 "
                                                                    style={{"cursor":"pointer",
                                                                    "position" : "absolute"}}
                                                                    onClick={this.handlebdetEdit}
                                                            ></img>}
                                                

                                                        </div>
                                                        <hr className="hrlineaop3 "></hr>
                                                        <Row noGutters={true} className="bankcontent">
                                                            <Col sm = {{size: "6"}}>
                                                            <div className="font20">
                                                                Bank Details
                                                            </div>
                                                            <br></br>
                                                                                                        
                                                            <div className="fw700 font14">
                                                                Account Number
                                                            </div>
                                                <div>
                                                <input
                                                        type="number"
                                                        id="accountno"
                                                        className="form-control bgdis3  BuyerLogin21"
                                                        value= {this.state.accountno}
                                                        placeholder = "Account no."
                                                        disabled={this.state.isDetailsEdit} 
                                                        name="accountno"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                                
                                                </div>
                                                <div className="fw700 font14">
                                                    Bank Name
                                                </div>
                                                <div>
                                                <input
                                                        type="text"
                                                        id="bankname"
                                                        className="form-control bgdis3  BuyerLogin21"
                                                        value= {this.state.bankname}
                                                        placeholder = "Bank Name"
                                                        disabled={this.state.isDetailsEdit} 
                                                        name="bankname"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                                    
                                                </div>
                                                <div className="fw700 font14">
                                                    Benificiary Name
                                                </div>
                                                <div>
                                                <input
                                                        type="text"
                                                        id="benificiaryname"
                                                        className="form-control bgdis3  BuyerLogin21"
                                                        value= {this.state.benificiaryname}
                                                        placeholder = "Benificiary Name"
                                                        disabled={this.state.isDetailsEdit} 
                                                        name="benificiaryname"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                                    
                                                </div>
                                                <div className="fw700 font14">
                                                    Branch
                                                </div>
                                                <div>
                                                <input
                                                        type="text"
                                                        id="branch"
                                                        className="form-control bgdis3  BuyerLogin21"
                                                        value= {this.state.branch}
                                                        placeholder = "Branch"
                                                        disabled={this.state.isDetailsEdit} 
                                                        name="branch"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                                    
                                                </div>
                                                <div className="fw700 font14">
                                                    IFSC Code
                                                </div>
                                                <div>
                                                <input
                                                        type="text"
                                                        id="ifsccode"
                                                        className="form-control bgdis3  BuyerLogin21"
                                                        value= {this.state.ifsccode}
                                                        placeholder = "IFSC Code"
                                                        disabled={this.state.isDetailsEdit} 
                                                        name="ifsccode"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                                    
                                                </div>
                                                

                                                            </Col>
                                                            <Col sm = {{size: "6"}}>
                                                            <div className="font20">
                                                                Digital Payment Details
                                                            </div>
                                                            <br></br>
                                                            <Row>

                                                                <Col sm = {{size: "2"}}>
                                                                
                                                                <img src={logos.gpay} className="gpayicon"></img>

                                                                </Col>
                                                                <Col sm = {{size: "9"}} className="digitalbank">
                                                                <div className="fw700 font14">
                                                                    Google Pay UPI Id
                                                                </div>
                                                                <div>
                                                                <input
                                                                        type="text"
                                                                        id="gpayupi"
                                                                        className="form-control bgdis3  BuyerLogin21 borderRadius0"
                                                                        value= {this.state.gpayupi}
                                                                        placeholder = "Gpay UPI."
                                                                        disabled={this.state.isDetailsEdit} 
                                                                        name="gpayupi"
                                                                        onChange={(e) => this.handleChange(e)}
                                                                        /> 
                                                                
                                                                </div>
                                                                </Col>
                                                                </Row>
                                                            <Row>

                                                                <Col sm = {{size: "2"}}>
                                                                
                                                                <img src={logos.paytm} className="gpayicon"></img>

                                                                </Col>
                                                                <Col sm = {{size: "9"}} className="digitalbank">
                                                                <div className="fw700 font14">
                                                                    Paytm Registered Mobile Number
                                                                </div>
                                                                <div>
                                                                <input
                                                                        type="text"
                                                                        id="paytmupi"
                                                                        className="form-control bgdis3  BuyerLogin21 borderRadius0"
                                                                        value= {this.state.paytmupi}
                                                                        placeholder = "Paytm No."
                                                                        disabled={this.state.isDetailsEdit} 
                                                                        name="paytmupi"
                                                                        onChange={(e) => this.handleChange(e)}
                                                                        /> 
                                                                
                                                                </div>
                                                                </Col>
                                                                </Row>
                                                                <Row>

                                                                <Col sm = {{size: "2"}}>
                                                                
                                                                <img src={logos.phonepe} className="gpayicon"></img>

                                                                </Col>
                                                                <Col sm = {{size: "9"}} className="digitalbank">
                                                                <div className="fw700 font14">
                                                                    Registered Number for PhonePe
                                                                </div>
                                                                <div>
                                                                <input
                                                                        type="text"
                                                                        id="phonepeupi"
                                                                        className="form-control bgdis3  BuyerLogin21 borderRadius0"
                                                                        value= {this.state.phonepeupi}
                                                                        placeholder = "PhonePe No."
                                                                        disabled={this.state.isDetailsEdit} 
                                                                        name="phonepeupi"
                                                                        onChange={(e) => this.handleChange(e)}
                                                                        /> 
                                                                
                                                                </div>
                                                                </Col>
                                                                </Row>
                                                            

                                                             
                                                
                                                                
                                                            </Col>
                                                            <div className="vrlinebank"></div>

                                                        </Row>      
                                                    </div>
                                                    
                                            </Col>
                                            
                                        </Row>
                                                }
                       <Row noGutters={true}><Col className="letsbuildtext">Let's build the strong future!</Col></Row>                
</Container>
{console.log(this.props.user)}
</div>
            </React.Fragment>
            // <div>
            //      {console.log("user data")}
            //      {console.log(this.props.user)}
            //      {"this is my profile page check console for variable"}
            // </div>
        )
    }
}

function mapStateToProps(state) {
    // debugger;
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(ArtistProfile);
export default connectedLoginPage;