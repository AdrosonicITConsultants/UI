import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Button} from 'reactstrap';
import '../navbar/navbar.css';
import NavbarComponent from "../navbar/navbar";
import { connect } from "react-redux";
import TTCEapi from '../../services/API/TTCEapi';
import * as Actions from "../../redux/action/action";
import './ArtisanselfDesign.css';
import Footer from "../footer/footer";
import { memoryHistory, browserHistory } from "../../helpers/history";
import CMSApi from '../../services/API/CMSApi';

class ArtistSelfDesignCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
      products : [],
      value : false,
      visible:6,   
      categoryData : [],                              
     
    };
    
  
    this.loadMore = this.loadMore.bind(this);
    }
  
    loadMore() {
      this.setState((prev) => {
        return {visible: prev.visible + 6};
      });
    }

  componentDidMount(){

    CMSApi.getCategories().then((response)=>{
      if(response)
      {
        this.setState({
          categoryData : response.data
        })
      }
    });
   
    TTCEapi.getAllProducts().then((response)=>{
      this.setState({products : response.data.data},()=>{
      });
    });

  }

    render() {
        return (

           <React.Fragment>
           <Container>
           <Row noGutters="true">
                {/* Card1 */}
             
             {this.state.products ? this.state.products.slice(0,this.state.visible).map((data) => {
              return this.state.categoryData ? this.state.categoryData.map((categoryData) => {
                 if(data.id === parseInt(categoryData.acf.category_id)) {
              return <Col xs={12} sm={6} md={4}>
                  <div className="card Cardlayout">
                  <div class="card-block">
                    <p class="card-text"> 
                    {categoryData.title.rendered}
                   </p>
                  </div>
                  <img className="card-img-top" src={categoryData.acf.image}  alt="Card image cap"/>
                  <div class="effect-text">
                      <div class="effect-btn">
                        <h2>EXPLORE MORE</h2>
                        <a class="btn" href={"/Artisanself/categories/ProductCategories?categoryId="+data.id}><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
                      </div>
                    </div>
                </div>
                </Col>
                 }
             }) : <h2 className="text-center">Loading.....</h2>  
             }): null
            }
                
              </Row>
            
  {/* Card2 */}
  
 
{/* Row3 */}
  {this.state.visible < this.state.products.length &&
 <Row noGutters="true" >
 <Col sm={{size:"5"}}>
 <hr className="hrlineasd "></hr>
 </Col>
 <Col sm={{size:"2"}} className="asdseemore">
 <input type="button" onClick={this.loadMore} value="See More" style={{"border":"none"}}></input>
 </Col>
 <Col sm={{size:"5"}}>
 <hr className="hrlineasd "></hr> </Col>
</Row>          }
       
</Container> 
</React.Fragment>
 )
    }
}

    export default ArtistSelfDesignCategories;