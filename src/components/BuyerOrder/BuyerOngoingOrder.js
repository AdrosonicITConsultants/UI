import React, { Component, isValidElement } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import "./Order.css"
import TTCEapi from '../../services/API/TTCEapi';
import Moment from 'react-moment';
import Diffdays from './Diffdays';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import moment from 'moment';
import ModernDatepicker from 'react-modern-datepicker';


export class BuyerOngoingOrder extends Component {
    
    constructor(props) {
        super(props);
       
        var date= moment().format("YYYY-MM-DD")

        this.state = {
            currentDate: date,
            enquiryStagesMTO :[],
            stage: 3,
            openEnquiries: [],
            getOrderProgress:[],
            productCategories: [],
            yarns : [],
            enquiryStagesAvailable:[],
            dataload:false,
            completebtndis:true,
            deliveredDate:"",
            markOrderAsRecieved:[],
            showDeldatevalidation:false,
            orderReceivedCurrentId: 0,
            orderReceivedModalOkButtonDisable: false,
            checked: false,
            innerEnquiryStages : [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);

    }
    handleChangeDate(date) {

        this.setState({
            deliveredDate: date,
            showValidationMoq: false ,completebtndis:false,showDeldatevalidation:false
        },()=>{
        });
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value,showDeldatevalidation: false ,completebtndis:false}, () => {
               });
                 
    
    }
   
    ToggleDelete = () => {
    document.getElementById('id01').style.display='block';
    }
    ToggleDelete22 = (id) => {
    document.getElementById('id09'+ id).style.display='block';
    }
    ToggleDeleteClose22 = (id) => {
    document.getElementById('id09'+ id).style.display='none';
    }
    ToggleDeleteClose = () => {
    document.getElementById('id01').style.display='none';
    } 
    FaultyOrder(id){
         browserHistory.push("/faulty?orderid="+id)
    }
    CompleteOrderShow = (id) => {
        document.getElementById('CompleteOrder'+ id).style.display='block';
       
       }

       CompleteOrderClose = (id) => {
        document.getElementById('CompleteOrder'+ id).style.display='none';
       }

 
    PartialPaymentClose=(id)=>{
        document.getElementById('PartialPayment'+ id).style.display='none';
        this.componentDidMount();
    }
    PartialPaymentShow=(id)=>{
        document.getElementById('PartialPayment'+ id).style.display='block';
    }
    ClosedOrderbutton =(id)=>{
        document.getElementById('CloseOrder'+ id).style.display='none';
         }
       ClosedOrderShow =(id)=>{
        document.getElementById('CloseOrder'+ id).style.display='block';
        }
       ClosedOrderClose =(id)=>{
        document.getElementById('CloseOrder'+ id).style.display='none';
        // this.componentDidMount();
       }
       YesOrderbutton=(id,prodid)=>{
           if(prodid==2){
            TTCEapi.markEnquiryClosed(id).then((response)=>{
                if(response.data.valid)
                {
                    document.getElementById('CloseOrder'+ id).style.display='none';
                    customToast.success("Order closed!", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
                      this.componentDidMount()
                }
            }); 
           }
           else{
             TTCEapi.initializePartialRefund(id).then((response)=>{
            if(response.data.valid  )
            {
             document.getElementById('CloseOrder'+ id).style.display='none';
             document.getElementById('PartialPayment'+ id).style.display='block';

            }
        }); 
        }
         }
 

      Verifybox=(e)=>{
        const { checked, value } = e.target;
        this.setState({
            checked:!this.state.checked,
            
        })
        let { Allartisanid } = this.state;
        if (checked){
              }
                else{
                    this.setState({
                        checked:!this.state.checked,
                        
                    })
                }            
             }
      
       PartialPaymentReceived=(id)=>{
             if(this.state.checked){
            TTCEapi.markEnquiryClosed(id).then((response)=>{
                if(response.data.valid)
                {
                    document.getElementById('PartialPayment'+ id).style.display='none';
                    customToast.success("Order closed!", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
                      this.componentDidMount()
                }
            }); 
                       }
                else{
                    customToast.error("Please agree to Partial Refund Received ", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
                }
       }
       CompleteOrder2Show = (id) => {
        if( this.state.deliveredDate <= this.state.currentDate){
            this.setState({
                completebtndis:false
            })
            TTCEapi.markOrderAsRecieved(id,this.state.deliveredDate).then((response)=>{
                if(response.data.valid)
                {
                    document.getElementById('CompleteOrder'+ id).style.display='none';

           document.getElementById('CompleteOrder2'+ id).style.display='block';
           TTCEapi.markEnquiryClosed(id).then((response)=>{
            if(response.data.valid  )
            {
                customToast.success("Order closed!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                  });
                

            }
        });        
                    this.setState({
                        markOrderAsRecieved: response.data.data
                    })
                }
                else{
                    customToast.error(response.data.errorMessage, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
                }
              });
        }
   else
   this.setState({
    completebtndis:false,
    showDeldatevalidation:true

})
        }
       CompleteOrder2Close = (id) => {
           document.getElementById('CompleteOrder2'+ id).style.display='none';
           this.componentDidMount()
          }
    componentDidMount(){

    TTCEapi.getProductUploadData().then((response)=>{
        if(response.data.valid)
        {    TTCEapi.getEnquirStages().then((response)=>{
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
                            this.setState({openEnquiries:response1.data.data, dataload:true},()=>{
                               
                            });
                            
                        }
                    },()=>{
                        
                    })
                });
        }
    })

  

    }
    individualpage(id){
        browserHistory.push("/buyerorder?code=" + id);
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

    raiseCRTabFunction = (id) => {
        localStorage.setItem("changeRequest", 1);
        browserHistory.push("/buyerorder?code=" + id);
    }
    daysleftFaultyOrder(name)
    {
   
        var someDate = new Date(name);
                                
                                var todayDate= new Date();
                                const diffTime =  someDate - todayDate ;
                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                                return(diffDays);
                                
    }

    reviewPageButton = (id, code, data) => {
        localStorage.removeItem("ratingEnquiryCode");
        localStorage.removeItem("ratingSelectedEnquirydata");
        localStorage.setItem("ratingEnquiryCode", code);
        localStorage.setItem("ratingSelectedEnquirydata", JSON.stringify(data));
        browserHistory.push("/buyerRating?code=" + id);
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


        TTCEapi.updateFaultyOrderStatusBuyer(this.state.orderReceivedCurrentId, 1).then((response)=>{
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

    goToChatButton = (id) => {
        localStorage.setItem("goToChatButtonEnquiryId", id);    
        browserHistory.push("/buyerChat");            
    }
    
    render() {
        return (
            <React.Fragment>
                {this.state.dataload
                ?
                <>
                {this.state.openEnquiries.length === 0 
                ?
                <>
                <Row noGutters={true}>
                    <Col className="col-xs-12  text-center noopenenq">
                    No Ongoing Order.
                    </Col>
                </Row>  
                </>
                :                           
                <>
                {this.state.openEnquiries.map((item)=> 
                    <>
                    {item.openEnquiriesResponse.historyProductId === null
                    ?
                    <>
                        {/* for no change in product data */}
                        
                    <Row noGutters={true} id={item.enquiryId}>
                        <Col className="col-xs-1"></Col>
                        <Col className="col-xs-10">
                        <Row noGutters={true}>
                            <Col className="col-xs-12 convertedDate">
                                Converted to order on :
                                <Moment format="DD-MM-YYYY">
                                {item.openEnquiriesResponse.orderCreatedOn}
                                </Moment>     
                            </Col>
                        </Row>
                            <Row noGutters={true}>
                                <Col sm="9">
                                    {item.openEnquiriesResponse.userStatus === 1 || item.openEnquiriesResponse.userStatus === null ?
                                    <div className="imageinlist" > 
                                        <div className="imageinlist1"> 
                                        {
                                             item.openEnquiriesResponse.productImages !=null?
                                            item.openEnquiriesResponse.productType === "Product"
                                            ?
                                            <a href={"/showBArtisanProduct?productId="+item.openEnquiriesResponse.productId }><img  src={TTCEapi.ImageUrl +"Product/" + item.openEnquiriesResponse.productId + "/" + item.openEnquiriesResponse.productImages.split(",")[0]} className="enquiryimage"></img>
                                            </a>
                                            :
                                            <a href={"/showBuyerProduct?productId="+item.openEnquiriesResponse.productId }><img  src={TTCEapi.ImageUrl +"CustomProduct/" + item.openEnquiriesResponse.productId + "/" + item.openEnquiriesResponse.productImages.split(",")[0]} className="enquiryimage"></img>
                                            </a>
                                            :
                                            <img  src={logos.Smile} className="enquiryimage"></img>
                                        }
                                        </div>
                                            <a href={"/showBArtisanProduct?productId="+item.openEnquiriesResponse.productId } className="leEnqprodName">{item.openEnquiriesResponse.productName}</a>
                                        </div>
                                        :
                                        <div className="imageinlist" > 
                                        <div className="imageinlist1"> 
                                        {
                                             item.openEnquiriesResponse.productImages !=null?
                                            item.openEnquiriesResponse.productType === "Product"
                                            ?
                                            <img  src={TTCEapi.ImageUrl +"Product/" + item.openEnquiriesResponse.productId + "/" + item.openEnquiriesResponse.productImages.split(",")[0]} className="enquiryimage"></img>
                                           
                                            :
                                            <img  src={TTCEapi.ImageUrl +"CustomProduct/" + item.openEnquiriesResponse.productId + "/" + item.openEnquiriesResponse.productImages.split(",")[0]} className="enquiryimage"></img>
                                           :
                                           <img  src={logos.Smile} className="enquiryimage"></img>

                                        }
                                        </div>
                                            {item.openEnquiriesResponse.productName}
                                        </div>
                                        }
                                        <div>
                                            <div noGutters={true} >
                                                <Col className="leEnqid bold">
                                                Order Id : {item.openEnquiriesResponse.orderCode}
                                                </Col>
                                            </div>
                                            {item.openEnquiriesResponse.userStatus === 1 || item.openEnquiriesResponse.userStatus === null ?
                                            <div noGutters={true} >
                                                <Col className="lesmallEnqid bold">
                                                Enquiry Id : <a href={'/buyerEnquiryDetails?code='+item.openEnquiriesResponse.enquiryId }>{item.openEnquiriesResponse.enquiryCode}</a>
                                                </Col>
                                            </div>
                                            :
                                            <div noGutters={true} >
                                                <Col className="lesmallEnqid bold">
                                                Enquiry Id : {item.openEnquiriesResponse.enquiryCode}
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
                            
                                        <div noGutters={true} >
                                        <Col className="leEnqidDateStarted">
                                        Date Started : 
                                        <Moment format="DD-MM-YYYY">
                                            {item.openEnquiriesResponse.startedOn}
                                            </Moment>
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
                                                <span className="leEnqprodbn ">Artisan Brand Name : </span>
                                                <span className="leEnqbrandname ">{item.brandName ? item.brandName : "NA" }</span>                                   
                                            </Col>
                                        </div>
                                    </div>
                                </Col>
                                <Col sm="3" className="text-right">
                                    <div noGutters={true} >
                                        <Col className="leEnqOrderAmount ">
                                        Order Amount
                                        </Col>
                                    </div>
                                    <div noGutters={true} >
                                        <Col className="leEnqAmount bold">
                                            {item.openEnquiriesResponse.totalAmount > 0 ? "₹"+ item.openEnquiriesResponse.totalAmount : "NA"} 
                                        </Col>
                                    </div>                                    
                                    <div noGutters={true} >
                                        <Col className="leEnqidLastUpdated">
                                        Last Updated : 
                                        <Moment format="DD-MM-YYYY">
                                        {item.openEnquiriesResponse.lastUpdated}
                                            </Moment>
                                            
                                        </Col>
                                    </div>
                                    <div noGutters={true} >
                                        <Col className="leEnqidEstDelivery">
                                        Est. Date of delivery : 
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

                    {item.openEnquiriesResponse.userStatus === 1 || item.openEnquiriesResponse.userStatus === null ?
                    <>
                    {item.openEnquiriesResponse.productStatusId === 2 || item.openEnquiriesResponse.enquiryStageId >= 6
                    ?
                    <>
                    </>
                    :
                    <>
                    {item.openEnquiriesResponse.changeRequestOn === 0 
                        ?
                           
                    <Row noGutters={true}>
                    <hr></hr>
                   
                        <Col className="col-xs-1"></Col>
                       
                        <Col className="col-xs-8 ">
                           <span className="CR bold">Change Request: </span> 
                           <span className="disabledtext"> Disabled by Artisan.</span> 
                        </Col>
                        
                        
                        <Col className="col-xs-2">
                        </Col>
                        <Col className="col-xs-1"></Col>

                    </Row>
                    
                        
                        :

                        item.openEnquiriesResponse.changeRequestStatus === 0 ?
                        <Row noGutters={true}>
                        <hr></hr>
                       
                            <Col className="col-xs-1"></Col>
                           
                            <Col className="col-xs-8 ">
                               <span className="CR bold">Change Request: </span> 
                               <span> Awaiting response from Artisan.</span> 
                            </Col>
                            
                            
                            <Col className="col-xs-2">
                            </Col>
                            <Col className="col-xs-1"></Col>
    
                        </Row>
                        : 
                        (item.openEnquiriesResponse.changeRequestStatus === 1) || (item.openEnquiriesResponse.changeRequestStatus === 3)?
                        <Row noGutters={true}>
                        <hr></hr>
                       
                            <Col className="col-xs-1"></Col>
                           
                            <Col className="col-xs-8 ">
                               <span className="CR bold">Change Request: </span> 
                               <span> Accepted by Artisan on <Moment format="DD-MM-YYYY">
                                {item.openEnquiriesResponse.changeRequestModifiedOn}
                            </Moment>.</span> 
                               
                            </Col>
                            
                            
                            <Col className="col-xs-2">
                            </Col>
                            <Col className="col-xs-1"></Col>
    
                        </Row>
                        :
                        item.openEnquiriesResponse.changeRequestStatus === 2 ?
                        <Row noGutters={true}>
                        <hr></hr>
                       
                            <Col className="col-xs-1"></Col>
                           
                            <Col className="col-xs-8 ">
                               <span className="CR bold">Change Request: </span> 
                               <span> Rejected by Artisan on <Moment format="DD-MM-YYYY">
                                {item.openEnquiriesResponse.changeRequestModifiedOn}
                            </Moment>.</span> 
                            </Col>
                            
                            <Col className="col-xs-2">
                            </Col>
                            <Col className="col-xs-1"></Col>
    
                        </Row>
                          :  
                           
                    <Row noGutters={true}>
                    <hr></hr>
                   
                        <Col className="col-xs-1"></Col>
                        { this.daysleft(item.openEnquiriesResponse.orderCreatedOn) > 0
                        ?
                        <Col className="col-xs-8 ">
                           <span className="CR bold">Change Request: </span> 
                           
                               <Diffdays startday = {item.openEnquiriesResponse.orderCreatedOn} >
                               </Diffdays>
                           <span> days Remaining. You can take only single CR untill approved.</span> 
                        </Col>
                        :
                        <Col className="col-xs-8 ">
                           <span className="CR bold">Change Request: </span> 
                           <span> Last date to raise Change Request passed. </span> 
                        </Col>
                        }
                        <Col className="col-xs-2">
                            <input type="button" onClick={() => this.raiseCRTabFunction(item.openEnquiriesResponse.enquiryId)} className="changereqbtn" value ="Raise a change Request"></input>
                        </Col>
                        <Col className="col-xs-1"></Col>

                    </Row>
                     
                        }
                     </> 
                    }
                    {/* change here (order dispatch) */}
                    { (item.openEnquiriesResponse.enquiryStageId == 10) && (item.openEnquiriesResponse.isReprocess === null)
                    ?
                    <>
                     <hr></hr>
                     <Row noGutters={true}>
                     <Col className="col-xs-1"></Col>
                     {item.openEnquiriesResponse.deliveryChallanLabel?
                     <Col className="col-xs-4">
                     <img src={logos.truck} className="truckimg"/>Check
                     <a style= {{marginLeft:"5px"}} href={TTCEapi.DeliveryReceiptUrl + item.openEnquiriesResponse.enquiryId + "/" + item.openEnquiriesResponse.deliveryChallanLabel} target="_blank">
                         delivery receipt</a>
                     </Col>
                     :
                     ""
                     }
                         
                         <Col className="col-xs-6 notetruck">This order will be marked as auto complete 10 days after Estimated date of delivery if no input 
                         <br/> is received for delivery confirmation from your end.We'll also consider order to be non faulty in that case. </Col>
                         <Col className="col-xs-1"></Col>
                     </Row>
                    </>
                    :
                    <>
                    </>
    }
                    <hr></hr>

                {item.openEnquiriesResponse.isReprocess === 1 ?
                <>
                <Row noGutters={true}>
                    <Col className="col-xs-offset-1 col-xs-11">
                        <p className="orderRecreationP1TagStyle">Order under Recreation</p>
                        <p className="orderRecreationP2TagStyle">
                        Kindly refer chats for regular updates and in-case of any inconvenience, 
                        feel free to escalate the issue over chat
                        </p>
                    </Col>
                </Row>
                <hr/>
                </>
                : null }

                    { item.openEnquiriesResponse.enquiryStageId >= 10
                    ?
                    <>
                    <Row noGutters={true} style={{marginBottom: "20px"}}>
                   {item.openEnquiriesResponse.isNewGenerated === 1 ?
                    item.openEnquiriesResponse.isProductReturned === 1 ?
                    <>
                    <Col className="col-xs-2 col-xs-offset-1 text-center">
                        <input type="button" className="orderReceivedDisableButtonStyle" value ="Refund received"></input>
                    </Col>
                    <Col className="col-xs-4"></Col>
                    </>
                    :
                    <>
                    <Col className="col-xs-2 col-xs-offset-1 text-center">
                        <input type="button" className="enqreqbtn" value ="Refund received" 
                        onClick={() => this.orderReceivedModal(item.openEnquiriesResponse.enquiryId)}></input>
                    </Col>
                    <Col className="col-xs-4"></Col>
                    </>
                    :  
                    <Col className="col-xs-7"></Col>
                    }
                     <Col className="col-xs-4">
                       <span>
                       <a style={{color:"black"}} href={TTCEapi.DocumentsURL + "Help.pdf"}
                                    target="_blank">
                      <button className="enqreqbtn needhelpbth">
                        <i class="fa fa-question-circle" aria-hidden="true" style={{marginRight:"6px"}}></i>Need Help</button>
                        </a>
                         <input type="button" className="enqreqbtn" onClick={() => this.goToChatButton(item.openEnquiriesResponse.enquiryId)}
                         value ="Go to this Enquiry chat"></input>

                       </span>

                        </Col>
                </Row>
                    </>
                    :
                    <>
                    <Row noGutters={true} style={{marginBottom: "20px"}}>
                   {item.openEnquiriesResponse.isNewGenerated === 1 ?
                    item.openEnquiriesResponse.isProductReturned === 1 ?
                    <>
                    <Col className="col-xs-2 col-xs-offset-1 text-center">
                        <input type="button" className="orderReceivedDisableButtonStyle" value ="Refund received"></input>
                    </Col>
                    <Col className="col-xs-6"></Col>
                    </>
                    :
                    <>
                    <Col className="col-xs-2 col-xs-offset-1 text-center">
                        <input type="button" className="enqreqbtn" value ="Refund received" 
                        onClick={() => this.orderReceivedModal(item.openEnquiriesResponse.enquiryId)}></input>
                    </Col>
                    <Col className="col-xs-6"></Col>
                    </>
                    :  
                    <Col className="col-xs-9"></Col>
                    }
                    <Col className="col-xs-2">
                        <input type="button" className="enqreqbtn" onClick={() => this.goToChatButton(item.openEnquiriesResponse.enquiryId)}
                        value ="Go to this Enquiry chat"></input>
                    </Col>
                    </Row>
                    </>
                     }
                   
                    {item.openEnquiriesResponse.enquiryStageId < 9?
                    <>
                    {item.openEnquiriesResponse.isPartialRefundReceived==null?
                    <Row noGutters={true}>
                    <Col className="col-xs-1">
                     </Col>
                     <Col className="col-xs-2">
                         <button className="closeorderbtn"
                          onClick={()=>{this.ClosedOrderShow(item.openEnquiriesResponse.enquiryId)}}
                          >Close Order</button>
                     </Col>
                     <Col className="col-xs-9">
                     </Col>
                 </Row>
                 :
                 <Row noGutters={true}>
                       <Col className="col-xs-1">
                        </Col>
                        <Col className="col-xs-3">
                            <button className="closeorderbtn"
                           style={{background:"green",padding:"7px",width:"auto"}}
                             onClick={()=>{this.PartialPaymentShow(item.openEnquiriesResponse.enquiryId)}}
                             > Is Partial Refund Received ?</button>
                        </Col>
                        <Col className="col-xs-8">
                        </Col>
                    </Row>
                    }
                    
                    </>
                    
                    :
                    ""
                    }


                    <Row noGutters={true} className="mt7">
                    <Col className="col-xs-1"></Col>
                        <Col className="col-xs-10">
                        <Row noGutters={true}>
                            <Col className="col-xs-12 leEnqstatus bold">
                            Order Status
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
                                {this.state.enquiryStagesAvailable.map((item1) => <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId === item1.orderStages.id ? "is-active": " "} >{item1.orderStages.desc}</li> )     }
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
                                <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId + 1 === item1.id ? "is-active wait": " "} >{}{item.openEnquiriesResponse.enquiryStageId === 5 && item1.id === 5 && item.openEnquiriesResponse.innerEnquiryStageId < 5 ? <> Work in Progress<br></br>
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
                                    <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId === item1.id ? "is-active": " "} >{}{item.openEnquiriesResponse.enquiryStageId === 5 && item1.id === 5 && item.openEnquiriesResponse.innerEnquiryStageId < 5 ? <> Work in Progress<br></br>
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
                    </>
                    : null}
                  
                    </>
                    :
                    <>
                    
                      <hr></hr>
                    <Row noGutters={true} id={item.enquiryId}>
                        <Col className="col-xs-1"></Col>
                        <Col className="col-xs-10">
                            <Row noGutters={true}>
                                <Col className="col-xs-12 convertedDate">
                                    Converted to order on :
                                    <Moment format="DD-MM-YYYY">
                                    {item.openEnquiriesResponse.orderCreatedOn}
                                    </Moment>     
                                </Col>
                            </Row>
                            <Row noGutters={true}>
                                <Col sm="9">
                                    {item.openEnquiriesResponse.userStatus === 1 || item.openEnquiriesResponse.userStatus === null ?
                                    <div className="imageinlist" > 
                                    <div className="imageinlist1"> 
                                    {
                                         item.openEnquiriesResponse.productImages !=null?
                                        item.openEnquiriesResponse.productType === "Product"
                                        ?
                                        <a href={"/showBArtisanProduct?ProductHistoryId="+item.openEnquiriesResponse.historyProductId }><img  src={TTCEapi.ImageUrl +"HistoryProduct/" + item.openEnquiriesResponse.historyProductId + "/" + item.openEnquiriesResponse.productHistoryImages.split(",")[0]} className="enquiryimage"></img>
                                        </a>
                                        :
                                        <a href={"/showBuyerProduct?ProductHistoryId="+item.openEnquiriesResponse.historyProductId }><img  src={TTCEapi.ImageUrl +"HistoryCustomProduct/" + item.openEnquiriesResponse.historyProductId + "/" + item.openEnquiriesResponse.productHistoryImages.split(",")[0]} className="enquiryimage"></img>
                                        </a>
                                        :
                                        <img  src={logos.Smile} className="enquiryimage"></img>

                                    }

                                    </div>
                                        <a href={"/showBArtisanProduct?ProductHistoryId="+item.openEnquiriesResponse.historyProductId } className="leEnqprodName">{item.openEnquiriesResponse.productHistoryName}</a>                                       
                                    </div>
                                    :
                                    <div className="imageinlist" > 
                                    <div className="imageinlist1"> 
                                    {
                                         item.openEnquiriesResponse.productImages !=null?
                                        item.openEnquiriesResponse.productType === "Product"
                                        ?
                                        <img  src={TTCEapi.ImageUrl +"HistoryProduct/" + item.openEnquiriesResponse.historyProductId + "/" + item.openEnquiriesResponse.productHistoryImages.split(",")[0]} className="enquiryimage"></img>
                                      
                                        :
                                        <img  src={TTCEapi.ImageUrl +"HistoryCustomProduct/" + item.openEnquiriesResponse.historyProductId + "/" + item.openEnquiriesResponse.productHistoryImages.split(",")[0]} className="enquiryimage"></img>
                                       
                                            :
                                            <img  src={logos.Smile} className="enquiryimage"></img>
                                    }

                                    </div>
                                        {item.openEnquiriesResponse.productHistoryName}                                      
                                    </div>
                                    }
                                    <div>
                                    <div noGutters={true} >
                                        <Col className="leEnqid bold">
                                        Order Id : {item.openEnquiriesResponse.enquiryCode}
                                        </Col>
                                    </div>
                                    <div noGutters={true} >
                                        <Col className="lesmallEnqid bold">
                                        Enquiry Id : {item.openEnquiriesResponse.enquiryCode}
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
                                  <div noGutters={true} >
                                        <Col className="leEnqidDateStarted">
                                        Date Started : 
                                        <Moment format="DD-MM-YYYY">
                                            {item.openEnquiriesResponse.startedOn}
                                            </Moment>
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
                                            <span className="leEnqprodbn ">Artisan Brand Name : </span>
                                            <span className="leEnqbrandname ">{item.brandName ? item.brandName : "NA" }</span>                                   
                                        </Col>
                                    </div>
                                    </div>
                                 </Col>
                                <Col sm="3" className="text-right">
                                    <div noGutters={true} >
                                        <Col className="leEnqOrderAmount ">
                                        Order Amount
                                        </Col>
                                    </div>
                                    <div noGutters={true} >
                                        <Col className="leEnqAmount bold">
                                            {item.openEnquiriesResponse.totalAmount > 0 ? "₹"+ item.openEnquiriesResponse.totalAmount : "NA"} 
                                        </Col>
                                    </div>
                                    <div noGutters={true} >
                                        <Col className="leEnqidDateStarted">
                                        Date Started : 
                                        <Moment format="DD-MM-YYYY">
                                            {item.openEnquiriesResponse.startedOn}
                                            </Moment>
                                        </Col>
                                    </div>
                                    <div noGutters={true} >
                                        <Col className="leEnqidLastUpdated">
                                        Last Updated : 
                                        <Moment format="DD-MM-YYYY">
                                        {item.openEnquiriesResponse.lastUpdated}
                                            </Moment>
                                            
                                        </Col>
                                    </div>
                                    <div noGutters={true} >
                                        <Col className="leEnqidEstDelivery">
                                        Est. Date of delivery : 
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

                    {item.openEnquiriesResponse.userStatus === 1 || item.openEnquiriesResponse.userStatus === null ?
                    <>
                    {item.openEnquiriesResponse.productStatusHistoryId === 2 || item.openEnquiriesResponse.enquiryStageId >= 6
                    ?
                    <>
                    </>
                    :
                    <>
                    {item.openEnquiriesResponse.changeRequestOn === 0 
                        ?
                           
                    <Row noGutters={true}>
                    <hr></hr>
                   
                        <Col className="col-xs-1"></Col>
                       
                        <Col className="col-xs-8 ">
                           <span className="CR bold">Change Request: </span> 
                           <span className='disabledtext'> Disabled by Artisan.</span> 
                        </Col>
                        
                        
                        <Col className="col-xs-2">
                        </Col>
                        <Col className="col-xs-1"></Col>

                    </Row>
                    
                    :

                    item.openEnquiriesResponse.changeRequestStatus === 0 ?
                    <Row noGutters={true}>
                    <hr></hr>
                   
                        <Col className="col-xs-1"></Col>
                       
                        <Col className="col-xs-8 ">
                           <span className="CR bold">Change Request: </span> 
                           <span> Awaiting response from Artisan.</span> 
                        </Col>
                        
                        
                        <Col className="col-xs-2">
                        </Col>
                        <Col className="col-xs-1"></Col>

                    </Row>
                    : 
                    (item.openEnquiriesResponse.changeRequestStatus === 1) || (item.openEnquiriesResponse.changeRequestStatus === 3)?
                    <Row noGutters={true}>
                    <hr></hr>
                   
                        <Col className="col-xs-1"></Col>
                       
                        <Col className="col-xs-8 ">
                           <span className="CR bold">Change Request: </span> 
                           <span> Accepted by Artisan on <Moment format="DD-MM-YYYY">
                            {item.openEnquiriesResponse.changeRequestModifiedOn}
                        </Moment>.</span> 
                           
                        </Col>
                        
                        
                        <Col className="col-xs-2">
                        </Col>
                        <Col className="col-xs-1"></Col>

                    </Row>
                    :
                    item.openEnquiriesResponse.changeRequestStatus === 2 ?
                    <Row noGutters={true}>
                    <hr></hr>
                   
                        <Col className="col-xs-1"></Col>
                       
                        <Col className="col-xs-8 ">
                           <span className="CR bold">Change Request: </span> 
                           <span> Rejected by Artisan on <Moment format="DD-MM-YYYY">
                            {item.openEnquiriesResponse.changeRequestModifiedOn}
                        </Moment>.</span> 
                        </Col>
                        
                        <Col className="col-xs-2">
                        </Col>
                        <Col className="col-xs-1"></Col>

                    </Row>
                      :  
                           
                    <Row noGutters={true}>
                    <hr></hr>
                   
                        <Col className="col-xs-1"></Col>
                        { this.daysleft(item.openEnquiriesResponse.orderCreatedOn) > 0
                        ?
                        <Col className="col-xs-8 ">
                           <span className="CR bold">Change Request: </span> 
                           
                               <Diffdays startday = {item.openEnquiriesResponse.orderCreatedOn} >
                               </Diffdays>
                           <span> days Remaining. You can take only single CR untill approved.</span> 
                        </Col>
                        :
                        <Col className="col-xs-8 ">
                           <span className="CR bold">Change Request: </span> 
                           <span> Last date to raise Change Request passed. </span> 
                        </Col>
                        }
                        <Col className="col-xs-2">
                            <input type="button" onClick={() => this.raiseCRTabFunction(item.openEnquiriesResponse.enquiryId)} className="changereqbtn" value ="Raise a change Request"></input>
                        </Col>
                        <Col className="col-xs-1"></Col>

                    </Row>
                     
                        }
                     </>  
                    }
                    {/* order dispatch change here */}
                    { (item.openEnquiriesResponse.enquiryStageId == 10) && (item.openEnquiriesResponse.isReprocess === null)
                    ?
                    <>
                     <hr></hr>
                     <Row noGutters={true}>
                     <Col className="col-xs-1"></Col>
                     {item.openEnquiriesResponse.deliveryChallanLabel?
                     <Col className="col-xs-4">
                     <img src={logos.truck} className="truckimg"/>Check
                     <a style= {{marginLeft:"5px"}} href={TTCEapi.DeliveryReceiptUrl + item.openEnquiriesResponse.enquiryId + "/" + item.openEnquiriesResponse.deliveryChallanLabel} target="_blank">
                         delivery receipt</a>
                     </Col>
                     :
                     ""
                     }
                         
                         <Col className="col-xs-6 notetruck">This order will be marked as auto complete 10 days after Estimated date of delivery if no input 
                         <br/> is received for delivery confirmation from your end.We'll also consider order to be non faulty in that case. </Col>
                         <Col className="col-xs-1"></Col>
                     </Row>
                    </>
                    :
                    <>
                    </>
    }
                    <hr></hr>

                    {item.openEnquiriesResponse.isReprocess === 1 ?
                <>
                <Row noGutters={true}>
                    <Col className="col-xs-offset-1 col-xs-11">
                        <p className="orderRecreationP1TagStyle">Order under Recreation</p>
                        <p className="orderRecreationP2TagStyle">
                        Kindly refer chats for regular updates and in-case of any inconvenience, 
                        feel free to escalate the issue over chat
                        </p>
                    </Col>
                </Row>
                <hr/>
                </>
                : null }

                    { item.openEnquiriesResponse.enquiryStageId >= 10
                    ?
                    <>
                      <Row noGutters={true} style={{marginBottom: "20px"}}>
                   {item.openEnquiriesResponse.isNewGenerated === 1 ?
                    item.openEnquiriesResponse.isProductReturned === 1 ?
                    <>
                    <Col className="col-xs-2 col-xs-offset-1 text-center">
                        <input type="button" className="orderReceivedDisableButtonStyle" value ="Refund received"></input>
                    </Col>
                    <Col className="col-xs-4"></Col>
                    </>
                    :
                    <>
                    <Col className="col-xs-2 col-xs-offset-1 text-center">
                        <input type="button" className="enqreqbtn" value ="Refund received" 
                        onClick={() => this.orderReceivedModal(item.openEnquiriesResponse.enquiryId)}></input>
                    </Col>
                    <Col className="col-xs-4"></Col>
                    </>
                    :  
                    <Col className="col-xs-7"></Col>
                    }
                     <Col className="col-xs-4">
                       <span>
                       <a style={{color:"black"}} href={TTCEapi.DocumentsURL + "Help.pdf"}
                                    target="_blank">
                      <button className="enqreqbtn needhelpbth">
                        <i class="fa fa-question-circle" aria-hidden="true" style={{marginRight:"6px"}}></i>Need Help</button>
                        </a>
                         <input type="button" className="enqreqbtn" onClick={() => this.goToChatButton(item.openEnquiriesResponse.enquiryId)}
                         value ="Go to this Enquiry chat"></input>

                       </span>

                        </Col>
                </Row>
                    </>
                    :
                    <>
                      <Row noGutters={true} style={{marginBottom: "20px"}}>
                   {item.openEnquiriesResponse.isNewGenerated === 1 ?
                    item.openEnquiriesResponse.isProductReturned === 1 ?
                    <>
                    <Col className="col-xs-2 col-xs-offset-1 text-center">
                        <input type="button" className="orderReceivedDisableButtonStyle" value ="Refund received"></input>
                    </Col>
                    <Col className="col-xs-6"></Col>
                    </>
                    :
                    <>
                    <Col className="col-xs-2 col-xs-offset-1 text-center">
                        <input type="button" className="enqreqbtn" value ="Refund received" 
                        onClick={() => this.orderReceivedModal(item.openEnquiriesResponse.enquiryId)}></input>
                    </Col>
                    <Col className="col-xs-6"></Col>
                    </>
                    :  
                    <Col className="col-xs-9"></Col>
                    }
                    <Col className="col-xs-2">
                        <input type="button" className="enqreqbtn" onClick={() => this.goToChatButton(item.openEnquiriesResponse.enquiryId)}
                        value ="Go to this Enquiry chat"></input>
                    </Col>
                    </Row>
                    </>
                     }
                   

                   {item.openEnquiriesResponse.enquiryStageId < 9?
                    <>
                    {item.openEnquiriesResponse.isPartialRefundReceived==null?
                    <Row noGutters={true}>
                    <Col className="col-xs-1">
                     </Col>
                     <Col className="col-xs-2">
                         <button className="closeorderbtn"
                          onClick={()=>{this.ClosedOrderShow(item.openEnquiriesResponse.enquiryId)}}
                          >Close Order</button>
                     </Col>
                     <Col className="col-xs-9">
                     </Col>
                 </Row>
                 :
                 <Row noGutters={true}>
                       <Col className="col-xs-1">
                        </Col>
                        <Col className="col-xs-3">
                            <button className="closeorderbtn"
                           style={{background:"green",padding:"7px",width:"auto"}}
                             onClick={()=>{this.PartialPaymentShow(item.openEnquiriesResponse.enquiryId)}}
                             >Is Partial Refund Received ?</button>
                        </Col>
                        <Col className="col-xs-8">
                        </Col>
                    </Row>
                    }
                    
                    </>
                    
                    :
                    ""
                    }

                    <Row noGutters={true} className="mt7">
                        <Col className="col-xs-1"></Col>
                        <Col className="col-xs-10">
                        <Row noGutters={true}>
                            <Col className="col-xs-12 leEnqstatus bold">
                            Order Status
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
                                {this.state.enquiryStagesAvailable.map((item1) => <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId === item1.orderStages.id ? "is-active": " "} >{item1.orderStages.desc}</li> )     }
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
                                <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId + 1 === item1.id ? "is-active wait": " "} >{}{item.openEnquiriesResponse.enquiryStageId === 5 && item1.id === 5 && item.openEnquiriesResponse.innerEnquiryStageId < 5 ? <> Work in Progress<br></br>
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
                                    <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId === item1.id ? "is-active": " "} >{}{item.openEnquiriesResponse.enquiryStageId === 5 && item1.id === 5 && item.openEnquiriesResponse.innerEnquiryStageId < 5 ? <> Work in Progress<br></br>
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
                                {item.openEnquiriesResponse.productStatusHistoryId === 2
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

                    </>
                    : null }
               
                    </>
                    }

                    {item.openEnquiriesResponse.userStatus === 1 || item.openEnquiriesResponse.userStatus === null ?
                    <>
                   {(item.openEnquiriesResponse.enquiryStageId >9) && (item.openEnquiriesResponse.isReprocess === null)
                   ?
                <>
                 <Row noGutters={true}>
                      <Col className="col-xs-12" style={{textAlign:"center"}}>
                      <button className="completedenqButton"
                                    // onClick={this.CompleteOrderShow}
                                    onClick={()=>{this.CompleteOrderShow(item.openEnquiriesResponse.enquiryId)}}
                                    //    disabled = {this.state.progressid != 10}
                                        style={{border:"1px solid green"}}
                                       >
                                       <img src={logos.completedenq} className="completeenqimg" 
                                       ></img>
                               
                               Found order as per requirement
                                </button>
                               

                    
                          <>
                          {item.openEnquiriesResponse.comment !=null?
                                <>
                            <p style={{color:"grey",padding:"10px"}}>If you found any defects,don't worry! You can proceed to
                             <button style={{color:"red"}}className="raiseaconcernbtn" 
                                             onClick={()=>{this.FaultyOrder(item.openEnquiriesResponse.enquiryId)}}
                                             >
                                raise a concern
                                </button> here. 
                                </p>
                                </>
                            :
                            <>
                        {this.daysleftFaultyOrder(item.eta)>0?
                               
                           <p style={{color:"grey",padding:"10px"}}>If you found any defects,don't worry! You can proceed to
                             <button style={{color:"red"}}className="raiseaconcernbtn" 
                                             onClick={()=>{this.FaultyOrder(item.openEnquiriesResponse.enquiryId)}}
                                             >
                                raise a concern
                                </button> here. 
                                </p>
                                :
                                ""
                          }
                            </>
                             }
                            
                          </>
                        
                       
                                      </Col>
                  </Row>
                </>
                :
                <>
                </>}
                </>
                : null }
                   
    {/* _________________________________________Modal_1________________________________________________ */}
                                          
    <div id={"CompleteOrder"+item.openEnquiriesResponse.enquiryId} class="w3-modal">
    <div class="w3-modal-content w3-animate-top modalBoxSize">
        <div class="w3-container buyerMOQAcceptModalContainer">
        <Row noGutters={true}>
            <Col sm={12}  style={{textAlign:"right"}}>
              <h1 className="closebtn" onClick={() => this.CompleteOrderClose(item.openEnquiriesResponse.enquiryId)}>X</h1>
            </Col>
  
        </Row>
        <Row noGutters={true} className="buyerMOQAcceptModalOuter uploadingreceiptheading ">
            <Col className="col-xs-12 ">
                <h1 className="areyousurecrh1 fontplay">Congrats!</h1> 
                <br/>
                <b className="CRare fontplay" style={{color:"grey",fontWeight:"100"}}>Found order as per requirement!</b> 
                
            </Col>
        </Row>
        <Row noGutters={true} className=" ">
            <Col className="col-xs-12 " style={{textAlign:"center"}}>
          <img src={logos.ConfirmDelivered} style={{height:"150px"}}/>
            <br/>
            {/* <input className="PIinput" type="date"  placeholder="YYYY-MM-DD"
            style={{width:"50%",borderRadius:"50px",padding:"15px"}}                                       
              placeholder="Enter date of receiving"
              name="deliveredDate"
              onChange={this.handleChange}
              required/> */}
                <Row noGutters={true} >
              <Col style={{textAlign:"center"}} className="col-xs-1"></Col>
                  <Col style={{textAlign:"center"}} className="col-xs-10">
              <ModernDatepicker
                                                         className="PIinput extracss"
                                                         date={this.state.deliveredDate}
                                                        format={'YYYY-MM-DD'}
                                                        showBorder
                                                        name="deliveredDate"
                                                        onChange={date => this.handleChangeDate(date)}
                                                        placeholder={'Enter date of receiving'}
                                                        required
                                                    />
              </Col></Row>
        </Col>
        </Row>
        <Row noGutters={true}>
        <Col className="col-xs-12" style={{textAlign:"center",padding:"10px",fontWeight:"600"}}>
            <p className="crmnote"> Please check the order before marking order received as per requirement.
            <br/>Once marked the order will be considered as completed  
            <br/>and no concern can be raised against it.</p>
            <p className="text-center">
                                                             {this.state.showDeldatevalidation ? (
                                            <span className="bg-danger">Date must be less than or equal to current date.</span>
                                        ) : (
                                            <br />
                                        )}
                                                             </p>
                <div className="buyerMOQAcceptModalButtonOuter" style={{textAlign:"center"}}>
            <span >
                <button
                style={{fontSize:"15px"}}
                disabled={this.state.completebtndis}
                onClick={()=>{this.CompleteOrder2Show(item.openEnquiriesResponse.enquiryId)}}
                className="buyerMOQAcceptModalOkayButton">Complete and Review 
                 <i class="fas fa-arrow-right" aria-hidden="true" style={{marginLeft:"10px"}}></i>
                 </button></span>
        </div>
            
        </Col>
        </Row>
                                                                            
        
    </div>
    </div>
</div>

   {/* _________________________________________Modal_2________________________________________________ */}
                                          
   <div id={"CompleteOrder2"+item.openEnquiriesResponse.enquiryId} class="w3-modal">
    <div class="w3-modal-content w3-animate-top modalBoxSize">
        <div class="w3-container "style={{padding:"25px"}}>
        <Row noGutters={true} className="buyerMOQAcceptModalOuter uploadingreceiptheading ">
            <Col className="col-xs-12 ">
                <h1 className="areyousurecrh1 fontplay" style={{color:"green"}}>Completed!</h1> 
                <br/>
                <b className="CRare fontplay" style={{color:"grey",fontWeight:"100"}}>
                    You can find this order under completed tab.</b> 
                
            </Col>
        </Row>
        <Row noGutters={true} className=" ">
            <Col className="col-xs-12 " style={{textAlign:"center"}}>
          <img src={logos.ConfirmDelivered} style={{height:"150px"}}/>
           
        </Col>
        </Row>
        
        <Row noGutters={true}>
        <Col className="col-xs-12" style={{textAlign:"center",padding:"10px",fontWeight:"600"}}>
        <p className="crmnote"> Please check the order before marking order received as per requirement.
            <br/>Once marked the order will be considered as completed  
            <br/>and no concern can be raised against it.</p>
            
                <div className="buyerMOQAcceptModalButtonOuter" style={{textAlign:"center"}}>
            {/* <span  onClick={this.CompleteOrderClose} className="buyerMOQAcceptModalCancelButton">Cancel</span> */}
            <span >
                <button
                style={{fontSize:"15px"}}
                onClick={() => this.reviewPageButton(item.openEnquiriesResponse.enquiryId, item.openEnquiriesResponse.enquiryCode, item.openEnquiriesResponse)}
                className="buyerMOQAcceptModalOkayButton raterevbtn"><img src={logos.ratereview} className="raterevbtnimg"/> Review and Raiting
                 </button></span>
                 <br/>
                 <button className="raterevbtnskip"
                   onClick={()=>{this.CompleteOrder2Close(item.openEnquiriesResponse.enquiryId)}}

                //  onClick={this.CompleteOrder2Close}
                 >
                     Skip <i class="fa fa-angle-double-right" aria-hidden="true"></i></button>
        </div>
            
        </Col>
        </Row>
                                                                            
        
    </div>
    </div>
</div>
    
    {/* _____________________________________________Modal 3 ________________________________________________ */}
    <div id={"CloseOrder"+item.openEnquiriesResponse.enquiryId} class="w3-modal" style={{paddingTop:"200px"}}>
    <div class="w3-modal-content w3-animate-top modalBoxSize" >
        <div class="w3-container buyerMOQAcceptModalContainer">
        <Row noGutters={true}>
            <Col sm={12}  style={{textAlign:"right"}}>
              <h1 className="closebtn" onClick={() => this.ClosedOrderClose(item.openEnquiriesResponse.enquiryId)}>X</h1>
            </Col>
  
        </Row>
        <Row noGutters={true} className="buyerMOQAcceptModalOuter uploadingreceiptheading ">
            <Col className="col-xs-12 ">
                <h1 className="areyousurecrh1 fontplay">Are You Sure?</h1> 
                <br/>
                <b className="CRare fontplay" style={{color:"grey",fontWeight:"100",marginBottom:"15px"}}>You are about to close this order!</b> 
                <br/>
                           <p className="CRare fontplay">{item.openEnquiriesResponse.orderCode}</p>  
            </Col>
        </Row>
       
        {/* <div style={{textAlign:"center"}}>
        <input  type="checkbox" id="agree" className="orderclose"/>
            <label for="agree" className="labelcheckbox"> Partial Payment Received</label>
        </div> */}
       
        <Row noGutters={true}>
        <Col className="col-xs-12" style={{textAlign:"center",padding:"10px",fontWeight:"600"}}>
        <button
                style={{fontSize:"15px"}}
                 onClick={()=>{this.ClosedOrderClose(item.openEnquiriesResponse.enquiryId)}}
                className="closeorderbtn2">No
                 </button>
               
                 <button
                style={{fontSize:"15px",background:"green"}}
                 onClick={()=>{this.YesOrderbutton(item.openEnquiriesResponse.enquiryId,item.openEnquiriesResponse.productStatusId)}}
                className="closeorderbtn2">Yes
                 </button>
        </Col>
        </Row>
                                                                            
        
    </div>
    </div>
</div>
  {/* _____________________________________________Modal 4 ________________________________________________ */}
  <div id={"PartialPayment"+item.openEnquiriesResponse.enquiryId} class="w3-modal" style={{paddingTop:"200px"}}>
    <div class="w3-modal-content w3-animate-top modalBoxSize" >
        <div class="w3-container buyerMOQAcceptModalContainer">
        <Row noGutters={true}>
            <Col sm={12}  style={{textAlign:"right"}}>
              <h1 className="closebtn" onClick={() => this.PartialPaymentClose(item.openEnquiriesResponse.enquiryId)}>X</h1>
            </Col>
  
        </Row>
        <Row noGutters={true} className="buyerMOQAcceptModalOuter uploadingreceiptheading ">
            <Col className="col-xs-12 ">
                <h1 className="areyousurecrh1 fontplay">Is Partial Refund Received?</h1> 
               <br/>
                 <p className="CRare fontplay">{item.openEnquiriesResponse.orderCode}</p>  
            </Col>
        </Row>
       
        <div style={{textAlign:"center"}}>
       
       <input type="checkbox"className="CheckBrand " style={{marginRight:"10px"}}   
                                onChange={this.Verifybox} checked={this.state.checked}/> 
            <label for="agree" className="labelcheckbox"> Partial Refund Received</label>
        </div>
       
        <Row noGutters={true}>
        <Col className="col-xs-12" style={{textAlign:"center",padding:"10px",fontWeight:"600"}}>
        <button
                style={{fontSize:"15px",background:"green"}}
                 onClick={()=>{this.PartialPaymentReceived(item.openEnquiriesResponse.enquiryId)}}
                className="closeorderbtn2">Yes
                 </button>
        </Col>
        </Row>
                                                                            
        
    </div>
    </div>
</div>

      {/* -------------------------------------------Modal ends   ----------------          */}
 
                    {item.openEnquiriesResponse.userStatus === 1 || item.openEnquiriesResponse.userStatus === null ?
                    <Row>
                        <Col className="col-xs-12 text-center leEnqshowmore">
                            <button  onClick={()=>this.individualpage(item.openEnquiriesResponse.enquiryId)} className="leEnqshowmore showmorebtncss">
                                show more details
                                <i class="fa fa-angle-double-right" style={{fontSize:"15px",padding:"0px 0px 0px 12px"}}></i>
                                </button>
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
                <Col className="col-xs-12 font20 text-center">
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

export default BuyerOngoingOrder
