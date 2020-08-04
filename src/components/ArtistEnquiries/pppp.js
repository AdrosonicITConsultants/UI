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
          enquiryCode:this.props.enquiryCode,
          previewPI:[],
          previewPiOrder:[],
          buyerCustomProduct:[],
          paymentDetails:[],
          artisanUser:[],
          companyDetails:[]
        };
      }
 
    BacktoPreview(){
    this.props.bp();
    }

    componentDidMount() {
        TTCEapi.previewPI(this.state.enquiryId).then((response)=>{
            if(response.data.valid)
            {
                console.log(response.data.data);
                this.setState({dataload : true,
                previewPI:response.data.data,
                previewPiOrder:response.data.data.piOrder,
                buyerCustomProduct:response.data.data.buyerCustomProduct,
                paymentDetails:response.data.data.paymentDetails,
                artisanUser:response.data.data.artisanUser,
                companyDetails:response.data.data.artisanUser.companyDetails,
                // addressses:response.data.data.artisanUser.addressses 
            })
            }
            console.log(this.state.addressses);
        })
      }
    
    
    
    render(){
        return(
            
<React.Fragment>
{this.state.dataload == true 
                  
                  ? 
                  <> 
    {/* <Container> */}

    {/* <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      </Pdf> */}
{/* --------------------------------------Invoice---------------------------------------------------------- */}
<div >
    <Row noGutters={true}>
        <Col className="col-xs-12" >
        
        <button className="Raiseinvbtn raisePI" style={{float:"right",width:"215px"}}><img src={logos.Iconpaymentinvoice} className="InvImg"/> Raise PI</button></Col>
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
    <Col className="col-xs-12"> Invoice Number : 00
</Col>
</Row>

{/* --------------------------------------------------col 6-6-------------------------------------------------- */}
<Row noGutters={true} className="Invoicemb" >
    <Col sm={6} className=" col-xs-6 Invoicebr">
   <b className="origintxt">Origin</b>
   <Row noGutters={true}>
       <Col sm={4} className=" col-xs-5">
           {/* <img src={TTCEapi.ImageUrl +
                        "User/" +
                        user.id +
                        "/ProfilePics/" +
                        user.profilePic} className="Pilogoimg"></img> */}
       </Col>
       <Col sm={8} className=" col-xs-7 ">
          <b className="Ttbrand">Chidiya</b> 
           <p className="subttbrand"> {this.state.artisanUser.cluster?
           this.state.artisanUser.cluster.desc:
           "NA"
           }</p>
          <p className="subttbrand">  
         
          {/* {this.state.addressses[0].line1} */}
            {/* {this.state.artisanUser.addressses[0].line2 != "" ? ", " + this.state.artisanUser.addressses[0].line2: ""}
            {this.state.artisanUser.addressses[0].street != "" ? ", " + this.state.artisanUser.addressses[0].street : ""}
             {this.state.artisanUser.addressses[0].city != "" ? ", " + this.state.artisanUser.addressses[0].city : ""}
            {this.state.artisanUser.addressses[0].pincode != "" ? ", " + this.state.artisanUser.addressses[0].pincode : ""}
             {this.state.artisanUser.addressses[0].state != "" ? ", " + this.state.artisanUser.addressses[0].state : ""} */}
            
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
           <img src={logos.Smile} className="Pilogoimg"></img>
       </Col>
       <Col sm={8} className=" col-xs-7 ">
          <b className="Ttbrand">Chidiya & b</b> 
          <br/>
          <b className="RAcss subttbrand">Registered Address:</b>
          <p className="subttbrand">address</p>
          {/* <p className="subttbrand">address</p> */}
           <p className="subttbrand fontplay"> Bikesh Singh</p>
          
       </Col>
   </Row>
   <Row noGutters={true}>
       <Col sm={12} >
           <b className="Mobnumpi">Mobile Number : 8888888888</b>
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
     <h3 className="snopi srwidth margintopsr">01</h3>
        </td>
     <td className="tdmarginleft">
    <h3 className="snopi gdwidth wraptext" style={{textAlign:"left"}}>{this.state.buyerCustomProduct.productCategory.productDesc} -{this.state.buyerCustomProduct.length}</h3>
     <p>- {this.state.buyerCustomProduct.weftDye.dyeDesc } X  {this.state.buyerCustomProduct.warpDye.dyeDesc } {this.state.buyerCustomProduct.extraWeftDye?"X":"" } {this.state.buyerCustomProduct.extraWeftDye?this.state.buyerCustomProduct.extraWeftDye:"" }</p>
            <div className="descyarnpi wraptext">
                -Yarn: {this.state.buyerCustomProduct.weftYarn.yarnDesc} X {this.state.buyerCustomProduct.warpYarn.yarnDesc} {this.state.buyerCustomProduct.extraWeftYarn?"X" : ""} {this.state.buyerCustomProduct.extraWeftYarn?this.state.buyerCustomProduct.extraWeftYarn : ""} <br/> 
                -Yarn Count: {this.state.buyerCustomProduct.weftYarnCount} X {this.state.buyerCustomProduct.warpYarnCount} {this.state.buyerCustomProduct.extraWeftYarnCount ? "X":""} {this.state.buyerCustomProduct.extraWeftYarnCount ? this.state.buyerCustomProduct.extraWeftYarnCount:""} <br/>
                -Dye Used: {this.state.buyerCustomProduct.weftDye.dyeDesc} X  {this.state.buyerCustomProduct.warpDye.dyeDesc} {this.state.buyerCustomProduct.extraWeftDye?"X":""} {this.state.buyerCustomProduct.extraWeftDye? this.state.buyerCustomProduct.extraWeftDye:""} 
            </div>
        <p className="RAcss">- Reed Count : <span className="rcred wraptext">{this.state.buyerCustomProduct.reedCount?this.state.buyerCustomProduct.reedCount.count:"NA"}</span></p>
     <p>-Weight :</p>
     <div className="sbred wraptext">
     {this.state.buyerCustomProduct.productCategory.productDesc}: {this.state.buyerCustomProduct.weight?this.state.buyerCustomProduct.weight:"NA"} <br/>
         Blouse: XYZ
     </div>
     <p>-Dimension :</p>
     <div className="sbred wraptext">
     {this.state.buyerCustomProduct.productCategory.productDesc}: XYZ <br/>
         Blouse: XYZ
     </div>
     <p>-GSM Value : <span className="rcred">{this.state.buyerCustomProduct.productCategory.productDesc} {this.state.buyerCustomProduct.gsm}</span></p>
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
     <h3 className="snopi wraptext">{this.state.previewPiOrder.sgst}</h3>
     <h3 className="snopi wraptext">{this.state.previewPiOrder.cgst}</h3>
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
     <h3 className="snopi wraptext">  {this.state.previewPiOrder.totalAmount}</h3>
     </td>
   </tr>
   {/* --------------------------------total tr end---------------------------------------------- */}
   <tr>
     <td>
     <h3 className="snopi srwidth "></h3>
        </td>
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
      <h3 className="freightch snopi"><b>HSN code:</b> <span className="hsncnodet">{this.state.previewPiOrder.hsn}</span></h3>


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
 <button className="Raiseinvbtn"><img src={logos.Iconpaymentinvoice} className="InvImg"/> Raise PI</button></span>
 {/* <p className="btncol  belowprevtext">  Please Note: The pro forma invoice will be updated</p> */}
     </Col>
 </Row>
{/* -------------------------------------------------------------------------- */}

{/* </Container> */}
{/* <Footer/> */}
</> :<></>}
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