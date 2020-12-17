import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import queryString from 'query-string';
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import TTCEapi from '../../services/API/TTCEapi';
import Footer from "../footer/footer";
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify"
import Diffdays from '../BuyerOrder/Diffdays';
import Moment from 'react-moment';
export class CompletedFaultResolved extends Component {
    constructor(props) {
        super(props);
        var today = new Date(),
        date = today.getDate()+ '.'+ (today.getMonth() + 1) + '.' + today.getFullYear() ;

        this.state = {
            currentDate: date,
            ongoingEnquiry:true,
            enquiryCode:"",
            getClosedOrder:[],
            getAllRefBuyerReview:[],
            sendFaultyOrder:[],
            getOrderProgress:[],
            OrderDetails:[],
            getAllRefArtisanReview:[],
            Allorderdata:[],
            dataload:false,
            description:"",
            showValidationfaulty:false,
            rejectButtonClick:false,
            buyerReviewComment:"",
            actioncategoryid : 0,
            artisanReviewComment:-1,
            collapse:false,
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
        this.collpase = this.collpase.bind(this);


    }  
    
    handleAction(e) {
        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index];
        var option =  optionElement.getAttribute('actionid');
        this.setState({ [e.target.name]: e.target.value , actioncategoryid : option,showValidationfaulty:false}, ()=> {
          
        });
        
      }
      collpase(){
          this.setState({
              collapse:!this.state.collapse
          })
      }
    backoperation(){
        browserHistory.push("/artisanOrders"); 
    }
    backoperation2(){
        browserHistory.push("/buyerOrders"); 
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value,showValidationMoq: false ,showValidationfaulty:false}, () => {
       
        });
    }

    reviewPageButton = (id, code, data) => {
        var user = JSON.parse(localStorage.getItem("user"));

        if(user.refRoleId == 1) {
            localStorage.removeItem("ratingEnquiryCode");
            localStorage.setItem("ratingEnquiryCode", code);
            browserHistory.push("/artisanRating?code=" + id);
        }
        else if(user.refRoleId == 2) {
            localStorage.removeItem("ratingEnquiryCode");
            localStorage.removeItem("ratingSelectedEnquirydata");
            localStorage.setItem("ratingEnquiryCode", code);
            localStorage.setItem("ratingSelectedEnquirydata", JSON.stringify(data));
            browserHistory.push("/buyerRating?code=" + id);
        }        
    }

    submit(){
        if(this.state.description&&this.state.actioncategoryid>0){
            this.setState({
                rejectButtonClick:true
            })
                TTCEapi.sendFaultyOrderArtisan(this.props.enquiryCode,this.state.description,this.state.actioncategoryid).then((response)=>{
                    if(response) {
                    if(response.data.valid)
                    {
                    this.setState({
                        sendFaultyOrder : response.data.data,
                         dataload : true,},()=>{
                    });
                    customToast.success("Sent Successfully!!", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
                      this.componentDidMount()
                }
                else{
                    customToast.error(response.data.errorMessage, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
                }
            }
            else{
              browserHistory.push("/404error");
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

        var user = JSON.parse(localStorage.getItem("user"));

        if(user.refRoleId == 1) {
            browserHistory.push("/artisanChat");
        }
        else if(user.refRoleId == 2) {
            browserHistory.push("/buyerChat");
        }
        
    }
  
    componentDidMount(){
       TTCEapi.getClosedOrder(this.props.enquiryCode).then((response)=>{
        if(response) {
            if(response.data.valid)
            {
            this.setState({
                 getClosedOrder : response.data.data[0].openEnquiriesResponse,
                 dataload : true,},()=>{
            });
        }
    }
    else{
      browserHistory.push("/404error");
    }
        });
        TTCEapi.getAllRefBuyerReview().then((response)=>{
            if(response) {
            if(response.data.valid)
            {
            this.setState({
                getAllRefBuyerReview : response.data.data,
                 dataload : true,},()=>{
            });
        }
    }
    else{
      browserHistory.push("/404error");
    }
        });
        TTCEapi.getAllRefArtisanReview().then((response)=>{
            if(response) {
            if(response.data.valid)
            {
            this.setState({
                getAllRefArtisanReview : response.data.data,
                 dataload : true,},()=>{
            });
        }
    }
    else{
      browserHistory.push("/404error");
    }
        });
        TTCEapi.getOrderProgress(this.props.enquiryCode).then((response)=>{
            if(response) {
            if(response.data.valid)
            {
            this.setState({
                getOrderProgress :response.data.data.orderProgress,  
                OrderDetails:response.data.data,              
                artisanReviewId:response.data.data.orderProgress.artisanReviewId==null?this.state.artisanReviewId=0:1,
                 dataload : true,},()=>{
            });
            if(response.data.data.orderProgress !=null&&response.data.data.orderProgress.buyerReviewId){
                this.setState({
                    getOrderProgress :response.data.data.orderProgress,
                    buyerReviewComment:response.data.data.orderProgress.buyerReviewComment,
                    artisanReviewId:response.data.data.orderProgress.artisanReviewId==null?this.state.artisanReviewId=0:1,
                    OrderDetails:response.data.data,              


                })
                var buyerReviewId=response.data.data.orderProgress.buyerReviewId;
                var SplitbuyerId=buyerReviewId.split(",");
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
                }
            }
        }
    }
    else{
      browserHistory.push("/404error");
    }
        });
    }
    
    render() {
        return (
            <React.Fragment>
              

                    {this.state.dataload?
                    <>
                  
                   <>
                     <Row noGutters={true} className="">
                         {this.props.artisan?
                          <Col sm = "1" className="col-xs-2">
                          <img
                                      src={logos.backarrowicon}
                                      className="margin-cparrow cparrowsize glyphicon"
                                       onClick={() => this.backoperation()}
                           ></img>
                         
                         </Col>
                         :
                         <Col sm = "1" className="col-xs-2">
                         <img
                                     src={logos.backarrowicon}
                                     className="margin-cparrow cparrowsize glyphicon"
                                      onClick={() => this.backoperation2()}
                          ></img>
                        
                        </Col>
                         }
                          
                            <Col className="col-xs-10">
                                    <Row noGutters={true} className ="cp1heading cp1headingtr  ">
                                    <Col className="col-xs-11" style={{fontSize:"27px"}}>
                                        <b style={{color:"rgb( 21, 154, 47)"}}>Concern Resolved</b> for Order id:  <b className="oidt">{this.state.getClosedOrder.orderCode}</b>                                    
                                        <p className="faultyp1">We are trying to resolve any issues you faced.</p>
                                        <p className="a48hrs" style={{fontSize:"16px"}}>
                                            We're glad that your concern is resolved on mutual agreement.</p>
                                    </Col>
                                    <Col className="col-xs-1">
                                         <button className="buddlechatbtn" onClick={() => this.goToChatButton(this.state.getClosedOrder.enquiryId)}
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
                                            Enquiry Id:{this.state.getClosedOrder.orderCode}
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
                                        <Col className="col-xs-4 viewdefectresp" onClick={()=>this.collpase()}>
                                            View defets & response 
                                            {this.state.collapse?
                                             <i class="fa fa-chevron-up fafaiconcol" aria-hidden="true"></i>
                                             :
                                             <i class="fa fa-chevron-down fafaiconcol" aria-hidden="true"></i>
                                          }
                                           


                                        </Col>
                                    </Row>
                            {this.state.collapse?
                            <>
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
                                             style={{width:"433px",border:"transparent",color:"rgb(35, 146, 112)"}}
                                            >
                                {this.state.getOrderProgress.artisanReviewComment}
                                             </div>
                                        </Col>
                                    </Row>
                      
                            </>
                              :
                             <>
                             <Row noGutters={true}>
                                 <Col className="col-xs-12" style={{textAlign:"center",marginTop:"45px"}}>
                                 <button
                                style={{fontSize:"15px"}}
                                onClick={() => this.reviewPageButton(parseInt(this.props.enquiryCode), this.state.getClosedOrder.orderCode, this.state.getClosedOrder)}
                                className="buyerMOQAcceptModalOkayButton raterevbtn">
                                    <img src={logos.ratereview} className="raterevbtnimg"/>
                                Rate & Review this order
                            </button>
                                 </Col>
                             </Row>
                             <Row noGutters={true}>
                            

                                 <Col className="col-xs-12 " style={{textAlign:"center"}}>
                                 <p className="gretajob " style={{textAlign:"center"}}>
                                     Great Job!

                             </p>
                                   <img src={logos.greenbigsmile} className="greenbigsmile" />
                                 </Col>
                             </Row>
                             </>
                             }
                                       
                                               
                          </Col>                            
                </Row>             
                  
                   </>
                
                
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
    // 
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(CompletedFaultResolved);
export default connectedLoginPage;
