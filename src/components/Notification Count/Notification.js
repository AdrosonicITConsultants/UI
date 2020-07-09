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

export default class Notification extends Component {
    constructor(props){
        super(props);
        this.state={ count: 1}
    }
  
   onclick(type){
       this.setState(prevState => {
          return {count: type == 'add' ? prevState.count + 1: prevState.count - 1}
       });
   }
 
    render() {
        // const { clusterid } = this.props;
  console.log(this.props.products);
          return (
           
            <div>
                  <button type="button" class="btn btn-primary">Primary <span class="badge">{this.state.count}</span></button>

            Count: {this.state.count}
            <br/>
            <div style={{marginTop: '100px'}}/>
            <input type='button' onClick={this.onclick.bind(this, 'add')} value='Inc'/>
            <input type='button' onClick={this.onclick.bind(this, 'sub')} value='Dec'/>
           </div>
    )
}
}