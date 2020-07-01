
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
import ArtistSelfdesignRegions from "./ArtistSelfdesign-Regions"
import ArtisanselfDesign from "./Artisanselfdesign"
export default class ArtisanselfdesignNavbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
          isSelected : false,
          selected:"Regions"
        };
        this.handleSelect = this.handleSelect.bind(this);
    }
    componentDidMount() {
        switch (browserHistory.location.pathname) {
          case "/Artisanself": {
            this.setState({
              selected: "Regions",
            });
            break;
          }
          case "/Artisanself/categories": {
            this.setState({
              selected: "Categories",
            });
            break;
          }
          case "/Artisanself/artisanbrands": {
            this.setState({
              selected: "Artisan Brands",
            });
            break;
          }
               }
      }
     
      handleSelect(e) {
        switch (e.target.innerText) {
          case "Regions": {
            this.setState({
              selected: "Regions",
            });
            break;
          }
          case "Categories": {
            this.setState({
              selected: "Categories",
            });
            break;
          }
          case "Artisan Brands": {
            this.setState({
              selected: "Artisan Brands",
            });
            break;
          }
        }
      }
    render() {
        return (
            <React.Fragment>
                <Container>
            <Row noGutters="true">
            <Col sm={{size:2}} className="Vcheading">
               <Link to="/Artisanself"> <h1 className={
                       (this.state.selected == "Regions"
            ? "selectedNavbarTab"
            : "")
            } onClick={this.handleSelect}>Regions</h1></Link>
                </Col>
                <Col sm={{size:2}} className="Vcheading" style={{"marginLeft":"-11px"}}>
                <Link to="/Artisanself/categories">  <h1 className={
                       (this.state.selected == "Categories"
            ? "selectedNavbarTab"
            : "")
            } onClick={this.handleSelect}>Categories</h1></Link>
                </Col>
                <Col sm={{size:4}} className="Vcheading" style={{"marginLeft":"15px"}}>
                <Link to="/Artisanself/artisanbrands">  <h1 className={
                       (this.state.selected == "Artisan Brands"
            ? "selectedNavbarTab"
            : "")
        } onClick={this.handleSelect}>Artisan Brands</h1> </Link>
                </Col>
                
            </Row>
            </Container>
            <Router history={browserHistory}>
                <PrivateRoute exact path="/Artisanself" component={ArtistSelfdesignRegions} />
                <PrivateRoute exact path="/Artisanself/categories" component={ArtistSelfDesignCategories} />
                <PrivateRoute exact path="/Artisanself/artisanbrands"component={ArtistSelfDesignBrands} />
              
              </Router>
            </React.Fragment>
        )
    }
}



