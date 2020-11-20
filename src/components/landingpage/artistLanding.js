import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Container, Label } from "reactstrap";
import "./artistLanding.css";
import logos from "../../assets";
import Productcatelog from "../Products/productcatelog"
import TTCEapi from "../../services/API/TTCEapi";
import { useTranslation, withTranslation } from "react-i18next";
import changeLang from "../../services/utils/changeLang"

 class artistLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brandPic : "",
    };
  }
  componentDidMount(){
    var Languagetran=localStorage.getItem("i18nextLng");
      TTCEapi.getProfile().then((response)=>{
      if(response.data.data.user.companyDetails != null){
        if(response.data.data.user.companyDetails.logo != null){
            var brandPic = TTCEapi.ImageUrl + 'User/' + response.data.data.user.id + "/CompanyDetails/Logo/" + response.data.data.user.companyDetails.logo ;
            this.setState({
                brandPic : brandPic,
            });
        }
    }

    });
  }

    render() {

      let user = JSON.parse(localStorage.getItem("user"));

        return (
          <React.Fragment>
            <Row noGutters={true}>
              <div className="artistLanding">
                <Row noGutters={true}>
                  <div className="artistbg1 ">
                    <Row noGutters={true}>
                      <Col className="text-center greetingName">
                      {this.props.t("Pages.object.hello")}  {user.firstName}
                      </Col>
                    </Row>
                    <Row noGutters={true}>
                      <Col sm={{ size: "4" }}></Col>
                      <Col className="text-center" sm={{ size: "4" }}>
                        <img
                          className="artistbg1img profileImage"
                          src = {this.state.brandPic == "" ? logos.Smile :
                          this.state.brandPic}
                        ></img>
                      </Col>
                      <Col sm={{ size: "4" }}></Col>
                    </Row>
                    <div className={localStorage.getItem('i18nextLng')=="hi"?"artistbg12hindi":"artistbg12"}></div>
                  </div>
                </Row>
                <Row className="">
                  <Col sm={{ size: "12" }} className="mt40">
                    <span className="text1A ">{this.props.t("Pages.object.your products")}</span>
                    <span className="text2A col-sm-12 col-md-12">
                     
                      {this.props.t("Pages.object.List of your very own products")}
                    </span>
                  </Col>
                </Row>
                <Row><Productcatelog id={user.id}></Productcatelog></Row>

                <Row noGutters={true}>
                  <div className="artistbg2"></div>
                </Row>
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
                    className={localStorage.getItem('i18nextLng')== "hi"?"artistbg3hindi col-4 text-center":"artistbg3 col-4 text-center"}
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
export default withTranslation()(connectedLoginPage);
