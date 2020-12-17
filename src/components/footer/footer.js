import React, { Component } from 'react'
import "./footer.css"
import { Row, Col, Container } from "reactstrap";
import { logRoles } from '@testing-library/react';
import logos from "../../assets"
import TTCEapi from '../../services/API/TTCEapi';
import { useTranslation, withTranslation } from "react-i18next";
import Moment from 'react-moment';

class Footer extends Component {
  constructor() {
    super();

    this.state = {
      userId : "",  
    };
  
  }

  componentDidMount () {
    var data = JSON.parse(localStorage.getItem("user"));
    this.setState({
      userId: data.refRoleId
    });
  }

    render() {
      
        return (
          <>
            <div className="footerblack ">
            <Container className='footerContainer'>
              {/* <Row noGutters={true}>
                <Col className="col-xs-12 text-center">
                <div style={{marginBottom: "20px"}}>16-12-20  <span style={{marginLeft: "5px"}}>V-6</span></div>
                </Col>
              </Row> */}
              <Row noGutters={true}>
                <Col md="4" sm="4" xs="4" className="text-center">
                  <span
                    className="col-md-12 Ffont1 text-left"
                    style={{ marginLeft: "9px" }}
                  >
                    {this.state.userId == "1" ?
                    this.props.t("Pages.object.followUsOn")
                    :
                    "Follow us on"}
                  </span>
                  <br />
                  <br />

                  <span className="col-md-8 text-left" style={{ marginLeft: "9px" }}>
                  <a href="https://www.facebook.com/antarantransformingcrafts" target="_blank"><img src={logos.facebook} style={{height:"25px",marginRight:"20px"}}/></a>                     
                  <a href="https://www.instagram.com/antaran_transformingcrafts/" target="_blank"><img src={logos.insta} style={{height:"25px",marginRight:"20px"}}/></a>
                  <a href="https://www.youtube.com/channel/UCacuDD60s97KY1LqYmAj1fQ/" target="_blank"><img src={logos.youTubeLogo} style={{height:"20px",marginRight:"20px"}}/></a>
                  <a href="https://www.linkedin.com/company/antaran-transforming-crafts/" target="_blank"><img src={logos.linkedinLogo} style={{height:"25px",marginRight:"10px"}}/></a>
                  {/* <a href="" target="_blank"> <img src={logos.twitter} style={{height:"25px",marginRight:"10px"}}/></a> */}
                  </span>
                  <br />
                  <br />

                  <span
                    style={{ marginLeft: "9px" }}
                    className="col-md-12 Ffont1 text-left"
                  >
                    © <Moment format="YYYY" date={new Date()} /> CRAFT XCHANGE . ALL RIGHTS RESERVED.
                  </span>
                </Col>
                <Col md="4" sm="4" xs="4" className=" Ffont1 text-center">
                  {this.state.userId == "1" ?
                    this.props.t("Pages.object.forAnyhelp")
                    :
                    "For any help"}
                  
                  <br />
                  <span className="Ffont2">
                  {this.state.userId == "1" ?
                    this.props.t("Pages.object.writeUsOn")
                    :
                    "Write us on craftxchange.tatatrusts@gmail.com"}
                    
                  </span>
                  <br />
                  <br />
                  {/* <div>
                  {this.state.userId == "1" ?
                    this.props.t("Pages.object.registeredAddress")
                    :
                    "Registered address"} :
                    <p className="Ffont2">
                      abc gali,abc xyz,
                      <br />
                      Mumbai, MH
                    </p>
                  </div> */}
                </Col>
                <Col md="4" sm="4" xs="4" className=" Ffont1 text-center">
                  <span>                    
                  {this.state.userId == "1" ?
                    this.props.t("Pages.object.DownloadAppOn")
                    :
                    "Download Craft Xchange App On"}
                  </span>
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
                    <a 
                    href={TTCEapi.DocumentsURL + "PRIVACY%20POLICY.pdf"}
                     target="_blank">
                    <p className="Ffont3 col-md-4 col-sm-4  text-center">
                    {this.state.userId == "1" ?
                    this.props.t("Pages.object.privacyPolicy")
                    :
                    "Privacy policy"}                      
                    </p>
                    </a>
                    <a href={TTCEapi.DocumentsURL + "TERMS_and_CONDITIONS.pdf"}
                       target="_blank">
                    <p className="Ffont3 col-md-4 col-sm-4  text-center">  
                    {this.state.userId == "1" ?
                    this.props.t("Pages.object.termsOfUsage")
                    :
                    "Terms of Usage"}                                          
                      
                    </p>
                    </a>
                    <a href={TTCEapi.DocumentsURL + "LEGAL%20DISCLAIMER.pdf"}
                       target="_blank">
                    <p className="Ffont3 col-md-4 col-sm-4  text-center">
                    {this.state.userId == "1" ?
                    this.props.t("Pages.object.cookiePolicy")
                    :
                    "Cookie policy"}                      
                      
                    </p>
                    </a>
                  </div>
                </Col>
              </Row>
              </Container>

            </div>
            </>
        );
    }
}

export default withTranslation()(Footer);