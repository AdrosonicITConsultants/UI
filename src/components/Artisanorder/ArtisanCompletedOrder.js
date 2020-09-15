import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
// import "./AllEnquiryList.css"
import TTCEapi from '../../services/API/TTCEapi';
import Moment from 'react-moment';


export class ArtisanCompletedOrder extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            enquiryStagesMTO :[],
            stage: 3,
            openEnquiries: [],
            productCategories: [],
            yarns : [],
            enquiryStagesAvailable:[],
            dataload:false

        }
        

    }      
    componentDidMount(){
        TTCEapi.getProductUploadData().then((response)=>{
            if(response.data.valid)
            {
                console.log(response);
                this.setState({productCategories: response.data.data.productCategories,
                    yarns: response.data.data.yarns },()=>{
                        TTCEapi.getClosedOrders().then((response1)=>{
                            console.log("")
                            if(response1.data.valid)
                            {   console.log("heree");
                                console.log(response1.data.data);
                                this.setState({openEnquiries:response1.data.data, dataload:true});
                            }
                        })
                    });
            }
        })
        TTCEapi.getEnquirStages().then((response)=>{
            if(response.data.valid)
            {
                console.log(response.data.data);
                this.setState({enquiryStagesMTO:response.data.data})
            }
        })
        TTCEapi.getEnquirStagesforAvailable().then((response)=>{
            if(response.data.valid)
            {
                console.log(response.data.data);
                this.setState({enquiryStagesAvailable:response.data.data})
            }
        })
        
        
    } 
    individualpage(id){
        localStorage.setItem("completed", 1);
        browserHistory.push("/artisancompletedorder?code=" + id)
    }
    FaultReport(id){
        browserHistory.push("/artisanfaultreportCompleted?orderid="+id)
    } 

    reviewPageButton = (id, code) => {
        localStorage.removeItem("ratingEnquiryCode");
        localStorage.setItem("ratingEnquiryCode", code);
        browserHistory.push("/artisanRating?code=" + id);
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
                    No Open Enquiries.
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
             
            <hr></hr>
            <Row noGutters={true} id={item.enquiryId}>
                <Col className="col-xs-1"></Col>
                <Col className="col-xs-10">
                    <Row noGutters={true}>
                        <Col sm="9">
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
                            <div>
                              <div noGutters={true} >
                                  <Col className="leEnqid bold">
                                  <div>
                                  <div dangerouslySetInnerHTML={{ __html: item.openEnquiriesResponse.enquiryCode }} />
                                  <i className="fa fa-star starColorActiveCompleteEnquiryId" />
                                  </div>
                                   
                                  {/* Enquiry Id : {item.openEnquiriesResponse.enquiryCode} */}
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
                              <div noGutters={true} className="" >
                                  <Col className="leEnqprodcode ">
                                      {item.openEnquiriesResponse.productType === "Product"
                                      ?
                                      <>
                                      Product Code : {item.openEnquiriesResponse.productCode}   
                                      </>
                                      :
                                      <>
                                      Product Code : NA  
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
                                      <span className="leEnqprodbn ">Brand Name : </span>
                                      <span className="leEnqbrandname ">{item.brandName ?item.brandName :"NA" }</span>                                   
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
                    </Row>
                </Col>

                
            </Row>
            <hr/>
            <Row>
                <Col sm={4} className="col-xs-12 text-center">
                <img src={logos.truck} className="truckimg"/>  Check delivery receipt
                </Col>
                <Col sm={4} className="col-xs-12 text-center" style={{fontWeight: "600", fontSize: "15px"}}>
                <i className="fa fa-star starColorActiveCompleteOrder" /> 
                Buyer provided <a style={{cursor: "pointer"}}>rating for your order</a>
                </Col>
                <Col sm={4} className="col-xs-12 text-center">
                {item.openEnquiriesResponse.comment?
                           <button className="rateUnusualButton"  onClick={()=>this.FaultReport(item.openEnquiriesResponse.enquiryId)}>
                            <img src={logos.esc} className="raterevbtnimg"/> 
                            Check concern raised by buyer
                        </button>
                :
                null
                }
                </Col>
            </Row>
            <hr/>

            <Row noGutters={true}>
                <Col className="col-xs-12" style={{textAlign:"center"}}>
                    <button
                        style={{fontSize:"15px"}}
                        onClick={() => this.reviewPageButton(item.openEnquiriesResponse.enquiryId, item.openEnquiriesResponse.enquiryCode)}
                        className="buyerMOQAcceptModalOkayButton raterevbtn">
                            <img src={logos.ratereview} className="raterevbtnimg"/>
                        Rate & Review Buyer
                    </button>
                </Col>
            </Row>
          
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
             :
             <>
             {/* for change in product data */}
            <hr></hr>
            <Row noGutters={true} id={item.enquiryId}>
                <Col className="col-xs-1"></Col>
                <Col className="col-xs-10">
                    <Row noGutters={true}>
                        <Col sm="9">
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
                            <div>
                              <div noGutters={true} >
                                  <Col className="leEnqid bold">
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
                              <div noGutters={true} className="" >
                                  <Col className="leEnqprodcode ">
                                      {item.openEnquiriesResponse.productType === "Product"
                                      ?
                                      <>
                                      Product Code : {item.openEnquiriesResponse.productHistoryCode}   
                                      </>
                                      :
                                      <>
                                      Product Code : NA  
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
                                      <span className="leEnqprodbn ">Brand Name : </span>
                                      <span className="leEnqbrandname ">{item.brandName ?item.brandName :"NA" }</span>                                   
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
            {item.openEnquiriesResponse.comment?
                 <Row noGutters={true}>
                     <Col className="col-xs-1"></Col>
                     <Col sm={4} className="col-xs-12 text-center">
                {item.openEnquiriesResponse.comment?
                           <button className="rateUnusualButton"  onClick={()=>this.FaultReport(item.openEnquiriesResponse.enquiryId)}>
                            <img src={logos.esc} className="raterevbtnimg"/> 
                            Check concern raised by buyer
                        </button>
                :
                null
                }
                </Col>
         </Row>
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
            }

            <Row>
                <Col className="col-xs-12 text-center leEnqshowmore">
                    <a  onClick={()=>this.individualpage(item.openEnquiriesResponse.enquiryId)} className="leEnqshowmore">show more details<img src={logos.Nextarrow} className="showmorearrow"></img></a>
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
            </Row></>
        }
        
            </React.Fragment>
  
            )
    }
}

export default ArtisanCompletedOrder
