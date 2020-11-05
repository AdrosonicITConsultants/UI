import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import queryString from 'query-string';
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import TTCEapi from '../../services/API/TTCEapi';
import Footer from "../footer/footer";
import Faulty from "./Faulty.css";
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify"
import Diffdays from '../BuyerOrder/Diffdays';
import DaysRemaining from './DaysRemaining';
import { FaultResolved } from './FaultResolved';
import Moment from 'react-moment';
export class BuyerFaultyOrderMarkResolve extends Component {
    constructor(props) {
        super(props);
        var today = new Date(),
        date = today.getDate()+ '.'+ (today.getMonth() + 1) + '.' + today.getFullYear() ;

        this.state = {
            currentDate: date,
            ongoingEnquiry:true,
            enquiryCode:"",
            getSingleOrder:[],
            isResolved:[],
            getAllRefBuyerReview:[],
            sendFaultyOrder:[],
            getOrderProgress:[],
            getAllRefArtisanReview:[],
            Allorderdata:[],
            OrderDetails:[],     
            dataload:false,
            description:"",
            showValidationfaulty:false,
            rejectButtonClick:false,
            buyerReviewComment:"",
            actioncategoryid : 0,
            artisanReviewComment:-1,
            concernsolved:false,
            buyer:true,
            accepted:[
                {   
                    id: 1,
                    comment: false,
                },
                {
                    id: 2,
                    comment: false,
                },
                {
                    id: 3,
                    comment: false,
                },
                {
                    id: 4,
                    comment: false,
                },
                {
                    id: 5,
                    comment: false,
                }
            ]
        }
      
    
        this.handleChange = this.handleChange.bind(this);
        this.handleAction = this.handleAction.bind(this);


    }  
    
    handleAction(e) {
        // console.log(e.target.id);
        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index];
        var option =  optionElement.getAttribute('actionid');
        console.log(option);
        
        this.setState({ [e.target.name]: e.target.value , actioncategoryid : option,showValidationfaulty:false}, ()=> {
          console.log(this.state.actioncategoryid);
          
        });
        
      }

      MarkResolved(id){
          console.log(this.props.enquiryCode);
        TTCEapi.isResolved(this.props.enquiryCode).then((response)=>{
            if(response.data.valid)
            {
            this.setState({
                isResolved : response.data.data,
                concernsolved:true,
                 },()=>{
                console.log(this.state.isResolved);
                customToast.success("Mark Resolved!!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                  });
                //   browserHistory.push("/concernsolved?orderid="+id)

            });
        }
        });
      }
           
    backoperation(){
        // browserHistory.push("/buyerOrders"); 
        browserHistory.goBack(); 
    }

    handleChange(e) {
        const { name, value } = e.target;
        console.log(value);
        this.setState({ [name]: value,showValidationMoq: false ,showValidationfaulty:false}, () => {
       
        });
    }

    submit(){
        if(this.state.description&&this.state.actioncategoryid>0){
            this.setState({
                rejectButtonClick:true
            })
                // let params = queryString.parse(this.props.location.search);
                // console.log(params.orderid);
                // this.setState({
                //     enquiryCode:params.orderid
                // })
                TTCEapi.sendFaultyOrderArtisan(this.props.enquiryCode,this.state.description,this.state.actioncategoryid).then((response)=>{
                    console.log(this.props.enquiryCode,this.state.description,this.state.actioncategoryid);
                    if(response.data.valid)
                    {
                    this.setState({
                        sendFaultyOrder : response.data.data,
                         dataload : true,},()=>{
                        console.log(this.state.sendFaultyOrder);
                    });
                    // document.getElementById('SureModal').style.display='none';
                    customToast.success("Sent Successfully!!", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
                      this.componentDidMount()
                }
                else{
                    // document.getElementById('SureModal').style.display='none';
                    customToast.error(response.data.errorMessage, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
                }
                this.setState({
                    rejectButtonClick:false
                })
              
                });       
        }
        else{
            this.setState({
                showValidationfaulty:true
            })
        }
        
           
    }

    SureModalclose = () => {
        document.getElementById('SureModal').style.display='none';
        
    }

    SureModalShow(){
        if(this.state.description &&  (this.state.accepted.filter(function(s) { return s.comment; }).length)>0)
            {
        document.getElementById('SureModal').style.display='block';
                   
    }
    else{        
            this.setState({
                showValidationfaulty:true

            })
        }
      }

      goToChatButton = (id) => {
        localStorage.setItem("goToChatButtonEnquiryId", id);    
        browserHistory.push("/buyerChat");            
      }
  
    componentDidMount(){
      
        // let params = queryString.parse(this.props.location.search);
        // console.log(params.orderid);
        // this.setState({
        //     enquiryCode:params.orderid
        // })
        TTCEapi.getSingleOrder(this.props.enquiryCode).then((response)=>{
            if(response.data.valid)
            {
            this.setState({
                 getSingleOrder : response.data.data[0].openEnquiriesResponse,
                 dataload : true,},()=>{
                console.log(this.state.getSingleOrder);
            });
        }
        });
        TTCEapi.getAllRefBuyerReview().then((response)=>{
            if(response.data.valid)
            {
            this.setState({
                getAllRefBuyerReview : response.data.data,
                 dataload : true,},()=>{
                console.log(this.state.getAllRefBuyerReview);
            });
        }
        });
        TTCEapi.getAllRefArtisanReview().then((response)=>{
            if(response.data.valid)
            {
            this.setState({
                getAllRefArtisanReview : response.data.data,
                 dataload : true,},()=>{
                console.log(this.state.getAllRefArtisanReview);
            });
        }
        });
        TTCEapi.getOrderProgress(this.props.enquiryCode).then((response)=>{
            if(response.data.valid)
            {
            this.setState({
                getOrderProgress :response.data.data.orderProgress,                
                artisanReviewId:response.data.data.orderProgress.artisanReviewId==null?this.state.artisanReviewId=0:1,
                OrderDetails:response.data.data,               
                dataload : true,},()=>{
                console.log(this.state.getOrderProgress);
            });
            if(response.data.data.orderProgress !=null&&response.data.data.orderProgress.buyerReviewId){
                this.setState({
                    OrderDetails:response.data.data,              
                    getOrderProgress :response.data.data.orderProgress,
                    buyerReviewComment:response.data.data.orderProgress.buyerReviewComment,
                    artisanReviewId:response.data.data.orderProgress.artisanReviewId==null?this.state.artisanReviewId=0:1,


                })
                var buyerReviewId=response.data.data.orderProgress.buyerReviewId;
                var SplitbuyerId=buyerReviewId.split(",");
                console.log(SplitbuyerId);
                for(var i=0;i<SplitbuyerId.length;i++){
                    var id=SplitbuyerId[i]
                 const typeElements = this.state;
                 const updatedHeaders = [...typeElements.accepted];
                 updatedHeaders[parseInt(id)-1] = {
                     id: parseInt(id),
                     comment: true,
                         };
                 var that = this;
                 that.setState({
                     accepted: updatedHeaders,
                 });
                 
                 var arr = this.state.accepted 
                 console.log(arr);
                 console.log(this.state.accepted.filter(function(s) { return s.comment; }).length)
                }
            }
           
                // console.log(response.data.data.artisanReviewId);
            
      
        }
        });
        // /enquiry/getOrderProgress/1707
    }
    
    render() {
        return (
            <React.Fragment>
              
            
                    {this.state.dataload?
                    <>
                  {this.state.concernsolved?
                  <>
                  <FaultResolved
                  enquiryCode={this.props.enquiryCode}
                  buyer={this.state.buyer}/>
                  </>
                :
                <>
                    <Row noGutters={true} className="">
                           <Col sm = "1" className="col-xs-2">
                           <img
                                       src={logos.backarrowicon}
                                       className="margin-cparrow cparrowsize glyphicon"
                                        onClick={() => this.backoperation()}
                            ></img>
                          
                          </Col>
                            <Col className="col-xs-10">
                                    <Row noGutters={true} className ="cp1heading cp1headingtr  ">
                                    <Col className="col-xs-11" style={{fontSize:"27px"}}>
                                        <b style={{color:"rgb(196, 18, 28)"}}>Fault Raised</b> for your Order id:  <b className="oidt">{this.state.getSingleOrder.orderCode}</b>                                    
                                        <p className="faultyp1">We are trying to resolve any issues you faced.</p>
                                        <p className="a48hrs" style={{fontSize:"16px"}}>Please bear, It may take upto 48 hrs for Artisan to address & respond to your raised concern.</p>
                                    </Col>
                                    <Col className="col-xs-1">
                                         <button className="buddlechatbtn" onClick={() => this.goToChatButton(this.state.getSingleOrder.enquiryId)}
                                         style={{marginRight:"10px",height:"30px"}}>
                                          <img src={logos.chatwhite} style={{height:"14px",marginTop:"-40px"}}/></button></Col>
                                    </Row> 
                                    <Row noGutters={true}>
                                        <Col className="col-xs-4 orderdettxt" sm={2}>
                                            Order Details
                                        </Col>
                                        <Col className="col-xs-4 faulttxt" sm={2}>
                                            Fault raised
                                        </Col>
                                        <Col className="col-xs-4 orderdettxt" sm={2}>
                                            Date:{ this.state.currentDate }
                                        </Col>
                                    </Row>
                                    <Row noGutters={true} style={{marginBottom:"20px"}}>
                                        <Col className="col-xs-4 eqidfault" sm={3}>
                                            Enquiry Id:{this.state.getSingleOrder.orderCode}
                                        </Col>
                                        <Col className="col-xs-4 madeorderpurp" sm={2}>
                                            {this.state.OrderDetails.productType}
                                        </Col>
                                        <Col className="col-xs-4 eqidfault" sm={2}>
                                            Brand:<span style={{color:"blue"}}>{ this.state.OrderDetails.brand }</span>
                                        </Col>
                                        <Col className="col-xs-4 eqidfault" sm={1}>
                                            {this.state.OrderDetails.totalAmount!=null?this.state.OrderDetails.totalAmount:"NA"}
                                        </Col>
                                        <Col className="col-xs-4 dispatcheddate" sm={2} style={{color:"rgb(190, 31, 105)"}}>
                                        Dispatched on:
                                            {this.state.getOrderProgress.orderDispatchDate !=null?
                                             <Moment format="DD-MM-YYYY">
                                             {this.state.getOrderProgress.orderDispatchDate }
                                           </Moment>
                                           :
                                           "NA"
                                            }
                                        </Col>
                                        <Col className="col-xs-4 dispatcheddate" sm={2} style={{color:"rgb(222, 143, 102)"}}>
                                            Arrived on:{ this.state.getOrderProgress.orderReceiveDate !=null?
                                            this.state.getOrderProgress.orderReceiveDate:"NA" }
                                        </Col>
                                    </Row>

                                    <Row noGutters={true}>
                                        <Col className="col-xs-12 dispatcheddate borderdashstyle" sm={6}>
                                            <h3 className="descfaulth3">Description of fault</h3>
                                            {this.state.getAllRefBuyerReview.map((data,key)=> 
                                            <>
                                            {this.state.accepted[data.id-1].comment?
                                            <>
                                            <p className="ptagfaultheading"><b className="faultrecheading">{data.comment}</b> <br/>
                                            {data.subComment}</p>
                                     
                                            </>
                                            :
                                            <>
                                            </>
                                             } 
                                             </>
                                            )}
                                             <p className="faultrecheading">Note</p>
                                            <p className="ptagfaultheading" style={{marginTop:"-10px",overflow:"auto"}}>{this.state.buyerReviewComment}</p>
                                        </Col>
                                        <Col className="col-xs-12 dispatcheddate" sm={6}>
                                            <h3 className="remarkbyartfa">Remark by Artisan Entrepreneur</h3>
                                                                                

                                            <div 
                                            className="descfaultybox"
                                             style={{width:"433px",border:"transparent",color:"rgb(35, 146, 112)",overflow:"auto"}}

                                            >
                                {this.state.getOrderProgress.artisanReviewComment}
                                             </div>
                                        </Col>
                                    </Row>
                            <Row noGutters={true}>
                            <Col className="col-xs-9"></Col>
                                <Col className="col-xs-3">
                                <span>
                                          <button
                                            disabled={this.state.rejectButtonClick}
                                            style={{backgroundColor:"rgb( 21, 154, 47)",border:"rgb( 21, 154, 47)"}}
                                            className="senddelButton"
                                            onClick={()=>this.MarkResolved(this.props.enquiryCode)}>
                                            Mark Resolved</button>
                                          </span>
                                </Col>
                            </Row>
                                               
                          </Col>                            
                </Row>             
                
                </>
                }
                   
                
                
                    </>
                    :
                    <Row noGutters={true}>
                    <Col className="col-xs-12  text-center">
                       Loading data ..
                    </Col>
                </Row>
                    }
              
              
             
               
                
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    // debugger;
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(BuyerFaultyOrderMarkResolve);
export default connectedLoginPage;
