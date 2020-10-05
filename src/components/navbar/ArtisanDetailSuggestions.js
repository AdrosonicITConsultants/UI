import React, { Component } from "react";
import "./navbar.css";
import { connect } from "react-redux";
import Autosuggest from "react-autosuggest";
import axios from "axios";
import logos from "../../assets";
import "./suggestions.css";
import TTCEapi from "../../services/API/TTCEapi";
import queryString from 'query-string';
import NavbarComponent from "./navbar";
import Footer from "../footer/footer";
import { Row, Col , Container, Button} from 'reactstrap';
import ProductsOfCatelog from '../Artisan_Self_Design/ProductsOfCatelog';
import ProductsOfSearch  from './ProductsOfSearch'
import { ArtisanProductOfSearch } from "./ArtisanProductOfSearch";



export default class DetailSuggestionsArtist extends Component {
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
           TTCEapi.showArtistSearchSuggestion(params.search,params.type).then((response)=>{
             console.log(response);
             if(response.data.valid == true)
             {
               this.setState({
                products : response.data.data.searchResponse,
                resultsCount : response.data.data.length,
                searchWord : params.search,
                both : 1,
                antaran : 0,

              },()=>{
                console.log(this.state.searchWord);
                console.log(this.state)
                var self = 0 ;
                for ( var item in this.state.products )
                {
                  if(this.state.products[item].madeWithAnthran == 0)
                  {
                    self = self + 1;
                  }
                }
                var antaran = parseInt(this.state.resultsCount - self )
                this.setState({selfProduct : self , antaranProduct : antaran },()=>{
                  console.log(this.state);
                });

              })
             }
             else{
              this.setState({
                
                searchWord : params.search,
                

              })
             }

        });
        TTCEapi.getProductIdsInWishlist().then((response)=>{
          var item=this.state.getProductIdsInWishlist
          this.setState({getProductIdsInWishlist : response.data.data, dataload : true,},()=>{
       
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
           {this.state.resultsCount > 0 
           ?
          
        <Container>
          <Row noGutters={true} >
            <Col  className="headingsearch col-xs-12 bold">
            Results for "{this.state.searchWord}"

            </Col>
            <Col  className="font20 col-xs-12 light">
            Showing 
            {" "}
            {this.state.both == 1 ? this.state.resultsCount : null } 
            {this.state.antaran == 1 ? this.state.antaranProduct : null } 
            {(this.state.antaran == 0 && this.state.both == 0)  ? this.state.selfProduct : null } 

            {" "}
             results


            </Col>
            </Row>
            <Row noGutters={true} className="padding15" >
              <Col className="col-xs-12 filteronsearch">
            <Col className="col-sm-3 padding0">
              Filter according to design collections
            </Col>
            <Col className="col-sm-3 padding0">
            <input type="radio" value="Male" name="gender" checked={this.state.antaran == 1} onClick={()=>{this.setState({both : 0, antaran :1})}}/>
            <img src={logos.antaranCoDesignLogo} className="logosearch"></img>Show only Antaran Co-Design

            </Col>
            <Col className="col-sm-3 padding0">
            <input type="radio" value="Female" name="gender" checked={this.state.antaran == 0 && this.state.both == 0 } onClick={()=>{this.setState({both : 0, antaran:0})}}/> 
            <img src={logos.artisianSelfLogo} className="logosearch"></img>Show only Artisan Self Design


            </Col>
            <Col className="col-sm-2 padding0">
            <input type="radio" value="Other" name="gender" onClick={()=>{this.setState({both : 1})}} checked={this.state.both == 1} /> Show both

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
                                        <ArtisanProductOfSearch productData = {item} />     
                                        </Col>  
                                        :
                                        <>
                                        {this.state.antaran == item.madeWithAnthran
                                        ?
                                        <Col xs={12} sm={6} md={4}>
                                            {this.state.item1 = false}

                                          <ArtisanProductOfSearch productData = {item} />    
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
        :
        
        <Container>
                                    <Row noGutters={true}>
                                      <br>
                                      </br>
                                      <br>
                                      </br>
                                      <Col className='col-xs-12 font30 bold text-center'>
                                  Your search "{this.state.searchWord}" returned no results!
                                  
                                  
                                      </Col>
                                     
                                      <Col className='col-xs-12  text-center'>
                                      <br></br>
                                        0 Results found
                                        <br></br>
                                        <br></br>
                                      </Col>
                                      
                                      <Col className='col-xs-12  light text-center'>
                                       Please check your spelling. Or try searching
                                      </Col>
                                      <Col className='col-xs-12 light text-center'>
                                       something like "saree", "duppatta" etc.
                                      </Col>
                                    </Row>
        </Container>
        }
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
