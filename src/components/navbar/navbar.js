import React, {Component} from 'react';
import logos from "../../assets";
import './navbar.css';
import { connect } from "react-redux";
import * as Actions from "../../redux/action/action";



import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
  DropdownItem
} from 'reactstrap';

class NavbarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      activeTabClassName: window.location.pathname,
      openMenu: false,
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  toggleMobileMenu = () => {
    this.setState({
      openMenu: !this.state.openMenu,
    });
  };

  logout= (event) =>{
   this.props.dispatch(Actions.logout());
   
  }

  render() {
    let isAuthenticated = localStorage.getItem("userTypeId") !== null;
    let userTypeId = localStorage.getItem("userTypeId");

    return (
      <React.Fragment>
        <nav
          className="menu navbarTransparent navbar-expand-sm"
          onClick={this.toggleMobileMenu}
        >
          <ol className={this.state.openMenu ? "mobile_menu" : ""}>
            {userTypeId === "2" ? (
              <li class="menu-item">
                <a
                  href="/patientHome"
                  className={
                    this.state.activeTabClassName === "/patientHome"
                      ? "active"
                      : ""
                  }
                >
                  Home
                </a>
              </li>
            ) : null}
            {userTypeId === "1" ? (
              <li className="menu-item">
                <a
                  href="/creditpartnerHome"
                  className={
                    this.state.activeTabClassName === "/creditpartnerHome"
                      ? "active"
                      : ""
                  }
                >
                  Home
                </a>
              </li>
            ) : null}
            {userTypeId === "3" ? (
              <li className="menu-item">
                <a
                  href="/traineeHome"
                  className={
                    this.state.activeTabClassName === "/traineeHome"
                      ? "active"
                      : ""
                  }
                >
                  Home
                </a>
              </li>
            ) : null}
            <li className="menu-item">
              <a
                href="/"
                className={
                  this.state.activeTabClassName === "/" ? "active" : ""
                }
              >
                <img className="navbarLogo" src={logos.mainlogoside}></img>
              </a>

              <ol class="sub-menu">
                {/* <li class="menu-item"><a href="/aboutCOP">About COP</a></li> */}
              </ol>
            </li>
            <li class="menu-item">
              {/* <a href="/joinTeam" className={(this.state.activeTabClassName === "/joinTeam") || (this.state.activeTabClassName === "/careers") ? "active" : ""}>Custom design inquiry</a> */}
              <button className="navButton navbtn1">
                <img className="navButtonImg" src={logos.navbarbtn1}></img>
                <span className="navButtonImg">New custom design</span>
              </button>
            </li>
            <li className="menu-item-space menu-item"></li>
            {/* <li class="menu-item">
      <a href="#" className={(this.state.activeTabClassName === "/testslist") || (this.state.activeTabClassName === "/antibodies")? "active" : ""}>Lab Services</a>
      <ol class="sub-menu">
        <li class="menu-item"><a href="/testslist">List of Tests Offered</a></li>
        <li class="menu-item"><a href="/antibodies">List of Antibodies</a></li>
        {!isAuthenticated ?
        <li class="menu-item"><a href="/register">Order a Test</a></li>
        : null
        }
      </ol>
    </li> */}

            {/* <li class="menu-item"><a href="#0">Accreditations</a></li> */}
            <li class="menu-item">
              <img className="navButtonImg" src={logos.searchlogo}></img>
            </li>
            <li class="menu-item">
              <img className="navButtonImg" src={logos.favoriteicon}></img>
            </li>
            <li class="menu-item">
              <img className="navButtonImg" src={logos.chaticon}></img>
            </li>
            <li class="menu-item">
              <img className="navButtonImg" src={logos.notificationsicon}></img>
            </li>
            {userTypeId === "3" || userTypeId === null ? (
              <li class="menu-item">
                <button className="navButton navbtn2" style={{ width: "10em" }}>
                  <img className="navButtonImg1" src={logos.receipticon}></img>
                  <span className="navButtonImg">My inquiries</span>
                </button>
                {/* <ol class="sub-menu">
        <li class="menu-item"><a href="/courses-offered">Courses Offered</a></li>
        <li class="menu-item"><a href="#0">Timetable</a></li>
        {!isAuthenticated ?
        <li class="menu-item"><a href="/login">Trainee Sign In</a></li>
        : null
        }
      </ol> */}
              </li>
            ) : null}
            <li class="menu-item">
              <a
                href="#"
                className={
                  this.state.activeTabClassName === "/testslist" ||
                  this.state.activeTabClassName === "/antibodies"
                    ? "active"
                    : ""
                }
              >
                <img src={logos.usernamelogo}></img>
              </a>
              <ol class="sub-menu">
                <li
                  class="menu-item"
                  style={{ borderBottom: "dashed 2px red" }}
                >
                  {this.props.user.firstName + this.props.user.lastName}{" "}
                  <img style={{ width: "10px" }} src={logos.closelogo}></img>
                </li>
                <li class="menu-item">
                  <a href="/">My Profile</a>
                </li>
                <li class="menu-item">
                  <a href="/">Transactions</a>
                </li>
                <li class="menu-item">
                  <a href="/">My orders</a>
                </li>
                <li class="menu-item">
                  <a href="/">Dashboard</a>
                </li>
                <li class="menu-item">
                  <a href="/">Support</a>
                </li>
                {!isAuthenticated ? (
                  <li class="menu-item">
                    <a onClick={this.logout}>Logout</a>
                  </li>
                ) : null}
              </ol>
            </li>
          </ol>
        </nav>
      </React.Fragment>
    );
  }
}


               function mapStateToProps(state) {
                 const {user}  = state
                 return { user };
               }

 const connectedLoginPage = connect(mapStateToProps)(NavbarComponent);
 export default connectedLoginPage;
