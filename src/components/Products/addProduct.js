import React, { Component } from 'react'
import ImageEditorTTCE from "../../shared/ImageEditorTTCE"
import NavbarComponent from "../navbar/navbar";
import Footer from "../footer/footer";
import "../landingpage/landingpage.css";
import { Row, Col, Container, Label } from "reactstrap";


export default class addProduct extends Component {
                 constructor(props) {
                   super(props);
                   this.addImage = this.addImage.bind(this);
                 }

                 addImage(data,name,mimeType,imageNumber){
console.log(data)
console.log(name)
console.log(mimeType)
console.log(imageNumber);
                 }

                 render() {
                   return (
                     <React.Fragment>
                       <NavbarComponent></NavbarComponent>
                       <Container>
                         <br />
                         <br />
                         <br />
                         <Row className="ImageEditor">
                           <ImageEditorTTCE
                             aI={this.addImage}
                           ></ImageEditorTTCE>
                         </Row>
                         <br />
                         <br />
                         <br />
                         <Footer></Footer>
                       </Container>
                     </React.Fragment>
                   );
                 }
               }
