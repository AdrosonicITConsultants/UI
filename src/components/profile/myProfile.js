import React, { Component } from 'react'
import '../navbar/navbar.css';
import NavbarComponent from "../navbar/navbar";
import { connect } from "react-redux";
import * as Actions from "../../redux/action/action";
import BuyerProfile from "./buyerProfile";
import ArtistProfile from "./artistProfile";



class MyProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {                                  
         
        };
     


        
      }
      
    render() {
        let user = JSON.parse(localStorage.getItem("user"));
        return (

            <React.Fragment>
                   {/* <NavbarComponent/> */}
                   {user.refRoleId == 1 ?
                   <ArtistProfile/>
                    :   
                    <BuyerProfile/>}
            </React.Fragment>         
                            
        )
    }
}

function mapStateToProps(state) {
 
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(MyProfile);
export default connectedLoginPage;

