import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Button} from 'reactstrap';
import '../navbar/navbar.css';
import NavbarComponent from "../navbar/navbar";
import { connect } from "react-redux";
import * as Actions from "../../redux/action/action";
import './ArtisanselfDesign.css';
import TTCEapi from '../../services/API/TTCEapi';
import Footer from "../footer/footer";

 class ArtisanCard extends Component {
     
       
  
    render () {
      
      return (
        
        <React.Fragment>
        
          
        {/* Row 1 */}
         
      {/* Card1 */}
     
        <div class="col-xs-12  col-sm-4 col-md-4 col-lg-4">
         
         <div className="card Cardlayout">
         <div class="card-block">
         <p class="card-text">{this.props.companyName ? <p>{this.props.companyName}</p>:<p>{this.props.firstName}</p>}</p>
         </div>
        
         {this.props.logo ? <img className="card-img-top-brand" src={this.props.logo}  alt="Logo"/>:
         this.props.profilePic ? <img className="card-img-top-brand" src={this.props.profilePic}  alt="Profile Img"/>  : 
         <img className="card-img-top-brand" src={logos.panda}  alt="Default Img"/>
         }
         
         <div class="effect-text">
             <div class="effect-btn">
               <h2>EXPLORE MORE</h2>
               <a class="btn" href="#"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
             </div>
           </div>
       </div> 
       </div>
    
 
       
    
   
        </React.Fragment>
      );
    }
  
  
  
    }
export default ArtisanCard;