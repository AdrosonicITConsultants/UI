import React, { Component } from 'react'
import ReactDOM from "react-dom";
import ReactToPdf from "react-to-pdf";
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import "./Buyermyorder.css";
import queryString from 'query-string';
import TTCEapi from '../../services/API/TTCEapi';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import moment from 'moment';
import Footer from '../footer/footer';



export class ChangeRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weftYarn:true,
            color:true,
            quantity:true,
            size:true,
            placement:true,
            piSend:0,
            artisanUser:true,
    

        };
      }

     
      ChangeColor1(){
        this.setState({
            weftYarn:false,
        })
    }
    ChangeColor2(){
        this.setState({
            color:false,
        })
    }
    ChangeColor3(){
        this.setState({
            quantity:false,
        })
    }
    ChangeColor4(){
        this.setState({
            size:false,
        })
    }
    ChangeColor5(){
        this.setState({
           placement:false
        })
    }

    ReqChangesModalClose = () => {
        document.getElementById('ReqChangesModal').style.display='none';

    }
    ReqChangesModalSHow = () => {
        document.getElementById('ReqChangesModal').style.display='block';

    }
    areyousureCRModalShow = () => {
        document.getElementById('areyousureCRModal').style.display='block';
    }

    areyousureCRModalClose = () => {
        document.getElementById('areyousureCRModal').style.display='none';
    }
      render(){
        return(
            
<React.Fragment>
    <Row noGutters={true}>
            <Col className="col-xs-12 bold" style={{textAlign:"center"}}>
                <b>Please Note:</b> <br/>
                <p>Change request may be accepted or rejected subjective to the feasibility of the change by artisan.If accepted,
                    <br/>there may be a change in final amount and hence the pro forma invoice.
                </p>
                <p style={{color:"orangered"}}>You can only submit this change request once.Be sure about the change requested before submitting.</p>
            </Col>
    </Row>

    <Row noGutters={true}>
    <span>
            <Col className="col-xs-3">
            <input type="button" 
                 className={(this.state.weftYarn 
                                                     ? "colorchange2"
                                                         : "colorchange")
                                                     }  /> 
                                                  <b>change in weft yarn</b>  
            </Col>
            <Col className="col-xs-9">
            <input type="text" id="#weftYarn" className="CRinput"  onClick={()=>this.ChangeColor1()}/>

            </Col>

                </span>
                
    </Row>

    <Row noGutters={true} style={{marginTop:"10px"}}>
    <span>
            <Col className="col-xs-3">
            <input type="button" 
                 className={(this.state.color 
                                                     ? "colorchange2"
                                                         : "colorchange")
                                                     }  /> 
                                                  <b>change in color</b>  
            </Col>
            <Col className="col-xs-9">
            <input type="text" id="#weftYarn" className="CRinput"  onClick={()=>this.ChangeColor2()}/>
            </Col>

                </span>
                </Row>

     <Row noGutters={true} style={{marginTop:"10px"}}>
    <span>
            <Col className="col-xs-3">
            <input type="button" 
                 className={(this.state.quantity 
                                                     ? "colorchange2"
                                                         : "colorchange")
                                                     }  /> 
                                                  <b>change in quantity</b>  
            </Col>
            <Col className="col-xs-9">
            <input type="text" id="" className="CRinput"  onClick={()=>this.ChangeColor3()}/>
            </Col>

     </span>
     </Row>
     <Row noGutters={true} style={{marginTop:"10px"}}>
    <span>
            <Col className="col-xs-3">
            <input type="button" 
                 className={(this.state.size 
                                                     ? "colorchange2"
                                                         : "colorchange")
                                                     }  /> 
                                                  <b>change in motif size</b>  
            </Col>
            <Col className="col-xs-9">
            <input type="text" id="" className="CRinput"  onClick={()=>this.ChangeColor4()}/>
            </Col>

     </span>
         </Row>
         <Row noGutters={true} style={{marginTop:"10px"}}>
    <span>
            <Col className="col-xs-3">
            <input type="button" 
                 className={(this.state.placement 
                                                     ? "colorchange2"
                                                         : "colorchange")
                                                     }  /> 
                                                  <b>change in motif</b> <br/>
                                                    <b style={{marginLeft:"30px"}}>  placement</b>  
            </Col>
            <Col className="col-xs-9">
            <input type="text" id="" className="CRinput"  onClick={()=>this.ChangeColor5()}/>
            </Col>

                </span>
                </Row>
                <br/>
                <Row noGutters={true}>
                    <Col className="col-xs-12"style={{textAlign:"center"}}>
                <button className="proccedwithadvpaybtn" onClick={this.ReqChangesModalSHow}
                    >Request change  <i class="fa fa-long-arrow-right" style={{marginLeft:"15px"}} aria-hidden="true"></i>
                </button>
                </Col>
                </Row>
               
                {/* <button >abcd</button> */}
            
    {/* _________________________________________Modal_1________________________________________________ */}
                                          
    <div id="ReqChangesModal" class="w3-modal">
                                                            <div class="w3-modal-content w3-animate-top modalBoxSize modalBoxTop">
                                                                <div class="w3-container buyerMOQAcceptModalContainer">
                                                                <Row noGutters={true} className="buyerMOQAcceptModalOuter uploadingreceiptheading ">
                                                                    <Col className="col-xs-12 ">
                                                                       <h1 className="areyousurecrh1 fontplay">Are you sure ?</h1> 
                                                                        <br/>
                                                                       <b className="CRare ">You are requesting changes for</b> 
                                                                       
                                                                    </Col>
                                                                </Row>
                                                                <Row noGutters={true} className="buyerMOQAcceptModalOuter uploadingreceiptheading ">
                                                                    <Col className="col-xs-12 ">
                                                                    <div className="crbox">
                                                                            <p className="Crh">Weft Yarn</p>
                                                                            <p className="changereqcolor">Blue</p>
                                                                        </div>
                                                                        <div className="crbox">
                                                                            <p className="Crh">color</p>
                                                                            <p className="changereqcolor">Blue</p>
                                                                        </div>
                                                                        <div className="crbox">
                                                                            <p className="Crh">Quantity</p>
                                                                            <p className="changereqcolor">
                                                                            <span><b style={{color:"darkgrey"}}>20 --------------</b><b>26</b></span>
                                                                            </p>
                                                                        </div>
                                                                        <div className="crbox">
                                                                            <p className="Crh">Motif Size</p>
                                                                            <p className="changereqcolor">Blue</p>
                                                                        </div>
                                                                        <div className="crbox">
                                                                            <p className="Crh">Motif placement</p>
                                                                            <p className="changereqcolor">Blue</p>
                                                                        </div>
                                                                        
                                                                        </Col>
                                                                        </Row>
                                                                
                                                                <Row noGutters={true}>
                                                                <Col className="col-xs-12" style={{textAlign:"center"}}>
                                                                    <p className="crmnote">This change request may or may not be accepted.
                                                                    <br/>You can raise change request if rejected by first discussing 
                                                                    <br/>with artisan in advance to avoid any rejection.</p>
                                                                    
                                                                        <div className="buyerMOQAcceptModalButtonOuter">
                                                                    <span onClick={this.ReqChangesModalClose} className="buyerMOQAcceptModalCancelButton">Cancel</span>
                                                                    <span >
                                                                        <button
                                                                         onClick={this.ReqChangesModalClose}
                                                                       className="buyerMOQAcceptModalOkayButton">Ok</button></span>
                                                                </div>
                                                                  
                                                                </Col>
                                                                </Row>
                                                                                                                                 
                                                                
                                                            </div>
                                                            </div>
                                                </div>



    
<br/>
</React.Fragment>
        )
    }
    
}
function mapStateToProps(state) {
    // debugger;
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(ChangeRequest);
export default connectedLoginPage;