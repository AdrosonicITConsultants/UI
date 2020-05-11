import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './Login.css';
import { Button, Alert } from 'reactstrap';
import logo from '../../assets/TataTrustsNewLogo.png';
import LoginRegisterApi from '../../services/API/LoginRegisterApi';
import queryString from 'query-string';

import * as actions from '../../redux/actions/actions';
import { Spinner, Row, Col } from 'react-bootstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validationMessages: [],
      form: this.defaultForm(),
      loading: false,
      visible : false
    };
  }


defaultForm = () => {
  return {
      email: '',
      password: '',
      username: '',
  }
}

inputChangedHandler(e) {

  const updatedForm = {
    ...this.state.form,
    [e.target.name]: e.target.value
  }
  let validationMessages = [];
  this.setState({
    form: updatedForm, 
    validationMessages
  });
    
}


  submitHandler = (event) => {
    //console.log("login clicked!");
    event.preventDefault();

    let params = queryString.parse(this.props.location.search)

    if(this.props.userTypeId === 1) {
      this.props.onLogin(this.state.form.email, this.state.form.password)
      
    }
    else if(this.props.userTypeId === 2) {
      this.props.onPatientLogin(this.state.form.username, this.state.form.password)
      
    }
    else {
      this.props.onLogin(this.state.form.email, this.state.form.password, params.token)
    }
    // {
    //   this.props.userTypeId === 2 ? 
    //   this.props.onPatientLogin(this.state.form.username, this.state.form.password) : 
    //   {
    //     this.props.userTypeId === 3 ? this.props.onLogin(this.state.form.email, this.state.form.password, params.token) :
    //   this.props.onLogin(this.state.form.email, this.state.form.password)
    //   }
    // }

    this.setState({
      visible: true
    }, () => {
      window.setTimeout(() => {
        this.setState({
          visible: false
        })
      }, 5000)
    });
    
  }

render() {

  if(this.props.user) {
    let userId = Number(this.props.userTypeId);

    if(userId === 1) {
      this.props.history.push('/creditpartnerHome');
    }else if(userId === 2) {
      this.props.history.push('/patientHome');
    }else if (userId === 3){
      this.props.history.push('/traineeHome');
    }else{
      this.props.history.push('/adminHome');
    }
  }
return (
  <React.Fragment>
    <div class="container">
      <div class="row">
          <div class="col-md-6 offset-md-3 text-center">
            <div className="container-box text-center">
              <div class="logo">
                <img src={logo} className="tthomelogo"/>
              </div>
              {/* <h4>Centre for Oncopathology </h4> */}
              <h2>Sign In</h2>
              <div className="login-box-inner">
                <form onSubmit={this.submitHandler}>
                  <div class="form-group">
                  {
                    this.props.userTypeId === 2 ? 
                    <span class="has-float-label">
                      <input class="form-control" id="username" name="username" type="text" placeholder="Mobile No." value={this.state.form.username} onChange={(event) => this.inputChangedHandler(event)}/>
                      <label for="username" className="patientLabel">Mobile No.</label>
                    </span>
                    :
                    <span class="has-float-label">
                      <input class="form-control" id="username" name="email" type="text" placeholder="Username" value={this.state.form.email} onChange={(event) => this.inputChangedHandler(event)}/>
                      <label for="username" className="patientLabel">Username</label>
                    </span>
                  }
                  </div>
                  <div class="form-group">
                    <span class="has-float-label">
                      <input class="form-control" id="password" name="password" type="password" placeholder="Password" value={this.state.form.password} onChange={(event) => this.inputChangedHandler(event)}/>
                      <label for="password" className="patientLabel">Password</label>
                    </span>
                  </div>
                  <div className="register-text forgotpass-text" style={{textAlign: 'left'}}><span>
                  <Link to="/forgotpassword">Forgot Password ?</Link></span></div>
                  <Button className="button-lightred" size="lg" style={{width: '190px'}} >Submit</Button>{' '}
                  {this.props.loading ? 
                                <Row>
                                <Col md={12} className="mt-3 text-center">
                                    <Spinner animation="border" variant="danger" className="text-center" />
                                </Col>
                                </Row>
                                 : null}

                  {
                    this.props.userTypeId === 1 ? 
                    null
                    :
                    <div className="register-text">
                      <span>New User ? &nbsp;</span>

                      {
                        this.props.userTypeId === 2 ? 
                      <span><Link to="/patient-request-otp">Register here.</Link></span> : 
                      <span><Link to="/register-form">Register here.</Link></span>
                      }

                    </div>
                  }
                  
                  {this.props.invalidData === "403" ?
                    <Alert className="mt-3" color="danger" isOpen={this.state.visible}>Invalid Credentials</Alert>
                    : null }
                  {this.props.invalidData === "601" ?
                    <Alert className="mt-3" color="danger" isOpen={this.state.visible}>User not registered. Please register.</Alert>
                    : null }
                  <h5>{this.props.success}</h5>
                </form>
              </div>
            </div>
            
          </div>
      </div>
      {/* <div className="privacy-text"><span>Terms</span> | <span>Privacy</span></div> */}
    </div>
    </React.Fragment>
);
}
}

const mapStateToProps = state => {
  return {
      loading: state.loading,
      error: state.error,
      success: state.success,
      userTypeId: state.userTypeId,
      isAuthenticated: state.token !== null,
      token: state.token,
      user: state.user,
      invalidData: state.invalidData
      // isAuthenticated: state.token !== null,
      // authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onLogin: (username, password, token) => dispatch(actions.login(username, password, token)),
      onPatientLogin: (username, password) => dispatch(actions.patientLogin(username, password)),
      // onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));