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
import BPCarousel from './Buyers-Productcarousel';
class BuyersProductDetails extends Component {

    constructor(props){
      super(props);
      this.state = {
       
      }
     
      
    }
    render() {
        return (

           <React.Fragment>
              <NavbarComponent/>
              
             <Container>
<Row noGutters="true" id="#Top">
  <Col md={6} lg={6}sm={12} xs={12} style={{marginTop:"27px"}}>
    <BPCarousel/>
  </Col>
  <Col  md={6} lg={6}sm={12} xs={12} className="BPDCol2">
    <h1>Blue-Green Katan Silk-Banarasi</h1>
    <h1>Handloon Dupatta</h1>
  <p>Beautiful pure Katan silk dupatta in Blue-Green Dual color zari.
     Beautiful pure Katan silk dupatta in Blue-Green Dual color zari.</p>
   <Row noGutters="true">
     <Col sm={2}>  <img className="BPDAntaranlogo" src={logos.AntaranCodesignIcon}  alt="Card image cap"/></Col>
     <Col sm={10} className="BPDBrandname">Antaran Co-Design Collection</Col>
     <hr className="hrlineBPD "></hr>
   </Row>
   <Row noGutters="true" >
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
     <a href="#productdetail">See all product details</a>
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
     <div class="buttons" style={{border:"2px solid black"}}>
  <button class="bpdbutton -bg-white" style={{color:"black"}}>
    <span className="Addtowishlisttext">Add to wish list</span>
  <span><div class="love-icon">
  <input type="checkbox" id="like-toggle" />
  <label for="like-toggle" class="heart"> </label>
  <div class="lines">
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
  </div>
  <div class="ring"></div>
</div></span>  
  </button>

</div>

    

     </Col>
      </Row>

<Row noGutters="true">
  <Col xs={12} className="">
   <p style={{marginLeft:"15px", marginTop:"10px"}} id="productdetail">Product Code : PLOKIU998</p> 
  </Col>
</Row>
</Col>
</Row>


<Row noGutters="true">
  <Col sm={12}>
  <h2 className="Productdetailsh2" id="productdetail">Product Details</h2>
  <hr className="hrproductBPD "></hr>
  </Col>
</Row>


<Row noGutters="true" >
  <Col sm={12} className="BPDCol2">
  <h2 className="DescheadingBPD">Description</h2>
  <p>Beautiful pure Katan silk dupatta in Blue-Green Dual color zari.Beautiful pure Katan silk dupatta in Blue-Green Dual color zari.Beautiful pure Katan silk dupatta in Blue-Green Dual color zari.Beautiful pure Katan silk dupatta in Blue-Green Dual color zari.Beautiful pure Katan silk dupatta in Blue-Green Dual color zari.Beautiful pure Katan silk dupatta in Blue-Green Dual color zari.Beautiful pure Katan silk dupatta in Blue-Green Dual color zari.</p>
  <p>Beautiful pure Katan silk dupatta in Blue-Green Dual color zari.!!</p>
  </Col>
  <hr className="hrlineBPD "></hr>
</Row>

<Row noGutters="true">
  <h2 className="DescheadingBPD" style={{marginLeft:"10px" , fontFamily:"auto"}}>General Details</h2>
  <Col sm={4} >
    <h3 className="GeneralDetailsh3">Name of Product</h3>
    <p className="GeneralDetailsp">Peach Chanderi Kori silk saree</p>
  </Col>
  <Col sm={4}>
  <h3 className="GeneralDetailsh3">Product Category</h3>
    <p className="GeneralDetailsp">Handloom Saree</p>
  </Col>
  <Col sm={4}>
  <h3 className="GeneralDetailsh3">Region</h3>
    <p className="GeneralDetailsp" style={{color:"#23527c"}}>Maniabandhan, Odisha</p>
  </Col>
</Row>
<Row noGutters="true">
    <Col sm={4} >
    <h3 className="GeneralDetailsh3">Product Code</h3>
    <p className="GeneralDetailsp">PCKSNAG1090</p>
  </Col>
  <Col sm={4}>
  <h3 className="GeneralDetailsh3">Product Type</h3>
    <p className="GeneralDetailsp">Saree with Blouse</p>
  </Col>
  <Col sm={4}>
  <h3 className="GeneralDetailsh3">Artisan Brand</h3>
    <p className="GeneralDetailsp" style={{color:"#23527c"}}>Chidiya</p>
   
  </Col>
  <hr className="hrlineBPD "></hr>
</Row>
{/* -----------------Washcareinst--------------------- */}
<Row noGutters="true">
<h2 className="DescheadingBPD" style={{marginLeft:"10px" , fontFamily:"auto"}}>Wash and Care Instructions</h2>
          <Col sm={1}></Col>
            <Col sm={2} style={{textAlign:"center"}}>
            <img
                                         className="unselectedWareandCare"
                                         src={logos.washAndCare1}
                                       ></img>
                                       <p
                                         className="BDPWashcare"
                                       >
                                         Gentle Hand Wash with soft liquid
                                         detergent
                                       </p>
            </Col>
            <Col sm={2} style={{textAlign:"center"}}>
            <img
                                         className="unselectedWareandCare"
                                         src={logos.washAndCare2}
                                       ></img>
                                       <p
                                         className="BDPWashcare">
                                         Machine wash with cold water
                                       </p>
            </Col>
            <Col sm={2} style={{textAlign:"center"}}>
            <img
                                         className="unselectedWareandCare"
                                         src={logos.washAndCare3}
                                       ></img>
                                       <p
                                         className="BDPWashcare"
                                       >
                                         Do not bleach
                                       </p>
            </Col>
            <Col sm={2} style={{textAlign:"center"}}>
            <img
                                         className="unselectedWareandCare"
                                         src={logos.washAndCare4}
                                       ></img>
                                       <p
                                         className="BDPWashcare"
                                       >
                                         Machine wash with 40 Degree water level
                                       </p>
            </Col>
            <Col sm={2} style={{textAlign:"center"}}>
            <img
                                         className="unselectedWareandCare"
                                         src={logos.washAndCare5}
                                       ></img>
                                       <p
                                         className="BDPWashcare"
                                       >
                                         Dry Clean Only
                                       </p>
            </Col>
            <Col sm={1}></Col>
            </Row>  
{/* -------------------More saree--------------------------- */}

<Row noGutters={true}>
  <Col sm={12}>
    <h3 className="MoresareeBPD">More Sarees From Chidiya</h3>
  </Col>
</Row>
<Row noGutters={true}>
<Col xs={12} sm={4} md={2}>
<div className="card CardlayoutBDP">
                <div class="card-block">
                  <h4 class="card-title">Proud</h4>
                  <p class="card-text-BDP"> 
                  Maniabandhan
                 </p>
                </div>
                <img className="card-img-top" src={logos.Maniabandhan}  alt="Card image cap"/>
                <div class="effect-text">
                    <div class="effect-btn">
                      <h2>EXPLORE MORE</h2>
                      <a class="btn" href="/Artisianself/regions/ProductRegions?clusterid=clusterid"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
                    </div>
                  </div>
              </div>
              </Col> 
 {/* card2 */}
 <Col xs={12} sm={4} md={2}>
<div className="card CardlayoutBDP">
                <div class="card-block">
                  <h4 class="card-title">Proud</h4>
                  <p class="card-text-BDP"> 
                  Maniabandhan
                 </p>
                </div>
                <img className="card-img-top" src={logos.Maniabandhan}  alt="Card image cap"/>
                <div class="effect-text">
                    <div class="effect-btn">
                      <h2>EXPLORE MORE</h2>
                      <a class="btn" href="/Artisianself/regions/ProductRegions?clusterid=clusterid"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
                    </div>
                  </div>
              </div>
              </Col>
              {/* card3 */}
              <Col xs={12} sm={4} md={2}>
<div className="card CardlayoutBDP">
                <div class="card-block">
                  <h4 class="card-title">Proud</h4>
                  <p class="card-text-BDP"> 
                  Maniabandhan
                 </p>
                </div>
                <img className="card-img-top" src={logos.Maniabandhan}  alt="Card image cap"/>
                <div class="effect-text">
                    <div class="effect-btn">
                      <h2>EXPLORE MORE</h2>
                      <a class="btn" href="/Artisianself/regions/ProductRegions?clusterid=clusterid"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
                    </div>
                  </div>
              </div>
              </Col>
               {/* card4 */}
               <Col xs={12} sm={4} md={2}>
<div className="card CardlayoutBDP">
                <div class="card-block">
                  <h4 class="card-title">Proud</h4>
                  <p class="card-text-BDP"> 
                  Maniabandhan
                 </p>
                </div>
                <img className="card-img-top" src={logos.Maniabandhan}  alt="Card image cap"/>
                <div class="effect-text">
                    <div class="effect-btn">
                      <h2>EXPLORE MORE</h2>
                      <a class="btn" href="/Artisianself/regions/ProductRegions?clusterid=clusterid"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
                    </div>
                  </div>
              </div>
              </Col>
               {/* card5 */}
               <Col xs={12} sm={4} md={2}>
<div className="card CardlayoutBDP">
                <div class="card-block">
                  <h4 class="card-title">Proud</h4>
                  <p class="card-text-BDP"> 
                  Maniabandhan
                 </p>
                </div>
                <img className="card-img-top" src={logos.Maniabandhan}  alt="Card image cap"/>
                <div class="effect-text">
                    <div class="effect-btn">
                      <h2>EXPLORE MORE</h2>
                      <a class="btn" href="/Artisianself/regions/ProductRegions?clusterid=clusterid"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
                    </div>
                  </div>
              </div>
              </Col>
               {/* card3 */}
               <Col xs={12} sm={4} md={2}>
<div className="card CardlayoutBDP">
                <div class="card-block">
                  <h4 class="card-title">Proud</h4>
                  <p class="card-text-BDP"> 
                  Maniabandhan
                 </p>
                </div>
                <img className="card-img-top" src={logos.Maniabandhan}  alt="Card image cap"/>
                <div class="effect-text">
                    <div class="effect-btn">
                      <h2>EXPLORE MORE</h2>
                      <a class="btn" href="/Artisianself/regions/ProductRegions?clusterid=clusterid"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
                    </div>
                  </div>
              </div>
              </Col>
</Row>

                        
<Row noGutters="true">
  <Col xs={12}  className="backtotopbdp">
  <a href="#Top">Go back to Top <i class="fa fa-angle-up fa-lg" aria-hidden="true"></i></a>
  <hr className="hrlineBPD "></hr>
  </Col>
  
</Row>
</Container>
           </React.Fragment>)
    }
}

export default BuyersProductDetails;