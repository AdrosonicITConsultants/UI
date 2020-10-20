import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import {Row, Col , Container, Button,InputGroup, InputGroupText, InputGroupAddon, Input} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
// import "../ArtistEnquiries/AllEnquiryList.css"
import TTCEapi from '../../services/API/TTCEapi';
// import OngoingList from './BuyerOngoingList';
// import CompletedList from './BuyerCompletedList';
import "./BuyerTransaction.css";
import Footer from "../footer/footer";
import Moment from 'react-moment';
import { EmptyBuyerRecentList } from './EmptyBuyerRecentList';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";



export class BuyerRecentList extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            getTransactionStatus:[],
            getTransactionActions:[],
            getOngoingTransaction:[],
            getAdvancedPaymentReceipt:[],
            getPaymentDetailsForFinalPayment:[],
            dataload : false,
            filter: null,
            paymentType:0,
            searchString:"",
            selectedFile:null,
            selectedFileName:"",
            upload:true,
            rejectButtonClick:false,
            pid:0,
            invoiceid:0,
            totalAmount:0,
            paidAmount:0,
            payableAmount:0,
            showValidationFinal:false


        }
        this.gotoEnquiry = this.gotoEnquiry.bind(this);
        this.uploadagain = this.uploadagain.bind(this);
        this.backoperation = this.backoperation.bind(this);
        this.onFileChange= this.onFileChange.bind(this);
        this.uploadReceiptandSend= this.uploadReceiptandSend.bind(this);


       
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
    //   {     "enquiryId": 698, "pid":18,    "invoiceId": 2,   "type":2,  "paidAmount": 500,    "totalAmount": 1000    }
      uploadReceiptandSend(enquiryId,id){
      
          if(this.state.selectedFileName){
            this.setState({
                rejectButtonClick:true
              })
        // document.getElementById('acceptMOQModal').style.display='block';
                    
            const formData = new FormData(); 
            formData.append( 
              "myFile", 
              this.state.selectedFile, 
              this.state.selectedFile.name 
            );
           
            console.log(this.state.selectedFile); 
            TTCEapi.FinalPayment(
                this.state.selectedFile,
                enquiryId,
                this.state.pid,
                this.state.invoiceid,
                // this.props.percent,
                this.state.paidAmount,
                this.state.totalAmount
                ).then((response)=>{
                
                if(response.data.valid){ 
                    customToast.success("Final Payment Receipt Uploaded", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
                    document.getElementById('FinalPayment'+id).style.display='none';

                   this.componentDidMount()
                 
                    this.setState({  
                   success:true
                  
                },()=>{
                    console.log(response)
               
                });
              
          }
          else{
            document.getElementById('FinalPayment'+id).style.display='none';
    
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
    
    backoperation(){
        browserHistory.push("/home"); 
    }
    // {     "enquiryId": 698, "pid":18,    "invoiceId": 2,   "type":2,  "paidAmount": 500,    "totalAmount": 1000    }
    uplodFinalreceiptModalShow(id,enquiryId){
        console.log(enquiryId)
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
                     payableAmount:response.data.data.payableAmount,
                      invoiceid:response.data.data.invoiceId,
                      totalAmount:response.data.data.totalAmount,
                      paidAmount:response.data.data.payableAmount,
                      dataload : true,
                    },()=>{
                    console.log(this.state.getPaymentDetailsForFinalPayment);
                
                });
            }
            });
    
            document.getElementById('FinalPayment'+id).style.display='block';
             
      
        
    }

    uplodFinalreceiptModalClose(id){
        this.setState({
            selectedFileName:""
        })
        document.getElementById('FinalPayment'+id).style.display='none';

    }
    openReceipt(receiptId,challanId){
        console.log(receiptId,challanId);
        setTimeout(function() { 
          this.setState({
            render: true
          });
        }.bind(this), 1000);
        TTCEapi.getReceipt(receiptId,challanId).then((response)=>{
          if(response.data.valid) {
            // window.open(TTCEapi.ReceiptUrl + response.data.data.paymentId + "/" + response.data.data.label, "_blank");
            window.open(response.data.data)
          }
          console.log(response.data.data)
        });
      }
      
      gotoTaxInvoice(eid){
        localStorage.setItem("piShow", 1);
        browserHistory.push("/buyerorder?code="+eid)
       }
    gotoEnquiry(enquiryId){
        localStorage.setItem("piShow", 1);
        browserHistory.push("/buyerEnquiryDetails?code="+enquiryId)
    }
    
    uploadagain(enquiryId){
        browserHistory.push("/payadvance?code="+enquiryId)
    }
    componentDidMount(){
        console.log(this.state.selectedFile); 
        TTCEapi.getTransactionStatus().then((response)=>{
            if(response.data.valid)
            {
         this.setState({
                getTransactionStatus : response.data.data,
               },()=>{
                // // console.log(this.state.getTransactionStatus);
                TTCEapi.getOngoingTransaction(this.state.searchString,this.state.paymentType).then((response)=>{
                    if(response.data.valid)
                    {
                    this.setState({
                         dataload : true,
                         getOngoingTransaction : response.data.data},()=>{
                        // console.log(this.state.getOngoingTransaction);
                    
                    });
                }
                });

                TTCEapi.getTransactionActions().then((response)=>{
                    if(response.data.valid)
                    {
                    this.setState({
                         dataload : true,
                         getTransactionActions : response.data.data},()=>{
                         // console.log(this.state.getTransactionActions);
                         TTCEapi.getOngoingTransaction(this.state.searchString,this.state.paymentType).then((response)=>{
                            if(response.data.valid)
                            {
                            this.setState({
                                 dataload : true,
                                 getOngoingTransaction : response.data.data},()=>{
                                // console.log(this.state.getOngoingTransaction);
                            
                            });
                        }
                        });
                    });
                }
                });
          
         });
        }
     });
  
    
  
     }
  
     paymentTypeset(e){
        // console.log("abc")
        this.setState({
            paymentType:e
          },()=>{
              this.componentDidMount();
          }
        )
              
    }
    
    render() {
        return (
            <React.Fragment>
     {this.state.dataload ?
                        this.state.getOngoingTransaction.length==0 ?
                        this.state.paymentType==0 ?
                        <EmptyBuyerRecentList />
                :
              <>  <Row className="mt-5">
                <Col md="1"></Col>
          <Col md="3" >
              <span>
          <InputGroup size="lg"className="searchenq">
           <input style={{height:"30px",border:"none",fontSize:"14px"}} value={this.state.filter} onChange={this.handleSearchChange} type="text" class="form-control empty searchenq" id="iconified" placeholder="&#xF002; Search your transaction by enquiry Id"/>
         </InputGroup>
         
         </span>
          </Col>
          <Col md="1"></Col>
          {/* <Col md="3"><img src={logos.filter} className="filtericon"/> Filter</Col> */}
         <Col  md="3">  <div class="w3-dropdown-hover" style={{backgroundColor:"transparent"}}>
<button class="w3-button"><img src={logos.filter} className="filtericon"/> Filter</button>
<div class="w3-dropdown-content w3-bar-block w3-border">
<a href="#" class="w3-bar-item w3-button" onClick={()=> this.paymentTypeset(0)}>All</a>
<a href="#" class="w3-bar-item w3-button" onClick={()=> this.paymentTypeset(1)}>P ID</a>
<a href="#" class="w3-bar-item w3-button" onClick={()=> this.paymentTypeset(2)}>Payment ID</a>
<a  href="#"  class="w3-bar-item w3-button" onClick={()=> this.paymentTypeset(3)}>Tax Invoice ID</a>
<a  href="#"  class="w3-bar-item w3-button" onClick={()=> this.paymentTypeset(4)}>Challan ID</a>

</div>
</div></Col>
         
          </Row>
          <Container>
          <Row>
            <br></br>
            <br></br>
            <br></br>   
            <br></br>   
            <br></br>   
            <br></br>   
            <br></br>   
             <Col className="col-xs-12 text-center font14">
             No Data Found
            </Col>
         </Row>
          </Container>
          </>
                :
                <Container>
                 <Row className="mt-5">
                       <Col md="1"></Col>
                       <Col md="3" >
                     <span>
                 <InputGroup size="lg"className="searchenq">
                  <input style={{height:"30px",border:"none",fontSize:"14px"}} value={this.state.filter} onChange={this.handleSearchChange} type="text" class="form-control empty searchenq" id="iconified" placeholder="&#xF002; Search your transaction by enquiry Id"/>
                </InputGroup>
                
                </span>
                 </Col>
                 <Col md="1"></Col>
                 {/* <Col md="3"><img src={logos.filter} className="filtericon"/> Filter</Col> */}
                <Col  md="3">  <div class="w3-dropdown-hover" style={{backgroundColor:"transparent"}}>
    <button class="w3-button"><img src={logos.filter} className="filtericon"/> Filter</button>
    <div class="w3-dropdown-content w3-bar-block w3-border">
    <a href="#" class="w3-bar-item w3-button" onClick={()=> this.paymentTypeset(0)}>All</a>
      <a href="#" class="w3-bar-item w3-button" onClick={()=> this.paymentTypeset(1)}>P ID</a>
      <a href="#" class="w3-bar-item w3-button" onClick={()=> this.paymentTypeset(2)}>Payment ID</a>
      <a  href="#"  class="w3-bar-item w3-button" onClick={()=> this.paymentTypeset(3)}>Tax Invoice ID</a>
      <a  href="#"  class="w3-bar-item w3-button" onClick={()=> this.paymentTypeset(4)}>Challan ID</a>

    </div>
  </div></Col>
                 </Row>
                <hr className="enquiryoptionhr" style={{width:"100%"}}></hr>
                {this.filter(this.state.getOngoingTransaction).map((item)=> 
                    <>

<Row noGutters={true}>
<Col className="col-xs-3 DateandTime" sm="1">
<Moment format="DD-MM-YYYY">
{item.transactionOngoing.transactionOn}
</Moment>
<Moment format=" h:mm A">
<p style={{color:"darkgray"}}>{item.transactionOngoing.transactionOn}</p>
 </Moment>

</Col>
<Col className="col-xs-3" sm="1">
<img src={"https://f3adac-craft-exchange-resource.objectstore.e2enetworks.net/TransactionIcons/Buyer/"+this.state.getTransactionStatus[item.transactionOngoing.accomplishedStatus-1].id+".svg"} className="iconsize"/>

</Col>
<Col className="col-xs-3 paymentreceiptup" sm="2">
{/* Advance Payment Receipt uploaded */}
<div dangerouslySetInnerHTML={{ __html: this.state.getTransactionStatus[item.transactionOngoing.accomplishedStatus-1].buyerText} } />


</Col>
<Col className="col-xs-3 proformacol" sm="2">
{item.transactionOngoing.percentage}{item.transactionOngoing.percentage !=null? "%":""}  payment received against Invoice for  {item.orderCode!=null? "order Id:":" enquiry Id:"} <b className="colorinv">
    {item.orderCode !=null ?item.orderCode : item.enquiryCode !=null?item.enquiryCode:"NA"}</b>
<br/>
{/* <span><b className="proformainvId"> Invoice Id</b> <b className="colorinv proformainvIdtext "> AS-778</b></span> */}
</Col>
<Col className="col-xs-3 payack" sm="2">
<div dangerouslySetInnerHTML={{ __html: this.state.getTransactionStatus[item.transactionOngoing.upcomingStatus-1].buyerText} } />
</Col>
<Col className="col-xs-3 boldrs" sm="1">
₹ {item.totalAmount !=null?item.totalAmount:item.paidAmount != null?item.paidAmount:item.eta !=null ? item.eta:"NA"}
</Col>
<Col className="col-xs-3 viewreceipt" sm="1">
 
{this.state.getTransactionStatus[item.transactionOngoing.upcomingStatus-1].viewType=="invoice"?
        <>
        {item.transactionOngoing.taxInvoiceId!=null?
        <span><img src={logos.viewReceipt} className="receipticon"
        onClick={() => this.gotoTaxInvoice(item.transactionOngoing.enquiryId)}/>
         <p style={{marginTop:"5px"}}>View Invoice</p></span>
         :
         <span><img src={logos.viewReceipt} className="receipticon"
    onClick={() => this.gotoEnquiry(item.transactionOngoing.enquiryId)}/>
     <p style={{marginTop:"5px"}}>View Invoice</p></span>
        }
        </>
    
:
<span><img src={logos.viewrec} className="receipticon" 
 onClick={()=> this.openReceipt(item.transactionOngoing.receiptId?item.transactionOngoing.receiptId:null,
    item.transactionOngoing.challanId?item.transactionOngoing.challanId:null)}
     /> <p style={{marginTop:"5px"}} >View Receipt</p></span>
}
</Col>
<Col className="col-xs-3 uplodagaintext" sm="1">

{this.state.getTransactionActions.map((data)=> 
<>


{
    item.transactionOngoing.isActionCompleted == 0 ?
    this.state.getTransactionStatus[item.transactionOngoing.upcomingStatus-1].buyerAction == data.id ? 
     data.id == 2 ?
     this.state.getTransactionStatus[item.transactionOngoing.upcomingStatus-1].transactionId==17?
      <>
        {/* final payment reject acknowledgement */}
       <span onClick={()=>this.uplodFinalreceiptModalShow(item.transactionOngoing.id,item.transactionOngoing.enquiryId)} >   
            <img src={logos.uploadagain} className="uplodagainicon"/>
     <p style={{marginTop:"5px"}}>upload again</p></span>
      </>
   
     :
        <>
        <span onClick={() => this.uploadagain(item.transactionOngoing.enquiryId)}>
        <img src={logos.uploadagain} className="uplodagainicon"/>
     <p style={{marginTop:"5px"}}>upload again</p></span>
        </> 
    :
    data.id == 1 ?
    <>
        { this.state.getTransactionStatus[item.transactionOngoing.upcomingStatus-1].transactionId==2?
        <>
        <span 
    // onClick={() => this.uploadagain(item.transactionOngoing.enquiryId)}
    >
        <img src={logos.uploadagain} 
        //  onClick={()=>this.uplodFinalreceiptModalShow(item.transactionOngoing.id,item.transactionOngoing.enquiryId)} 
        onClick={() => this.uploadagain(item.transactionOngoing.enquiryId)}
        className="uplodagainicon"/>
     <p style={{marginTop:"5px"}}>upload receipt</p></span>
        </>
        :
        <>
        <span 
    // onClick={() => this.uploadagain(item.transactionOngoing.enquiryId)}
    >
        <img src={logos.uploadagain} 
         onClick={()=>this.uplodFinalreceiptModalShow(item.transactionOngoing.id,item.transactionOngoing.enquiryId)} 
        className="uplodagainicon"/>
     <p style={{marginTop:"5px"}}>upload receipt</p></span>
        </>
}
    
        </>
     :
    data.id == 5 ? <span style={{color:"green"}}>
        <img src={logos.received} className="uplodagainicon"/>
         <p style={{marginTop:"5px"}}>Mark Received</p></span>:""
   
     : 
    ""
    
     :
    ""
}
</>
)}
</Col>
<Col className="col-xs-3" sm="1" style={{textAlign:"center"}}  onClick={() => this.gotoEnquiry(item.transactionOngoing.enquiryId)}>
<img src={logos.redenquiry} className="gotoiconsize"/>
<p className="gotoenqu"> Go to this enquiry</p>
</Col>
</Row>
{/* _________________________________________Upload Final Payment Receipt_________________________________________________ */}
                                          
<div id={"FinalPayment"+item.transactionOngoing.id}class="w3-modal">
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
                                                                              {/* { console.log(this.state.selectedFile) } */}
                                                                          </Row>
                                                                          
                                                                    }
                                                                        <Row noGutters={true}>
                                                                        <Col className="col-xs-12"style={{fontSize:"20px"}}>
                                                                        Net payment amount: <b>{this.state.payableAmount}</b> 
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
                                                                     onClick={()=>this.uplodFinalreceiptModalClose(item.transactionOngoing.id)}
                                                                    className="buyerMOQAcceptModalCancelButton">Cancel</span>
                                                                 
                                                                    <span >
                                                                        <button
                                                                        disabled={this.state.rejectButtonClick}
                                                                        onClick={() => this.uploadReceiptandSend(item.transactionOngoing.enquiryId,item.transactionOngoing.id)}
                                                                        // onClick={() => this.uploadReceiptandSend()}
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
              
            

              <div>
              <img
                className="notifyFooterBanner internaldiv"
                src={logos.notifyFooterBanner}
              ></img>
            </div>
         
                </Container>
              :
              <Container>
                  <Row noGutters={true}>
                    <Col className="col-xs-12  text-center">
                       Loading data ..
                    </Col>
                </Row>
             
                  </Container>}
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    // debugger;
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(BuyerRecentList);
export default connectedLoginPage;
