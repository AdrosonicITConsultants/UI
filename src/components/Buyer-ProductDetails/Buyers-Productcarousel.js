import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Button} from 'reactstrap';
import '../navbar/navbar.css';
import NavbarComponent from "../navbar/navbar";
import { connect } from "react-redux";
import * as Actions from "../../redux/action/action";
import './BPcarousel.css';
import TTCEapi from '../../services/API/TTCEapi';
import Footer from "../footer/footer";

 class BPCarousel extends Component {
     
       
  
    render () {
      
      return (
        
        <React.Fragment>
            <div class="BPDcontainer" >
      
       

           <ul class="thumbnails">
    <li>
      <a href="#slide1"><img src={logos.Kamrup} /></a>
    </li>
    <li>
      <a href="#slide2"><img src={logos.Maniabandhan} /></a>
    </li>
    <li>
      <a href="#slide3"><img src={logos.Nalbari} /></a>
    </li>
    
  </ul> 
          
           <ul class="slides">
    <li id="slide1"><img src={logos.Kamrup}  alt="" />
			    <a className="next" href="#slide2"><i class="fa fa-angle-right fa-5x" aria-hidden="true" style={{padding:"11px",color:"silver",marginLeft:"-4px"}}></i></a></li>
    <li id="slide2"><img src={logos.Maniabandhan} alt="" /> 
                    <a className="next" href="#slide3"><i class="fa fa-angle-right fa-5x" aria-hidden="true" style={{padding:"11px",color:"silver",marginLeft:"-4px"}}></i></a></li>
    <li id="slide3"><img src={logos.Nalbari} alt="" />
              <a className="next" href="#slide1"><i class="fa fa-angle-right fa-5x" aria-hidden="true" style={{padding:"11px",color:"silver",marginLeft:"-4px"}}></i></a></li>

  </ul>
          
       </div>
        </React.Fragment>
      );
    }
  
  
  
    }
export default BPCarousel;