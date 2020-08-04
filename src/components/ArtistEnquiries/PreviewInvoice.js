import React, { Component } from 'react'
import ReactDOM from "react-dom";
import ReactToPdf from "react-to-pdf";
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import "./PreviewInvoice.css";
import queryString from 'query-string';
import TTCEapi from '../../services/API/TTCEapi';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import moment from 'moment';
import Footer from '../footer/footer';

export class PreviewInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
          enquiryId:this.props.enquiryId,
          dataload : false,
          enquiryCode:this.props.enquiryCode,
          expectedDateOfDelivery:this.props.expectedDateOfDelivery,
          cgst:this.props.cgst,
          hsn:this.props.hsn,
          ppu:this.props.ppu,
          quantity:this.props.quantity,
          sgst:this.props.sgst,
          previewPI:[],
          previewPiOrder:[],
          buyerCustomProduct:[],
          paymentDetails:[],
          artisanUser:[],
          addressses:[],
          generatedBy:[],
          productCategory:[],
          companyDetails:[],
         
        };
      }
    
 
    BacktoPreview(){
    this.props.bp();
    }

    componentDidMount() {
        TTCEapi.previewPI(this.state.enquiryId).then((response)=>{
            if(response.data.valid)
            {
                console.log("ffffind")
                console.log(response.data.data);
                
                    this.setState({
                    
                        previewPI:response.data.data,
                        buyerDetails: response.data.data.generatedBy,
                        previewPiOrder:response.data.data.piOrder,
                        buyerCustomProduct:response.data.data.buyerCustomProduct,
                        paymentDetails:response.data.data.paymentDetails,
                        artisanUser:response.data.data.artisanUser,
                        generatedBy:response.data.data.generatedBy,
                        // productCategory:response.data.data.buyerCustomProduct.productCategory,
                        // companyDetails:response.data.data.artisanUser.companyDetails,
                        dataload : true,
        
                    })
            
            
            }
            // console.log(this.state.buyerCustomProduct.weftYarn.yarnDesc);
        })
      }
    
      sendPI(){
        
       
        TTCEapi.sendPI(
            this.state.enquiryId,
            this.state.cgst,
            this.state.expectedDateOfDelivery ,
            this.state.hsn,
            this.state.ppu,
            this.state.quantity,
            this.state.sgst
           
          
           ).then((response)=>{
               console.log(response);
               if(response.data.valid){
            this.setState({sendPI : response.data,
              },()=>{
            console.log(this.state.sendPI);
           
            });
            customToast.success("PI Details send successfully", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true,
              });
          }  });
      
    } 
    
    
    render(){
        return(
            
<React.Fragment>
    {this.state.dataload?<>
   
    {/* <Container> */}

    {/* <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      </Pdf> */}
{/* --------------------------------------Invoice---------------------------------------------------------- */}
<div >
    <Row noGutters={true}>
        <Col className="col-xs-12" >
        
        <button   onClick={() => this.sendPI()} className="Raiseinvbtn raisePI" style={{float:"right",width:"215px"}}
        
        ><img src={logos.Iconpaymentinvoice} className="InvImg"/> Raise PI</button></Col>
    </Row>
   <Row noGutters={true}>
       <Col className="col-xs-12">
       <p className="  belowprevtext" style={{textAlign:"center"}}>  Below preview of invoice will be available for buyer</p>
</Col>

   </Row>
<Row className="MainPIRow " >
{/* -----------------------------------------text------------------------------------- */}

{/* -----------------------------------------text------------------------------------- */}
<Row noGutters={true} className="Invoicemb" >
    <Col className="col-xs-12"> Invoice Number : {this.state.previewPiOrder.id}
</Col>
</Row>

{/* --------------------------------------------------col 6-6-------------------------------------------------- */}
<Row noGutters={true} className="Invoicemb" >
    <Col sm={6} className=" col-xs-6 Invoicebr" style={{height:"auto"}}>
   <b className="origintxt">Origin</b>
   <Row noGutters={true}>
       <Col sm={4} className=" col-xs-5">
       {this.state.artisanUser.companyDetails.logo?
                      <img className="Pilogoimg" src={TTCEapi.ImageUrl+'User/'+this.state.artisanUser.id+'/CompanyDetails/Logo/'+this.state.artisanUser.companyDetails.logo}/>
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

    <Col sm={6} className=" col-xs-6  ">
   <b className="origintxt">Buyer</b>
   <Row noGutters={true}>
       <Col sm={4} className=" col-xs-5">

     
           {/* <img src={logos.Smile} className="Pilogoimg"></img> */}
           {this.state.generatedBy.companyDetails.logo?
            <img className="Pilogoimg" src={TTCEapi.ImageUrl+'User/'+this.state.generatedBy.id+'/CompanyDetails/Logo/'+this.state.generatedBy.companyDetails.logo}/>
                    :
                    <img src={logos.Smile} className="Pilogoimg"></img>
           }
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
          {/* <p className="subttbrand">address</p> */}
          <p className="subttbrand fontplay"> {this.state.generatedBy.firstName?
           this.state.generatedBy.firstName:
           "NA"
           }  {this.state.generatedBy.lastName?
            this.state.generatedBy.lastName:
            "NA"
            }</p>
            {/* {this.state.generatedBy.alternateMobile} */}
          
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
    <td className="enqidanddatecolwidth">
    <p className="PaymentTerm">Enquiry Id</p> 
       <p className="againstpi">{this.state.enquiryCode}</p>
    </td>
    <td className="enqidanddatecolwidth">
    <p className="PaymentTerm">Date: {this.state.previewPiOrder.date}</p> 
       <p className="againstpi" style={{color:"rgb(138 43 226 / 73%);"}}>ORDER No. {this.state.previewPiOrder.id}</p>
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
     <h3 className="snopi srwidth ">01</h3>
        </td>
        
        
{/* <td  className="tdmarginleft">
<h3 className="snopi gdwidth wraptext" style={{textAlign:"left"}}>
{this.state.buyerCustomProduct.productType?this.state.buyerCustomProduct.productType.productDesc:""} -{this.state.buyerCustomProduct.length} </h3>
    <p>-{this.state.buyerCustomProduct.weftDye.dyeDesc } X  {this.state.buyerCustomProduct.warpDye.dyeDesc } {this.state.buyerCustomProduct.extraWeftYarn?"X" : ""} 
     {this.state.buyerCustomProduct.extraWeftYarn?this.state.buyerCustomProduct.extraWeftYarn : ""}
     </p>
     

     {this.state.buyerCustomProduct.length >0 ?
      <div className="descyarnpi wraptext">
      -Yarn: {this.state.buyerCustomProduct.weftYarn.yarnDesc} X {this.state.buyerCustomProduct.warpYarn.yarnDesc} {this.state.buyerCustomProduct.extraWeftYarn?"X" : ""} {this.state.buyerCustomProduct.extraWeftYarn?this.state.buyerCustomProduct.extraWeftYarn : ""} <br/> 
      -Yarn Count: {this.state.buyerCustomProduct.weftYarnCount} X {this.state.buyerCustomProduct.warpYarnCount} {this.state.buyerCustomProduct.extraWeftYarnCount ? "X":""} {this.state.buyerCustomProduct.extraWeftYarnCount ? this.state.buyerCustomProduct.extraWeftYarnCount:""} <br/>
      -Dye Used: {this.state.buyerCustomProduct.weftDye.dyeDesc} X  {this.state.buyerCustomProduct.warpDye.dyeDesc} {this.state.buyerCustomProduct.extraWeftDye?"X":""} {this.state.buyerCustomProduct.extraWeftDye? this.state.buyerCustomProduct.extraWeftDye:""} 
  </div>
  :
  ""
     }

    <p className="RAcss">- Reed Count : <span className="rcred wraptext">{this.state.buyerCustomProduct.reedCount?this.state.buyerCustomProduct.reedCount.count:"NA"}</span></p>
     <p>-Weight :</p> 
     <div className="sbred wraptext">
     {this.state.buyerCustomProduct.productCategory.productDesc}: {this.state.buyerCustomProduct.weight?this.state.buyerCustomProduct.weight:"NA"} <br/>
     {this.state.buyerCustomProduct.relProduct.length>0 ?
     <>
    {this.state.buyerCustomProduct.relProduct[0].productType.productDesc}: {this.state.buyerCustomProduct.weight?this.state.buyerCustomProduct.weight:"NA"}

     </>:""}
     </div>
     <p>-GSM Value : <span className="rcred">{this.state.buyerCustomProduct.productCategory.productDesc} {this.state.buyerCustomProduct.gsm}</span></p>

</td> */}



<td className="tdmarginleft">
     <h3 className="snopi gdwidth wraptext" style={{textAlign:"left"}}>Red katan -400m</h3>
     <p>- WEFT X WARP X EXTRA WEFT</p>
            <div className="descyarnpi wraptext">
                -Yarn: XYZ XYZ x XYZ <br/>
                -Yarn Count: XYZ XYZ x XYZ <br/>
                -Dye Used: XYZ XYZ x XYZ 
            </div>
     <p className="RAcss">- Reed Count : <span className="rcred wraptext">XYZ</span></p>
     <p>-Weight :</p>
     <div className="sbred wraptext">
         Saree: XYZ <br/>
         Blouse: XYZ
     </div>
     <p>-Dimension :</p>
     <div className="sbred wraptext">
         Saree: XYZ <br/>
         Blouse: XYZ
     </div>
     <p>-GSM Value : <span className="rcred">Saree XYZ</span></p>
        </td>




        <td >
     <p className="snopi wraptext">{this.state.previewPiOrder.hsn}</p>
     </td>
     <td >
     <p className="snopi wraptext">{this.state.previewPiOrder.quantity}</p>
     </td>
     <td>
     <p className="snopi rpu wraptext">{this.state.previewPiOrder.ppu}</p>
     </td>
     <td>
     <p className="snopi wraptext">{this.state.previewPiOrder.totalAmount}</p>
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
<h3 className="snopi wraptext">{this.state.previewPiOrder.totalAmount * this.state.previewPiOrder.sgst / 100}</h3>
     <h3 className="snopi wraptext">{this.state.previewPiOrder.totalAmount * this.state.previewPiOrder.cgst / 100}</h3>
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
     <h3 className="snopi wraptext">  {this.state.previewPiOrder.totalAmount +(this.state.previewPiOrder.totalAmount * this.state.previewPiOrder.sgst / 100) 
     +(this.state.previewPiOrder.totalAmount * this.state.previewPiOrder.cgst / 100) }</h3>
     </td>
   </tr>
   {/* --------------------------------total tr end---------------------------------------------- */}
   <tr>
     <td>
     <h3 className="snopi srwidth "></h3>
        </td>

        {this.state.paymentDetails>0?
        <>
         <td>
     <h3 className="freightch snopi"><b>Account Details:</b></h3>
     <br/>
        <h3 className="freightch snopi"><b>{this.state.paymentDetails[0].bankName}</b></h3>
     
      <h3 className="freightch snopi"><b>Account No.</b> <span className="ACcnodet">
       {this.state.paymentDetails[0].accNo_UPI_Mobile ? this.state.paymentDetails[0].accNo_UPI_Mobile:"NA"}
          
          </span></h3>
      <h3 className="freightch snopi"><b>IFSC code:</b> <span className="ACcnodet">
      {this.state.paymentDetails[0]?
          <> {this.state.paymentDetails[0].ifsc}</>
        :
        "NA"}
          </span></h3>
      {/* <h3 className="freightch snopi"><b>HSN code:</b> <span className="hsncnodet">{this.state.previewPiOrder.hsn}</span></h3> */}


        </td>
        
        </>:<>
        <td>
     <h3 className="freightch snopi"><b>Account Details:</b></h3>
     <br/>
     <h3 className="freightch snopi"><b>Axis Bank Ltd.</b></h3>
     
      <h3 className="freightch snopi"><b>Account No.</b> <span className="ACcnodet">NA</span></h3>
      <h3 className="freightch snopi"><b>IFSC code:</b> <span className="ACcnodet">NA</span></h3>
      {/* <h3 className="freightch snopi"><b>HSN code:</b> <span className="hsncnodet">NA</span></h3> */}


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
         All amount in Indian Rupee (<i class="fa fa-inr" aria-hidden="true"></i>)
     </Col>
 </Row>
 </div>
 {/* ------------------------------buttons------------------------------- */}
 <Row noGutters={true} className="margintoppdisc">
     <Col className="col-xs-12 btncol">
<span><button className="gobacktoeditdetart"  onClick={() => this.BacktoPreview()}>Go Back to edit details</button> 
 <button className="Raiseinvbtn"onClick={() => this.sendPI()}><img src={logos.Iconpaymentinvoice} className="InvImg"/> Raise PI</button></span>
 {/* <p className="btncol  belowprevtext">  Please Note: The pro forma invoice will be updated</p> */}
     </Col>
 </Row>
{/* -------------------------------------------------------------------------- */}

{/* </Container> */}
{/* <Footer/> */}
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

const connectedLoginPage = connect(mapStateToProps)(PreviewInvoice);
export default connectedLoginPage;