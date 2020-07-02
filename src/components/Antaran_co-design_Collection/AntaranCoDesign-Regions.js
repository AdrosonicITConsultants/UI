import React, { Component } from 'react';
import { Row, Col , Container, Button , Card,CardTitle,CardBody} from 'reactstrap';
import logos from "../../assets";
import '../navbar/navbar.css';
import NavbarComponent from "../navbar/navbar";
import { connect } from "react-redux";
import * as Actions from "../../redux/action/action";
import './AntaranCoDesign.css';
import TTCEapi from '../../services/API/TTCEapi';
import Footer from "../footer/footer";

export default class AntaranCoDesignRegion extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
      cluster : [],
      value : false,
                                         
     
    };
    
  }
  componentDidMount(){
   
     TTCEapi.getClusters().then((response)=>{
      this.setState({cluster : response.data.data},()=>{
          console.log(this.state.cluster);
     
          // console.log(this.props.user);
      });
  });
  }
    render() {
        return (
         
           <Container>
                <Row noGutters="true">
                {/* Card1 */}
             
             {this.state.cluster ? ( ( this.state.cluster.map((data) => (
              <Col xs={12} sm={6} md={4}>
                <div className="card Cardlayout">
                <div class="card-block">
                  <h4 class="card-title">Proud</h4>
                  <p class="card-text"> 
                  {data.desc}
                 </p>
                </div>
                <img className="card-img-top" src={logos.Maniabandhan}  alt="Card image cap"/>
                <div class="effect-text">
                    <div class="effect-btn">
                      <h2>EXPLORE MORE</h2>
                      <a class="btn" href="#"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
                    </div>
                  </div>
              </div>
              </Col>
              ) ) 
            )): null
            }
                
              </Row>
            
  
    {/* <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
      <div className="card Cardlayout">
      <div class="card-block">
        <h4 class="card-title">Sober</h4>
        <p class="card-text">Gopalpur</p>
      </div>
      <img className="card-img-top" src={logos.Gopalpur}  alt="Card image cap"/>
       <div class="effect-text">
          <div class="effect-btn">
            <h2>EXPLORE MORE</h2>
            <a class="btn" href="#"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
          </div>
        </div>
    </div>
    </div>
  
  <div class="col-xs-12  col-sm-4 col-md-4 col-lg-4">
      <div className="card Cardlayout">
      <div class="card-block">
        <h4 class="card-title">Colorful</h4>
        <p class="card-text">Venkatagiri</p>
      </div>
      <img className="card-img-top" src={logos.Vengtikari}  alt="Card image cap"/>
       <div class="effect-text">
          <div class="effect-btn">
            <h2>EXPLORE MORE</h2>
            <a class="btn" href="#"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
          </div>
        </div>
    </div>
    </div>
</div>  


<div class="row rowmargintop">
  
    <div class="col-xs-12  col-sm-4 col-md-4 col-lg-4">
      <div className="card Cardlayout">
      <div class="card-block">
        <h4 class="card-title">Calm</h4>
        <p class="card-text">Kamrup</p>
      </div>
      <img className="card-img-top" src={logos.Kamrup}  alt="Card image cap"/>
       <div class="effect-text">
          <div class="effect-btn">
            <h2>EXPLORE MORE</h2>
            <a class="btn" href="#"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
          </div>
        </div>
    </div>
    </div>
 
    <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
      <div className="card Cardlayout">
      <div class="card-block">
        <h4 class="card-title">Cultural</h4>
        <p class="card-text">Nalbari</p>
      </div>
      <img className="card-img-top" src={logos.Nalbari}  alt="Card image cap"/>
       <div class="effect-text">
          <div class="effect-btn">
            <h2>EXPLORE MORE</h2>
            <a class="btn" href="#"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
          </div>
        </div>
    </div>
    </div>
 
  <div class="col-xs-12  col-sm-4 col-md-4 col-lg-4">
      <div className="card Cardlayout">
      <div class="card-block">
        <h4 class="card-title">Musical</h4>
        <p class="card-text">Dimapur</p>
      </div>
      <img className="card-img-top" src={logos.Dimapur}  alt="Card image cap"/>
       <div class="effect-text">
          <div class="effect-btn">
            <h2>EXPLORE MORE</h2>
            <a class="btn" href="#"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
          </div>
        </div>
    </div>
    </div> */}
    
   

{/* Row3 */}
<Row noGutters="true" >
    <Col sm={{size:"5"}}>
    {/* <hr className="hrlineasd "></hr> */}
    </Col>
    <Col sm={{size:"2"}} className="asdseemore">
        {/* See More */}
    </Col>
    <Col sm={{size:"5"}}>
    {/* <hr className="hrlineasd "></hr> */}
     </Col>
</Row>
 
</Container> 

 )
    }
}