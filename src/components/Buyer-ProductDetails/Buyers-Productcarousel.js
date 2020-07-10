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
   constructor(props){
    super(props);
    this.state = {
     Image:this.props.Image,
     ImageUrl:TTCEapi.ImageUrl+'Product/',
     
    }
   
  }
  
  
    render () {
      
      return (
        
        
        <React.Fragment>
          
            <div class="BPDcontainer" >
        

            <ul class="thumbnails">
              {this.state.Image[0]?
             <li>
             <a href="#slide1"><img src={this.state.ImageUrl + this.state.Image[0].productId + '/' + this.state.Image[0].lable } /></a>
           </li>
           : 
           null  
            }


   
   {this.state.Image[1]?
             <li>
             <a href="#slide2"><img src={this.state.ImageUrl + this.state.Image[1].productId + '/' + this.state.Image[1].lable } /></a>
           </li>
           :
           null  
            }
     {this.state.Image[2]?
             <li>
             <a href="#slide3"><img src={this.state.ImageUrl + this.state.Image[2].productId + '/' + this.state.Image[2].lable } /></a>
           </li>
           :
           null  
            }
   
   
  </ul>
          
           <ul class="slides">
         
{this.state.Image[0]?
  <li id="slide1"> <div className="ImgDivcar"><img src={this.state.ImageUrl + this.state.Image[0].productId + '/' + this.state.Image[0].lable } alt="" /></div> </li>
:null
}
{this.state.Image[1]?
   <li id="slide2"><div className="ImgDivcar"><img src={this.state.ImageUrl + this.state.Image[1].productId + '/' + this.state.Image[1].lable } alt="" /></div> </li>
:null
}
{this.state.Image[2]?
   <li id="slide3"><div className="ImgDivcar"><img src={this.state.ImageUrl + this.state.Image[2].productId + '/' + this.state.Image[2].lable } alt="" /></div> </li>
:null
}
  

          
  </ul>
          
       </div>
        </React.Fragment>
      );
    }
  
  
  
    }
export default BPCarousel;