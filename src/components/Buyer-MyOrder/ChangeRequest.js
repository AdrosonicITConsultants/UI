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
            piSend:0,
            artisanUser:true,
            showCREmptyMessage: false,
            showCRAllEmptyMessage: false,
            raiseCRArray: "",
            raiseCRFinalArray: [],
            getChangeRequestItemTable: [],
            optionDisable: [
                {   
                    id: 1,
                    option: true,
                },
                {
                    id: 2,
                    option: true,
                },
                {
                    id: 3,
                    option: true,
                },
                {
                    id: 4,
                    option: true,
                },
                {
                    id: 5,
                    option: true,
                }
            ],
            CROkbutton: false,
        };
        this.changeRequstCheckBox = this.changeRequstCheckBox.bind(this);
      }

    ReqChangesModalClose = () => {
        document.getElementById('ReqChangesModal').style.display='none';

    }

    ReqChangesModalSHow = () => {
        console.log(this.state.optionDisable);
        var array = this.state.optionDisable;
        for(var i = 0; i < array.length; i ++) {
            if(array[i].option === false) {
                var id = array[i].id;
                var data = document.getElementById("option"+array[i].id).value;
                var object = {
                    requestItemsId: id,
                    requestText: data,
                }
                console.log(object);
                this.state.raiseCRFinalArray.push(object);
            }
        } 
        console.log(this.state.raiseCRFinalArray);
        document.getElementById('ReqChangesModal').style.display='block';
    }

    areyousureCRModalShow = () => {
        document.getElementById('areyousureCRModal').style.display='block';
    }

    areyousureCRModalClose = () => {
        document.getElementById('areyousureCRModal').style.display='none';
    }

    changeRequstCheckBox(e){
        var isChecked = e.target.checked;
        var checkBoxId = e.target.id;

        if(isChecked === true) {
            const typeElements = this.state;
            const updatedHeaders = [...typeElements.optionDisable];
            updatedHeaders[parseInt(checkBoxId)-1] = {
                id: parseInt(checkBoxId),
                option: false
            };
            var that = this;
            that.setState({
                optionDisable: updatedHeaders
            });
            
        }
        else if(isChecked === false) {
            const typeElements = this.state;
            const updatedHeaders = [...typeElements.optionDisable];
            updatedHeaders[parseInt(checkBoxId)-1] = {
                id: parseInt(checkBoxId),
                option: true
            };
            var that = this;
            that.setState({
                optionDisable: updatedHeaders
            });           
        }
    }

    handleInputChange = (e, id) => {
        this.setState({
            raiseCRArray: {
                requestItemsId: id,
                requestText: e.target.value,
            }
        });
    }

    sendCRDataFunction = () => {

        this.setState({
            CROkbutton: true
        })

        TTCEapi.buyerRaiseChangeRequest(parseInt(this.props.enquiryCode), this.state.raiseCRFinalArray).then((response)=>{
            if(response.data.valid)
            {
                console.log(response.data.data);
                document.getElementById('ReqChangesModal').style.display='none';
            }
        });
    }

    componentDidMount() {
        TTCEapi.getChangeRequestItemTable().then((response)=>{
            if(response.data.valid)
            {
                console.log(response.data.data);
                this.setState({
                    getChangeRequestItemTable: response.data.data
                })
            }
        })
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

    {this.state.getChangeRequestItemTable ? this.state.getChangeRequestItemTable.map((data) => {
        return <Row noGutters={true}>
        <span>
            <Col className="col-xs-3">
              <input type="checkbox" className="colorchange2" onChange={(e) => this.changeRequstCheckBox(e)} id={data.id}/> 
              <b>{data.item}</b>  
            </Col>
            <Col className="col-xs-9">
              <input type="text" className="CRinput" disabled={this.state.optionDisable[data.id-1].option} onChange={(e) => this.handleInputChange(e, data.id)} id={"option" + data.id}/>
            </Col>
        </span>  
        </Row>
    })
    : null }

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
            {this.state.raiseCRFinalArray ? this.state.raiseCRFinalArray.map((arrayData) => {
                return this.state.getChangeRequestItemTable ? this.state.getChangeRequestItemTable.map((data) => {
                    if(arrayData.requestItemsId === data.id) {
                        return <div className="crbox">
                            <p className="Crh">{data.item}</p>
                            <p className="changereqcolor">{arrayData.requestText}</p>
                        </div>
                    }
            }) : null
        }) : null }
            
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
                onClick={this.sendCRDataFunction}
                className="buyerMOQAcceptModalOkayButton" disabled={this.state.CROkbutton}>Ok</button></span>
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
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(ChangeRequest);
export default connectedLoginPage;