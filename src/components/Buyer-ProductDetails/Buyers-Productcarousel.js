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
             {this.state.Image==null?
             <>
             <li>
      <a href="#slide1">
      <img className=" " src={logos.Smile }  alt="Card image cap"/>
        
        </a>
    </li>
             </>
             :
             <>
              { this.state.Image.length>0?
      <li>
      <a href="#slide1">
      <img className=" " src={this.state.ImageUrl + this.state.Image[0].productId + '/' + this.state.Image[0].lable }  alt="Card image cap"/>
        
        </a>
    </li>
      :null}       
    
    { this.state.Image.length>0?
     <li>
     <a href="#slide2">
       {this.state.Image[1]? 
       <img className=" " src={this.state.ImageUrl + this.state.Image[1].productId + '/' + this.state.Image[1].lable }  alt="Card image cap"/>:null}
     
     </a>
   </li>
    :null}
   
     { this.state.Image.length>0? 
       <li>
       <a href="#slide3">
         {this.state.Image[2]? 
          <img className="" src={this.state.ImageUrl + this.state.Image[2].productId + '/' + this.state.Image[2].lable }  alt="Card image cap"/>
         :null}
      
         </a>
     </li>
     :null}
  
    
             </>
            }
     
  </ul> 
          
           <ul class="slides">
             {this.state.Image==null?
             <>
             <li id="slide1">
            <img className=" " src={logos.Smile}  alt="Card image cap"/>
            <a className="next" href="#slide2"><i class="fa fa-angle-right fa-5x" aria-hidden="true" style={{padding:"11px",color:"silver",marginLeft:"-4px"}}></i></a></li>
             
             </>
             :
             <>
              {this.state.Image[1]&&this.state.Image[0]||this.state.Image[2]&&this.state.Image[0]||this.state.Image[1]&&this.state.Image[2]&&this.state.Image[0]?
            <li id="slide1">
            <img className=" " src={this.state.ImageUrl + this.state.Image[0].productId + '/' + this.state.Image[0].lable }  alt="Card image cap"/>
            <a className="next" href="#slide2"><i class="fa fa-angle-right fa-5x" aria-hidden="true" style={{padding:"11px",color:"silver",marginLeft:"-4px"}}></i></a></li>
             :
             this.state.Image[0]? 
             <li id="slide1">
             <img className=" " src={this.state.ImageUrl + this.state.Image[0].productId + '/' + this.state.Image[0].lable }  alt="Card image cap"/>
           </li>
            
             :null}
         
   
         {this.state.Image[0]&&this.state.Image[1]||this.state.Image[0]&&this.state.Image[2]&&this.state.Image[1]?
            <li id="slide1">
            <img className=" " src={this.state.ImageUrl + this.state.Image[0].productId + '/' + this.state.Image[0].lable }  alt="Card image cap"/>
            <a className="next" href="#slide2"><i class="fa fa-angle-right fa-5x" aria-hidden="true" style={{padding:"11px",color:"silver",marginLeft:"-4px"}}></i></a></li>
             :
             this.state.Image[1]? 
             <li id="slide1">
             <img className=" " src={this.state.ImageUrl + this.state.Image[0].productId + '/' + this.state.Image[0].lable }  alt="Card image cap"/>
           </li>
            
             :null}


{this.state.Image[1]&&this.state.Image[2]||this.state.Image[0]&&this.state.Image[2]||this.state.Image[1]&&this.state.Image[0]&&this.state.Image[2]?
            <li id="slide1">
            <img className=" " src={this.state.ImageUrl + this.state.Image[0].productId + '/' + this.state.Image[0].lable }  alt="Card image cap"/>
            <a className="next" href="#slide2"><i class="fa fa-angle-right fa-5x" aria-hidden="true" style={{padding:"11px",color:"silver",marginLeft:"-4px"}}></i></a></li>
             :
             this.state.Image[2]? 
             <li id="slide1">
             <img className=" " src={this.state.ImageUrl + this.state.Image[0].productId + '/' + this.state.Image[0].lable }  alt="Card image cap"/>
           </li>
            
             :null}
    
             </>}
          
  </ul>
          
       </div>
        </React.Fragment>
      );
    }
  
  
  
    }
export default BPCarousel;