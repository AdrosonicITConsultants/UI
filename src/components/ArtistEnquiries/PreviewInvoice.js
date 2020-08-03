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
          buyerCustomProduct:[]
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
                this.setState({previewPI:response.data.data,
                previewPiOrder:response.data.data.piOrder,
                buyerCustomProduct:response.data.data.buyerCustomProduct})
            }
            console.log(this.state.previewPiOrder.date);
        })
      }
    
    
    
    render(){
        return(
            
<React.Fragment>
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
           <img src={logos.Smile} className="Pilogoimg"></img>
       </Col>
       <Col sm={8} className=" col-xs-7 ">
          <b className="Ttbrand">Chidiya</b> 
           <p className="subttbrand"> Maniabandhan,Orissa</p>
          <p className="subttbrand">address</p>
           <p className="subttbrand fontplay"> Bikesh Singh</p>
          
       </Col>
   </Row>
   <Row noGutters={true}>
       <Col sm={12} >
           <b className="Mobnumpi">Mobile Number : 8888888888</b>
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
     <p className="snopi wraptext">55558577</p>
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
     <h3 className="snopi wraptext">14</h3>
     <h3 className="snopi wraptext">14</h3>
     </td>
     <td >
     <p className="snopi wraptext">14</p>
     </td>
     <td>
     <h3 className="snopi wraptextrpu">2700</h3>
     <h3 className="snopi wraptext rpu">2700</h3>
     </td>
     <td>
     <h3 className="snopi wraptext">5555577</h3>
     <h3 className="snopi wraptext">5555577</h3>
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
     <h3 className="freightch snopi"><b>Axis Bank Ltd.</b></h3>
     
      <h3 className="freightch snopi"><b>Account No.</b> <span className="ACcnodet">555555555</span></h3>
      <h3 className="freightch snopi"><b>IFSC code:</b> <span className="ACcnodet">555555555</span></h3>
      <h3 className="freightch snopi"><b>HSN code:</b> <span className="hsncnodet">555555555</span></h3>


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