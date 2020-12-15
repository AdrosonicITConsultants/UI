import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import {Row, Col , Container, Button,InputGroup, InputGroupText, InputGroupAddon, Input} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import TTCEapi from '../../services/API/TTCEapi';
import Footer from "../footer/footer";
import Moment from 'react-moment';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export class BuyerCompletedTransaction extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            getTransactionStatus:[],
            getTransactionActions:[],
            getOngoingTransaction:[],
            getAdvancedPaymentReceipt:[],
            getPaymentDetailsForFinalPayment:[],
            getTransactions:[],
            dataload : false,
            filter: null,
            enquiryCode:this.props.enquiryCode,
            pid:0,
            invoiceid:0,
            totalAmount:0,
            paidAmount:0,
            showValidationFinal:false,
            selectedFile:null,
            selectedFileName:"",
            upload:true,

        }
        this.gotoEnquiry = this.gotoEnquiry.bind(this);
        this.uploadagain = this.uploadagain.bind(this);
        this.backoperation = this.backoperation.bind(this);
        this.onFileChange= this.onFileChange.bind(this);
        this.uploadReceiptandSend= this.uploadReceiptandSend.bind(this);

       
    }    
    uplodFinalreceiptModalShow(enquiryId){
        this.setState({
            selectedFileName:""
        })
            TTCEapi.getPaymentDetailsForFinalPayment(enquiryId).then((response)=>{
                if(response.data.valid)
                {
                this.setState({
                    showValidationFinal:false,
                     getPaymentDetailsForFinalPayment : response.data.data,
                     pid:response.data.data.pid,
                      invoiceid:response.data.data.invoiceId,
                      totalAmount:response.data.data.totalAmount,
                      paidAmount:response.data.data.payableAmount,
                      dataload : true,
                    },()=>{
               
                });
            }
            });
    
            document.getElementById('FinalPayment').style.display='block';
             
      
        
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
    uploadReceiptandSend(enquiryId){
      
        if(this.state.selectedFileName){
          this.setState({
              rejectButtonClick:true
            })
                 
          const formData = new FormData(); 
          formData.append( 
            "myFile", 
            this.state.selectedFile, 
            this.state.selectedFile.name 
          );
         
          TTCEapi.FinalPayment(
              this.state.selectedFile,
              enquiryId,
              this.state.pid,
              this.state.invoiceid,
              this.state.paidAmount,
              this.state.totalAmount
              ).then((response)=>{
              
              if(response.data.valid){ 
                  document.getElementById('FinalPayment').style.display='none';
                  customToast.success("Final Payment Receipt uploaded uploaded", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                  });
                  this.setState({  
                 success:true,
                 rejectButtonClick:false
                
              },()=>{
           
              });
            
        }
        else{
          document.getElementById('FinalPayment').style.display='none';
  
          this.setState({
              rejectButtonClick:false
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
              showValidationFinal:true,
              rejectButtonClick:false
          })
      
        }
      
  }
  uplodFinalreceiptModalClose(){
    this.setState({
        selectedFileName:""
    })
    document.getElementById('FinalPayment').style.display='none';

}
    updateSearch = (inputValue) => {
        let filter = this.state.filter;
  
        this.setState({
            filter: inputValue
        });
      }
  
      handleSearchChange = (event) => {
          this.updateSearch(event.target.value);
      }
  
      filter = (item) => {
        if (!this.state.filter) {
          return item;
        }
          return item.filter((item) => 
          (item.orderCode !== "" && item.orderCode !== null && item.orderCode.toLowerCase().indexOf(this.state.filter.toLowerCase()) >= 0) ||
          (item.enquiryCode !== "" && item.enquiryCode !== null && item.enquiryCode.toLowerCase().indexOf(this.state.filter.toLowerCase()) >= 0)                   
       
      )
    
      }    
    backoperation(){
        browserHistory.push("/home"); 
    }
  
    openReceipt(enquiryId){
        setTimeout(function() { //Start the timer
            this.setState({render: true}) //After 1 second, set render to true
        }.bind(this), 1000)
        TTCEapi.getAdvancedPaymentReceipt(enquiryId).then((response)=>{

            if(response.data.valid)
        {
            this.setState({getAdvancedPaymentReceipt : response.data.data,
                receiptId:response.data.data.paymentId,
                receiptlabel:response.data.data.label
              
            },()=>{
                
            window.open(TTCEapi.ReceiptUrl +this.state.getAdvancedPaymentReceipt.paymentId+"/"+this.state.getAdvancedPaymentReceipt.label, "_blank")   
        });
        }
        });

    }
    gotoEnquiry(enquiryId){
        localStorage.setItem("piShow", 1);
        browserHistory.push("/buyerEnquiryDetails?code="+enquiryId)
    }
    
    uploadagain(enquiryId){
        browserHistory.push("/payadvance?code="+enquiryId)
    }
    componentDidMount(){
   
        TTCEapi.getTransactionStatus().then((response)=>{
            if(response.data.valid)
            {
         this.setState({
                getTransactionStatus : response.data.data,
               },()=>{
                TTCEapi.getTransactions(this.state.enquiryCode).then((response)=>{
                    if(response.data.valid)
                    {
                    this.setState({
                         dataload : true,
                         getTransactions : response.data.data.completedTransactionResponses},()=>{
                        
                    });
                }
                });

                TTCEapi.getTransactionActions().then((response)=>{
                    if(response.data.valid)
                    {
                    this.setState({
                         dataload : true,
                         getTransactionActions : response.data.data},()=>{
                         TTCEapi.getTransactions(this.state.enquiryCode).then((response)=>{
                            if(response.data.valid)
                            {
                            this.setState({
                                 dataload : true,
                                 getTransactions : response.data.data.completedTransactionResponses},()=>{
                                 
                            });
                        }
                        });
                    });
                }
                });

                TTCEapi.getTransactions(this.state.enquiryCode).then((response)=>{
                    if(response.data.valid)
                    {
                    this.setState({
                         dataload : true,
                         getTransactions : response.data.data.completedTransactionResponses},()=>{
                        
                    });
                }
                });
          
         });
        }
     });

    
  
     }
  

    render() {
        return (
            <React.Fragment>
                    {this.state.dataload ?
                        this.state.getTransactions.length == 0?
                       
                        <Row>
                        <br></br>
                        <br></br>
                        <br></br>   
                        <Col className="col-xs-12 text-center font14">
                        No Transactions
                        </Col>
                    </Row>
                        :
                <>
                
                 <Row noGutters={true}>
                     <Col md="1"></Col>
                     <Col md="3">
<img src={logos.recent} style={{marginRight:"5px" , height:"17px"}}/> Recent Transactions
                     </Col>
                 </Row>
                <hr className="enquiryoptionhr" style={{width:"100%"}}></hr>
                {this.state.getTransactions.map((item)=> 
                    <>
<Row noGutters={true}>
<Col className="col-xs-3" sm="1"></Col>
<Col className="col-xs-3 DateandTime" sm="1">
<Moment format="DD-MM-YYYY">
{item.transactionCompleted.transactionOn}
</Moment>
<Moment format=" h:mm A">
<p style={{color:"darkgray"}}>{item.transactionCompleted.transactionOn}</p>
 </Moment>

</Col>
<Col className="col-xs-3" sm="1">
<img src={TTCEapi.IconsUrl+this.state.getTransactionStatus[item.transactionCompleted.accomplishedStatus-1].id+".svg"} className="iconsize"/>

</Col>
<Col className="col-xs-3 paymentreceiptup" sm="2">
{/* Advance Payment Receipt uploaded */}
<div dangerouslySetInnerHTML={{ __html: this.state.getTransactionStatus[item.transactionCompleted.accomplishedStatus-1].buyerText} } />


</Col>
<Col className="col-xs-3 proformacol" sm="2">
{item.transactionCompleted.percentage}{item.transactionCompleted.percentage !=null? "%":""} 
 payment received against Invoice for  {item.orderCode !=null?" order Id:":" enquiry Id:"} <b className="colorinv">
    {item.orderCode !=null ?item.orderCode : item.enquiryCode !=null?item.enquiryCode:"NA"}</b>
<br/>
</Col>
<Col className="col-xs-3 payack" sm="2">
<div dangerouslySetInnerHTML={{ __html: this.state.getTransactionStatus[item.transactionCompleted.upcomingStatus-1].buyerText} } />
</Col>
<Col className="col-xs-3 boldrs" sm="1">
₹ {item.totalAmount !=null?item.totalAmount:item.paidAmount != null?item.paidAmount:item.eta !=null ? item.eta:"NA"}
</Col>
<Col className="col-xs-3 viewreceipt" sm="1">
    {this.state.getTransactionStatus[item.transactionCompleted.upcomingStatus-1].viewType=="invoice"?
    <span>
        <img src={logos.viewReceipt} className="receipticon" onClick={() => this.gotoEnquiry(item.transactionCompleted.enquiryId)}/>
         <p style={{marginTop:"5px"}}>View Invoice</p>
         </span>
:
<span><img src={logos.viewrec} className="receipticon"
 onClick={() => this.openReceipt(item.transactionCompleted.enquiryId)}/>
  <p style={{marginTop:"5px"}} >View Receipt</p></span>


}
</Col>
<Col className="col-xs-3 uplodagaintext" sm="1">

{this.state.getTransactionActions.map((data)=> 
<>


{
    item.transactionCompleted.isActionCompleted == 0 ?
    this.state.getTransactionStatus[item.transactionCompleted.upcomingStatus-1].buyerAction == data.id ? 
     data.id == 2 ?
     this.state.getTransactionStatus[item.transactionCompleted.upcomingStatus-1].transactionId==17?
     <>
      
     </>
  :
  <>
  
  </> 
 
    :
    data.id == 1 ?
    
    <>
    { this.state.getTransactionStatus[item.transactionCompleted.upcomingStatus-1].transactionId==2?
    <>
   
    </>
    :
    <>
    
    </>
}

    </>
     :
    data.id == 5 ?
     <span style={{color:"green"}}>
        <img src={logos.received} className="uplodagainicon"/>
         <p style={{marginTop:"5px"}}>Mark Received</p></span>
         :""
   
     : 
    ""
    
     :
    ""
}
</>
)}
</Col>

</Row>
{/* _________________________________________Upload Final Payment Receipt_________________________________________________ */}
                                          
<div id={"FinalPayment"}class="w3-modal">
                                                            <div class="w3-modal-content w3-animate-top modalBoxSize">
                                                                <div class="w3-container buyerMOQAcceptModalContainer">
                                                                <Row noGutters={true} className="buyerMOQAcceptModalOuter">
                                                                    <Col className="col-xs-12">
                                                                        <div className="buyerMOQAcceptModalHeader playfair">Upload your <br/>Final Payment receipt</div>
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
                                                                          <input type="file" id="file"  accept=".png, .jpg, .jpeg"
                                                                        onChange={this.onFileChange}
                                                                        style={{background:"white"}}
                                                                            />
                                                                            <label for="file" className="buyerMOQAcceptModalEnquiryDiv"  style={{background:"white"}}>
                                                                            <img src={logos.Iconfeatherupload} className=" happyunhappyimg" /></label>
                                                                          <br/>
                                                                                 <b className="uploadreceiptname" style={{color:"black"}}>{this.state.selectedFileName}</b>
                                                                                  <br/>
                                                                                  <div>
                                                                                   </div>
                                                                                 
                                                                              </Col>
                                                                          </Row>
                                                                          
                                                                    }
                                                                        <Row noGutters={true}>
                                                                        <Col className="col-xs-12"style={{fontSize:"20px"}}>
                                                                        Net payment amount: <b>{this.state.getPaymentDetailsForFinalPayment.payableAmount?this.state.getPaymentDetailsForFinalPayment.payableAmount:"0"}</b> 
                                                                         </Col>
                                                                          </Row>
                                                                        <div className="buyerMOQAcceptModalEnquiryDiv" style={{marginBottom:"10px"}}>
                                                                            <span className="buyerMOQAcceptModalEnquiry">{item.enquiryCode?"Enquiry Id:":"Order Id:"}</span>
                                                                            <span className="buyerMOQAcceptModalEnquiryId" style={{color:"#337ab7"}}>
                                                                                 {item.enquiryCode?item.enquiryCode:item.orderCode}
                                                                                 </span>
                                                                        </div>
                                                                        

                                                                        <div className="approvenote">
                                                                            Make sure you send the correct enquiry receipt. <br/>
                                                                          Also make sure the attached document is <b>clear</b> and <b>readable</b>  <br/> 
                                                                          with the <b>LR</b> number and  <b>amount.</b> 
                                                                          <p style={{textAlign:"center"}}>
                                                                               {this.state.showValidationFinal ? (
                                                                                <span className="bg-danger">Select Receipt to upload</span>
                                                                                ) : (
                                                                                <br />
                                                                                )}</p>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <hr className="buyerMOQAcceptModalHr"/>
                                                                <div className="buyerMOQAcceptModalButtonOuter">
                                                                    <span  
                                                                     onClick={()=>this.uplodFinalreceiptModalClose()}
                                                                    className="buyerMOQAcceptModalCancelButton">Cancel</span>
                                                                 
                                                                    <span >
                                                                        <button
                                                                        disabled={this.state.rejectButtonClick}
                                                                        onClick={() => this.uploadReceiptandSend(item.transactionCompleted.enquiryId)}
                                                                    className="senddelButton"><i class="fa fa-paper-plane" aria-hidden="true"style={{marginRight:"5px"}}></i>
                                                                   Send</button></span>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            </div>


{/* ___________________________________________________________________________________________________ */}
 
  <hr className="enquiryoptionhr" style={{width:"100%"}}></hr>
  </>
                )}
              
            

                </>
              :
              <>
                  <Row noGutters={true}>
                    <Col className="col-xs-12  text-center">
                       Loading data ..
                    </Col>
                </Row>
             
                  </>}
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    // 
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(BuyerCompletedTransaction);
export default connectedLoginPage;
