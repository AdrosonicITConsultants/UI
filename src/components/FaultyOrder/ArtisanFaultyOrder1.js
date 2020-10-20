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
import Moment from 'react-moment';
import DaysRemaining from './DaysRemaining';
import { FaultResolved } from './FaultResolved';
export class ArtisanFaultyOrder1 extends Component {
    constructor(props) {
        super(props);
        var today = new Date(),
        date = today.getDate()+ '.'+ (today.getMonth() + 1) + '.' + today.getFullYear() ;

        this.state = {
            currentDate: date,
            ongoingEnquiry:true,
            enquiryCode:"",
            getSingleOrder:[],
            getAllRefBuyerReview:[],
            sendFaultyOrder:[],
            getOrderProgress:[],
            getAllRefArtisanReview:[],
            Allorderdata:[],
            dataload:false,
            description:"",
            showValidationfaulty:false,
            rejectButtonClick:false,
            buyerReviewComment:"",
            actioncategoryid : 0,
            artisanReviewComment:-1,
            OrderDetails:[],
            artisanId:-1,
            isResolved:"",
            buyer:false,
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
            ],
            orderRecreateModalOkButtonDisable: false,
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

    orderRecreateModalClose = () => {
        document.getElementById('orderRecreateModal').style.display='none';
    }

    orderRecreateModalOkButton = (id) => {
        this.setState({
            orderRecreateModalOkButtonDisable: true,
        });
        TTCEapi.recreateOrder(id).then((response)=>{
            console.log(response.data.data);
            if(response.data.valid)
            {
                document.getElementById('orderRecreateModal').style.display='none';
                this.componentDidMount();
                customToast.success("Sent Successfully!!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                });
            }
            else{
                customToast.error(response.data.errorMessage, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                });
            }
            this.setState({
                orderRecreateModalOkButtonDisable: false,
            });      
        });       
    }
           
    backoperation(){
        browserHistory.push("/artisanOrders"); 
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
                let params = queryString.parse(this.props.location.search);
                console.log(params.orderid);
                console.log(this.state.actioncategoryid);
                this.setState({
                    enquiryCode:params.orderid
                })
                TTCEapi.sendFaultyOrderArtisan(params.orderid,this.state.description,this.state.actioncategoryid).then((response)=>{
                    console.log(params.orderid,this.state.description,this.state.actioncategoryid);
                    if(response.data.valid)
                    {
                    this.setState({
                        sendFaultyOrder : response.data.data,
                         dataload : true,},()=>{
                        console.log(this.state.sendFaultyOrder);
                    });
                   
                    customToast.success("Sent Successfully!!", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
                      if(this.state.actioncategoryid == 2) {
                        document.getElementById('orderRecreateModal').style.display='block';
                      }
                      this.componentDidMount();
                }
                else{
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
  
    componentDidMount(){
      
        let params = queryString.parse(this.props.location.search);
        console.log(params.orderid);
        this.setState({
            enquiryCode:params.orderid
        })
        TTCEapi.getSingleOrder(params.orderid).then((response)=>{
            if(response.data.valid)
            {
            this.setState({
                 getSingleOrder : response.data.data[0].openEnquiriesResponse,
                },()=>{
                console.log(this.state.getSingleOrder);
            });
        }
        });
        TTCEapi.getAllRefBuyerReview().then((response)=>{
            if(response.data.valid)
            {
            this.setState({
                getAllRefBuyerReview : response.data.data,
                },()=>{
                console.log(this.state.getAllRefBuyerReview);
            });
        }
        });
        TTCEapi.getAllRefArtisanReview().then((response)=>{
            if(response.data.valid)
            {
            this.setState({
                getAllRefArtisanReview : response.data.data,
                },()=>{
                console.log(this.state.getAllRefArtisanReview);
            });
        }
        });
        TTCEapi.getOrderProgress(params.orderid).then((response)=>{
            if(response.data.valid)
            {
            this.setState({
                getOrderProgress : response.data.data.orderProgress,
                OrderDetails:response.data.data,
                isResolved:response.data.data.orderProgress.isResolved,
                artisanId:response.data.data.orderProgress.artisanReviewId?response.data.data.orderProgress.artisanReviewId:0,
                artisanReviewId:response.data.data.orderProgress.artisanReviewId==null?this.state.artisanReviewId=0:1,
                 dataload : true,},()=>{
                console.log(this.state.getOrderProgress);
            });
            if(response.data.data.orderProgress !=null&&response.data.data.orderProgress.buyerReviewId){
                this.setState({
                    getOrderProgress : response.data.data.orderProgress,
                    isResolved:response.data.data.orderProgress.isResolved,
                    OrderDetails:response.data.data,
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
                <NavbarComponent/>
                <Container>
                    {this.state.dataload?
                    <>
                    {this.state.isResolved?
                    <>
                   {/* { browserHistory.push("/concernsolvedartisan?orderid="+this.state.enquiryCode)} */}
                   <FaultResolved
                   enquiryCode={this.state.enquiryCode}
                   buyer={this.state.buyer}/>
                    </>
                :
                <>
                 {this.state.artisanReviewId == 1?
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
                                    <Col className="col-xs-9" style={{fontSize:"27px"}}>
                                        <b style={{color:"rgb(196, 18, 28)"}}>Fault Raised</b> for your Order id:  <b className="oidt">{this.state.getSingleOrder.orderCode}</b>
                                        <p className="faultyp1">Please acknowledge the raised concern to avoid any escalations.</p>
                                        <p className="a48hrs">Please reply before 48 hrs for raised concern.</p>
                                    </Col>
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
                                            <select  className="SelectCategory" 
                                            style={{padding:"5px",fontSize:"15px"}} 
                                            id="cluster"
                                            name="cluster"
                                            disabled 
                                            onChange={(e) => this.handleAction(e)}>
                                                <option key = '0' actionid = '0'  value='Select Cluster'>
                                                {this.state.getAllRefArtisanReview[parseInt(this.state.artisanId)-1].comment}

                                                </option>
                                                
                                            </select>
                                         

                                            <textarea 
                                            className="descfaultybox"
                                             placeholder="Add your comment" 
                                             style={{width:"433px"}}
                                             maxLength="500"
                                             value={this.state.getOrderProgress.artisanReviewComment?this.state.getOrderProgress.artisanReviewComment:"" }
                                             name="description"
                                             id="description"
                                             disabled>

                                             </textarea>
                                        </Col>
                                    </Row>
                            {/* <Row noGutters={true}>
                            <Col className="col-xs-9"></Col>
                                <Col className="col-xs-3">
                                <span><button className="buddlechatbtn" style={{marginRight:"10px",height:"30px"}}>
                                          <img src={logos.chatwhite} style={{height:"14px"}}/></button>
                                          <button
                                            disabled={this.state.rejectButtonClick}
                                            className="senddelButton"
                                            onClick={()=>this.submit()}>
                                            Send</button>
                                          </span>
                                </Col>
                            </Row> */}
                                               
                          </Col>                            
                </Row>             
                  
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
                                    <Col className="col-xs-9" style={{fontSize:"27px"}}>
                                        <b style={{color:"rgb(196, 18, 28)"}}>Fault Raised</b> for your Order id:  <b className="oidt">{this.state.getSingleOrder.orderCode}</b>
                                        <p className="faultyp1">Please acknowledge the raised concern to avoid any escalations.</p>
                                        <p className="a48hrs">Please reply before 48 hrs for raised concern.</p>
                                    </Col>
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
                                            <select  className="SelectCategory" 
                                            style={{padding:"5px",fontSize:"15px"}} 
                                            id="cluster"
                                            name="cluster" 
                                            onChange={(e) => this.handleAction(e)}>
                                                <option key = '0' actionid = '0'  value='Select Cluster'>View action</option>
                                                {this.state.getAllRefArtisanReview.map((item) =>
                                                 <option key =  {item.id}
                                                  actionid={item.id} 
                                                  value={item.comment}>
                                                      {item.comment}
                                                      </option>)}
                                            </select>

                                            <textarea 
                                            className="descfaultybox"
                                             placeholder="Add your comment" 
                                             style={{width:"433px"}}
                                             maxLength="500"
                                             name="description"
                                             id="description"
                                             onChange={this.handleChange}>

                                             </textarea>
                                        </Col>
                                    </Row>
                                    <p className="text-center">
                                  {this.state.showValidationfaulty ? (
                                    <span className="bg-danger"><mark>Please Fill Mandatory Fields</mark></span>     
                                        ) : (
                                            <br />
                                        )}
                                                             </p>
                            <Row noGutters={true}>
                            <Col className="col-xs-9"></Col>
                                <Col className="col-xs-3">
                                <span><button className="buddlechatbtn" style={{marginRight:"10px",height:"30px"}}>
                                          <img src={logos.chatwhite} style={{height:"14px"}}/></button>
                                          <button
                                            disabled={this.state.rejectButtonClick}
                                            className="senddelButton"
                                            onClick={()=>this.submit()}>
                                            Send</button>
                                          </span>
                                </Col>
                            </Row>
                                               
                          </Col>                            
                </Row>             
                  
                </>
                } 
                
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
              
              
             
                </Container>
                <Footer></Footer>

        <div id="orderRecreateModal" class="w3-modal">
            <div class="w3-modal-content w3-animate-top modalBoxSize">
                <div class="w3-container chatAttachModalOuter">
                    <div className="text-right">
                        <img src={logos.closelogo} className="chatAttachCloseIcon" onClick={this.orderRecreateModalClose}/>
                    </div>
                    <h3 className="artisanChatModalTitle text-center">
                        Are you sure you want to recreate order ?
                    </h3>
                    <Row noGutters={true} className="orderReceivedModalButtonMargin">
                        <Col className="col-xs-6 text-center">
                        {this.state.orderRecreateModalOkButtonDisable === true ?
                        <span className="chatEscalationModalDisableButtonOuter">Confirm</span>
                        : 
                        <span className="chatEscConfirmModalOkButton" onClick={() => this.orderRecreateModalOkButton(this.state.getSingleOrder.enquiryId)}>Confirm</span>
                        }
                        </Col>
                        <Col className="col-xs-6 text-center">
                        <span className="chatEscConfirmModalOkButton" onClick={this.orderRecreateModalClose}>Skip</span>                        
                        </Col>
                    </Row>
                    
                </div>
            </div>
        </div>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    // debugger;
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(ArtisanFaultyOrder1);
export default connectedLoginPage;
