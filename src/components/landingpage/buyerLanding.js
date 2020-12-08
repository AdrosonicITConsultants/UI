import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Container, Label } from "reactstrap";
import "./landingpage.css";
import logos from "../../assets";
import { browserHistory } from "../../helpers/history";
import CMSApi from '../../services/API/CMSApi';

var buyerLandingBg = {};
var cardBg1 = {};
var cardBg2 = {};
var cardBase = {};
var artisanBg = {};
var artisanExtendedBg = {};
var antaranBg = {};
var antaranExtendedBg = {};

class buyerLanding extends Component {

  constructor(props) {
    super(props);

      this.state = {
        buyerPageData : "",
        showBuyerPage : false,
      };
  }

  ExploreMore = (to) => {
    switch (to) {
      case "Self":
        browserHistory.push("./Artisanself");

        break;
      case "New":
         browserHistory.push("./Antaran");

        break;
      default:
        break;
    }
  }

  componentDidMount () {
    CMSApi.getPages(27).then((response)=>{
      if(response)
      {
          this.setState({
            buyerPageData : response.data.acf
          })
          this.setHomeBgImage();
      }
    })
   }

   setHomeBgImage = () => {
    buyerLandingBg = {
      backgroundImage: "url(" + this.state.buyerPageData.background_image + ")"
    };

    cardBg1 = {
      backgroundImage: "url(" + this.state.buyerPageData.card_background_1 + ")"
    }

    cardBg2 = {
      backgroundImage: "url(" + this.state.buyerPageData.card_background_2 + ")"
    }

    cardBase = {
      backgroundImage: "url(" + this.state.buyerPageData.card_base + ")"
    }

    artisanBg = {
      backgroundImage: "url(" + this.state.buyerPageData.artisan_background + ")"
    }

    artisanExtendedBg = {
      backgroundImage: "url(" + this.state.buyerPageData.artisan_background_extended + ")"
    }

    antaranBg = {
      backgroundImage: "url(" + this.state.buyerPageData.antaran_background + ")"
    }

    antaranExtendedBg = {
      backgroundImage: "url(" + this.state.buyerPageData.antaran_background_extended + ")"
    }


    this.setState({
      showBuyerPage : true
    })
   }

  render() {
    return (
    
      <React.Fragment>
      {this.state.showBuyerPage ?
      <div>
          <Row noGutters={true}>
            <div className="homeDivmain" style={buyerLandingBg}>
              <br></br>

              <Row noGutters={true} className="topmarginHome">
                <Col sm={{ size: "1" }}></Col>
                <Col sm={{ size: "6" }}>
                  <div>
                    <h2 className="textline1">
                      {this.state.buyerPageData.title}
                    </h2>
                    <h6 className="textline2">
                    {this.state.buyerPageData.paragraph}
                    </h6>
                  </div>
                </Col>
              </Row>
              <Row noGutters={true}>
                <Col sm={{ size: "1" }} className="center"></Col>
                <Col sm={{ size: "10" }}>
                  <div className="carousal">
                    <div className="carousalbg" style={cardBg1}>
                      <p className="carousaltext1">
                      {this.state.buyerPageData.card_header}
                      </p>
                      <p className="carousaltext2">{this.state.buyerPageData.card_title}</p>
                      <p className="carousaltext3">
                      {this.state.buyerPageData.card_para}
                      </p>
                    </div>
                    <div className="carousalbg2" style={cardBg2}></div>
                  </div>
                </Col>
                <Col sm={{ size: "1" }} className="center"></Col>
              </Row>
            </div>
          </Row>

          <Row noGutters={true}>
            <div className="homeDiv2" style={cardBase}>
              <Row noGutters={true}>
                <Col sm={{ size: "12" }} className="text-center choosefromtext">
                  <span>Choose from</span>
                </Col>
              </Row>

              <Row noGutters={true}>
                <Col sm={{ size: "6" }} className="center">
                  <div className="mainDivTransitionleft">
                    <div className="Homebg2div1 artistunHover" style={artisanBg}>
                      <p>Artisan</p> <p>self design</p>
                    </div>
                    <div className="Homebg2div4">
                      <div className="artistHover" style={artisanExtendedBg}>
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
                        <div className="textline3" style={{marginLeft: '30px'}}>
                        {this.state.buyerPageData.artisan_para}
                        </div>
                      </div>

                      <div className="textline4" style={{marginLeft: '50px'}}>
                      {this.state.buyerPageData.artisan_sub_para}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col sm={{ size: "6" }} className="center">
                  <div className="mainDivTransitionright">
                    <div className="Homebg2div2 counHover" style={antaranBg}>
                      {" "}
                      <p>Antaran</p>
                      <p>co-design</p>
                    </div>

                    <div className="Homebg2div3">
                      <div className="coHover" style={antaranExtendedBg}>
                        <Label
                          onClick={() => this.ExploreMore("New")}
                          className="exploremore"
                        >
                          Explore more <strong>></strong>
                        </Label>
                        <p>Antaran</p> <p>co-design</p>
                        <hr className="hrlineLeft"></hr>
                        <br />
                        <div className="textline3" style={{marginRight: '30px'}}>
                        {this.state.buyerPageData.antaran_para}
                        </div>
                      </div>

                      <div className="textline4" style={{marginRight: '50px'}}>
                      {this.state.buyerPageData.antaran_sub_para}
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
              {this.state.buyerPageData.quote_message}
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
          </div>
          : null }
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
