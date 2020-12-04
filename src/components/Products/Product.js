import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import logos from "../../assets";
import "./product.css";
import TTCEapi from "../../services/API/TTCEapi";
import { browserHistory } from "../../helpers/history";
import { useTranslation, withTranslation } from "react-i18next";
import changeLang from "../../services/utils/changeLang"


 class Product extends Component {
   editProduct = (Product)=>{
     debugger;
     browserHistory.push("./EditProduct?ProductId=" + Product.id)
   }
   render() {
     debugger;
     const { productList } = this.props;
     const ImageUrl = TTCEapi.ImageUrl;

     return (
       <React.Fragment>
         <div className="ProductCard col-6 mx-auto col-md-6 col-sm-6 col-lg-3 my-3" >
           <Row className="mt10">
             <Col className="col-6 mx-auto col-md-6 col-sm-6 col-lg-6 my-3 PorductNameborder" style={{marginBottom:"10px",overflow:"auto"}}>
               {/* <span className="productName">Exquisite Trefoil Motifs</span> */}
               <span className="productName">{productList.tag}</span>
             </Col>
             {/* for exclusive */}
           {productList.productStatusId == 1 ? (
               <Col className="col-9 mx-auto col-md-6 col-sm-6 col-lg-6 ml-10 my-3">
                 <div className="mt10">
                   <img style={{ float: "left" }} src={logos.scissor}></img>
                   <div className="hrlineDotted"></div>
                 </div>
                 <div className="text-right lh15">
                   <span className="exclusive">
                     Exclusively
                     <br />
                   </span>
                   <span className="MadetoOrder">
                     Made to
                     <br />
                   </span>
                   <span className="MadetoOrder">order</span>
                 </div>
                 <div className="mt32"></div>
               </Col>
             ) : (
               <>
                 <Col className="col-9 mx-auto col-md-6 col-sm-6 col-lg-6 ml-10 my-3">
                   <div className="text-right mt10 lh15">
                    
                       <>
                         <span className="instock">
                           In stock
                           <br />
                           
                         </span>
                         
                         {/* <span className="Qnty">
                           {5} Qnty
                           <br />
                         </span> */}
                       </>
                    
                   </div>
                 </Col>
                 <div className="col-12 mx-auto col-sm-12 col-md-12 mt10 col-lg-12">
                   <div className="hrline2PC "></div>
                   <img className="scissor" src={logos.scissor}></img>
                   <span className="MadetoOrder">Available</span>
                   <div className="hrline3PC"></div>
                 </div>
               </>
             )}
           </Row>

           <Row>
             <Col className="ProductImageContainer">
               <div className="Imagecontainer">
                 <img
                   className="ProductImage image"
                  
                   src={(productList.productImages.length > 0 ? ImageUrl + "Product/" + productList.id + "/" + productList.productImages[0].lable : logos.coImageHovered )}                 
                   
                
                 ></img>
                 <div class="middle">
                   <div
                     onClick={() => this.editProduct(productList)}
                     class="text"
                   >
                    {this.props.t("Pages.object.Edit Product")}
                   </div>
                 </div>
               </div>
             </Col>
           </Row>

           <div></div>
         </div>
       </React.Fragment>
     );
   }
 }


function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

const connectedLoginPage = connect(mapStateToProps)(Product);
// export default connectedLoginPage;
export default withTranslation()(connectedLoginPage);
