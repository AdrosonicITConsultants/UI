import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import {Row, Col , Container, Button,InputGroup, InputGroupText, InputGroupAddon, Input} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import TTCEapi from '../../services/API/TTCEapi';
import "./BuyerTransaction.css";
import Footer from "../footer/footer";
import Moment from 'react-moment';
import { EmptyBuyerRecentList } from './EmptyBuyerRecentList';



export class BuyerHistoryList extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            getTransactionStatus:[],
            getTransactionActions:[],
            getCompletedTransaction:[],
            getAdvancedPaymentReceipt:[],
            dataload : false,
            filter: null,
            paymentType:0,
            searchString:""


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

    openReceipt(receiptId,challanId){
        setTimeout(function() { 
          this.setState({
            render: true
          });
        }.bind(this), 1000);
        TTCEapi.getReceipt(receiptId,challanId).then((response)=>{
          if(response.data.valid) {
            window.open(response.data.data)
          }
        });
      }
    gotoEnquiry(enquiryId){
        localStorage.setItem("piShow", 1);
        browserHistory.push("/buyerEnquiryDetails?code="+enquiryId)
    }
  
    gotoTaxInvoice(eid){
        localStorage.setItem("piShow", 1);
        browserHistory.push("/buyercompletedorder?code="+eid)
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
                TTCEapi.getCompletedTransaction(this.state.searchString,this.state.paymentType).then((response)=>{
                    if(response.data.valid)
                    {
                    this.setState({
                         dataload : true,
                         getCompletedTransaction : response.data.data},()=>{
                    
                    });
                }
                });

                TTCEapi.getTransactionActions().then((response)=>{
                    if(response.data.valid)
                    {
                    this.setState({
                         dataload : true,
                         getTransactionActions : response.data.data},()=>{
                         TTCEapi.getCompletedTransaction(this.state.searchString,this.state.paymentType).then((response)=>{
                            if(response.data.valid)
                            {
                            this.setState({
                                 dataload : true,
                                 getCompletedTransaction : response.data.data},()=>{
                            
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
                        this.state.getCompletedTransaction.length==0 ?
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
                {this.filter(this.state.getCompletedTransaction).map((item)=> 
                    <>

<Row noGutters={true}>
<Col className="col-xs-3 DateandTime" sm="1">
<Moment format="DD-MM-YYYY">
{item.transactionCompleted.transactionOn}
</Moment>
<br/>
<Moment format=" h:mm A">
{item.transactionCompleted.transactionOn}
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
{item.transactionCompleted.percentage}{item.transactionCompleted.percentage !=null? "%":""}  payment received against Invoice for  {item.orderCode!=null? "order Id:":" enquiry Id:"} <b className="colorinv">
    {item.orderCode !=null ?item.orderCode : item.enquiryCode !=null?item.enquiryCode:"NA"}</b>
<br/>
</Col>
<Col className="col-xs-3 payack" sm="2">
<div dangerouslySetInnerHTML={{ __html: this.state.getTransactionStatus[item.transactionCompleted.upcomingStatus-1].buyerText} } />
</Col>
<Col className="col-xs-3 boldrs" sm="1">
{item.totalAmount !=null? "₹" +  item.totalAmount:item.paidAmount != null? "₹" +  item.paidAmount:item.eta !=null ? item.eta:"NA"}
</Col>
<Col className="col-xs-3 viewreceipt" sm="1">
{this.state.getTransactionStatus[item.transactionCompleted.upcomingStatus-1].viewType=="invoice"?
        <>
        {item.transactionCompleted.taxInvoiceId!=null?
        <span><img src={logos.viewReceipt} className="receipticon"
        onClick={() => this.gotoTaxInvoice(item.transactionCompleted.enquiryId)}/>
         <p style={{marginTop:"5px"}}>View Invoice</p></span>
         :
         <span><img src={logos.viewReceipt} className="receipticon"
    onClick={() => this.gotoEnquiry(item.transactionCompleted.enquiryId)}/>
     <p style={{marginTop:"5px"}}>View Invoice</p></span>
        }
        </>
    
:
<span><img src={logos.viewrec} className="receipticon" 
 onClick={()=> this.openReceipt(item.transactionCompleted.receiptId?item.transactionCompleted.receiptId:null,
    item.transactionCompleted.challanId?item.transactionCompleted.challanId:null)}
     /> <p style={{marginTop:"5px"}} >View Receipt</p></span>
}
</Col>
<Col className="col-xs-3 uplodagaintext" sm="1">

{this.state.getTransactionActions.map((data)=> 
<>


{
    item.transactionCompleted.isActionCompleted == 0 ?
    this.state.getTransactionStatus[item.transactionCompleted.upcomingStatus-1].buyerAction == data.id ? 
     data.id == 2 ?
    <span onClick={() => this.uploadagain(item.transactionCompleted.enquiryId)}>
        <img src={logos.uploadagain} className="uplodagainicon"/>
     <p style={{marginTop:"5px"}}>upload again</p></span>
     :
  data.id == 1 ?
  <span 
  >
      <img src={logos.uploadagain} className="uplodagainicon"/>
   <p style={{marginTop:"5px"}}>upload receipt</p></span>
   :    
    data.id == 5 ? <span style={{color:"green"}}>
        <img src={logos.received} className="uplodagainicon"/> <p style={{marginTop:"5px"}}>Mark Received</p></span>:""
   
     : 
    ""
    
     :
    ""
}
</>
)}
</Col>
<Col className="col-xs-3" sm="1" style={{textAlign:"center"}}  onClick={() => this.gotoEnquiry(item.transactionCompleted.enquiryId)}>
<img src={logos.redenquiry} className="gotoiconsize"/>
<p className="gotoenqu"> Go to this enquiry</p>
</Col>
</Row>
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
    // 
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(BuyerHistoryList);
export default connectedLoginPage;
