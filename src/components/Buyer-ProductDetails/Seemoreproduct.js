import React, { Component } from 'react';
import { Row, Col , Container, Button , Card,CardTitle,CardBody} from 'reactstrap';
import logos from "../../assets";
import '../navbar/navbar.css';
import NavbarComponent from "../navbar/navbar";
import { connect } from "react-redux";
import * as Actions from "../../redux/action/action";

import TTCEapi from '../../services/API/TTCEapi';
import Footer from "../footer/footer";
import { browserHistory } from "../../helpers/history";

export default class SeeMoreProduct extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
         
         products:this.props.products,
         clusterName:this.props.clusterName,
        };
        
        }
    render() {
        // const { clusterid } = this.props;
  console.log(this.props.products);
          return (
           
           <div>

        
        {this.state.products.map((data)=>{
    {console.log(data)}
    
return(

<div className="card CardlayoutBDP">
                <div class="card-block">
                  <p class="card-text-BDP"> 
                  {this.state.clusterName}
                 </p>
                </div>
                <img className="card-sizeBPd" src={TTCEapi.ImageUrl+'Product/'+data.productId+'/'+data.lable} alt="Card image cap"/>
                <div class="effect-text">
                  
                  </div>
              </div>
              
)       
    
})}


             </div>
    )
}
}
