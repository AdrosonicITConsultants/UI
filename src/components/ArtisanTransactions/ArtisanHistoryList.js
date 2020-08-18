import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
// import "../ArtistEnquiries/AllEnquiryList.css"
import TTCEapi from '../../services/API/TTCEapi';
import Footer from "../footer/footer";
import Moment from 'react-moment';



export class ArtisanHistoryList extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            getTransactionStatus:[],
            getTransactionActions:[],
            getCompletedTransaction:[],
            dataload : false,
            images:[logos.pfi2 , logos.finpay ,logos.redenquiry,logos.pfi1]
           

        }
       
    }      
          
    backoperation(){
        browserHistory.push("/home"); 
    }
    
    componentDidMount(){
   
        TTCEapi.getTransactionStatus().then((response)=>{
            if(response.data.valid)
            {
         this.setState({
                getTransactionStatus : response.data.data,
               },()=>{
                console.log(this.state.getTransactionStatus);
                TTCEapi.getCompletedTransaction().then((response)=>{
                    if(response.data.valid)
                    {
                    this.setState({
                         dataload : true,
                         getCompletedTransaction : response.data.data},()=>{
                        console.log(this.state.getCompletedTransaction);
                    
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
                         TTCEapi.getCompletedTransaction().then((response)=>{
                            if(response.data.valid)
                            {
                            this.setState({
                                 dataload : true,
                                 getCompletedTransaction : response.data.data},()=>{
                                console.log(this.state.getCompletedTransaction);
                            
                            });
                        }
                        });
                    });
                }
                });
          
         });
        }
     });

     
    //  TTCEapi.getTransactionActions().then((response)=>{
    //     this.setState({
           
    //          getTransactionActions : response.data.data},()=>{
         
    //         console.log(this.state.getTransactionActions);
         
    //     });
    // });

    
  
     }
  

    render() {
        return (
            <React.Fragment>
            {this.state.dataload ?
                this.state.getCompletedTransaction.length==0?
                <Row noGutters={true}>
            <Col className="col-xs-12  text-center">
                No History
            </Col>
        </Row>
        :
        <Container>
        
        <hr className="enquiryoptionhr" style={{width:"100%"}}></hr>
        {this.state.getCompletedTransaction.map((item)=> 
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

{console.log(this.state.getTransactionStatus[item.transactionOngoing.accomplishedStatus-1].id)}
</Col>
<Col className="col-xs-3" sm="1">
{/* <img src={logos.finpay} className="iconsize"/> */}
{this.state.getTransactionStatus[item.transactionOngoing.accomplishedStatus-1].id== 1
?
<img src={this.state.images[0]}className="imgicon" />
:
this.state.getTransactionStatus[item.transactionOngoing.accomplishedStatus-1].id== 13 ||
this.state.getTransactionStatus[item.transactionOngoing.accomplishedStatus-1].id== 14 ||
this.state.getTransactionStatus[item.transactionOngoing.accomplishedStatus-1].id== 15 ||
this.state.getTransactionStatus[item.transactionOngoing.accomplishedStatus-1].id== 18 

?
<img src={this.state.images[1]} className="imgicon"/>
:
""
}
</Col>
<Col className="col-xs-3 paymentreceiptup" sm="2">
{/* Advance Payment Receipt uploaded */}
<div dangerouslySetInnerHTML={{ __html: this.state.getTransactionStatus[item.transactionOngoing.accomplishedStatus-1].artisanText} } />


</Col>
<Col className="col-xs-3 proformacol" sm="2">
50% payment received against Invoice for enquiry Id: <b className="colorinv">
{item.orderCode !=null ?item.orderCode : item.enquiryCode !=null?item.enquiryCode:"NA"}</b>
<br/>
{/* <span><b className="proformainvId"> Invoice Id</b> <b className="colorinv proformainvIdtext "> AS-778</b></span> */}
</Col>
<Col className="col-xs-3 payack" sm="2">
<div dangerouslySetInnerHTML={{ __html: this.state.getTransactionStatus[item.transactionOngoing.upcomingStatus-1].artisanText} } />
</Col>
<Col className="col-xs-3 boldrs" sm="1">
₹ {item.totalAmount !=null?item.totalAmount:item.paidAmount != null?item.paidAmount:item.eta !=null ? item.eta:"NA"}
</Col>
<Col className="col-xs-3 viewreceipt" sm="1">
{this.state.getTransactionStatus[item.transactionOngoing.upcomingStatus-1].viewType=="invoice"?
<span><img src={logos.viewReceipt} className="receipticon" onClick={() => this.gotoEnquiry(item.transactionOngoing.enquiryId)}/> <p style={{marginTop:"5px"}}>View Invoice</p></span>
:
<span><img src={logos.viewrec} className="receipticon"  /> <p style={{marginTop:"5px"}} >View Receipt</p></span>
}
</Col>
<Col className="col-xs-3 acceptreject" sm="1" style={{textAlign:"center"}}>
{/* <p>Accept or Reject</p>
<span><img src={logos.accept} className="acceptrejecticon"/> <img src={logos.cancel}className="acceptrejecticon mlbtn"/></span> */}
{this.state.getTransactionActions.map((data)=> 
<>
{
item.transactionOngoing.isActionCompleted == 0 ?
this.state.getTransactionStatus[item.transactionOngoing.upcomingStatus-1].artisanAction == data.id ? 
data.id == 3?
<>
<p>Accept or Reject</p>
<span><img src={logos.accept} className="acceptrejecticon" 
 disabled={this.state.acceptButtonClick}
    onClick={() => this.acceptorReject(item.transactionOngoing.enquiryId,1)}/> 
<img src={logos.cancel}className="acceptrejecticon mlbtn"
  disabled={this.state.rejectButtonClick}
 onClick={() => this.acceptorReject(item.transactionOngoing.enquiryId,2)} /></span>

</>
:
data.id == 6 ||    data.id == 7 ||  data.id == 8 || data.id == 9?

<>
<p>Notify buyer again</p>
<img src={logos.notifybuyer} className="acceptrejecticon"/> 

</>
:
data.id==4 ?
<>
<p>upload delivery challan</p>
<img src={logos.accept} className="acceptrejecticon"/> 
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
<Col className="col-xs-3" sm="1" style={{textAlign:"center"}}  onClick={() => this.gotoEnquiry(item.transactionOngoing.enquiryId)}>
<img src={logos.redenquiry} className="gotoiconsize"/>
<p className="gotoenqu"> Go to this enquiry</p>
</Col>
</Row>
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

const connectedLoginPage = connect(mapStateToProps)(ArtisanHistoryList);
export default connectedLoginPage;
