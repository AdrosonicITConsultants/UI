import React, { Component } from 'react'
import { connect } from "react-redux";
import logos from "../../assets";
import { Row, Col , Container, Button} from 'reactstrap';
import NavbarComponent from "../navbar/navbar";
import Footer from "../footer/footer";
import "./ArtisianProductCategory.css"; 
import queryString from 'query-string';
import TTCEapi from '../../services/API/TTCEapi';
import ProductOfArtisian from './ProductOfArtisian';
import { memoryHistory, browserHistory } from "../../helpers/history";

import { useTranslation, withTranslation } from "react-i18next";



 class ArtisianProductCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heading : "",
            products : "",
            clusterid : -1,
        };
      }
      backoperation(){
        browserHistory.push("/home"); 
    }  
      componentDidMount(){
        let params = queryString.parse(this.props.location.search);
        console.log(params);
        TTCEapi.getArtisianProductCategory(parseInt(params.userid), parseInt(params.categoryid)).then((response)=>{
            console.log(response.data.data);
            this.setState({
                dataload : true,
                heading : response.data.data.productCategory,
                products : response.data.data.products
               });
        });
        // TTCEapi.getClusters().then((response)=>{
        //     this.setState({clusterdata : response.data.data});

        // });
    }
    render() {
        return (
            <React.Fragment>
                {console.log(this.state.products.length)}
               {this.state.dataload == true 
                   
                   ? 
                   <>
                   <NavbarComponent/>
                   <Container className="cpbackground1">
                       
                       <Row noGutters={true} className="cpheadmargin">
                           <Col sm = "1">
                           <img
                                       src={logos.backarrowicon}
                                       className="margin-cparrow cparrowsize glyphicon"
                                        onClick={() => this.backoperation()}
                                   ></img>
                          
                          </Col>
                           <Col sm="10" >
                               <Row noGutters={true} className ="cp1heading bold fontplay">
                                   <Col md="12">
                                       {this.state.heading}
                                   </Col>
                               </Row>
                               <Row noGutters={true} className="mt10"> 
                                   <Col  
                                   md={{ size: "8" }}
                                   lg={{ size: "8" }} className="regular font25">
                                      {this.props.t("Pages.object.Find all your")} {this.state.heading}  {this.props.t("Pages.object.here")}.
                                   </Col>
                               </Row>
                               <Row noGutters={true} className="mt10"> 
                                   <Col  
                                   md={{ size: "8" }}
                                   lg={{ size: "8" }} className="regular">
                                        {this.props.t("Pages.object.Total")} : {this.state.products.length}  {this.props.t("Pages.object.items added")}.
                                   </Col>
                               </Row>
                               <Row noGutters={true} className="mt10"> 
                                   <Col  
                                   md={{ size: "8" }}
                                   lg={{ size: "8" }} className="regular font15">
                                      { this.props.t("Pages.object.Show Antaran co-design also") + " "} 
                                       <label class="switch">
                                            <input type="checkbox"/>
                                            <span class="slider round"></span>
                                        </label>
                                   </Col>
                               </Row>
                           
                             
                               {/* <Row noGutters="true">
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
                                  
                                </Row> */}
                                <Row noGutters="true"> 
                                {this.state.item1 = true} 
   
                                   {this.state.products.map((item) =>
                                   <div>
                                       {this.state.clusterid == -1 
                                           ? 
                                           <Col xs={12} sm={6} md={4}>
                                               {this.state.item1 = false}
                                           <ProductOfArtisian productData = {item}/>              
                                           </Col>  
                                           :
                                           
                                           <>
                                           {this.state.clusterid == item.clusterId 
                                           ?
                                           <Col xs={12} sm={6} md={4}>
                                               {this.state.item1 = false}
                                           <ProductOfArtisian productData = {item}/>              
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
                                   <Row noGutters={true} className="text-center noproduct">
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

export default withTranslation()(ArtisianProductCategory) ;
