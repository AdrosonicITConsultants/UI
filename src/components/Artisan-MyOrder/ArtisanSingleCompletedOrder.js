
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
import  ArtisanTransaction  from './ArtisanTransaction';
import { PIchange } from './PIChange';
import { PreviewOldchanges } from './PreviewOldchanges';
import { ChangeRequest } from '../Buyer-MyOrder/ChangeRequest';
import { PreviewChangedPI } from './PreviewChangedPI';
import { ArtisanChangeRequest } from './ArtisanChangeRequest';
import ArtisanTaxInvoice from './ArtisanTaxInvoice';
import ArtisanQC from './ArtisanQC';
import  ArtisanCompletedTransaction  from './ArtisanCompletedTransactions';
import { useTranslation, withTranslation } from "react-i18next";

 class ArtisanSingleCompletedOrder extends Component {
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
            innerEnquiryStages : [],
            getChangeRequestForArtisan:[],
            getClosedOrder:[],
            getPi:[],
            BuyerPreviewInvoice:false
           
        
        }
        this.transactionsbtn = this.transactionsbtn.bind(this);
        this.moqDetailsbtn = this.moqDetailsbtn.bind(this);
        this.proformaDetailsbtn = this.proformaDetailsbtn.bind(this);
        this.changeRequestbtn = this.changeRequestbtn.bind(this);
        this.qualityCheckbtn = this.qualityCheckbtn.bind(this);
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
    inprogresss = () => {
        console.log("inprogress");
        this.ToggleDeleteClose();
        let params = queryString.parse(this.props.location.search);
        TTCEapi.progressUpdate(parseInt(this.state.openEnquiries[0].openEnquiriesResponse.enquiryStageId),parseInt(params.code),parseInt(this.state.openEnquiries[0].openEnquiriesResponse.innerEnquiryStageId)).then((response)=>{
            if(response.data.valid)
            {
                customToast.success("Product Status Updated", {
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
        })
    }
    stateupdate = () => {
        this.ToggleDeleteClose();
        let params = queryString.parse(this.props.location.search);
        var innerID = 0 ;
        console.log(this.state.Progressidnext);
        if(this.state.openEnquiries[0].openEnquiriesResponse.enquiryStageId == 4)
        {
            innerID = 1;
        }
        else if(this.state.Progressidnext == 5) {
            innerID = this.state.openEnquiries[0].openEnquiriesResponse.innerEnquiryStageId + 1;
        }
        else innerID = 0;
        if(this.state.Progressidnext == 4)
        {   
            
        }
        else{
            if(this.state.Progressidnext == 5 && innerID == 5 ){
                TTCEapi.progressUpdate(parseInt(this.state.Progressidnext),parseInt(params.code),innerID ).then((response)=>{
                    if(response.data.valid){

                    
                TTCEapi.progressUpdate(6,parseInt(params.code),0).then((response)=>{
                    if(response.data.valid)
                    {   customToast.success("Product Status Updated", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
                        this.componentDidMount();
                        console.log("updated");
                    }
                    else{
                        customToast.error(response.data.errorMessage, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: true,
                          });
                    }
                });
                }else{
                    customToast.error(response.data.errorMessage, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
                }
            });
            }
            else{
                TTCEapi.progressUpdate(parseInt(this.state.Progressidnext),parseInt(params.code),innerID ).then((response)=>{
                    if(response.data.valid)
                    {   customToast.success("Product Status Updated", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
                        this.componentDidMount();
                        console.log("updated");
                    }
                    else{
                        customToast.error(response.data.errorMessage, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: true,
                          });
                    }
                });
                
    
            }
        }
           
        
        
    }
    ToggleDelete22 = (id) => {
        document.getElementById('id09'+ id).style.display='block';
    }
    ToggleDeleteClose22 = (id) => {
    document.getElementById('id09'+ id).style.display='none';
    }
    opendisablemodal = (id)=>{
        if(id === 0 || this.state.openEnquiries[0].openEnquiriesResponse.enquiryStageId > 5)
        {

        }
        else{
        console.log("open");
        document.getElementById('dismod').style.display='block';
        }
        
    }
    closedisablemodal = () => {
    document.getElementById('dismod').style.display='none';
    }
    confirmFreeze = () => {
        document.getElementById('dismod').style.display='none';
    
        TTCEapi.toggleChangeRequest(this.state.enquiryCode).then((response)=>{
            if(response.data.valid)
            {
                customToast.success("Change Request Disabled", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                    });
                    this.componentDidMount();
            }
            else{
                customToast.error(response.data.errorMessage, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                    });
            }
                
        })
    }
    ToggleDelete = () => {
        document.getElementById('id01').style.display='block';
    }
    ToggleDeleteClose = () => {
    document.getElementById('id01').style.display='none';
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
            this.componentDidMount();
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
        this.componentDidMount();
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

    goToChatButton = (id) => {
        localStorage.setItem("goToChatButtonEnquiryId", id);
        browserHistory.push("/artisanChat");
    }

    componentDidMount(){
    window.scrollTo(0, 0);
    let params = queryString.parse(this.props.location.search);
    console.log(params);
    this.state.enquiryCode = params.code;
    TTCEapi.getProductUploadData().then((response)=>{
        if(response.data.valid)
        {   TTCEapi.getEnquirStages().then((response)=>{
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
                    TTCEapi.getClosedOrder(params.code).then((response1)=>{
                        console.log("")
                        var nextProgressid = 0;
                        var progressid = 0;
                        
                        if(response1.data.data[0].openEnquiriesResponse.historyProductId == null )
                        {
                            if(response1.data.data[0].openEnquiriesResponse.productStatusId == 2)
                            {
                                    if(response1.data.data[0].openEnquiriesResponse.enquiryStageId == 3)
                                    {
                                        nextProgressid = 7;
                                    }
                                    else{
                                        nextProgressid =response1.data.data[0].openEnquiriesResponse.enquiryStageId + 1;
                                    }
                                    progressid=response1.data.data[0].openEnquiriesResponse.enquiryStageId
                            }
                            else{
                                if(response1.data.data[0].openEnquiriesResponse.enquiryStageId == 5 && response1.data.data[0].openEnquiriesResponse.innerEnquiryStageId < 5)
                                {
                                    nextProgressid =response1.data.data[0].openEnquiriesResponse.enquiryStageId;
                                    // nextinnerid =  response.data.data[0].openEnquiriesResponse.innerEnquiryStageId + 1
                                    progressid= 4

                                }
                                else{
                                    nextProgressid =response1.data.data[0].openEnquiriesResponse.enquiryStageId + 1;
                                    progressid= response1.data.data[0].openEnquiriesResponse.enquiryStageId
                                }
                            }
                        }
                        else{
                            if(response1.data.data[0].openEnquiriesResponse.productStatusHistoryId == 2)
                            {
                                    if(response1.data.data[0].openEnquiriesResponse.enquiryStageId == 3)
                                    {
                                        nextProgressid = 11;
                                    }
                                    else{
                                        nextProgressid =response1.data.data[0].openEnquiriesResponse.enquiryStageId + 1;
                                    }
                            }
                            else{
                                nextProgressid =response1.data.data[0].openEnquiriesResponse.enquiryStageId + 1;
                            }
                            progressid= response1.data.data[0].openEnquiriesResponse.enquiryStageId
                        }
                        
                        if(response1.data.valid)
                        {   console.log("heree");
                            console.log(response1.data.data);
                            this.setState({openEnquiries:response1.data.data,
                                progressid: progressid,
                                Progressidnext : nextProgressid,
                                    dataload:true
                            },()=>{
                                // console.log(this.state);
                            });
                            
                        }
                    },()=>{
                        
                    })
                });
        }
    })

    TTCEapi.getChangeRequestForArtisan(this.state.enquiryCode).then((response)=>{
        if(response.data.valid)
        {
            // console.log(response.data.data);
            this.setState({getChangeRequestForArtisan:response.data.data.changeRequestItemList,
                dataload:true})
        }
        console.log(this.state.getChangeRequestForArtisan)
    })
    TTCEapi.getClosedOrder(this.state.enquiryCode).then((response)=>{
        if(response.data.valid)
        {
            this.setState({getClosedOrder:response.data.data,
                dataload:true
               
                           })
        }
        // console.log(this.state.getClosedOrder[0].openEnquiriesResponse.changeRequestStatus)
    })
    TTCEapi.getPi(this.state.enquiryCode).then((response)=>{
        if(response.data.valid)
        {
            this.setState({getPi:response.data.data,
                dataload:true
               
                           })
        }
        console.log(this.state.getPi)
    })
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
                            {this.props.t("Pages.object.Converted to order on")} :
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
                                                {this.props.t("Pages.object.Enquiry id")} : <a href={'/buyerEnquiryDetails?code='+item.openEnquiriesResponse.enquiryId }>{item.openEnquiriesResponse.enquiryCode}</a>
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
                                        {this.props.t("Pages.object.Date started")} : 
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
                                                <span className="leEnqprodbn ">Brand Name : </span>
                                                <span className="leEnqbrandname ">{item.openEnquiriesResponse.companyName ? item.openEnquiriesResponse.companyName : "NA" }</span>                                   
                                            </Col>
                                        </div> */}
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
                            </Row>
                        </Col>                        
                    </Row>
                   
                    <Row noGutters={true}>
                        <Col className="col-xs-9"></Col>
                        <Col className="col-xs-2">
                        <input type="button" onClick={() => this.goToChatButton(item.openEnquiriesResponse.enquiryId)}
                        className="enqreqbtn" value ={this.props.t("Pages.object.go to this enquiry chat")}></input>

                        </Col>

                        </Row>
                    <Row noGutters={true} className="mt7">
                    <Col className="col-xs-1"></Col>
                        <Col className="col-xs-10">
                        <Row noGutters={true}>
                            <Col className="col-xs-8 leEnqstatus bold">
                            {this.props.t("Pages.object.Order Status")}
                            </Col>
                            {item.openEnquiriesResponse.productStatusId === 2
                            ?
                            <Col className="col-xs-4">
                                {console.log("item.openEnquiriesResponse.productStatusId")}

                                 {console.log(item.openEnquiriesResponse.productStatusId)}
                            </Col>
                            
                            :
                        
                            <Col className="col-xs-4">
                                 {console.log("item.openEnquiriesResponse.productStatusId")}

                                {console.log(item.openEnquiriesResponse.productStatusId)}
                            <div className={item.openEnquiriesResponse.changeRequestOn === 0 ? "changeRequesttextdis": "changeRequesttext"  }>{item.openEnquiriesResponse.changeRequestOn === 0 ? "Change Request Disabled": "Change Request Enabled"   }</div>
                            <div className={item.openEnquiriesResponse.changeRequestOn === 0 ? "btn-switch--on mu-btn-switch": "btn-switch--on"  }
                             onClick={()=>this.opendisablemodal(item.openEnquiriesResponse.changeRequestOn)}
                             >
                              <div className={item.openEnquiriesResponse.changeRequestOn === 0 ? "btn-switch-circle btn-switch-circle--off":"btn-switch-circle"  }></div>
                            </div>
                                 
                    <div id="dismod" class="w3-modal">
                        <div class="w3-modal-content w3-animate-top modalBoxSizeCSCR">
                            <div>
                            <Row noGutters={true}>
                                {/* <Col className="col-xs-12 CSheading">
                                    hh
                                </Col> */}
                            </Row>
                            </div>
                            <div class="w3-container">
                            <span 
                                onClick={this.closedisablemodal} 
                                class="w3-button w3-display-topright cWhite">x</span>
                            
                            <Row noGutters={true}>  
                            <br></br>
                            
                                <Col className="col-xs-12 text-center fontplay sure bold ">
                                    Are you Sure?
                                </Col>
                                <Col className="col-xs-12 text-center dcr">
                                    You are disabling change request for buyer.
                                </Col>
                                <Col className="col-xs-12 text-center frezeReq">
                                    This will freeze on the requirement.
                                </Col>
                                <Col className="col-xs-12 text-center ">
                                    <img  className="freezeimg" src={logos.freezeReq}></img>
                                </Col>
                                <Col className="col-xs-4 text-center ">
                                </Col>
                                <Col className="col-xs-4 text-center ">
                                        <div className="canceltext" onClick={this.closedisablemodal}  >Cancel</div>
                                </Col>
                                <Col className="col-xs-4 text-center ">
                                <button className="greenokbtn" onClick={this.confirmFreeze} > OK </button>
                                </Col>
                                
                            </Row>
                            <Row>
                            <br></br>
                                <br></br>
                            </Row>
                            
                         
                            
                            </div>
                            </div>
                        </div>

                            </Col>
                     
                            }     </Row>
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
                                        {this.props.t("Pages.object.Enquiry id")} : {item.openEnquiriesResponse.enquiryCode}
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
                                        {this.props.t("Pages.object.Date started")} : 
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
                                                <span className="leEnqprodbn ">Brand Name : </span>
                                                <span className="leEnqbrandname ">{item.openEnquiriesResponse.companyName ? item.openEnquiriesResponse.companyName : "NA" }</span>                                   
                                            </Col>
                                        </div> */}
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
                            </Row>
                        </Col>
                    </Row>
                   
                    <Row noGutters={true}>
                        <Col className="col-xs-9"></Col>
                        <Col className="col-xs-2">
                        <input type="button" onClick={() => this.goToChatButton(item.openEnquiriesResponse.enquiryId)}
                        className="enqreqbtn" value ={this.props.t("Pages.object.go to this enquiry chat")}></input>

                        </Col>

                        </Row>
                   
                    <Row noGutters={true} className="mt7">
                    <Col className="col-xs-1"></Col>
                        <Col className="col-xs-10">
                        
                        <Row noGutters={true}>
                            <Col className="col-xs-8 leEnqstatus bold">
                            {this.props.t("Pages.object.Order Status")}
                            </Col>
                            {item.openEnquiriesResponse.productStatusHistoryId == 2
                            ?
                            <Col className="col-xs-4"></Col>
                            :
                            
                            <Col className="col-xs-4">
                            <div className={item.openEnquiriesResponse.changeRequestOn === 0 ? "changeRequesttextdis": "changeRequesttext"  }>{item.openEnquiriesResponse.changeRequestOn === 0 ? "Change Request Disabled": "Change Request Enabled"   }</div>
                            <div className={item.openEnquiriesResponse.changeRequestOn === 0 ? "btn-switch--on mu-btn-switch": "btn-switch--on"  }
                             onClick={()=>this.opendisablemodal(item.openEnquiriesResponse.changeRequestOn)}
                             >
                              <div className={item.openEnquiriesResponse.changeRequestOn === 0 ? "btn-switch-circle btn-switch-circle--off":"btn-switch-circle"  }></div>
                            </div>
                                 
                    <div id="dismod" class="w3-modal">
                        <div class="w3-modal-content w3-animate-top modalBoxSizeCSCR">
                            <div>
                            <Row noGutters={true}>
                                {/* <Col className="col-xs-12 CSheading">
                                    hh
                                </Col> */}
                            </Row>
                            </div>
                            <div class="w3-container">
                            <span 
                                onClick={this.closedisablemodal} 
                                class="w3-button w3-display-topright cWhite">x</span>
                            
                            <Row noGutters={true}>  
                            <br></br>
                            
                                <Col className="col-xs-12 text-center fontplay sure bold ">
                                    Are you Sure?
                                </Col>
                                <Col className="col-xs-12 text-center dcr">
                                    You are disabling change request for buyer.
                                </Col>
                                <Col className="col-xs-12 text-center frezeReq">
                                    This will freeze on the requirement.
                                </Col>
                                <Col className="col-xs-12 text-center ">
                                    <img  className="freezeimg" src={logos.freezeReq}></img>
                                </Col>
                                <Col className="col-xs-4 text-center ">
                                </Col>
                                <Col className="col-xs-4 text-center ">
                                        <div className="canceltext" onClick={this.closedisablemodal}  >Cancel</div>
                                </Col>
                                <Col className="col-xs-4 text-center ">
                                <button className="greenokbtn" onClick={this.confirmFreeze} > OK </button>
                                </Col>
                                
                            </Row>
                            <Row>
                            <br></br>
                                <br></br>
                            </Row>
                            
                         
                            
                            </div>
                            </div>
                        </div>

                            </Col>
                        
                            } </Row>
                       
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
                  
                    </>
                    )}
                   <br></br>
                <Row noGutters={true}>
                            <Row noGutters={true}>
                            <Col sm={1}>

                                    </Col>
                                    <Col sm={2}  
                                    className={
                                        (this.state.selected == "BuyerDetails"
                                                ? "Allenqlistbtn2"
                                                    : "Allenqlistbtn")
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
                                                    <ArtisanCompletedTransaction enquiryCode={this.state.enquiryCode} />
                                                        </div>
                                                        </Col>
                                                        </>
                                                        :
                                                            null}
                                    






                                        {this.state.proformainvoice? 
                                        <>
                                        {this.state.getClosedOrder[0].openEnquiriesResponse.changeRequestStatus==0 ||this.state.getClosedOrder[0].openEnquiriesResponse.changeRequestStatus==2?
                                        <>
                                          {console.log("status-0/2")}
                                         <Col sm={10}>
                                        <PreviewChangedPI 
                                        enquiryId={this.state.enquiryCode}
                                        enquiryCode={this.state.getClosedOrder[0].openEnquiriesResponse.enquiryCode}
                                        getClosedOrderStatus={this.state.getClosedOrder[0].openEnquiriesResponse.changeRequestStatus}
                                        />
                                        
                                      </Col>
                                        </>

                                              :
                                             <>
                                             {console.log("status-1/3")}
                                              <Col sm={10}>
                                                <PIchange 
                                                enquiryId={this.state.enquiryCode}
                                                enquiryCode={this.state.getClosedOrder[0].openEnquiriesResponse.enquiryCode}
                                                completed={true}
                                                />
                                               
                                            </Col>
                                            </>}
                                       
                                  
                                        {/* <Col sm={1}></Col> */}
                                       
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
                                                                     {console.log("mine3")}
                                                                    {
                                                                    this.state.openEnquiries[0].openEnquiriesResponse.productStatusId == 2
                                                                    ?
                                                                    <>
                                                                     <Row noGutters={true}>
                                                                     {console.log("mine4")}
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
                                                                             {console.log("mine5")}
                                                                            <Col className="col-xs-12 bold font20 text-center">
                                                                                <br></br>
                                                                                Change request disabled by artisan
                                                                                <br></br>
                                                                            </Col>
                                                                        </Row>
                                                                        
                                                                        : <>
                                                                        {/* <CRaccepted /> */}
                                                                        {console.log("mine7")}
                                                                        <ArtisanChangeRequest
                                                                         enquiryId={this.state.enquiryCode}
                                                                         openPI={this.moqDetailsbtn}
                                                                         completed={true}
                                                                        />
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
                                                                     {console.log("mine2")}
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
                                                                             {console.log("mine1")}
                                                                            <Col className="col-xs-12 bold font20 text-center">
                                                                                <br></br>
                                                                                Change request disabled by artisan
                                                                                <br></br>
                                                                            </Col>
                                                                        </Row>
                                                                        
                                                                        : <>
                                                                        
                                                                        {console.log("mine")}
                                                                         <ArtisanChangeRequest
                                                                         enquiryId={this.state.enquiryCode}
                                                                         openPI={this.moqDetailsbtn}
                                                                         completed={true}
                                                                        />
                                                                        {/* {this.state.getChangeRequestForArtisan.length>0?
                                                                         <ArtisanChangeRequest
                                                                         enquiryId={this.state.enquiryCode}
                                                                        />
                                                                    :
                                                                    <Row noGutters={true}>
                                                                    <Col className="col-xs-12 bold font20 text-center">
                                                                        <br></br>
                                                                        Change request Not available
                                                                        <br></br>
                                                                    </Col>
                                                                </Row>
                                                                    } */}
                                                                       
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
                                   <ArtisanQC enquiryId={this.state.enquiryCode}/>
                                   </Col>
                                    </>:null}

                                    {this.state.taxInvoice ? 
                                    <>
                                    {/* <Col sm={1}></Col> */}
                                    {console.log("artitax")}
                                    <Col sm={10}>
                                        
                                    <ArtisanTaxInvoice
                                    enquiryId={this.state.enquiryCode}
                                    enquiryCode={this.state.openEnquiries[0].openEnquiriesResponse.enquiryCode}
                                    BuyerPreviewInvoice={this.state.BuyerPreviewInvoice} />
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
               
                </> 
                
                :
                <> 
                <Container>
                    <Row noGutters={true}>
                        <Col className='col-xs-12 text-center font20'>
                                        Loading Please wait..
                        </Col>
                    </Row>
                   
                </Container>
                </>}
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
export default withTranslation()(ArtisanSingleCompletedOrder);
