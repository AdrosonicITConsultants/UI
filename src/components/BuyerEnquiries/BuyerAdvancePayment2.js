import React, { Component } from 'react'
import ReactDOM from "react-dom";
import ReactToPdf from "react-to-pdf";
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import "./BuyerAdvancePayment.css";
import queryString from 'query-string';
import TTCEapi from '../../services/API/TTCEapi';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import moment from 'moment';
import Moment from 'react-moment';

import Footer from '../footer/footer';

export class BuyerAdvancePayment2 extends Component {
    constructor() {
        super();
        
        this.select20= this.select20.bind(this);
        this.select30= this.select30.bind(this);
        this.select50= this.select50.bind(this);

        this.state = {
            selected:"select20",
            select20:false,
            select30:true,
            select50:false,
            dataload:false,
            enquiryCode:"",

                   }
    }
 
    
    BacktoPreview(){
    this.props.bp();
    }

    uploadReceiptandSend(){
        browserHistory.push("/uploadReceiptandSend?code="+this.state.enquiryCode)
    }

    select20(){
        this.setState((prevState) => {
            return{
             selected: "select20",
             select20:true,
             select30:false,
             select50:false,
         
            };
        });
    }

    select30(){
        this.setState((prevState) => {
            return{
             selected: "select30",
             select20:false,
             select30:true,
             select50:false,
         
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
         
            };
        });
    }

    componentDidMount() {
        let params = queryString.parse(this.props.location.search);
        console.log(params);
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
     
      }
    
    
    
    render(){
        return(
            
<React.Fragment>
<Container>
    {this.state.dataload?
<>


                        

                          {this.state.getEnquiryMoq.map((item)=> 
                <>

                        <Row noGutters={true} className="">
                           <Col sm = "1" className="col-xs-1">
                           <img
                                       src={logos.backarrowicon}
                                       className="margin-cparrow cparrowsize glyphicon"
                                        
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
                                        item.openEnquiriesResponse.productType === "Product"
                                        ?
                                        <a href={"/showArtisanProduct?ProductId="+item.openEnquiriesResponse.productId }><img  src={TTCEapi.ImageUrl +"Product/" + item.openEnquiriesResponse.productId + "/" + item.openEnquiriesResponse.productImages.split(",")[0]} className="enquiryimage advpayimg"></img>
                                        </a>
                                        :
                                        <a href={"/showBuyerProduct?productId="+item.openEnquiriesResponse.productId }><img  src={TTCEapi.ImageUrl +"CustomProduct/" + item.openEnquiriesResponse.productId + "/" + item.openEnquiriesResponse.productImages.split(",")[0]} className="enquiryimage advpayimg"></img>
                                        </a>

                                    }

                                    </div>
                                    
                                   
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
                                          <span className="leEnqbrandname ">{item.openEnquiriesResponse.companyName}</span>                                   
                                      </Col>
                                  </div>
                                </div>
                            </Col>
                            
                        </Row>
                    </Col>

                    
                </Row>
            
                </>
                )}

  <Row noGutters={true}>
            <Col className="col-xs-12">
            <div class="Total-square-container">
                <div class="Total-square">
                <p className="orderamthead">Order amount</p>
              <h3 className="totalamtpay totalamtpay2" ><span > 
                   <i class="fa fa-inr" style={{color:"rgb(26, 68, 206)"}} aria-hidden="true"></i> 1111.00</span>
                    </h3>
                    {/* <span className="advtotal"><i class="fa fa-inr" style={{color:"rgb(26, 68, 206)"}} aria-hidden="true"></i> 44444444</span> */}
     
  
                </div>
                </div>
             
            </Col>
  </Row>

  <Row  noGutters={true}>
      <Col className="col-xs-12 Accdetailstxt">
          Account Details: <br/>
          Bikesh Singh
      </Col>
  </Row>

  <Row  noGutters={true}>
      <Col className="col-xs-12 Accdetailstxt">
          Axis Bank Ltd,Maniabandhan <br/>
          Account No. <span style={{color:"darkgrey"}}>123456</span>    <br/>
          IFSC CODE: <span style={{color:"darkgrey"}}>123456</span>
      </Col>
  </Row>
  <Row>
      <Col className="col-xs-5">
      </Col>
      <Col className="col-xs-2">
      <hr className="hrlineadvpay "></hr>

      </Col>
      <Col className="col-xs-5">
      </Col>
  </Row>
  {/* ----------------------BoX--------------------- */}

  <Row  noGutters={true} className="margintoprow aligncenter">
  <Col className="col-xs-2 ">
         
      </Col>
      <Col className="col-xs-12 " sm={3}>
      
                <Row>
                <Col sm = {{size: "3"}}>

                <img src={logos.gpay} className="gpayicon mt0"></img>

                </Col>
                <Col sm = {{size: "9"}} className="digitalbank">
                <div className="gpaypthmphonepaysize">
                Google Pay UPI Id
                </div>
                <div>
                a
                {/* {this.state.gpayupi} */}
                </div>
                </Col>
                </Row> 
       
      </Col>

      <Col className="col-xs-12 " sm={3}>
      <Row>
                <Col sm = {{size: "3"}}>

                <img src={logos.paytm} className="gpayicon mt0"></img>

                </Col>
                <Col sm = {{size: "9"}} className="digitalbank">
                <div className="gpaypthmphonepaysize">
                Paytm Registered Mobile Number
                </div>
                <div>
                a
                {/* {this.state.gpayupi} */}
                </div>
                </Col>
                </Row> 
      </Col>

      <Col className="col-xs-12 " sm={3}>
                <Row>
                <Col sm = {{size: "3"}}>

                <img src={logos.phonepe} className="gpayicon mt0"></img>

                </Col>
                <Col sm = {{size: "9"}} className="digitalbank ">
                <div className="gpaypthmphonepaysize">
                Registered Number for PhonePay
                </div>
                <div>
                a
                {/* {this.state.gpayupi} */}
                </div>
                </Col>
                </Row> 
      </Col>
      {/* <Col className="col-xs-1 ">
         
      </Col> */}
  </Row>
  {/* ----------------------BoX End--------------------- */}

<Row noGutters={true} className="margintoprow">
<Col className="col-xs-2 ">
         
      </Col>
         <Col className="col-xs-12 " sm={3}>
         
                  
          
         </Col>
   
         <Col className="col-xs-12 " sm={3}>
         <Row noGutters={true} className="pinknote">
             Please make sure that the uploaded images are sharp and bright with proper text visiblity
             and clear handwriting.     
        </Row> 
         </Col>

         <Col className="col-xs-12 " sm={3}>
         <Row noGutters={true} className="pinknote">
                
        </Row> 
         </Col>
   
        

</Row>


<Row noGutters={true} className="margintoprow">
{/* <Col className="col-xs-2 ">
         
      </Col> */}
    
         <Row noGutters={true} className="bluenote">
         <Col className="col-xs-1 ">
         
         </Col>
             <Col className="col-xs-12" sm={6}>
             <button className="proccedwithadvpaybtn uploadtractionbtnfloat" 
         onClick={() => this.uploadReceiptandSend()}>
        <i class="fa fa-upload" aria-hidden="true" style={{marginRight:"5px"}}></i>           
        Upload transaction receipt 
            </button>
             </Col>
             <Col className="col-xs-12" sm={3}>
             Image file formats & <br/> .pdf only.Upto 5Mb Max. 
             </Col>

       
   
        </Row> 
        

         {/* <Col className="col-xs-12 " sm={3}>
         <Row noGutters={true} className="pinknote">
                
        </Row> 
         </Col> */}
   
        

</Row>














<Row noGutters={true} style={{marginTop:"10px"}}>
    <Col className="col-xs-12" style={{textAlign:"center"}}>
    <p>   <span className="selectpercenttext" style={{color:"#333"}}>You can come back later to upload receipt. <br/>  
    The maximum time limit for completing this transaction is 10 Days <br/>
      after generating this enquiry.
                </span></p>
    </Col>
</Row>

<Row noGutters={true} className="margintoprow">
    <Col className="col-xs-12" style={{textAlign:"center"}}>
      <span className="reporttt">  It will be notified to Artisan for confirmation & the Administration team at Tata Trusts
     
                </span>
               
    </Col>
</Row>
<br/>
<div className="colorbardiv">      
                          <img src={logos.colorbar} className="colorbarimg"></img>
                </div>

                </>:null}
</Container>

</React.Fragment>
        )
    }
    
}
function mapStateToProps(state) {
    // debugger;
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(BuyerAdvancePayment2);
export default connectedLoginPage;