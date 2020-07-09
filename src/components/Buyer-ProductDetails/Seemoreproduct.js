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
         product:this.props.product,
        };
        
        }
        productopen(id){
            browserHistory.push("/Product-Details?productId=" + id);
        }
    render() {
   
          return (
                <div className="card CardlayoutBDP "
                onClick={()=>{ this.productopen(this.state.product.id)}}>
                <div class="card-block">
                  <p class="card-text-BDP"> 
                  {this.state.product.tag}
                 </p>
                </div>
                <div>
                {this.state.product.productImages.length == 0
                ?
                <img className="card-sizeBPd" src={logos.Smile} alt="Card image cap"/> 
                :
                <img className="card-sizeBPd" src={TTCEapi.ImageUrl+'Product/'+this.state.product.productImages[0].productId+'/'+this.state.product.productImages[0].lable} alt="Card image cap"/> 

                    }
                </div>
                <div class="effect-text">
                  
                  </div>
              </div>
              
)       

    
}
}
