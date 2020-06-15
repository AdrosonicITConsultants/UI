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
        
        this.handleEdit = this.handleEdit.bind(this);
        this.handleconEdit = this.handleconEdit.bind(this);
        this.handledetEdit = this.handledetEdit.bind(this);
        this.handlebEdit = this.handlebEdit.bind(this);
        this.handlepocEdit = this.handlepocEdit.bind(this);


        
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
    render() {
        return (
            <React.Fragment>
                <NavbarComponent/>
                <div className="Aopbg">
                    <Container >
               
                <Row noGutters={true} >
                                            <Col sm = {{size: "6"}} className="aocbg1" >
                                                <div className="fw600 bdetailsheading">
                                                   Personal Details
                                                </div>
                                                {this.state.isAcon ? <img
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
                                                <Col sm = {{size: "6"}} className="cardtextfield" >
                                                <div className="fw700 font14">
                                                    Name:
                                                </div>
                                                <div>
                                                <input
                                                        type="text"
                                                        id="pocname"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.pocname}
                                                        placeholder = "pocname"
                                                        disabled={this.state.isAcon} 
                                                        name="pocname"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                                
                                                </div>
                                                <div className="fw700 font14">
                                                   Email Id:
                                                </div>
                                                <div>
                                                <input
                                                        type="email"
                                                        id="pocemail"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.pocemail}
                                                        placeholder = "pocmobile"
                                                        disabled={this.state.isAcon} 
                                                        name="pocemail"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                                    
                                                </div>
                                                <div className="fw700 font14">
                                                    Mobile:
                                                </div>
                                                <div>
                                                <input
                                                        type="number"
                                                        id="pocmobile"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.pocmobile}
                                                        placeholder = "pocemail"
                                                        disabled={this.state.isAcon} 
                                                        name="pocmobile"
                                                        onChange={(e) => this.handleChange(e)}
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
                                                        disabled={this.state.isAcon} 
                                                        placeholder = "line1"
                                                        name="line1"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />
                                                         <input
                                                        type="text"
                                                        id="line2"
                                                        className="form-control bgdis3 BuyerLogin2 Margintopcss"
                                                        value= {this.state.line2}
                                                        disabled={this.state.isAcon} 
                                                        placeholder = "line2"
                                                        name="line2"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />
                                                    <input
                                                        type="text"
                                                        id="street"
                                                        className="form-control bgdis3  BuyerLogin2 Margintopcss"
                                                        value= {this.state.street}
                                                        disabled={this.state.isAcon} 
                                                        placeholder = "street"     
                                                        name="street"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />
                                                    <input
                                                        type="text"
                                                        id="city"
                                                        className="form-control bgdis3  BuyerLogin2 Margintopcss"
                                                        value= {this.state.city}
                                                        disabled={this.state.isAcon} 
                                                        placeholder = "city"         
                                                        name="city"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />
                                                    <input
                                                        type="number"
                                                        id="pincode"
                                                        className="form-control bgdis3  BuyerLogin2 Margintopcss"
                                                        value= {this.state.pincode}
                                                        disabled={this.state.isAcon} 
                                                        placeholder = "pincode"   
                                                        name="pincode"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />
                                                    <input
                                                        type="text"
                                                        id="state"
                                                        className="form-control bgdis3  BuyerLogin2 Margintopcss"
                                                        value= {this.state.state}
                                                        disabled={this.state.isAcon} 
                                                        placeholder = "state"
                                                        name="state"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />
                                                    <input
                                                        type="number"
                                                        id="alternatemobno"
                                                        className="form-control bgdis3  BuyerLogin2 Margintopcss"
                                                        value= {this.state.alternatemobno}
                                                        disabled={this.state.isAcon} 
                                                        placeholder = "alternatemobno" 
                                                        name="alternatemobno"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 

                                                 </div>
                                                        }
                                              </Col>
                                              <Col sm={{size:"6"}}>
                                              <div class="Profilecontainer">

<div class="card Profilecard">
    <img className="profileimg" src="https://codepen-chriscoyier-bucket.imgix.net/1.png" alt="Avatar for user 1"/>
        
    </div>


</div>
                                              </Col>
                                            </Col>
                                            <Col sm = {{size: "6"}} className="aocbg2" >
                                                <div className="fw600 bdetailsheading">
                                                    Brand Details
                                                </div>
                                                {this.state.isBdetail ? <img
                                                                            src={logos.edit}
                                                                            className="poctick"
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
                                                
                                                <hr className="hrlinep3"></hr>
                                                <Col sm={{size:6}} className="cardtextfield">
                                                <div className="fw700 font14">
                                                    Name:
                                                </div>
                                                <div>
                                                <input
                                                        type="text"
                                                        id="pocname"
                                                        className="form-control bgdis3  BuyerLogin2 Margintopcss"
                                                        value= {this.state.pocname}
                                                        disabled={this.state.isBdetail} 
                                                        placeholder = "pocname"
                                                        name="pocname"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />
                                                
                                                </div>
                                                <div className="fw700 font14">
                                                    Mobile No.:
                                                </div>
                                                <div>
                                                <input
                                                        type="number"
                                                        id="pocmobile"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.pocmobile}
                                                        placeholder = "pocmobile"
                                                        disabled={this.state.isBdetail} 
                                                        name="pocmobile"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                                    
                                                </div>
                                                <div className="fw700 font14">
                                                    Email Id:
                                                </div>
                                                <div>
                                                <input
                                                        type="number"
                                                        id="pocmobile"
                                                        className="form-control bgdis3  BuyerLogin2"
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
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.pocdesc}
                                                        placeholder = "pocmobile"
                                                        disabled={this.state.isBdetail} 
                                                        name="pocdesc"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                                    
                                                </div>
                                                </Col>
                                                <Col sm={{size:6}}>
                                                <div class="Profilecontainer">

<div class="card Profilecard">
    <img className="profileimg" src="https://codepen-chriscoyier-bucket.imgix.net/8.png" alt="Avatar for user 1"/>
   
		<div class="edit"><a href="#"><i class="fa fa-pencil fa-lg"></i></a></div>

    </div>


</div>
                                                </Col>
                                            </Col>
                                         
                                        
                                        </Row>
                                       
</Container>
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
    debugger;
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(ArtistProfile);
export default connectedLoginPage;

