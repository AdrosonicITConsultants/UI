import React, { Component } from 'react';
import { Row, Col , Container, Button , Card,CardTitle,CardBody} from 'reactstrap';
import logos from "../../assets";
import '../navbar/navbar.css';
import NavbarComponent from "../navbar/navbar";
import { connect } from "react-redux";
import * as Actions from "../../redux/action/action";
import './ArtisanselfDesign.css';
import Footer from "../footer/footer";

export default class ArtistSelfdesignRegions extends Component {
    render() {
        return (
         
           <Container>
  <div class="row">
      {/* Card1 */}
    <div class="col-xs-12  col-sm-4 col-md-4 col-lg-4">
      <div className="card Cardlayout">
      <div class="card-block">
        <h4 class="card-title">Proud</h4>
        <p class="card-text">Maniabandhan</p>
      </div>
      <img className="card-img-top" src={logos.Maniabandhan}  alt="Card image cap"/>
    </div>
    </div>
  {/* Card2 */}
    <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
      <div className="card Cardlayout">
      <div class="card-block">
        <h4 class="card-title">Sober</h4>
        <p class="card-text">Gopalpur</p>
      </div>
      <img className="card-img-top" src={logos.Gopalpur}  alt="Card image cap"/>
    </div>
    </div>
  {/* Card3 */}
  <div class="col-xs-12  col-sm-4 col-md-4 col-lg-4">
      <div className="card Cardlayout">
      <div class="card-block">
        <h4 class="card-title">Colorful</h4>
        <p class="card-text">Venkatagiri</p>
      </div>
      <img className="card-img-top" src={logos.Vengtikari}  alt="Card image cap"/>
    </div>
    </div>
</div>

{/* --------------Row 2------------------ */}
<div class="row rowmargintop">
      {/* Card1 */}
    <div class="col-xs-12  col-sm-4 col-md-4 col-lg-4">
      <div className="card Cardlayout">
      <div class="card-block">
        <h4 class="card-title">Calm</h4>
        <p class="card-text">Kamrup</p>
      </div>
      <img className="card-img-top" src={logos.Kamrup}  alt="Card image cap"/>
    </div>
    </div>
  {/* Card2 */}
    <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
      <div className="card Cardlayout">
      <div class="card-block">
        <h4 class="card-title">Cultural</h4>
        <p class="card-text">Nalbari</p>
      </div>
      <img className="card-img-top" src={logos.Nalbari}  alt="Card image cap"/>
    </div>
    </div>
  {/* Card3 */}
  <div class="col-xs-12  col-sm-4 col-md-4 col-lg-4">
      <div className="card Cardlayout">
      <div class="card-block">
        <h4 class="card-title">Musical</h4>
        <p class="card-text">Dimapur</p>
      </div>
      <img className="card-img-top" src={logos.Dimapur}  alt="Card image cap"/>
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

