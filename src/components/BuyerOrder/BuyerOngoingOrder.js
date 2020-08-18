import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import "./Order.css"
import TTCEapi from '../../services/API/TTCEapi';
import Moment from 'react-moment';

export class BuyerOngoingOrder extends Component {
    
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
    
    componentDidMount(){

        TTCEapi.getProductUploadData().then((response)=>{
            if(response.data.valid)
            {
                console.log(response);
                this.setState({productCategories: response.data.data.productCategories,
                    yarns: response.data.data.yarns },()=>{
                        TTCEapi.getOpenEnquiries().then((response1)=>{
                            console.log("")
                            if(response1.data.valid)
                            {   console.log("heree");
                                console.log(response1.data.data);
                                this.setState({openEnquiries:response1.data.data, dataload:true},()=>{
                                    console.log(this.state);
                                });

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
        // localStorage.setItem("seeMoreId", id);
        browserHistory.push("/buyerEnquiryDetails?code=" + id);
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
                        <hr></hr>
                    <Row noGutters={true} id={item.enquiryId}>
                        <Col className="col-xs-1"></Col>
                        <Col className="col-xs-10">
                        {/* <Col className="col-xs-10" ref={this.scrollDiv}> */}
                        <Row noGutters={true}>
                            <Col className="col-xs-12 convertedDate">
                                Converted to order on : 12-07-2019
                                
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
                                            {/* <span ></span> */}

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
                                    {/* <div noGutters={true} >
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
                                    </div> */}
                                    {/* <div noGutters={true} className="" >
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
                                    </div> */}
                                        <div noGutters={true} >
                                        <Col className="leEnqidDateStarted">
                                        Date Started : 
                                        <Moment format="YYYY-MM-DD">
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
                                        <Moment format="YYYY-MM-DD">
                                        {item.openEnquiriesResponse.lastUpdated}
                                            </Moment>
                                            
                                        </Col>
                                    </div>
                                    <div noGutters={true} >
                                        <Col className="leEnqidEstDelivery">
                                        Est. Date of delivery : 
                                        {item.openEnquiriesResponse.excpectedDate != null 
                                        ?
                                        <Moment format="YYYY-MM-DD">
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
                                {item.openEnquiriesResponse.productStatusId === 2
                                ?
                                <ul className="list-unstyled multi-steps">
                                {this.state.enquiryStagesAvailable.map((item1) => <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId == item1.id ? "is-active": " "} >{item1.desc}</li> )     }
                                <li >Completed</li>
                                </ul>
                                :
                                <ul className="list-unstyled multi-steps">
                                {this.state.enquiryStagesMTO.map((item1) => <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId == item1.id ? "is-active": " "} >{item1.desc}</li> )     }
                                <li >Completed</li>
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
                                        <a href={"/showBArtisanProduct?ProductHistoryId="+item.openEnquiriesResponse.historyProductId }><img  src={TTCEapi.ImageUrl +"HistoryProduct/" + item.openEnquiriesResponse.historyProductId + "/" + item.openEnquiriesResponse.productHistoryImages.split(",")[0]} className="enquiryimage"></img>
                                        </a>
                                        :
                                        <a href={"/showBuyerProduct?ProductHistoryId="+item.openEnquiriesResponse.historyProductId }><img  src={TTCEapi.ImageUrl +"HistoryCustomProduct/" + item.openEnquiriesResponse.historyProductId + "/" + item.openEnquiriesResponse.productHistoryImages.split(",")[0]} className="enquiryimage"></img>
                                        </a>

                                    }

                                    </div>
                                    
                                    <a href={"/showBArtisanProduct?ProductHistoryId="+item.openEnquiriesResponse.historyProductId } className="leEnqprodName">{item.openEnquiriesResponse.productHistoryName}</a>
                                    {/* <span ></span> */}
                                       
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
                                    {/* <div noGutters={true} >
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
                                    </div> */}
                                    {/* <div noGutters={true} className="" >
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
                                    </div> */}
                                        <div noGutters={true} >
                                        <Col className="leEnqidDateStarted">
                                        Date Started : 
                                        <Moment format="YYYY-MM-DD">
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
                                        <Col className="leEnqidDateStarted">
                                        Date Started : 
                                        <Moment format="YYYY-MM-DD">
                                            {item.openEnquiriesResponse.startedOn}
                                            </Moment>
                                        </Col>
                                    </div>
                                    <div noGutters={true} >
                                        <Col className="leEnqidLastUpdated">
                                        Last Updated : 
                                        <Moment format="YYYY-MM-DD">
                                        {item.openEnquiriesResponse.lastUpdated}
                                            </Moment>
                                            
                                        </Col>
                                    </div>
                                    <div noGutters={true} >
                                        <Col className="leEnqidEstDelivery">
                                        Est. Date of delivery : 
                                        {item.openEnquiriesResponse.excpectedDate != null 
                                        ?
                                        <Moment format="YYYY-MM-DD">
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
                                {this.state.enquiryStagesAvailable.map((item1) => <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId == item1.id ? "is-active": " "} >{item1.desc}</li> )     }
                                <li >Completed</li>
                                </ul>
                                :
                                <ul className="list-unstyled multi-steps">
                                {this.state.enquiryStagesMTO.map((item1) => <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId == item1.id ? "is-active": " "} >{item1.desc}</li> )     }
                                <li >Completed</li>
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

export default BuyerOngoingOrder
