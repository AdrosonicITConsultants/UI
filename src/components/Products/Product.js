import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import logos from "../../assets";
import "./product.css";



 class Product extends Component {
   editProduct = (Product)=>{
       console.log(Product);
   }
   render() {
     let exclusive = false;
     debugger;
     const { productList } = this.props;
     return (
       <React.Fragment>
         <div className="ProductCard col-6 mx-auto col-md-6 col-sm-6 col-lg-3 my-3">
           <Row className="mt10">
             <Col className="col-6 mx-auto col-md-6 col-sm-6 col-lg-6 my-3 PorductNameborder">
               <span className="productName">Exquisite Trefoil Motifs</span>
             </Col>
             {/* for exclusive */}
             {productList.exclusive ? (
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
                     {productList.inStock ? (
                       <>
                         <span className="instock">
                           In stock
                           <br />
                         </span>
                         <span className="Qnty">
                           {5} Qnty
                           <br />
                         </span>
                       </>
                     ) : (
                       <span className="outofstock">
                         Out of
                         <br />
                         stock
                         <br />
                       </span>
                     )}
                   </div>
                 </Col>
                 <div className="col-12 mx-auto col-sm-12 col-md-12 mt10 col-lg-12">
                   <div className="hrline2PC "></div>
                   <img className="scissor" src={logos.scissor}></img>
                   <span className="MadetoOrder">Made to order</span>
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
                   src={logos.coImageHovered}
                 ></img>
                 <div class="middle">
                   <div
                     onClick={(productList) => this.editProduct(productList)}
                     class="text"
                   >
                     Edit product
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
export default connectedLoginPage;