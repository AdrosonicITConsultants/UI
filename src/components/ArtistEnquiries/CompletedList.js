import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import "./AllEnquiryList.css"
import TTCEapi from '../../services/API/TTCEapi';
import Moment from 'react-moment';
import { useTranslation, withTranslation } from "react-i18next";


 class CompletedList extends Component {
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
            if(response){
            if(response.data.valid)
            {
                this.setState({productCategories: response.data.data.productCategories,
                    yarns: response.data.data.yarns },()=>{
                        TTCEapi.getClosedEnquiries().then((response1)=>{
                            if(response1.data.valid)
                            {   
                                this.setState({openEnquiries:response1.data.data, dataload:true});
                            }
                        })
                    });
            }
        }
        else{
            browserHistory.push("/404error")
        }
        })
        TTCEapi.getEnquirStages().then((response)=>{
            if(response){
            if(response.data.valid)
            {
                this.setState({enquiryStagesMTO:response.data.data})
            }
        }
        else{
            browserHistory.push("/404error")
        }
        })
        TTCEapi.getEnquirStagesforAvailable().then((response)=>{
            if(response){
            if(response.data.valid)
            {
                this.setState({enquiryStagesAvailable:response.data.data})
            }
        }
        else{
            browserHistory.push("/404error")
        }
        })
        
        
    } 
    individualpage(id){
        localStorage.setItem("completed", 1);
        browserHistory.push("/closedEnquiryDetails?code=" + id)
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
                    <Col className="col-xs-12  text-center noopenenq">
                        No Completed Enquiries.
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
                 
                <br></br>
                <Row noGutters={true} id={item.enquiryId}>
                    <Col className="col-xs-1"></Col>
                    <Col className="col-xs-12 col-sm-10">
                        <Row noGutters={true}>
                            <Col sm="9"  className="col-xs-12">
                                {item.openEnquiriesResponse.userStatus === 1 ?
                                <div className="imageinlist" > 
                                    <div className="imageinlist1"> 
                                    {
                                          item.openEnquiriesResponse.productImages !=null?
                                        item.openEnquiriesResponse.productType === "Product"
                                        ?
                                        <a href={"/showArtisanProduct?ProductId="+item.openEnquiriesResponse.productId }><img  src={TTCEapi.ImageUrl +"Product/" + item.openEnquiriesResponse.productId + "/" + item.openEnquiriesResponse.productImages.split(",")[0]} className="enquiryimage"></img>
                                        </a>
                                        :
                                        <a href={"/showBuyerProduct?productId="+item.openEnquiriesResponse.productId }><img  src={TTCEapi.ImageUrl +"CustomProduct/" + item.openEnquiriesResponse.productId + "/" + item.openEnquiriesResponse.productImages.split(",")[0]} className="enquiryimage"></img>
                                        </a>
                                                :
                                                <img  src={logos.Smile} className="enquiryimage"></img>
                                    }

                                    </div>
                                    
                                    <a href={"/showArtisanProduct?ProductId="+item.openEnquiriesResponse.productId } className="leEnqprodName">{item.openEnquiriesResponse.productName}</a>
                                    {/* <span ></span> */}
                                    
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
                                      <div dangerouslySetInnerHTML={{ __html: item.openEnquiriesResponse.enquiryCode }} />

                                      </Col>
                                  </div>
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
                            <Col sm="3" className="rightsmleft col-xs-12">
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
                <Row noGutters={true} className="mt7">
                <Col className="col-xs-1"></Col>
                    <Col className="col-sm-10 col-xs-12">
                       <Row noGutters={true}>
                           <Col className="col-xs-12 leEnqstatus bold">
                           {this.props.t("Pages.object.Enquiry Status")}

                           </Col>
                       </Row>
                    </Col>
                </Row>
                <Row noGutters={true} className="mt7">
                <Col className="col-xs-1"></Col>
                    <Col className="col-xs-12 col-sm-10">
                       <Row noGutters={true}>
                           <Col className="col-xs-12 progressof">
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
                : null 
                }
               
                 </>
                 :
                 <>
                 {/* for change in product data */}
                <hr></hr>
                <Row noGutters={true} id={item.enquiryId}>
                    <Col className="col-xs-1"></Col>
                    <Col className="col-xs-12 col-sm-10">
                        <Row noGutters={true}>
                            <Col sm="9" className="col-xs-12">
                                {item.openEnquiriesResponse.userStatus === 1 ?
                                <div className="imageinlist" > 
                                <div className="imageinlist1"> 
                                    {
                                          item.openEnquiriesResponse.productImages !=null?
                                        item.openEnquiriesResponse.productType === "Product"
                                        ?
                                        <a href={"/showArtisanProduct?ProductHistoryId="+item.openEnquiriesResponse.historyProductId }><img  src={TTCEapi.ImageUrl +"HistoryProduct/" + item.openEnquiriesResponse.historyProductId + "/" + item.openEnquiriesResponse.productHistoryImages.split(",")[0]} className="enquiryimage"></img>
                                        </a>
                                        :
                                        <a href={"/showBuyerProduct?ProductHistoryId="+item.openEnquiriesResponse.historyProductId }><img  src={TTCEapi.ImageUrl +"HistoryCustomProduct/" + item.openEnquiriesResponse.historyProductId + "/" + item.openEnquiriesResponse.productHistoryImages.split(",")[0]} className="enquiryimage"></img>
                                        </a>
                                        :
                                        <img  src={logos.Smile} className="enquiryimage"></img>
                                    }

                                    </div>
                                    
                                    <a href={"/showArtisanProduct?ProductHistoryId="+item.openEnquiriesResponse.historyProductId } className="leEnqprodName">{item.openEnquiriesResponse.productHistoryName}</a>
                                   
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
                                    {/* <span ></span> */}
                                    
                                </div>
                                }
                                <div>
                                  <div noGutters={true} >
                                      <Col className="leEnqid bold">
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
                            <Col sm="3" className="rightsmleft col-xs-12">
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
                <Row noGutters={true} className="mt7">
                <Col className="col-xs-1"></Col>
                    <Col className="col-sm-10 col-xs-12">
                       <Row noGutters={true}>
                           <Col className="col-xs-12 leEnqstatus bold">
                           {this.props.t("Pages.object.Enquiry Status")}

                           </Col>
                       </Row>
                    </Col>
                </Row>
                <Row noGutters={true} className="mt7">
                <Col className="col-xs-1"></Col>
                    <Col className="col-xs-12 col-sm-10">
                       <Row noGutters={true}>
                           <Col className="col-xs-12 progressof ">
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
                 
                {item.openEnquiriesResponse.userStatus === 1 ?
                <Row>
                    <Col className="col-xs-12 text-center leEnqshowmore">
                        {/* <a  onClick={()=>this.individualpage(item.openEnquiriesResponse.enquiryId)} className="leEnqshowmore">{this.props.t("Pages.object.show more details")}<img src={logos.Nextarrow} className="showmorearrow"></img></a> */}
                        <button  onClick={()=>this.individualpage(item.openEnquiriesResponse.enquiryId)} className="leEnqshowmore showmorebtncss">
                        {this.props.t("Pages.object.show more details")}
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
                <Col className="col-xs-12 text-center">
                Loading Please Wait....
                </Col>
                </Row></>
            }
            
                </React.Fragment>
        )
    }
}

// export default CompletedList
export default withTranslation()(CompletedList);

