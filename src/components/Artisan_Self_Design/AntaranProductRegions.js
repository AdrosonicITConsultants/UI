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
        console.log(params);
        TTCEapi.getClusterProducts(parseInt(params.clusterid)).then((response)=>{
            switch(parseInt(params.clusterid))
            {
                    case 1 :
                    this.setState({description : "Odisha is renowned for its colourful, cultural textiles. Maniabandha in Cuttack is known for single weft ikat weaving - particularly the “khandua patta” woven for Lord Jagnath. It involves a tying, dyeing and weaving process complex than warp ikat. Traditional designs include motifs of elephants, lions, deer, lotus, architecture and nature. Striking colours and designs of Maniabandha Ikat make sarees, stoles, dupattas and fabrics woven on fine soft cotton, silk very special. Designs have evolved blending traditional with contemporary seamlessly."});
                    break;
                    case 2 :
                    this.setState({description : "A coastal village of Odisha, on banks of Brahmani river, Gopalpur is a Tussar weave cluster. Artisans create beautiful Tussar, Gheecha silk textiles, enhanced with extra weft designs. Unique texture of Gopalpur weaves make the sarees, stoles, dupattas and fabrics special. Weavers blend silks with cotton and use eri, mulberry silk as well. Women hand reel and spin Tussar and Gheecha, giving the weaves a special texture and feel."});
                    break;
                    case 3 :
                    this.setState({description : "Part of Nellore district of Andhra, Venktagiri is famous for fine handloom cotton and silk saris, dupattas. Once woven for Royal Velugoti Dynasties, the weaves with finer counts of silks, cotton, pure Zari, intricate patterns of Jala and Jamdani, using technique of extra weft ‘loom embroidery’ involves a tedious process. The traditional features of Venkatgiri sarees are jamdani motifs of parrot, swan, peacock, mango or leaf designs, butta in the pallu, now done in contemporary variations too."});
                    break;
                    case 4 :
                    this.setState({description : "A district in Assam, on the banks of Brahmaputra river, Kamrup is the leading eri silk cluster of India. Eri silk is also called ahimsa (non-violent) silk when extracted from cocoons without killing larvae. Hand spinning and weaving is a traditional activity for women. Eri is durable, warm in winters and cool in summer; considered symbolic of peace and grace. Apart from in eri, women weave beautiful ghamosas, sarees, stoles, dupattas and yardage in cotton too."});
                    break;
                    case 5 :
                    this.setState({description : "Situated on north bank of Brahmaputra in Assam, Nalbari specialises in weave of mulberry silk; while cotton, eri and zari yarns are also used. Nalbari, means a place of reeds, signifying its importance as a major textile weaving hub. The region is famous for its Sanskrit Schools, Buddhist & Hindu Temples. The motifs in weaves are mostly inspired by nature and objects of Assamese culture. Some classic motifs are Jaapi, Pokhila, Joonbiri, Kaziranga and Kalki (Paisley). The famous Mekhla Chaddars of Assam are woven by the weavers."});
                    break;
                    case 6 :
                    this.setState({description : "Situated in North East India, Nagaland is home to 16 tribes for whom loin loom woven textiles are integral part of cultural identity. Loin loom/ back strap loom is an early tool where one end of warp is attached to a bamboo and other strapped to body- of a women weaver. Each yarn strand is handpicked to form beautiful patterns, creating designs rooted in tradition. The textiles have cultural context- identity of a tribe, status of wearer and even achievements! Dimapur, Phek region weavers now weave contemporary textiles in thick cotton for home textiles, jackets, bags. Nagaland shawls are also famous."});
                    break;
                    default:
                    this.setState({description : ""});
                    break;
                   

            }
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
                                    {this.state.heading}
                                </Col>
                            </Row>
                            <Row noGutters={true} className="mt20"> 
                                <Col  
                                md={{ size: "8" }}
                                lg={{ size: "8" }} className="regular">
                                   {this.state.description}
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