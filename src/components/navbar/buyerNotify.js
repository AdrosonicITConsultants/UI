import React, { Component } from "react";
import logos from "../../assets";
import { Row, Col, Container, Card, CardBody } from "reactstrap";
import "../navbar/navbar.css";
import { memoryHistory, browserHistory } from "../../helpers/history";
import TTCEapi from "../../services/API/TTCEapi";
import NavbarComponent from "../navbar/navbar";
import "./navbar.css";
// import Wishlist from './navbar/Wishlist';
import Footer from "../footer/footer";
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

class BuyerNotifications extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  backoperation() {
    browserHistory.push("/home");
  }

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <NavbarComponent />
        {/* {this.state.getProductsInWishlist.length==0? */}

        <>
          <body onload="window.location.reload()"></body>
          <Container className="wishlistbg">
            <Row noGutters={true}>
              <Col md="1">
                <img
                  src={logos.backarrowicon}
                  className="margin-cparrow cparrowsize glyphicon"
                   onClick={() => this.backoperation()}
                  //  onClick={() => this.props.history.go(-1)}
                ></img>
              </Col>
              <Col md="10" className="addedwishlist">
                <h1> Your Notifications</h1>
                <p> 10 New Notifications</p>
                <p style={{ float: "right" }}>
                              {/* <button className="clearmywishlist"> */}
                              <a style={{ float: "right" }}> <img
                                  className="homeiconwishlist"
                                  src={logos.clearmywishlist}
                                />
                                <span className="spanhome">
                                  Mark All As Read
                                </span></a> 
                              {/* </button> */}
                            </p>
                <Row noGutter={true}>
                  <Col md="6">
                    <p
                      style={{ float: "left" }}
                      className="Totalitemsinwishlist"
                      id="pageNumbers"
                    ></p>
                    
                  </Col>
                  <hr className="hrlineasd "></hr>
                </Row>

                {/* {this.state.getProductsInWishlist ? ( ( this.state.getProductsInWishlist.map((data) => (  */}
                <>
                  <div>
                    <Card className="wishlistcardbody">
                      <Row noGutters={true}>
                        <Col sm={12} className="srno">
                        
                        </Col>
                      </Row>
                      <Row noGutters={true}>
                        {/* Col 1                         */}
                        <Col sm={2}>
                          <div className="Wishlistitemimgdiv"></div>
                        </Col>
                        {/* col 2 */}
                        <Col sm={6} className="secondcolmargin">
                          <Row noGutters={true}>
                            <Col sm={12}>
                              <h1 className="wishlistitemcardtitle"></h1>
                            </Col>
                          </Row>
                          <Row noGutters={true}>
                            <Col sm={12}>
                              <p className="Descriptionitemp"></p>
                            </Col>
                          </Row>
                        </Col>
                        {/* Col 3 */}
                        <Col sm={3} className="Colfloatri">
                          <Row noGutters={true}></Row>
                          <Row noGutters={true}>
                            <Col sm={12}>
                              <div class="buttons"></div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card>
                  </div>
                </>
              </Col>
            </Row>
          </Container>
          {/* <Footer/> */}
        </>
      </React.Fragment>
    );
  }
}
export default BuyerNotifications;
