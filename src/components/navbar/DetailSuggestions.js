import React, { Component } from "react";
import "./navbar.css";
import { connect } from "react-redux";
import Autosuggest from "react-autosuggest";
import axios from "axios";
import logos from "../../assets";
import "./suggestions.css";
import TTCEapi from "../../services/API/TTCEapi";
import queryString from 'query-string';
import NavbarComponent from "../navbar/navbar";
import Footer from "../footer/footer";
import { Row, Col , Container, Button} from 'reactstrap';
import ProductsOfCatelog from '../Artisan_Self_Design/ProductsOfCatelog';
import ProductsOfSearch  from './ProductsOfSearch'



export default class DetailSuggestions extends Component {
  constructor(props) {
    super(props);

    this.state = {
            dataload : false,    
            resultsCount: 0,
            products : [],
            getProductIdsInWishlist :[]
    };
  }

  componentDidMount(){
    let params = queryString.parse(this.props.location.search);
        console.log(params);
        if(params.search != undefined && params.type != undefined){
           TTCEapi.showBuyerSearchSuggestion(params.search,params.type).then((response)=>{
             if(response.data.valid == true)
             {
               this.setState({
                products : response.data.data,
                resultsCount : response.data.data.length,
                searchWord : params.search,
                both : 1,
                antaran : 1,

              },()=>{
                console.log(this.state)
              })
             }

        });
        TTCEapi.getProductIdsInWishlist().then((response)=>{
          var item=this.state.getProductIdsInWishlist
          this.setState({getProductIdsInWishlist : response.data.data, dataload : true,},()=>{
              console.log(this.state.getProductIdsInWishlist);
              console.log(this.state.getProductIdsInWishlist.indexOf(12))
       
          });
      });


        }
      
  }

  render() {
    
    return (
      <React.Fragment>
           {this.state.dataload == true 
           ?
           <>
           <NavbarComponent />
        <Container>
          <Row noGutters={true} >
            <Col  className="headingsearch col-xs-12 bold">
            Results for "{this.state.searchWord}"

            </Col>
            <Col  className="font20 col-xs-12 light">
            Showing {" "+ this.state.resultsCount} results

            </Col>
            </Row>
            <Row noGutters={true} className="padding15" >
              <Col className="col-xs-12 filteronsearch">
            <Col className="col-sm-3 padding0">
              Filter according to design collections
            </Col>
            <Col className="col-sm-3 padding0">
            <input type="radio" value="Male" name="gender" onClick={()=>{this.setState({both : 0, antaran :1})}}/>
            <img src={logos.antaranCoDesignLogo} className="logosearch"></img>Show only Antaran Co-Design

            </Col>
            <Col className="col-sm-3 padding0">
            <input type="radio" value="Female" name="gender" onClick={()=>{this.setState({both : 0, antaran:0})}}/> 
            <img src={logos.artisianSelfLogo} className="logosearch"></img>Show only Artisan Self Design


            </Col>
            <Col className="col-sm-2 padding0">
            <input type="radio" value="Other" name="gender" onClick={()=>{this.setState({both : 1})}}/> Show both

            </Col>
            </Col>

         
            </Row>
            <Row noGutters={true}>
              <Col className="font20 bold col-xs-12">
                Products that Match Your search
              </Col>
            </Row>
            <Row>
              <Col className="col-xs-1">

              </Col>
              <Col className="col-xs-10">
              <Row noGutters="true"> 
                             {this.state.item1 = true} 
                                {this.state.products.map((item) =>
                                <div>
                                    {this.state.both == 1
                                        ? 
                                      
                                        <Col xs={12} sm={6} md={4}>
                                            {this.state.item1 = false}
                                        <ProductsOfSearch productData = {item} productIdsInWishlist={ this.state.getProductIdsInWishlist.indexOf(item.id)!=-1 ? true : false }/>     
                                        </Col>  
                                        :
                                        <>
                                        {this.state.antaran == item.madeWithAnthran
                                        ?
                                        <Col xs={12} sm={6} md={4}>
                                            {this.state.item1 = false}

                                          <ProductsOfSearch productData = {item} productIdsInWishlist={ this.state.getProductIdsInWishlist.indexOf(item.id)!=-1 ? true : false }/>    
                                            {console.log(item)};

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
              <Col className="col-xs-1">
                
              </Col>
            </Row>

            <br></br>        <br></br>        <br></br>        <br></br>


        </Container>
<Footer></Footer>
      
           </>
           :
           <>
           </>
        }
        
      </React.Fragment>
    );
  }
}
