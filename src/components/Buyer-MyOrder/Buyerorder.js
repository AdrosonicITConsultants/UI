

import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
// import "./AllEnquiryList.css";
import queryString from 'query-string';
import TTCEapi from '../../services/API/TTCEapi';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Moment from 'react-moment';
// import { Footer } from 'rsuite';
import Footer from "../footer/footer";
import { BuyerTransaction } from './BuyerTransaction';
import { BuyerRecentList } from '../BuyerTransaction/BuyerRecentList';
import Diffdays from '../BuyerOrder/Diffdays';
import { ChangeRequest } from './ChangeRequest';
import { CRaccepted } from './CRaccepted';
import { BuyerPreviewNewPI } from './BuyerPreviewNewPI';




export class Buyerorder extends Component {
    constructor() {
        super();

       
        this.state = {
            selected:"BuyerDetails",
            transaction: true,
            proformainvoice: false,
            changeReq: false,
            taxInvoice:false,
            qualityCheck:false, 
            dataload:false,
            enquiryCode:"",
            enquiryStagesMTO :[],
            openEnquiries: [],
            productCategories: [],
            yarns : [],
            enquiryStagesAvailable:[],
        
        }
        this.transactionsbtn = this.transactionsbtn.bind(this);
        this.moqDetailsbtn = this.moqDetailsbtn.bind(this);
        this.proformaDetailsbtn = this.proformaDetailsbtn.bind(this);
        this.changeRequestbtn = this.changeRequestbtn.bind(this);
        this.qualityCheckbtn = this.qualityCheckbtn.bind(this);
    }
     ToggleDelete22 = (id) => {
        document.getElementById('id09'+ id).style.display='block';
       }

       ToggleDeleteClose22 = (id) => {
        document.getElementById('id09'+ id).style.display='none';
       }
       ToggleDelete = () => {
        document.getElementById('id01').style.display='block';
       }

       ToggleDeleteClose = () => {
        document.getElementById('id01').style.display='none';
       }
    transactionsbtn(){
      
        this.setState((prevState) => {
            return{
                selected: "BuyerDetails",
                transaction: true,
                proformainvoice: false,
                changeReq: false,
                taxInvoice:false,
                qualityCheck:false,
               
            };
          
        });
    }

    moqDetailsbtn(){
        this.setState((prevState) => {
            return{
             selected: "moqDetails",
            proformainvoice: true,
            transaction: false,
            changeReq: false,
            taxInvoice:false,
            qualityCheck:false,
         
            };
        });
    }

        proformaDetailsbtn(){
        this.setState((prevState) => {
            return{
                selected:"changeReq",
                changeReq: true,
                proformainvoice: false,
                transaction: false,
                taxInvoice:false,
                qualityCheck:false,
                
            };
        });
    }
    changeRequestbtn(){
        this.setState((prevState) => {
            return{
                selected:"qualityCheck",
                changeReq: false,
                proformainvoice: false,
                transaction: false,
                taxInvoice:false,
                qualityCheck:true,
             
            };
        });
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
    qualityCheckbtn(){
        this.setState((prevState) => {
            return{
                selected:"taxInvoice",
                changeReq: false,
                proformainvoice: false,
                transaction: false,
                taxInvoice:true,
                qualityCheck:false,
                
              
            };
        });
    }
          
    backoperation(){
        browserHistory.goBack(); 
    } 

    handleCluster(e) {
 
        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index];
        var option =  optionElement.getAttribute('moqId');
     
      }
      componentDidMount(){
        window.scrollTo(0, 0);
        let params = queryString.parse(this.props.location.search);
        console.log(params);
        this.state.enquiryCode = params.code;
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
                        TTCEapi.getSingleOrder(params.code).then((response1)=>{
                            console.log("")
                            if(response1.data.valid)
                            {   console.log("heree");
                                console.log(response1.data.data);
                                this.setState({openEnquiries:response1.data.data, dataload:true},()=>{
                                    // console.log(this.state);
                                });
                                
                            }
                        },()=>{
                           
                        })
                    });
            }
        })
       
        
        
      }

  
      

    render() {
        return (
            <React.Fragment>
                <NavbarComponent/>
                 {this.state.dataload == true 
                   
                   ? 
                   <>
                
                <Container>
                <Row noGutters={true} className="">
                           <Col sm = "1" className="col-xs-2">
                           <img
                                       src={logos.backarrowicon}
                                       className="margin-cparrow cparrowsize glyphicon"
                                        onClick={() => this.backoperation()}
                            ></img>
                          
                          </Col>
                          <Col sm="10" className="col-xs-9">
                               <Row noGutters={true} className ="cp1heading bold  ">
                                   <Col md="12" className="col-xs-12">
                                        Order Id : 
                                        {this.state.openEnquiries[0].openEnquiriesResponse.orderCode}
                                       </Col>
                               </Row>
                          </Col>                            
                </Row>
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
                                            {/* <div noGutters={true} >
                                                <Col className="leEnqid bold">
                                                Order Id : {item.openEnquiriesResponse.enquiryCode}
                                                </Col>
                                            </div> */}
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
                    <Row noGutters={true}>
                        <Col className="col-xs-9"></Col>
                        <Col className="col-xs-2">
                        <input type="button" className="enqreqbtn" value ="Go to this Enquiry chat"></input>

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
                    <Row noGutters={true}>
                        <Col className="col-xs-9"></Col>
                        <Col className="col-xs-2">
                        <input type="button" className="enqreqbtn" value ="Go to this Enquiry chat"></input>

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
                                {this.state.enquiryStagesAvailable.map((item1) => <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId == item1.orderStages.id ? "is-active": " "} >{item1.orderStages.desc}</li> )     }
                                <li >Completed</li>
                                </ul>
                                :
                                <>
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
                  
                    </>
                    )}

                
                
               

                             
                               <Row noGutters={true}>
                                    <Row noGutters={true}>
                                    <Col sm={1}>
     
                                            </Col>
                                            <Col sm={2}  
                                            className={
                                                (this.state.selected == "BuyerDetails"
                                                     ? "Allenqlistbtn2 "
                                                         : "Allenqlistbtn ")
                                                     }
                                            onClick={this.transactionsbtn}>
                                            Transaction
                                            </Col>
                                            <Col sm={2} 
                                            className={
                                                (this.state.selected == "moqDetails"
                                                     ? "Allenqlistbtn2"
                                                         : "Allenqlistbtn")
                                                     }
                                            onClick={this.moqDetailsbtn}>
                                            Proforma Invoice 
                                            </Col>

                                            <Col sm={2} 
                                              className={
                                                (this.state.selected == "changeReq"
                                                     ? "Allenqlistbtn2"
                                                         : "Allenqlistbtn")
                                                     }
                                             onClick={this.proformaDetailsbtn}>
                                           Change Request
                                            </Col>
                                            <Col sm={2} 
                                              className={
                                                (this.state.selected == "qualityCheck"
                                                     ? "Allenqlistbtn2"
                                                         : "Allenqlistbtn")
                                                     }
                                             onClick={this.changeRequestbtn}>
                                             Quality Check 
                                            </Col>
                                            <Col sm={2}  
                                            className={
                                                (this.state.selected == "taxInvoice"
                                                     ? "Allenqlistbtn2"
                                                         : "Allenqlistbtn")
                                                     }
                                            onClick={this.qualityCheckbtn}>
                                           Tax Invoice
                                            </Col> 
                                             <Col sm={1}>
                                            
                                            </Col>
                                    </Row>
                                    <br></br>

                                                       <Row noGutters={true}>
                                                           <Col sm={1}></Col>
                                                          
          
                                                                {this.state.transaction ? 
                                                                             
                                                                             <>
                                                                           
                                                                             <Col sm={12}>
                                                                              <div>
                                                                           <BuyerTransaction enquiryCode={this.state.enquiryCode}/>
                                                                             </div>
                                                                             </Col>
                                                                             </>
                                                                              :
                                                                                 null}
                                                            
  





                                                                {this.state.proformainvoice? 
                                                                <>
                                                                {/* <Col sm={1}></Col> */}
                                                                <Col sm={10}>
                                                               <BuyerPreviewNewPI
                                                               enquiryCode={this.state.enquiryCode}
                                                                />
                                                                </Col>
                                                                </>
                                                                :
                                                                <>
                                                                </>}

     
                   

                                                            {this.state.changeReq ? 
                                                            <>
                                                            <Col sm={1}></Col>
                                                            <Col sm={8}>
                                                            {/* <ChangeRequest /> */}
                                                            <CRaccepted />
                                                            </Col>
                                                            </>
                                                            :null}
                                       
                                                            {this.state.qualityCheck ?  
                                                            <>
                                                            <Col sm={1}></Col>
                                                            <Col sm={8}>
                                                             <div>
                                                            <h6>QC...</h6>
                                                            </div>
                                                            </Col>
                                                            </>:null}

                                                            {this.state.taxInvoice ? 
                                                            <>
                                                            <Col sm={1}></Col>
                                                            <Col sm={8}>
                                                             <div>
                                                            <h6>tax...</h6>
                                                            </div>
                                                            </Col>
                                                            </>
                                                            :null}
                                                            
                                                            
                                                            
                                                     </Row>
  
  
                               </Row>
                               <Row>
            <div> 
              <img
                className="notifyFooterBanner internaldiv"
                src={logos.notifyFooterBanner}
              ></img>
            </div>
          </Row> 
                </Container>
               
                </> :
                <>
                <Container>
                    </Container> </>}
                 <Footer/>
            </React.Fragment>
        )
    }
}



function mapStateToProps(state) {
    // debugger;
    const { user } = state
    return { user };
}
