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
            weftYarn: true,
            color: true,
            quantity: true,
            size: true,
            placement: true,
            piSend:0,
            artisanUser:true,
            inputWeft: "",
            inputColor: "",
            inputQuantity: "",
            inputSize: "",
            inputPlacement: "",
            showCREmptyMessage: false,
            showCRAllEmptyMessage: false,
            raiseCRArray: "",
            raiseCRFinalArray: [],
        };
      }

    ReqChangesModalClose = () => {
        document.getElementById('ReqChangesModal').style.display='none';

    }

    ReqChangesModalSHow = () => {
        // if((this.state.weftYarn === false && this.state.inputWeft !== "") && 
        // (this.state.color === true && this.state.inputColor === "")) {
        //     this.setState({
        //         showCREmptyMessage: false,
        //         showCRAllEmptyMessage: false,
        //     });
        //     document.getElementById('ReqChangesModal').style.display='block';
        // }
        // // else if(this.state.color === false && this.state.inputColor !== "") {
        // //     this.setState({
        // //         showCREmptyMessage: false,
        // //         showCRAllEmptyMessage: false,
        // //     });
        // //     document.getElementById('ReqChangesModal').style.display='block';
        // // }
        // // else if(this.state.quantity === false && this.state.inputQuantity !== "") {
        // //     this.setState({
        // //         showCREmptyMessage: false,
        // //         showCRAllEmptyMessage: false,
        // //     });
        // //     document.getElementById('ReqChangesModal').style.display='block';
        // // }
        // // else if(this.state.size === false && this.state.inputSize !== "") {
        // //     this.setState({
        // //         showCREmptyMessage: false,
        // //         showCRAllEmptyMessage: false,
        // //     });
        // //     document.getElementById('ReqChangesModal').style.display='block';
        // // }
        // // else if(this.state.placement === false && this.state.inputPlacement !== "") {
        // //     this.setState({
        // //         showCREmptyMessage: false,
        // //         showCRAllEmptyMessage: false,
        // //     });
        // //     document.getElementById('ReqChangesModal').style.display='block';
        // // }
        // else if(this.state.inputColor === "" && this.state.inputPlacement === "" && this.state.inputQuantity === "" &&
        // this.state.inputSize === "" && this.state.inputWeft === "" && this.state.weftYarn === true && 
        // this.state.color === true && this.state.quantity === true && this.state.size === true && this.state.placement === true) {
        //     this.setState({
        //         showCRAllEmptyMessage: true,
        //         showCREmptyMessage: false,
        //     });
        // }
        // else {
        //     this.setState({
        //         showCREmptyMessage: true,
        //         showCRAllEmptyMessage: false,
        //     });
        // }
        document.getElementById('ReqChangesModal').style.display='block';
    }

    areyousureCRModalShow = () => {
        document.getElementById('areyousureCRModal').style.display='block';
    }

    areyousureCRModalClose = () => {
        document.getElementById('areyousureCRModal').style.display='none';
    }

    changeRequstCheckBox = (e) => {
        var isChecked = e.target.checked;
        var checkBoxId = e.target.id;

        if(isChecked === true) {
            if(checkBoxId === "weftYarn") {
                this.setState({
                    weftYarn: false
                });
            }
            else if(checkBoxId === "color") {
                this.setState({
                    color: false
                })
            }
            else if(checkBoxId === "quantity") {
                this.setState({
                    quantity: false
                })
            }
            else if(checkBoxId === "size") {
                this.setState({
                    size: false
                })
            }
            else if(checkBoxId === "placement") {
                this.setState({
                    placement: false
                })
            }
        }
        else if(isChecked === false) {
            if(checkBoxId === "weftYarn") {
                this.setState({
                    weftYarn: true
                });
            }
            else if(checkBoxId === "color") {
                this.setState({
                    color: true
                })
            }
            else if(checkBoxId === "quantity") {
                this.setState({
                    quantity: true
                })
            }
            else if(checkBoxId === "size") {
                this.setState({
                    size: true
                })
            }
            else if(checkBoxId === "placement") {
                this.setState({
                    placement: true
                })
            }
        }
    }

    handleInputChange = (e) => {
        this.setState({
            raiseCRArray: {
                requestItemsId: e.target.id,
                requestText: e.target.value,
            }
        });
        this.state.raiseCRFinalArray.push(this.state.raiseCRArray);
        console.log(this.state.raiseCRFinalArray);
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
              <input type="checkbox" className="colorchange2" onChange={(e) => this.changeRequstCheckBox(e)} id="weftYarn"/> 
              <b>change in weft yarn</b>  
            </Col>
            <Col className="col-xs-9">
              <input type="text" className="CRinput" disabled={this.state.weftYarn} onChange={this.handleInputChange} id="1"/>
            </Col>
        </span>  
    </Row>

    <Row noGutters={true} style={{marginTop:"10px"}}>
    <span>
            <Col className="col-xs-3">
            <input type="checkbox" className="colorchange2" onChange={(e) => this.changeRequstCheckBox(e)} id="color"/> 
             <b>change in color</b>  
            </Col>
            <Col className="col-xs-9">
            <input type="text" className="CRinput" disabled={this.state.color} onChange={this.handleInputChange} id="2"/>
            </Col>

                </span>
                </Row>

     <Row noGutters={true} style={{marginTop:"10px"}}>
    <span>
            <Col className="col-xs-3">
            <input type="checkbox" className="colorchange2" onChange={(e) => this.changeRequstCheckBox(e)} id="quantity"/> 
               <b>change in quantity</b>  
            </Col>
            <Col className="col-xs-9">
            <input type="text" className="CRinput" disabled={this.state.quantity} onChange={this.handleInputChange} id="3"/>
            </Col>

     </span>
     </Row>
     <Row noGutters={true} style={{marginTop:"10px"}}>
    <span>
            <Col className="col-xs-3">
            <input type="checkbox" className="colorchange2" onChange={(e) => this.changeRequstCheckBox(e)} id="size"/> 
               <b>change in motif size</b>  
            </Col>
            <Col className="col-xs-9">
            <input type="text" className="CRinput" disabled={this.state.size} onChange={this.handleInputChange} id="4"/>
            </Col>

     </span>
         </Row>
         <Row noGutters={true} style={{marginTop:"10px"}}>
    <span>
            <Col className="col-xs-3">
            <input type="checkbox" className="colorchange2" onChange={(e) => this.changeRequstCheckBox(e)} id="placement"/> 
                <b>change in motif</b> <br/>
                <b style={{marginLeft:"30px"}}>  placement</b>  
            </Col>
            <Col className="col-xs-9">
            <input type="text" className="CRinput" disabled={this.state.placement} onChange={this.handleInputChange} id="5"/>
            </Col>

                </span>
                </Row>
                <br/>
                
                {this.state.showCREmptyMessage === true ?
                <Row noGutters={true}>
                    <Col sm={12} className="text-center showCREmptyMessage">
                        Please fill the selected input fields
                    </Col>
                </Row>
                : null }
                {this.state.showCRAllEmptyMessage === true ?
                <Row noGutters={true}>
                    <Col sm={12} className="text-center showCREmptyMessage">
                        Please fill in the required input fields
                    </Col>
                </Row>
                : null }

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