import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button,InputGroup, InputGroupText, InputGroupAddon, Input} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
// import "../ArtistEnquiries/AllEnquiryList.css"
import TTCEapi from '../../services/API/TTCEapi';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Footer from "../footer/footer";
import Moment from 'react-moment';
import queryString from 'query-string';
import { ArtisianTransactionEmpty } from './ArtisianTransactionEmpty';



export class ArtisanRecentList extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            getTransactionStatus:[],
            getTransactionActions:[],
            getOngoingTransaction:[],
            getTransactions:[],
            getAdvancedPaymentReceipt:[],
            dataload : false,
            acceptButtonClick:false,
            rejectButtonClick:false,
            validateAdvancePaymentFromArtisan:[],
            filter: null,
            TransactionenquiryCode:"",
            TransactionenquiryId:"",
            paymentType:0,
            searchString:""

        }
        this.paymentTypeset = this.paymentTypeset.bind(this);
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
    


     

    notifyModalShow(id,enquiryId){
    
        document.getElementById('notifyModal'+id).style.display='block';
        TTCEapi.getTransactions(enquiryId).then((response)=>
        {
            if(response.data.valid)
            {
                this.setState({getTransactions:response.data.data,
                 TransactionenquiryCode:response.data.data.ongoingTransactionResponses[0].enquiryCode
             },()=>{
                 console.log(this.state.TransactionenquiryCode);
             })
            }
        })
        
    }

    notifyModalclose = (id) => {
        document.getElementById('notifyModal'+id).style.display='none';
        
    }

    uploddeliveryreceiptModalShow(id,enquiryId){
    
        document.getElementById('deliveryReceipt'+id).style.display='block';
        TTCEapi.getTransactions(enquiryId).then((response)=>
        {
            if(response.data.valid)
            {
                this.setState({getTransactions:response.data.data,
                 TransactionenquiryCode:response.data.data.ongoingTransactionResponses[0].enquiryCode
             },()=>{
                 console.log(this.state.TransactionenquiryCode);
             })
            }
        })
        
    }

    uploddeliveryreceiptModalclose = (id) => {
        document.getElementById('deliveryReceipt'+id).style.display='none';
        
    }
    
    acceptModalShow(id,enquiryId){
        
        console.log("abcfdrf");
        // document.getElementById('acceptMOQModal'+ id).style.display='block';
        TTCEapi.getAdvancedPaymentReceipt(enquiryId).then((response)=>{
            if(response.data.valid)
        {

            // this.componentDidMount();
            this.setState({getAdvancedPaymentReceipt : response.data.data,
                receiptId:response.data.data.paymentId,
                receiptlabel:response.data.data.label
              
            },()=>{
             document.getElementById('acceptMOQModal'+ id).style.display='block';
                console.log(this.state.getAdvancedPaymentReceipt);
               console.log(this.state.getAdvancedPaymentReceipt.paymentId);
               console.log(this.state.getAdvancedPaymentReceipt.label);
     

            });
        }
        });
    }
        
    
    RejectModalShow (id,enquiryId){
       
        TTCEapi.getAdvancedPaymentReceipt(enquiryId).then((response)=>{
            if(response.data.valid)
        {
            // this.componentDidMount();
            this.setState({getAdvancedPaymentReceipt : response.data.data,
                receiptId:response.data.data.paymentId,
                receiptlabel:response.data.data.label
              
            },()=>{
                document.getElementById('acceptMOQModal' + id).style.display='block';
                console.log(this.state.getAdvancedPaymentReceipt);
               console.log(this.state.getAdvancedPaymentReceipt.paymentId);
               console.log(this.state.getAdvancedPaymentReceipt.label)
          
          
            });
        }
        });
    }

    openReceipt(enquiryId){
        console.log("click");
        setTimeout(function() { //Start the timer
            this.setState({render: true}) //After 1 second, set render to true
        }.bind(this), 1000)
        TTCEapi.getAdvancedPaymentReceipt(enquiryId).then((response)=>{

            if(response.data.valid)
        {
            // this.componentDidMount();
            this.setState({getAdvancedPaymentReceipt : response.data.data,
                receiptId:response.data.data.paymentId,
                receiptlabel:response.data.data.label
              
            },()=>{
                console.log(this.state.getAdvancedPaymentReceipt);
               console.log(this.state.getAdvancedPaymentReceipt.paymentId);
               console.log(this.state.getAdvancedPaymentReceipt.label)
                
            window.open(TTCEapi.ReceiptUrl +this.state.getAdvancedPaymentReceipt.paymentId+"/"+this.state.getAdvancedPaymentReceipt.label, "_blank")   
        });
        }
        });

    }


    acceptMOQModalClose = (enquiryId) => {
        document.getElementById('acceptMOQModal'+ enquiryId).style.display='none';
        
    }

    backoperation(){
        browserHistory.push("/home"); 
    }

    gotoEnquiry(enquiryId){
        browserHistory.push("/enquiryDetails?code="+enquiryId)
    }
   
    
    acceptorReject(id,enquiryId,status){
        console.log(enquiryId);
        console.log(status);
        this.setState({ acceptButtonClick:true,
            rejectButtonClick:true})
        TTCEapi.validateAdvancePaymentFromArtisan(enquiryId,status).then((response)=>{
            if(response.data.valid)
            {
                customToast.success("Transaction Status Updated!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                  });
                this.componentDidMount();
               
            this.setState({
                acceptButtonClick:false,
                rejectButtonClick:false,
                 dataload : true,
                 validateAdvancePaymentFromArtisan : response.data.data},()=>{
                console.log(this.state.validateAdvancePaymentFromArtisan);
            
            });
            document.getElementById('acceptMOQModal'+id).style.display='none';
        }
        else{
            this.setState({ acceptButtonClick:false,
                rejectButtonClick:false})
            customToast.error(response.data.errorMessage, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true,
              });
        }
        });
    }
    




    componentDidMount(){
        // this.setState({
        //     paymentType: this.state.paymentType
        //   })
        TTCEapi.getTransactionStatus().then((response)=>{
            if(response.data.valid)
            {
         this.setState({
                getTransactionStatus : response.data.data,
               },()=>{
                TTCEapi.getTransactionActions().then((response)=>{
                    if(response.data.valid)
                    {
                    this.setState({
                          getTransactionActions : response.data.data},()=>{
                         console.log(this.state.getTransactionActions);
                         TTCEapi.getOngoingTransaction(this.state.searchString,this.state.paymentType).then((response)=>{
                            if(response.data.valid)
                            {
                            this.setState({
                                 dataload : true,
                                 getOngoingTransaction : response.data.data},()=>{
                                // console.log(this.state.getOngoingTransaction);
                                console.log(this.state.getOngoingTransaction);
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
        console.log("abc")
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
                        <ArtisianTransactionEmpty />
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
                    {console.log(this.state.getTransactionStatus[item.transactionOngoing.accomplishedStatus-1])}

<Row noGutters={true}>
<Col className="col-xs-3 DateandTime" sm="1">
<Moment format="DD-MM-YYYY">
{item.transactionOngoing.transactionOn}
</Moment>
<Moment format=" h:mm A">
<p style={{color:"darkgray"}}>{item.transactionOngoing.transactionOn}</p>
 </Moment>

{console.log(this.state.getTransactionStatus[item.transactionOngoing.accomplishedStatus-1].id)}
</Col>
<Col className="col-xs-3" sm="1">
<img 
src={"https://f3adac-craft-exchange-resource.objectstore.e2enetworks.net/TransactionIcons/Artisan/"+this.state.getTransactionStatus[item.transactionOngoing.accomplishedStatus-1].id+".svg"} className="iconsize"


/>

</Col>
<Col className="col-xs-3 paymentreceiptup" sm="2">
<div dangerouslySetInnerHTML={{ __html: this.state.getTransactionStatus[item.transactionOngoing.accomplishedStatus-1].artisanText} } />


</Col>
<Col className="col-xs-3 proformacol" sm="2" >
                {item.transactionOngoing.percentage} {item.transactionOngoing.percentage !=null? "%":""} payment received against Invoice for enquiry Id: <b className="colorinv">
    {item.orderCode !=null ?item.orderCode : item.enquiryCode !=null?item.enquiryCode:"NA"}</b>
<br/>
</Col>
<Col className="col-xs-3 payack" sm="2">
<div dangerouslySetInnerHTML={{ __html: this.state.getTransactionStatus[item.transactionOngoing.upcomingStatus-1].artisanText} } />
</Col>
<Col className="col-xs-3 boldrs" sm="1">
₹ {item.totalAmount !=null?item.totalAmount:item.paidAmount != null?item.paidAmount:item.eta !=null ? item.eta:"NA"}
</Col>
<Col className="col-xs-3 viewreceipt" sm="1">
    {this.state.getTransactionStatus[item.transactionOngoing.upcomingStatus-1].viewType=="invoice"?
    <span><img src={logos.viewReceipt} className="receipticon"
    onClick={() => this.gotoEnquiry(item.transactionOngoing.enquiryId)}/>
     <p style={{marginTop:"5px"}}>View Invoice</p></span>
:
<span><img src={logos.viewrec} className="receipticon" onClick={()=> this.openReceipt(item.transactionOngoing.enquiryId)} /> <p style={{marginTop:"5px"}} >View Receipt</p></span>
}
</Col>
<Col className="col-xs-3 acceptreject" sm="1" style={{textAlign:"center"}}>

{this.state.getTransactionActions.map((data)=> 
<>
{
    item.transactionOngoing.isActionCompleted == 0 ?
    this.state.getTransactionStatus[item.transactionOngoing.upcomingStatus-1].artisanAction == data.id ? 
    data.id == 3?
        <>
    <p>Accept or Reject</p>
<span><img src={logos.accept} className="acceptrejecticon" 
       
            onClick={()=> this.acceptModalShow(item.transactionOngoing.id,item.transactionOngoing.enquiryId)}
            /> 
        <img src={logos.cancel}className="acceptrejecticon mlbtn"
         onClick={()=> this.RejectModalShow(item.transactionOngoing.id,item.transactionOngoing.enquiryId)}
        //   disabled={this.state.rejectButtonClick}
        //  onClick={() => this.acceptorReject(item.transactionOngoing.enquiryId,2)} 
         /></span>

      </>
    :
    data.id == 6 ||    data.id == 7 ||  data.id == 8 || data.id == 9?

   <>
    <p>Notify buyer again</p>
<img src={logos.notifybuyer} className="acceptrejecticon" onClick={()=>this.notifyModalShow(item.transactionOngoing.id,item.transactionOngoing.enquiryId)}/> 

      </>
      :
      data.id==4 ?
      <>
      <p>upload delivery challan</p>
<img src={logos.uploaddelreceipt} className="acceptrejecticon"
 onClick={()=>this.uploddeliveryreceiptModalShow(item.transactionOngoing.id,item.transactionOngoing.enquiryId)}/> 
        </>
        :
        data.id == 5 ? <span style={{color:"green"}}><img src={logos.received} className="uplodagainicon"/> 
        <p style={{marginTop:"5px"}}>Mark Received</p></span>:
        data.id == 1 || data.id == 2? 
       <>     
     <p>upload again</p>
<img src={logos.uploadagain} className="acceptrejecticon" />
</>
     :""
     : 
    ""
    
     :
    ""
}
</>
)}

</Col>
<Col className="col-xs-3" sm="1" style={{textAlign:"center"}} 
 onClick={() => this.gotoEnquiry(item.transactionOngoing.enquiryId)}
// onClick={()=> this.acceptMOQModalShow}
 >
<img src={logos.redenquiry} className="gotoiconsize"/>
<p className="gotoenqu"> Go to this enquiry</p>
</Col>
</Row>
 {/* _________________________________________Modal accept Reject_________________________________________________ */}

                                                <div id={"acceptMOQModal"+item.transactionOngoing.id} class="w3-modal">
                                                            <div class="w3-modal-content w3-animate-top modalBoxSize">
                                                                <div class="w3-container buyerMOQAcceptModalContainer">
                                                                <Row noGutters={true} className="buyerMOQAcceptModalOuter">
                                                                    <Col className="col-xs-12">
                                                                        <div className="buyerMOQAcceptModalHeader">Are you sure ?</div>
                                                                        <div className="buyerMOQAcceptModalEnquiryDiv">
                                                                        <img src={TTCEapi.ReceiptUrl + this.state.getAdvancedPaymentReceipt.paymentId + "/" + this.state.getAdvancedPaymentReceipt.label} style={{marginRight:"11px",height:"30px"}}/>          
                                                                       
                                                                       
                                                                            <span className="seereceipt">See receipt here:</span>
                                                                            <span className="buyerMOQAcceptModalEnquiryId" style={{fontSize:"11px"}}>  
                                                                            <a href={TTCEapi.ReceiptUrl + this.state.getAdvancedPaymentReceipt.paymentId + "/" + this.state.getAdvancedPaymentReceipt.label} target="_blank">
                                                                                    {this.state.getAdvancedPaymentReceipt.label}
                                                                                      
                                                                                </a></span>
                                                                        </div>
                                                                        <div className="buyerMOQAcceptModalEnquiryDiv" >
                                                                            <img src={logos.happyunhappy} className=" happyunhappyimg" />
                                                                        </div>
                                                                        <div className="buyerMOQAcceptModalEnquiryDiv">
                                                                            <span className="buyerMOQAcceptModalEnquiry">Enquiry Id:</span>
                                                                            
                                                                            <span className="buyerMOQAcceptModalEnquiryId" style={{color:"#337ab7"}}> 
                                                                            {item.enquiryCode}
                                                                            {}
                                                                            
                                                                            </span>
                                                                          
                                                                        </div>
                                                                        
                                                                       
                                                                        <div className="approvenote">
                                                                            Once you approved it,the
                                                                           <span className="buyerMOQAcceptModalDescSpan"> product stage cannot be reverted.</span> 
                                                                           <br/>Kindly make sure to <b>check your account balance</b> is reflected with <br/> 
                                                                           the amount.Best practise is to check with your bank,or in <br/>
                                                                           <b>bank statement</b> from the <b>authorised bank sources.</b>
                                                                           
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <hr className="buyerMOQAcceptModalHr"/>
                                                                <div className="buyerMOQAcceptModalButtonOuter">
                                                                    <span onClick={()=>this.acceptMOQModalClose(item.transactionOngoing.id)} className="buyerMOQAcceptModalCancelButton">Cancel</span>
                                                                    <span >
                                                                        <button
                                                                        disabled={this.state.acceptButtonClick}
                                                                        
                                                                        onClick={() => this.acceptorReject(item.transactionOngoing.id,item.transactionOngoing.enquiryId,2)}
                                                                    className="buyerMOQAcceptModalrejectButton">Reject</button></span>

                                                                    
                                                                    <span >
                                                                        <button
                                                                        disabled={this.state.rejectButtonClick}
                                                                       
                                                                        onClick={() => this.acceptorReject(
                                                                            item.transactionOngoing.id,
                                                                            item.transactionOngoing.enquiryId,1)}
                                                                            
                                                                    className="buyerMOQAcceptModalOkayButton">Accept</button>
                                                                    </span>
                                                                 
                                                                </div>
                                                                </div>
                                                            </div>
                                                            </div>
                                                          

{/* ___________________________________________________________________________________________________ */}
{/* _________________________________________Notification_________________________________________________ */}
                                          
                                                        <div id={"notifyModal"+item.transactionOngoing.id} class="w3-modal">
                                                            <div class="w3-modal-content w3-animate-top modalBoxSize">
                                                                <div class="w3-container buyerMOQAcceptModalContainer">
                                                                <Row noGutters={true} className="buyerMOQAcceptModalOuter">
                                                                    <Col className="col-xs-12">
                                                                        <div className="buyerMOQAcceptModalHeader playfair">Do you want to notify <br/>the buyer again ?</div>
                                                                      
                                                                        <div className="buyerMOQAcceptModalEnquiryDiv" >
                                                                            <img src={logos.bellpopup} className=" happyunhappyimg" />
                                                                        </div>
                                                                        <div className="buyerMOQAcceptModalEnquiryDiv" style={{marginBottom:"10px"}}>
                                                                            <span className="buyerMOQAcceptModalEnquiry">Enquiry Id:</span>
                                                                            <span className="buyerMOQAcceptModalEnquiryId" style={{color:"#337ab7"}}> 
                                                                            {item.enquiryCode}</span>
                                                                        </div>
                                                                        
                                                                        <div dangerouslySetInnerHTML={{ __html: this.state.getTransactionStatus[item.transactionOngoing.upcomingStatus-1].artisanText} } />

                                                                        {/* <div className="approvenote">
                                                                            Once you approved it,the
                                                                           <span className="buyerMOQAcceptModalDescSpan">product stage cannot be reverted.</span> 
                                                                           <br/>Kindly make sure to <b>check your account balance</b> is reflected with <br/> 
                                                                           the amount.Best practise is to check with your bank,or in <br/>
                                                                           <b>bank statement</b> from the <b>authorised bank sources.</b>
                                                                           
                                                                        </div> */}
                                                                    </Col>
                                                                </Row>
                                                                <hr className="buyerMOQAcceptModalHr"/>
                                                                <div className="buyerMOQAcceptModalButtonOuter">
                                                                    <span onClick={()=>this.notifyModalclose(item.transactionOngoing.id)} className="buyerMOQAcceptModalCancelButton">Cancel</span>
                                                                 
                                                                    <span >
                                                                        <button
                                                                        disabled={this.state.rejectButtonClick}
                                                                     
                                                                        // onClick={() => this.acceptorReject(item.transactionOngoing.enquiryId,1)}
                                                                    className="buyerNotifyButton"><img src={logos.Iconfeatherbell} className="bellicon"style={{marginRight:"5px"}}/>Notify</button></span>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            </div>


{/* ___________________________________________________________________________________________________ */}
 {/* _________________________________________Upload Delivery receipt_________________________________________________ */}
                                          
                                        <div id={"deliveryReceipt"+item.transactionOngoing.id}class="w3-modal">
                                                            <div class="w3-modal-content w3-animate-top modalBoxSize">
                                                                <div class="w3-container buyerMOQAcceptModalContainer">
                                                                <Row noGutters={true} className="buyerMOQAcceptModalOuter">
                                                                    <Col className="col-xs-12">
                                                                        <div className="buyerMOQAcceptModalHeader playfair">Upload your <br/>delivery receipt</div>
                                                                      
                                                                        <div className="buyerMOQAcceptModalEnquiryDiv" >
                                                                            <img src={logos.Iconfeatherupload} className=" happyunhappyimg" />
                                                                            <p className="uploadrec">Upload Receipt</p>
                                                                        </div>
                                                                        <div className="buyerMOQAcceptModalEnquiryDiv" style={{marginBottom:"10px"}}>
                                                                            <span className="buyerMOQAcceptModalEnquiry">Enquiry Id:</span>
                                                                            <span className="buyerMOQAcceptModalEnquiryId" style={{color:"#337ab7"}}> {item.enquiryCode}</span>
                                                                        </div>
                                                                        

                                                                        <div className="approvenote">
                                                                            Make sure you send the correct enquiry receipt. <br/>
                                                                          Also make sure the attached document is <b>clear</b> and <b>readable</b>  <br/> 
                                                                          with the <b>LR</b> number and  <b>amount.</b> 
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <hr className="buyerMOQAcceptModalHr"/>
                                                                <div className="buyerMOQAcceptModalButtonOuter">
                                                                    <span  
                                                                     onClick={()=>this.uploddeliveryreceiptModalclose(item.transactionOngoing.id)}
                                                                    className="buyerMOQAcceptModalCancelButton">Cancel</span>
                                                                 
                                                                    <span >
                                                                        <button
                                                                        disabled={this.state.rejectButtonClick}
                                                                     
                                                                        // onClick={() => this.acceptorReject(item.transactionOngoing.enquiryId,1)}
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

const connectedLoginPage = connect(mapStateToProps)(ArtisanRecentList);
export default connectedLoginPage;
