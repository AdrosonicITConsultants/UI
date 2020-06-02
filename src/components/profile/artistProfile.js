import React, { Component } from 'react'
import logos from "../../assets";
import '../navbar/navbar.css';
import NavbarComponent from "../navbar/navbar";
import { connect } from "react-redux";
import * as Actions from "../../redux/action/action";

class ArtistProfile extends Component {
    render() {
        return (
            <React.Fragment>
                <NavbarComponent>

                </NavbarComponent>



            </React.Fragment>
            // <div>
            //      {console.log("user data")}
            //      {console.log(this.props.user)}
            //      {"this is my profile page check console for variable"}
            // </div>
        )
    }
}

function mapStateToProps(state) {
    debugger;
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(ArtistProfile);
export default connectedLoginPage;

