import React, { Component } from "react";
import { connect } from "react-redux";

import { Row, Col, Container, Label } from "reactstrap";
import "./landingpage.css";
import logos from "../../assets";
import { browserHistory } from "../../helpers/history";

class buyerLanding extends Component {
  ExploreMore = (to) => {
    switch (to) {
      case "Self":
        console.log(to);
        browserHistory.push("./Artisanself");

        break;
      case "New":
        console.log(to);
         browserHistory.push("./Antaran");

        break;
      default:
        break;
    }
  };

  render() {
    return (
      <React.Fragment>
     
          <Row noGutters={true}>
            <div className="homeDivmain">
              <br></br>

              <Row noGutters={true} className="topmarginHome">
                <Col sm={{ size: "1" }}></Col>
                <Col sm={{ size: "6" }}>
                  <div>
                    <h2 className="textline1">
                      Timeless pieces of Indian handicrafts
                    </h2>
                    <h6 className="textline2">
                      Legacies touch every nook and corner of the country, and
                      there are distinct ones which are evergreen, full of pride
                      and joy of traditions.
                    </h6>
                  </div>
                </Col>
              </Row>
              <Row noGutters={true}>
                <Col sm={{ size: "1" }} className="center"></Col>
                <Col sm={{ size: "10" }}>
                  <div className="carousal">
                    <div className="carousalbg">
                      <p className="carousaltext1">
                        Browse the latest collection of
                      </p>
                      <p className="carousaltext2">Brocades of Benaras</p>
                      <p className="carousaltext3">
                        Beautifully handcrafted collection from Varanasi’s
                        traditional handlooms, spun to the sound of holy Ganga
                        river.
                      </p>
                    </div>
                    <div className="carousalbg2"></div>
                  </div>
                </Col>
                <Col sm={{ size: "1" }} className="center"></Col>
              </Row>
            </div>
          </Row>

          <Row noGutters={true}>
            <div className="homeDiv2">
              <Row noGutters={true}>
                <Col sm={{ size: "12" }} className="text-center choosefromtext">
                  <span>Choose from</span>
                </Col>
              </Row>

              <Row noGutters={true}>
                <Col sm={{ size: "6" }} className="center">
                  <div className="mainDivTransitionleft">
                    <div className="Homebg2div1 artistunHover">
                      <p>Artisan</p> <p>self design</p>
                    </div>
                    <div className="Homebg2div4">
                      <div className="artistHover">
                        <Label
                          style={{ left: "-2px" }}
                          onClick={() => this.ExploreMore("Self")}
                          className="exploremoreLeft"
                        >
                          Explore more <strong>></strong>
                        </Label>
                        <h3>Artisan</h3> <h3>self design</h3>
                        <hr className="hrline1"></hr>
                        <br />
                        <div className="textline3">
                          <p>
                            Choose from the production ready designs which speak
                            the
                          </p>
                          <p> tradition & legacy from their own cluster and</p>
                          <p>history of master craftsmanship</p>
                        </div>
                      </div>

                      <div className="textline4">
                        <p>
                          This collection from the very own artisans’ evergreen
                          <br></br> styles and traditions. It is still classic
                          yet compliments<br></br>
                          the modern outfits and stands apart.
                        </p>
                        <p className="margin30">
                          The products from artisans speak the value and legacy
                          <br></br> of their own respective clusters and
                          culture. It is as
                          <br></br> elegant as strong.
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col sm={{ size: "6" }} className="center">
                  <div className="mainDivTransitionright">
                    <div className="Homebg2div2 counHover">
                      {" "}
                      <p>Antaran</p>
                      <p>co-design</p>
                      <p>collection</p>
                    </div>

                    <div className="Homebg2div3">
                      <div className="coHover">
                        <Label
                          onClick={() => this.ExploreMore("New")}
                          className="exploremore"
                        >
                          Explore more <strong>></strong>
                        </Label>
                        <p>Antaran</p> <p>co-design collection</p>
                        <hr className="hrlineLeft"></hr>
                        <br />
                        <div className="textline3">
                          <p>
                            Choose from the production ready designs which speak
                            the
                          </p>
                          <p> tradition & legacy from their own cluster and</p>
                          <p>history of master craftsmanship</p>
                        </div>
                      </div>

                      <div className="textline4">
                        <p>
                          This collection from the very own artisans’ evergreen
                          <br></br> styles and traditions. It is still classic
                          yet compliments<br></br>
                          the modern outfits and stands apart.
                        </p>
                        <p className="margin30">
                          The products from artisans speak the value and legacy
                          <br></br> of their own respective clusters and
                          culture. It is as
                          <br></br> elegant as strong.
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Row>

          <Row noGutters={true}>
            <Col className="internaldiv homeDiv3 text-center reviewtext">
              <div className="text1">And our Artisan say that</div>
              <img className="quote" src={logos.quoteicon}></img>
              <span>... it helped provided us a platform to show case</span>
              <br></br>
              <span>our talent, ritual roots, traditions and earn our</span>
              <br></br>
              <span>daily bread, It was magical</span>{" "}
              <img className="quote" src={logos.quoteiconend}></img>
            </Col>
          </Row>
          <Row>
            <div>
              <img
                className="HomeBg3 internaldiv"
                src={logos.background3}
              ></img>
            </div>
          </Row>
   
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

const connectedLoginPage = connect(mapStateToProps)(buyerLanding);
export default connectedLoginPage;
