import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Button} from 'reactstrap';
import '../navbar/navbar.css';
import NavbarComponent from "../navbar/navbar";
import { connect } from "react-redux";
import * as Actions from "../../redux/action/action";
import './ArtisanselfDesign.css';
import Footer from "../footer/footer";
import { Switch, Route, Router,Link } from "react-router-dom";
import PrivateRoute from "../../services/utils/PrivateRoute";
import { memoryHistory, browserHistory } from "../../helpers/history";
import ArtistSelfDesignCategories from './Artisanselfdesign-Categories';
import ArtistSelfDesignBrands from './Artisanselfdesign-artisanbrands';
import ArtisanselfdesignNavbar from "./Artisanselfdesign-Navbar";
import TTCEapi from '../../services/API/TTCEapi';
class ProductCategories extends Component {
    constructor(props) {
        super(props);

        this.state = {
         
        };
      
    }
    componentWillMount(){
        
    }
    componentDidMount(){
        TTCEapi.getProductCategoryProducts(1).then((response)=>{

        })
    }

    render() {
        return (
            <React.Fragment>
                <NavbarComponent/>
                <Container>
                  
              </Container>
             
              <Footer></Footer>

             
                </React.Fragment>
              
        )
    }
}
export default ProductCategories;