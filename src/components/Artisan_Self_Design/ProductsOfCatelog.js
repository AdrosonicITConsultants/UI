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
            imageurl : logos.dupatta,
            imageUrl : TTCEapi.ImageUrl +"Product/",
            isAddedtoWishlist:false,
            productIdsInWishlist:this.props.productIdsInWishlist,
            addToWishlist:null,
            deleteProductsInWishlist:[]
        };
        this.handleAddtoWishlist = this.handleAddtoWishlist.bind(this);
      console.log(this.props);
    }
    handleAddtoWishlist(id){
      TTCEapi.addToWishlist(id).then((response)=>{
          this.setState({isAddedtoWishlist : response.data.valid},()=>{
              console.log(this.state.isAddedtoWishlist);
       
          });
      });
  }

    generateEnquiry(id){
      console.log("Generate Enquiry " + id);
      browserHistory.push("/generateEnquiry"); 

    }
    productDescription(id){
      console.log("Product Descriptiony " + id);
      browserHistory.push("/Product-Details?productId=" + id); 

    }
    handleRemovefromWishlist(id){
      TTCEapi.deleteProductsInWishlist(id).then((response)=>{
          console.log(response);   
          if(response.data.data=="Successfull"){
            this.setState({isAddedtoWishlist:false})
          }
        
          
    
    });
    }
    componentDidMount(){
      if(this.state.productIdsInWishlist){
     if(this.state.productIdsInWishlist.indexOf(this.state.proddata.id)!=-1)
     {
       this.setState({
         isAddedtoWishlist:true
       })
     }
    }
     TTCEapi.getProductsInWishlist().then((response)=>{
      this.setState({getProductsInWishlist : response.data.data},()=>{
          console.log(this.state.getProductsInWishlist);
         
      });
  }); 
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
                    <div className="cpimagediv" style={{cursor:"pointer"}} onClick={()=>{this.productDescription(this.state.proddata.id)}}>
                    {this.state.proddata.productImages.length != 0 
                                  ?
                                  <img className="cpimage " src={this.state.imageUrl + this.state.proddata.productImages[0].productId + '/' + this.state.proddata.productImages[0].lable }  alt="Card image cap"/>

                                :
                                <img className="cpimage" src={this.state.imageurl}  alt="Card image cap"/>

                                
                                }
                    <div className="cpyellowdiv">
                       <div className="descriptionbox">
                         {this.state.proddata.product_spe}
                        </div>
                        <div className="bold">
                          Explore More.
                        </div>
                    </div>
                    </div>
                 
                    <Row noGutters={true} className="cpdetails" style={{"cursor":"pointer"}} onClick={()=>{this.productDescription(this.state.proddata.id)}} >
                        <Col  className=" bold fontplay col-xs-8">
                          <div className="productname">{this.state.proddata.tag}</div> 
                        </Col>
                        <Col className="col-xs-4">
                          {this.state.proddata.productStatusId == 2 
                          ?
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
                        
                        :
                        <Row noGutters={true} className="stockmargin exclusive">
                        <Col className="Exclusively">
                        Exclusively
                        </Col>
                        <Col className=" Made_to_order">
                        Made to order
                        </Col>
                        <Col className="text-center">
                        <img className="logoincard " src={logos.artisianSelfLogo}  alt="Card image cap"/>
                        </Col>
                        
                        </Row>
                        }
                         
                       
                            
                        </Col>
                        </Row>
                 
               
                 <div>
                       <hr className="cpline"></hr>
                     <Col style={{"paddingLeft":"0px"}} className = "col-xs-10">
                            <button className="generateEnquiry"
                            onClick={()=>{this.generateEnquiry()}}
                            >
                            Generate enquiry
                         <a href={"/generateEnquiry"}>
                              <img className="cpwhitearrow" src={logos.whitearrow}></img></a>

                            </button>
                     </Col>

                     <Col  className="cpwishlist col-xs-2">
                       
                     {(this.state.isAddedtoWishlist )? ( 
                       
                  <img
                    onMouseEnter={() => this.toggleHover("isfavHovered")}
                    onMouseLeave={() => this.toggleHover("isfavHovered")}
                    className="navButtonImg2"
                    src={logos.heariconfilled}
                    onClick={() => this.handleRemovefromWishlist(this.state.proddata.id)}
                    // onClick={() => this.handleRemovefromWishlist(this.state.proddata.id)}
                  ></img>
                  
                ) : (
                  
                  <img
                    onMouseEnter={() => this.toggleHover("isfavHovered")}
                    onMouseLeave={() => this.toggleHover("isfavHovered")}
                    className="navButtonImg2"
                    src={logos.favoriteicon}
                    onClick={() => this.handleAddtoWishlist(this.state.proddata.id)}
                  ></img>
                )}
                  </Col>
                 </div>
                 {/* {console.log(this.state.proddata)} */}

                </div> 
               
        )
    }
}

export default ProductsOfCatelog
