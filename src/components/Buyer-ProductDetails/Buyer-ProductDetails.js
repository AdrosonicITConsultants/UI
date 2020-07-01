import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Button} from 'reactstrap';
import '../navbar/navbar.css';
import NavbarComponent from "../navbar/navbar";
import { connect } from "react-redux";
import TTCEapi from '../../services/API/TTCEapi';
import * as Actions from "../../redux/action/action";
import './Buyer-ProductDetails.css';
import Footer from "../footer/footer";
import { memoryHistory, browserHistory } from "../../helpers/history";
class BuyersProductDetails extends Component {
    render() {
        return (

           <React.Fragment>
<div class="container">
<ul class="thumbnails">
    <li>
      <a href="#slide1"><img src="https://cdn.rawgit.com/huijing/filerepo/gh-pages/lw1.jpg" /></a>
    </li>
    <li>
      <a href="#slide2"><img src="https://cdn.rawgit.com/huijing/filerepo/gh-pages/lw2.jpg" /></a>
    </li>
    <li>
      <a href="#slide3"><img src="https://cdn.rawgit.com/huijing/filerepo/gh-pages/lw3.jpg" /></a>
    </li>
    <li>
      <a href="#slide4"><img src="https://cdn.rawgit.com/huijing/filerepo/gh-pages/lw4.jpg" /></a>
    </li>
    <li>
      <a href="#slide5"><img src="https://cdn.rawgit.com/huijing/filerepo/gh-pages/lw5.jpg" /></a>
    </li>
  </ul>
  <ul class="slides">
    <li id="slide1"><img src="https://cdn.rawgit.com/huijing/filerepo/gh-pages/lw1.jpg" alt="" /></li>
    <li id="slide2"><img src="https://cdn.rawgit.com/huijing/filerepo/gh-pages/lw2.jpg" alt="" /></li>
    <li id="slide3"><img src="https://cdn.rawgit.com/huijing/filerepo/gh-pages/lw3.jpg" alt="" /></li>
    <li id="slide4"><img src="https://cdn.rawgit.com/huijing/filerepo/gh-pages/lw4.jpg" alt="" /></li>
    <li id="slide5"><img src="https://cdn.rawgit.com/huijing/filerepo/gh-pages/lw5.jpg" alt="" /></li>
  </ul>


</div>
           </React.Fragment>)
    }
}

export default BuyersProductDetails;