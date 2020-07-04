import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Button} from 'reactstrap';
import '../navbar/navbar.css';
import './ArtisanselfDesign.css';
import Footer from "../footer/footer";
import { Switch, Route, Router,Link } from "react-router-dom";
import PrivateRoute from "../../services/utils/PrivateRoute";
import { memoryHistory, browserHistory } from "../../helpers/history";
import ArtistSelfDesignCategories from './Artisanselfdesign-Categories';
import ArtistSelfDesignBrands from './Artisanselfdesign-artisanbrands';
import ArtisanselfdesignNavbar from "./Artisanselfdesign-Navbar";
import TTCEapi from '../../services/API/TTCEapi';
import "./ProductCategories.css"

export class ProductsOfCatelog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            proddata : this.props.productData,
            isfavHovered :false,
         
        };
      
    }
    toggleHover(name) {      
        switch (name) {
          case "isfavHovered":
            this.setState({
              isfavHovered: !this.state.isfavHovered,
            });
            break;
          case "isnotificationHovered":
            this.setState({
              isnotificationHovered: !this.state.isnotificationHovered,
            });
            break;
          
          default:
            break;
        }
      
    }
    
    render() {
        return (
            <div className="card cpCardlayout ">
                    <div className="cpimagediv">
                    <img className="cpimage" src={logos.dupatta}  alt="Card image cap"/>
                    <div className="cpyellowdiv">
                       <div className="descriptionbox">
                         {this.state.proddata.product_spe}
                        </div>
                        <div className="bold">
                          Explore More.
                        </div>
                    </div>
                    </div>
                 
                    <Row noGutters={true} className="cpdetails">
                        <Col md = {8} className=" bold fontplay">
        <div className="productname">{this.state.proddata.code}</div> 
                        </Col>
                        <Col md = {4} className="">
                            <Row noGutters={true} className="stockmargin">
                                <Col className="Available">
                                Available 
                                </Col>
                                <Col className="in_stock">
                                In Stock
                                </Col>
                                <Col className="text-center">
                                <img className="logoincard " src={logos.artisianSelfLogo}  alt="Card image cap"/>
                                </Col>
                                
                                </Row>
                        </Col>
                        </Row>
                 
               
                 <div>
                       <hr className="cpline"></hr>
                     <Col md = {10} style={{"padding-left":"0px"}}>
                            <button className="generateEnquiry">
                            Generate enquiry
                            </button>
                     </Col>
                     <Col md={2} className="cpwishlist">
                     {this.state.isfavHovered ? (
                  <img
                    onMouseEnter={() => this.toggleHover("isfavHovered")}
                    onMouseLeave={() => this.toggleHover("isfavHovered")}
                    className="navButtonImg2"
                    src={logos.heariconfilled}
                  ></img>
                ) : (
                  <img
                    onMouseEnter={() => this.toggleHover("isfavHovered")}
                    onMouseLeave={() => this.toggleHover("isfavHovered")}
                    className="navButtonImg2"
                    src={logos.favoriteicon}
                  ></img>
                )}
                  </Col>
                 </div>
                 {console.log(this.state.proddata)}

                </div> 
               
        )
    }
}

export default ProductsOfCatelog
