import React, { Component } from 'react'
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import Footer from "../footer/footer";

import { Row, Col, Container, Label } from "reactstrap";
import "./landingpage.css"
import logos from "../../assets";
import BuyerLanding from "./buyerLanding"
import ArtistLanding from  "./artistLanding"


 class landingpage extends Component {

   ExploreMore  = (to) =>{
switch (to) {
  case "Self":  
    break;
  case "New":
     break;
  default:
    break;
}
   }

    render() {
       let isAuthenticated = this.props.user !== null;
       let user = JSON.parse(localStorage.getItem("user"));
       let userTypeId = user.refRoleId;
        return (
          <React.Fragment>
            <NavbarComponent></NavbarComponent>
            <Container>
              {userTypeId === 1 ? (
                <ArtistLanding></ArtistLanding>
              ) : (
                <BuyerLanding></BuyerLanding>
              )}

            </Container>
                          <Footer></Footer>

          </React.Fragment>
        );
    }
}


 function mapStateToProps(state) {
   
   const { user } = state;
   return { user };
 }

 const connectedLoginPage = connect(mapStateToProps)(landingpage);
 export default connectedLoginPage;