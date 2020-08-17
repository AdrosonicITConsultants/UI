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

class AntaranProductRegions extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            productCategoriesdata : [],
            productCategoryid : -1,
            isfavHovered :false,
            dataload : false,
            heading  : "Regions",
            products : [],
            cluster : "",
            description : "",
            regionData : [], 
            clusterID : "",  
            regionTitle : "",
            regionDesc : "",
         
        };
      
    }
    handleCluster(e) {
        // console.log(e.target.id);
        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index];
        var option =  optionElement.getAttribute('clusterid');
        console.log(option);
        
        this.setState({ [e.target.name]: e.target.value , productCategoryid : option}, ()=> {
          console.log(this.state);
          
        });
        
      }
    componentWillMount(){

    }
    componentDidMount(){
        let params = queryString.parse(this.props.location.search);

        CMSApi.getRegions().then((response)=>{

            if(response)
            {
              console.log(response.data);
              this.setState({
                regionData : response.data,
                clusterID : params.clusterid,
              })
            }

            return this.state.regionData ? this.state.regionData.map((data) => {
                if(data.acf.cluster_id == params.clusterid) {
                    this.setState ({
                        regionTitle : data.title.rendered,
                        regionDesc : data.acf.description
                    })
                }
            }) : null

        });

        TTCEapi.getClusterProducts(parseInt(params.clusterid)).then((response)=>{
            console.log(response.data.data);
            this.setState({
                dataload : true,
                heading : response.data.data.cluster.desc,
                products : response.data.data.products
               });
        });
        TTCEapi.getProducts().then((response)=>{
            console.log(response);
            this.setState({productCategoriesdata : response.data.data},()=>{
                console.log(this.state);
            });

        });
    }
    backoperation(){
        browserHistory.push("/Antaran"); 
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
                                {this.state.regionTitle}
                                </Col>
                            </Row>
                            <Row noGutters={true} className="mt20"> 
                                <Col  
                                md={{ size: "8" }}
                                lg={{ size: "8" }} className="regular">
                                   {this.state.regionDesc}
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
                                    <option key = '0' clusterid = '-1'  value='Select Cluster'>View All Products</option>
                                    {this.state.productCategoriesdata.map((item) => <option key =  {item.id} clusterid={item.id} value={item.productDesc}>{item.productDesc}</option>)}
                                </select>
                        
                                <br>
                                </br>
                                </Col>
                               
                             </Row>
                             <Row noGutters="true"> 
                             {this.state.item1 = true} 
                                {this.state.products.map((item) =>
                                <div>
                                    {this.state.productCategoryid == -1 
                                        ? 
                                        
                                        <Col xs={12} sm={6} md={4}>
                                            {this.state.item1 = false}
                                        <ProductsOfCatelog productData = {item}/>              
                                        </Col>  
                                        :
                                        
                                        <>
                                        {this.state.productCategoryid == item.productType.productCategoryId
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
                                )}
                                {this.state.item1 != true
                                ?
                                <>
                                </>
                                :
                                <Row noGutters={true} className="text-center">
                                    No Products found
                                </Row>}
                               
                                    {/* <Col xs={12} sm={6} md={4}>
                                    <ProductsOfCatelog productData = {this.state.data}/>              
                                    </Col>              */}
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
export default AntaranProductRegions;