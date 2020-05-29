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
                <img style={{ width: "100%" , marginTop: "-7.5%"}} src={logos.homepagebgtemp}></img>
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