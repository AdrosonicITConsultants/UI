import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Container, Label } from "reactstrap";
import logos from "../../assets";
import "./productcatelog.css";
import Product from "./Product"

class productcatelog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmpass: "",
      showValidationpass: false,
      showValidationconfirmpass: false,
    };
  }
  componentDidMount() {
  
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <div>
            
              {this.props.ProductList.map((items) => {
                debugger;
                return (
                  <>
                    <div className="ProductList col-12 mx-auto col-md-12 col-lg-12 my-10">
                      <Row style={{ margin: "20px" }} noGutters={true}>
                        <Col className="col-sm-1 col-md-1 col-1">
                          <span className="text1PC">{items.category}</span>
                        </Col>

                        {/* <Col className="col-sm-4 col-md-4 hrline1"></Col> */}
                        <Col className="col-sm-9 col-md-9 col-9">
                          <div class="separator text2PC">
                            {" "}
                            Showing 4 of {items.count}
                          </div>
                          {/* <span className="text2PC">
                            Showing 4 of {items.count}
                          </span> */}
                        </Col>
                        {/* <Col className="col-sm-4 col-md-4 hrline1"></Col> */}
                        <Col className="w10 col-sm-2 col-md-2 col-2 text-right">
                          <span className="seemore">See More</span>
                        </Col>
                      </Row>
                      <Row
                        className="ProductListMargin"
                        style={{ margin: "20px" }}
                        noGutters={true}
                      >
                        {items.Products.map((product) => (
                          <Product
                            key={product.id}
                            productList={product}
                          ></Product>
                        ))}
                      </Row>
                    </div>
                  </>
                );
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
    },
    {
      id: 2,
      title: "Google Pixel - Black",
      img: "img/product-1.png",
      price: 10,
      company: "GOOGLE",
      count: 0,
      total: 0,
      exclusive: true,
      inStock: true,
    },

    {
      id: 3,
      title: "Google Pixel - Black",
      img: "img/product-1.png",
      price: 10,
      company: "GOOGLE",
      count: 0,
      total: 0,
      exclusive: false,
      inStock: false,
    },

    {
      id: 4,
      title: "Google Pixel - Black",
      img: "img/product-1.png",
      price: 10,
      company: "GOOGLE",
      count: 0,
      total: 0,
      exclusive: true,
      inStock: false,
    },
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
export default connectedLoginPage;

