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
import "./ProductCategories.css"
import ProductsOfCatelog from './ProductsOfCatelog';
class ProductCategories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clusterdata : [],
            clusterid : -1,
            isfavHovered :false,
            dataload : false,
            heading  : "",
            products : [],
            cluster : "",

         
        };
      
    }
    handleCluster(e) {
        // console.log(e.target.id);
        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index];
        var option =  optionElement.getAttribute('clusterid');
        console.log(option);
        
        this.setState({ [e.target.name]: e.target.value , clusterid : option}, ()=> {
          console.log(this.state);
          
        });
        
      }
    componentWillMount(){
            
    }
    componentDidMount(){
        TTCEapi.getProductCategoryProducts(1).then((response)=>{
            console.log(response.data.data.products);
            this.setState({
                dataload : true,
                heading : response.data.data.productCategory,
                products : response.data.data.products
               });
        });
        TTCEapi.getClusters().then((response)=>{
            this.setState({clusterdata : response.data.data});

        });
    }
    
    
    

    render() {
        return (
         
            <React.Fragment>
                   {this.state.dataload == true 
                   
                ? 
                <>
                <NavbarComponent/>
                <Container className="cpbackground">
                    
                    <Row noGutters={true} className="cpheadmargin">
                        <Col md = "1">
                        <img
                                    src={logos.backarrowicon}
                                    className="margin-cparrow cparrowsize glyphicon"
                                    //  onClick={() => this.backoperation()}
                                ></img>
                       
                       </Col>
                        <Col md="10">
                            <Row noGutters={true} className ="cp1heading bold fontplay">
                                <Col md="12">
                                    {this.state.heading}
                                </Col>
                            </Row>
                            <Row noGutters={true} className="mt20"> 
                                <Col  
                                md={{ size: "8" }}
                                lg={{ size: "8" }} className="light">
                                    Browse the authentic arts of Maniabandha Cluster ranging long back.
                                    Browse the authentic arts of Maniabandha.
                                </Col>
                            </Row>
                            <hr></hr>
                            <Row noGutters={true}>
                                <Col md="12" className="cpproduct regular">
                                Products
                                </Col>
                            </Row>
                            <Row noGutters="true">
                                <Col sm={{size:"12"}}>
                                <br>
                                </br>
                                <select  className="SelectCategory"  
                                 id="cluster"
                                 name="cluster" 
                                 onChange={(e) => this.handleCluster(e)}>
                                    <option key = '0' clusterid = '-1'  value='Select Cluster'>View by Cluster</option>
                                    {this.state.clusterdata.map((item) => <option key =  {item.id} clusterid={item.id} value={item.desc}>{item.desc}</option>)}
                                </select>
                        
                                <br>
                                </br>
                                </Col>
                               
                             </Row>
                             <Row noGutters="true"> 
                                {this.state.products.map((item) =>
                                <div>
                                    {this.state.clusterid == -1 
                                        ? 
                                        <Col xs={12} sm={6} md={4}>
                                        <ProductsOfCatelog productData = {item}/>              
                                        </Col>  
                                        :
                                        
                                        <>
                                        {this.state.clusterid == item.clusterId 
                                        ?
                                        <Col xs={12} sm={6} md={4}>
                                        <ProductsOfCatelog productData = {item}/>              
                                        </Col>
                                        :
                                        <>
                                        </>
                                    }
                                        </>
                                    }
                                       
                                       </div>
                                )}
                               
                                    {/* <Col xs={12} sm={6} md={4}>
                                    <ProductsOfCatelog productData = {this.state.data}/>              
                                    </Col>              */}
                            </Row>
                        </Col>
                    </Row>
                  <br></br>                    
                </Container> 
                <Footer/>
                </>
                :
                <>
                </>
                }
                </React.Fragment>
              
        )
    }
}
export default ProductCategories;