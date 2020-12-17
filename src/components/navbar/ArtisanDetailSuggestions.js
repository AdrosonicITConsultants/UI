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
import  ArtisanProductOfSearch  from "./ArtisanProductOfSearch";
import { useTranslation, withTranslation } from "react-i18next";
import { memoryHistory, browserHistory } from "../../helpers/history";

 class DetailSuggestionsArtist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataload : false,    
      resultsCount: 0,
      products : [],
      getProductIdsInWishlist :[],
      selfProduct : 0 ,
      antaranProduct: 0 ,
      currentPage: 1,
      boolAntaran : -1,

};

  }

  componentDidMount(){
    this.setState({dataload:false});
    let params = queryString.parse(this.props.location.search);
        if(params.search != undefined && params.type != undefined){
           TTCEapi.showArtistSearchSuggestion(params.search,params.type,1,-1).then((response)=>{
            if(response){ 
             if(response.data.valid == true)
             {
              TTCEapi.searchArtisanProductCount(params.search,params.type,1,-1).then((response1)=>{
                if(response1){ 
                if(response1.data.valid)
                {
                 this.setState({
                   totalproducts : response1.data.data,
                 })
                }
              }
              else{
                browserHistory.push("/404error");
              }
              })
               this.setState({
                products : response.data.data.searchResponse,
                resultsCount : response.data.data.searchResponse.length,
                searchWord : params.search,
                both : 1,
                antaran : 0,
                currentpage : 1,
                boolAntaran : -1



              },()=>{
            
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
                });

              })
             }
             else{
              this.setState({
                
                searchWord : params.search,
                

              })
             }
            }
            else{
              browserHistory.push("/404error");
            }

        });
        TTCEapi.getProductIdsInWishlist().then((response)=>{
          if(response){ 
          var item=this.state.getProductIdsInWishlist
          this.setState({getProductIdsInWishlist : response.data.data, dataload : true,},()=>{
       
          });
        }
        else{
          browserHistory.push("/404error");
        }
      });


        }
      
  }
  SelfProduct(){
    this.setState({dataload:false});
    let params = queryString.parse(this.props.location.search);
         if(params.search != undefined && params.type != undefined){
           TTCEapi.showArtistSearchSuggestion(params.search,params.type,1,0).then((response)=>{
            if(response){ 
             if(response.data.valid == true)
             {  var Count = response.data.data.searchResponse.length
                var moreProducts = response.data.data.searchResponse
               TTCEapi.searchArtisanProductCount(params.search,params.type,1,0).then((response1)=>{
                if(response1){ 
                  if(response1.data.valid)
                  {
                   this.setState({
                     totalproducts : response1.data.data,
                   })
                  }
                }
                else{
                  browserHistory.push("/404error");
                }
                })
               this.setState({
                products : moreProducts,
                resultsCount : Count,
                currentPage : 1,
                boolAntaran : 0,

              },()=>{
                var self = 0 ;
                for ( var item in this.state.products )
                {
                  if(this.state.products[item].madeWithAnthran == 0)
                  {
                    self = self + 1;
                  }
                }
                var antaran = parseInt(this.state.resultsCount - self )
                this.setState({selfProduct : self , antaranProduct : antaran ,dataload:true},()=>{
                });
              })
             }
             else{
              this.setState({
                
                searchWord : params.search,
                

              })
             }
            }
            else{
              browserHistory.push("/404error");
            }

        });
      }

  }
  Antaran(){
    this.setState({dataload:false});
    let params = queryString.parse(this.props.location.search);
       if(params.search != undefined && params.type != undefined){
           TTCEapi.showArtistSearchSuggestion(params.search,params.type,1,1).then((response)=>{
            if(response){ 
             if(response.data.valid == true)
             {  var Count = response.data.data.searchResponse.length
                var moreProducts = response.data.data.searchResponse
               TTCEapi.searchArtisanProductCount(params.search,params.type,1,1).then((response1)=>{
                if(response1){ 
                  if(response1.data.valid)
                  {
                   this.setState({
                     totalproducts : response1.data.data,
                   })
                  }
                }
                else{
                  browserHistory.push("/404error");
                }
                })
               this.setState({
                products : moreProducts,
                resultsCount : Count,
                currentPage : 1,
                boolAntaran : 1,
               },()=>{
                var self = 0 ;
                for ( var item in this.state.products )
                {
                  if(this.state.products[item].madeWithAnthran == 0)
                  {
                    self = self + 1;
                  }
                }
                var antaran = parseInt(this.state.resultsCount - self )
                this.setState({selfProduct : self , antaranProduct : antaran ,dataload:true},()=>{
                });
              })
             }
             else{
              this.setState({
                
                searchWord : params.search,
                

              })
             }
            }
            else{
              browserHistory.push("/404error");
            }

        });
      }

  }
  addMoreProducts(){
    var page = this.state.currentPage+1;
    let params = queryString.parse(this.props.location.search);

        if(params.search != undefined && params.type != undefined){
           TTCEapi.showArtistSearchSuggestion(params.search,params.type,page,this.state.boolAntaran).then((response)=>{
            if(response){  
            if(response.data.valid == true)
             {  var Count = this.state.resultsCount + response.data.data.searchResponse.length
                var moreProducts = response.data.data.searchResponse
                var products = this.state.products
                products = products.concat(moreProducts);
               this.setState({
                products : products,
                resultsCount : Count,
                currentPage : page

              },()=>{
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
                });
              })
             }
             else{
              this.setState({
                
                searchWord : params.search,
                

              })
             }
            }
            else{
              browserHistory.push("/404error");
            }

        });
      }
     }

  render() {
    
    return (
      <React.Fragment>
        <NavbarComponent />
           {this.state.dataload == true 
           ?
           <>
           
           {this.state.resultsCount > 0 
           ?
          
        <Container>
          <Row noGutters={true} >
            <Col  className="headingsearch col-xs-12 bold">
            {this.props.t("Pages.object.Results for")} "{this.state.searchWord}"

            </Col>
            <Col  className="font20 col-xs-12 light">
            {this.props.t("Pages.object.Showing")} 
            {" "}
            {this.state.both == 1 ? this.state.resultsCount : null } 
            {this.state.antaran == 1 ? this.state.antaranProduct : null } 
            {(this.state.antaran == 0 && this.state.both == 0)  ? this.state.selfProduct : null } 

            {" "}
            {this.props.t("Pages.object.Results")}


            </Col>
            </Row>
            <Row noGutters={true} className="padding15" >
              <Col className="col-xs-12 filteronsearch">
            <Col className="col-sm-3 padding0">
            {this.props.t("Pages.object.Filter according to design collections")} 
            </Col>
            <Col className="col-sm-3 padding0">
            <input type="radio" value="Male" name="gender" checked={this.state.antaran == 1} onClick={()=>{this.Antaran();  this.setState({both : 0, antaran :1})}}/>
            <img src={logos.antaranCoDesignLogo} className="logosearch"></img>{this.props.t("Pages.object.Show only Antaran Co-Design")} 

            </Col>
            <Col className="col-sm-3 padding0">
            <input type="radio" value="Female" name="gender" checked={this.state.antaran == 0 && this.state.both == 0 } onClick={()=>{this.SelfProduct(); this.setState({both : 0, antaran:0})}}/> 
            <img src={logos.artisianSelfLogo} className="logosearch"></img>{this.props.t("Pages.object.Show only Artisan Self Design")} 


            </Col>
            <Col className="col-sm-2 padding0">
            <input type="radio" value="Other" name="gender" onClick={()=>{this.componentDidMount(); this.setState({both : 1})}} checked={this.state.both == 1} /> {this.props.t("Pages.object.Show both")}

            </Col>
            </Col>

         
            </Row>
            <Row noGutters={true}>
              <Col className="font20 bold col-xs-12">
                
                {this.props.t("Pages.object.Products that Match Your search")}
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
                               </Row>
                
              </Col>
              <Col className="col-xs-1">
                
              </Col>
            </Row>


            <br></br>       
                                    <div className="text-center">
                                      {this.state.totalproducts > this.state.currentPage * 12 
                                      ?
                                      <span className="seemore1 " onClick={()=>{this.addMoreProducts()}}>see more</span>
                                    :
                                    null
                                    }
                                    </div>
                                    <br></br>        <br></br>        <br></br>


        </Container>
        :
        
        <Container>
                                    <Row noGutters={true}>
                                      <br>
                                      </br>
                                      <br>
                                      </br>
                                      <Col className='col-xs-12 font30 bold text-center'>
                                  {this.props.t("Pages.object.Your search")} "{this.state.searchWord}" {this.props.t("Pages.object.returned no results")}
                                  
                                  
                                      </Col>
                                     
                                      <Col className='col-xs-12  text-center'>
                                      <br></br>
                                        0 {this.props.t("Pages.object.Results found")}
                                        <br></br>
                                        <br></br>
                                      </Col>
                                      
                                      <Col className='col-xs-12  light text-center'>
                                       
                                       {this.props.t("Pages.object.Please check your spelling Or try searching")}
                                      </Col>
                                      <Col className='col-xs-12 light text-center'>
                                      
                                      {this.props.t("Pages.object.something like saree duppatta etc")}

                                      </Col>
                                    </Row>
        </Container>
        }
      
           </>
           :
           <>
             <Container>
           <Row noGutters={true}>
                                      <br>
                                      </br>
                                      <br>
                                      </br>
                                      <Col className='col-xs-12 font30 bold text-center'>
Loading...                                                             
                                      </Col>
                </Row>
           </Container>
           </>
        }
                <Footer></Footer>

      </React.Fragment>
    );
  }
}

export default withTranslation()(DetailSuggestionsArtist);