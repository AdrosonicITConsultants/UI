import React, { Component } from 'react'
import ReactDOM from "react-dom";
import ReactToPdf from "react-to-pdf";
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
// import "./BuyerAdvancePayment.css";
import queryString from 'query-string';
import TTCEapi from '../../services/API/TTCEapi';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import moment from 'moment';
import Moment from 'react-moment';

import Footer from '../footer/footer';
// import { BuyerAdvancePayment3 } from './BuyerAdvancePayment3';
// import BuyerAdvancePayment from './BuyerAdvancePayment';

export default class AdvancePaymentCR2 extends Component {
    constructor() {
        var min=1; 
        var max=100;  
        super();
        this.onFileChange= this.onFileChange.bind(this);
        this.uploadReceiptandSend= this.uploadReceiptandSend.bind(this);
        this.state = {
            dataload:true,
            enquiryCode:"",
            upload:true,
            success:false,
            selectedFile:null,
            selectedFileName:"",
            uploadButtonClick:false,
            random: Math.floor(Math.random() * (+max - +min)) + +min,
          
                   }
    }
 
    
    BacktoPreview(){
        localStorage.setItem("SelectPI", 1);
            this.props.bp();
    }

   
    uploadReceiptandSend(){
        this.setState({
            uploadButtonClick:true
          })
    document.getElementById('acceptMOQModal').style.display='block';
                
        const formData = new FormData(); 
        formData.append( 
          "myFile", 
          this.state.selectedFile, 
          this.state.selectedFile.name 
        );
       
        TTCEapi.advancedPayment(
            this.state.selectedFile,
            this.props.enquiryId,
            this.props.calulatedAmount,
            this.props.percent,
            this.props.pid,
            this.props.totalAmount,
            3
            ).then((response)=>{
            
            if(response){
                 if(response.data.valid){ 
                document.getElementById('acceptMOQModal').style.display='none';

                this.setState({  
               success:true
              
            },()=>{
          
            });
          
      }
      else{
        document.getElementById('acceptMOQModal').style.display='none';

        this.setState({
            uploadButtonClick:false
      });
      customToast.error(response.data.errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: true,
      });
      
      } }
                  else{
                    browserHistory.push("/404error")
                  }
                  
        })
      
    }

  
    onFileChange(e){
        this.setState({
            selectedFile:e.target.files[0]
            
        },()=>{
             this.setState({
        selectedFileName: this.state.selectedFile.name,
        upload:false
      })
           
        })
    }

      acceptMOQModalShow = () => {
        document.getElementById('acceptMOQModal').style.display='block';
    }

    acceptMOQModalClose = () => {
        document.getElementById('acceptMOQModal').style.display='none';
    }

    goBack(){
        browserHistory.push("/payadvance?code="+this.state.enquiryCode)
    }
    render(){


        return(
            
<React.Fragment>
<Container>
    {this.state.dataload?
<>

        {this.state.success == false?
        <>
        

                        <Row noGutters={true} className="">
                           <Col sm = "1" className="col-xs-1">
                           <img
                                       src={logos.backarrowicon}
                                       className="margin-cparrow cparrowsize glyphicon"
                                       onClick={() => this.BacktoPreview()}
                            ></img>
                          
                          </Col>
                          <Col sm = "11" className="col-xs-11  ">
                         <h3 className="fontheadingadv"><b>Advance Payment for Enquiry id:
                             {this.props.enquiryCode}
                              </b></h3>
                          
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
                                        this.props.productType === "Product"
                                        ?
                                        <a href={"/showArtisanProduct?ProductId="+this.props.productId }><img  src={TTCEapi.ImageUrl +"Product/" + this.props.productId + "/" + this.props.productImages.split(",")[0]} className="enquiryimage advpayimg"></img>
                                        </a>
                                        :
                                        <a href={"/showBuyerProduct?productId="+this.props.productId }><img  src={TTCEapi.ImageUrl +"CustomProduct/" + this.props.productId + "/" + this.props.productImages.split(",")[0]} className="enquiryimage advpayimg"></img>
                                        </a>

                                    }

                                    </div>
                                    
                                    {/* <span ></span> */}
                                </div>
                                <div>
                                  <div noGutters={true} >
                                      <Col className="leEnqid bold payadvhead">
                                      Enquiry Id : {this.props.enquiryCode}
                                      </Col>
                                  </div>
                                  <div noGutters={true} >
                                      <Col >
                                      <span className="leEnqtype bold fontsize16pa ">{this.props.productDesc} </span> 

                                       <span className="leEnqspun fontsize16pa"> / {this.props.yarnDesc ? this.props.yarnDesc : "NA"}  X  {this.props.weftYarnId ? this.props.weftYarnId : "NA"}  
                                        {this.props.extraWeftYarnId > 0 
                                        ?
                                        <>
                                        X {this.props.extraWeftYarnIds?this.props.extraWeftYarnIds:""}
                                        </>
                                        :
                                            <></>
                                        }</span> 
                                      </Col>
                                  </div>
                                  
                               
                                 
                                  <div noGutters={true} className="" >
                                      <Col className="leEnqprodcode ">
                                          <span className="leEnqprodbn bold">Artisan Brand : </span>
                                          <span className="leEnqbrandname ">{this.props.companyName}</span>                                   
                                      </Col>
                                  </div>
                                </div>
                            </Col>
                            
                        </Row>
                    </Col>

                    
                </Row>
            

                          
  <Row noGutters={true}>
            <Col className="col-xs-12">
            <div class="Total-square-container">
                <div class="Total-square">
                <p className="orderamthead">Advance amount</p>
              <h3 className="totalamtpay totalamtpay2" ><span > 
    ₹ {(this.props.getRevisedAdvancedPaymentStatus).toFixed(2)}
     </span>
                    </h3>
    
  
                </div>
                </div>
             
            </Col>
  </Row>
 

  <Row  noGutters={true}>
      <Col className="col-xs-12 Accdetailstxt">
          Account Details: <br/>
          {this.props.firstName ? this.props.firstName:"NA"} {this.props.lastName ? this.props.lastName:""}
      </Col>
  </Row>

  <Row  noGutters={true}>
      <Col className="col-xs-12 Accdetailstxt">
      {this.props.bankName?this.props.bankName:"NA"} <br/>
          Account No. <span style={{color:"darkgrey"}}>{this.props.accNo ? this.props.accNo:"NA"}</span>    <br/>
          IFSC CODE: <span style={{color:"darkgrey"}}>{this.props.ifscCode ? this.props.ifscCode : "NA"}</span>
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
 
      <Col className="col-xs-12 " sm={4}>
      
                <Row className="bankiconborderright ">
                <Col sm = {{size: "3"}}>

                <img src={logos.gpay} className="gpayicon mt0"></img>

                </Col>
                <Col sm = {{size: "9"}} className="digitalbank">
                <div className="gpaypthmphonepaysize">
                Google Pay UPI Id
                </div>
                <div>
                {this.props.gpay ? this.props.gpay :"NA"}
                
                </div>
                </Col>
                </Row> 
       
      </Col>

      <Col className="col-xs-12 " sm={4}>
      <Row className="bankiconborderright">
                <Col sm = {{size: "3"}}>

                <img src={logos.paytm} className="gpayicon mt0"></img>

                </Col>
                <Col sm = {{size: "9"}} className="digitalbank">
                <div className="gpaypthmphonepaysize">
                Paytm Registered Mobile Number
                </div>
                <div>
                {this.props.paytm ? this.props.paytm :"NA"}
                
                </div>
                </Col>
                </Row> 
      </Col>

      <Col className="col-xs-12 " sm={4}>
                <Row>
                <Col sm = {{size: "3"}}>

                <img src={logos.phonepe} className="gpayicon mt0"></img>

                </Col>
                <Col sm = {{size: "9"}} className="digitalbank ">
                <div className="gpaypthmphonepaysize">
                Registered Number for PhonePay
                </div>
                <div>
                {this.props.phonePay ? this.props.phonePay :""}
                {/* {this.state.gpayupi} */}
                </div>
                </Col>
                </Row> 
      </Col>
  
     
  </Row>
  {/* ----------------------BoX End--------------------- */}

<Row noGutters={true}>
            <Col className="col-xs-12 pinknote" style={{textAlign:"center"}}>
            Please make sure that the uploaded images are <br/> sharp and bright with proper text visiblity
             and <br/>clear handwriting. 
             
            </Col>
  </Row>
  


{this.state.upload?
    <Row noGutters={true} className="margintoprow aligncenter">

         <Row noGutters={true} className="bluenote">
         <Col className="col-xs-1 ">
         
         </Col>
             <Col className="col-xs-12 aligncenter" sm={6}>
      
        

        <input type="file" id="file"  accept=".png, .jpg, .jpeg"
       onChange={this.onFileChange}
        />
        <label for="file" className="uploadtractionbtnfloat" >
      
            <i class="fa fa-upload" aria-hidden="true"style={{marginRight:"5px",height:"10px"}}></i>

             Upload transaction receipt </label>
             </Col>
             <Col className="col-xs-12 aligncenter" sm={3}>
             Image file formats & <br/> .pdf only.Upto 5Mb Max. 
             </Col>
               
        </Row> 
  
            </Row>
            :
            <>
            <Row noGutters={true} className="margintoprow aligncenter">
            <Col className="col-xs-12 " style={{textAlign:"center"}}>
                   
                    <input type="file" id="file" accept=".png, .jpg, .jpeg" onChange={this.onFileChange} />
                    <label for="file" className="uploadroundbtn" >
                   
                    <i class="fa fa-upload" aria-hidden="true"style={{marginRight:"5px",height:"10px"}}></i>

                     </label>
                      <b className="uploadreceiptname">{this.state.selectedFileName}</b>
                    <br/>
                    <div>
                    <button className="uploadconfirmbtn" 
                    disabled={this.state.uploadButtonClick}
                    onClick={() => this.uploadReceiptandSend()}>
                        <i class="fa fa-paper-plane" aria-hidden="true" style={{marginRight:"5px"}}></i>  
                    Upload and send for confirmation 
                        </button>
                        </div>
                    
                </Col>
                
            </Row>
   
          </>
            }

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
{/* _________________________________________Modal_________________________________________________ */}
                                          
                                            <div id="acceptMOQModal" class="w3-modal">
                                                            <div class="w3-modal-content w3-animate-top modalBoxSize modalBoxTop">
                                                                <div class="w3-container buyerMOQAcceptModalContainer">
                                                                <Row noGutters={true} className="buyerMOQAcceptModalOuter uploadingreceiptheading ">
                                                                    <Col className="col-xs-12 fontplay">
                                                                        Uploading your receipt
                                                                        <br/>
                                                                        <img src={logos.rotatingshapes} style={{height:"40px",marginTop:"10px"}}/>
                                                                        <div class="loading-bar">
                                                                            <div class="fuzzy"></div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                
                                                                <Row noGutters={true}>
                                                                <Col className="col-xs-12" style={{textAlign:"center"}}>
                                                                <button onClick={this.acceptMOQModalClose} className="uploadInbgbtn">
                                                                <img src={logos.backupload} style={{height:"12px",marginRight:"8px"}}/>  Upload in background
                                                             </button>
                                                                  
                                                                </Col>
                                                                </Row>
                                                                                                                                 
                                                                
                                                            </div>
                                                            </div>
                                                </div>


{/* ___________________________________________________________________________________________________ */}
<br/>
<div className="colorbardiv">      
                          <img src={logos.colorbar} className="colorbarimg"></img>
                </div>
                
                </>
        :
        <>
        {window.location.reload()}
{/* <BuyerAdvancePayment3
productType={ this.props.productType}
productId={this.props.productId}
productImages={this.props.productImages}
enquiryCode={this.props.enquiryCode}
enquiryId={ this.props.enquiryId}
productDesc={this.props.productDesc}
yarnDesc={this.props.yarnDesc}
weftYarnId={this.props.weftYarnId}
extraWeftYarnId={this.props.extraWeftYarnId}
companyName={this.props.companyName}
receiptId={this.props.receiptId}
receiptlabel={this.props.receiptlabel}
/> */}

        </>
        }
                </>:null}
                
    
                                        
</Container>

</React.Fragment>
        )
    }
    
}

