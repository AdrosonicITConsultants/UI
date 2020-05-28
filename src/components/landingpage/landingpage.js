import React, { Component } from 'react'
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";

 class landingpage extends Component {
    render() {
        return (
          <div>
            <NavbarComponent></NavbarComponent>
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