import React, { Component } from 'react'
import "./footer.css"
import { Row, Col, Container } from "reactstrap";
import { logRoles } from '@testing-library/react';
import logos from "../../assets"



export default class Footer extends Component {
    render() {
        return (
          <>
          

            <div className="footerblack ">
            <Container className='footerContainer'>
              <Row noGutters={true}>
                <Col className="col-xs-12 text-center">
                <div style={{marginBottom: "20px"}}>22-09-20  <span style={{marginLeft: "5px"}}>V-1.1</span></div>
                </Col>
              </Row>
              <Row noGutters={true}>
                <Col md="4" sm="4" xs="4" className="text-center">
                  <span
                    className="col-md-4 Ffont1"
                    style={{ marginLeft: "9px" }}
                  >
                    Follow us on
                  </span>
                  <br />
                  <br />

                  <span className="col-md-6">
                    <i
                      className="col-md-1 col-sm-1 fa fa-facebook"
                      style={{ color: "white" }}
                    ></i>
                    <i
                      className="col-md-1 col-sm-1 fa fa-instagram"
                      style={{ color: "white" }}
                    ></i>
                    <i
                      className="col-md-1 col-sm-1 fa fa-twitter"
                      style={{ color: "white" }}
                    ></i>
                  </span>
                  <br />
                  <br />

                  <span
                    style={{ marginLeft: "9px" }}
                    className="col-md-12 Ffont1 text-left"
                  >
                    © 2020 CRAFT XCHANGE . ALL RIGHTS RESERVED.
                  </span>
                </Col>
                <Col md="4" sm="4" xs="4" className=" Ffont1 text-center">
                  
                  For any help
                  <br />
                  <span className="Ffont2">
                    Write us on help@craftexchange.com
                  </span>
                  <br />
                  <br />
                  <div>
                    Registered address:
                    <p className="Ffont2">
                      abc gali,abc xyz,
                      <br />
                      Mumbai, MH
                    </p>
                  </div>
                </Col>
                <Col md="4" sm="4" xs="4" className=" Ffont1 text-center">
                  <span>Download Creaft Xchange App On</span>
                  <br />
                  <div className="col-sm-12 text-center">
                    <br />
                    <div className="col-md-2"></div>
                    <div className="col-md-4 text-center">
                      <img className="iconWidth" src={logos.appstorebtn}></img>
                    </div>
                    <div className="col-md-4 text-center">
                      <img className="iconWidth" src={logos.playstorebtn}></img>
                    </div>
                    <div className="col-md-2"></div>
                  </div>

                  <div
                    style={{ marginTop: "10px" }}
                    className="col-md-12 col-sm-12"
                  >
                    <p className="Ffont3 col-md-4 col-sm-4  text-center">
                      Privacy policy
                    </p>
                    <p className="Ffont3 col-md-4 col-sm-4  text-center">
                      {" "}
                      Terms of Usage
                    </p>
                    <p className="Ffont3 col-md-4 col-sm-4  text-center">
                      Cookie policy
                    </p>
                  </div>
                </Col>
              </Row>
              </Container>

            </div>
            </>
        );
    }
}
