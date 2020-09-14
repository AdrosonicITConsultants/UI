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
import { BuyerFaultyOrderMarkResolve } from './BuyerFaultyOrderMarkResolve';
export class BuyerFaultyOrder extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            ongoingEnquiry:true,
            enquiryCode:"",
            getSingleOrder:[],
            getAllRefBuyerReview:[],
            sendFaultyOrder:[],
            getOrderProgress:[],
            dataload:false,
            description:"",
            showValidationfaulty:false,
            rejectButtonClick:false,
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
      
        this.FaultyOrderSelect = this.FaultyOrderSelect.bind(this);
        this.FaultyOrderUnSelect = this.FaultyOrderSelect.bind(this);

        this.handleChange = this.handleChange.bind(this);

    }  
    // /enquiry/faultyOrderBuyer/1699/Nothing/1%2C3 
    FaultyOrderSelect(id){
        console.log("select")
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
      }   

      FaultyUnOrderSelect(id){
        console.log("Unselect")
        const typeElements = this.state;
        const updatedHeaders = [...typeElements.accepted];
        updatedHeaders[parseInt(id)-1] = {
            id: parseInt(id),
            comment: false,
                };
        var that = this;
        that.setState({
            accepted: updatedHeaders,
        });
        
        var arr = this.state.accepted 
        console.log(arr);
      }
     
           
    backoperation(){
        browserHistory.push("/buyerOrders"); 
    }

    handleChange(e) {
        const { name, value } = e.target;
        console.log(value);
        this.setState({ [name]: value,showValidationMoq: false ,showValidationfaulty:false}, () => {
       
        });
    }

    submit(){
        this.setState({
            rejectButtonClick:true
        })
            var dummy=""
            for(var i in this.state.accepted) {
                if(this.state.accepted[i].comment === true) {
                    dummy += parseInt(i)+1 + "%2C";
                }
            }
            dummy = dummy.substring(0, dummy.length - 3);
            console.log(dummy);
            let params = queryString.parse(this.props.location.search);
            console.log(params.orderid);
            this.setState({
                enquiryCode:params.orderid
            })
            TTCEapi.sendFaultyOrder(params.orderid,this.state.description,dummy).then((response)=>{
                console.log(params.orderid,this.state.description,dummy);
                if(response.valid)
                {
                this.setState({
                    sendFaultyOrder :response,
                     dataload : true,},()=>{
                    console.log(this.state.sendFaultyOrder);
                });
                document.getElementById('SureModal').style.display='none';
                customToast.success("Your report is sent to Artisan", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                  });
                  this.componentDidMount()
            }
            else{
                document.getElementById('SureModal').style.display='none';
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
        TTCEapi.getOrderProgress(params.orderid).then((response)=>{
            if(response.data.valid)
            {
            this.setState({
                getOrderProgress : response.data,
                 dataload : true,},()=>{
                console.log(this.state.getOrderProgress);
            });
            if(response.data.data.orderProgress !=null&&response.data.data.orderProgress.buyerReviewId){
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
                    
                    {this.state.getOrderProgress||this.state.getOrderProgress.data.orderProgress.artisanReviewId == null?
                    <>
                     {this.state.getSingleOrder.comment !=null?
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
                                     <b>Report a Fault in your Order id:</b>  <b className="oidt">{this.state.getSingleOrder.orderCode}</b>
                                      <p className="faultyp1">If you find something is faulty and beyond acceptable,please raise your concern here.</p>
                                     {this.state.getSingleOrder.orderReceiveDate==null ?
                                     ""
                                    :
                                    <p className="faultyp2">
                                    <DaysRemaining startday = {this.state.getSingleOrder.orderReceiveDate}>
                                      </DaysRemaining>
                                      <span> days left to report a problem.</span> </p>
                                    }
                                     
                                  </Col>
                                  </Row> 
                            
                                <Row noGutters={true} >
                                <Col className="col-xs-12">
                                        <h3 className="fontplay faultyheading">Uh Oh!!!!</h3>
                                        <p className="faultyp2" style={{textAlign:"center"}}>Please let us know what went wrong so that we can take it up.</p>
                                    </Col>
                                </Row>
                                <div className="brokenthreadbg">
                            </div>
                                <Row noGutters={true}>
                                <Col className="col-xs-12">
                                        <h3 className=" faultyheading" style={{fontSize:"15px"}}><b>Select if any of the options are relevant.</b></h3>
                                        <p className="faultyp2" style={{textAlign:"center"}}>
                                            Make sure to choose the right option or else choose others & simply describe your problem in comments below.
                                            </p>
                                    </Col>
                                </Row>
{/* ----------------------------------------------------------------------------------------------------------------------------- */}

<Row noGutters={true}style={{textAlign:"center"}}>

{this.state.getAllRefBuyerReview.map((data,key)=> 

<>
{data.id<4?
<>
{this.state.accepted[data.id-1].comment?
    <Col className="col-xs-4 " style={{textAlign:"center"}} >
                                     <div className="faultyreason2" style={{padding:"10px"}}>
                                       <b> {data.comment}</b>
                                       <p>{data.subComment}</p>
                                     </div>
                                    </Col>
                                    :
                                    <Col className="col-xs-12 " sm="4" style={{textAlign:"center"}} 
                                   >
                                     <div className="faultyreason" style={{padding:"10px"}}
                                      >
                                       <b> {data.comment}</b>
                                       <p>{data.subComment}</p>
                                     </div>
                                    </Col>
}
                    </>
                        :
                    <>
                    {this.state.accepted[data.id-1].comment?
                    <>
                        <Col className="col-xs-1"></Col>
                            <Col className="col-xs-12 " sm="4" style={{textAlign:"center",marginTop:"20px"}}
                             >
                                     <div className="faultyreason2" style={{padding:"10px"}}>
                                     <b> {data.comment}</b>
                                     <p>{data.subComment}</p>
                                     </div>
                                    </Col>
                     </>
                                    :
                     <>
                                    <Col className="col-xs-1"></Col>
                                    <Col className="col-xs-12 " sm="4" style={{textAlign:"center",marginTop:"20px"}}
                                        >
                                             <div className="faultyreason" style={{padding:"10px"}}>
                                             <b> {data.comment}</b>
                                             <p>{data.subComment}</p>
                                             </div>
                                            </Col>
                       </>
                     }

                        </>
                        }
                                            
                                                        
                        </>)}
                        </Row>
                               
                               
{/* ----------------------------------------------------------------------------------------------------------------------------- */}
                                <Row noGutters={true}>
                                    <Col className="col-xs-5"> </Col>
                                    <Col className="col-xs-2"><hr className="hrlinefault"></hr> </Col>
                                    <Col className="col-xs-5"> </Col>
                                </Row>
                                <Row noGutters={true} style={{marginTop:"0px"}}>
                                <Col className="col-xs-12" style={{textAlign:"center"}}>
                                        <h3 className=" faultyheading" style={{fontSize:"15px"}}><b>Description of the problem (Mandatory).</b></h3>
                                       <textarea className="descfaultybox" placeholder="type your problem here" 
                                       maxLength="500"
                                       name="description"
                                       id="description"
                                        value={this.state.getOrderProgress.data.orderProgress.buyerReviewComment }
                                       disabled></textarea>
                                    </Col>
                                    
                                </Row>
                                <Row noGutters={true}>
                                    <Col className="col-xs-5"> </Col>
                                    <Col className="col-xs-2"><hr className="hrlinefault"></hr> </Col>
                                    <Col className="col-xs-5"> </Col>
                                </Row>

                                <Row noGutters={true}>
                                <Col className="col-xs-12">
                                        <p className="faultyp2" style={{textAlign:"center"}}>
                                            Please Note:Hand made products are prone to few minor defects,which makes it unique to the style & tradition of the culture
                                            <br/>
                                            Also it is mark of authenticity.We humbly request you to respect & trust the artisans' on the same before raising any concern.
                                            </p>
                                    </Col>
                                </Row>
                                                                
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
                                     <b>Report a Fault in your Order id:</b>  <b className="oidt">{this.state.getSingleOrder.orderCode}</b>
                                      <p className="faultyp1">If you find something is faulty and beyond acceptable,please raise your concern here.</p>
                                     {this.state.getSingleOrder.orderReceiveDate==null ?
                                     ""
                                    :
                                    <p className="faultyp2">
                                    <DaysRemaining startday = {this.state.getSingleOrder.orderReceiveDate}>
                                      </DaysRemaining>
                                      <span> days left to report a problem.</span> </p>
                                    }
                                     
                                  </Col>
                                  </Row> 
                            
                                <Row noGutters={true} >
                                <Col className="col-xs-12">
                                        <h3 className="fontplay faultyheading">Uh Oh!!!!</h3>
                                        <p className="faultyp2" style={{textAlign:"center"}}>Please let us know what went wrong so that we can take it up.</p>
                                    </Col>
                                </Row>
                                <div className="brokenthreadbg">
                            </div>
                                <Row noGutters={true}>
                                <Col className="col-xs-12">
                                        <h3 className=" faultyheading" style={{fontSize:"15px"}}><b>Select if any of the options are relevant.</b></h3>
                                        <p className="faultyp2" style={{textAlign:"center"}}>
                                            Make sure to choose the right option or else choose others & simply describe your problem in comments below.
                                            </p>
                                    </Col>
                                </Row>
{/* ----------------------------------------------------------------------------------------------------------------------------- */}

<Row noGutters={true}style={{textAlign:"center"}}>

{this.state.getAllRefBuyerReview.map((data,key)=> 

<>
{data.id<4?
<>
{this.state.accepted[data.id-1].comment?
    <Col className="col-xs-4 " style={{textAlign:"center"}} onClick={()=>{this.FaultyUnOrderSelect(data.id)}} >
                                     <div className="faultyreason2" style={{padding:"10px"}}>
                                       <b> {data.comment}</b>
                                       <p>{data.subComment}</p>
                                     </div>
                                    </Col>
                                    :
                                    <Col className="col-xs-12 " sm="4" style={{textAlign:"center"}} 
                                   >
                                     <div className="faultyreason" style={{padding:"10px"}}
                                       onClick={()=>{this.FaultyOrderSelect(data.id)}}>
                                       <b> {data.comment}</b>
                                       <p>{data.subComment}</p>
                                     </div>
                                    </Col>
}
                    </>
                        :
                    <>
                    {this.state.accepted[data.id-1].comment?
                    <>
                        <Col className="col-xs-1"></Col>
                            <Col className="col-xs-12 " sm="4" style={{textAlign:"center",marginTop:"20px"}}
                            onClick={()=>{this.FaultyUnOrderSelect(data.id)}} >
                                     <div className="faultyreason2" style={{padding:"10px"}}>
                                     <b> {data.comment}</b>
                                     <p>{data.subComment}</p>
                                     </div>
                                    </Col>
                     </>
                                    :
                     <>
                                    <Col className="col-xs-1"></Col>
                                    <Col className="col-xs-12 " sm="4" style={{textAlign:"center",marginTop:"20px"}}
                                        onClick={()=>{this.FaultyOrderSelect(data.id)}}>
                                             <div className="faultyreason" style={{padding:"10px"}}>
                                             <b> {data.comment}</b>
                                             <p>{data.subComment}</p>
                                             </div>
                                            </Col>
                       </>
                     }

</>
}
                      
                                
</>)}
</Row>
                               
                               
{/* ----------------------------------------------------------------------------------------------------------------------------- */}
                                <Row noGutters={true}>
                                    <Col className="col-xs-5"> </Col>
                                    <Col className="col-xs-2"><hr className="hrlinefault"></hr> </Col>
                                    <Col className="col-xs-5"> </Col>
                                </Row>
                                <Row noGutters={true} style={{marginTop:"0px"}}>
                                <Col className="col-xs-12" style={{textAlign:"center"}}>
                                        <h3 className=" faultyheading" style={{fontSize:"15px"}}><b>Description of the problem (Mandatory).</b></h3>
                                       <textarea className="descfaultybox" placeholder="type your problem here" 
                                       maxLength="500"
                                       name="description"
                                       id="description"
                                        // value={this.state.description }
                                        onChange={this.handleChange}></textarea>
                                    </Col>
                                    
                                </Row>
                                <Row noGutters={true}>
                                    <Col className="col-xs-5"> </Col>
                                    <Col className="col-xs-2"><hr className="hrlinefault"></hr> </Col>
                                    <Col className="col-xs-5"> </Col>
                                </Row>

                                <Row noGutters={true}>
                                <Col className="col-xs-12">
                                        <p className="faultyp2" style={{textAlign:"center"}}>
                                            Please Note:Hand made products are prone to few minor defects,which makes it unique to the style & tradition of the culture
                                            <br/>
                                            Also it is mark of authenticity.We humbly request you to respect & trust the artisans' on the same before raising any concern.
                                            </p>
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
                                <Col className="col-xs-12 "style={{textAlign:"center"}}>
                                <button className="submitfaulty"
                                  onClick={()=>this.SureModalShow()}>Submit</button>
                                     
                                    </Col>
                                </Row>
                                <Row noGutters={true}>
                                <Col className="col-xs-12">
                                        <p className="faultyp2" style={{textAlign:"center"}}>
                                      <span>Upload photos (IN CHAT) for reference <button className="buddlechatbtn">
                                          <img src={logos.chatwhite} style={{height:"15px"}}/></button></span>                
                                          </p>
                                    </Col>
                                </Row>
                          </Col>                            
                </Row>
               {/* _________________________________________SureModal_________________________________________________ */}
                      
<div id="SureModal"class="w3-modal" style={{paddingTop:"70px"}}>
                                        <div class="w3-modal-content w3-animate-top Modalbgfault modalfaultwidth">
                                            <div class="w3-container buyerMOQAcceptModalContainer">
                                                <Row noGutters={true}>
                                                    <Col className="col-xs-12 fontplay modalsurec">
                                                        Sure?
                                                    </Col>
                                                </Row>
                                                <Row noGutters={true}>
                                                    <Col className="col-xs-12 fontplay modalparafault">
                                                        If you want to review before sending,
                                                        <br/>you can still do it.
                                                    </Col>
                                                </Row>
                                                <Row noGutters={true}>
                                                    <Col className="col-xs-12 fontplay modalparafault">
                                                       Please note that,if the order is beyond repair or <br/>
                                                       the issue is not addressable,we would escalate it to the
                                                        <br/>admin.The final decision shall be an agreement.
                                                    </Col>
                                                </Row>
                                                <div className="brokenthreadbg">
                                                                 </div>
                                           <hr className="buyerMOQAcceptModalHr"/>
                                            <div className="buyerMOQAcceptModalButtonOuter">
                                                <span  
                                                 onClick={()=>this.SureModalclose()}
                                                className="buyerMOQAcceptModalCancelButton">Cancel</span>
                                             
                                                <span >
                                                    <button
                                                    style={{background:"rgb(196, 18, 28)",border:"none"}}
                                                    disabled={this.state.rejectButtonClick}
                                                    onClick={()=>this.submit()}
                                                    className="senddelButton">
                                                        Yes,Submit
                                                    </button></span>
                                            </div>
                                            </div>
                                            
                                        </div>
                                        </div>


{/* ___________________________________________________________________________________________________ */}
                    </>
                    }
                    </>
                    :
                    <>
                    <BuyerFaultyOrderMarkResolve
                    enquiryCode={this.state.enquiryCode}
                    />
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
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    // debugger;
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(BuyerFaultyOrder);
export default connectedLoginPage;
