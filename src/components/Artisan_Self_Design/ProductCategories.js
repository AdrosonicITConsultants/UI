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
import queryString from 'query-string';
import "./ProductCategories.css"
import ProductsOfCatelog from './ProductsOfCatelog';
import CMSApi from '../../services/API/CMSApi';

class ProductCategories extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            clusterdata : [],
            clusterid : -1,
            isfavHovered :false,
            dataload : false,
            heading  : "Categories",
            products : [],
            cluster : "",
            categoryData : [],
            categoryTitle : "",
            categoryDesc : "",
            clusterID : "",         
        };
      
    }
    handleCluster(e) {
        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index];
        var option =  optionElement.getAttribute('clusterid');
         this.setState({ [e.target.name]: e.target.value , clusterid : option}, ()=> {
         
        });
        
    }
 
    componentDidMount(){
        let params = queryString.parse(this.props.location.search);

        CMSApi.getCategoriesSelfDesign().then((response)=>{

            if(response)
            {
              this.setState({
                categoryData : response.data,
                clusterID : params.clusterid,
              })
            }

            return this.state.categoryData ? this.state.categoryData.map((data) => {
                if(data.acf.category_id == params.categoryId) {
                    this.setState ({
                        categoryTitle : data.title.rendered,
                        categoryDesc : data.acf.description
                    })
                }
            }) : null

        });

        TTCEapi.getProductCategoryProducts(parseInt(params.categoryId)).then((response)=>{
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
    
    backoperation(){
       browserHistory.goBack(); ; 
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
                                     onClick={() => this.backoperation()}
                                ></img>
                       
                       </Col>
                        <Col md="10">
                            <Row noGutters={true} className ="cp1heading bold fontplay">
                                <Col md="12">
                                    {this.state.categoryTitle}
                                </Col>
                            </Row>
                            <Row noGutters={true} className="mt20"> 
                                <Col  
                                md={{ size: "8" }}
                                lg={{ size: "8" }} className="light">
                                    {this.state.categoryDesc}
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
                             {this.state.item1 = true} 

                                {this.state.products.map((item) =>
                               <>
                                {item.madeWithAnthran==0?
                                
                                <div>
                                    {this.state.clusterid == -1 
                                        ? 
                                        <Col xs={12} sm={6} md={4}>
                                            {this.state.item1 = false}
                                        <ProductsOfCatelog productData = {item}/>              
                                        </Col>  
                                        :
                                        
                                        <>
                                        {this.state.clusterid == item.clusterId 
                                        ?
                                        <Col xs={12} sm={6} md={4}>
                                            {this.state.item1 = false}
                                        <ProductsOfCatelog productData = {item}/>              
                                        </Col>
                                        :
                                        <>
                                        </>
                                    }
                                        </>
                                    }
                                       
                                       </div>
                                :
                                null
                            }
                            </>
                                )}
                                {this.state.item1 != true
                                ?
                                <>
                                </>
                                :
                                <Row noGutters={true} className="text-center">
                                    No Products found
                                </Row>}
                               
                                   
                            </Row>
                        </Col>
                    </Row>
                  <br></br>                    
                  <br></br>     
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