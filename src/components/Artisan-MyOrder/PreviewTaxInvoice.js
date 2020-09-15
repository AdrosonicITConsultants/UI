import React, { Component } from 'react'
import ReactDOM from "react-dom";
import ReactToPdf from "react-to-pdf";
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
// import "./PreviewChangedPI.css";
import queryString from 'query-string';
import TTCEapi from '../../services/API/TTCEapi';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import moment from 'moment';
import Footer from '../footer/footer';
import { PreviewOldchanges } from './PreviewOldchanges';
const ref = React.createRef();
const options = {
    orientation: 'landscape',
    unit: 'in',
    format: [1500,1000]
};
export class PreviewTaxInvoice extends Component {
    constructor(props) {
        super(props);
        var today = new Date(),
        date = today.getDate()+ '.'+ (today.getMonth() + 1) + '.' + today.getFullYear() ;

        this.state = {
          enquiryId: this.props.enquiryId,
          // enquiryId:1435,
          time: '',
           currentDate: date,
          dataload : false,
          enquiryCode:this.props.enquiryCode,
          expectedDateOfDelivery:this.props.expectedDateOfDelivery,
          cgst:this.props.cgst,
          hsn:this.props.hsn,
          rpu:this.props.rpu,
          quantity:this.props.quantity,
          sgst:this.props.sgst,
          piSend:this.props.piSend,
          previewPI:[],
          previewPiOrder:[],
          buyerCustomProduct:[],
          paymentDetails:[],
          artisanUser:[],
          addressses:[],
          generatedBy:[],
          productCategory:[],
          companyDetails:[],
          sendPI: false,
          weftDye:[],
          warpDye:[],
          extraWeftDye:[],
          weftYarn:[],
          warpYarn:[],
            extraWeftYarn:[],
            customweftDye:[],
            customwarpDye:[],
            customextraWeftDye:[],
            customweftYarn:[],
            customwarpYarn:[],
            customextraWeftYarn:[],
            gobackButtonClick:false,
            history:false,
            customhistory:false,
            productCategories:[],
            yarns:[],
            reedCounts:[],
            dyes:[],
            getOldPIData:[],
            oldDataPI:false,
            gobackButtonClick:false,
            sendTax:[]


        };
        this.newPIpreview = this.newPIpreview.bind(this);
      }
      newPIpreview(){
        this.setState({
          oldDataPI:false,
        })
      }
    

    BacktoPreview(){
    this.props.bp();
    }

    componentDidMount() {
      TTCEapi.getProductUploadData().then((response)=>{
        if(response.data.valid)
        {
            console.log(response.data);
            this.setState({productCategories: response.data.data.productCategories,
                yarns: response.data.data.yarns ,dyes : response.data.data.dyes ,reedCounts : response.data.data.reedCounts},()=>{
                  TTCEapi.getOldPIData(this.props.enquiryId).then((response)=>{
                    if(response.data.valid)
                    {
                        this.setState({getOldPIData:response.data.data,
                         
                            })
                    }
                    console.log(this.state.getOldPIData)
                })

                  TTCEapi.previewPI(this.props.enquiryId).then((response)=>{
                    if(response.data.valid)
                    {
                        console.log("ffffind")
                        console.log(response.data.data);
                        if(response.data.data.productHistory != null)
                        { 
                          this.setState({history:true});
                         
                          
                        }
                        if(response.data.data.buyerCustomProductHistory != null)
                        { 
                          this.setState({customhistory:true});
                         
                          
                        }
                        if(response.data.data.productCustom === false){
                          this.setState({
                            
                            previewPI:response.data.data,
                            buyerDetails: response.data.data.generatedBy,
                            previewPiOrder:response.data.data.piOrder,
                            buyerCustomProduct:response.data.data.buyerCustomProduct,
                            paymentDetails:response.data.data.paymentDetails,
                            artisanUser:response.data.data.artisanUser,
                            generatedBy:response.data.data.generatedBy,
                            weftDye:response.data.data.product.weftDye,
                            warpDye:response.data.data.product.warpDye,
                            extraWeftDye:response.data.data.product.extraWeftDye,
                            weftYarn:response.data.data.product.weftYarn,
                            warpYarn:response.data.data.product.warpYarn,
                            extraWeftYarn:response.data.data.product.extraWeftYarn,
                            dataload : true,
            
                        })
                        }
                        else{
                          this.setState({
                            
                            previewPI:response.data.data,
                            buyerDetails: response.data.data.generatedBy,
                            previewPiOrder:response.data.data.piOrder,
                            buyerCustomProduct:response.data.data.buyerCustomProduct,
                            paymentDetails:response.data.data.paymentDetails,
                            artisanUser:response.data.data.artisanUser,
                            generatedBy:response.data.data.generatedBy,
                            customweftDye:response.data.data.buyerCustomProduct.weftDye,
                            customwarpDye:response.data.data.buyerCustomProduct.warpDye,
                            customextraWeftDye:response.data.data.buyerCustomProduct.extraWeftDye,
                            customweftYarn:response.data.data.buyerCustomProduct.weftYarn,
                            customwarpYarn:response.data.data.buyerCustomProduct.warpYarn,
                            customextraWeftYarn:response.data.data.buyerCustomProduct.extraWeftYarn,
                            dataload : true,
            
                        })
                      
                        }
                           
                    
                             
                    }
                    // console.log(this.state.buyerCustomProduct.weftYarn.yarnDesc);
                })
                   
                });
        }
      });
      var date = moment()
      .utcOffset('+05:30')
      .format(' hh:mm A');
    this.setState({ time: date });  

      }
    
      sendPI(){
         this.setState({
          //  sendPI: true,
            gobackButtonClick:true,
         })
       
        TTCEapi.sendTaxInvoice(
            this.props.apr,
            this.props.cgst,
            this.props.deliverycharge ,
            this.props.enquiryId,
            this.props.finalamt,
            this.props.rpu,
            this.props.quantity,
            this.props.sgst,
         
                    
           ).then((response)=>{
               console.log(response);
               if(response.data.valid){
            this.setState({sendTax : response.data,
              },()=>{
            console.log(this.state.sendTax);
           this.componentDidMount();
            });
            customToast.success("Tax Details sent successfully", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true,
              });
          } 
        else{
          this.setState({
            // sendPI: true,
            gobackButtonClick:true
          })
          customToast.error(response.data.errorMessage , {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true,
          });
        }
        });
      
    } 
    viewOldPI(){
      this.setState({
        oldDataPI:true,
         
      })
  }
    
    render(){
        return(
            
<React.Fragment>
    {this.state.dataload?<>
   
{/* --------------------------------------Invoice---------------------------------------------------------- */}

    <div >

   <Row noGutters={true}>
        <Col className="col-xs-6 bold" >
       
            <p style={{fontWeight:"100"}}>INVOICE ID:<b>{this.props.invoiceId}</b></p>

        </Col>
        <Col className="col-xs-4" >
      
         </Col>
       
         <Col className="col-xs-2">
          {this.props.taxInvoiceGenerated==true?
          "":
          <button  disabled={this.state.gobackButtonClick} 
        onClick={() => this.sendPI()} 
        className="Raiseinvbtn raisePI" 
        style={{float:"right",width:"215px"}}><img src={logos.Iconpaymentinvoice} className="InvImg"/> 
        Raise Tax Invoice</button>
          }
         
         </Col>
    </Row>
   <Row noGutters={true}>
       <Col className="col-xs-9">
       Received at :  {this.state.time} on  { this.state.currentDate }
</Col>

<Col className="col-xs-3">
   {/* <img src={logos.downloadpdficon}style={{height:"15px"}} />   
    Download this Invoice */}
</Col>

   </Row>
<Row className="MainPIRow " >
{/* -----------------------------------------text------------------------------------- */}

{/* -----------------------------------------text------------------------------------- */}
<Row noGutters={true} className="Invoicemb" >
    <Col className="col-xs-12"> Tax Invoice 
    {/* {this.state.previewPiOrder.id} */}
</Col>
</Row>

{/* --------------------------------------------------col 6-6-------------------------------------------------- */}

<Row noGutters={true} className="Invoicemb" >

{this.state.artisanUser? 
<>
    <Col sm={6} className=" col-xs-6 Invoicebr" style={{height:"auto"}}>
   <b className="origintxt">Origin</b>
   <Row noGutters={true}>
       <Col sm={4} className=" col-xs-5">
       {this.state.artisanUser.companyDetails?
       this.state.artisanUser.companyDetails.logo ?
        <img className="Pilogoimg" src={TTCEapi.ImageUrl+'User/'+this.state.artisanUser.id+'/CompanyDetails/Logo/'+this.state.artisanUser.companyDetails.logo}/>
        :
         <img src={logos.Smile} className="Pilogoimg"></img>
                    :
                    <img src={logos.Smile} className="Pilogoimg"></img>
           }
       </Col>
       <Col sm={8} className=" col-xs-7 ">
    <b className="Ttbrand"> {this.state.artisanUser.companyDetails?this.state.artisanUser.companyDetails.companyName:""}</b> 
           <p className="subttbrand"> {this.state.artisanUser.cluster?
           this.state.artisanUser.cluster.desc:
           "NA"
           }</p>
          <p className="subttbrand">
         
          {this.state.artisanUser.addressses[0].line1}
    {this.state.artisanUser.addressses[0].line2} 
    {this.state.artisanUser.addressses[0].street}
    {this.state.artisanUser.addressses[0].pincode} 
    {this.state.artisanUser.addressses[0].state}  {this.state.artisanUser.addressses[0].country.name}
          
          </p>
          <p className="subttbrand fontplay"> {this.state.artisanUser.firstName?
           this.state.artisanUser.firstName:
           "NA"
           }  {this.state.artisanUser.lastName?
            this.state.artisanUser.lastName:
            "NA"
            }</p>
          
       </Col>
   </Row>
   <Row noGutters={true}>
   <Col sm={12} >
           <b className="Mobnumpi">Mobile Number : {this.state.artisanUser.mobile?
            this.state.artisanUser.mobile:
            this.state.artisanUser.alternateMobile?
            this.state.artisanUser.alternateMobile : "NA"
            }</b>
       </Col>
   </Row>
    </Col>
    </> :''}  

    <Col sm={6} className=" col-xs-6  ">
   <b className="origintxt">Buyer</b>
   <Row noGutters={true}>
       <Col sm={4} className=" col-xs-5">

     
        
       {this.state.buyerDetails.companyDetails.logo ? 
           <img src={TTCEapi.ImageUrl+'User/'+this.state.buyerDetails.id+'/CompanyDetails/Logo/'+this.state.buyerDetails.companyDetails.logo} className="Pilogoimg"></img>
           :  <img className="Pilogoimg" src={logos.Smile} /> }
       </Col>
       <Col sm={8} className=" col-xs-7 ">
        <b className="Ttbrand">{this.state.generatedBy.companyDetails.companyName}</b> 
          <br/>
          <b className="RAcss subttbrand">Registered Address:</b>
          <p className="subttbrand"> 
          {this.state.buyerDetails.addressses[0].line1}
    {this.state.buyerDetails.addressses[0].line2} 
    {this.state.buyerDetails.addressses[0].street}
    {this.state.buyerDetails.addressses[0].pincode}
    {this.state.buyerDetails.addressses[0].state}  {this.state.buyerDetails.addressses[0].country.name}
          </p>
         
          <p className="subttbrand fontplay"> {this.state.generatedBy.firstName?
           this.state.generatedBy.firstName:
           "NA"
           }  {this.state.generatedBy.lastName?
            this.state.generatedBy.lastName:
            "NA"
            }</p>
            
          
       </Col>
   </Row>
   <Row noGutters={true}>
       <Col sm={12} >
        <b className="Mobnumpi">Mobile Number : {this.state.generatedBy.mobile?this.state.generatedBy.mobile:this.state.generatedBy.alternateMobile?this.state.generatedBy.alternateMobile:""}</b>
       </Col>
   </Row>
    </Col>

   
</Row>





{/* --------------------------------------------------col 6-6-------------------------------------------------- */}
<Row noGutters={true} className="">
 
<table style={{width:"100%"}}>
    <tr>
    <td>
         <p className="PaymentTerm">Payment Terms: Advance</p> 
       <p className="againstpi">'Advance Against PI'</p>
       </td>
    <td><p className="yetdodecide">
        {this.props.percentage==0 ?
        "Yet to be decided"
            :
            <>
            {this.props.percentage}%
            </>}
       </p> 
       <p className="advpaidamt">Advance paid of Total amount</p>
       </td>
    <td className="tdwidth">
    <p className="PaymentTerm">Delivery Terms</p>
    <p className="yetpaysts">Yet to be dispatched after payment of final amount</p>
    </td>
    <td className="enqidanddatecolwidth">
    <p className="PaymentTerm">Enquiry Id</p> 
       <p className="againstpi">{this.props.enquiryCode}</p>
    </td>
    <td className="enqidanddatecolwidth">
    <p className="PaymentTerm">Date: {this.state.previewPiOrder.date}</p> 
       <p className="againstpi" style={{color:"rgb(138 43 226 / 73%);"}}>ORDER No. {this.state.previewPiOrder.orderId}</p>
    </td>
  </tr>
</table>

</Row>
{/* ----------------------------------------------------------------------------------------- */}
<Row noGutters={true} className="">
 
 <table style={{width:"100%"}}>
  {/* ---------------------------------------------------- */}
     <tr>
     <td>
     <h3 className="snopi srwidth ">S No.</h3>
        </td>
     <td>
     <h3 className="snopi gdwidth">Particulars</h3>
        </td>
        <td  >
     <h3 className="snopi">HSN Code</h3>
        </td>
     <td className="Qtyandhsn">
     <h3 className="snopi">Quantity</h3>
     </td>
     <td className="Qtyandhsn">
     <h3 className="snopi rpu">Rate/per unit</h3>
     </td>
     <td>
     <h3 className="snopi">Amount</h3>
     </td>
   </tr>
    {/* ------------------------------------- */}
   <tr> 
     <td>
     <h3 className="snopi srwidth ">01</h3>
     {this.state.getOldPIData.length==0?""
     :
     <p className="CRfondcss"></p>

          }
        </td>
        
 
{/* receipt */}

{this.state.previewPI.productCustom === false && this.state.dataload?
<>
{console.log("Product  Simple")}
<>

<td className="tdmarginleft">


    <h3 className="snopi gdwidth wraptext" style={{textAlign:"left",padding:"46px 0px 153px 0px"}}>
       {this.state.history ? 
       <>
     <span>   {this.state.previewPI.productHistory.tag}-{this.state.previewPI.productHistory.length}  <b className="CRfondcss">CR</b> </span>
       </>
       :
       <>
    <span>  {this.state.previewPI.product.tag} -{this.state.previewPI.product.length}  <b className="CRfondcss">CR</b></span> 
       </>
         }  
       </h3>   

          
     
        </td>
</>

  
        </>
        :
        <>
        {console.log("Product  custom")}
        <td className="tdmarginleft">
        <h3 className="snopi gdwidth wraptext" style={{textAlign:"left",padding:"46px 0px 153px 0px"}}>Custom Product -{this.state.buyerCustomProduct.length}</h3>
       
        </td>
        </>
}





        <td >
     <p className="snopi wraptext">{this.state.previewPiOrder.hsn}</p>
     </td>
     <td >
     <p className="snopi wraptext">{this.props.quantity}</p>
     </td>
     <td>
     <p className="snopi rpu wraptext">{this.props.rpu}</p>
     </td>
     <td>
     <p className="snopi wraptext">{parseFloat(this.props.finalamt).toFixed(2)}</p>
     </td>
   </tr>
   {/* --------------------------------------------- */}
   <tr> 
     <td>
     
        </td>
        <td>
     <h3 className="snopi gdwidth freightch" >Freight Charges <span className="Cursivefont">(if any)</span></h3>
     {/* <p style={{textAlign:"left",marginLeft:"25px"}} className="font10 wraptext"><span className="Cursivefont">SCGT</span><b > @ {this.state.previewPiOrder.sgst}</b></p>
     <p style={{textAlign:"left",marginLeft:"25px"}} className="font10 wraptext"><span className="Cursivefont">CGST</span><b> @ {this.state.previewPiOrder.cgst}</b></p>
        </td> */}
        </td>
     <td >
     <h3 className="snopi wraptext"></h3>
     <h3 className="snopi wraptext"></h3>
     </td>
     <td >
     <p className="snopi wraptext"></p>
     </td>
     <td>
      <h3 className="snopi wraptextrpu"></h3>
     <h3 className="snopi wraptext rpu"></h3>
     </td>
     <td>
     <h3 className="snopi wraptextrpu"> {parseFloat(this.props.deliverycharge).toFixed(2)}</h3>

    
{/* <h3 className="snopi wraptext">{(this.state.previewPiOrder.totalAmount * this.state.previewPiOrder.sgst / 100).toFixed(2)}</h3>
     <h3 className="snopi wraptext">{(this.state.previewPiOrder.totalAmount * this.state.previewPiOrder.cgst / 100).toFixed(2)}</h3> */}
     </td>
   </tr>
   {/* ----------------------------------------subtotal----------------------------------- */}
   <tr>
     <td>
     <h3 className="snopi srwidth "></h3>
        </td>
     <td>
     <h3 className="freightch snopi"><b>Sub Total</b></h3>
        </td>
        <td >
     <h3 className="snopi wraptext"></h3>
     </td>
     <td className="">
     <h3 className="snopi wraptext"></h3>
     </td>
     <td>
     <h3 className="snopi wraptext rpu"></h3>
     </td>
     <td>
     <h3 className="snopi wraptext"> {( parseFloat(this.props.finalamt) + parseFloat(this.props.deliverycharge)).toFixed(2)} </h3>
     </td>
   </tr>

   {/* --------------------------------------sgst/cgst-------------------------------------------- */}
   <tr>
     <td>
     <h3 className="snopi srwidth "></h3>
        </td>
     <td>
     <h3 className="freightch snopi"><p style={{textAlign:"left",marginLeft:"25px"}} className="font10 wraptext"><span className="Cursivefont">SCGT</span><b > @ {this.props.sgst}</b></p>
     <p style={{textAlign:"left",marginLeft:"25px"}} className="font10 wraptext"><span className="Cursivefont">CGST</span><b> @ {this.props.cgst}</b></p>
      </h3>
        </td>
        <td >
     <h3 className="snopi wraptext"></h3>
     </td>
     <td className="">
     <h3 className="snopi wraptext"></h3>
     </td>
     <td>
     <h3 className="snopi wraptext rpu"></h3>
     </td>
     <td>
     <h3 className="snopi wraptext"> {parseFloat(this.props.finalamt * this.props.sgst / 100).toFixed(2)}</h3>
     <h3 className="snopi wraptext">{parseFloat(this.props.finalamt * this.props.cgst / 100).toFixed(2)}</h3>
     </td>
   </tr>
   {/* -------------------------------------------total------------------------------------------ */}
    <tr>
     <td>
     <h3 className="snopi srwidth "></h3>
        </td>
     <td>
     <h3 className="freightch snopi"><b>Total</b></h3>
     <h3 className="freightch snopi"><b>Advance amount paid</b></h3>
        </td>
        <td >
     <h3 className="snopi wraptext"></h3>
     </td>
     <td className="">
    <h3 className="snopi wraptext">{this.props.quantity}</h3>
    <h3 className="snopi wraptext"></h3>
     </td>
     <td>
     <h3 className="snopi wraptext rpu"> ___</h3>
     </td>
     <td>
     <h3 className="snopi wraptext">  {((parseFloat(this.props.finalamt) + parseFloat(this.props.deliverycharge)+parseFloat(this.props.finalamt * this.props.sgst / 100) 
     +parseFloat(this.props.finalamt * this.props.cgst / 100)).toFixed(2)) }</h3>
     <h3 className="snopi wraptext">
     {(((parseFloat(this.props.finalamt) + parseFloat(this.props.deliverycharge)+parseFloat(this.props.finalamt * this.props.sgst / 100) 
     +parseFloat(this.props.finalamt * this.props.cgst / 100))-(parseFloat(this.props.apr))).toFixed(2)) }
        {/* {parseFloat(this.props.apr).toFixed(2)} */}
        </h3>
     </td>
   </tr>
   {/* --------------------------------Net amount paid---------------------------------------------- */}
   <tr>
     <td>
     <h3 className="snopi srwidth "></h3>
        </td>
     <td>
     <h3 className="freightch snopi"><b>Net payment amount</b></h3>
     
        </td>
        <td >
     <h3 className="snopi wraptext"></h3>
     </td>
     <td className="">
     <h3 className="snopi wraptext"></h3>
     </td>
     <td>
     <h3 className="snopi wraptext rpu"></h3>
     </td>
     <td>
    
     <h3 className="snopi wraptext">  {(((parseFloat(this.props.finalamt) + parseFloat(this.props.deliverycharge)+parseFloat(this.props.finalamt * this.props.sgst / 100) 
     +parseFloat(this.props.finalamt * this.props.cgst / 100))-(parseFloat(this.props.apr))).toFixed(2)) }</h3>
     </td>
   </tr>
   {/* ----------------------------------------Buyer GST number----------------------------------- */}
   <tr>
     <td>
     <h3 className="snopi srwidth "></h3>
        </td>
     <td style={{borderRight:"1px solid transparent"}}>
     <h3 className="freightch snopi"><b>Buyers GST No. {this.state.generatedBy.companyDetails?this.state.generatedBy.companyDetails.gstNo:"NA"}</b></h3>
     <h3 className="freightch snopi"><b>Company's GST No. 
       {this.state.artisanUser.companyDetails?
     this.state.artisanUser.companyDetails.gstNo!=null? this.state.artisanUser.companyDetails.gstNo:"NA":"NA"} </b></h3>
     {/* {console.log(this.state.artisanUser.companyDetails.gstNo)} */}
        </td>
        <td style={{borderRight:"1px solid transparent"}} >
     <h3 className="snopi wraptext"></h3>
     </td>
     <td style={{borderRight:"1px solid transparent"}}>
     <h3 className="snopi wraptext"></h3>
     </td>
     <td style={{borderRight:"1px solid transparent"}}>
     <h3 className="snopi wraptext rpu"></h3>
     </td>
     <td>
    
     <h3 className="snopi wraptext allamtIndtax"> (E.&O.E)</h3>
     </td>
   </tr>
   {/* ----------------------------end--------------------------- */}
   <tr>
     <td>
     <h3 className="snopi srwidth "></h3>
        </td>

        {this.state.paymentDetails?
        <>
         <td style={{borderRight:"1px solid transparent"}}>
     <h3 className="freightch snopi"><b>Account Details:</b></h3>
     <br/>
        <h3 className="freightch snopi"><b>{this.state.paymentDetails[0].bankName}</b></h3>
     
      <h3 className="freightch snopi"><b>Account No.</b> <span className="ACcnodet">
       {this.state.paymentDetails[0].accNo_UPI_Mobile ? this.state.paymentDetails[0].accNo_UPI_Mobile:"NA"}
          
          </span></h3>
      <h3 className="freightch snopi "><b>IFSC code:</b> <span className="ACcnodet">
      {this.state.paymentDetails[0]?
          <> {this.state.paymentDetails[0].ifsc}</>
        :
        "NA"}
          </span></h3>
      {/* <h3 className="freightch snopi"><b>HSN code:</b> <span className="hsncnodet">{this.state.previewPiOrder.hsn}</span></h3> */}


        </td>
        
        </>:<>
        <td style={{borderRight:"1px solid transparent"}}>
     <h3 className="freightch snopi"><b>Account Details:</b></h3>
     
     <h3 className="freightch snopi"><b>Bank:NA</b></h3>
     
      <h3 className="freightch snopi"><b>Account No.</b> <span className="ACcnodet">NA</span></h3>
      <h3 className="freightch snopi"><b>IFSC code:</b> <span className="ACcnodet">NA</span></h3>
      {/* <h3 className="freightch snopi"><b>HSN code:</b> <span className="hsncnodet">NA</span></h3> */}


        </td>
        </>}
     
        <td style={{borderRight:"1px solid transparent"}} >
     <p className="snopi wraptext"></p>
     </td>
     <td style={{borderRight:"1px solid transparent"}}>
     <h3 className="snopi wraptext"><b></b></h3>
     </td>
     <td style={{borderRight:"1px solid transparent"}}>
     <h3 className="snopi wraptext rpu"></h3>
     </td>
     <td>
     <h3 className="snopi wraptext"></h3>
     </td>
   </tr>
   {/* -----------------------------edd--------------------------------------- */}
   <tr>
     <td>
     <h3 className="snopi srwidth "></h3>
        </td>
     <td style={{borderRight:"1px solid transparent"}}>
     <h3 className="freightch snopi"><b>Expected Date of delivery:</b> <span className="edddate">{this.state.previewPiOrder.expectedDateOfDelivery}</span></h3>
        </td>
        <td style={{borderRight:"1px solid transparent"}} >
     <p className="snopi wraptext"></p>
     </td>
     <td style={{borderRight:"1px solid transparent"}}>
     <h3 className="snopi wraptext"><b></b></h3>
     </td>
     <td style={{borderRight:"1px solid transparent"}}>
     <h3 className="snopi wraptext rpu"></h3>
     </td>
     <td style={{borderRight:"1px solid transparent"}} className="allamtIndtax">
     {/* All amount in Indian Rupee (<i class="fa fa-inr" aria-hidden="true"></i>) */}
     </td>
   </tr>
 </table>
 
 </Row>
 </Row>

 <Row noGutters={true} className="">
     <Col className="col-xs-9 ">
     <span className="ACcnodet"><b className="Discheading">NOTE : </b>This invoice is computer generated.It does not require any signature</span>    
     </Col>

     {/* <Col className="col-xs-3 allamtInd">
         All amount in Indian Rupee (<i class="fa fa-inr" aria-hidden="true"></i>)
     </Col> */}
      <Col className="col-xs-3 allamtInd">
        Subject to <b>Cuttack</b> Jurisdiction
     </Col>
 </Row>
 </div>
 {this.props.taxInvoiceGenerated==true?
 ""
:
<Row noGutters={true}>
     <Col className="col-xs-12" style={{textAlign:"center",marginTop:"10px"}}>
 <span>
     <button className="gobacktoeditdetart" disabled={this.state.gobackButtonClick} 
      onClick={() => this.BacktoPreview()}>Go Back to edit details</button>
       <button disabled={this.state.gobackButtonClick} className="Raiseinvbtn"
       onClick={() => this.sendPI()}
       >
         <img src={logos.Iconpaymentinvoice} className="InvImg"/> Raise Tax Invoice</button>

</span>
     </Col>
 </Row>
}
 

   

</>
    :<></>}
</React.Fragment>
        )
    }
    
}
function mapStateToProps(state) {
    // debugger;
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(PreviewTaxInvoice);
export default connectedLoginPage;