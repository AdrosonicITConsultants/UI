import React, { Component } from 'react'
import ReactDOM from "react-dom";
import ReactToPdf from "react-to-pdf";
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import logos from "../../assets";
import "./BuyerAdvancePayment.css";
import queryString from 'query-string';
import TTCEapi from '../../services/API/TTCEapi';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import moment from 'moment';
import Moment from 'react-moment';
import NavbarComponent from "../navbar/navbar";
import Footer from '../footer/footer';
import BuyerAdvancePayment2 from "./BuyerAdvancePayment2"
import BuyerAdvancePayment3 from "./BuyerAdvancePayment3"


export default class BuyerAdvancePayment extends Component {
    constructor() {
        super();
        
        // this.select20= this.select20.bind(this);
        this.select30= this.select30.bind(this);
        this.select50= this.select50.bind(this);
        this.backPI = this.backPI.bind(this);
        this.state = {
            selected:"select30",
            select30:true,
            select50:false,
            dataload:false,
            enquiryCode:"",
            percent:"30",
            totalAmount:"",
            calulatedAmount:0,
            nextPage:false,
            gpay:"",
            phonePay:"",
            paytm:"",
            ifscCode:"",
            accNo:"",
            bankName:"",
            firstName:"",
            lastName:"",
            getAdvancedPaymentStatus:[],
            getAdvancedPaymentReceipt:[],
            receiptId:"",
            receiptlabel:""

                   }
    }
 
   
    BacktoPreview(){
    this.props.bp();
    }

    proceedtopay(){
        // browserHistory.push("/uploaddetails?code="+this.state.enquiryCode)
        this.setState({nextPage:true})
    }

  

    select30(){
        this.setState((prevState) => {
            return{
             selected: "select30",
             select20:false,
             select30:true,
             select50:false,
             percent:"30",
             calulatedAmount:((this.state.totalAmount * 30)/100),
            };
        });
    }

    select50(){
        this.setState((prevState) => {
            return{
             selected: "select50",
             select20:false,
             select30:false,
             select50:true,
             percent:"50",
             calulatedAmount:(this.state.totalAmount * 50)/100,
         
            };
        });
    }
    backPI(){
        this.setState({
            nextPage:false
           
        })
    }
    componentDidMount() {
        let params = queryString.parse(this.props.location.search);
        console.log(params);
        console.log(this.state.getAdvancedPaymentReceipt);
        console.log(this.state.getAdvancedPaymentReceipt.id);
        console.log(this.state.getAdvancedPaymentReceipt.label)
        this.state.enquiryCode = params.code;
        TTCEapi.getProductUploadData().then((response)=>{
            if(response.data.valid)
            {
                console.log(response);
                this.setState({productCategories: response.data.data.productCategories,
                    yarns: response.data.data.yarns },()=>{
            
                        TTCEapi.getEnquiryMoq(params.code).then((response)=>{
                            if(response.data.data[0].paymentAccountDetails.length != 0)
                            {
                                
                                for (var  items in response.data.data[0].paymentAccountDetails)
                                {
                                    console.log(response.data.data[0].paymentAccountDetails[items].accountType.id);
                                    switch(response.data.data[0].paymentAccountDetails[items].accountType.id){
                                        case 1:
                                            console.log("bank");   
                                            this.setState({
                                                accountno : parseInt(response.data.data[0].paymentAccountDetails[items].accNo_UPI_Mobile),
                                                bankname : response.data.data[0].paymentAccountDetails[items].bankName ,
                                                branch : response.data.data[0].paymentAccountDetails[items].branch ,
                                                ifsccode : response.data.data[0].paymentAccountDetails[items].ifsc,
                                                benificiaryname : response.data.data[0].paymentAccountDetails[items].name
                                            }); 
                                            break;
                                        case 2:
                                            console.log("gpayy");
                                            if(response.data.data[0].paymentAccountDetails[items].accNo_UPI_Mobile != ''){
                                            
                                                this.setState({
                                                    gpayupi : parseInt(response.data.data[0].paymentAccountDetails[items].accNo_UPI_Mobile), 
                                                }); 
                                            }
                                            
                                            break;
                                        case 3:
                                            // console.log(response.data.data[0].paymentAccountDetails[items].accNo_UPI_Mobile);
                                            if(response.data.data[0].paymentAccountDetails[items].accNo_UPI_Mobile != ''){
                                            
                                            this.setState({
                                                phonepeupi : parseInt(response.data.data[0].paymentAccountDetails[items].accNo_UPI_Mobile), 
                                            }); 
                                        }
                                            break;
                                        case 4:
                                            console.log("paytm");
                                            if(response.data.data[0].paymentAccountDetails[items].accNo_UPI_Mobile != ''){
                                                                          
                                                this.setState({
                                                    paytmupi : parseInt(response.data.data[0].paymentAccountDetails[items].accNo_UPI_Mobile), 
                                                }); 
                                            }
                                            
                                            break;
                                    }
                                }
                                
                
                            }
                            var nextProgressid = 0;
                            if(response.data.data[0].openEnquiriesResponse.productStatusId == 2)
                            {
                                    if(response.data.data[0].openEnquiriesResponse.enquiryStageId == 3)
                                    {
                                        nextProgressid = 11;
                                    }
                                    else{
                                        nextProgressid =response.data.data[0].openEnquiriesResponse.enquiryStageId + 1;
                                    }
                            }
                            else{
                                nextProgressid =response.data.data[0].openEnquiriesResponse.enquiryStageId + 1;
                            }
                            this.setState({getEnquiryMoq : response.data.data,
                                progressid: response.data.data[0].openEnquiriesResponse.enquiryStageId,
                                Progressidnext : nextProgressid,
                                userid : response.data.data[0].userId,
                                dataload:true},()=>{
                                console.log(this.state.getEnquiryMoq);
                           
                            });
                        });
                    });
            }
        })
     
    
            TTCEapi.getBuyerPreviewPI(params.code).then((response)=>{
                if(response.data.valid)
                {
                    var totalAmount=response.data.data.piOrder.totalAmount+(response.data.data.piOrder.totalAmount * response.data.data.piOrder.sgst / 100)+
                     (response.data.data.piOrder.totalAmount * response.data.data.piOrder.cgst / 100);
                     totalAmount = totalAmount.toFixed(2);

                    if(response.data.data.productCustom === false) {
                        this.setState({
                            
                        previewPI:response.data.data,
                      buyerDetails: response.data.data.generatedBy,
                      previewPiOrder:response.data.data.piOrder,
                      buyerCustomProduct:response.data.data.buyerCustomProduct,
                      paymentDetails:response.data.data.paymentDetails,
                      gpay:response.data.data.paymentDetails[1].accNo_UPI_Mobile,
                      phonePay:response.data.data.paymentDetails[2].accNo_UPI_Mobile,
                      paytm:response.data.data.paymentDetails[3].accNo_UPI_Mobile,
                      ifscCode:response.data.data.paymentDetails[0].ifsc,
                      accNo:response.data.data.paymentDetails[0].accNo_UPI_Mobile,
                      bankName:response.data.data.paymentDetails[0].bankName,
                      artisanUser:response.data.data.artisanUser,
                      firstName:response.data.data.artisanUser.firstName,
                      lastName:response.data.data.artisanUser.lastName,
                      generatedBy:response.data.data.generatedBy,
                      weftDye:response.data.data.product.weftDye,
                      warpDye:response.data.data.product.warpDye,
                      extraWeftDye:response.data.data.product.extraWeftDye,
                      weftYarn:response.data.data.product.weftYarn,
                      warpYarn:response.data.data.product.warpYarn,
                      extraWeftYarn:response.data.data.product.extraWeftYarn,
                     totalAmount:totalAmount,
                     calulatedAmount:totalAmount * 0.3,
                        })
                    }
                    else {
                        this.setState({
                        previewPI:response.data.data,
                      buyerDetails: response.data.data.generatedBy,
                      previewPiOrder:response.data.data.piOrder,
                      buyerCustomProduct:response.data.data.buyerCustomProduct,
                      paymentDetails:response.data.data.paymentDetails,
                      gpay:response.data.data.paymentDetails[1].accNo_UPI_Mobile,
                      phonePay:response.data.data.paymentDetails[2].accNo_UPI_Mobile,
                      paytm:response.data.data.paymentDetails[3].accNo_UPI_Mobile,
                      ifscCode:response.data.data.paymentDetails[0].ifsc,
                      accNo:response.data.data.paymentDetails[0].accNo_UPI_Mobile,
                      bankName:response.data.data.paymentDetails[0].bankName,
                      artisanUser:response.data.data.artisanUser,
                      firstName:response.data.data.artisanUser.firstName,
                      lastName:response.data.data.artisanUser.lastName,
                      generatedBy:response.data.data.generatedBy,
                      customweftDye:response.data.data.buyerCustomProduct.weftDye,
                      customwarpDye:response.data.data.buyerCustomProduct.warpDye,
                      customextraWeftDye:response.data.data.buyerCustomProduct.extraWeftDye,
                      customweftYarn:response.data.data.buyerCustomProduct.weftYarn,
                      customwarpYarn:response.data.data.buyerCustomProduct.warpYarn,
                      customextraWeftYarn:response.data.data.buyerCustomProduct.extraWeftYarn,
                      totalAmount:totalAmount,
                      calulatedAmount:totalAmount * 0.3,
                        })
                    }
                    
                }
    
                console.log(response.data.data);
            });

            TTCEapi.getAdvancedPaymentStatus(params.code).then((response)=>{
                if(response.data.valid)
                {
                this.setState({getAdvancedPaymentStatus : response.data.data},()=>{
                    console.log(this.state.getAdvancedPaymentStatus);

                });
            }
            });
            TTCEapi.getAdvancedPaymentReceipt(params.code).then((response)=>{
                if(response.data.valid)
            {
                // this.componentDidMount();
                this.setState({getAdvancedPaymentReceipt : response.data.data,
                    receiptId:response.data.data.paymentId,
                    receiptlabel:response.data.data.label
                  
                },()=>{
                    console.log(this.state.getAdvancedPaymentReceipt);
                   console.log(this.state.getAdvancedPaymentReceipt.paymentId);
                   console.log(this.state.getAdvancedPaymentReceipt.label)

                });
            }
            });
      }
    
      backoperation(){
          browserHistory.goBack()
      }
    
    render(){
        return(
            
<React.Fragment>
<Container>
<NavbarComponent />
    {this.state.dataload?
    
<>


{this.state.getAdvancedPaymentStatus === null || this.state.getAdvancedPaymentStatus.status === 2 ?
<>

{this.state.nextPage==false ?
<>


                        

                          {this.state.getEnquiryMoq.map((item)=> 
                <>

                        <Row noGutters={true} className="">
                           <Col sm = "1" className="col-xs-1">
                           <img
                                       src={logos.backarrowicon}
                                       className="margin-cparrow cparrowsize glyphicon"
                                        onClick={() => this.backoperation()}
                            ></img>
                          
                          </Col>
                          <Col sm = "11" className="col-xs-11  ">
                         <h3 className="fontheadingadv"><b>Advance Payment for Enquiry id: {item.openEnquiriesResponse.enquiryCode} </b></h3>
                          
                          </Col>
                          </Row>
                          <hr className="hrlineadvpay "></hr>

                <Row noGutters={true} className="mt-7">
                    <Col className="col-xs-1"></Col>
                    <Col className="col-xs-10">
                        <Row noGutters={true}>
                            <Col sm={3}></Col>
                            <Col sm="9">
                                <div className="imageinlist"> 
                                    <div className="imageinlist1"> 
                                    {
                                         item.openEnquiriesResponse.productImages !=null?
                                        item.openEnquiriesResponse.productType === "Product"
                                        ?
                                        <a href={"/showArtisanProduct?ProductId="+item.openEnquiriesResponse.productId }><img  src={TTCEapi.ImageUrl +"Product/" + item.openEnquiriesResponse.productId + "/" + item.openEnquiriesResponse.productImages.split(",")[0]} className="enquiryimage advpayimg"></img>
                                        </a>
                                        :
                                        <a href={"/showBuyerProduct?productId="+item.openEnquiriesResponse.productId }><img  src={TTCEapi.ImageUrl +"CustomProduct/" + item.openEnquiriesResponse.productId + "/" + item.openEnquiriesResponse.productImages.split(",")[0]} className="enquiryimage advpayimg"></img>
                                        </a>
                                        :
                                        <img  src={logos.Smile} className="enquiryimage"></img>

                                    }

                                    </div>
                                    
                                    {/* <span ></span> */}
                                </div>
                                <div>
                                  <div noGutters={true} >
                                      <Col className="leEnqid bold payadvhead">
                                      Enquiry Id : {item.openEnquiriesResponse.enquiryCode}
                                      </Col>
                                  </div>
                                  <div noGutters={true} >
                                      <Col >
                                      <span className="leEnqtype bold fontsize16pa ">{this.state.productCategories[item.openEnquiriesResponse.productCategoryId - 1].productDesc} </span> 
                                       <span className="leEnqspun fontsize16pa"> / {this.state.yarns[item.openEnquiriesResponse.warpYarnId - 1 ].yarnDesc}  X  {this.state.yarns[item.openEnquiriesResponse.weftYarnId - 1 ].yarnDesc}  
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
                                          <span className="leEnqprodbn bold">Artisan Brand : </span>
                                          <span className="leEnqbrandname ">{item.openEnquiriesResponse.companyName?item.openEnquiriesResponse.companyName:"NA"}</span>                                   
                                      </Col>
                                  </div>
                                </div>
                            </Col>
                            
                        </Row>
                    </Col>

                    
                </Row>
            
                </>
                )}



{/* ------------------------------------------------------------------------------------------------------------------------- */}

<Row noGutters={true}>
            <Col className="col-xs-12">
            <div class="Total-square-container">
                <div class="Total-square">
                <p className="orderamthead">Order amount</p>
              <h3 className="totalamtpay"><span > 
              ₹
                  {this.state.totalAmount}
                    </span>
                    </h3>

                </div>
                </div>
             
            </Col>
  </Row>




  <Row  noGutters={true}>
      <Col className="col-xs-12 selectpercenttext">
          Select the % of the total amount (as per PI) you wish to pay below
      </Col>
  </Row>
  {/* ----------------------BoX--------------------- */}

  <Row  noGutters={true} className="margintoprow aligncenter">
  <Col className="col-xs-4 ">
         
      </Col>
     
      <Col className="col-xs-12 alignbottom" sm={2}>
      <div class="Select-square-container"
      className={
        (this.state.selected == "select30"
          ? "borderbox"
          : "")
        }
        
        onClick={this.select30}
        >
                <div class="Select20-square">
                30
                </div>
                </div>
      </Col>
      <Col className="col-xs-12 " sm={2}>
      <div class="Select-square-container"
      className={
        (this.state.selected == "select50"
          ? "borderbox"
          : "")
        }
        onClick={this.select50}>
                <div class="Select50-square">
                50
                </div>
                </div>
      </Col>
      <Col className="col-xs-3 ">
         
      </Col>
  </Row>
  {/* ----------------------BoX End--------------------- */}

<Row noGutters={true} className="margintoprow">
    <Col className="col-xs-12" style={{textAlign:"center"}}>
      <span className="selectpercenttext">  Calculated amount you pay as a advanceed : 
      <span className="advtotal">
      ₹ {(this.state.calulatedAmount).toFixed(2)}</span>
     
                </span>
    </Col>
</Row>


<Row noGutters={true} className="margintoprow" style={{textAlign:"center"}}>

    <Col className="col-xs-12">
        <button className="proccedwithadvpaybtn" 
        onClick={() => this.proceedtopay()}>Proceed with {this.state.percent}% 
       <span></span> advance payment <i class="fas fa-arrow-right" style={{marginLeft:"15px"}} aria-hidden="true"></i>
</button>
    </Col>
</Row>

<Row noGutters={true} style={{marginTop:"10px"}}>
    <Col className="col-xs-12" style={{textAlign:"center"}}>
    <p>   <span className="selectpercenttext">  The maximum time limit for completing this transaction is 10 Days <br/>
      after generating this enquiry.
                </span></p>
    </Col>
</Row>

<Row noGutters={true} className="margintoprow">
    <Col className="col-xs-12" style={{textAlign:"center"}}>
      <span className="reporttt">  The following will be notified to Artisan & Administration team at Tata Trusts
     
                </span>
               
    </Col>
</Row>
<br/>
<div className="colorbardiv">      
                          <img src={logos.colorbar} className="colorbarimg"></img>
                </div>

                </>:
                //  {this.state.getEnquiryMoq.map((item)=> 
                //     <></>
               // )}

    
                <>
{this.state.getEnquiryMoq.map((item)=> 
                     <>

                {this.state.calulatedAmount?
                 <BuyerAdvancePayment2
                 bp={this.backPI}
                 productDesc ={this.state.productCategories[item.openEnquiriesResponse.productCategoryId - 1]?this.state.productCategories[item.openEnquiriesResponse.productCategoryId - 1].productDesc:""}
                 yarnDesc={this.state.yarns[item.openEnquiriesResponse.warpYarnId - 1 ]?this.state.yarns[item.openEnquiriesResponse.warpYarnId - 1 ].yarnDesc:""}
                 weftYarnId ={this.state.yarns[item.openEnquiriesResponse.weftYarnId - 1 ]?this.state.yarns[item.openEnquiriesResponse.weftYarnId - 1 ].yarnDesc:""}
                 extraWeftYarnId ={item.openEnquiriesResponse.extraWeftYarnId?item.openEnquiriesResponse.extraWeftYarnId:""}
                 extraWeftYarnIds = {this.state.yarns[item.openEnquiriesResponse.extraWeftYarnId - 1 ] ?this.state.yarns[item.openEnquiriesResponse.extraWeftYarnId - 1 ].yarnDesc:""}
                 productType={item.openEnquiriesResponse.productType?item.openEnquiriesResponse.productType:"NA"}
                 companyName={item.openEnquiriesResponse.companyName?item.openEnquiriesResponse.companyName:"NA"}
                 productId={item.openEnquiriesResponse.productId?item.openEnquiriesResponse.productId:"NA"}
                 productImages={item.openEnquiriesResponse.productImages!=null?item.openEnquiriesResponse.productImages:""}
                 enquiryCode={item.openEnquiriesResponse.enquiryCode}
                //  FullCode={item.openEnquiriesResponse.enquiryCode}
                 calulatedAmount={this.state.calulatedAmount}
                 gpay={this.state.gpay?this.state.gpay:"NA"}
                 phonePay={this.state.phonePay?this.state.phonePay:"NA"}
                 paytm={this.state.paytm}
                 ifscCode={this.state.ifscCode}
                 accNo={this.state.accNo}
                 bankName={this.state.bankName}
                 firstName={this.state.firstName}
                 lastName={this.state.lastName}
                 enquiryId={this.state.previewPiOrder.enquiryId}
                 percent={this.state.percent} 
                 totalAmount={this.state.totalAmount}
                 pid={this.state.previewPiOrder.id}
                 receiptId={this.state.getAdvancedPaymentReceipt.paymentId}
                receiptlabel={this.state.getAdvancedPaymentReceipt.label}
                  />
                  
                  :
                  ""
                }
               

               </>
               )}
                </>
                
                }
</>
:
<>
{this.state.getAdvancedPaymentStatus.status === 0 ?
<>

{this.state.getEnquiryMoq.map((item)=> 
<BuyerAdvancePayment3
productType={item.openEnquiriesResponse.productType?item.openEnquiriesResponse.productType:"NA"}
productId={item.openEnquiriesResponse.productId?item.openEnquiriesResponse.productId:"NA"}
productImages={item.openEnquiriesResponse.productImages!=null?item.openEnquiriesResponse.productImages:""}
enquiryCode={item.openEnquiriesResponse.enquiryCode}
productDesc ={this.state.productCategories[item.openEnquiriesResponse.productCategoryId - 1]?this.state.productCategories[item.openEnquiriesResponse.productCategoryId - 1].productDesc:""}
yarnDesc={this.state.yarns[item.openEnquiriesResponse.warpYarnId - 1 ]?this.state.yarns[item.openEnquiriesResponse.warpYarnId - 1 ].yarnDesc:""}
weftYarnId ={this.state.yarns[item.openEnquiriesResponse.weftYarnId - 1 ]?this.state.yarns[item.openEnquiriesResponse.weftYarnId - 1 ].yarnDesc:""}
extraWeftYarnId ={item.openEnquiriesResponse.extraWeftYarnId?item.openEnquiriesResponse.extraWeftYarnId:""}
companyName={item.openEnquiriesResponse.companyName?item.openEnquiriesResponse.companyName:"NA"}
receiptId={this.state.getAdvancedPaymentReceipt.paymentId}
receiptlabel={this.state.getAdvancedPaymentReceipt.label}
enquiryId={this.state.previewPiOrder.enquiryId}
/>
 )}
</>
:
<>
{this.state.getAdvancedPaymentStatus.status === 1 ?
<>
{this.state.getEnquiryMoq.map((item)=> 
<BuyerAdvancePayment3
productType={item.openEnquiriesResponse.productType?item.openEnquiriesResponse.productType:"NA"}
productId={item.openEnquiriesResponse.productId?item.openEnquiriesResponse.productId:"NA"}
productImages={item.openEnquiriesResponse.productImages!=null?item.openEnquiriesResponse.productImages:""}
enquiryCode={item.openEnquiriesResponse.enquiryCode}
productDesc ={this.state.productCategories[item.openEnquiriesResponse.productCategoryId - 1]?this.state.productCategories[item.openEnquiriesResponse.productCategoryId - 1].productDesc:""}
yarnDesc={this.state.yarns[item.openEnquiriesResponse.warpYarnId - 1 ]?this.state.yarns[item.openEnquiriesResponse.warpYarnId - 1 ].yarnDesc:""}
weftYarnId ={this.state.yarns[item.openEnquiriesResponse.weftYarnId - 1 ]?this.state.yarns[item.openEnquiriesResponse.weftYarnId - 1 ].yarnDesc:""}
extraWeftYarnId ={item.openEnquiriesResponse.extraWeftYarnId?item.openEnquiriesResponse.extraWeftYarnId:""}
companyName={item.openEnquiriesResponse.companyName?item.openEnquiriesResponse.companyName:"NA"}
receiptId={this.state.getAdvancedPaymentReceipt.paymentId}
receiptlabel={this.state.getAdvancedPaymentReceipt.label}
enquiryId={this.state.previewPiOrder.enquiryId}
/>
 )}
</>
:
<>
</>}
</>
}
</>



}

<Row>
            <div>
              <img
                className="notifyFooterBanner internaldiv"
                src={logos.notifyFooterBanner}
              ></img>
            </div>
          </Row> 
                </>
:
null
}

             

{/* ---------------------------------------------------------------------------------------------------------------------------------- */}



</Container>
</React.Fragment>
        )
    }
    
}
