import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Card,CardBody} from 'reactstrap';
import '../navbar/navbar.css';
import { memoryHistory, browserHistory } from "../../helpers/history";
import TTCEapi from '../../services/API/TTCEapi';
import NavbarComponent from "../navbar/navbar";
import "./Awishlist.css"
import Wishlist from './Wishlist';
import Footer from "../footer/footer";



// class AlertRemoveItem extends Component {
    


//     render() {
//         return (
   
//             <React.Fragment>
             
//      <>
//      <h1 className="ModalHeader">Remove this item from wishlist? </h1>
//      <Row noGutters={true}>
//          <Col style={{textAlign:"center"}}>
//          <span><button className="okbtn" > OK</button></span> 

//         <span><button className="cancelbtn"> Cancel</button></span> 
//      </Col>
//      </Row>
    
//      </>
                 
             
     
//                 </React.Fragment>
              
//         )
//     }
// }
// export default AlertRemoveItem;



