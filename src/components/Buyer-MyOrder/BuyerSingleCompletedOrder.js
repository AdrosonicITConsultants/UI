

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
import { BuyerOldPi } from './BuyerOldPi';
import { PreviewTaxInvoice } from '../Artisan-MyOrder/PreviewTaxInvoice';
import ArtisanTaxInvoice from '../Artisan-MyOrder/ArtisanTaxInvoice';
import BuyerQC from './BuyerQC';
import { DownloadBuyerPreviewPI } from './DownloadBuyerPreviewPI';
import DaysRemaining from '../FaultyOrder/DaysRemaining';
import { BuyerCompletedTransaction } from './BuyerCompletedTransactions';
// import DatePicker from 'react-datetime';
// import moment from 'moment';
// import 'react-datetime/css/react-datetime.css';

// const today = moment();
//   const disableFutureDt = current => {
//     return current.isBefore(today)
//   }

export class BuyerSingleCompletedOrder extends Component {
    constructor() {
        super();
        this.scrollCR = React.createRef();
       
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
            getOrderProgress:[],
            yarns : [],
            enquiryStagesAvailable:[],
            innerEnquiryStages : [],
            markOrderAsRecieved:[],
            BuyerPreviewInvoice:true,
            completebtndis:true,
            deliveredDate:"",
            getSingleOrder:[]
        
        }
        this.transactionsbtn = this.transactionsbtn.bind(this);
        this.moqDetailsbtn = this.moqDetailsbtn.bind(this);
        this.proformaDetailsbtn = this.proformaDetailsbtn.bind(this);
        this.changeRequestbtn = this.changeRequestbtn.bind(this);
        this.qualityCheckbtn = this.qualityCheckbtn.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);


    }
    handleChange(e) {
        const { name, value } = e.target;
        console.log(value);
        this.setState({ [name]: value,showValidationMoq: false ,completebtndis:false}, () => {
       
        });
    }
    handleChange1(e) {
        const { name, value } = e.target;
        
        console.log(value);
        this.setState({ [name]: value,showValidationMoq: false ,completebtndis:false}, () => {
       
        });
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

    FoundSomethingfaulty(id){
        browserHistory.push("/completedorderfaulty?orderid="+id);

    }
    FaultyOrder(id){
        browserHistory.push("/faulty?orderid="+id)
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
        CompleteOrderShow = (id) => {
            
            console.log(id)
          
            document.getElementById('CompleteOrder').style.display='block';

        //  document.getElementById('CompleteOrder').style.display='block';
        }
        CompleteOrderClose = () => {
         document.getElementById('CompleteOrder').style.display='none';
        }
        CompleteOrder2Show = (enquiryId) => {
            if(this.state.deliveredDate){
                console.log(this.state.deliveredDate)
                console.log(enquiryId)
                this.setState({
                    completebtndis:true
                })
                TTCEapi.markOrderAsRecieved(enquiryId,this.state.deliveredDate).then((response)=>{
                    if(response.data.valid)
                    {   
                        document.getElementById('CompleteOrder').style.display='none';
    
                        document.getElementById('CompleteOrder2').style.display='block';
                        TTCEapi.markEnquiryClosed(enquiryId).then((response)=>{
                            if(response.data.valid  )
                            {
                                customToast.success("Order closed!", {
                                    position: toast.POSITION.TOP_RIGHT,
                                    autoClose: true,
                                  });
                                  
                
                            }
                        });
                         console.log(response.data.data);
                        this.setState({
                            markOrderAsRecieved: response.data.data
                        })
                    }
                    else{
                        document.getElementById('CompleteOrder').style.display='none';

                        customToast.error(response.data.errorMessage, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: true,
                          });
                    }
                  });
            }
       else
       this.setState({
        completebtndis:false
    })
       
           }
        CompleteOrder2Close = () => {
            document.getElementById('CompleteOrder2').style.display='none';
            browserHistory.push("/buyerOrders"); 
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

        // raiseCRTabFunction = () => {
        //     this.proformaDetailsbtn();
        //     this.scrollCR.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "center",
        //     });
        // }

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
                        var numberOfDaysToAdd = 10;
                        someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
                        var todayDate= new Date();
                        const diffTime =  someDate - todayDate ;
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
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

        propsSendFunction = () => {
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
               
                this.setState({productCategories: response.data.data.productCategories,
                    yarns: response.data.data.yarns },()=>{
                        TTCEapi.getClosedOrder(this.state.enquiryCode).then((response1)=>{
                            console.log("")
                            if(response1.data.valid)
                            {   
                                console.log(response1.data.data);
                                this.setState({openEnquiries:response1.data.data,
                                    getSingleOrder : response1.data.data[0].openEnquiriesResponse,
                                     dataload:true},()=>{
                                        console.log(this.state.getSingleOrder);
                                    var data = localStorage.getItem("changeRequest");
                                    if(data) {
                                        localStorage.removeItem("changeRequest");
                                    }
                                });
                                
                            }
                        },()=>{
                            
                        })
                    });
                }
                });

        }

        reviewPageButton = (id, code) => {
            localStorage.removeItem("ratingEnquiryCode");
            localStorage.setItem("ratingEnquiryCode", code);
            browserHistory.push("/buyerRating?code=" + id);
        }

        componentDidMount(){
        window.scrollTo(0, 0);
        let params = queryString.parse(this.props.location.search);
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
       
        this.setState({productCategories: response.data.data.productCategories,
            yarns: response.data.data.yarns },()=>{
                TTCEapi.getClosedOrder(params.code).then((response1)=>{
                    console.log("")
                    if(response1.data.valid)
                    {   
                        console.log(response1.data.data);
                        this.setState({openEnquiries:response1.data.data,
                            getSingleOrder : response1.data.data[0].openEnquiriesResponse,
                             dataload:true},()=>{
                                console.log(this.state.getSingleOrder);
                            var data = localStorage.getItem("changeRequest");
                            if(data) {
                                localStorage.removeItem("changeRequest");
                            }
                        });
                        
                    }
                },()=>{
                    
                })
            });
        }
        });
        }
    render() {
        return (
            <React.Fragment>
                <NavbarComponent/>
                 {(this.state.openEnquiries.length > 0 && this.state.enquiryStagesAvailable.length > 0 &&  this.state.enquiryStagesMTO.length > 0 && this.state.innerEnquiryStages.length>0 )                 
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
                                        {/* <div noGutters={true} className="" >
                                            <Col className="leEnqprodcode ">
                                                <span className="leEnqprodbn ">Artisan Brand Name : </span>
                                                <span className="leEnqbrandname ">{item.brandName ? item.brandName : "NA" }</span>                                   
                                            </Col>
                                        </div> */}
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
                   
                    <hr></hr>
                    {this.state.getSingleOrder.comment?
                    <>
                    <Row noGutters={true}>
                     <Col className="col-xs-12" style={{textAlign:"center"}}>
                         <span>
                             {/* <button  style={{fontSize:"15px",backgroundColor:"rgb(204, 0, 0);"}} 
                              onClick={()=>this.FoundSomethingfaulty(this.state.enquiryCode)} 
                              className="buyerMOQAcceptModalOkayButton Foundunusualbtn">
                             <img src={logos.sadwhite} className="raterevbtnimg"/>Found Something unusual?</button> */}
                                <button
                                style={{fontSize:"15px"}}
                                onClick={() => this.reviewPageButton(parseInt(this.state.enquiryCode), item.openEnquiriesResponse.enquiryCode)}
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
                                  {item.openEnquiriesResponse.enquiryStageId>9 && this.daysleftFaultyOrder(item.openEnquiriesResponse.orderReceiveDate,3)>0 && this.daysleftFaultyOrder(item.openEnquiriesResponse.orderReceiveDate,3)<4?
<>
<Row noGutters={true}>
                     <Col className="col-xs-12" style={{textAlign:"center"}}>
                         <span>
                             {/* <button  style={{fontSize:"15px",backgroundColor:"rgb(204, 0, 0);"}} 
                              onClick={()=>this.FoundSomethingfaulty(this.state.enquiryCode)} 
                              className="buyerMOQAcceptModalOkayButton Foundunusualbtn">
                             <img src={logos.sadwhite} className="raterevbtnimg"/>Found Something unusual?</button> */}
                                <button
                                style={{fontSize:"15px"}}
                                onClick={() => this.reviewPageButton(parseInt(this.state.enquiryCode), item.openEnquiriesResponse.enquiryCode)}
                                className="buyerMOQAcceptModalOkayButton raterevbtn">
                                    <img src={logos.ratereview} className="raterevbtnimg"/>
                                Rate & Review this order
                            </button>
                        </span>
                     </Col>
                 </Row> 
</>
:
item.openEnquiriesResponse.enquiryStageId>9 ?
                    <Row noGutters={true}>
                     <Col className="col-xs-12" style={{textAlign:"center"}}>
                         <span>
                             {/* <button  style={{fontSize:"15px",backgroundColor:"rgb(204, 0, 0);"}} 
                              onClick={()=>this.FoundSomethingfaulty(this.state.enquiryCode)} 
                              className="buyerMOQAcceptModalOkayButton Foundunusualbtn">
                             <img src={logos.sadwhite} className="raterevbtnimg"/>Found Something unusual?</button> */}
                                <button
                                style={{fontSize:"15px"}}
                                onClick={() => this.reviewPageButton(parseInt(this.state.enquiryCode), item.openEnquiriesResponse.enquiryCode)}
                                className="buyerMOQAcceptModalOkayButton raterevbtn">
                                    <img src={logos.ratereview} className="raterevbtnimg"/>
                                Rate & Review this order
                            </button>
                        </span>
                     </Col>
                 </Row> : null
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
               

                  
                  
                   {/* _________________________________________Modal_1________________________________________________ */}
                                          
    <div id="CompleteOrder" class="w3-modal">
    <div class="w3-modal-content w3-animate-top modalBoxSize">
        <div class="w3-container buyerMOQAcceptModalContainer">
        <Row noGutters={true}>
            <Col sm={12}  style={{textAlign:"right"}}>
              <h1 className="closebtn" onClick={() => this.CompleteOrderClose()}>X</h1>
            </Col>
  
        </Row>
        <Row noGutters={true} className="buyerMOQAcceptModalOuter uploadingreceiptheading ">
            <Col className="col-xs-12 ">
                <h1 className="areyousurecrh1 fontplay">Congrats!
                {this.state.openEnquiries[0].openEnquiriesResponse.enquiryId}</h1> 
                <br/>
                <b className="CRare fontplay" style={{color:"grey",fontWeight:"100"}}>Found order as per requirement!</b> 
                
            </Col>
        </Row>
        <Row noGutters={true} className=" ">
            <Col className="col-xs-12 " style={{textAlign:"center"}}>
          <img src={logos.ConfirmDelivered} style={{height:"150px"}}/>
            <br/>
            <input className="PIinput" type="date"
            style={{width:"50%",borderRadius:"50px",padding:"15px"}}                                       
              // value={this.state.orderDispatchDate }
              placeholder="Enter date of receiving"
             name="deliveredDate"
              onChange={this.handleChange1}
              required/>
              {/* <DatePicker
              className="PIinput"
              style={{width:"50%",borderRadius:"50px",padding:"15px"}}
              placeholder="Enter date of receiving"
              name="deliveredDate"
               onChange={this.handleChange1}
             timeFormat={false}
             isValidDate={disableFutureDt}
             /> */}
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
               disabled={this.state.completebtndis}
                onClick={()=>{this.CompleteOrder2Show(this.state.enquiryCode)}}
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
                                          
   <div id="CompleteOrder2" class="w3-modal">
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
        <p className="crmnote"> Please check the order before marking order received as per requirement.
            <br/>Once marked the order will be considered as completed  
            <br/>and no concern can be raised against it.</p>
            
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
                 onClick={this.CompleteOrder2Close}>
                     Skip <i class="fa fa-angle-double-right" aria-hidden="true"></i></button>
        </div>
            
        </Col>
        </Row>
                                                                            
        
    </div>
    </div>
</div>
      {/* -------------------------------------------Modal ends  ----------------------------           */}
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
                                    {/* <div noGutters={true} className="" >
                                        <Col className="leEnqprodcode ">
                                            <span className="leEnqprodbn ">Artisan Brand Name : </span>
                                            <span className="leEnqbrandname ">{item.brandName ? item.brandName : "NA" }</span>                                   
                                        </Col>
                                    </div> */}
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
                            </Row>
                        </Col>
                    </Row>
                   

                    
                    {/* change here order dispatch */}
                   
                    <hr></hr>

                        {this.state.getSingleOrder.comment?
                    <>
                    <Row noGutters={true}>
                     <Col className="col-xs-12" style={{textAlign:"center"}}>
                         <span>
                             {/* <button  style={{fontSize:"15px",backgroundColor:"rgb(204, 0, 0);"}} 
                              onClick={()=>this.FoundSomethingfaulty(this.state.enquiryCode)} 
                              className="buyerMOQAcceptModalOkayButton Foundunusualbtn">
                             <img src={logos.sadwhite} className="raterevbtnimg"/>Found Something unusual?</button> */}
                                <button
                                style={{fontSize:"15px"}}
                                onClick={() => this.reviewPageButton(parseInt(this.state.enquiryCode), item.openEnquiriesResponse.enquiryCode)}
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
                                  {item.openEnquiriesResponse.enquiryStageId>9 && this.daysleftFaultyOrder(item.openEnquiriesResponse.orderReceiveDate,3)>0 && this.daysleftFaultyOrder(item.openEnquiriesResponse.orderReceiveDate,3)<4?
<>
<Row noGutters={true}>
                     <Col className="col-xs-12" style={{textAlign:"center"}}>
                         <span>
                             {/* <button  style={{fontSize:"15px",backgroundColor:"rgb(204, 0, 0);"}} 
                              onClick={()=>this.FoundSomethingfaulty(this.state.enquiryCode)} 
                              className="buyerMOQAcceptModalOkayButton Foundunusualbtn">
                             <img src={logos.sadwhite} className="raterevbtnimg"/>Found Something unusual?</button> */}
                                <button
                                style={{fontSize:"15px"}}
                                onClick={() => this.reviewPageButton(parseInt(this.state.enquiryCode), item.openEnquiriesResponse.enquiryCode)}
                                className="buyerMOQAcceptModalOkayButton raterevbtn">
                                    <img src={logos.ratereview} className="raterevbtnimg"/>
                                Rate & Review this order
                            </button>
                        </span>
                     </Col>
                 </Row> 
</>
:
item.openEnquiriesResponse.enquiryStageId>9 ?
                    <Row noGutters={true}>
                     <Col className="col-xs-12" style={{textAlign:"center"}}>
                         <span>
                             {/* <button  style={{fontSize:"15px",backgroundColor:"rgb(204, 0, 0);"}} 
                              onClick={()=>this.FoundSomethingfaulty(this.state.enquiryCode)} 
                              className="buyerMOQAcceptModalOkayButton Foundunusualbtn">
                             <img src={logos.sadwhite} className="raterevbtnimg"/>Found Something unusual?</button> */}
                                <button
                                style={{fontSize:"15px"}}
                                onClick={() => this.reviewPageButton(parseInt(this.state.enquiryCode), item.openEnquiriesResponse.enquiryCode)}
                                className="buyerMOQAcceptModalOkayButton raterevbtn">
                                    <img src={logos.ratereview} className="raterevbtnimg"/>
                                Rate & Review this order
                            </button>
                        </span>
                     </Col>
                 </Row> : null
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
                  
                   

        {/* .................................Navigation Section................................  */}
        {/* .................................Navigation Section................................  */}
        {/* .................................Navigation Section................................  */}
        {/* .................................Navigation Section................................  */}
<br></br>

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
                        <div ref={this.scrollCR}> Change Request</div>
               
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
                                <BuyerCompletedTransaction enquiryCode={this.state.enquiryCode}/>
                            </div>
                            </Col>
                            </>
                            :
                                null}

                                            {this.state.proformainvoice? 
                                                                <>
                                                                {/* <Col sm={1}></Col> */}
                                                                <Col sm={10}>
                                                               <DownloadBuyerPreviewPI
                                                               enquiryId={this.state.enquiryCode}
                                                               enquiryCode={item.openEnquiriesResponse.enquiryCode}
                                                               
                                                                /> 
                                                                {/* <BuyerOldPi 
                                                                 enquiryId={this.state.enquiryCode}
                                                                 enquiryCode={item.openEnquiriesResponse.enquiryCode}
                                                                /> */}
                                                               
                                                                </Col>
                                                                </>
                                                                :
                                                                <>
                                                                </>}
                                                         {this.state.changeReq ? 
                                                            <>
                                                            <Col sm={1}></Col>
                                                            <Col sm={8}>
                                                                {
                                                                    this.state.openEnquiries[0].openEnquiriesResponse.historyProductId == null
                                                                    ?
                                                                    <>
                                                                    {
                                                                    this.state.openEnquiries[0].openEnquiriesResponse.productStatusId == 2
                                                                    ?
                                                                    <>
                                                                     <Row noGutters={true}>
                                                                        <Col className="col-xs-12 bold font20 text-center">
                                                                            <br></br>
                                                                            Change request is not applicable for in stock Products.
                                                                            <br></br>
                                                                        </Col>
                                                                    </Row>
                                                                    </>
                                                                    :
                                                                    <>
                                                                      {this.state.openEnquiries[0].openEnquiriesResponse.changeRequestOn === 0
                                                                        ?
                                                                        <Row noGutters={true}>
                                                                            <Col className="col-xs-12 bold font20 text-center">
                                                                                <br></br>
                                                                                Change request disabled by artisan
                                                                                <br></br>
                                                                            </Col>
                                                                        </Row>
                                                                        
                                                                        : <>
                                                                        {(this.state.openEnquiries[0].openEnquiriesResponse.changeRequestStatus === null) || 
                                                                        (this.state.openEnquiries[0].openEnquiriesResponse.changeRequestStatus === 0) ?
                                                                        this.daysleftFaultyOrder(this.state.openEnquiries[0].openEnquiriesResponse.orderCreatedOn, 10) > 0 ? 
                                                                        <ChangeRequest enquiryCode={this.state.enquiryCode} changeRequestStatus={this.state.openEnquiries[0].openEnquiriesResponse.changeRequestStatus}
                                                                        componentFunction={this.propsSendFunction}/> 
                                                                        : 
                                                                        <Row noGutters={true}>
                                                                        <Col className="col-xs-12 bold font20 text-center">
                                                                            <br></br>
                                                                            Last date to raise Change Request passed.
                                                                            <br></br>
                                                                        </Col>
                                                                    </Row>
                                                                    :
                                                                        <CRaccepted enquiryCode={this.state.enquiryCode} changeRequestStatus={this.state.openEnquiries[0].openEnquiriesResponse.changeRequestStatus}/>
                                                                        }
                                                                        </>
                                                                        }

                                                                    </>
                                                                    }
                                                                    </>

                                                                    :
                                                                    <>
                                                                    {
                                                                    this.state.openEnquiries[0].openEnquiriesResponse.productStatusHistoryId == 2
                                                                    ?
                                                                    <>
                                                                     <Row noGutters={true}>
                                                                        <Col className="col-xs-12 bold font20 text-center">
                                                                            <br></br>
                                                                            Change request is not applicable for in stock Products.
                                                                            <br></br>
                                                                        </Col>
                                                                    </Row>
                                                                    </>
                                                                    :
                                                                    <>
                                                                      {this.state.openEnquiries[0].openEnquiriesResponse.changeRequestOn === 0
                                                                        ?
                                                                        <Row noGutters={true}>
                                                                            <Col className="col-xs-12 bold font20 text-center">
                                                                                <br></br>
                                                                                Change request disabled by artisan
                                                                                <br></br>
                                                                            </Col>
                                                                        </Row>
                                                                        
                                                                        : <>
                                                                        {(this.state.openEnquiries[0].openEnquiriesResponse.changeRequestStatus === null) || 
                                                                        (this.state.openEnquiries[0].openEnquiriesResponse.changeRequestStatus === 0) ?
                                                                        this.daysleftFaultyOrder(this.state.openEnquiries[0].openEnquiriesResponse.orderCreatedOn, 10) > 0 ? 
                                                                        <ChangeRequest enquiryCode={this.state.enquiryCode} changeRequestStatus={this.state.openEnquiries[0].openEnquiriesResponse.changeRequestStatus}
                                                                        componentFunction={this.propsSendFunction}/> 
                                                                        : 
                                                                        <Row noGutters={true}>
                                                                        <Col className="col-xs-12 bold font20 text-center">
                                                                            <br></br>
                                                                            Last date to raise Change Request passed.
                                                                            <br></br>
                                                                        </Col>
                                                                    </Row>
                                                                    :
                                                                        <CRaccepted enquiryCode={this.state.enquiryCode} changeRequestStatus={this.state.openEnquiries[0].openEnquiriesResponse.changeRequestStatus}/>
                                                                        }
                                                                        </>
                                                                        }

                                                                    </>
                                                                    }
                                                                    

                                                                    </>


                                                                }
                                                          
                                                            </Col>
                                                            </>
                                                            :null}
                                       
                                                            {this.state.qualityCheck ?  
                                                            <>
                                                            <Col sm={10}>
                                                            <BuyerQC enquiryId={this.state.enquiryCode}/>
                                                            </Col>
                                                            </>:null}

                                                            {this.state.taxInvoice ? 
                                                            <>
                                                            <Col sm={10}>
                                                                <ArtisanTaxInvoice
                                                                 enquiryId={this.state.enquiryCode}
                                                                 enquiryCode={item.openEnquiriesResponse.enquiryCode}
                                                                 BuyerPreviewInvoice={this.state.BuyerPreviewInvoice}/>
                                                            </Col>
                                                            
                                                            </>
                                                            :null}
                                                            
                                                            
                    
                    
                    
                </Row>


                  
                    
            <div> 
              <img
                className="notifyFooterBanner internaldiv"
                src={logos.notifyFooterBanner}
              ></img>
            </div>
          </Row> 
          </>
                    )}
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
