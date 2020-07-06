
import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Button} from 'reactstrap';
import '../navbar/navbar.css';
import NavbarComponent from "../navbar/navbar";
import { connect } from "react-redux";
import * as Actions from "../../redux/action/action";
import Footer from "../footer/footer";
import { Switch, Route, Router,Link } from "react-router-dom";
import PrivateRoute from "../../services/utils/PrivateRoute";
import { memoryHistory, browserHistory } from "../../helpers/history";
import AntaranCoDesignCategories from './AntaranCoDesign-Categories';
import AntaranCoDesignRegion from "./AntaranCoDesign-Regions"
import AntaranCoDesign from "./AntaranCoDesign"
export default class AntaranCoDesignNavbar extends Component {
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
          case "/Antaran": {
            this.setState({
              selected: "Regions",
            });
            break;
          }
          case "/Antaran/categories": {
            this.setState({
              selected: "Categories",
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
             }
      }
    render() {
        return (
            <React.Fragment>
                <Container>
            <Row noGutters="true">
            <Col sm={{size:2}} className="Vcheading">
               <Link to="/Antaran"> <h1 className={
                       (this.state.selected == "Regions"
            ? "selectedNavbarTab"
            : "")
            } onClick={this.handleSelect}>Regions</h1></Link>
                </Col>
                <Col sm={{size:2}} className="Vcheading">
                <Link to="/Antaran/categories">  <h1 className={
                       (this.state.selected == "Categories"
            ? "selectedNavbarTab"
            : "")
            } onClick={this.handleSelect}>Categories</h1></Link>
                </Col>
            
                
            </Row>
            </Container>
            <Router history={browserHistory}>
                <PrivateRoute exact path="/Antaran" component={AntaranCoDesignRegion} />
                <PrivateRoute exact path="/Antaran/categories" component={AntaranCoDesignCategories} />
               
              </Router>
            </React.Fragment>
        )
    }
}
