import React, { Component } from 'react'
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
import Moment from 'react-moment';


export class PreviewInvoice extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            

        }
        

    } 
    render(){
        return(
            
<React.Fragment>
    <Container>
<Row className="MainPIRow margintopInv" >
<Col sm={12}>
<Row noGutters={true} className="Invoicemb" >
 Invoice Number : 00
</Row>
{/* --------------------------------------------------col 6-6-------------------------------------------------- */}
<Row noGutters={true} className="Invoicemb" >
    <Col sm={6} className=" col-xs-6 Invoicebr">
   <b className="origintxt">Origin</b>
   <Row noGutters={true}>
       <Col sm={4} className=" col-xs-4">
           <img src={logos.Smile} className="Pilogoimg"></img>
       </Col>
       <Col sm={8} className=" col-xs-8 ">
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

    <Col sm={6} className=" col-xs-6 Invoicebr ">
   <b className="origintxt">Buyer</b>
   <Row noGutters={true}>
       <Col sm={4} className=" col-xs-4">
           <img src={logos.Smile} className="Pilogoimg"></img>
       </Col>
       <Col sm={8} className=" col-xs-8 ">
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
    <td><p className="thirtyperadv">30%</p> 
       <p className="advpaidamt">Advance paid of Total amount</p>
       </td>
    <td className="tdwidth">
    <p className="PaymentTerm">Delivery Terms</p>
    <p className="yetpaysts">Yet to be dispatched after payment of final amount</p>
    </td>
    <td>
    <p className="PaymentTerm">Enquiry Id</p> 
       <p className="againstpi">AD-567-77-888</p>
    </td>
    <td>
    <p className="PaymentTerm">Date: 19.2.2020</p> 
       <p className="againstpi" style={{color:"rgb(138 43 226 / 73%);"}}>ORDER No. 66666666666</p>
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
     <td className="">
     <h3 className="snopi">Quantity</h3>
     </td>
     <td>
     <h3 className="snopi rpu">Rate/per unit</h3>
     </td>
     <td>
     <h3 className="snopi">Amount</h3>
     </td>
   </tr>
    {/* ------------------------------------- */}
   <tr> 
     <td>
     <h3 className="snopi srwidth">01</h3>
        </td>
     <td className="tdmarginleft">
     <h3 className="snopi gdwidth" style={{textAlign:"left"}}>Red katan -400m</h3>
     <p>- WEFT X WARP X EXTRA WEFT</p>
            <div className="descyarnpi">
                -Yarn: XYZ XYZ x XYZ <br/>
                -Yarn Count: XYZ XYZ x XYZ <br/>
                -Dye Used: XYZ XYZ x XYZ 
            </div>
     <p className="RAcss">- Reed Count : <span className="rcred">XYZ</span></p>
     <p>-Weight :</p>
     <div className="sbred">
         Saree: XYZ <br/>
         Blouse: XYZ
     </div>
     <p>-Dimension :</p>
     <div className="sbred">
         Saree: XYZ <br/>
         Blouse: XYZ
     </div>
     <p>-GSM Value : <span className="rcred">Saree XYZ</span></p>
        </td>
     <td >
     <h3 className="snopi">14</h3>
     </td>
     <td>
     <h3 className="snopi rpu">2700</h3>
     </td>
     <td>
     <h3 className="snopi">5555577</h3>
     </td>
   </tr>
   {/* --------------------------------------------- */}
   <tr> 
     <td>
     
        </td>
     <td>
     <h3 className="snopi gdwidth" style={{textAlign:"left",marginLeft:"25px"}}>Freight Charges <span>(if any)</span></h3>
     <p style={{textAlign:"left",marginLeft:"25px"}}><span>SCGT</span><b> @ 123</b></p>
     <p style={{textAlign:"left",marginLeft:"25px"}}><span>CGST</span><b> @ 123</b></p>
        </td>
     <td >
     <h3 className="snopi">14</h3>
     </td>
     <td>
     <h3 className="snopi rpu">2700</h3>
     </td>
     <td>
     <h3 className="snopi">5555577</h3>
     </td>
   </tr>
 </table>
 
 </Row>

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

const connectedLoginPage = connect(mapStateToProps)(PreviewInvoice);
export default connectedLoginPage;