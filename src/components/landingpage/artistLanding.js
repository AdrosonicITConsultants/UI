import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Container, Label } from "reactstrap";
import "./artistLanding.css";
import logos from "../../assets";
import Productcatelog from "../Products/productcatelog"
import TTCEapi from "../../services/API/TTCEapi";


 class artistLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brandPic : "",
    };
  }
  componentDidMount(){
    TTCEapi.getProfile().then((response)=>{
      if(response.data.data.user.companyDetails != null){
        if(response.data.data.user.companyDetails.logo != null){
            var brandPic = TTCEapi.ImageUrl + 'User/' + response.data.data.user.id + "/CompanyDetails/Logo/" + response.data.data.user.companyDetails.logo ;
            this.setState({
                brandPic : brandPic,
            });
            console.log(brandPic);

        }
    }

    });
  }




  
    render() {
        return (
          <React.Fragment>
            {console.log(this.props.user)}
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
                          className="artistbg1img profileImage"
                          // src={logos.uploadphoto}
                          src = {this.state.brandPic == "" ? logos.Smile :
                          this.state.brandPic}
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
                <Row><Productcatelog id={this.props.user.id}></Productcatelog></Row>

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
