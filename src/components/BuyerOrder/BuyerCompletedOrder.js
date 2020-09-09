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
        }
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
        browserHistory.push("/buyerorder?code=" + id);
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
                                        <div>
                                            <div noGutters={true} >
                                                <Col className="leEnqid bold">
                                                Order Id : {item.openEnquiriesResponse.enquiryCode}
                                                </Col>
                                            </div>
                                            <div noGutters={true} >
                                                <Col className="lesmallEnqid bold">
                                                Enquiry Id : <a href={'/buyerEnquiryDetails?code='+item.openEnquiriesResponse.enquiryId }>{item.openEnquiriesResponse.enquiryCode}</a>
                                                </Col>
                                            </div>
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
                            </Row>
                        </Col>                        
                    </Row>
                    {item.openEnquiriesResponse.productStatusId == 2
                    ?
                    <>
                    </>
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
                        
                        </Col>
                        }
                        
                        
                        <Col className="col-xs-2">
                            <input type="button" className="changereqbtn" value ="Raise a change Request"></input>
                        </Col>
                        <Col className="col-xs-1"></Col>

                    </Row>
                    
                    }<hr></hr>
                    { item.openEnquiriesResponse.enquiryStageId >=10
                    ?
                    <>
                     <Row noGutters={true}>
                        <Col className="col-xs-7"></Col>
                        <Col className="col-xs-4">
                       <span>
                      <button className="enqreqbtn needhelpbth">
                        <i class="fa fa-question-circle" aria-hidden="true" style={{marginRight:"6px"}}></i>Need Help</button>
                         <input type="button" className="enqreqbtn" value ="Go to this Enquiry chat"></input>

                       </span>

                        </Col>

                        </Row>
                    </>
                    :
                    <>
                      <Row noGutters={true}>
                        <Col className="col-xs-9"></Col>
                        <Col className="col-xs-2">
                       <span>
                    
                         <input type="button" className="enqreqbtn" value =" Go to this Enquiry chat"></input>

                       </span>

                        </Col>

                        </Row>
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
                                {console.log(item.openEnquiriesResponse.productStatusId)}
                                {item.openEnquiriesResponse.productStatusId === 2
                                ?
                                <>  
                                {item.openEnquiriesResponse.enquiryCode}
                                </>
                                :
                                <>
                                 {this.state.innerEnquiryStages.map((item1) => 
                                   
                                    <Col className="col-xs-12 mb7">
                                         {/* {console.log(item1.id  , item.openEnquiriesResponse.innerEnquiryStageId)}  */}
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
                            </Row>
                        </Col>
                    </Row>
                    {item.openEnquiriesResponse.productStatusHistoryId == 2
                    ?
                    <>
                    </>
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
                        
                        </Col>
                        }
                        
                        
                        <Col className="col-xs-2">
                            <input type="button" className="changereqbtn" value ="Raise a change Request"></input>
                        </Col>
                        <Col className="col-xs-1"></Col>

                    </Row>
                    
                    }<hr></hr>
                    {/* <Row noGutters={true}>
                        <Col className="col-xs-9"></Col>
                        <Col className="col-xs-2">
                        <input type="button" className="enqreqbtn" value ="Go to this Enquiry chat"></input>

                        </Col>

                        </Row> */}
                        { item.openEnquiriesResponse.enquiryStageId >=10
                    ?
                    <>
                     <Row noGutters={true}>
                        <Col className="col-xs-7"></Col>
                        <Col className="col-xs-4">
                       <span>
                      <button className="enqreqbtn needhelpbth">
                        <i class="fa fa-question-circle" aria-hidden="true" style={{marginRight:"6px"}}></i>Need Help</button>
                         <input type="button" className="enqreqbtn" value ="Go to this Enquiry chat"></input>

                       </span>

                        </Col>

                        </Row>
                    </>
                    :
                    <>
                      <Row noGutters={true}>
                        <Col className="col-xs-9"></Col>
                        <Col className="col-xs-2">
                       <span>
                    
                         <input type="button" className="enqreqbtn" value =" Go to this Enquiry chat"></input>

                       </span>

                        </Col>

                        </Row>
                    </>
                     }
                   
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
                    <Col className="col-xs-1"></Col>
                        <Col className="col-xs-10">
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
                                {item.openEnquiriesResponse.productStatusHistoryId === 2
                                ?
                                <>  
                                {item.openEnquiriesResponse.enquiryCode}
                                </>
                                :
                                <>
                                 {this.state.innerEnquiryStages.map((item1) => 
                                   
                                    <Col className="col-xs-12 mb7">
                                         {/* {console.log(item1.id  , item.openEnquiriesResponse.innerEnquiryStageId)}  */}
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
                    }
                    {item.openEnquiriesResponse.enquiryStageId >9
                   ?
                <>
                 <Row noGutters={true}>
                      <Col className="col-xs-12" style={{textAlign:"center"}}>
                      <button className="completedenqButton"
                                    // onClick={this.CompleteOrderShow}
                                    onClick={()=>{this.CompleteOrder2Show(item.openEnquiriesResponse.enquiryId)}}
                                    //    disabled = {this.state.progressid != 10}
                                        style={{border:"1px solid green"}}
                                       >
                                       <img src={logos.completedenq} className="completeenqimg" 
                                       ></img>
                                Mark this order as delivered
                                </button>
                                <p style={{color:"grey",padding:"10px"}}>If you found any defects,don't worry! You can proceed to <b style={{color:"red"}}>raise a concern</b> after making it as delivered. </p>
                                </Col>
                  </Row>
                   {/* _________________________________________Modal_1________________________________________________ */}
                                          
   <div id={"CompleteOrder2"+item.openEnquiriesResponse.enquiryId} class="w3-modal">
    <div class="w3-modal-content w3-animate-top modalBoxSize">
        <div class="w3-container buyerMOQAcceptModalContainer">
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
            <p className="crmnote">Just in case if you find your order to be faulty,
            <br/>You can always raise a concern within  
            <br/>10 days from date received.</p>
            
                <div className="buyerMOQAcceptModalButtonOuter" style={{textAlign:"center"}}>
            {/* <span  onClick={this.CompleteOrderClose} className="buyerMOQAcceptModalCancelButton">Cancel</span> */}
            <span >
                <button
                style={{fontSize:"15px"}}
                // onClick={this.sendCRDataFunction}
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
      {/* -------------------------------------------Modal ends             */}
 
                </>
                :
                <>
                </>}

                    <Row>
                        <Col className="col-xs-12 text-center leEnqshowmore">
                            <a  onClick={()=>this.individualpage(item.openEnquiriesResponse.enquiryId)} className="leEnqshowmore">show more details <img src={logos.Nextarrow} className="showmorearrow"></img></a>
                        </Col>
                    </Row>

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
