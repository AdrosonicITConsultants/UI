import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import TTCEapi from '../../services/API/TTCEapi';
import Moment from 'react-moment';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useTranslation, withTranslation } from "react-i18next";

export class ArtisanOngoingOrder extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            enquiryStagesMTO :[],
            stage: 3,
            openEnquiries: [],
            productCategories: [],
            yarns : [],
            enquiryStagesAvailable:[],
            getOrderProgress:[],
            dataload:false,
            orderReceivedCurrentId: 0,
            orderReceivedModalOkButtonDisable: false,
            dispatchRCButtonDisable: false,
            orderRecreateModalOkButtonDisable: false,
            orderRCSelectedId: 0,
            innerEnquiryStages: [],
        }
        
    } 
    ToggleDelete = () => {
        document.getElementById('id01').style.display='block';
       }

       ToggleDeleteClose = () => {
        document.getElementById('id01').style.display='none';
       }
    ToggleDelete22 = (id) => {
        document.getElementById('id09'+ id).style.display='block';
       }

       ToggleDeleteClose22 = (id) => {
        document.getElementById('id09'+ id).style.display='none';
       }    
       FaultReport(id){
        localStorage.removeItem("faulty");
        localStorage.setItem("faulty", "ongoingorder");
           browserHistory.push("/artisanfaultreport?orderid="+id)
       } 
    componentDidMount(){
        TTCEapi.getProductUploadData().then((response)=>{
            if(response.data.valid)
            {   
                TTCEapi.getEnquirStages().then((response)=>{
                    if(response.data.valid)
                    {
                        var rr = response.data.data;
                        rr[0].desc = "Quotation Accepted";
                        rr[1].desc = "Order Details";
                        this.setState({enquiryStagesMTO:rr})
                    }
                })
                TTCEapi.getEnquirStagesforAvailable().then((response)=>{
                    if(response.data.valid)
                    {
                        this.setState({enquiryStagesAvailable:response.data.data})
                    }
                })
                TTCEapi.getInnerEnquirStages().then((response)=>{
                    if(response.data.valid)
                    {
                        this.setState({innerEnquiryStages:response.data.data})
                    }
                })
               
                this.setState({productCategories: response.data.data.productCategories,
                    yarns: response.data.data.yarns },()=>{
                        TTCEapi.getOpenOrders().then((response1)=>{
                            if(response1.data.valid)
                            {   
                                this.setState({
                                    openEnquiries:response1.data.data, 
                                    dataload:true
                                });
                            }
                        })
                    });
            }
        })
        
        
    } 
    individualpage(id){
        browserHistory.push("/artisanorder?code=" + id)
    }
    daysleft(name)
    {
        var someDate = new Date(name);
                                var numberOfDaysToAdd = 10;
                                someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
                                var todayDate= new Date();
                                const diffTime =  someDate - todayDate ;
                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                                return(diffDays);
    }

    orderReceivedModal = (enquiryId) => {
        this.setState({
            orderReceivedCurrentId: enquiryId,
        });
        document.getElementById('orderReceivedModal').style.display='block';
    }

    orderReceivedModalClose = () => {
        document.getElementById('orderReceivedModal').style.display='none';
    }

    orderReceivedModalOkButton = () => {
        this.setState({
            orderReceivedModalOkButtonDisable: true
        });


        TTCEapi.updateFaultyOrderStatusArtisan(this.state.orderReceivedCurrentId, 1).then((response)=>{
            if(response.data.valid)
            {   
                document.getElementById('orderReceivedModal').style.display='none';
                this.setState({
                    orderReceivedModalOkButtonDisable: false,
                });
                this.componentDidMount();
                customToast.success(response.data.data, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                });
            }
            else {
                document.getElementById('orderReceivedModal').style.display='none';
                this.setState({
                    orderReceivedModalOkButtonDisable: false,
                });
                customToast.error("Status not updated", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                });
            }
        });
    }

    dispatchRCFunction = (id) => {
        this.setState({
            dispatchRCButtonDisable: true
        });
        TTCEapi.orderDispatchAfterRecreation(id).then((response)=>{
            if(response.data.valid)
            {   
                this.componentDidMount();
                this.setState({
                    dispatchRCButtonDisable: false,
                });
                customToast.success(response.data.data, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                });
            }
            else {
                this.setState({
                    dispatchRCButtonDisable: false,
                });
                customToast.error("Status not updated", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                });
            }
        });
    }

    orderRCFunction = (id) => {
        this.setState({
            orderRCSelectedId: id,
        })
        document.getElementById('orderRecreateModal').style.display='block';
    }

    orderRecreateModalClose = () => {
        document.getElementById('orderRecreateModal').style.display='none';
    }

    orderRecreateModalOkButton = () => {
        this.setState({
            orderRecreateModalOkButtonDisable: true,
        });
        TTCEapi.recreateOrder(this.state.orderRCSelectedId).then((response)=>{
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

    goToChatButton = (id) => {
        localStorage.setItem("goToChatButtonEnquiryId", id);
        browserHistory.push("/artisanChat");
    }
 
    render() {
        return (
            <React.Fragment>
                {this.state.dataload && this.state.openEnquiries.length >= 0 && this.state.enquiryStagesMTO.length > 0 && 
                this.state.enquiryStagesAvailable.length > 0 && this.state.innerEnquiryStages.length > 0
                ?
                <>
                   <br></br>
                   <br></br>
                {this. state.openEnquiries.length == 0
                ?
                <>
                <Row noGutters={true}>
                    <Col className="col-xs-12 text-center noopenenq">
                    No Ongoing Order.
                   </Col>
                </Row>
                </>
                :
                <>
                {this.state.openEnquiries.map((item)=> 
                <>
                {item.openEnquiriesResponse.historyProductId == null
                ?
                <>
                {/* for no change in product data */}
             
                <Row noGutters={true} id={item.enquiryId}>
                    <Col className="col-xs-1"></Col>
                    <Col className="col-xs-10">
                    <Row noGutters={true}>
                            <Col className="col-xs-12 convertedDate">
                            {this.props.t("Pages.object.Converted to order on")} :
                                <Moment format="DD-MM-YYYY">
                                {item.openEnquiriesResponse.orderCreatedOn}
                                </Moment>     
                            </Col>
                        </Row>
                        <Row noGutters={true}>
                            <Col sm="9">
                                {item.openEnquiriesResponse.userStatus === 1 ?
                                <div className="imageinlist" > 
                                    <div className="imageinlist1"> 
                                    {
                                        item.openEnquiriesResponse.productType === "Product"
                                        ?
                                        <a href={"/showArtisanProduct?ProductId="+item.openEnquiriesResponse.productId }><img  src={TTCEapi.ImageUrl +"Product/" + item.openEnquiriesResponse.productId + "/" + item.openEnquiriesResponse.productImages.split(",")[0]} className="enquiryimage"></img>
                                        </a>
                                        :
                                        <a href={"/showBuyerProduct?productId="+item.openEnquiriesResponse.productId }><img  src={TTCEapi.ImageUrl +"CustomProduct/" + item.openEnquiriesResponse.productId + "/" + item.openEnquiriesResponse.productImages.split(",")[0]} className="enquiryimage"></img>
                                        </a>

                                    }

                                    </div>
                                    
                                    <a href={"/showArtisanProduct?ProductId="+item.openEnquiriesResponse.productId } className="leEnqprodName">{item.openEnquiriesResponse.productName}</a>
                                    {/* <span ></span> */}
                                    
                                </div>
                                :
                                <div className="imageinlist" > 
                                    <div className="imageinlist1"> 
                                    {
                                        item.openEnquiriesResponse.productType === "Product"
                                        ?
                                        <img  src={TTCEapi.ImageUrl +"Product/" + item.openEnquiriesResponse.productId + "/" + item.openEnquiriesResponse.productImages.split(",")[0]} className="enquiryimage"></img>
                                        
                                        :
                                        <img  src={TTCEapi.ImageUrl +"CustomProduct/" + item.openEnquiriesResponse.productId + "/" + item.openEnquiriesResponse.productImages.split(",")[0]} className="enquiryimage"></img>
                                        
                                    }

                                    </div>
                                    
                                    {item.openEnquiriesResponse.productName}
                                    {/* <span ></span> */}
                                    
                                </div>
                                }
                                <div>
                                <div noGutters={true} >
                                                <Col className="leEnqid bold">
                                                {this.props.t("Pages.object.Order Id")} : {item.openEnquiriesResponse.orderCode}
                                                </Col>
                                            </div>
                                            {item.openEnquiriesResponse.userStatus === 1 ?
                                            <div noGutters={true} >
                                                <Col className="lesmallEnqid bold">
                                                {this.props.t("Pages.object.Enquiry id")} : <a href={'/buyerEnquiryDetails?code='+item.openEnquiriesResponse.enquiryId }>{item.openEnquiriesResponse.enquiryCode}</a>
                                                </Col>
                                            </div>
                                            : 
                                            <div noGutters={true} >
                                                <Col className="lesmallEnqid bold">
                                                {this.props.t("Pages.object.Enquiry id")} : {item.openEnquiriesResponse.enquiryCode}
                                                </Col>
                                            </div>
                                            }
                                  <div noGutters={true} >
                                      <Col >
                                      <span className="leEnqtype bold ">{this.state.productCategories[item.openEnquiriesResponse.productCategoryId - 1].productDesc} </span> 
                                      <span className="leEnqspun"> / {item.openEnquiriesResponse.warpYarnId ? this.state.yarns[item.openEnquiriesResponse.warpYarnId - 1 ].yarnDesc : "NA"}  X  {item.openEnquiriesResponse.weftYarnId ? this.state.yarns[item.openEnquiriesResponse.weftYarnId - 1 ].yarnDesc : "NA"}  
                                        {item.openEnquiriesResponse.extraWeftYarnId > 0 
                                        ?
                                        <>
                                        X  {this.state.yarns[item.openEnquiriesResponse.extraWeftYarnId - 1 ].yarnDesc}
                                        </>
                                        :
                                            <></>
                                        }</span> 
                                      </Col>
                                  </div>
                                  <div noGutters={true} className="" >
                                      <Col className="leEnqprodcode ">
                                          {item.openEnquiriesResponse.productType === "Product"
                                          ?
                                          <>
                                         {this.props.t("Pages.object.Product Code")} : {item.openEnquiriesResponse.productCode}   
                                          </>
                                          :
                                          <>
                                          {this.props.t("Pages.object.Product Code")} : NA  
                                          </>
                                          }
                                                                            
                                      </Col>
                                  </div>
                               
                                  <div noGutters={true} className="" >
                                      <Col className="leEnqprodtype ">
                                          {item.openEnquiriesResponse.productStatusId==2? "Available in stock"   : ""   }
                                          {item.openEnquiriesResponse.productStatusId==1? "Made to order"   : ""   }
                                          {item.openEnquiriesResponse.productStatusId==null? "Requested Custom Design"   : ""   }
                                                                  
                                      </Col>

                                  </div>
                                  <div noGutters={true} className="" >
                                      <Col className="leEnqprodcode ">
                                          <span className="leEnqprodbn ">{this.props.t("Pages.object.Brand Name")} : </span>
                                          <span className="leEnqbrandname ">{item.brandName ?item.brandName :"NA" }</span>                                   
                                      </Col>
                                  </div>
                                </div>
                            </Col>
                            <Col sm="3" className="text-right">
                                <div noGutters={true} >
                                      <Col className="leEnqOrderAmount ">
                                      {this.props.t("Pages.object.Order Amount")}
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqAmount bold">
                                        {item.openEnquiriesResponse.totalAmount > 0 ? "₹"+ item.openEnquiriesResponse.totalAmount : "NA"} 
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidDateStarted">
                                      {this.props.t("Pages.object.Date started")} : 
                                      <Moment format="DD-MM-YYYY">
                                        {item.openEnquiriesResponse.startedOn}
                                        </Moment>
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidLastUpdated">
                                      {this.props.t("Pages.object.Last updated")} : 
                                      <Moment format="DD-MM-YYYY">
                                     {item.openEnquiriesResponse.lastUpdated}
                                        </Moment>
                                        
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidEstDelivery">
                                      {this.props.t("Pages.object.Est Date of delivery")} : 
                                      {item.openEnquiriesResponse.excpectedDate != null 
                                      ?
                                      <Moment format="DD-MM-YYYY">
                                        {item.openEnquiriesResponse.excpectedDate}
                                        </Moment>
                                      :
                                      "NA"
                                      }
                                      
                                      </Col>
                                </div>                                
                            </Col>
                            {item.openEnquiriesResponse.userStatus === 2 ?
                                <div className="userInactiveText bold">User Inactive</div>
                            : null }
                        </Row>
                    </Col>

                    
                </Row>

                {item.openEnquiriesResponse.userStatus === 1 ? 
                <>
                { item.openEnquiriesResponse.enquiryStageId == 10 && item.openEnquiriesResponse.deliveryChallanLabel!=null
                    ?
                    <>
                     <hr></hr>
                     <Row noGutters={true}>
                     <Col className="col-xs-1"></Col>
                         <Col className="col-xs-4">
                         <img src={logos.truck} className="truckimg"/>  {this.props.t("Pages.object.check")}
                         <a style= {{marginLeft:"5px"}} href={TTCEapi.DeliveryReceiptUrl + item.openEnquiriesResponse.enquiryId + "/" + item.openEnquiriesResponse.deliveryChallanLabel} target="_blank">
                         {this.props.t("Pages.object.delivery receipt")}</a>
                         </Col>
                         <Col className="col-xs-6 notetruck">{this.props.t("Pages.object.This order will be marked as auto complete 10 days after Estimated date of delivery if no input")} 
                         <br/> {this.props.t("Pages.object.is received for delivery confirmation from your end We'll also consider order to be non faulty in that case")} </Col>
                         <Col className="col-xs-1"></Col>
                     </Row>
                    </>
                    :
                    <>
                    </>
                      }
                <hr/>
                
                {item.openEnquiriesResponse.isReprocess === 1 ?
                <>
                <Row noGutters={true}>
                    <Col className="col-xs-offset-1 col-xs-11">
                        <p className="orderRecreationP1TagStyle">{this.props.t("Pages.object.Order under Recreation")}</p>
                        <p className="orderRecreationP2TagStyle">{this.props.t("Pages.object.Kindly keep updating buyer about the status of product over chat")}</p>
                    </Col>
                </Row>
                <hr/>
                </>
                : null }
                
                <Row noGutters={true} style={{marginBottom: "20px"}}>
                   {item.openEnquiriesResponse.isNewGenerated === 1 ?
                    item.openEnquiriesResponse.isProductReturned === 1 ?
                    <>
                    <Col className="col-xs-2 col-xs-offset-1 text-center">
                        <input type="button" className="orderReceivedDisableButtonStyle" value ={this.props.t("Pages.object.Order received back")}></input>
                    </Col>
                    <Col className="col-xs-6"></Col>
                    </>
                    :
                    <>
                    <Col className="col-xs-2 col-xs-offset-1 text-center">
                        <input type="button" className="enqreqbtn" value ={this.props.t("Pages.object.Order received back")} 
                        onClick={() => this.orderReceivedModal(item.openEnquiriesResponse.enquiryId)}></input>
                    </Col>
                    <Col className="col-xs-6"></Col>
                    </>
                    :  
                    <Col className="col-xs-9"></Col>
                    }
                    <Col className="col-xs-2">
                        <input type="button" className="enqreqbtn" onClick={() => this.goToChatButton(item.openEnquiriesResponse.enquiryId)} 
                        value ={this.props.t("Pages.object.go to this enquiry chat")}></input>
                    </Col>
                </Row>

                {item.openEnquiriesResponse.comment?
                <>
                <hr/>
                 <Row noGutters={true}>
                 <Col className="col-xs-1"></Col>
                 <Col className="col-xs-3">
                    {
                        (item.openEnquiriesResponse.isReprocess === null) && (item.openEnquiriesResponse.artisanReviewId === 2) ?
                           this.state.dispatchRCButtonDisable === true ?
                            <input type="button" className="orderReceivedDisableButtonStyle" value ={this.props.t("Pages.object.Mark order dispatched after recreation")}></input>
                            :
                            <div className="dispatchRCButton" onClick={() => this.orderRCFunction(item.openEnquiriesResponse.enquiryId)}>
                                {this.props.t("Pages.object.Order recreation")}
                            </div>
                        : null
                    }
                 </Col>
                 <Col className="col-xs-4" style={{textAlign:"center"}}>            
                  <button className="rateUnusualButton"  onClick={()=>this.FaultReport(item.openEnquiriesResponse.enquiryId)}>
                  <img src={logos.esc} className="raterevbtnimg"/> 
                  {this.props.t("Pages.object.Check concern raised by buyer")}
                        </button>
                 </Col>
                </Row>
                </>
                :
                ""
                }
                
                {item.openEnquiriesResponse.isReprocess === 1 ?
                <>
                <hr/>
                <Row noGutters={true}>
                    <Col className="col-xs-offset-1 col-xs-11">
                        {this.state.dispatchRCButtonDisable === true ?
                        <input type="button" className="orderReceivedDisableButtonStyle" value ={this.props.t("Pages.object.Mark order dispatched after recreation")}></input>
                        :
                        <div className="dispatchRCButton" onClick={() => this.dispatchRCFunction(item.openEnquiriesResponse.enquiryId)}>
                         {this.props.t("Pages.object.Mark order dispatched after recreation")}
                        </div>
                        }
                    </Col>
                </Row>
                </>
                : null }

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
                        <Col className="col-xs-12 text-center">
                        {this.state.orderRecreateModalOkButtonDisable === true ?
                        <span className="chatEscalationModalDisableButtonOuter">Confirm</span>
                        : 
                        <span className="chatEscConfirmModalOkButton" onClick={() => this.orderRecreateModalOkButton()}>Confirm</span>
                        }
                        </Col>
                    </Row>
                    
                </div>
            </div>
        </div>
               
                <Row noGutters={true} className="mt7">
                <Col className="col-xs-1"></Col>
                    <Col className="col-xs-10">
                       <Row noGutters={true}>
                           <Col className="col-xs-12 leEnqstatus bold">
                           {this.props.t("Pages.object.Order Status")}
                           </Col>
                       </Row>
                    </Col>
                </Row>
                <Row noGutters={true} className="mt7">
                {/* <Col className="col-xs-1"></Col> */}
                    <Col className="col-xs-12">
                       <Row noGutters={true}>
                           <Col className="col-xs-12 ">
                           <div className="progressbarfont">
                            <br /><br />
                            {item.openEnquiriesResponse.productStatusId === 2
                            ?
                            <ul className="list-unstyled multi-steps">
                                {this.state.enquiryStagesAvailable.map((item1) => <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId == item1.orderStages.id ? "is-active": " "} >{item1.orderStages.desc}</li> )     }
                                <li >Completed</li>
                                </ul>
                            :
                            <>
                            {
                                    (item.openEnquiriesResponse.changeRequestStatus == 1) || (item.openEnquiriesResponse.changeRequestStatus == 3)
                                    ?
                                    <img src={logos.cricon} className="cricon"></img>
 
                                    :
                                    null
 
                                }
                            { item.isBlue== 1
                                ?
                                <>
                                 <ul className="list-unstyled multi-steps">
                            {this.state.enquiryStagesMTO.map((item1) => 
                            <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId + 1 == item1.id ? "is-active wait": " "} >{}{item.openEnquiriesResponse.enquiryStageId == 5 && item1.id == 5 && item.openEnquiriesResponse.innerEnquiryStageId < 5 ? <> Work in Progress<br></br>
                            {/* {this.state.innerEnquiryStages[item.openEnquiriesResponse.innerEnquiryStageId -1].stage} */}
                            {this.state.innerEnquiryStages[item.openEnquiriesResponse.innerEnquiryStageId - 1].stage}
                            <br></br>
                            <span className="seemore" onClick={()=>{this.ToggleDelete22(item.openEnquiriesResponse.enquiryId)}}>see more</span>
                            </> : item1.desc}</li>
                             )     }
                            <li >Completed</li>
                            </ul>
                                </>
                                :
                                <ul className="list-unstyled multi-steps">
                                {this.state.enquiryStagesMTO.map((item1) => 
                                <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId == item1.id ? "is-active": " "} >{}{item.openEnquiriesResponse.enquiryStageId == 5 && item1.id == 5 && item.openEnquiriesResponse.innerEnquiryStageId < 5 ? <> Work in Progress<br></br>
                                {/* {this.state.innerEnquiryStages[item.openEnquiriesResponse.innerEnquiryStageId -1].stage} */}
                                {this.state.innerEnquiryStages[item.openEnquiriesResponse.innerEnquiryStageId - 1].stage}
                                <br></br>
                                <span className="seemore" onClick={()=>{this.ToggleDelete22(item.openEnquiriesResponse.enquiryId)}}>see more</span>
                                </> : item1.desc}</li>
                                 )     }
                                <li >Completed</li>
                                </ul>
                            
                            }
                           
                            </>
                                }

                            </div>
                                                              
                    <div id={"id09"+item.openEnquiriesResponse.enquiryId} class="w3-modal">
                        <div class="w3-modal-content w3-animate-top modalBoxSizeCS">
                            <div>
                            <Row noGutters={true}>
                                <Col className="col-xs-12 CSheading">
                                   
                                </Col>
                            </Row>
                            </div>
                        <div class="w3-container">
                            <span 
                            onClick={()=>{this.ToggleDeleteClose22(item.openEnquiriesResponse.enquiryId)}} 
                            class="w3-button w3-display-topright cWhite">x</span>
                            <br></br>
                            <Row noGutters={true}>
                                {item.openEnquiriesResponse.productStatusId === 2
                                ?
                                <>  
                                {item.openEnquiriesResponse.enquiryCode}
                                </>
                                :
                                <>
                                 {this.state.innerEnquiryStages.map((item1) => 
                                   
                                    <Col className="col-xs-12 mb7">
                                        {item1.id <= (item.openEnquiriesResponse.innerEnquiryStageId) ?  <div className="greenButtonstatus"></div> :<div className="greyButtonstatus"></div> } 
                            
                                    {item1.stage }
                                    </Col>
                                    
                                    )} 
                                </>
                                }
                                
                               
                                </Row>
                              
                                <br></br>
                                
                            </div>
                            </div>
                        </div>
 

                           </Col>
                       </Row>
                    </Col>
                </Row>
                </> : null }
                

                </> 
                :
                <>
                <hr></hr>
                <Row noGutters={true} id={item.enquiryId}>
                    <Col className="col-xs-1"></Col>
                    <Col className="col-xs-10">
                    <Row noGutters={true}>
                                <Col className="col-xs-12 convertedDate">
                                {this.props.t("Pages.object.Converted to order on")} :
                                    <Moment format="DD-MM-YYYY">
                                    {item.openEnquiriesResponse.orderCreatedOn}
                                    </Moment>     
                                </Col>
                            </Row>
                        <Row noGutters={true}>
                            <Col sm="9">
                                {item.openEnquiriesResponse.userStatus === 1 ?
                                <div className="imageinlist" > 
                                    <div className="imageinlist1"> 
                                    {
                                        item.openEnquiriesResponse.productType === "Product"
                                        ?
                                        <a href={"/showArtisanProduct?ProductHistoryId="+item.openEnquiriesResponse.historyProductId }><img  src={TTCEapi.ImageUrl +"HistoryProduct/" + item.openEnquiriesResponse.historyProductId + "/" + item.openEnquiriesResponse.productHistoryImages.split(",")[0]} className="enquiryimage"></img>
                                        </a>
                                        :
                                        <a href={"/showBuyerProduct?ProductHistoryId="+item.openEnquiriesResponse.historyProductId }><img  src={TTCEapi.ImageUrl +"HistoryCustomProduct/" + item.openEnquiriesResponse.historyProductId + "/" + item.openEnquiriesResponse.productHistoryImages.split(",")[0]} className="enquiryimage"></img>
                                        </a>

                                    }

                                    </div>
                                    
                                    <a href={"/showArtisanProduct?ProductHistoryId="+item.openEnquiriesResponse.historyProductId } className="leEnqprodName">{item.openEnquiriesResponse.productHistoryName}</a>
                                    {/* <span ></span> */}
                                    
                                </div>
                                :
                                <div className="imageinlist" > 
                                    <div className="imageinlist1"> 
                                    {
                                        item.openEnquiriesResponse.productType === "Product"
                                        ?
                                        <img  src={TTCEapi.ImageUrl +"HistoryProduct/" + item.openEnquiriesResponse.historyProductId + "/" + item.openEnquiriesResponse.productHistoryImages.split(",")[0]} className="enquiryimage"></img>
                                       
                                        :
                                       <img  src={TTCEapi.ImageUrl +"HistoryCustomProduct/" + item.openEnquiriesResponse.historyProductId + "/" + item.openEnquiriesResponse.productHistoryImages.split(",")[0]} className="enquiryimage"></img>
                                      

                                    }

                                    </div>
                                    
                                    {item.openEnquiriesResponse.productHistoryName}
                                    {/* <span ></span> */}
                                    
                                </div>
                                }
                                <div>
                                <div noGutters={true} >
                                        <Col className="leEnqid bold">
                                        {this.props.t("Pages.object.Order Id")} : {item.openEnquiriesResponse.enquiryCode}
                                        </Col>
                                    </div>
                                    <div noGutters={true} >
                                        <Col className="lesmallEnqid bold">
                                        {this.props.t("Pages.object.Enquiry id")} : {item.openEnquiriesResponse.enquiryCode}
                                        </Col>
                                    </div>
                                  <div noGutters={true} >
                                      <Col >
                                      <span className="leEnqtype bold ">{this.state.productCategories[item.openEnquiriesResponse.productCategoryHistoryId - 1].productDesc} </span> 
                                      <span className="leEnqspun"> / {item.openEnquiriesResponse.warpYarnHistoryId ? this.state.yarns[item.openEnquiriesResponse.warpYarnHistoryId - 1 ].yarnDesc : "NA"}  X  {item.openEnquiriesResponse.weftYarnHistoryId ? this.state.yarns[item.openEnquiriesResponse.weftYarnHistoryId - 1 ].yarnDesc : "NA"}  
                                        {item.openEnquiriesResponse.extraWeftYarnId > 0 
                                        ?
                                        <>
                                        X  {this.state.yarns[item.openEnquiriesResponse.extraWeftYarnHistoryId - 1 ].yarnDesc}
                                        </>
                                        :
                                            <></>
                                        }</span> 
                                      </Col>
                                  </div>
                                  <div noGutters={true} className="" >
                                      <Col className="leEnqprodcode ">
                                          {item.openEnquiriesResponse.productType === "Product"
                                          ?
                                          <>
                                           {this.props.t("Pages.object.Product Code")} : {item.openEnquiriesResponse.productHistoryCode}   
                                          </>
                                          :
                                          <>
                                           {this.props.t("Pages.object.Product Code")} : NA  
                                          </>
                                          }
                                                                            
                                      </Col>
                                  </div>
                               
                                  <div noGutters={true} className="" >
                                      <Col className="leEnqprodtype ">
                                          {item.openEnquiriesResponse.productStatusHistoryId==2? "Available in stock"   : ""   }
                                          {item.openEnquiriesResponse.productStatusHistoryId==1? "Made to order"   : ""   }
                                          {item.openEnquiriesResponse.productStatusHistoryId==null? "Requested Custom Design"   : ""   }
                                                                  
                                      </Col>

                                  </div>
                                  <div noGutters={true} className="" >
                                      <Col className="leEnqprodcode ">
                                          <span className="leEnqprodbn ">{this.props.t("Pages.object.Brand Name")} : </span>
                                          <span className="leEnqbrandname ">{item.brandName ?item.brandName :"NA" }</span>                                   
                                      </Col>
                                  </div>
                                </div>
                            </Col>
                            <Col sm="3" className="text-right">
                                <div noGutters={true} >
                                      <Col className="leEnqOrderAmount ">
                                      {this.props.t("Pages.object.Order Amount")}
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqAmount bold">
                                        {item.openEnquiriesResponse.totalAmount > 0 ? "₹"+ item.openEnquiriesResponse.totalAmount : "NA"} 
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidDateStarted">
                                      {this.props.t("Pages.object.Date started")} : 
                                      <Moment format="DD-MM-YYYY">
                                        {item.openEnquiriesResponse.startedOn}
                                        </Moment>
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidLastUpdated">
                                      {this.props.t("Pages.object.Last updated")} : 
                                      <Moment format="DD-MM-YYYY">
                                     {item.openEnquiriesResponse.lastUpdated}
                                        </Moment>
                                        
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidEstDelivery">
                                      {this.props.t("Pages.object.Est Date of delivery")} : 
                                      {item.openEnquiriesResponse.excpectedDate != null 
                                      ?
                                      <Moment format="DD-MM-YYYY">
                                        {item.openEnquiriesResponse.excpectedDate}
                                        </Moment>
                                      :
                                      "NA"
                                      }
                                      
                                      </Col>
                                </div>                                
                            </Col>
                            {item.openEnquiriesResponse.userStatus === 2 ?
                                <div className="userInactiveText bold">User Inactive</div>
                            : null }
                        </Row>
                    </Col>

                    
                </Row>

                {item.openEnquiriesResponse.userStatus === 1 ?

                <>
                
                <hr/>

                {item.openEnquiriesResponse.isReprocess === 1 ?
                <>
                <Row noGutters={true}>
                    <Col className="col-xs-offset-1 col-xs-11">
                        <p className="orderRecreationP1TagStyle">{this.props.t("Pages.object.Order under Recreation")}</p>
                        <p className="orderRecreationP2TagStyle">{this.props.t("Pages.object.Kindly keep updating buyer about the status of product over chat")}</p>
                    </Col>
                </Row>
                <hr/>
                </>
                : null }
                
                <Row noGutters={true} style={{marginBottom: "20px"}}>
                    {item.openEnquiriesResponse.isNewGenerated === 1 ?
                    item.openEnquiriesResponse.isProductReturned === 1 ?
                    <>
                    <Col className="col-xs-2 col-xs-offset-1 text-center">
                        <input type="button" className="orderReceivedDisableButtonStyle" value ={this.props.t("Pages.object.Order received back")}></input>
                    </Col>
                    <Col className="col-xs-6"></Col>
                    </>
                    :
                    <>
                    <Col className="col-xs-2 col-xs-offset-1 text-center">
                        <input type="button" className="enqreqbtn" value ={this.props.t("Pages.object.Order received back")} 
                        onClick={() => this.orderReceivedModal(item.openEnquiriesResponse.enquiryId)}></input>
                    </Col>
                    <Col className="col-xs-6"></Col>
                    </>
                    :  
                    <Col className="col-xs-9"></Col>
                    }
                    <Col className="col-xs-2">
                        <input type="button" className="enqreqbtn" onClick={() => this.goToChatButton(item.openEnquiriesResponse.enquiryId)}
                        value ={this.props.t("Pages.object.go to this enquiry chat")}></input>
                    </Col>
                </Row>
                
                <Row noGutters={true} className="mt7">
                <Col className="col-xs-1"></Col>
                    <Col className="col-xs-10">
                       <Row noGutters={true}>
                           <Col className="col-xs-12 leEnqstatus bold">
                           Enquiry Status
                           </Col>
                       </Row>
                    </Col>
                </Row>
                <Row noGutters={true} className="mt7">
                {/* <Col className="col-xs-1"></Col> */}
                    <Col className="col-xs-12">
                       <Row noGutters={true}>
                           <Col className="col-xs-12 ">
                           <div className="progressbarfont">
                            <br /><br />
                            {item.openEnquiriesResponse.productStatusHistoryId === 2
                            ?
                            <ul className="list-unstyled multi-steps">
                                {this.state.enquiryStagesAvailable.map((item1) => <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId == item1.orderStages.id ? "is-active": " "} >{item1.orderStages.desc}</li> )     }
                                <li >Completed</li>
                                </ul>
                            :
                            <>
                            {
                                    (item.openEnquiriesResponse.changeRequestStatus == 1) || (item.openEnquiriesResponse.changeRequestStatus == 3)
                                    ?
                                    <img src={logos.cricon} className="cricon"></img>
 
                                    :
                                    null
 
                                }
                            { item.isBlue== 1
                                ?
                                <>
                                 <ul className="list-unstyled multi-steps">
                            {this.state.enquiryStagesMTO.map((item1) => 
                            <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId + 1 == item1.id ? "is-active wait": " "} >{}{item.openEnquiriesResponse.enquiryStageId == 5 && item1.id == 5 && item.openEnquiriesResponse.innerEnquiryStageId < 5 ? <> Work in Progress<br></br>
                            {/* {this.state.innerEnquiryStages[item.openEnquiriesResponse.innerEnquiryStageId -1].stage} */}
                            {this.state.innerEnquiryStages[item.openEnquiriesResponse.innerEnquiryStageId - 1].stage}
                            <br></br>
                            <span className="seemore" onClick={()=>{this.ToggleDelete22(item.openEnquiriesResponse.enquiryId)}}>see more</span>
                            </> : item1.desc}</li>
                             )     }
                            <li >Completed</li>
                            </ul>
                                </>
                                :
                                <ul className="list-unstyled multi-steps">
                                {this.state.enquiryStagesMTO.map((item1) => 
                                <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId == item1.id ? "is-active": " "} >{}{item.openEnquiriesResponse.enquiryStageId == 5 && item1.id == 5 && item.openEnquiriesResponse.innerEnquiryStageId < 5 ? <> Work in Progress<br></br>
                                {/* {this.state.innerEnquiryStages[item.openEnquiriesResponse.innerEnquiryStageId -1].stage} */}
                                {this.state.innerEnquiryStages[item.openEnquiriesResponse.innerEnquiryStageId - 1].stage}
                                <br></br>
                                <span className="seemore" onClick={()=>{this.ToggleDelete22(item.openEnquiriesResponse.enquiryId)}}>see more</span>
                                </> : item1.desc}</li>
                                 )     }
                                <li >Completed</li>
                                </ul>
                            
                            }
                           
                            </>
                                }

                            </div>
                                                         
                    <div id={"id09"+item.openEnquiriesResponse.enquiryId} class="w3-modal">
                        <div class="w3-modal-content w3-animate-top modalBoxSizeCS">
                            <div>
                            <Row noGutters={true}>
                                <Col className="col-xs-12 CSheading">
                                   
                                </Col>
                            </Row>
                            </div>
                        <div class="w3-container">
                            <span 
                            onClick={()=>{this.ToggleDeleteClose22(item.openEnquiriesResponse.enquiryId)}} 
                            class="w3-button w3-display-topright cWhite">x</span>
                            <br></br>
                            <Row noGutters={true}>
                                {item.openEnquiriesResponse.productStatusId === 2
                                ?
                                <>  
                                {item.openEnquiriesResponse.enquiryCode}
                                </>
                                :
                                <>
                                 {this.state.innerEnquiryStages.map((item1) => 
                                   
                                    <Col className="col-xs-12 mb7">
                                        {item1.id <= (item.openEnquiriesResponse.innerEnquiryStageId) ?  <div className="greenButtonstatus"></div> :<div className="greyButtonstatus"></div> } 
                            
                                    {item1.stage }
                                    </Col>
                                    
                                    )} 
                                </>
                                }
                                
                               
                                </Row>
                              
                                <br></br>
                                
                            </div>
                            </div>
                        </div>
 

                           </Col>
                       </Row>
                    </Col>
                </Row>
                </> : null }
                
                </>
                }
                 
                {item.openEnquiriesResponse.userStatus === 1 ?
                <Row>
                    <Col className="col-xs-12 text-center leEnqshowmore">
                        <a  onClick={()=>this.individualpage(item.openEnquiriesResponse.enquiryId)} className="leEnqshowmore">{this.props.t("Pages.object.show more details")} <img src={logos.Nextarrow} className="showmorearrow"></img></a>
                    </Col>
                </Row>
                : null }

                {item.openEnquiriesResponse.userStatus === 2 ? 
                <div className="userInactiveDivBottom"></div>
                : null }

                <div className="colorbardiv">      
                          <img src={logos.colorbar} className="colorbarimg"></img>
                </div>
                </>
                )}
                </>
                }
                
                </>
            :
            <>
                <Row noGutters={true}>
                <Col className="col-xs-12 text-center">
                Loading Please Wait....
                </Col>
                </Row>
                </>
            }

        <div id="orderReceivedModal" class="w3-modal">
            <div class="w3-modal-content w3-animate-top modalBoxSize">
                <div class="w3-container chatAttachModalOuter">
                    <div className="text-right">
                        <img src={logos.closelogo} className="chatAttachCloseIcon" onClick={this.orderReceivedModalClose}/>
                    </div>
                    <h3 className="artisanChatModalTitle text-center">
                        Are you sure ?
                    </h3>
                    <Row noGutters={true} className="orderReceivedModalButtonMargin">
                        <Col className="col-xs-12 text-center">
                        {this.state.orderReceivedModalOkButtonDisable === true ?
                        <span className="chatEscalationModalDisableButtonOuter">Ok</span>
                        : 
                        <span className="chatEscConfirmModalOkButton" onClick={this.orderReceivedModalOkButton}>Ok</span>
                        }
                        </Col>
                    </Row>
                    
                </div>
            </div>
        </div>
            
                </React.Fragment>
        )
    }
}


export default withTranslation()(ArtisanOngoingOrder);
