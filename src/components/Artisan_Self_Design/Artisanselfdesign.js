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
import CMSApi from '../../services/API/CMSApi';

class ArtistSelfDesign extends Component {
    constructor(props) {
        super(props);

        this.state = {
          isSelected : false,
          artisanSelfDesignBg : "",
        };
      
    }
   
    componentDidMount () {
      var env="live";
      var id=0;
      if(env=="test"){
       id=132
      }
      else if(env=="live"){
        id=55
      }
      CMSApi.getPages(id).then((response)=>{
        if(response)
        {
          this.setState({
            artisanSelfDesignBg : response.data.acf.background_image
          })
        }
        else{
          browserHistory.push("/404error")
        }
      })
    }

    backoperation(){
          browserHistory.goBack(); 
      
  } 

    render() {
        return (
            <React.Fragment>
                <NavbarComponent/>
                <Container className="overflownhidden">
                <Row noGutters={true} style={{marginBottom: "20px"}}>
                           <Col sm = "1" className="col-xs-2" style={{padding: "0px"}}>
                           <img
                                       src={logos.backarrowicon}
                                       className="margin-cparrow cparrowsize glyphicon"
                                        onClick={() => this.backoperation()}
                            ></img>
                          
                          </Col>                           
                </Row>  
                  <Row noGutters="true" className="asdthreadbg">
                    <Col sm={{size:"6"}} className="Col6 col-xs-12">
                  <div noGutters="true">
                        <Col sm={{size:12}} className="Asdh1">
                          <h1>  Artisan <br/> Self Design </h1>
                            <p></p>
                            <p><img className="BPDAntaranlogo" src={logos.artisianSelfLogo} style={{height:"47px"}} alt=""/></p>
                        </Col>
                    </div>
             
            
                  </Col>
                  <Col sm={{size:"6"}} className="headimgposter col-xs-12">
                  {this.state.artisanSelfDesignBg ?
                    <img className="Asdbg" src={this.state.artisanSelfDesignBg}  alt="Card image cap"/>
                  : null }
                    
                  </Col></Row>
                  <Row noGutters="true">
                        <Col sm={{size:12}} className="ViewColtext">
                           <p>View Collection by</p> 
                            </Col>
            </Row>
                  <ArtisanselfdesignNavbar/>
              </Container>
              <Footer/>

             
                </React.Fragment>
              
        )
    }
}
export default ArtistSelfDesign;