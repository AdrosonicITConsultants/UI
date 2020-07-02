import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Button} from 'reactstrap';
import '../navbar/navbar.css';
import NavbarComponent from "../navbar/navbar";
import { connect } from "react-redux";
import * as Actions from "../../redux/action/action";
import TTCEapi from '../../services/API/TTCEapi';
import './AntaranCoDesign.css';
import Footer from "../footer/footer";
import { memoryHistory, browserHistory } from "../../helpers/history";
class AntaranCoDesignCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
      products : [],
      value : false,
                                         
     
    };
    
  }
  componentDidMount(){
   
     TTCEapi.getAllProducts().then((response)=>{
      this.setState({products : response.data.data},()=>{
          console.log(this.state.products);
     
          // console.log(this.props.user);
      });
  });
  }
    render() {
        return (

           <React.Fragment>
           <Container>
           <Row noGutters="true">
                {/* Card1 */}
             
             {this.state.products ? ( ( this.state.products.map((data) => (
              <Col xs={12} sm={6} md={4}>
                <div className="card Cardlayout">
                <div class="card-block">
                  <p class="card-text"> 
                  {data.productDesc}
                 </p>
                </div>
                <img className="card-img-top" src={logos.stole}  alt="Card image cap"/>
                <div class="effect-text">
                    <div class="effect-btn">
                      <h2>EXPLORE MORE</h2>
                      <a class="btn" href="#"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
                    </div>
                  </div>
              </div>
              </Col>
              ) ) 
            )): null
            }
                
              </Row>
            
  {/* Card2 */}
  
 
{/* Row3 */}
<Row noGutters="true" >
    <Col sm={{size:"5"}}>
    {/* <hr className="hrlineasd "></hr> */}
    </Col>
    <Col sm={{size:"2"}} className="asdseemore">
        {/* See More */}
    </Col>
    <Col sm={{size:"5"}}>
    {/* <hr className="hrlineasd "></hr> */}
     </Col>
</Row>
</Container> 
</React.Fragment>
 )
    }
}


    export default AntaranCoDesignCategories;