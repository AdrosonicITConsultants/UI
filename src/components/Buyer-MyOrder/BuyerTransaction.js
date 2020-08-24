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
// import "./BuyerTransaction.css";
import Footer from "../footer/footer";
import Moment from 'react-moment';
// import { EmptyBuyerRecentList } from './EmptyBuyerRecentList';



export class BuyerTransaction extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            getTransactionStatus:[],
            getTransactionActions:[],
            getOngoingTransaction:[],
            getAdvancedPaymentReceipt:[],
            getTransactions:[],
            dataload : false,
            filter: null,
            enquiryCode:this.props.enquiryCode,

        }
        this.gotoEnquiry = this.gotoEnquiry.bind(this);
        this.uploadagain = this.uploadagain.bind(this);
        this.backoperation = this.backoperation.bind(this);


       
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
    gotoEnquiry(enquiryId){
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
                console.log(this.state.getTransactionStatus);
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

                TTCEapi.getTransactionActions().then((response)=>{
                    if(response.data.valid)
                    {
                    this.setState({
                         dataload : true,
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
                 {/* <Row className="mt-5">
                       <Col md="1"></Col>
                 <Col md="3" >
                 <InputGroup size="lg"className="searchenq">
                 
                    <input style={{height:"30px",border:"none",fontSize:"14px"}} value={this.state.filter} onChange={this.handleSearchChange} type="text" class="form-control empty searchenq" id="iconified" placeholder="&#xF002; Search your transaction by enquiry Id"/>

                </InputGroup>
                 </Col>
                 </Row> */}
                 <Row noGutters={true}>
                     <Col md="1"></Col>
                     <Col md="3">
<img src={logos.recent} style={{marginRight:"5px" , height:"17px"}}/> Recent Transactions
                     </Col>
                 </Row>
                <hr className="enquiryoptionhr" style={{width:"100%"}}></hr>
                {this.state.getTransactions.map((item)=> 
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
<img src={"https://f3adac-craft-exchange-resource.objectstore.e2enetworks.net/TransactionIcons/Buyer/"+this.state.getTransactionStatus[item.transactionOngoing.accomplishedStatus-1].id+".svg"} className="iconsize"/>

</Col>
<Col className="col-xs-3 paymentreceiptup" sm="2">
{/* Advance Payment Receipt uploaded */}
<div dangerouslySetInnerHTML={{ __html: this.state.getTransactionStatus[item.transactionOngoing.accomplishedStatus-1].buyerText} } />


</Col>
<Col className="col-xs-3 proformacol" sm="2">
{item.transactionOngoing.percentage}{item.transactionOngoing.percentage !=null? "%":""}  payment received against Invoice for enquiry Id: <b className="colorinv">
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
    <span>
        <img src={logos.viewReceipt} className="receipticon" onClick={() => this.gotoEnquiry(item.transactionOngoing.enquiryId)}/>
         <p style={{marginTop:"5px"}}>View Invoice</p>
         </span>
:
<span><img src={logos.viewrec} className="receipticon"
 onClick={() => this.openReceipt(item.transactionOngoing.enquiryId)}/>
  <p style={{marginTop:"5px"}} >View Receipt</p></span>

}
</Col>
<Col className="col-xs-3 uplodagaintext" sm="1">

{this.state.getTransactionActions.map((data)=> 
<>


{
    item.transactionOngoing.isActionCompleted == 0 ?
    this.state.getTransactionStatus[item.transactionOngoing.upcomingStatus-1].buyerAction == data.id ? 
    data.id == 1 || data.id == 2 ?
    <span onClick={() => this.uploadagain(item.transactionOngoing.enquiryId)}>
        <img src={logos.uploadagain} className="uplodagainicon"/>
     <p style={{marginTop:"5px"}}>upload again</p></span>
 
    :
    data.id == 5 ? <span style={{color:"green"}}><img src={logos.received} className="uplodagainicon"/> <p style={{marginTop:"5px"}}>Mark Received</p></span>:""
   
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
    // debugger;
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(BuyerTransaction);
export default connectedLoginPage;
