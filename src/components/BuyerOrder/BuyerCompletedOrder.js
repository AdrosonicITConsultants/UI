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

export class BuyerCompletedOrder extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            enquiryStagesMTO :[],
            stage: 3,
            openEnquiries: [],
            productCategories: [],
            yarns : [],
            enquiryStagesAvailable:[],
            dataload:false,
            getSingleOrder:[]
        }
    }
    FaultyOrder(id){
        browserHistory.push("/completedorderfaulty?orderid="+id)
    }

    CompleteOrder2Show = (id) => {
        document.getElementById('CompleteOrder2'+ id).style.display='block';
    }

    CompleteOrder2Close = (id) => {
        document.getElementById('CompleteOrder2'+ id).style.display='none';
    }

    componentDidMount(){

        TTCEapi.getProductUploadData().then((response)=>{
            if(response.data.valid)
            {    TTCEapi.getEnquirStages().then((response)=>{
                if(response.data.valid)
                {
                    console.log(response.data.data);
                    var rr = response.data.data;
                    rr[0].desc = "Quotation Accepted";
                    rr[1].desc = "Order Details";
                    this.setState({enquiryStagesMTO:rr})
                }
            })
            TTCEapi.getEnquirStagesforAvailable().then((response)=>{
                if(response.data.valid)
                {
                    console.log(response.data.data);
                    this.setState({enquiryStagesAvailable:response.data.data})
                }
            })
                TTCEapi.getInnerEnquirStages().then((response)=>{
                if(response.data.valid)
                {
                    console.log(response.data.data);
                    this.setState({innerEnquiryStages:response.data.data})
                }
            })
                console.log(response);
                this.setState({productCategories: response.data.data.productCategories,
                    yarns: response.data.data.yarns },()=>{
                        TTCEapi.getClosedOrders().then((response1)=>{
                            console.log("")
                            if(response1.data.valid)
                            {   console.log("heree");
                                console.log(response1.data.data);
                                this.setState({openEnquiries:response1.data.data, dataload:true},()=>{
                                    console.log(this.state);
                                });
                                
                            }
                        },()=>{
                           
                        })
                    });
            }
        })
       
        
        
    }

    individualpage(id){
        // localStorage.setItem("seeMoreId", id);
        browserHistory.push("/buyercompletedorder?code=" + id);
    }

    FoundSomethingfaulty(id){
        browserHistory.push("/completedorderfaulty?orderid="+id);

    }

    reviewPageButton = (id, code) => {
        localStorage.removeItem("ratingEnquiryCode");
        localStorage.setItem("ratingEnquiryCode", code);
        browserHistory.push("/buyerRating?code=" + id);
    }

    daysleft(name)
    {
        var someDate = new Date(name);
                                console.log(someDate);
                                var numberOfDaysToAdd = 10;
                                someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
                                console.log(someDate); 
                                var todayDate= new Date();
                                const diffTime =  someDate - todayDate ;
                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                                console.log(diffDays); 
                                return(diffDays);
    }
    daysleftFaultyOrder(name,days)
    {
      console.log(name,days);
        var someDate = new Date(name);
                                console.log(someDate);
                                var numberOfDaysToAdd =parseInt(days);
                                someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
                                console.log(someDate); 
                                var todayDate= new Date();
                                const diffTime =  someDate - todayDate ;
                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                                console.log(diffDays); 
                                return(diffDays);
    }
    render() {
        return (
            <React.Fragment>
                {this.state.dataload
                ?
                <>
                {this.state.openEnquiries.length == 0 
                ?
                <>
                <Row noGutters={true}>
                    <Col className="col-xs-12  text-center">
                    No Completed Order.
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
                        {/* <Col className="col-xs-10" ref={this.scrollDiv}> */}
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
                                            item.openEnquiriesResponse.productType === "Product"
                                            ?
                                            <a href={"/showBArtisanProduct?productId="+item.openEnquiriesResponse.productId }><img  src={TTCEapi.ImageUrl +"Product/" + item.openEnquiriesResponse.productId + "/" + item.openEnquiriesResponse.productImages.split(",")[0]} className="enquiryimage"></img>
                                            </a>
                                            :
                                            <a href={"/showBuyerProduct?productId="+item.openEnquiriesResponse.productId }><img  src={TTCEapi.ImageUrl +"CustomProduct/" + item.openEnquiriesResponse.productId + "/" + item.openEnquiriesResponse.productImages.split(",")[0]} className="enquiryimage"></img>
                                            </a>

                                        }
                                        </div>
                                            <a href={"/showBArtisanProduct?productId="+item.openEnquiriesResponse.productId } className="leEnqprodName">{item.openEnquiriesResponse.productName}</a>
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
                                        </div>
                                        }
                                        <div>
                                            <div noGutters={true} >
                                                <Col className="leEnqid bold">
                                                Order Id : {item.openEnquiriesResponse.enquiryCode}
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
                                                <span className="leEnqspun"> / {this.state.yarns[item.openEnquiriesResponse.warpYarnId - 1 ].yarnDesc}  X  {this.state.yarns[item.openEnquiriesResponse.weftYarnId - 1 ].yarnDesc}  
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
                                        Date of delivery : 
                                        {item.openEnquiriesResponse.orderReceiveDate != null 
                                        ?
                                        <Moment format="DD-MM-YYYY">
                                            {item.openEnquiriesResponse.orderReceiveDate}
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

                  <hr></hr>
                                      
                  {item.openEnquiriesResponse.deliveryChallanLabel?
                    <Row>
                    <Col className="col-xs-1">
                        </Col>
                      
                     <Col className="col-xs-4">
                     <img src={logos.truck} className="truckimg"/>  Check
                     <a style= {{marginLeft:"5px"}} href={TTCEapi.DeliveryReceiptUrl + item.openEnquiriesResponse.enquiryId + "/" + item.openEnquiriesResponse.deliveryChallanLabel} target="_blank">
                         delivery receipt</a>
                     </Col>
                     </Row>
                     :
                     ""
                     
               
                     }
                           {this.state.openEnquiries.comment?
                           <>
                             <Row noGutters={true}>
                     <Col className="col-xs-12" style={{textAlign:"center"}}>
                         <span>
                             <button  style={{fontSize:"15px",backgroundColor:"rgb(204, 0, 0);"}} 
                              onClick={()=>this.FoundSomethingfaulty(item.openEnquiriesResponse.enquiryId)} 
                              className="buyerMOQAcceptModalOkayButton Foundunusualbtn">
                             <img src={logos.sadwhite} className="raterevbtnimg"/>Found Something unusual?</button>
                                <button
                                style={{fontSize:"15px"}}
                                onClick={() => this.reviewPageButton(item.openEnquiriesResponse.enquiryId, item.openEnquiriesResponse.enquiryCode)}
                                className="buyerMOQAcceptModalOkayButton raterevbtn">
                                    <img src={logos.ratereview} className="raterevbtnimg"/>
                                Rate & Review this order
                            </button>
                        </span>
                     </Col>
                 </Row>
                           </>
                        :
                        <>
                        {item.openEnquiriesResponse.enquiryStageId>9 && this.daysleftFaultyOrder(item.openEnquiriesResponse.orderReceiveDate,3)>0 && this.daysleftFaultyOrder(item.openEnquiriesResponse.orderReceiveDate,3)<4 ?
                <>
            <Row noGutters={true}>
                     <Col className="col-xs-12" style={{textAlign:"center"}}>
                         <span>
                             <button  style={{fontSize:"15px",backgroundColor:"rgb(204, 0, 0);"}} 
                              onClick={()=>this.FoundSomethingfaulty(item.openEnquiriesResponse.enquiryId)} 
                              className="buyerMOQAcceptModalOkayButton Foundunusualbtn">
                             <img src={logos.sadwhite} className="raterevbtnimg"/>Found Something unusual?</button>
                                <button
                                style={{fontSize:"15px"}}
                                onClick={() => this.reviewPageButton(item.openEnquiriesResponse.enquiryId, item.openEnquiriesResponse.enquiryCode)}
                                className="buyerMOQAcceptModalOkayButton raterevbtn">
                                    <img src={logos.ratereview} className="raterevbtnimg"/>
                                Rate & Review this order
                            </button>
                        </span>
                     </Col>
                 </Row> 
            </>
                :
               <>
               {item.openEnquiriesResponse.enquiryStageId>9 ?
<Row noGutters={true}>
<Col className="col-xs-12" style={{textAlign:"center"}}>
    <span>
           <button
           style={{fontSize:"15px"}}
           onClick={() => this.reviewPageButton(item.openEnquiriesResponse.enquiryId, item.openEnquiriesResponse.enquiryCode)}
           className="buyerMOQAcceptModalOkayButton raterevbtn">
               <img src={logos.ratereview} className="raterevbtnimg"/>
           Rate & Review this order
       </button>
   </span>
</Col>
</Row> : null } 
               </>
                  }
                        </>
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
                <Col className="col-xs-1"></Col>
                    <Col className="col-xs-10">
                       <Row noGutters={true}>
                           <Col className="col-xs-12 ">
                           <div className="progressbarfont">
                            <br /><br />
                            {item.openEnquiriesResponse.productStatusId === 2
                            ?
                            <ul className="list-unstyled multi-steps">
                                {item.openEnquiriesResponse.enquiryStageId == 3
                                ?
                                this.state.enquiryStagesAvailable.map((item1) => <li key={item1.id} className={7 == item1.orderStages.id ? "is-active stop": " "} >{item1.orderStages.desc}</li> )     

                                :
                                this.state.enquiryStagesAvailable.map((item1) => <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId + 1  == item1.orderStages.id ? "is-active stop": " "} >{item1.orderStages.desc}</li> )     

                                }
                                {item.openEnquiriesResponse.enquiryStageId == 10
                              ?
                              <li >Completed</li>
                            :
                            <li className="closedenq">Closed</li>
                            }
                            </ul>
                            :
                            <>
                            {
                                (item.openEnquiriesResponse.changeRequestStatus == 1) || (item.openEnquiriesResponse.changeRequestStatus == 3)
                                ?
                                <img src={logos.cricon} className="cricon1"></img>

                                :
                                null

                            }
                            <ul className="list-unstyled multi-steps">
                                   {item.openEnquiriesResponse.enquiryStageId == 5 && item.openEnquiriesResponse.innerEnquiryStageId < 6
                                ?
                                <>
                                 {this.state.enquiryStagesMTO.map((item1) => 
                           
                                <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId  == item1.id ? "is-active stop": " "} >{item1.desc}</li> )     }
                                {item.openEnquiriesResponse.enquiryStageId == 10
                                ?
                                <li >Completed</li>
                                :
                                <li className="closedenq">Closed</li>
                                }
                                </>
                            :
                            <>
                            {this.state.enquiryStagesMTO.map((item1) => 
                           
                                <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId + 1 == item1.id ? "is-active stop": " "} >{item1.desc}</li> )     }
                                {item.openEnquiriesResponse.enquiryStageId == 10
                                ?
                                <li >Completed</li>
                              :
                              <li className="closedenq">Closed</li>
                              }
                              </>
                        }
                            
                              
                            </ul>
                            </>
                            
                                }

                            </div>
                           </Col>
                       </Row>
                    </Col>
                </Row>
                </>
                : null }
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
                                        item.openEnquiriesResponse.productType === "Product"
                                        ?
                                        <a href={"/showBArtisanProduct?ProductHistoryId="+item.openEnquiriesResponse.historyProductId }><img  src={TTCEapi.ImageUrl +"HistoryProduct/" + item.openEnquiriesResponse.historyProductId + "/" + item.openEnquiriesResponse.productHistoryImages.split(",")[0]} className="enquiryimage"></img>
                                        </a>
                                        :
                                        <a href={"/showBuyerProduct?ProductHistoryId="+item.openEnquiriesResponse.historyProductId }><img  src={TTCEapi.ImageUrl +"HistoryCustomProduct/" + item.openEnquiriesResponse.historyProductId + "/" + item.openEnquiriesResponse.productHistoryImages.split(",")[0]} className="enquiryimage"></img>
                                        </a>

                                    }

                                    </div>
                                        <a href={"/showBArtisanProduct?ProductHistoryId="+item.openEnquiriesResponse.historyProductId } className="leEnqprodName">{item.openEnquiriesResponse.productHistoryName}</a>                                       
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
                                       <span className="leEnqspun"> / {this.state.yarns[item.openEnquiriesResponse.warpYarnHistoryId - 1 ].yarnDesc}  X  {this.state.yarns[item.openEnquiriesResponse.weftYarnHistoryId - 1 ].yarnDesc}  
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
                                         Date of delivery : 
                                        {item.openEnquiriesResponse.orderReceiveDate != null 
                                        ?
                                        <Moment format="DD-MM-YYYY">
                                            {item.openEnquiriesResponse.orderReceiveDate}
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
                   <hr></hr>
                   {item.openEnquiriesResponse.deliveryChallanLabel?
                    <Row>
                    <Col className="col-xs-1">
                        </Col>
                      
                     <Col className="col-xs-4">
                     <img src={logos.truck} className="truckimg"/>  Check
                     <a style= {{marginLeft:"5px"}} href={TTCEapi.DeliveryReceiptUrl + item.openEnquiriesResponse.enquiryId + "/" + item.openEnquiriesResponse.deliveryChallanLabel} target="_blank">
                         delivery receipt</a>
                     </Col>
                     </Row>
                     :
                     ""
                     
               
                     }
                   {this.state.openEnquiries.comment?
                           <>
                             <Row noGutters={true}>
                     <Col className="col-xs-12" style={{textAlign:"center"}}>
                         <span>
                             <button  style={{fontSize:"15px",backgroundColor:"rgb(204, 0, 0);"}} 
                              onClick={()=>this.FoundSomethingfaulty(item.openEnquiriesResponse.enquiryId)} 
                              className="buyerMOQAcceptModalOkayButton Foundunusualbtn">
                             <img src={logos.sadwhite} className="raterevbtnimg"/>Found Something unusual?</button>
                                <button
                                style={{fontSize:"15px"}}
                                onClick={() => this.reviewPageButton(item.openEnquiriesResponse.enquiryId, item.openEnquiriesResponse.enquiryCode)}
                                className="buyerMOQAcceptModalOkayButton raterevbtn">
                                    <img src={logos.ratereview} className="raterevbtnimg"/>
                                Rate & Review this order
                            </button>
                        </span>
                     </Col>
                 </Row>
                           </>
                        :
                        <>
                        {item.openEnquiriesResponse.enquiryStageId>9 && this.daysleftFaultyOrder(item.openEnquiriesResponse.orderReceiveDate,3)>0 && this.daysleftFaultyOrder(item.openEnquiriesResponse.orderReceiveDate,3)<4 ?
                <>
            <Row noGutters={true}>
                     <Col className="col-xs-12" style={{textAlign:"center"}}>
                         <span>
                             <button  style={{fontSize:"15px",backgroundColor:"rgb(204, 0, 0);"}} 
                              onClick={()=>this.FoundSomethingfaulty(item.openEnquiriesResponse.enquiryId)} 
                              className="buyerMOQAcceptModalOkayButton Foundunusualbtn">
                             <img src={logos.sadwhite} className="raterevbtnimg"/>Found Something unusual?</button>
                                <button
                                style={{fontSize:"15px"}}
                                onClick={() => this.reviewPageButton(item.openEnquiriesResponse.enquiryId, item.openEnquiriesResponse.enquiryCode)}
                                className="buyerMOQAcceptModalOkayButton raterevbtn">
                                    <img src={logos.ratereview} className="raterevbtnimg"/>
                                Rate & Review this order
                            </button>
                        </span>
                     </Col>
                 </Row> 
            </>
                :
                <>
                {item.openEnquiriesResponse.enquiryStageId>9 ?
<Row noGutters={true}>
<Col className="col-xs-12" style={{textAlign:"center"}}>
    <span>
           <button
           style={{fontSize:"15px"}}
           onClick={() => this.reviewPageButton(item.openEnquiriesResponse.enquiryId, item.openEnquiriesResponse.enquiryCode)}
           className="buyerMOQAcceptModalOkayButton raterevbtn">
               <img src={logos.ratereview} className="raterevbtnimg"/>
           Rate & Review this order
       </button>
   </span>
</Col>
</Row> : null }
                </>
                  }
                        </>
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
                <Col className="col-xs-1"></Col>
                    <Col className="col-xs-10">
                       <Row noGutters={true}>
                           <Col className="col-xs-12 ">
                           <div className="progressbarfont">
                            <br /><br />
                            {item.openEnquiriesResponse.productStatusHistoryId === 2
                            ?
                            <ul className="list-unstyled multi-steps">
                                {item.openEnquiriesResponse.enquiryStageId == 3
                                ?
                                this.state.enquiryStagesAvailable.map((item1) => <li key={item1.id} className={7 == item1.orderStages.id ? "is-active stop": " "} >{item1.orderStages.desc}</li> )     

                              :
                                this.state.enquiryStagesAvailable.map((item1) => <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId + 1  == item1.id ? "is-active stop": " "} >{item1.desc}</li> )     

                                }
                                {item.openEnquiriesResponse.enquiryStageId == 10
                              ?
                              <li >Completed</li>
                            :
                            <li className="closedenq">Closed</li>
                            }
                            </ul>
                            :
                            <ul className="list-unstyled multi-steps">
                                     {item.openEnquiriesResponse.enquiryStageId == 5 && item.openEnquiriesResponse.innerEnquiryStageId < 6
                                ?
                                <>
                                 {this.state.enquiryStagesMTO.map((item1) => 
                           
                                <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId  == item1.id ? "is-active stop": " "} >{item1.desc}</li> )     }
                                {item.openEnquiriesResponse.enquiryStageId == 10
                                ?
                                <li >Completed</li>
                                :
                                <li className="closedenq">Closed</li>
                                }
                                </>
                            :
                            <>
                            {this.state.enquiryStagesMTO.map((item1) => 
                           
                                <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId + 1 == item1.id ? "is-active stop": " "} >{item1.desc}</li> )     }
                                {item.openEnquiriesResponse.enquiryStageId == 10
                                ?
                                <li >Completed</li>
                              :
                              <li className="closedenq">Closed</li>
                              }
                              </>
                        }
                            
                            </ul>
                            
                                }

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
                    <Row>
                        <Col className="col-xs-12 text-center leEnqshowmore">
                            <a  onClick={()=>this.individualpage(item.openEnquiriesResponse.enquiryId)} className="leEnqshowmore">show more details <img src={logos.Nextarrow} className="showmorearrow"></img></a>
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
            
                </React.Fragment>
        )
    }
}

export default BuyerCompletedOrder
