import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import "../register/artist/artistRegister.css";
// import Buyerlogin from "../../buyer/buyeruser";
import Forgotpass1 from "./forgotpass1";
import Forgotpass2 from "./forgotpass2";
import Forgotpass3 from "./forgotpass3";

export default class ForgotpassRouter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userpage: 0,   
      emailid: "",
      password: "",
    
    };
    this.handler = this.handler.bind(this);
  //  this.checkweaverid = this.checkweaverid.bind(this);
    this.sendotp = this.sendotp.bind(this);
    this.storepassword = this.storepassword.bind(this);
 //   this.storedetails1 = this.storedetails1.bind(this);
  }

  renderSection(num) {
    switch (num) {
      case 0:
        return (
          <Forgotpass1
            handler={this.handler}
            so={this.sendotp}
            co={this.checkotp}
          />
        );
        break;
      case 1:
        return <Forgotpass2 handler={this.handler} sp={this.storepassword} />;
        break;
      case 2:
        return <Forgotpass3 handler={this.handler} sp={this.storepassword} />;
        break;

      default:
        break;
    }
  }
  
  storepassword(password) {
    this.setState({ password: password });
    console.log(password);
  }
  sendotp(emailid) {
    console.log(emailid);
    this.setState({ emailid: emailid });
  }
  checkotp(otppin) {
    console.log(otppin);
  }
 

  handler(num) {
    this.setState({ userpage: num }, () => {
      console.log(this.state.userpage);
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="registerimg">
          <Container>
            <Row noGutters={true} className="mt-5">
              {this.renderSection(this.state.userpage)}
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}
