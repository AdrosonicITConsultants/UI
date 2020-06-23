import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Button} from 'reactstrap';
import '../navbar/navbar.css';
import NavbarComponent from "../navbar/navbar";
import { connect } from "react-redux";
import * as Actions from "../../redux/action/action";
import './ArtisanselfDesign.css';
import Footer from "../footer/footer";
import { memoryHistory, browserHistory } from "../../helpers/history";
class ArtistSelfDesignCategories extends Component {
    render() {
        return (
           
           <Container>
  <div class="row">
      {/* Card1 */}
    <div class="col-xs-12  col-sm-4 col-md-4 col-lg-4">
      <div className="card Cardlayout">
      <div class="card-block">
        <p class="card-text">Stole</p>
      </div>
      <img className="card-img-top" src={logos.stole}  alt="Card image cap"/>
    </div>
    </div>
  {/* Card2 */}
    <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
      <div className="card Cardlayout">
      <div class="card-block">
        <p class="card-text">Saree</p>
      </div>
      <img className="card-img-top" src={logos.saree}  alt="Card image cap"/>
    </div>
    </div>
  {/* Card3 */}
  <div class="col-xs-12  col-sm-4 col-md-4 col-lg-4">
      <div className="card Cardlayout">
      <div class="card-block">
        <p class="card-text">Dupatta</p>
      </div>
      <img className="card-img-top" src={logos.dupatta}  alt="Card image cap"/>
    </div>
    </div>
</div>

{/* --------------Row 2------------------ */}
<div class="row rowmargintop">
      {/* Card1 */}
    <div class="col-xs-12  col-sm-4 col-md-4 col-lg-4">
      <div className="card Cardlayout">
      <div class="card-block">
        <p class="card-text">Home Accessories</p>
      </div>
      <img className="card-img-top" src={logos.homeacc}  alt="Card image cap"/>
    </div>
    </div>
  {/* Card2 */}
    <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
      <div className="card Cardlayout">
      <div class="card-block">
        <p class="card-text">Fashion Accessories</p>
      </div>
      <img className="card-img-top" src={logos.Fashionacc}  alt="Card image cap"/>
    </div>
    </div>
  {/* Card3 */}
  <div class="col-xs-12  col-sm-4 col-md-4 col-lg-4">
      <div className="card Cardlayout">
      <div class="card-block">
        <p class="card-text">Fabric</p>
      </div>
      <img className="card-img-top" src={logos.Fabric}  alt="Card image cap"/>
    </div>
    </div>
    
   
</div>
{/* Row3 */}
<Row noGutters="true" >
    <Col sm={{size:"5"}}>
    <hr className="hrlineasd "></hr>
    </Col>
    <Col sm={{size:"2"}} className="asdseemore">
        See More
    </Col>
    <Col sm={{size:"5"}}>
    <hr className="hrlineasd "></hr> </Col>
</Row>
</Container> 
 )
    }
}

    export default ArtistSelfDesignCategories;