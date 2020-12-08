/* global jsPDF */
/* global html2canvas */
/* global $ */
import React, { Component } from 'react'
import ReactDOM from "react-dom";
import ReactToPdf from "react-to-pdf";
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
// import "./PreviewInvoice.css";
import queryString from 'query-string';
import TTCEapi from '../../services/API/TTCEapi';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import moment from 'moment';
import Footer from '../footer/footer';
// import jsPDF from 'jsPDF';

const ref = React.createRef();
const options = {
    orientation: 'landscape',
    unit: 'in',
    format: [1500,1000]
};

export class BuyerPreviewInvoice extends Component {
    constructor(props) {
        super(props);
        var today = new Date(),
         date = today.getDate()+ '.'+ (today.getMonth() + 1) + '.' + today.getFullYear() ;

        this.state = {
            time: '',
            dataload: false,
            currentDate: date,
            enquiryCode: this.props.enquiryCode,
            enquiryId: this.props.enquiryId,
            previewPI:[],
            previewPiOrder:[],
            buyerCustomProduct:[],
            paymentDetails:[],
            artisanUser:[],
            addressses:[],
            buyerDetails:[],
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
            availableInStock:0,
            history:false,
            customhistory:false,
            productCategories:[],
            yarns:[],
            reedCounts:[],
            dyes:[]
        }
        // this.backPI = this.backPI.bind(this);
        
    } 
 
    componentDidMount() { 
      
        TTCEapi.getProductUploadData().then((response)=>{
          if(response.data.valid)
          {
              this.setState({productCategories: response.data.data.productCategories,
                  yarns: response.data.data.yarns ,dyes : response.data.data.dyes ,reedCounts : response.data.data.reedCounts},()=>{
                   
        TTCEapi.getBuyerPreviewPI(this.state.enquiryCode).then((response)=>{
            if(response.data.valid)
            {
               
              if(response.data.data.productHistory != null)
                        { 
                          this.setState({history:true});
                         
                          
                        }
                        if(response.data.data.buyerCustomProductHistory != null)
                        { 
                          this.setState({customhistory:true});
                         
                          
                        }

                if(response.data.data.productCustom === false) {
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
                else {
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

        });
      });
      }
    });
        
        var date = moment()
          .utcOffset('+05:30')
          .format(' hh:mm A');
        this.setState({ time: date });
    }
      
    BacktoPreview(){
        this.props.bp();
    }

    proceedtoadvancepay(){
      localStorage.setItem("SelectPI", 1);
        browserHistory.push("/payadvance?code="+this.state.enquiryCode)
    }

    goToChatButton = (id) => {
      localStorage.setItem("goToChatButtonEnquiryId", id);    
      browserHistory.push("/buyerChat");            
    }

    downloadPdfFunction = () => {

      // html2canvas(document.getElementById("contentPDF")).then(function(canvas) {
      //     var img = canvas.toDataURL("image/png");
      //     // var img1 = canvas.toDataURL("image/jpg");
      //     var doc = new jsPDF();
      //     doc.addImage(img, 'JPEG' , 20,20); 
      //     // doc.addImage(img1, 'JPEG' , 20,20);
      //     var specialElementHandlers = { 
      //       '#editor': function (element, renderer) { 
      //           return true; 
      //       } 
      //     };
      //     doc.fromHTML(document.getElementById("contentPDF"), 15, 15, { 
      //       'width': 190, 
      //       'elementHandlers': specialElementHandlers 
      //     });
      //     doc.save("testDoc.pdf");
      // })

      var doc = new jsPDF('p', 'pt', 'tabloid'); 
      var source = $('#contentPDF')[0];
      var specialElementHandlers = { 
        '#bypassme': function (element, renderer) { 
            return true; 
        } 
      }
      var margins = {
        top: 50,
        left: 40,
        width: 1220
      }
      doc.fromHTML(
        source 
        , margins.left
        , margins.top
        , {
          'width': margins.width 
          , 'elementHandlers': specialElementHandlers
        },
        function (dispose) {
          doc.save('html2pdf.pdf');
        }); 

      }
    render(){
        return(
            
<React.Fragment>
   
{/* --------------------------------------Invoice---------------------------------------------------------- */}

{this.state.dataload === true && this.state.previewPiOrder.isSend === 1 ?
<>

<div style={{width: "100%", height: "100%"}} id="contentPDF">
   <Row noGutters={true} style={{marginTop:"15px"}}>
       <Col className="col-xs-6">
       <p className="  belowprevtext">  Received at :  {this.state.time} on  { this.state.currentDate }</p>
</Col>
<Col className="col-xs-6" >

</Col>
   </Row>
<Row className="MainPIRow " >
{/* -----------------------------------------text------------------------------------- */}

{/* -----------------------------------------text------------------------------------- */}
<Row noGutters={true} className="Invoicemb" >
    <Col className="col-xs-12"> Proforma Invoice 
</Col>
</Row>

{/* --------------------------------------------------col 6-6-------------------------------------------------- */}
<Row noGutters={true} className="Invoicemb" >
{this.state.artisanUser? 
<>
    <Col sm={6} className=" col-xs-6 Invoicebr">
   <b className="origintxt">Origin</b>
   <Row noGutters={true}>
       <Col sm={4} className=" col-xs-5">
       {this.state.artisanUser.companyDetails?
       this.state.artisanUser.companyDetails.logo !=null ?
        <img className="Pilogoimg" src={TTCEapi.ImageUrl+'User/'+this.state.artisanUser.id+'/CompanyDetails/Logo/'+this.state.artisanUser.companyDetails.logo}/>
        :
         <img  src={TTCEapi.ImageUrl+"User/" +this.state.artisanUser.id +"/ProfilePics/" +this.state.artisanUser.profilePic} className="Pilogoimg"></img>
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
           ""
           }  {this.state.artisanUser.lastName?
            this.state.artisanUser.lastName:
            ""
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
  </>  :""}

    
  <Col sm={6} className=" col-xs-6  ">
   <b className="origintxt">Buyer</b>
   <Row noGutters={true}>
       <Col sm={4} className=" col-xs-5">

     
        
       {this.state.buyerDetails.companyDetails ? 
       this.state.buyerDetails.companyDetails.logo?
           <img src={TTCEapi.ImageUrl+'User/'+this.state.buyerDetails.id+'/CompanyDetails/Logo/'+this.state.buyerDetails.companyDetails.logo} className="Pilogoimg"></img>
          :
          <img className="Pilogoimg" src={logos.Smile} />

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
           ""
           }  {this.state.generatedBy.lastName?
            this.state.generatedBy.lastName:
            ""
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
    <td><p className="yetdodecide">Yet to be decided</p> 
       <p className="advpaidamt">Advance paid of Total amount</p>
       </td>
    <td className="tdwidth">
    <p className="PaymentTerm">Delivery Terms</p>
    <p className="yetpaysts">Yet to be dispatched after payment of final amount</p>
    </td>
    <td>
    <p className="PaymentTerm">Enquiry Id</p> 
<p className="againstpi">{this.state.enquiryId}</p>
    </td>
    <td>
           <p className="PaymentTerm">Date: {this.state.previewPiOrder.date}</p> 
           <p className="againstpi" style={{color:"rgb(138 43 226 / 73%);"}}>ORDER No. {this.state.previewPiOrder.orderId?this.state.previewPiOrder.orderId:0}</p>
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
     <h3 className="snopi gdwidth">Goods Description</h3>
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
     <h3 className="snopi srwidth margintopsr">01</h3>
        </td>


     
{/* receipt */}

{this.state.previewPI.productCustom === false && this.state.dataload?
<>
{/* {("Product  Simple")} */}
<>

<td className="tdmarginleft">
  
     <h3 className="snopi gdwidth wraptext" style={{textAlign:"left"}}>
       {this.state.history ? 
       <>
       {this.state.previewPI.productHistory.tag}-{this.state.previewPI.productHistory.length}
       </>
       :
       <>
       {this.state.previewPI.product.tag} -{this.state.previewPI.product.length}
       </>
         } 
       </h3>
     <p>- WARP X WEFT X EXTRA WEFT</p>
     {this.state.history
     ?
    <>
     <p className="descyarnpi wraptext">
     -Yarn: {this.state.previewPI.productHistory.warpYarnId?this.state.yarns[this.state.previewPI.productHistory.warpYarnId-1].yarnDesc:""} x 
     {this.state.previewPI.productHistory.weftYarnId?this.state.yarns[this.state.previewPI.productHistory.weftYarnId-1].yarnDesc:""}
      {this.state.previewPI.extraWeftYarnId?"x" : ""} {this.state.extraWeftYarnId? this.state.yarns[this.state.previewPI.productHistory.extraWeftYarnId-1].yarnDesc: ""} <br/>
      -Yarn Count: {this.state.previewPI.productHistory?this.state.previewPI.productHistory.warpYarnCount:""} x
       {this.state.previewPI.productHistory?this.state.previewPI.productHistory.weftYarnCount:""}{this.state.previewPI.productHistory.extraWeftYarnCount ? "x":""} {this.state.previewPI.productHistory.extraWeftYarnCount ? this.state.previewPI.productHistory.extraWeftYarnCount:""} <br/>
      -Dye Used: {this.state.previewPI.productHistory.warpDyeId?this.state.dyes[this.state.previewPI.productHistory.warpDyeId-1].dyeDesc:""} x 
      {this.state.previewPI.productHistory.weftDyeId?this.state.dyes[this.state.previewPI.productHistory.weftDyeId-1].dyeDesc:""}
       {this.state.previewPI.extraWeftYarnId?"x" : ""} {this.state.extraWeftYarnId? this.state.dyes[this.state.previewPI.productHistory.extraWeftDyeId-1].dyeDesc: ""}

      </p>
    </>
    :
    <>
    <p className="descyarnpi wraptext">

-Yarn: {this.state.warpYarn?this.state.warpYarn.yarnDesc:""} x {this.state.weftYarn?this.state.weftYarn.yarnDesc:""} {this.state.extraWeftYarn?"x" : ""} {this.state.extraWeftYarn? this.state.extraWeftYarn.yarnDesc : ""} <br/>
-Yarn Count: {this.state.previewPI.product?this.state.previewPI.product.warpYarnCount:""} {this.state.previewPI.product?this.state.previewPI.product.weftYarnCount:""}
 {this.state.previewPI.product.extraWeftYarnCount ? "x":""} {this.state.previewPI.product.extraWeftYarnCount ? this.state.previewPI.product.extraWeftYarnCount:""} <br/>
-Dye Used: {this.state.warpDye.dyeDesc} 
{this.state.weftDye?this.state.weftDye.dyeDesc:""}
  {this.state.extraWeftDye?"x":""}
  {this.state.extraWeftDye?
    this.state.extraWeftDye.dyeDesc
  :""} 

</p>
    </>
    } 
    {this.state.history
      ?
      <>
      <p className="RAcss">- Reed Count : <span className="rcred wraptext">
        {this.state.reedCounts[this.state.previewPI.productHistory.reedCountId-1].count}</span></p>
     <p>-Weight :</p>
     <div className="sbred wraptext">
     {this.state.previewPI.productHistory.productCategoryDesc} : {this.state.previewPI.productHistory.weight?this.state.previewPI.productHistory.weight:"NA"} <br/>
        
        {/* {this.state.previewPI.productHistory.relProduct.length > 0?
        <>  {this.state.previewPI.product.relProduct[0].productType.productDesc}: {this.state.previewPI.product.relProduct[0].weight !=null?this.state.previewPI.product.relProduct[0].weight:"NA"}</>
          :

          ""} */}
       
     </div>
     <br/>
     <p>-Dimension :</p>
     <div className="sbred wraptext">
     {this.state.previewPI.productHistory.productCategoryDesc}: {this.state.previewPI.productHistory.length} 
     {this.state.previewPI.productHistory.width}
      <br/>
         {this.state.previewPI.productHistory.relProduct.length > 0?
        <>  {this.state.previewPI.relProductName[0]}: {this.state.previewPI.productHistory.relProduct[0].length} x {this.state.previewPI.productHistory.relProduct[0].width}
         </> :
          
          ""}
     </div>
         <p>-GSM Value : <span className="rcred"> {this.state.previewPI.productHistory.gsm? this.state.previewPI.productHistory.gsm:"NA"}</span></p>
        
      </>
      :
      <>
      <p className="RAcss">- Reed Count : <span className="rcred wraptext">
       {this.state.previewPI.product.reedCount?this.state.previewPI.product.reedCount.count:"NA"}</span></p>
     <p>-Weight :</p>
     <div className="sbred wraptext">
     {this.state.previewPI.product.productCategoryDesc}: {this.state.previewPI.product.weight?this.state.previewPI.product.weight:"NA"} <br/>
        
        {this.state.previewPI.product.relProduct.length > 0?
        <>  {this.state.previewPI.product.relProduct[0].productType.productDesc}: {this.state.previewPI.product.relProduct[0].weight !=null?this.state.previewPI.product.relProduct[0].weight:"NA"}</>
          :

          ""}
       
     </div>
     <br/>
     <p>-Dimension :</p>
     <div className="sbred wraptext">
     {this.state.previewPI.product.productCategoryDesc}: {this.state.previewPI.product.length?this.state.previewPI.product.length:""} 
     {this.state.previewPI.product.width?" x ":""}
     {this.state.previewPI.product.width?this.state.previewPI.product.width:""}
      <br/>
         {this.state.previewPI.product.relProduct.length > 0?
        <>  {this.state.previewPI.product.relProduct[0].productType.productDesc}: {this.state.previewPI.product.relProduct[0].length?this.state.previewPI.product.relProduct[0].length:""} 
        {this.state.previewPI.product.relProduct[0].length && this.state.previewPI.product.relProduct[0].width?"x":"" } {this.state.previewPI.product.relProduct[0].width?this.state.previewPI.product.relProduct[0].width:""}</>
          :
          
          ""}
     </div>
         <p>-GSM Value : <span className="rcred">{this.state.previewPI.product.productCategoryDesc} {this.state.previewPI.product.gsm? this.state.previewPI.product.gsm:""}</span></p>
        
      </>
    
    } </td>
</>

  
        </>
        :
        <>
        {/* {("Product  custom")} */}
        <td className="tdmarginleft">
     <h3 className="snopi gdwidth wraptext" style={{textAlign:"left"}}>Custom Product -{this.state.buyerCustomProduct.length}</h3>
     <p>- WARP X WEFT X EXTRA WEFT</p>  
     {this.state.customhistory
     ?
    <>
    <p className="descyarnpi wraptext">
     -Yarn: {this.state.previewPI.buyerCustomProductHistory.warpYarnId?this.state.yarns[this.state.previewPI.buyerCustomProductHistory.warpYarnId-1].yarnDesc:""} x
      {this.state.previewPI.buyerCustomProductHistory.weftYarnId?this.state.yarns[this.state.previewPI.buyerCustomProductHistory.weftYarnId-1].yarnDesc:""}
       {this.state.previewPI.buyerCustomProductHistory.extraWeftYarnId?"x" : ""} {this.state.previewPI.buyerCustomProductHistory.extraWeftYarnId? this.state.yarns[this.state.previewPI.buyerCustomProductHistory.extraWeftYarnId-1].yarnDesc: ""} <br/>
      -Yarn Count: {this.state.previewPI.buyerCustomProductHistory?this.state.previewPI.buyerCustomProductHistory.warpYarnCount:""} X {this.state.previewPI.buyerCustomProductHistory?this.state.previewPI.buyerCustomProductHistory.weftYarnCount:""}{this.state.previewPI.buyerCustomProductHistory.extraWeftYarnCount ? "x":""} {this.state.previewPI.buyerCustomProductHistory.extraWeftYarnCount ? this.state.previewPI.buyerCustomProductHistory.extraWeftYarnCount:""} <br/>
      -Dye Used: {this.state.previewPI.buyerCustomProductHistory.warpDyeId?this.state.dyes[this.state.previewPI.buyerCustomProductHistory.warpDyeId-1].dyeDesc:""} x
       {this.state.previewPI.buyerCustomProductHistory.weftDyeId?this.state.dyes[this.state.previewPI.buyerCustomProductHistory.weftDyeId-1].dyeDesc:""} 
       {this.state.previewPI.buyerCustomProductHistory.extraWeftYarnId?"x" : ""} {this.state.previewPI.buyerCustomProductHistory.extraWeftYarnId? this.state.dyes[this.state.previewPI.buyerCustomProductHistory.extraWeftDyeId-1].dyeDesc: ""}

      </p>
    </>
    :
    <>
    <p className="descyarnpi wraptext" >
    -Yarn: {this.state.customwarpYarn?this.state.customwarpYarn.yarnDesc:""} x {this.state.customweftYarn?this.state.customweftYarn.yarnDesc:""} {this.state.customextraWeftYarn?"x" : ""} {this.state.customextraWeftYarn? this.state.customextraWeftYarn.yarnDesc : ""} <br/>
    -Yarn Count: {this.state.buyerCustomProduct?this.state.buyerCustomProduct.warpYarnCount:""}
     {this.state.buyerCustomProduct.weftYarnCount && this.state.buyerCustomProduct.warpYarnCount ?"x":""} {this.state.buyerCustomProduct.weftYarnCount?this.state.buyerCustomProduct.weftYarnCount:""} {this.state.buyerCustomProduct.extraWeftYarnCount ? "x":""} {this.state.buyerCustomProduct.extraWeftYarnCount ? this.state.buyerCustomProduct.extraWeftYarnCount:""} <br/>
    -Dye Used: {this.state.customwarpDye?this.state.customwarpDye.dyeDesc:""}   {this.state.customweftDye?this.state.customweftDye.dyeDesc:""} {this.state.customextraWeftDye?"x":""}
     {this.state.customextraWeftDye?  this.state.customextraWeftDye.dyeDesc
     :
     this.state.customextraWeftDye?  this.state.customextraWeftDye:""
     } 

      </p> 
    </>
    }
    

     
     {this.state.customhistory
    ?
    <>
    <p className="RAcss">- Reed Count : <span className="rcred wraptext">
        {this.state.reedCounts[this.state.previewPI.buyerCustomProductHistory.reedCountId-1].count}</span></p>
     <p>-Weight : <div className="sbred wraptext">
       NA
     </div></p>
     
     <p>-Dimension :</p>
     <div className="sbred wraptext">
     {this.state.productCategories[this.state.previewPI.buyerCustomProductHistory.productTypeId-1].productDesc}: {this.state.previewPI.buyerCustomProductHistory.length} 
     {this.state.previewPI.buyerCustomProductHistory.width}
      <br/>
         {this.state.previewPI.buyerCustomProductHistory.relProduct.length > 0?
        <>  {this.state.previewPI.relProductName[0]}: {this.state.previewPI.buyerCustomProductHistory.relProduct[0].length} x {this.state.previewPI.buyerCustomProductHistory.relProduct[0].width}
         </> :
          
          ""}
     </div>
         <p>-GSM Value : <span className="rcred">{this.state.previewPI.buyerCustomProductHistory.productCategoryDesc} {this.state.previewPI.buyerCustomProductHistory.gsm? this.state.previewPI.buyerCustomProductHistory.gsm:"NA"}</span></p>
      
    </>
    :
    <>
    <p className="RAcss">- Reed Count : <span className="rcred wraptext">{this.state.buyerCustomProduct.reedCount?this.state.buyerCustomProduct.reedCount.count:"NA"}</span></p>
     <p>-Weight :</p>
     <div className="sbred wraptext">
     {this.state.buyerCustomProduct.productCategory.productDesc}: {this.state.buyerCustomProduct.weight?this.state.buyerCustomProduct.weight:"NA"} <br/>
        
     {this.state.buyerCustomProduct.relProduct.length > 0?
        <>  
        {this.state.buyerCustomProduct.relProduct[0].productType.productDesc}: {this.state.buyerCustomProduct.relProduct[0].weight !=null?this.state.buyerCustomProduct.relProduct[0].weight:"NA"}</>
          :

          ""}
     </div>
     <p>-Dimension :</p>
     <div className="sbred wraptext">
     {this.state.buyerCustomProduct.productCategory.productDesc}: XYZ <br/>
    
     {this.state.buyerCustomProduct.relProduct.length > 0?
        <>  {this.state.buyerCustomProduct.relProduct[0].productType.productDesc}: {this.state.buyerCustomProduct.relProduct[0].length?this.state.buyerCustomProduct.relProduct[0].length:""} 
        {this.state.buyerCustomProduct.relProduct[0].length && this.state.buyerCustomProduct.relProduct[0].width?"x":"" } {this.state.buyerCustomProduct.relProduct[0].width?this.state.buyerCustomProduct.relProduct[0].width:""}</>
          :
          
          ""}

     </div>
     <p>-GSM Value : <span className="rcred">{this.state.buyerCustomProduct.productCategory.productDesc} XYZ</span></p>
     
    </>
    }
       </td>
        </>
}





        <td >
     <p className="snopi wraptext">{this.state.previewPiOrder.hsn}</p>
     </td>
     <td >
     <p className="snopi wraptext">{this.state.previewPiOrder.quantity}</p>
     </td>
     <td>
     <p className="snopi rpu wraptext">₹ {this.state.previewPiOrder.ppu}</p>
     </td>
     <td>
     <p className="snopi wraptext">₹ {(this.state.previewPiOrder.totalAmount).toFixed(2)}</p>
     </td>
   </tr>
   {/* --------------------------------------------- */}
   <tr> 
     <td>
     
        </td>
        <td>
     <h3 className="snopi gdwidth freightch" >Freight Charges <span className="Cursivefont">(if any)</span></h3>
     <p style={{textAlign:"left",marginLeft:"25px"}} className="font10 wraptext"><span className="Cursivefont">SCGT</span><b > @ {this.state.previewPiOrder.sgst}</b></p>
     <p style={{textAlign:"left",marginLeft:"25px"}} className="font10 wraptext"><span className="Cursivefont">CGST</span><b> @ {this.state.previewPiOrder.cgst}</b></p>
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
<h3 className="snopi wraptext">{(this.state.previewPiOrder.totalAmount * this.state.previewPiOrder.sgst / 100).toFixed(2)}</h3>
     <h3 className="snopi wraptext">{(this.state.previewPiOrder.totalAmount * this.state.previewPiOrder.cgst / 100).toFixed(2)}</h3>
     </td>
   </tr>
   {/* -------------------------------------------total------------------------------------------ */}
    <tr>
     <td>
     <h3 className="snopi srwidth "></h3>
        </td>
     <td>
     <h3 className="freightch snopi"><b>Total</b></h3>
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
     <h3 className="snopi wraptext">  ₹
     {(this.state.previewPiOrder.totalAmount +(this.state.previewPiOrder.totalAmount * this.state.previewPiOrder.sgst / 100) 
     +(this.state.previewPiOrder.totalAmount * this.state.previewPiOrder.cgst / 100)).toFixed(2)}</h3>
     </td>
   </tr>
   {/* --------------------------------total tr end---------------------------------------------- */}
   <tr>
     <td>
     <h3 className="snopi srwidth "></h3>
        </td>

        {this.state.paymentDetails?
        <>
         <td>
     <h3 className="freightch snopi"><b>Account Details:</b></h3>
     <br/>
        <h3 className="freightch snopi"><b>{this.state.paymentDetails[0]?this.state.paymentDetails[0].bankName:""}</b></h3>
     
      <h3 className="freightch snopi"><b>Account No.</b> <span className="ACcnodet">
       {this.state.paymentDetails[0]? this.state.paymentDetails[0].accNo_UPI_Mobile:"NA"}
          
          </span></h3>
      <h3 className="freightch snopi"><b>IFSC code:</b> <span className="ACcnodet">
      {this.state.paymentDetails[0]?
          <> {this.state.paymentDetails[0].ifsc}</>
        :
        "NA"}
          </span></h3>
   

        </td>
        
        </>:<>
        <td>
     <h3 className="freightch snopi"><b>Account Details:</b></h3>
     
     <h3 className="freightch snopi"><b>Bank:NA</b></h3>
     
      <h3 className="freightch snopi"><b>Account No.</b> <span className="ACcnodet">NA</span></h3>
      <h3 className="freightch snopi"><b>IFSC code:</b> <span className="ACcnodet">NA</span></h3>
     
        </td>
        </>}
     
        <td >
     <p className="snopi wraptext"></p>
     </td>
     <td className="">
     <h3 className="snopi wraptext"><b></b></h3>
     </td>
     <td>
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
     <td>
     <h3 className="freightch snopi"><b>Expected Date of delivery:</b> <span className="edddate">{this.state.previewPiOrder.expectedDateOfDelivery}</span></h3>
        </td>
        <td >
     <p className="snopi wraptext"></p>
     </td>
     <td className="">
     <h3 className="snopi wraptext"><b></b></h3>
     </td>
     <td>
     <h3 className="snopi wraptext rpu"></h3>
     </td>
     <td>
     <h3 className="snopi wraptext"></h3>
     </td>
   </tr>
 </table>
 
 </Row>
 </Row>

 <Row noGutters={true} className="margintoppdisc">
     <Col className="col-xs-9 ">
     <span className="ACcnodet"><b className="Discheading">Disclaimer : </b>The price is excluding tax and delivery charges. These will be included in final invoice.</span>    
     </Col>

     <Col className="col-xs-3 allamtInd">
         All amount in Indian Rupee (₹)
     </Col>
 </Row>
 </div>

 {/* ------------------------------buttons------------------------------- */}
 <Row noGutters={true} className="margintoppdisc">
     <Col className="col-xs-12 btncol">
<span>
  {this.props.artisancompleted==1?
  "":
    <button className="gobacktoeditdet" onClick={() => this.goToChatButton(this.state.enquiryCode)}
    ><img src={logos.chatwhite} className="InvImg"/>Go to chat</button> 
  }
{this.state.previewPI.productCustom == false?
<>
{this.state.previewPI.product.productStatusId==2||this.props.completed==1 ?  
"":
 <button className="Raiseinvbtn"onClick={() => this.proceedtoadvancepay()}> Proceed to advance payment <i class="fas fa-arrow-right MarginLeft10" aria-hidden="true"></i></button>

}
</>
:
<>
{this.state.buyerCustomProduct.productStatusId==2||this.props.completed==1 ?
""
:
<button className="Raiseinvbtn"onClick={() => this.proceedtoadvancepay()}> Proceed to advance payment <i class="fas fa-arrow-right MarginLeft10" aria-hidden="true"></i></button>

}
</>
}




</span>

 <p className="btncol  belowprevtext">  Please Note: The pro forma invoice will be updated</p>
     </Col>
 </Row>
{/* -------------------------------------------------------------------------- */}


</>
: 
<Row>
<br></br>
<br></br>
 <br></br>   
<Col className="col-xs-12 text-center font14">
PI details are not received for this product
</Col>
 </Row>
}
</React.Fragment>
        )
    }
    
}
function mapStateToProps(state) {
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(BuyerPreviewInvoice);
export default connectedLoginPage;