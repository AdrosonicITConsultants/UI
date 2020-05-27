import React from 'react';
import { Row, Col, Button, Container } from 'reactstrap';
import logo from '../../assets/TataTrustsNewLogo.png';
import LogoutComponent from '../../containers/logout/logout';
import { Link } from 'react-router-dom';

const TitlebarComponent = (props) => (
     <React.Fragment>
       <Container fluid>
        <Row noGutters={true}>
          <Col xs={12} sm={6} lg={4} className="mt-2 mb-2"></Col>
          <Col xs={12} sm={6} lg={4} className="text-center mt-1 mb-1">
          <Link to="/"><img src={logo} className="tthomelogo"/></Link>
          </Col>
          {/* <Col xs="12 pl-3" lg="2" className="text-center mb-1 pr-3 text-lg-right"><span id="demo-2" className="navSearch mt-lg-3"><input type="Search" /></span> </Col> */}
          <Col xs={12} sm={12} lg={4} className="text-center mt-2 pr-3 mb-2 text-lg-right">
          {!props.loggedinpatient ?
          <React.Fragment>
          <a href="/register">
          <Button className="button-lightred mt-3" size="md" style={{width: '150px'}} >Order a Test</Button>{' '}
          </a>
          {/* <a href="/antibodies">
          <Button className="button-lightred mt-3" size="md" style={{width: '150px'}} >List of Antibodies</Button>{' '}
          </a> */}
          </React.Fragment>
          : 
          <a href="/logout">
          <div className="mr-5 mt-3 mb-3 red-font" style={{fontSize: '18px', fontWeight: '600'}}>Logout</div>
          </a>
         }
        </Col>
        </Row>
        {/* <Row>
          <Col className="text-right mb-3">
          <span className="mr-5 mb-3">12-09-19 V-3.5</span>
          </Col>
        </Row> */}
        </Container>
      </React.Fragment>
);

export default TitlebarComponent;