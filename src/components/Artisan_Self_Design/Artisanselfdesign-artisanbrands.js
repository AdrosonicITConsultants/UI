import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Button} from 'reactstrap';
import '../navbar/navbar.css';
import NavbarComponent from "../navbar/navbar";
import { connect } from "react-redux";
import * as Actions from "../../redux/action/action";
import './ArtisanselfDesign.css';
import Footer from "../footer/footer";

 class ArtistSelfDesignBrands extends Component {
      constructor(props){
      super(props);
      this.state = {
        clicked : false
      }
    }
  
    imageClick = () => {
      console.log('Click');
      this.setState({
        clicked: true
      })
    }       
  
    render () {
      return (
        <React.Fragment>
          <Row noGutters="true">
            <Col sm={{size:"12"}}>
            <select  className="SelectCategory" >
    <option value="1" selected disabled>All Cluster</option>
<option value="2" >Maniabandhan</option>
    <option value="3">Gopalpur</option>
    <option value="4">Kamrup</option>
    <option value="5">Nalbari</option>
  </select>
  
  
  </Col>
          </Row>
        {/* Row 1 */}
           <div class="row">
      {/* Card1 */}
    <div class="col-xs-12  col-sm-4 col-md-4 col-lg-4">
      <div className="card Cardlayout">
      <div class="card-block">
        <p class="card-text">Boat</p>
      </div>
      <img className="card-img-top-brand" src={logos.Boat}  alt="Card image cap"/>
      <div class="effect-text">
          <div class="effect-btn">
            <h2>EXPLORE MORE</h2>
            <a class="btn" href="#"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
          </div>
        </div>
    </div>
    </div>
  {/* Card2 */}
    <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
      <div className="card Cardlayout">
      <div class="card-block">
        <p class="card-text">Rose</p>
      </div>
      <img className="card-img-top-brand" src={logos.Flower}  alt="Card image cap"/>
      <div class="effect-text">
          <div class="effect-btn">
            <h2>EXPLORE MORE</h2>
            <a class="btn" href="#"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
          </div>
        </div>
    </div>
    </div>
  {/* Card3 */}
  <div class="col-xs-12  col-sm-4 col-md-4 col-lg-4">
      <div className="card Cardlayout">
      <div class="card-block">
        <p class="card-text">Sun</p>
      </div>
      <img className="card-img-top-brand" src={logos.Sun}  alt="Card image cap"/>
      <div class="effect-text">
          <div class="effect-btn">
            <h2>EXPLORE MORE</h2>
            <a class="btn" href="#"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
          </div>
        </div>
    </div>
    </div>
    </div>
    {/* Row 2 */}
    <div class="row rowmargintop">
          {/* Card1 */}
        <div class="col-xs-12  col-sm-4 col-md-4 col-lg-4 mt-5">
          <div className="card Cardlayout">
          <div class="card-block">
            <p class="card-text">Smile</p>
          </div>
          <img className="card-img-top-brand" src={logos.Smile}  alt="Card image cap"/>
          <div class="effect-text">
          <div class="effect-btn">
            <h2>EXPLORE MORE</h2>
            <a class="btn" href="#"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
          </div>
        </div>
        </div>
        </div>
      {/* Card2 */}
        <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
          <div className="card Cardlayout">
          <div class="card-block">
            <p class="card-text">Sunshine</p>
          </div>
          <img className="card-img-top-brand" src={logos.Sun2}  alt="Card image cap"/>
          <div class="effect-text">
          <div class="effect-btn">
            <h2>EXPLORE MORE</h2>
            <a class="btn" href="#"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
          </div>
        </div>
        </div>
        </div>
      {/* Card3 */}
      <div class="col-xs-12  col-sm-4 col-md-4 col-lg-4">
          <div className="card Cardlayout">
          <div class="card-block">
            <p class="card-text">Panda</p>
          </div>
          <img className="card-img-top-brand" src={logos.Panda}  alt="Card image cap"/>
          <div class="effect-text">
          <div class="effect-btn">
            <h2>EXPLORE MORE</h2>
            <a class="btn" href="#"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
          </div>
        </div>
        </div>
        </div>
        </div>
    
    {/* load more */}
    {
          this.state.clicked &&
        
          <div class="row rowmargintop" >
          {/* Card1 */}
        <div class="col-xs-12  col-sm-4 col-md-4 col-lg-4 ">
          <div className="card Cardlayout">
          <div class="card-block">
            <p class="card-text">Sun</p>
          </div>
          <img className="card-img-top-brand" src={logos.Sun}  alt="Card image cap"/>
          <div class="effect-text">
          <div class="effect-btn">
            <h2>EXPLORE MORE</h2>
            <a class="btn" href="#"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
          </div>
        </div>
        </div>
        </div>
      {/* Card2 */}
        <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
          <div className="card Cardlayout">
          <div class="card-block">
            <p class="card-text">Panda</p>
          </div>
          <img className="card-img-top-brand" src={logos.Panda}  alt="Card image cap"/>
          <div class="effect-text">
          <div class="effect-btn">
            <h2>EXPLORE MORE</h2>
            <a class="btn" href="#"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
          </div>
        </div>
        </div>
        </div>
      {/* Card3 */}
      <div class="col-xs-12  col-sm-4 col-md-4 col-lg-4">
          <div className="card Cardlayout">
          <div class="card-block">
            <p class="card-text">Boat</p>
          </div>
          <img className="card-img-top-brand" src={logos.Boat}  alt="Card image cap"/>
          <div class="effect-text">
          <div class="effect-btn">
            <h2>EXPLORE MORE</h2>
            <a class="btn" href="#"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
          </div>
        </div>
        </div>
        </div>
        </div>
        }

        <Row noGutters="true" >
    <Col sm={{size:"5"}}>
    <hr className="hrlineasd "></hr>
    </Col>
    <Col sm={{size:"2"}} className="asdseemore">
    <input type="button" onClick={this.imageClick} value="See More" style={{"border":"none"}}></input>
    </Col>
    <Col sm={{size:"5"}}>
    <hr className="hrlineasd "></hr> </Col>
</Row>
        </React.Fragment>
      );
    }
  
  
  
    }
export default ArtistSelfDesignBrands;