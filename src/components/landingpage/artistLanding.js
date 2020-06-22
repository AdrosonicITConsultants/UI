import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Container, Label } from "reactstrap";
import "./artistLanding.css";
import logos from "../../assets";
import Productcatelog from "../Products/productcatelog"


 class artistLanding extends Component {




  
    render() {
        return (
          <React.Fragment>
            <Row noGutters={true}>
              <div className="artistLanding">
                <Row noGutters={true}>
                  <div className="artistbg1 ">
                    <Row noGutters={true}>
                      <Col className="text-center greetingName">
                        Hello {this.props.user.firstName}
                      </Col>
                    </Row>
                    <Row noGutters={true}>
                      <Col sm={{ size: "4" }}></Col>
                      <Col className="text-center" sm={{ size: "4" }}>
                        <img
                          className="artistbg1img"
                          // src={logos.uploadphoto}
                          src=" https://f3adac-craft-exchange-resource.objectstore.e2enetworks.net/Product/45/air-bnb-logo-png-2.png"
                        ></img>
                      </Col>
                      <Col sm={{ size: "4" }}></Col>
                    </Row>
                    <div className="artistbg12"></div>
                  </div>
                </Row>
                <Row className="">
                  <Col sm={{ size: "12" }} className="mt40">
                    <span className="text1A ">Your Products</span>
                    <span className="text2A col-sm-12 col-md-12">
                      List of your very own products
                    </span>
                  </Col>
                </Row>
                <Row><Productcatelog></Productcatelog></Row>

                {/* <Row noGutters={true}>
                  <div className="artistbg2"></div>
                </Row> */}
                <Row noGutters={true} className="mt160">
                  <Col
                    sm={{ size: "4" }}
                    xs={{ size: "4" }}
                    md={{ size: "4" }}
                    className="col-4 text-center"
                  ></Col>
                  <Col
                    sm={{ size: "4" }}
                    md={{ size: "4" }}
                    xs={{ size: "4" }}
                    className="artistbg3 col-4 text-center"
                  ></Col>

                  <Col
                    sm={{ size: "4" }}
                    md={{ size: "4" }}
                    xs={{ size: "4" }}
                    className="col-4 text-center"
                  ></Col>
                </Row>
              </div>{" "}
            </Row>{" "}
          </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

const connectedLoginPage = connect(mapStateToProps)(artistLanding);
export default connectedLoginPage;
