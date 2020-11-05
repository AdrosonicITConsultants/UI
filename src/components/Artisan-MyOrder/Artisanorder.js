
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
import { useTranslation, withTranslation } from "react-i18next";

 class Artisanorder extends Component {
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
            getOrder:[],
            getPi:[],
            BuyerPreviewInvoice:false,
            orderReceivedCurrentId: 0,
            orderReceivedModalOkButtonDisable: false,   
            dispatchRCButtonDisable: false,     
            orderRecreateModalOkButtonDisable: false,
            orderRCSelectedId: 0,
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
        if(this.state.Progressidnext == 9){
            TTCEapi.validateFinalPaymentFromArtisan(parseInt(params.code),1).then((response)=>{
                if(response.data.valid)
                {
                    customToast.success("Transaction Status Updated!", {
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
            });
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
    this.componentDidMount();
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
       var taxinvoice=localStorage.getItem("piShow");
       console.log(taxinvoice);
       if (localStorage.getItem('piShow')== 1) {
       this.qualityCheckbtn();
    //    window.scrollTo(0, 0);
    }
    localStorage.removeItem("piShow");
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
                    TTCEapi.getSingleOrder(params.code).then((response1)=>{
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
    TTCEapi.getOrder(this.state.enquiryCode).then((response)=>{
        if(response.data.valid)
        {
            this.setState({getOrder:response.data.data,
                dataload:true
               
                           })
        }
        console.log(this.state.getOrder[0].openEnquiriesResponse.changeRequestStatus)
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

        console.log(this.state.orderReceivedCurrentId);

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

    
    viewPI = () => {
        this.qualityCheckbtn();
        this.scrollPI.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
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
            console.log(response.data.data);
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

    FaultReport(id){
           browserHistory.push("/artisanfaultreport?orderid="+id)
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
                                   {this.props.t("Pages.object.Order Id")} : 
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
                                 
                                {this.props.t("Pages.object.Converted to order on")}:
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
                    
                    {/* {console.log(item.openEnquiriesResponse)} */}
                    {item.openEnquiriesResponse.deliveryChallanLabel?
                    <>
                    <hr></hr>
                    <Row>
                     <Col className="col-xs-1"></Col>
                     <Col className="col-xs-4">
                     <img src={logos.truck} className="truckimg"/>  {this.props.t("Pages.object.check")}
                     <a style= {{marginLeft:"5px"}} href={TTCEapi.DeliveryReceiptUrl + this.state.enquiryCode + "/" + item.openEnquiriesResponse.deliveryChallanLabel} target="_blank">
                     {this.props.t("Pages.object.delivery receipt")}</a>
                     </Col>
                     </Row>
                     </>
                     :
                     ""
                     }

                    <hr></hr>

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
                        <input type="button" onClick={() => this.goToChatButton(item.openEnquiriesResponse.enquiryId)}
                        className="enqreqbtn" value ={this.props.t("Pages.object.go to this enquiry chat")}></input>

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
                                item.openEnquiriesResponse.enquiryCode       
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
                    <Row noGutters={true} className="text-center">
                    {console.log(this.state.progressid +" lllllllllllllllllllllllllllllllllllll")}

                   {this.state.progressid < 3 || this.state.progressid == 10 ||this.state.progressid == 6 ||this.state.progressid == 7||(this.state.progressid == 10 && item.openEnquiriesResponse.productStatusId == 2)
                   ||(this.state.progressid == 3 && item.openEnquiriesResponse.productStatusId == 2)
                    ? 
                     <></>
                   :
                   <button
                     className="blackButton"
                     onClick={this.ToggleDelete}
                    >
                    {this.props.t("Pages.object.change status")}
                   </button>
                     }   
                   
                    <div id="id01" class="w3-modal">
                        <div class="w3-modal-content w3-animate-top modalBoxSizeCSCR">
                            <div>
                            <Row noGutters={true}>
                                <Col className="col-xs-12 CSheading">
                                {this.props.t("Pages.object.change status")}

                                </Col>
                            </Row>
                            </div>
                        <div class="w3-container">
                            <span 
                            onClick={this.ToggleDeleteClose} 
                            class="w3-button w3-display-topright cWhite">x</span>
                            <br></br>
                            <Row noGutters={true}>
                                {item.openEnquiriesResponse.productStatusId === 2
                                ?
                                <>
                                 {this.state.enquiryStagesAvailable.map((item1) => 
                                    item1.orderStages.id > 3 
                                    ?
                                    <>
                                    <Col className="col-xs-7 mb7 text-left">
                                        {item1.orderStages.id < this.state.Progressidnext ?  <div className="greenButtonstatus"></div> :<></> }
                                        {item1.orderStages.id > (this.state.Progressidnext) ?  <div className="greyButtonstatus"></div> :<></> }
                                        {item1.orderStages.id == (this.state.Progressidnext) ?  <div className="blueButtonstatus"></div> :<></> }
                                 {" "}{item1.orderStages.desc}
                                    </Col>
                                     <Col className="col-xs-5 mb7">
                                      {item1.orderStages.id == (this.state.Progressidnext) ?  <button className="markCompletedButton" onClick={this.stateupdate}> Mark Completed</button> :<></> }
                                    </Col>
                                 </>
                                    :
                                    <>
                                    </>
                                 )}   
                                </>
                                :
                                <>
                                 {this.state.enquiryStagesMTO.map((item1) => 
                                    item1.id > 3
                                    ?
                                        <>
                                        {item1.id == 5 && item.openEnquiriesResponse.enquiryStageId == 5
                                        ?
                                            <>
                                                {this.state.innerEnquiryStages.map((item2) => 
                                                    <>
                                                    <Col className="col-xs-7 mb7 text-left">
                                                    {item2.id <=  item.openEnquiriesResponse.innerEnquiryStageId  ?  <div className="greenButtonstatus"></div> :<></> }
                                                    {item2.id > (item.openEnquiriesResponse.innerEnquiryStageId+1) ?  <div className="greyButtonstatus"></div> :<></> }
                                                    {item2.id == (item.openEnquiriesResponse.innerEnquiryStageId+1) ?  <div className="blueButtonstatus"></div> :<></> }
                                                    {item2.stage}
                                                    </Col>
                                                    <Col className="col-xs-5 mb7 h20">
                                                    {item2.id == (item.openEnquiriesResponse.innerEnquiryStageId+1) ?  <button className="markCompletedButtonprogress" onClick={this.inprogresss}>In Progress</button> :<></> }
                                                    {item2.id == (item.openEnquiriesResponse.innerEnquiryStageId+2) ?  <button className="markCompletedButton" onClick={this.stateupdate}>Start Stage</button> :<></> }

                                                    </Col>
                                                    </>
                                                )}
                                            </>
                                        :
                                        <>
                                        {item1.id == 5
                                        ?
                                        <>
                                    {
                                        this.state.innerEnquiryStages.map((item2) => 
                                        <>
                                            <Col className="col-xs-7 mb7 text-left">
                                        {item.openEnquiriesResponse.enquiryStageId == 4 && item2.id == 1 ?  <div className="blueButtonstatus"></div> :<></> }
                                        {item.openEnquiriesResponse.enquiryStageId == 4 && item2.id != 1 ?  <div className="greyButtonstatus"></div> :<></> }
                                        {item.openEnquiriesResponse.enquiryStageId > 5 ?  <div className="greenButtonstatus"></div> :<></> }
                                        {item.openEnquiriesResponse.enquiryStageId < 4 ?  <div className="greyButtonstatus"></div> :<></> }
                                        {item2.stage}
                                        </Col>
                                        <Col className="col-xs-5 mb7 h20">
                                        {item.openEnquiriesResponse.enquiryStageId == 4 && item2.id == 1 ?  <button className="markCompletedButton" onClick={this.stateupdate}>Mark Completed</button> :<></> }
                                        {item.openEnquiriesResponse.enquiryStageId == 5 && item2.id == 1 ?  <button className="markCompletedButton" onClick={this.stateupdate}>Mark Completed</button> :<></> }

                                        </Col>
                                        </>
                                        )
                                        }
                                    </>
                                        :
                                        <>
                                            <Col className="col-xs-7 mb7 text-left">

                                                {item1.id <= this.state.progressid ?  <div className="greenButtonstatus"></div> :<></> }
                                                {item1.id > (this.state.progressid+1) ?  <div className="greyButtonstatus"></div> :<></> }
                                                {item1.id == (this.state.progressid+1) ?  <div className="blueButtonstatus"></div> :<></> }
                                                    {item1.desc}
                                            </Col>
                                            <Col className="col-xs-5 mb7 h20">
                                                {}
                                                {item1.id == 6 && item.openEnquiriesResponse.enquiryStageId == 5 && item.openEnquiriesResponse.innerEnquiryStageId == 4 ? <button className="markCompletedButton" onClick={this.stateupdate}>Complete</button>:<></>}
                                                {item1.id == (this.state.progressid+1) ?<button className="markCompletedButton" onClick={this.stateupdate}>Mark Completed</button> :<></> }

                                            </Col>
                                        </>

                                         }
                                   
                                    </>
                                    }
                                    </>
                                
                                         
                                    :
                                    <>
                                    </>
                                 )} 
                                </>
                                }
                                
                               
                            </Row>
                            <br></br>
                         
                            
                        </div>
                        </div>
                    </div>

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
                    
                    {item.openEnquiriesResponse.deliveryChallanLabel?
                    <>
                    <hr></hr>
                     <Row>
                     <Col className="col-xs-1"></Col>
                     <Col className="col-xs-4">
                     <img src={logos.truck} className="truckimg"/>  {this.props.t("Pages.object.check")}
                     <a style= {{marginLeft:"5px"}} href={TTCEapi.DeliveryReceiptUrl + this.state.enquiryCode + "/" + item.openEnquiriesResponse.deliveryChallanLabel} target="_blank">
                     {this.props.t("Pages.object.delivery receipt")}</a>
                     </Col>
                     </Row>
                    </>
                     :
                     ""
                     }
                     
                    <hr></hr>

                    {item.openEnquiriesResponse.isReprocess === 1 ?
                    <>
                    <Row noGutters={true}>
                        <Col className="col-xs-offset-1 col-xs-11">
                            <p className="orderRecreationP1TagStyle">{this.props.t("Pages.object.Order under Recreation")}</p>
                            <p className="orderRecreationP2TagStyle"> {this.props.t("Pages.object.Kindly keep updating buyer about the status of product over chat")}</p>
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
                        <input type="button" onClick={() => this.goToChatButton(item.openEnquiriesResponse.enquiryId)}
                        className="enqreqbtn" value ={this.props.t("Pages.object.go to this enquiry chat")}></input>

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
                    
                    <Row noGutters={true} className="text-center">
                        {console.log(this.state.progressid +" uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")}
                   {this.state.progressid < 3 || this.state.progressid == 10 ||this.state.progressid == 6 ||this.state.progressid == 7||(this.state.progressid == 10 && item.openEnquiriesResponse.productStatusId == 2)
                   ||(this.state.progressid == 3 && item.openEnquiriesResponse.productStatusId == 2)
                                      ? 
                     <></>
                   :
                   <button
                     className="blackButton"
                     onClick={this.ToggleDelete}
                    >
                                         {this.props.t("Pages.object.change status")}

                   </button>
                     }   
                   
                    <div id="id01" class="w3-modal">
                        <div class="w3-modal-content w3-animate-top modalBoxSizeCSCR">
                            <div>
                            <Row noGutters={true}>
                                <Col className="col-xs-12 CSheading">
                                {this.props.t("Pages.object.change status")}

                                </Col>
                            </Row>
                            </div>
                        <div class="w3-container">
                            <span 
                            onClick={this.ToggleDeleteClose} 
                            class="w3-button w3-display-topright cWhite">x</span>
                            <br></br>
                            <Row noGutters={true}>
                                {item.openEnquiriesResponse.productStatusHistoryId === 2
                                ?
                                <>
                                 {this.state.enquiryStagesAvailable.map((item1) => 
                                    item1.orderStages.id > 3 
                                    ?
                                    <>
                                    <Col className="col-xs-7 mb7 text-left">
                                        {item1.orderStages.id < this.state.Progressidnext ?  <div className="greenButtonstatus"></div> :<></> }
                                        {item1.orderStages.id > (this.state.Progressidnext) ?  <div className="greyButtonstatus"></div> :<></> }
                                        {item1.orderStages.id == (this.state.Progressidnext) ?  <div className="blueButtonstatus"></div> :<></> }
                                 {" "}{item1.orderStages.desc}
                                    </Col>
                                     <Col className="col-xs-5 mb7">
                                      {item1.orderStages.id == (this.state.Progressidnext) ?  <button className="markCompletedButton" onClick={this.stateupdate}> Mark Completed</button> :<></> }
                                    </Col>
                                 </>
                                    :
                                    <>
                                    </>
                                 )}   
                                </>
                                :
                                <>
                                 {this.state.enquiryStagesMTO.map((item1) => 
                                    item1.id > 3
                                    ?
                                        <>
                                        {item1.id == 5 && item.openEnquiriesResponse.enquiryStageId == 5
                                        ?
                                            <>
                                                {this.state.innerEnquiryStages.map((item2) => 
                                                    <>
                                                    <Col className="col-xs-7 mb7 text-left">
                                                    {item2.id <=  item.openEnquiriesResponse.innerEnquiryStageId  ?  <div className="greenButtonstatus"></div> :<></> }
                                                    {item2.id > (item.openEnquiriesResponse.innerEnquiryStageId+1) ?  <div className="greyButtonstatus"></div> :<></> }
                                                    {item2.id == (item.openEnquiriesResponse.innerEnquiryStageId+1) ?  <div className="blueButtonstatus"></div> :<></> }
                                                    {item2.stage}
                                                    </Col>
                                                    <Col className="col-xs-5 mb7 h20">
                                                    {item2.id == (item.openEnquiriesResponse.innerEnquiryStageId+1) ?  <button className="markCompletedButtonprogress" onClick={this.inprogresss}>In Progress</button> :<></> }
                                                    {item2.id == (item.openEnquiriesResponse.innerEnquiryStageId+2) ?  <button className="markCompletedButton" onClick={this.stateupdate}>Start Stage</button> :<></> }

                                                    </Col>
                                                    </>
                                                )}
                                            </>
                                        :
                                        <>
                                        {item1.id == 5
                                        ?
                                        <>
                                    {
                                        this.state.innerEnquiryStages.map((item2) => 
                                        <>
                                            <Col className="col-xs-7 mb7 text-left">
                                        {item.openEnquiriesResponse.enquiryStageId == 4 && item2.id == 1 ?  <div className="blueButtonstatus"></div> :<></> }
                                        {item.openEnquiriesResponse.enquiryStageId == 4 && item2.id != 1 ?  <div className="greyButtonstatus"></div> :<></> }
                                        {item.openEnquiriesResponse.enquiryStageId > 5 ?  <div className="greenButtonstatus"></div> :<></> }
                                        {item.openEnquiriesResponse.enquiryStageId < 4 ?  <div className="greyButtonstatus"></div> :<></> }
                                        {item2.stage}
                                        </Col>
                                        <Col className="col-xs-5 mb7 h20">
                                        {item.openEnquiriesResponse.enquiryStageId == 4 && item2.id == 1 ?  <button className="markCompletedButton" onClick={this.stateupdate}>Mark Completed</button> :<></> }
                                        {item.openEnquiriesResponse.enquiryStageId == 5 && item2.id == 1 ?  <button className="markCompletedButton" onClick={this.stateupdate}>Mark Completed</button> :<></> }

                                        </Col>
                                        </>
                                        )
                                        }
                                    </>
                                        :
                                        <>
                                            <Col className="col-xs-7 mb7 text-left">

                                                {item1.id <= this.state.progressid ?  <div className="greenButtonstatus"></div> :<></> }
                                                {item1.id > (this.state.progressid+1) ?  <div className="greyButtonstatus"></div> :<></> }
                                                {item1.id == (this.state.progressid+1) ?  <div className="blueButtonstatus"></div> :<></> }
                                                    {item1.desc}
                                            </Col>
                                            <Col className="col-xs-5 mb7 h20">
                                                {}
                                                {item1.id == 6 && item.openEnquiriesResponse.enquiryStageId == 5 && item.openEnquiriesResponse.innerEnquiryStageId == 4 ? <button className="markCompletedButton" onClick={this.stateupdate}>Complete</button>:<></>}
                                                {item1.id == (this.state.progressid+1) ?<button className="markCompletedButton" onClick={this.stateupdate}>Mark Completed</button> :<></> }

                                            </Col>
                                        </>

                                         }
                                   
                                    </>
                                    }
                                    </>
                                
                                         
                                    :
                                    <>
                                    </>
                                 )} 
                                </>
                                }
                                
                               
                            </Row>
                            <br></br>
                         
                            
                        </div>
                        </div>
                    </div>

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
                                                    <ArtisanTransaction enquiryCode={this.state.enquiryCode} />
                                                        </div>
                                                        </Col>
                                                        </>
                                                        :
                                                            null}
                                    
                                        {this.state.proformainvoice? 
                                        <>
                                        {this.state.getOrder[0].openEnquiriesResponse.changeRequestStatus==0 ||this.state.getOrder[0].openEnquiriesResponse.changeRequestStatus==2?
                                        <>
                                          {console.log("status-0/2")}
                                         <Col sm={10}>
                                        <PreviewChangedPI 
                                        enquiryId={this.state.enquiryCode}
                                        enquiryCode={this.state.openEnquiries[0].openEnquiriesResponse.enquiryCode}
                                        getOrderStatus={this.state.getOrder[0].openEnquiriesResponse.changeRequestStatus}
                                        />
                                        
                                      </Col>
                                        </>

                                              :
                                             <>
                                             {console.log("status-1/3")}
                                              <Col sm={10}>
                                                <PIchange 
                                                enquiryId={this.state.enquiryCode}
                                                enquiryCode={this.state.openEnquiries[0].openEnquiriesResponse.enquiryCode}/>
                                            
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
                                   <ArtisanQC enquiryId={this.state.enquiryCode} 
                                   data = {this.state.openEnquiries[0].openEnquiriesResponse}/>
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
                <Footer/>

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
            </React.Fragment>
        )
    }
}



function mapStateToProps(state) {
    // debugger;
    const { user } = state
    return { user };
}
export default withTranslation()(Artisanorder);