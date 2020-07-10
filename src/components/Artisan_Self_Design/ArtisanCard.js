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
  constructor(props){
    super(props);
    this.state = {
     logo:this.props.logo,
     profilePic:this.props.profilePic,
     logoUrl:TTCEapi.ImageUrl+'User/'+this.props.artisanId+'/CompanyDetails/Logo/'+this.props.logo,
     profilePicUrl:TTCEapi.ImageUrl+'User/'+this.props.artisanId+'/ProfilePics/'+this.props.profilePic,
     defaultimgUrl:logos.Smile,
    }
   
  }
       
  
    render () {
      
      return (
        
        <React.Fragment>
        {console.log(this.state)}
          
        {/* Row 1 */}
         
      {/* Card1 */}
     
       <Col xs={12} sm={6} md={4}>
         
         <div className="card Cardlayout">
                
         {this.props.logo ? <img className="card-img-top-brand" src={this.state.logoUrl}  alt="Logo"/>:
         this.props.profilePic ? <img className="card-img-top-brand" src={this.state.profilePicUrl}  alt="Profile Img"/>  : 
         <img className="card-img-top-brand" src={this.state.defaultimgUrl}  alt="Default Img"/>
         }
          <div class="card-block cardaligntext">
         <p class="card-text1">{this.props.companyName ? <p>{this.props.companyName}</p>:<p>{this.props.firstName}</p>}</p>
         </div>
         <div class="effect-text">
             <div class="effect-btn">
               <h2>EXPLORE MORE</h2>
               <a class="btn" href={"artisanbrands/ArtisanProducts?artisanId="+this.props.artisanId}><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
             </div>
           </div>
       </div> 
       </Col>
    
 
    
   
        </React.Fragment>
      );
    }
  
  
  
    }
export default ArtisanCard;