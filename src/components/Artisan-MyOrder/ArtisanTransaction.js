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
// import { ArtisianTransactionEmpty } from './ArtisianTransactionEmpty';
import thunk from 'redux-thunk';
// import { EditorInsertComment } from 'material-ui/svg-icons';



export class ArtisanTransaction extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            enquiryCode : this.props.enquiryCode,  
            getTransactionStatus:[],
            getTransactionActions:[],
            getOngoingTransaction:[],
            getTransactions:[],
            getAdvancedPaymentReceipt:[],
            validateFinalPaymentFromArtisan:[],
            dataload : false,
            acceptButtonClick:false,
            notifyButtonClick:false,
            rejectButtonClick:false,
            validateAdvancePaymentFromArtisan:[],
            filter: null,
            TransactionenquiryCode:"",
            TransactionenquiryId:"",
            paymentType:0,
            searchString:"",
            selectedFile:null,
            selectedFileName:"",
            notifyId:"",
            upload:true,
            eta:"",
            showDeliveryValidation:false,
            uploadClick:false,
            deliveryChallanUploaded:false

        }
        this.onFileChange= this.onFileChange.bind(this);
        this.paymentTypeset = this.paymentTypeset.bind(this);
        this.uploadReceiptandSend=this.uploadReceiptandSend.bind(this)
        this.handleChange=this.handleChange.bind(this)

    }  
    handleChange(e) {
        const { name, value } = e.target;
        console.log(value);
        this.setState({ [name]: value,showDeliveryValidation: false ,completebtndis:false}, () => {
       
        });
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
    


     

    notifyModalShow(id,notifyId){
    
        document.getElementById('notifyModal'+id).style.display='block';
      
                this.setState({
                 notifyId:notifyId
             },()=>{
                 console.log(this.state.notifyId);
             })
            
     
        
    }

    notifyModalclose = (id) => {
        document.getElementById('notifyModal'+id).style.display='none';
        
    }

    uploddeliveryreceiptModalShow(id){
    
        document.getElementById('deliveryReceipt'+id).style.display='block';
        
    }

    uploadReceiptandSend(enquiryId,id){
      
        if(this.state.orderDispatchDate && this.state.selectedFile)
        {
            this.setState({
                uploadClick:true
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
                    document.getElementById('deliveryReceipt'+id).style.display='none';
                    customToast.success("Delivery Challan uploaded", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
                    this.setState({  
                        uploadClick:false
                  
                },()=>{
                    // console.log(response)
                    this.componentDidMount()
                });
              
          }
          else{
            document.getElementById('deliveryReceipt'+id).style.display='none';
    
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
        document.getElementById('acceptMOQModal'+ id).style.display='block';

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
        document.getElementById('acceptMOQModal' + id).style.display='block';

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


    acceptMOQModalClose = (enquiryId) => {
        document.getElementById('acceptMOQModal'+ enquiryId).style.display='none';
        
    }

    backoperation(){
        browserHistory.push("/home"); 
    }

    gotoEnquiry(enquiryId){
        localStorage.setItem("piShow", 1);
        browserHistory.push("/enquiryDetails?code="+enquiryId)
    }
    gotoTaxInvoice(eid){
        localStorage.setItem("piShow", 1);
        console.log(eid)
        // browserHistory.push("/artisanorder?code="+eid)
        var win = window.open("/artisanorder?code="+eid, '_blank');
        win.focus();
       }
    NotifyAgain(actionId,respectiveActionId,id){
        this.setState({ notifyButtonClick:true
           })
        console.log(actionId);
        console.log(respectiveActionId);
        TTCEapi.notifyAgain(actionId,respectiveActionId).then((response)=>{
            if(response.data.valid)
            {
                customToast.success("Notification Sent", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                  });
                this.componentDidMount();
               
            this.setState({
             
                 dataload : true,
                 notifyAgain : response.data.data,
                 notifyButtonClick:false,},()=>{
                console.log(this.state.notifyAgain);
            
            });
            document.getElementById('notifyModal'+id).style.display='none';
        }
        else{
            this.setState({ notifyButtonClick:false,
                rejectButtonClick:false})
            customToast.error(response.data.errorMessage, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true,
              });
        }
        });
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
    acceptorRejectFinal(id,enquiryId,status){
        console.log(enquiryId);
        console.log(status);
        this.setState({ acceptButtonClick:true,
            rejectButtonClick:true})
        TTCEapi.validateFinalPaymentFromArtisan(enquiryId,status).then((response)=>{
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
                 validateFinalPaymentFromArtisan : response.data.data},()=>{
                console.log(this.state.validateFinalPaymentFromArtisan);
            
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
                        //  dataload : true,
                         getTransactionActions : response.data.data},()=>{
                         console.log(this.state.getTransactionActions);
                         TTCEapi.getTransactions(this.state.enquiryCode).then((response)=>{
                            if(response.data.valid)
                            {
                            this.setState({
                                 dataload : true,
                                 getTransactions : response.data.data.ongoingTransactionResponses},()=>{
                                 console.log(this.state.getTransactions);
                                 
                            });
                        }
                        });
                    });
                }
                });
 
          
         });
        }
     });
     TTCEapi.fetchEnquiryAndPaymentDetails(this.state.enquiryCode).then((response)=>{
        if(response.data.valid){
            this.setState({
               
                
                deliveryChallanUploaded:response.data.data.deliveryChallanUploaded,
               
            })
        }
        else {
            this.setState({
               
                deliveryChallanUploaded:false,
              
          },()=>{
             
             console.log(this.state.fetchEnquiryAndPaymentDetails);
           
            });
        }
      
    })
     }
     paymentTypeset(e){
        console.log(e)
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
                <Container>
                   
                <hr className="enquiryoptionhr" style={{width:"100%"}}></hr>
                {this.state.getTransactions.map((item)=> 
                    <>
                    {/* {console.log(this.state.getTransactionStatus[item.transactionOngoing.accomplishedStatus-1])} */}

<Row noGutters={true}>
<Col className="col-xs-3 DateandTime" sm="1">
<Moment format="DD-MM-YYYY">
{item.transactionOngoing.transactionOn}
</Moment>
<Moment format=" h:mm A">
<p style={{color:"darkgray"}}>{item.transactionOngoing.transactionOn}</p>
 </Moment>

{/* {console.log(this.state.getTransactionStatus[item.transactionOngoing.accomplishedStatus-1].id)} */}
{/* {console.log(this.state.getTransactionStatus[item.transactionOngoing.upcomingStatus-1])} */}

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
                {item.transactionOngoing.percentage} {item.transactionOngoing.percentage !=null? "%":""}
                 payment received against Invoice  {item.orderCode!=null? "order Id:":" enquiry Id:"} <b className="colorinv">
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
<img src={logos.notifybuyer} className="acceptrejecticon" 
onClick={()=>this.notifyModalShow(item.transactionOngoing.id,item.transactionOngoing.enquiryId,data.id)}


/> 
      </>
      :
      data.id==4 ?
      <>
      <p>upload delivery challan</p>
<img src={logos.uploaddelreceipt} className="acceptrejecticon"
 onClick={()=>this.uploddeliveryreceiptModalShow(item.transactionOngoing.id,item.transactionOngoing.enquiryId,data.id)} /> 
        </>
        :
        data.id == 5 ? <span style={{color:"green"}}><img src={logos.received} className="uplodagainicon"/> 
        <p style={{marginTop:"5px"}}>Mark Received</p></span>:
         data.id == 2? 
       <>     
     <p>upload again</p>
<img src={logos.uploadagain} className="acceptrejecticon" />
</>
     :
     data.id == 1 ?
     <span 
     // onClick={() => this.uploadagain(item.transactionOngoing.enquiryId)}
     >
         <img src={logos.uploadagain} className="uplodagainicon"/>
      <p style={{marginTop:"5px"}}>upload receipt</p></span>:""
     : 
    ""
    
     :
    ""
}
</>
)}

</Col>
{/* <Col className="col-xs-3" sm="1" style={{textAlign:"center"}} 
 onClick={() => this.gotoEnquiry(item.transactionOngoing.enquiryId)}
// onClick={()=> this.acceptMOQModalShow}
 >
<img src={logos.redenquiry} className="gotoiconsize"/>
<p className="gotoenqu"> Go to this enquiry</p>
</Col> */}
</Row>
 {/* _________________________________________Modal accept Reject_________________________________________________ */}

                                                <div id={"acceptMOQModal"+item.transactionOngoing.id} class="w3-modal">
                                                            <div class="w3-modal-content w3-animate-top modalBoxSize">
                                                                <div class="w3-container buyerMOQAcceptModalContainer">
                                                                <Row noGutters={true} className="buyerMOQAcceptModalOuter">
                                                                    <Col className="col-xs-12">
                                                                        <div className="buyerMOQAcceptModalHeader">Are you sure ?</div>
                                                                        <div className="buyerMOQAcceptModalEnquiryDiv">
                                                                        {this.getAdvancedPaymentReceipt?
                                                                       <>
                                                             <img src={TTCEapi.ReceiptUrl + this.state.getAdvancedPaymentReceipt.paymentId + "/" + this.state.getAdvancedPaymentReceipt.label} style={{marginRight:"11px",height:"30px"}}/>          
                                                                     <span className="seereceipt">See receipt here:</span>
                                                                            <span className="buyerMOQAcceptModalEnquiryId" style={{fontSize:"11px"}}>  
                                                                            <a href={TTCEapi.ReceiptUrl + this.state.getAdvancedPaymentReceipt.paymentId + "/" + this.state.getAdvancedPaymentReceipt.label} target="_blank">
                                                                                    {this.state.getAdvancedPaymentReceipt.label}
                                                                                      
                                                                                </a></span>
                                                                       </>
                                                                        :
                                                                        <>
                                                                        </>
                                                                        }
                                                                        </div>
                                                                        <div className="buyerMOQAcceptModalEnquiryDiv" >
                                                                            <img src={logos.happyunhappy} className=" happyunhappyimg" />
                                                                        </div>
                                                                        <div className="buyerMOQAcceptModalEnquiryDiv">
                                                                            <span className="buyerMOQAcceptModalEnquiry">Enquiry Id:</span>
                                                                            
                                                                            <span className="buyerMOQAcceptModalEnquiryId" style={{color:"#337ab7"}}> 
                                                                            {item.enquiryCode?item.enquiryCode:item.orderCode}
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
                                                                        {this.state.getTransactionStatus[item.transactionOngoing.upcomingStatus-1].transactionId == 15?
                                                                        <>
                                                                        {/* "Final apyment accept" */}
                                                                         <span >
                                                                        <button
                                                                        disabled={this.state.acceptButtonClick}
                                                                        
                                                                        onClick={() => this.acceptorRejectFinal(item.transactionOngoing.id,item.transactionOngoing.enquiryId,2)}
                                                                    className="buyerMOQAcceptModalrejectButton">Reject</button></span>

                                                                    
                                                                    <span >
                                                                        <button
                                                                        disabled={this.state.rejectButtonClick}
                                                                       
                                                                        onClick={() => this.acceptorRejectFinal(
                                                                            item.transactionOngoing.id,
                                                                            item.transactionOngoing.enquiryId,1)}
                                                                            
                                                                    className="buyerMOQAcceptModalOkayButton">Accept</button>
                                                                    </span>
                                                                        
                                                                        </>
                                                                        
                                                                        :
                                                                        <>
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
                                                                        </>
                                                                        }
                                                                   
                                                                 
                                                                </div>
                                                                </div>
                                                            </div>
                                                            </div>
                                                          

{/* ___________________________________________________________________________________________________ */}
{/* _________________________________________Notification_________________________________________________ */}
{/* {this.state.getTransactionActions.map((data)=> 
<>
{
    item.transactionOngoing.isActionCompleted == 0 ?
    
    this.state.getTransactionStatus[item.transactionOngoing.upcomingStatus-1].artisanAction == data.id ? 
    " "
    :""
    :
    ""
   
}
    </>
)} */}

                                          
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
                                                                            {item.enquiryCode?item.enquiryCode:item.orderCode}</span>
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
                                                                       disabled={this.state.notifyButtonClick}
                                                                     
                                                                       onClick={()=>this.NotifyAgain(
                                                                        item.transactionOngoing.upcomingStatus==13?7:
                                                                        item.transactionOngoing.upcomingStatus==2?6:
                                                                        item.transactionOngoing.upcomingStatus==17?8:
                                                                        item.transactionOngoing.upcomingStatus==21?9:
                                                                        item.transactionOngoing.upcomingStatus==11?8:
                                                                        "",
                                                                        item.transactionOngoing.upcomingStatus==13?item.transactionOngoing.taxInvoiceId:
                                                                        item.transactionOngoing.upcomingStatus==2?item.transactionOngoing.piId:
                                                                        item.transactionOngoing.upcomingStatus==17?item.transactionOngoing.paymentId:
                                                                        item.transactionOngoing.upcomingStatus==21?item.transactionOngoing.challanId:
                                                                        item.transactionOngoing.upcomingStatus==11?item.transactionOngoing.paymentId:
                                                                        "",item.transactionOngoing.id )}
                                                                    className="buyerNotifyButton"><img src={logos.Iconfeatherbell} className="bellicon"style={{marginRight:"5px"}}/>Notify</button></span>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            </div>


{/* ___________________________________________________________________________________________________ */}
 {/* _________________________________________Upload Delivery receipt_________________________________________________ */}
                                          
                                        <div id={"deliveryReceipt"+item.transactionOngoing.id}class="w3-modal">
                                           {/* {this.state.deliveryChallanUploaded?
                                           <>
                                           "hhhh"
                                           </>
                                            : */}
                                            <>
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
                                                                            <span className="buyerMOQAcceptModalEnquiryId" style={{color:"#337ab7"}}> {item.enquiryCode?item.enquiryCode:item.orderCode}</span>
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
                                                                     onClick={()=>this.uploddeliveryreceiptModalclose(item.transactionOngoing.id)}
                                                                    className="buyerMOQAcceptModalCancelButton">Cancel</span>
                                                                 
                                                                    <span >
                                                                        <button
                                                                        disabled={this.state.uploadClick}
                                                                        onClick={() => this.uploadReceiptandSend(item.transactionOngoing.enquiryId,item.transactionOngoing.id)}
                                                                        // onClick={() => this.acceptorReject(item.transactionOngoing.enquiryId,1)}
                                                                    className="senddelButton"><i class="fa fa-paper-plane" aria-hidden="true"style={{marginRight:"5px"}}></i>
                                                                   Send</button></span>
                                                                </div>
                                                                </div>
                                                            </div>
                                            </>
                                            
                                                           
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

const connectedLoginPage = connect(mapStateToProps)(ArtisanTransaction);
export default connectedLoginPage;