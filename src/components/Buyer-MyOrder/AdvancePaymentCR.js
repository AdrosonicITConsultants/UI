import React, { Component } from 'react'
import ReactDOM from "react-dom";
import ReactToPdf from "react-to-pdf";
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import logos from "../../assets";
// import "./BuyerAdvancePayment.css";
import queryString from 'query-string';
import TTCEapi from '../../services/API/TTCEapi';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import moment from 'moment';
import Moment from 'react-moment';
import NavbarComponent from "../navbar/navbar";
import Footer from '../footer/footer';
import BuyerAdvancePayment2 from "../BuyerEnquiries/BuyerAdvancePayment2"
import BuyerAdvancePayment3 from "../BuyerEnquiries/BuyerAdvancePayment3"


export default class AdvancePaymentCR extends Component {
    constructor() {
        super();
        
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

        this.state.enquiryCode = params.code;
        TTCEapi.getProductUploadData().then((response)=>{
            if(response.data.valid)
            {
                this.setState({productCategories: response.data.data.productCategories,
                    yarns: response.data.data.yarns },()=>{
            
                        TTCEapi.getEnquiryMoq(params.code).then((response)=>{
                            if(response.data.data[0].paymentAccountDetails.length != 0)
                            {
                                
                                for (var  items in response.data.data[0].paymentAccountDetails)
                                {
                                    switch(response.data.data[0].paymentAccountDetails[items].accountType.id){
                                        case 1:
                                            //("bank");   
                                            this.setState({
                                                accountno : parseInt(response.data.data[0].paymentAccountDetails[items].accNo_UPI_Mobile),
                                                bankname : response.data.data[0].paymentAccountDetails[items].bankName ,
                                                branch : response.data.data[0].paymentAccountDetails[items].branch ,
                                                ifsccode : response.data.data[0].paymentAccountDetails[items].ifsc,
                                                benificiaryname : response.data.data[0].paymentAccountDetails[items].name
                                            }); 
                                            break;
                                        case 2:
                                            // ("gpayy");
                                            if(response.data.data[0].paymentAccountDetails[items].accNo_UPI_Mobile != ''){
                                            
                                                this.setState({
                                                    gpayupi : parseInt(response.data.data[0].paymentAccountDetails[items].accNo_UPI_Mobile), 
                                                }); 
                                            }
                                            
                                            break;
                                        case 3:
                                            if(response.data.data[0].paymentAccountDetails[items].accNo_UPI_Mobile != ''){
                                            
                                            this.setState({
                                                phonepeupi : parseInt(response.data.data[0].paymentAccountDetails[items].accNo_UPI_Mobile), 
                                            }); 
                                        }
                                            break;
                                        case 4:
                                            //("paytm");
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
                          
                            });
                        });
                    });
            }
        })
      
      }
    
      backoperation(){
        localStorage.setItem("SelectPI", 1);
          browserHistory.goBack()
      }
    
    render(){
        return(
            
<React.Fragment>
<Container>
<NavbarComponent />
    {this.state.dataload?
    
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
                                      <span className="leEnqspun fontsize16pa"> / {item.openEnquiriesResponse.warpYarnId ? this.state.yarns[item.openEnquiriesResponse.warpYarnId - 1 ].yarnDesc : "NA"}  X  {item.openEnquiriesResponse.weftYarnId ? this.state.yarns[item.openEnquiriesResponse.weftYarnId - 1 ].yarnDesc : "NA"}  
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




  {/* <Row  noGutters={true}>
      <Col className="col-xs-12 selectpercenttext">
          Select the % of the total amount (as per PI) you wish to pay below
      </Col>
  </Row> */}
 
<Row noGutters={true} className="margintoprow">
    <Col className="col-xs-12" style={{textAlign:"center"}}>
      <span className="selectpercenttext">  You need to pay pending advance amount : 
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
