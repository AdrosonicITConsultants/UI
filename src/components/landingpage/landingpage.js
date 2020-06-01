import React, { Component } from 'react'
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import Footer from "../footer/footer";

import { Row, Col, Container } from "reactstrap";
import "./landingpage.css"
import logos from "../../assets";


 class landingpage extends Component {
    render() {
        return (
          <div>
            <React.Fragment>
              <Container>
                {" "}
                <NavbarComponent></NavbarComponent>
                {/* <div class="parallax"></div> */}
                {/* <div className="homeDivmain">                 
                <div>
                  <span>
                    Timeless pieces of Indian handicrafts 
                  </span>
                </div>
                </div> */}
                <div>
                  <img className="HomeBg1" src={logos.background1}></img>
                </div>
                <div>
                  <img className="HomeBg2" src={logos.background2}></img>
                  <div className="Homebg2div1"> 
                    <p>Artisan</p> <p>self design</p> 
                   </div>
                  <div className="showhim Homebg2div2">
                    <div className="Homebg2div2 showme" >
                      {" "}
                      <p>Antaran</p> <p>co-design <p></p>collection</p>
                    </div>
                    <div className="Homebg2div3 ok">
                      <p> new div here Artisan</p> <p>self design</p>
                    </div>
                 </div>
                  
                </div>
                <div className="col-md-12 text-center">
                  <div className="text1">And our Artisan say that</div>
                  <div>
                    <img src={logos.quoteicon}></img><span>... it helped provided us a platform to show case</span>
                  </div>
                  <div><span>our talent, ritual roots, traditions and earn our</span></div>
                  <div>
                    <span>daily bread, It was magical</span> <img src={logos.quoteiconend}></img>
                  </div>
                </div>
                <div>
                  <img className="HomeBg3" src={logos.background3}></img>
                </div>
                <Footer></Footer>
              </Container>
            </React.Fragment>
          </div>
        );
    }
}


 function mapStateToProps(state) {
   debugger;
   const { user } = state;
   return { user };
 }

 const connectedLoginPage = connect(mapStateToProps)(landingpage);
 export default connectedLoginPage;