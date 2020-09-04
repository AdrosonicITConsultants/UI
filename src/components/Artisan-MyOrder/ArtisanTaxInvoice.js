
import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import "./Artisianmyorder.css";
import queryString from 'query-string';
import TTCEapi from '../../services/API/TTCEapi';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Moment from 'react-moment';
import { PreviewTaxInvoice } from './PreviewTaxInvoice';


export default class ArtisanTaxInvoice extends Component {
    constructor() {
        super();
       
        this.state = {
            dataload:false,
            previewTaxInvoice:false,
            fetchEnquiryAndPaymentDetails:[] ,
            quantity:0,
            rpu:0,
            pta:0,
            apr:0,
            deliverycharge:0,
            sgst:0,
            cgst:0,
            finalamt:0,
            amttobepaid:0,
            invoiceId:0,
            percentage:0,
            selectedFile:null,
            selectedFileName:"",
            upload:true,
            showValidationPi:false
          
        }
        this.handleChange = this.handleChange.bind(this);
        this.bp = this.bp.bind(this);
        this.onFileChange= this.onFileChange.bind(this);
    }
    onFileChange(e){
        this.setState({
            selectedFile:e.target.files[0]
            
        },()=>{
             this.setState({
        selectedFileName: this.state.selectedFile.name,
        upload:false
      })
           
        })
    }

    saveTaxInvDetails(){
        var regex = /[1-9]|\./
        if(regex.test(this.state.quantity) && regex.test( this.state.rpu) && regex.test(this.state.pta) && regex.test(this.state.apr)&&regex.test(this.state.apr)
        &&regex.test(this.state.deliverycharge)&&regex.test(this.state.sgst)&&regex.test(this.state.cgst)&&regex.test(this.state.finalamt)&&regex.test(this.state.amttobepaid)
        &&regex.test(this.state.deliverycharge)){
            if(document.getElementById('agree').checked){
                this.setState({
                    previewTaxInvoice:true
                })
            }
            else{
                customToast.error("Please agree to T&C", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                  });
            }}
            else{
                this.setState({
                    showValidationPi: true,
                   
                //   message : "Invalid PAN Number"
              });
              
              }
    }
    handleChange(e) {
        const { name, value } = e.target;
        console.log(value);
        this.setState({ [name]: value,showValidationMoq: false }, () => {
        //   console.log(this.state.moq);
        });
    }
    bp(){
        this.setState({
            previewTaxInvoice:false
        })
    }

  
   
componentDidMount(){
    TTCEapi.fetchEnquiryAndPaymentDetails(this.props.enquiryId).then((response)=>{
        if(response.data.data==null){
            this.setState({
                quantity:0,
                rpu:0,
                pta:0,
                apr:0,
                deliverycharge:0,
                sgst:0,
                cgst:0,
                finalamt:0,
                amttobepaid:0,
                invoiceId:0,
                percentage:0
            })
        }
        else {
            this.setState({
                quantity:response.data.data.pi.quantity,
                rpu:response.data.data.pi.ppu,
                pta:response.data.data.pi.totalAmount,
                apr:response.data.data.payment.paidAmount,
                deliverycharge:0,
                sgst:response.data.data.pi.sgst,
                cgst:response.data.data.pi.cgst,
                finalamt:response.data.data.pi.totalAmount,
                amttobepaid:response.data.data.pi.totalAmount-response.data.data.payment.paidAmount,
                invoiceId:response.data.data.payment.invoiceId,
                percentage:response.data.data.payment.percentage,
                dataload:true
          },()=>{
             
             console.log(this.state.fetchEnquiryAndPaymentDetails);
           
            });
        }
      
    })
}
    render() {
        return (
            <React.Fragment>
                {this.state.dataload?
                <>
                    {this.state.previewTaxInvoice?
                    <>
                    <PreviewTaxInvoice
                    bp={this.bp}
                   enquiryId ={this.props.enquiryId}
                   enquiryCode={this.props.enquiryCode}
                   quantity={this.state.quantity}
                    rpu={this.state.rpu}
                    pta={this.state.pta}
                    apr={this.state.apr}
                    deliverycharge={this.state.deliverycharge}
                    sgst={this.state.sgst}
                    cgst={this.state.cgst}
                    finalamt={this.state.finalamt}
                    amttobepaid={this.state.amttobepaid}
                    invoiceId={this.state.invoiceId}
                    percentage={this.state.percentage}
                    selectedFile={this.state.selectedFile}
                    selectedFileName={this.state.selectedFileName}
                    />
                    </>
                    :
                    <>
                     <Row noGutters={true} className=" BdImgCol">
                                                        <Col sm={6} >
                                                            <label>Quantity</label>
                                                            <br/>
                                                            <input 
                                                            className="PIinput"
                                                            type="number"
                                                            value={this.state.quantity }
                                                            name="quantity"
                                                            onChange={this.handleChange}
                                                            />
                                                        </Col>
                                                        <Col sm={6}>
                                                        <label >Rate per unit(or metre)</label>
                                                        <br/>
                                                       
                                                            <select name="cars" id="cars" 
                                                            className={this.state.isPidetail ? "rssymboldis":"rssymbol"}
                                                                >
                                                                <option value="volvo">₹</option>
                                                                <option value="saab">$</option>
                                                            </select>
                                                    {/* </span> */}
                                                        <input type="number"  className="PIinput rsinputboxwidth"
                                                       style={{width:"77%"}}
                                                        value={this.state.rpu }
                                                        name="rpu"
                                                        onChange={this.handleChange} />
                                                        </Col>
                                                    </Row>
                                                    <Row noGutters={true} className="PIcol2mt BdImgCol">
                                                    <Col sm={6}>
                                                    <label>Previous Total amount(as per PI)</label>
                                                    <br/>
                                                        <input className="PIinput" type="number"
                                                       
                                                        value={this.state.pta }
                                                        name="pta"
                                                        onChange={this.handleChange}/>

                                                    </Col>
                                                    <Col sm={6}>
                                                    <label>Advance payment received (Previously as per PI)</label>
                                                    <br/>
                                                        <input className="PIinput" type="number"
                                                       
                                                        value={this.state.apr }
                                                        name="apr"
                                                        onChange={this.handleChange}/>
                                                    </Col>
                                                    </Row>
                                                    <Row noGutters={true} className="PIcol2mt BdImgCol">
                                                    <Col sm={6}>
                                                    <label>Delivery charges(Freight Charges)</label>
                                                    <br/>
                                                        <input className="PIinput" type="number"
                                                       
                                                        value={this.state.deliverycharge }
                                                        name="deliverycharge"
                                                        onChange={this.handleChange}/>

                                                    </Col>
                                                    <Col sm={6}>
                                                    <label>Upload delivery Receipt (non-mandatory)</label>
                                                    <br/>
                                                    
                                                    <input type="file" id="file"  accept=".png, .jpg, .jpeg"
                                                     onChange={this.onFileChange}                                              
                                                     />
                                                     <label for="file" style={{background:"whitesmoke",borderRadius:"0px",color:"cornflowerblue"}} className="PIinput">
                                                     
                                                     {this.state.upload?
                                                     <b className="notetouploadrec">Please use general file formats</b>
                                                            :
                                                            this.state.selectedFileName
                                                     }
                                                     <img src={logos.uploadagain} className=" happyunhappyimg" style={{height:"15px",float:"right"}}/>
                                                    
                                                     </label>
                                                    </Col>
                                                    </Row>
                                                    <Row noGutters={true} className="PIcol2mt BdImgCol">
                                                    <Col sm={6}>
                                                    <label>SGST %</label>
                                                    <br/>
                                                        <input className="PIinput" type="number"
                                                       
                                                        value={this.state.sgst }
                                                        name="sgst"
                                                        onChange={this.handleChange}/>

                                                    </Col>
                                                    <Col sm={6}>
                                                    <label>CGST %</label>
                                                    <br/>
                                                        <input className="PIinput" type="number"
                                                       
                                                        value={this.state.cgst }
                                                        name="cgst"
                                                        onChange={this.handleChange}/>
                                                    </Col>
                                                    </Row>
                                                    <Row noGutters={true} className="PIcol2mt BdImgCol">
                                                    <Col sm={6}>
                                                    <label>Final Amount</label>
                                                    <br/>
                                                        <input className="PIinput" type="number"
                                                       
                                                        value={this.state.finalamt }
                                                        name="dod"
                                                        onChange={this.handleChange}/>

                                                    </Col>
                                                    <Col sm={6}>
                                                    <label>Amount to be paid (Final Amount - Advanced Payment)</label>
                                                    <br/>
                                                        <input className="PIinput" type="number"
                                                       
                                                        value={this.state.amttobepaid }
                                                        name="amttobepaid"
                                                        onChange={this.handleChange}/>
                                                    </Col>
                                                    </Row>
                                                    <Row noGutters={true} className="PIcol2mt BdImgCol">
                                                            <Col sm={12}>
                                                            <input type="checkbox" name="checkbox" value="check" id="agree"
                                                            
                                                            style={{marginRight:"5px"}} 
                                                            /> 
                                                                Agree to <a
                                                                    style={{ cursor: "pointer", fontSize: "15px" }}
                                                                    onClick={() => {
                                                                    alert("clicked");
                                                                    }}
                                                                >
                                                                    terms & condition
                                                                </a>

                                                            </Col>
                                                            </Row>
                                                            <p className="text-center">
                                                    {this.state.showValidationPi ? (
                                                <span className="bg-danger">Please fill mandatory fields</span>
                                                ) : (
                                                <br />
                                                )}
                                                </p>
                                                <Row noGutters={true}>
                                                <Col sm={12} className="text-center">
                                                    
                                                        <button className="previewandpi"
                                                         onClick={() => this.saveTaxInvDetails()}
                                                         >
                                                        <img src={logos.PIbtnicon} className="PIbuttonicon"></img>Preview & Raise Tax Invoice</button>
                                                </Col>
                                                
                         </Row>
                    </>}
                    
                         </>
            :""}
                </React.Fragment>
                )
                }



}



