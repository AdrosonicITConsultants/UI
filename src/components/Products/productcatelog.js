import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Container, Label } from "reactstrap";
import logos from "../../assets";
import "./productcatelog.css";
import Product from "./Product"
import TTCEapi from "../../services/API/TTCEapi";
import { useTranslation, withTranslation } from "react-i18next";

class productcatelog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmpass: "",
      showValidationpass: false,
      showValidationconfirmpass: false,
      ProductListArtist: []
    };
  }
  componentWillMount() {
  
   
    TTCEapi.getArtitionProducts().then((response) => {
      if(response) {
      if (response.data.data != null){
        this.setState({ ProductListArtist: response.data.data }, () => {})
      }  
    }
    else{
      browserHistory.push("/404error");
    }  
     
    }
      );
    
  }

  render() {
    
    const ImageUrl = TTCEapi.ImageUrl;

    return (
      <React.Fragment>
        <Container>
          <div>         
            {this.state.ProductListArtist.map((items) => { 
               if (items.products.length > 0){
                return (
                  <>
                    <div className="ProductList col-12 mx-auto col-md-12 col-lg-12 my-10">
                      <Row style={{ margin: "20px", marginTop:"50px" }}  >
                        <Col className="col-sm-1 col-md-1 col-1">
                          <span className="text1PC">{items.productCategory.productDesc}</span>
                        </Col>

                        {/* <Col className="col-sm-4 col-md-4 hrline1"></Col> */}
                        <Col className="col-sm-9 col-md-9 col-9">
                          <div className="separator text2PC">
                            {items.products.length > 4 ? `Showing 4 of ${items.products.length}` : `Showing ${items.products.length} of ${items.products.length} `}
                            {" "}
                        
                          </div>
                          {/* <span className="text2PC">
                            Showing 4 of {items.count}
                          </span> */}
                        </Col>
                        {/* <Col className="col-sm-4 col-md-4 hrline1"></Col> */}
                        <Col className="w10 col-sm-2 col-md-2 col-2 text-right">
                          {items.products.length > 4 ? <span className="seemore"><a href ={"/products/?categoryid="+ items.productCategory.id + "&userid=" + this.props.id}  >{this.props.t("Pages.object.see more")}</a></span> : null}
                         
                        </Col>
                      </Row>
                      <Row
                        className="ProductListMargin"
                        style={{ margin: "20px" }}
                      
                      >                        
                        {items.products.map((product, index) => { return index < 4 ?                          
                            <Product
                              key={product.id}
                              productList={product}
                            ></Product>
                           : null} )}
                      </Row>
                    </div>
                  </>
                );
              }
               
              })}
           
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { user, productList } = state;
  const Products = [
    {
      id: 1,
      title: "Google Pixel - Black",
      img: "img/product-1.png",
      price: 10,
      company: "GOOGLE",
      count: 0,
      total: 0,
      exclusive: false,
      inStock: true,
    }
  ];
 const ProductList = [
   {
     category: "Saree",
     Products: Products,
     count: 10,
   },
   {
     category: "Pajama",
     Products: Products,
     count: 20
   },
 ];
  
  return { user, ProductList };
}

const connectedLoginPage = connect(mapStateToProps)(productcatelog);
export default withTranslation()(connectedLoginPage) ;

