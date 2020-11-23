import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Button} from 'reactstrap';
import '../navbar/navbar.css';
import Footer from "../footer/footer";
import { Switch, Route, Router,Link } from "react-router-dom";
import PrivateRoute from "../../services/utils/PrivateRoute";
import { memoryHistory, browserHistory } from "../../helpers/history";
import { useTranslation, withTranslation } from "react-i18next";
import TTCEapi from '../../services/API/TTCEapi';

 class ArtisanProductOfSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            proddata : this.props.productData,
            isfavHovered :false,
            imageurl : logos.dupatta,
            imageUrl : TTCEapi.ImageUrl +"Product/",
            imagename : this.props.productData.images ? this.props.productData.images.split(",")[0] : null,                   
        };
      
    }
    editProduct = (Product)=>{
        debugger;
        browserHistory.push("/EditProduct?ProductId=" + Product)
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
                    <div className="cpimagediv">
                    <> {this.state.imagename != "" 
                                  ?
                                  <img className="cpimage " src={this.state.imageUrl + this.state.proddata.id + '/' + this.state.imagename }  alt="Card image cap"/>

                                :
                                <img className="cpimage" src={this.state.imageurl}  alt="Card image cap"/>

                                
                                }
                    </>
                    {this.state.proddata.madeWithAnthran == 0 ? 
                     <div class="middle1">
                        <div
                            onClick={() => this.editProduct(this.state.proddata.id)}
                            class="text"
                        >
                            {/* Edit product2 */}
                            {this.props.t("Pages.object.Edit Product")}
                        </div>
                    </div>    
                    : null
                    }    
                   
            
                    </div>
                 
                    <Row   className="cpdetails1">
                        <Col  className=" bold fontplay col-xs-12">
                          <div className="productname1">{this.state.proddata.tag}</div> 
                        </Col>
                        <Col className="col-xs-12 mt7 mb7">
                            <div className="col-xs-6">
                            <img className="logoincard1 " src={this.state.proddata.madeWithAnthran == 0 ? logos.artisianSelfLogo : logos.antaranCoDesignLogo}  alt="Card image cap"/>
                            </div>
                            <div className="col-xs-6">
                                {this.state.proddata.status == 2 
                                ?
                                    <Row   className="stockmargin">
                                        <Col className="Available1">
                                        Available 
                                        </Col>
                                        <Col className="in_stock1">
                                        In Stock
                                        </Col>
                                    </Row>
                                :
                                    <Row   className="stockmargin exclusive">
                                        <Col className="Exclusively1">
                                        Exclusively
                                        </Col>
                                        <Col className=" Made_to_order1">
                                        Made to order
                                        </Col>
                                    </Row>
                                }                            
                            </div>
                            
                        </Col>
                       
                    </Row>
                 
               </div> 
               
        )
    }
}

export default withTranslation()(ArtisanProductOfSearch);
