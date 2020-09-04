
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
            getOldPIData:[],
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
            orderDispatchDate:"",
            eta:"",
            selectedFile:null,
            selectedFileName:"",
            upload:true,
            showValidationPi:false,
            showDeliveryValidation:false,
            deliveryChallanUploaded:false,
            taxInvoiceGenerated:false,
          
        }
        this.handleChange = this.handleChange.bind(this);
        this.bp = this.bp.bind(this);
        this.onFileChange= this.onFileChange.bind(this);
        this.uploadReceiptandSend=this.uploadReceiptandSend.bind(this)

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
        if(regex.test(this.state.quantity) 
        && regex.test( this.state.rpu) && regex.test(this.state.pta) && regex.test(this.state.apr)&&regex.test(this.state.apr)
        &&regex.test(this.state.deliverycharge)&&regex.test(this.state.sgst)&&regex.test(this.state.cgst)&&regex.test(this.state.finalamt)&&regex.test(this.state.amttobepaid)
        &&regex.test(this.state.deliverycharge)
        ){
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
        this.setState({ [name]: value,showValidationMoq: false ,showDeliveryValidation:false}, () => {
       
        });
    }
    bp(){
        this.setState({
            previewTaxInvoice:false
        })
    }

    uploadReceiptandSend(enquiryId){
        if(this.state.orderDispatchDate && this.state.selectedFile){
            console.log(this.state.orderDispatchDate);
            console.log(this.state.eta)
    
            this.setState({
                rejectButtonClick:true
              })
                const formData = new FormData(); 
            formData.append( 
              "myFile", 
              this.state.selectedFile, 
            //   this.state.selectedFile.name 
            );
           
            console.log(this.state.selectedFile); 
            TTCEapi.submitDeliveryChallan(
                    enquiryId,
                this.state.selectedFile,
                this.state.orderDispatchDate,
                this.state.eta
                ).then((response)=>{
                
                if(response.data.valid){ 
                    document.getElementById('deliveryReceipt').style.display='none';
    
                    customToast.success("Delivery Challan uploaded", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
                      this.componentDidMount();
                     
                        }
          else{
            document.getElementById('deliveryReceipt').style.display='none';
            this.setState({
                uploadButtonClick:false
          });
          customToast.error(response.data.errorMessage, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true,
          });
          
          }
            })
        }
       else{
        this.setState({
            // rejectButtonClick:true,
            showDeliveryValidation: true,
          })
       }
      
    }
  
    uploddeliveryreceiptModalclose = () => {
        document.getElementById('deliveryReceipt').style.display='none';
        
    }

    uploddeliveryreceiptModalShow(){
    
        document.getElementById('deliveryReceipt').style.display='block';
        
    }
componentDidMount(){
    TTCEapi.getOldPIData(this.props.enquiryId).then((response)=>{
        if(response.data.valid)
        {
            this.setState({getOldPIData:response.data.data,
             
                })
        }
        console.log(this.state.getOldPIData)
    })
    TTCEapi.fetchEnquiryAndPaymentDetails(this.props.enquiryId).then((response)=>{
        if(response.data.valid){
            this.setState({
               
                quantity:response.data.data.pi.quantity,
                rpu:response.data.data.pi.ppu,
                pta:response.data.data.pi.totalAmount,
                apr:response.data.data.payment?response.data.data.payment.paidAmount:0,
                sgst:response.data.data.pi.sgst,
                cgst:response.data.data.pi.cgst,
                finalamt:response.data.data.pi.totalAmount,
                amttobepaid:response.data.data.pi.totalAmount-(response.data.data.payment?response.data.data.payment.paidAmount:0),
                invoiceId:response.data.data.payment?response.data.data.payment.invoiceId:0,
                percentage:response.data.data.payment?response.data.data.payment.percentage:0,
                deliveryChallanUploaded:response.data.data.deliveryChallanUploaded,
                taxInvoiceGenerated:response.data.data.taxInvoiceGenerated,
                orderDispatchDate:"",
                eta:"",
                dataload:true
            })
        }
        else {
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
                percentage:0,
                deliveryChallanUploaded:false,
                taxInvoiceGenerated:false,
                orderDispatchDate:"",
                eta:"",
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

                {this.props.BuyerPreviewInvoice?
                <>
                    {this.state.taxInvoiceGenerated?
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
                    taxInvoiceGenerated={this.state.taxInvoiceGenerated}
                    />
                :
                <Row noGutters={true}>
                <Col className="col-xs-12 bold font20 text-center">
                <br></br>
                 Tax Invoice Not Available.
                  <br></br>
                  </Col>
                   </Row>
               }
                </>
                :
                <>
                
                {this.state.getOldPIData.length==0?
                <>
                {console.log("Please raise the Final PI")}
                <Row noGutters={true}>
                <Col className="col-xs-12 bold font20 text-center">
                <br></br>
                 Final PI is not raised yet.
                  <br></br>
                  </Col>
                   </Row>
                </>
                :
                <>
                {console.log("old data present")}
                {this.state.dataload?
                <>
                {this.state.taxInvoiceGenerated?
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
                taxInvoiceGenerated={this.state.taxInvoiceGenerated}
                />
                </>
            :
           
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
taxInvoiceGenerated={this.state.taxInvoiceGenerated}
/>
</>
:
<>
 <Row noGutters={true} className=" BdImgCol">
     {/* <button onClick={()=>this.uploddeliveryreceiptModalShow()}>abcd</button> */}
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
                                {this.state.deliveryChallanUploaded?
                                <Col sm={6}>
                                <label>Upload delivery Receipt (non-mandatory)</label>
                                <br/>
                                    <div className="PIinput notetouploadrec" style={{color:"cornflowerblue"}}>
                                       Delivery Receipt is uploaded
                                   </div>
                                </Col>
                                :
                                <Col sm={6}>
                                <label>Upload delivery Receipt (non-mandatory)</label>
                                <br/>
                                    <div className="PIinput notetouploadrec" onClick={()=>this.uploddeliveryreceiptModalShow()}>
                                       Please use general file formats 
                                   <img src={logos.uploadagain} style={{float:"right"}}
                                   /></div>
                                </Col>
                                }
                                
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
                                    name="finalamt"
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
{/* _________________________________________Upload Delivery receipt_________________________________________________ */}
                      
<div id="deliveryReceipt"class="w3-modal" style={{paddingTop:"70px"}}>
                                        <div class="w3-modal-content w3-animate-top modalBoxSize">
                                            <div class="w3-container buyerMOQAcceptModalContainer">
                                            <Row noGutters={true} className="buyerMOQAcceptModalOuter">
                                                <Col className="col-xs-12">
                                                    <div className="buyerMOQAcceptModalHeader playfair">Upload your <br/>delivery receipt</div>
                                                    {this.state.upload?
                                                    <>
                                                    <input type="file" id="file"  accept=".png, .jpg, .jpeg"
                                                    onChange={this.onFileChange}
                                                    style={{background:"white"}}
                                                        />
                                                        <label for="file" className="buyerMOQAcceptModalEnquiryDiv"  style={{background:"white"}}>
                                                        <img src={logos.Iconfeatherupload} className=" happyunhappyimg" />
                                                        <p className="uploadrec">Upload Receipt</p>
                                                        </label>
                                                     </>  
                                                      :
                                                      <Row noGutters={true} className="margintoprow aligncenter">
                                                      <Col className="col-xs-12 " style={{textAlign:"center"}}>
                                                      <img src={logos.Iconfeatherupload} className=" happyunhappyimg" /><br/>
                                                             <b className="uploadreceiptname">{this.state.selectedFileName}</b>
                                                              <br/>
                                                              <div>
                                                               </div>
                                                              
                                                          </Col>
                                                          
                                                      </Row>
                                                }
                                                   <Row noGutters={true}>
                                                       <Col className="col-xs-6">
                                                       <label>Date of dispatch</label>
                                                        <br/>
                                                            <input className="PIinput" type="date"
                                                        
                                                            // value={this.state.orderDispatchDate }
                                                            name="orderDispatchDate"
                                                            onChange={this.handleChange}/>
                                                                        </Col>
                                                   <Col className="col-xs-6">
                                                   <label>Revised ETA (if required)</label>
                                                        <br/>
                                                            <input className="PIinput" type="date"
                                                        
                                                            // value={this.state.eta }
                                                            name="eta"
                                                            onChange={this.handleChange}/>
                                                   </Col>
                                                   </Row>
                                                    <div className="buyerMOQAcceptModalEnquiryDiv" style={{marginBottom:"10px"}}>
                                                        <span className="buyerMOQAcceptModalEnquiry">Enquiry Id:</span>
                                                        <span className="buyerMOQAcceptModalEnquiryId" style={{color:"#337ab7"}}> 
                                                             {/* {this.props.enquiryId} */}
                                                                {this.props.enquiryCode}</span>
                                                    </div>
                                                    

                                                    <div className="approvenote">
                                                        Make sure you send the correct enquiry receipt. <br/>
                                                      Also make sure the attached document is <b>clear</b> and <b>readable</b>  <br/> 
                                                      with the <b>LR</b> number and  <b>amount.</b> 
                                                      <p style={{textAlign:"center"}}> {this.state.showDeliveryValidation ? (
                            <span className="bg-danger">Please fill mandatory fields</span>
                            ) : (
                            <br />
                            )}</p>
                                                     
                                                    </div>
                                                </Col>
                                            </Row>
                                            <hr className="buyerMOQAcceptModalHr"/>
                                            <div className="buyerMOQAcceptModalButtonOuter">
                                                <span  
                                                 onClick={()=>this.uploddeliveryreceiptModalclose()}
                                                className="buyerMOQAcceptModalCancelButton">Cancel</span>
                                             
                                                <span >
                                                    <button
                                                    disabled={this.state.rejectButtonClick}
                                                    onClick={() => this.uploadReceiptandSend(this.props.enquiryId)}
                                                    className="senddelButton"><i class="fa fa-paper-plane" aria-hidden="true"style={{marginRight:"5px"}}></i>
                                               Send</button></span>
                                            </div>
                                            </div>
                                            
                                        </div>
                                        </div>


{/* ___________________________________________________________________________________________________ */}

     </>

           
            }
                </>
                :
                <>
                <Row noGutters={true}>
                <Col className="col-xs-12 bold font20 text-center">
                <br></br>
                 Loading Data..
                  <br></br>
                  </Col>
                   </Row>
                </>
                }
                </>
                }
                </>
                }



                 
           
                </React.Fragment>
                )
                }



}



