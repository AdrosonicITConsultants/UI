import React, { Component } from 'react';
import { Row, Col , Container, Button , Card,CardTitle,CardBody, Navbar} from 'reactstrap';
import logos from "../../assets";
import '../navbar/navbar.css';
import NavbarComponent from "../navbar/navbar";
import { connect } from "react-redux";
import * as Actions from "../../redux/action/action";

import TTCEapi from '../../services/API/TTCEapi';
import Footer from "../footer/footer";
import { browserHistory } from "../../helpers/history";

export default class Wishlist extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
         
       
        };
        
        }
    render() {
 
    
return(

<React.Fragment>
<NavbarComponent></NavbarComponent>
</React.Fragment>

    )
}
}