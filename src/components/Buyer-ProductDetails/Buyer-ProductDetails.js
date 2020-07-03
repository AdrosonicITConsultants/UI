import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Button} from 'reactstrap';
import '../navbar/navbar.css';
import NavbarComponent from "../navbar/navbar";
import { connect } from "react-redux";
import TTCEapi from '../../services/API/TTCEapi';
import * as Actions from "../../redux/action/action";
import './Buyer-ProductDetails.css';
import Footer from "../footer/footer";
import { memoryHistory, browserHistory } from "../../helpers/history";
class BuyersProductDetails extends Component {
    render() {
        return (

           <React.Fragment>
              <NavbarComponent/>
             <Container>
<Row noGutters="true">
  <Col sm={6}>a</Col>
  <Col sm={6} className="BPDCol2">
    <h1>Blue-Green Katan Silk-Banarasi</h1>
    <h1>Handloon Dupatta</h1>
  <p>Beautiful pure Katan silk dupatta in Blue-Green Dual color zari.
     Beautiful pure Katan silk dupatta in Blue-Green Dual color zari.</p>
   <Row noGutters="true">
     <Col sm={2}>  <img className="BPDAntaranlogo" src={logos.AntaranCodesignIcon}  alt="Card image cap"/></Col>
     <Col sm={10} className="BPDBrandname">Antaran Co-Design Collection</Col>
     <hr className="hrlineBPD "></hr>
   </Row>
   <Row noGutters="true">
      <Col sm={12} className="BPDartisianame">
        Artisan Brand : <span className="brandcolor">Chidiya</span>
      </Col>
    </Row>
    <Row noGutters="true">
      <Col sm={3} className="BPDartisianame">
      <img className="BPDAntaranlogo2" src={logos.Smile}  alt="Card image cap"/>
      </Col>
      <hr className="hrlineBPD "></hr>
    </Row>
    <Row noGutters="true">
     <Col sm={12} className="BDPdetailscol">
     <p >Region of origin :<span> Manibandhan, Odisha</span></p>
     <p>Material Used :<span> Cotton, Silk, Mulbary</span></p>
     <p>Product Category :<span> Handloom Dupatta</span></p>
     <p>Weight :<span> 100g</span></p>
     </Col>
     <p className="BPDSeemorelink">
     <a href="">See More Products</a>
     <hr className="hrlineBPD "></hr>
     </p>
   
   </Row>
   <Row noGutters="true">
     <Col sm={12} className="BPDStockstatus">
    Available <b>In Stock</b>
     </Col>
      </Row>

      <Row noGutters="true">
     <Col sm={6} >
     <div class="buttons">
  <button class="bpdbutton -bg-yellow">
    <span>Generate Enquiry</span>
        <div class="arrowPacman">
      <div class="arrowPacman-clip">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.10081 0L5.88245 1.23617L10.7016 6.12576H0V7.87423H10.7016L5.88245 12.7638L7.10081 14L14 7L7.10081 0Z" fill="white"/>
        </svg>
        
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.10081 0L5.88245 1.23617L10.7016 6.12576H0V7.87423H10.7016L5.88245 12.7638L7.10081 14L14 7L7.10081 0Z" fill="white"/>
        </svg>
      </div>
    </div>
  </button>

</div>

     </Col>
     <Col sm={6} >
 <button className="BPDwishlist"><b className="Addtowishlisttext">Add to wishlist</b><input id="toggle-heart" type="checkbox"/>
<label for="toggle-heart" aria-label="like">❤</label></button>
     </Col>
      </Row>

<Row noGutters="true">
  <Col xs={12} className="">
   <p style={{marginLeft:"15px", marginTop:"10px"}}>Product Code : PLOKIU998</p> 
  </Col>
</Row>







</Col>
</Row>

</Container>
           </React.Fragment>)
    }
}

export default BuyersProductDetails;