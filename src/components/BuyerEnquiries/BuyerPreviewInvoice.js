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
        }
        
    } 
 
    componentDidMount() { 
        console.log(this.state.enquiryCode);

        TTCEapi.getBuyerPreviewPI(this.state.enquiryCode).then((response)=>{
            if(response.data.valid)
            {
                if(response.data.data.productCustom === false) {
                    this.setState({
                        previewPI:response.data.data,
                        previewPiOrder:response.data.data.piOrder,
                        paymentDetails:response.data.data.paymentDetails,
                        artisanUser:response.data.data.artisanUser,
                        addressses:response.data.data.artisanUser.addressses, 
                        buyerDetails: response.data.data.generatedBy,
                        product: response.data.data.product,
                        dataload : true,
                    })
                }
                else {
                    this.setState({
                        previewPI:response.data.data,
                        previewPiOrder:response.data.data.piOrder,
                        paymentDetails:response.data.data.paymentDetails,
                        artisanUser:response.data.data.artisanUser,
                        addressses:response.data.data.artisanUser.addressses, 
                        buyerDetails: response.data.data.generatedBy,
                        product: response.data.data.buyerCustomProduct,
                        dataload : true,
                    })
                }
                
            }

            console.log(response.data.data);
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
        browserHistory.push("/payadvance")
    }
    
    render(){
        return(
            
<React.Fragment>
    {/* <Container> */}

    {/* <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      </Pdf> */}
{/* --------------------------------------Invoice---------------------------------------------------------- */}

{this.state.dataload === true && this.state.previewPiOrder.isSend === 1 ?
<div  ref={ref}  style={{width: "100%", height: "100%"}} >
   <Row noGutters={true} style={{marginTop:"15px"}}>
       <Col className="col-xs-6">
       <p className="  belowprevtext">  Received at :  {this.state.time} on  { this.state.currentDate }</p>
</Col>
<Col className="col-xs-6" >
<ReactToPdf targetRef={ref} filename="code-example.pdf"  options={options} x={.5} y={.5} scale={0.8}>
{({ toPdf }) => 
<p className=" belowprevtext" style={{float:"right"}} onClick={toPdf}><img src={logos.downloadpdficon} className="InvImg" /> Download this invoice in pdf</p>
}
      </ReactToPdf>
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
    <Col sm={6} className=" col-xs-6 Invoicebr">
   <b className="origintxt">Origin</b>
   <Row noGutters={true}>
       <Col sm={4} className=" col-xs-5">
           {this.state.artisanUser.companyDetails.logo ? 
           <img src={TTCEapi.ImageUrl+'User/'+this.state.artisanUser.id+'/CompanyDetails/Logo/'+this.state.artisanUser.companyDetails.logo} className="Pilogoimg"></img>
           :  <img className="Pilogoimg" src={logos.Smile} /> }
       </Col>
       <Col sm={8} className=" col-xs-7 ">
<b className="Ttbrand">{this.state.artisanUser.companyDetails.companyName}</b> 
           <p className="subttbrand">{this.state.artisanUser.cluster?
           this.state.artisanUser.cluster.desc: "NA"}</p>
<p className="subttbrand">{this.state.addressses[0].line1} {this.state.addressses[0].line2}
{this.state.addressses[0].street} {this.state.addressses[0].city} {this.state.addressses[0].pincode}
{this.state.addressses[0].state} {this.state.addressses[0].country.name}</p>
<p className="subttbrand fontplay">{this.state.artisanUser.firstName} {this.state.artisanUser.lastName}</p>
          
       </Col>
   </Row>
   <Row noGutters={true}>
       <Col sm={12} >
<b className="Mobnumpi">Mobile Number : {this.state.artisanUser.mobile ? this.state.artisanUser.mobile : 
this.state.artisanUser.alternateMobile ? this.state.artisanUser.alternateMobile : "NA"}</b>
       </Col>
   </Row>
    </Col>

    <Col sm={6} className=" col-xs-6  ">
   <b className="origintxt">Buyer</b>
   <Row noGutters={true}>
       <Col sm={4} className=" col-xs-5">
       {this.state.buyerDetails.companyDetails.logo ? 
           <img src={TTCEapi.ImageUrl+'User/'+this.state.buyerDetails.id+'/CompanyDetails/Logo/'+this.state.buyerDetails.companyDetails.logo} className="Pilogoimg"></img>
           :  <img className="Pilogoimg" src={logos.Smile} /> }
       </Col>
       <Col sm={8} className=" col-xs-7 ">
          <b className="Ttbrand">{this.state.buyerDetails.companyDetails.companyName}</b> 
          <br/>
          <b className="RAcss subttbrand">Registered Address:</b>
<p className="subttbrand">
    {this.state.buyerDetails.addressses[0].line1} {this.state.buyerDetails.addressses[0].line2} {this.state.buyerDetails.addressses[0].street} {this.state.buyerDetails.addressses[0].pincode} {this.state.buyerDetails.addressses[0].state}  {this.state.buyerDetails.addressses[0].country.name}
</p>
          {/* <p className="subttbrand">address</p> */}
           <p className="subttbrand fontplay">{this.state.buyerDetails.firstName} {this.state.buyerDetails.lastName}</p>
          
       </Col>
   </Row>
   <Row noGutters={true}>
       <Col sm={12} >
           <b className="Mobnumpi">Mobile Number : {this.state.buyerDetails.mobile ? this.state.buyerDetails.mobile : 
this.state.buyerDetails.alternateMobile ? this.state.buyerDetails.alternateMobile : "NA"}</b>
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
           <p id="amountId" className="snopi wraptext">{this.state.previewPiOrder.totalAmount}</p>
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
     <h3 id="sgstId" className="snopi wraptext">{this.state.previewPiOrder.totalAmount * this.state.previewPiOrder.sgst / 100}</h3>
     <h3 id="cgstId" className="snopi wraptext">{this.state.previewPiOrder.totalAmount * this.state.previewPiOrder.cgst / 100}</h3>
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
     <h3 className="snopi wraptext">  
      {/* <i class="fa fa-inr" aria-hidden="true"></i>  */}
           {this.state.previewPiOrder.totalAmount + (this.state.previewPiOrder.totalAmount * this.state.previewPiOrder.sgst / 100) + 
           (this.state.previewPiOrder.totalAmount * this.state.previewPiOrder.cgst / 100)}</h3>
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
     
      <h3 className="freightch snopi"><b>Account No.</b> <span className="ACcnodet">{this.state.paymentDetails[0].accNo_UPI_Mobile}</span></h3>
      <h3 className="freightch snopi"><b>IFSC code:</b> <span className="ACcnodet">{this.state.paymentDetails[0].ifsc}</span></h3>
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

     <Col className="col-xs-3 allamtInd" style={{fontSize:"13px"}}>
         All amount in Indian Rupee (<i class="fa fa-inr" aria-hidden="true"></i>)
     </Col>
 </Row>
 </div>
 : null }
 {/* ------------------------------buttons------------------------------- */}
 <Row noGutters={true} className="margintoppdisc">
     <Col className="col-xs-12 btncol">
<span><button className="gobacktoeditdet"><img src={logos.chatwhite} className="InvImg"/>Go to chat</button> 
 <button className="Raiseinvbtn"onClick={() => this.proceedtoadvancepay()}> Proceed to advance payment <i class="fa fa-long-arrow-right MarginLeft10" aria-hidden="true"></i></button></span>
 <p className="btncol  belowprevtext">  Please Note: The pro forma invoice will be updated</p>
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

const connectedLoginPage = connect(mapStateToProps)(BuyerPreviewInvoice);
export default connectedLoginPage;